import { useEffect, useState, useRef } from "react";
import {
  Grid,
  Typography,
  Button,
  Box,
  Avatar,
  TextField,
  Container,
  Paper,
  IconButton,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, updateUser } from "../redux/authSlice";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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
    if (isEditing) fileInputRef.current.click();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => setIsEditing(true);

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      const form = new FormData();
      form.append("fullName", formData.fullName);
      form.append("number", formData.number);
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
    <Container maxWidth={false} disableGutters sx={{}}>
      {user && (
        <Box
          sx={{
            p: 1,
          }}
        >
          <Box>
            <Typography variant={isMobile ? "h6" : "h4"} fontWeight={600}>
              My Profile
            </Typography>
          </Box>
          <Box
            sx={{
              mt: 5,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <Box
                onClick={handleAvatarClick}
                sx={{
                  cursor: isEditing ? "pointer" : "default",
                  display: "inline-block",
                  position: "relative",
                }}
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
                  sx={{
                    width: { xs: 50, md: 100 },
                    height: { xs: 50, md: 100 },
                    mx: "auto",
                    border: "2px solid #ccc",
                  }}
                />
              </Box>
              <Typography variant={isMobile ? "h6" : "h4"} sx={{ mb: 1 }}>
                {user.fullName}
              </Typography>
            </Box>

            <Divider sx={{ my: 2, width: "100%" }} />

            <Typography variant="subtitle2" color="text.secondary">
              Email (read-only):
            </Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {user.email}
            </Typography>

            <Typography variant="subtitle2" color="text.secondary">
              Mobile:
            </Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {user.number}
            </Typography>

            <Typography variant="subtitle2" color="text.secondary">
              Address:
            </Typography>
            <Typography variant="h6">{user.address}</Typography>

            {!isEditing && (
              <Button
                onClick={handleEditToggle}
                variant="outlined"
                color="info"
                size="small"
                sx={{ mt: 2 }}
                startIcon={<EditIcon />}
              >
                Edit Profile
              </Button>
            )}
          </Box>
          {isEditing ? (
            <Box
              component="form"
              sx={{
                width: "100%",
                mt: 5,
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                fullWidth
                disabled={!isEditing}
              />
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                fullWidth
                disabled
              />
              <TextField
                label="Mobile Number"
                name="number"
                value={formData.number}
                onChange={handleChange}
                fullWidth
                disabled={!isEditing}
              />
              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                fullWidth
                disabled={!isEditing}
                multiline
                minRows={3}
              />

              <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                <Button
                  className="black"
                  variant="contained"
                  onClick={handleSave}
                  sx={{ flex: 1 }}
                >
                  Save
                </Button>
                <Button
                  className="white"
                  variant="outlined"
                  onClick={handleCancel}
                  sx={{ flex: 1 }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          ) : (
            <></>
          )}
        </Box>
      )}
    </Container>
  );
}
