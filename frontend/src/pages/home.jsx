import { Avatar, Box, Button, Divider, Grid, Typography } from "@mui/material";
import Header from "../components/header/header";
import hero from "../assets/hero.jpg";
import { useTheme } from "@mui/material";
import star from "../assets/Vector.png";

function Home() {
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      <Header />
      <Grid
        container
        spacing={2}
        sx={{
          width: "100%",
        }}
      >
        <Grid
          container
          spacing={0}
          sx={{
            width: "100%",
            height: "auto",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Grid
            container
            item
            xs={12}
            sx={{
              width: "50%",
              height: "100%",
              backgroundColor: "#F2F0F2",
              p: 10,
              gap: 3,
            }}
          >
            <Grid item xs={12}>
              <Typography variant="h2">
                FIND CLOTHES THAT MATCHES YOUR STYLE
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                Browse through our diverse range of meticulously crafted
                garments, designed to bring out your individuality and cater to
                your sense of style.
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                className="black"
                sx={{
                  width: "30%",
                  borderRadius: 10,
                  p: 1.5,
                }}
                color="primary"
              >
                shop now
              </Button>
            </Grid>

            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box>
                <Typography variant="h4" sx={{ color: "primary.main" }}>
                  200 +
                </Typography>
                <Typography variant="body2" sx={{ color: "primary.main" }}>
                  International Brands
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box>
                <Typography variant="h4" sx={{ color: "primary.main" }}>
                  2,000 +
                </Typography>
                <Typography variant="body2" sx={{ color: "primary.main" }}>
                  High-Quality Products
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box>
                <Typography variant="h4" sx={{ color: "primary.main" }}>
                  30,000 +
                </Typography>
                <Typography variant="body2" sx={{ color: "primary.main" }}>
                  Happy Customers
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sx={{
              width: "50%",
              height: "663px",
            }}
          >
            <Grid
              item
              xs={12}
              sx={{
                width: "100%",
                height: "100%",
                backgroundImage: `url(${hero})`,
                backgroundSize: "cover",
                position: "relative",
              }}
            >
              <img
                src={star}
                style={{
                  width: "15%",
                  height: "15%",
                  position: "absolute",
                  top: "50px",
                  right: "60px",
                }}
                alt=""
              />
              <img
                src={star}
                style={{
                  width: "10%",
                  height: "10%",
                  position: "absolute",
                  bottom: "40%",
                  left: "10px",
                }}
                alt=""
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
