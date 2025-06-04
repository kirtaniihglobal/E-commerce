import { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import Header from "../components/header/header";
import SnackBar from "../comon/snackBar";
import { fetchUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export default function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackSeverity, setSnackSeverity] = useState("success");

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ mt: 10 }}>
        {user && (
          <Card sx={{ p: 4, textAlign: "center", boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {user.fullName}
              </Typography>
              <Typography variant="body1">{user.number}</Typography>
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
              <Box mt={3}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    setSnackMessage("Logout SuccessFully");
                    setSnackSeverity("error");
                    setSnackOpen(true);
                    localStorage.removeItem("token");
                    setTimeout(() => {
                      navigate("/login");
                    }, 500);
                  }}
                >
                  Logout
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}
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
