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
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Stack,
  Chip,
  FormHelperText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import SnackBar from "../comon/snackBar";
import { useFormik } from "formik";
import * as yup from "yup";
import { fetchProduct } from "../redux/productSlice";
import { useSelector, useDispatch } from "react-redux";
import api from "../services/api";
import { OutlinedInput } from "@mui/material";
const names = ["Small", "Medium", "Large", "X-Large"];
const colors = [
  {
    id: "1",
    value: "#FF0000",
  },
  {
    id: "2",
    value: "#008000",
  },
  {
    id: "3",
    value: "#0000FF",
  },
  {
    id: "4",
    value: "#000",
  },
  {
    id: "5",
    value: "#f0f0f0",
  },
];

function ManageProducts() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product.products);
  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackSeverity, setSnackSeverity] = useState("success");
  const [editMode, setEditmode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState("");
  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  const handaleOpen = () => {
    setOpen(true);
  };
  const handaleClose = () => {
    setOpen(false);
    setEditmode(false);
    setEditId(null);
    setEditData("");
    formik.resetForm();
    setImageFile(null);
  };

  useEffect(() => {
    if (editMode && editData) {
      formik.setValues({
        name: editData.name || "",
        price: editData.price || "",
        description: editData.description || "",
        stock: editData.stock || "",
        size: editData.size || [],
        color: editData.color || [],
      });
    }
  }, [editMode, editData]);

  const validationSchema = yup.object({
    name: yup
      .string("Name must in string")
      .required("Product name is required"),
    price: yup.number("Price must in number").required("price is required"),
    description: yup.string(),
    stock: yup.number("Stock must in number").required("stock is required"),
    size: yup
      .array()
      .min(1, "Select at least one option")
      .of(yup.string())
      .required("This field is required"),
    color: yup
      .array()
      .min(1, "Select at least one option")
      .of(yup.string())
      .required("This field is required"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
      stock: "",
      size: [],
      color: [],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("description", values.description);
      formData.append("stock", values.stock);
      values.size.forEach((name) => {
        formData.append("size[]", name);
      });
      values.color.forEach((color) => {
        formData.append("color[]", color);
      });
      if (imageFile) formData.append("image", imageFile);
      // console.log(formData);
      if (editMode) {
        try {
          const response = await api.put(`products/${editId}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          dispatch(fetchProduct());
          setSnackMessage(response.data.msg || "Product Add Successfully");
          setSnackSeverity("success");
          setSnackOpen(true);
          setEditmode(false);
          handaleClose();
        } catch (error) {
          setSnackMessage(
            !imageFile ? "Image is required" : "Product Add error"
          );
          setSnackSeverity("error");
          setSnackOpen(true);
        }
      } else {
        try {
          // console.log(formData, "form");
          const response = await api.post("products/", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          dispatch(fetchProduct());
          setSnackMessage(response.data.msg || "Product Add Successfully");
          setSnackSeverity("success");
          setSnackOpen(true);
          setEditmode(false);

          handaleClose();
        } catch (error) {
          setSnackMessage(
            !imageFile ? "Image is required" : "Product Add error"
          );
          setSnackSeverity("error");
          setSnackOpen(true);
        }
      }
    },
  });
  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`products/${id}`);
      dispatch(fetchProduct());
      setSnackMessage(response.data.msg || "delete successfully!");
      setSnackOpen(true);
      setSnackSeverity("success");
    } catch (error) {
      setSnackMessage("Product not deleted");
      setSnackOpen(true);
      setSnackSeverity("error");
    }
  };
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
                <DialogTitle>
                  {editMode ? "Update Product" : "Add Product"}
                </DialogTitle>
                <DialogContent>
                  <Box display="flex" flexDirection="column" gap={2}>
                    <input
                      type="file"
                      accept="image/*"
                      required={!editMode}
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
                        type="number"
                        label="Price"
                        name="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        error={formik.touched.price && formik.errors.price}
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
                      type="number"
                      label="Stock"
                      name="stock"
                      value={formik.values.stock}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.stock && Boolean(formik.errors.stock)
                      }
                      helperText={formik.touched.stock && formik.errors.stock}
                    />
                    <Box
                      sx={{
                        width: "100%",
                      }}
                    >
                      <FormControl
                        sx={{ width: "100%" }}
                        error={
                          formik.touched.size && Boolean(formik.errors.size)
                        }
                      >
                        <InputLabel>Size Select</InputLabel>
                        <Select
                          multiple
                          fullWidth
                          name="size"
                          value={formik.values.size}
                          onChange={formik.handleChange}
                          input={<OutlinedInput label="Size Select" />}
                          renderValue={(selected) => (
                            <Stack gap={1} direction="row" flexWrap="wrap">
                              {selected.map((value) => (
                                <Chip
                                  key={value.id}
                                  label={value}
                                  onDelete={() =>
                                    formik.setFieldValue(
                                      "size",
                                      formik.values.size.filter(
                                        (item) => item !== value
                                      )
                                    )
                                  }
                                  deleteIcon={
                                    <CancelIcon
                                      onMouseDown={(event) =>
                                        event.stopPropagation()
                                      }
                                    />
                                  }
                                />
                              ))}
                            </Stack>
                          )}
                        >
                          {names.map((name) => (
                            <MenuItem
                              key={name}
                              value={name}
                              sx={{ justifyContent: "space-between" }}
                            >
                              {name}
                              {formik.values.size.includes(name) ? (
                                <CheckIcon color="info" />
                              ) : null}
                            </MenuItem>
                          ))}
                        </Select>
                        {formik.touched.size && formik.errors.size && (
                          <FormHelperText>{formik.errors.size}</FormHelperText>
                        )}
                      </FormControl>
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                      }}
                    >
                      <FormControl
                        sx={{ width: "100%" }}
                        error={
                          formik.touched.color && Boolean(formik.errors.color)
                        }
                      >
                        <InputLabel>Color Select</InputLabel>
                        <Select
                          multiple
                          fullWidth
                          name="color"
                          value={formik.values.color}
                          onChange={formik.handleChange}
                          input={<OutlinedInput label="Color Select" />}
                          renderValue={(selected) => (
                            <Stack gap={1} direction="row" flexWrap="wrap">
                              {selected.map((value) => (
                                <Box
                                  sx={{
                                    backgroundColor: value,
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "50%",
                                  }}
                                  key={value}
                                  label={value}
                                  // onDelete={() =>
                                  //   formik.setFieldValue(
                                  //     "color",
                                  //     formik.values.color.filter(
                                  //       (item) => item !== value
                                  //     )
                                  //   )
                                  // }
                                  // deleteIcon={
                                  //   <CancelIcon
                                  //     onMouseDown={(event) =>
                                  //       event.stopPropagation()
                                  //     }
                                  //   />
                                  // }
                                ></Box>
                              ))}
                            </Stack>
                          )}
                        >
                          {colors.map((color) => (
                            <MenuItem
                              key={color.id}
                              value={color.value}
                              sx={{ justifyContent: "space-between" }}
                            >
                              {color.value}
                              {formik.values.color.includes(color) ? (
                                <CheckIcon color="info" />
                              ) : null}
                            </MenuItem>
                          ))}
                        </Select>
                        {formik.touched.color && formik.errors.color && (
                          <FormHelperText>{formik.errors.color}</FormHelperText>
                        )}
                      </FormControl>
                    </Box>
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handaleClose}
                    variant="outlined"
                    className="white"
                    sx={{ borderRadius: 5 }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="outlined"
                    className="white"
                    sx={{ borderRadius: 5 }}
                  >
                    {editMode ? "Update" : "Add"}
                  </Button>
                </DialogActions>
              </form>
            </Dialog>
          </Box>
          <Box
            sx={{
              border: "2px solid black",
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
                  <TableCell>Size</TableCell>
                  <TableCell>colors</TableCell>
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
                      <TableCell
                        style={{
                          maxWidth: "100px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {prod.description}
                      </TableCell>
                      <TableCell>{prod.stock}</TableCell>
                      <TableCell>
                        {prod.size?.map((name, index) => (
                          <Chip key={index} label={name} />
                        ))}
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 1,
                          }}
                        >
                          {prod.color?.map((color, index) => (
                            <Box
                              key={index}
                              sx={{
                                backgroundColor: color,
                                borderRadius: "50%",
                                width: "30px",
                                height: "30px",
                              }}
                            ></Box>
                          ))}
                        </Box>
                      </TableCell>

                      <TableCell align="center">
                        <Box
                          sx={{
                            Width: "100%",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            onClick={() => {
                              handaleOpen();
                              setEditmode(true);
                              setEditId(prod._id);
                              setEditData(prod);
                            }}
                          >
                            <EditIcon color="info" />
                          </Button>
                          <Button
                            onClick={() => {
                              handleDelete(prod._id);
                            }}
                          >
                            <DeleteIcon color="error" />
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
