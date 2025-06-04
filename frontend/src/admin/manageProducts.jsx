import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import SnackBar from "../comon/snackBar";
import { useFormik } from "formik";
import * as yup from "yup";
import { fetchProduct } from "../redux/productSlice";
import { useSelector, useDispatch } from "react-redux";
import api from "../services/api";

function ManageProducts() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product.products);
  // console.log(products);
  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackSeverity, setSnackSeverity] = useState("success");

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch, products]);

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  const handaleOpen = () => {
    setOpen(true);
  };
  const handaleClose = () => {
    setOpen(false);
  };

  const validationSchema = yup.object({
    name: yup.string().required("Product name is required"),
    price: yup.string().required("price is required"),

    description: yup.string().required("description is required"),

    stock: yup.string().required("stock is required"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
      stock: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("description", values.description);
      formData.append("stock", values.stock);
      if (imageFile) formData.append("image", imageFile);

      try {
        const response = await api.post("products/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setSnackMessage(response.data.msg || "Product Add Successfully");
        setSnackSeverity("success");
        setSnackOpen(true);
        resetForm();
        setImageFile(null);
        setTimeout(() => {
          setOpen(false);
        }, 500);
      } catch (error) {
        setSnackMessage("Product Add error");
        setSnackSeverity("error");
        setSnackOpen(true);
      }
    },
  });

  return (
    <>
      <Container maxWidth="xl">
        <Grid container>
          <Box
            sx={{
              width: "100%",
            }}
          >
            <h1>Add Product </h1>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              mb: 4,
            }}
          >
            <Button
              onClick={handaleOpen}
              variant="contained"
              className="black"
              sx={{
                borderRadius: 5,
              }}
            >
              Add Product
            </Button>
            <Dialog open={open} onClose={handaleClose}>
              <form onSubmit={formik.handleSubmit}>
                <DialogTitle>Add Product</DialogTitle>
                <DialogContent>
                  <Box display="flex" flexDirection="column" gap={2}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files[0])}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                      }}
                    >
                      <TextField
                        label="Name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.name && Boolean(formik.errors.name)
                        }
                        helperText={formik.touched.name && formik.errors.name}
                      />

                      <TextField
                        label="Price"
                        name="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.price && Boolean(formik.errors.price)
                        }
                        helperText={formik.touched.price && formik.errors.price}
                      />
                    </Box>

                    <TextField
                      label="Description"
                      name="description"
                      fullWidth
                      multiline
                      rows={3}
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.description &&
                        Boolean(formik.errors.description)
                      }
                      helperText={
                        formik.touched.description && formik.errors.description
                      }
                    />

                    <TextField
                      label="Stock"
                      name="stock"
                      value={formik.values.stock}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.stock && Boolean(formik.errors.stock)
                      }
                      helperText={formik.touched.stock && formik.errors.stock}
                    />
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handaleClose}
                    variant="outlined"
                    sx={{ borderRadius: 5 }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="outlined"
                    sx={{ borderRadius: 5 }}
                  >
                    Add
                  </Button>
                </DialogActions>
              </form>
            </Dialog>
          </Box>
          <Box
            sx={{
              border: "1px solid black",
              width: "100%",
            }}
          >
            <Table sx={{ Width: "100%" }}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell align="center">Edit/Delete</TableCell>
                </TableRow>
              </TableHead>
              {products?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4}>No products found</TableCell>
                </TableRow>
              ) : (
                products?.map((prod) => (
                  <TableBody key={prod._id}>
                    <TableRow>
                      <TableCell>{prod.name}</TableCell>
                      <TableCell>
                        {prod.image && (
                          <img
                            src={`http://192.168.2.222:5000/${prod.image}`}
                            width="60"
                            height="60"
                          />
                        )}
                      </TableCell>
                      <TableCell>{prod.price}</TableCell>
                      <TableCell>{prod.description}</TableCell>
                      <TableCell>{prod.stock}</TableCell>
                      <TableCell align="center">
                        <Box
                          sx={{
                            Width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            gap: 2,
                          }}
                        >
                          <Button variant="contained" className="black">
                            EDIT
                          </Button>
                          <Button variant="contained" className="black">
                            DELETE
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ))
              )}
            </Table>
          </Box>
        </Grid>
      </Container>
      <SnackBar
        open={snackOpen}
        message={snackMessage}
        severity={snackSeverity}
        handleClose={handleSnackClose}
      />
    </>
  );
}

export default ManageProducts;
