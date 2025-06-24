import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { addAddress, updateAddress } from "../../redux/authSlice";
import { useEffect } from "react";

function AddAddress({ open, onClose, editData, editId, editAddMode }) {
  const dispatch = useDispatch();
  console.log(editData);
  console.log(editId);
  const validationSchema = yup.object({
    address: yup.string().required("address is required"),
    city: yup.string().required("city is required"),

    pincode: yup.string().required("pincode is required"),

    country: yup.string().required("country is required"),
  });
  const formik = useFormik({
    initialValues: {
      address: "",
      city: "",
      pincode: "",
      country: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      console.log(editId);
      try {
        if (editAddMode && editData) {
          const response = await dispatch(
            updateAddress({ id: editId, values: values })
          )
            .unwrap()
            .then(onClose());

          onClose();
          formik.resetForm();
        } else {
          await dispatch(addAddress(values)).unwrap();
          onClose();
          formik.resetForm();
        }
      } catch (error) {}
    },
  });
  const handleClose = () => {
    formik.resetForm();
    onClose();
  };
  useEffect(() => {
    if (editAddMode && editData) {
      formik.setValues({
        address: editData.address || "",
        city: editData.city || "",
        pincode: editData.pincode || "",
        country: editData.country || "",
      });
    }
  }, [editAddMode, editData]);
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h4">
            {editAddMode ? "Update Address" : "Add Address"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Box>
                <TextField
                  label="Address"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.address && Boolean(formik.errors.address)
                  }
                  helperText={formik.touched.address && formik.errors.address}
                  multiline
                  rows={3}
                  fullWidth
                />
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  gap: 3,
                }}
              >
                <TextField
                  label="City"
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
                />
                <TextField
                  label="Pincode"
                  name="pincode"
                  type="number"
                  value={formik.values.pincode}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.pincode && Boolean(formik.errors.pincode)
                  }
                  helperText={formik.touched.pincode && formik.errors.pincode}
                />
              </Box>
              <Box>
                <TextField
                  label="Country"
                  name="country"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.country && Boolean(formik.errors.country)
                  }
                  helperText={formik.touched.country && formik.errors.country}
                  fullWidth
                />
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button variant="contained" type="submit">
                  {editAddMode ? "Update" : "Add"}
                </Button>
              </Box>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddAddress;
