import { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Grid,
} from "@mui/material";

import api from "../services/api";
import Header from "../components/header/header";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";

export default function ProfilePage() {
  const { user, logout } = useContext(AuthContext);

  const [massage, setMassage] = useState("");
  const [successMassage, setsuccessMassage] = useState("");

  useEffect(() => {
    api.get("/profile");
  }, []);

  const handleLogout = () => {
    try {
      logout();
      setsuccessMassage("Logout Success");
    } catch (error) {
      setMassage("Logout failed");
    }
  };

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ mt: 10 }}>
        <Grid
          sx={{
            mb: 2,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {massage ? (
            <Typography
              variant=""
              sx={{
                color: "red",
                fontSize: "50px",
                fontWeight: "bold",
              }}
              color="error"
            >
              {massage}
            </Typography>
          ) : (
            <Typography
              variant=""
              sx={{
                color: "green",
                fontSize: "50px",
                fontWeight: "bold",
              }}
            >
              {successMassage}
            </Typography>
          )}
        </Grid>
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
                  onClick={handleLogout}
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
