import { useEffect } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import Header from "../components/header/header";
import { fetchUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { openSnackbar } from "../redux/snackBarSlice";

export default function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  console.log(user)

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
                    dispatch(
                      openSnackbar({
                        massage: "Logout Successfully",
                        severity: "success",
                      })
                    );
                    localStorage.removeItem("token");
                    navigate("/login");
                  }}
                >
                  Logout
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}
      </Container>
    </>
  );
}
