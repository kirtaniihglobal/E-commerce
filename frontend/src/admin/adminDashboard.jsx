import { Box, Button, Card, Container, Grid, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  return (
    <Container maxWidth="xl">
      <Grid
        container
        spacing={2}
        sx={{
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            gap: 3,
          }}
        >
          <Card sx={{ p: 2, mb: 2, width: "300px", height: "100px" }}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
              }}
            >
              <Box
                sx={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body1" component="h2">
                  Total Product
                </Typography>

                <Typography variant="h5" component="h2">
                  150
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "40%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <PersonIcon sx={{ fontSize: 50 }} />
              </Box>
            </Box>
          </Card>

          <Card sx={{ p: 2, mb: 2, width: "300px", height: "100px" }}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
              }}
            >
              <Box
                sx={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body1" component="h2">
                  Total Orders
                </Typography>

                <Typography variant="h5" component="h2">
                  2500
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "40%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <PersonIcon sx={{ fontSize: 50 }} />
              </Box>
            </Box>
          </Card>

          <Card sx={{ p: 2, mb: 2, width: "300px", height: "100px" }}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
              }}
            >
              <Box
                sx={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body1" component="h2">
                  Total Users
                </Typography>

                <Typography variant="h5" component="h2">
                  15
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "40%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <PersonIcon sx={{ fontSize: 50 }} />
              </Box>
            </Box>
          </Card>
        </Box>
        <Box
          sx={{
            position: "absolute",
            // bottom : 0,
            top: 20,
            right: 0,
          }}
        ></Box>
      </Grid>
    </Container>
  );
}

export default AdminDashboard;
