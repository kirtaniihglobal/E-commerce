import { useEffect, useState, useRef } from "react";
import {
  Grid,
  Typography,
  Button,
  Box,
  Avatar,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { fetchUser, updateUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { openSnackbar } from "../redux/snackBarSlice";

export default function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    number: "",
    image: "",
    address: "",
  });

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        number: user.number || "",
        image: user.image || "",
        address: user.address || "",
      });
      setImageFile(`http://192.168.2.222:5000/${user.image}`);
    }
  }, [user]);
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };
  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      fullName: user.fullName || "",
      email: user.email || "",
      image: user.image || "",
      number: user.number || "",
      address: user.address || "",
    });
  };

  const handleSave = async () => {
    try {
      const form = new FormData();
      form.append("fullName", formData.fullName);
      form.append("number", formData.number);
      form.append("email", formData.email);
      form.append("address", formData.address);
      if (imageFile instanceof File) {
        form.append("image", imageFile);
      }
      await dispatch(updateUser(form)).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <>
      <Grid container maxWidth="xl" sx={{ mt: 10 }}>
        <Box>
          <Box></Box>
        </Box>
        {user && (
          <Box sx={{ width: "100%", ml: 10 }}>
            <Box sx={{ width: "100%" }}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  maxWidth: 500,
                }}
              >
                {isEditing ? (
                  <>
                    <Box>
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                      />

                      <Box
                        onClick={handleAvatarClick}
                        sx={{ cursor: "pointer", display: "inline-block" }}
                      >
                        <Avatar
                          src={
                            imageFile
                              ? typeof imageFile === "string"
                                ? imageFile
                                : URL.createObjectURL(imageFile)
                              : ""
                          }
                          alt="User Avatar"
                          sx={{ width: 80, height: 80 }}
                        />
                      </Box>
                    </Box>
                    <TextField
                      label="Full Name"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      fullWidth
                    />
                    <TextField
                      label="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      fullWidth
                    />
                    <TextField
                      label="Mobile Number"
                      name="number"
                      value={formData.number}
                      onChange={handleChange}
                      fullWidth
                    />
                    <TextField
                      label="Address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      fullWidth
                    />
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Button variant="contained" onClick={handleSave}>
                        Save
                      </Button>
                      <Button variant="outlined" onClick={handleCancel}>
                        Cancel
                      </Button>
                    </Box>
                  </>
                ) : (
                  <>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                        position: "relative",
                      }}
                    >
                      <Avatar
                        src={`http://192.168.2.222:5000/${user.image}`}
                        alt="User Avatar"
                        sx={{ width: 80, height: 80 }}
                      />
                      <Typography variant="h5">{user.fullName}</Typography>
                      <Typography variant="h6">{user.email}</Typography>
                      <Typography variant="h6">{user.number}</Typography>
                      <Typography variant="h6">{user.address}</Typography>
                      <Box
                        sx={{
                          position: "absolute",
                          right: 0,
                          top: 10,
                        }}
                      >
                        <EditIcon onClick={handleEditToggle} color="info" />
                      </Box>
                    </Box>
                  </>
                )}
              </Box>
            </Box>
          </Box>
        )}
      </Grid>
    </>
  );
}
