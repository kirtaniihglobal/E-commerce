import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import hero from "../assets/hero.jpg";
import { useTheme } from "@mui/material";
import star from "../assets/Vector.png";
import NewArrivalProduct from "../components/newArrivalProduct";
import TopSellingProduct from "../components/topSellingProduct";
import Frame1 from "../assets/Frame 1.png";
import Frame2 from "../assets/Frame 2 (2).png";
import Frame3 from "../assets/Frame 3.png";
import Frame4 from "../assets/Frame 4.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RatingCard from "../comon/ratingCard";

function Home() {
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const Review = [
    {
      id: 1,
      name: "Sarah M.",
      review:
        "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
    },
    {
      id: 2,
      name: "Alex K.",
      review:
        "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
    },
    {
      id: 3,
      name: "James L.",
      review:
        "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
    },
    // {
    //   id: 4,
    //   name: "Sarah M.",
    //   review:
    //     "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
    // },
  ];
  return (
    <>
      <Header />
      <Grid container sx={{ height: "auto" }}>
        <Grid
          container
          spacing={0}
          sx={{
            width: "100%",
            height: "633px",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Grid
            container
            sx={{
              width: "50%",
              backgroundColor: "#F2F0F2",
              p: 10,
            }}
          >
            <Grid>
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
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box className="Box">
                <Typography variant="h4" sx={{ color: "primary.main" }}>
                  200 +
                </Typography>
                <Typography variant="body2" sx={{ color: "primary.main" }}>
                  International Brands
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box className="Box">
                <Typography variant="h4" sx={{ color: "primary.main" }}>
                  2,000 +
                </Typography>
                <Typography variant="body2" sx={{ color: "primary.main" }}>
                  High-Quality Products
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box className="Box">
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
              height: "100%",
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
          <Grid
            item
            xs={12}
            sx={{
              width: "100%",
              height: "122px",
              backgroundColor: "#000",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Box className="logoBox">
              <Typography variant="h3" sx={{ color: "#fff" }}>
                VERSACE
              </Typography>
            </Box>
            <Box className="logoBox">
              <Typography variant="h3" sx={{ color: "#fff" }}>
                ZARA
              </Typography>
            </Box>
            <Box className="logoBox">
              <Typography variant="h3" sx={{ color: "#fff" }}>
                GUCCI
              </Typography>
            </Box>
            <Box className="logoBox">
              <Typography variant="h3" sx={{ color: "#fff" }}>
                PRADA
              </Typography>
            </Box>
            <Box className="logoBox">
              <Typography variant="h3" sx={{ color: "#fff" }}>
                Calvin Klein
              </Typography>
            </Box>
          </Grid>
          <NewArrivalProduct />
          <TopSellingProduct />
          <Grid
            container
            spacing={2}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "1239px",
                height: "866px",
                backgroundColor: "#f0f0f0",
                borderRadius: "40px",
                mt: 6,
              }}
            >
              <Grid Container sx={{ width: "100%", height: "100%" }}>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "25%",
                  }}
                >
                  <Typography variant="h3" sx={{ color: "#000" }}>
                    BROWSE BY DRESS STYLE
                  </Typography>
                </Grid>
                <Grid
                  container
                  spacing={0}
                  sx={{
                    width: "100%",
                    height: "70%",
                  }}
                >
                  <Grid
                    item
                    xs={12}
                    sx={{
                      width: "100%",
                      height: "289px",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      gap: "15px",
                    }}
                  >
                    <Box
                      sx={{
                        width: "407px",
                        height: "100%",
                      }}
                    >
                      <img
                        src={Frame1}
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                        alt=""
                      />
                    </Box>
                    <Box
                      sx={{
                        width: "684px",
                        height: "100%",
                      }}
                    >
                      <img
                        src={Frame2}
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                        alt=""
                      />
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      width: "100%",
                      height: "289px",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      gap: "15px",
                    }}
                  >
                    <Box
                      sx={{
                        width: "684px",
                        height: "100%",
                      }}
                    >
                      <img
                        src={Frame3}
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                        alt=""
                      />
                    </Box>
                    <Box
                      sx={{
                        width: "407px",
                        height: "100%",
                      }}
                    >
                      <img
                        src={Frame4}
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                        alt=""
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid
            container
            spacing={5}
            sx={{
              width: "100%",
              mt: 5,
              justifyContent: "center",
            }}
          >
            <Grid
              item
              xs={12}
              sx={{
                width: "90%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h4">OUR HAPPY CUSTOMERS</Typography>
              <Grid>
                <Button>
                  <ArrowBackIcon />
                </Button>
                <Button>
                  <ArrowForwardIcon />
                </Button>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              sx={{
                width: "95%",
                height: "auto",
                display: "flex",
                flexDirection: "row",
              }}
            >
              {Review.map((item) => (
                <RatingCard key={item.id} item={item} />
              ))}
            </Grid>
          </Grid>
          <Footer />
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
