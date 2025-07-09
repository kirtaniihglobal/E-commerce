import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Rating,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import hero from "../assets/hero.jpg";
import star from "../assets/Vector.png";
import NewArrivalProduct from "../components/newArrivalProduct";
import TopSellingProduct from "../components/topSellingProduct";
import Frame1 from "../assets/Frame 1.png";
import Frame2 from "../assets/Frame 2 (2).png";
import Frame3 from "../assets/Frame 3.png";
import Frame4 from "../assets/Frame 4.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GreenTik from "../assets/greentik.png";
import { useNavigate } from "react-router-dom";

function Home() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTab = useMediaQuery(theme.breakpoints.down("md"));
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
  ];
  return (
    <>
      <Header />
      <Container maxWidth={isMobile ? "sm" : isTab ? "md" : "xxl"}>
        <Grid
          sx={{
            width: "100%",
            height: "633px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
            }}
          >
            <Box
              sx={{
                width: isMobile ? "100%" : "50%",
                backgroundColor: "#F2F0F2",
                p: 10,
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <Box>
                <Typography variant={isMobile ? "h5" : isTab ? "h4" : "h3"}>
                  FIND CLOTHES THAT MATCHES YOUR STYLE
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1">
                  Browse through our diverse range of meticulously crafted
                  garments, designed to bring out your individuality and cater
                  to your sense of style.
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <Button
                  onClick={() => {
                    navigate("/categoryPage");
                  }}
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
              </Box>

              <Box
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
              </Box>
            </Box>
            <Box
              sx={{
                width: isMobile ? "100%" : "40%",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                }}
              >
                <img src={hero} style={{ width: "100%" }} alt="" />
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
              </Box>
            </Box>
          </Box>
          <Box
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
          </Box>
          <NewArrivalProduct />
          <TopSellingProduct />
          <Box
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
              <Box sx={{ width: "100%", height: "100%" }}>
                <Box
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
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    height: "70%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <Box
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
                  </Box>
                  <Box
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
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              mt: 5,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 4,
              }}
            >
              {Review.map((item) => (
                <Box
                  key={item.id}
                  container
                  sx={{
                    height: "auto",
                  }}
                >
                  <Box
                    sx={{
                      width: "400px",
                      height: "240px",
                      borderRadius: "20px",
                      border: "1px solid #ccc",
                      p: 4,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      gap: 1,
                    }}
                  >
                    <Typography>
                      <Rating
                        name="read-only"
                        value={4.5}
                        precision={0.5}
                        readOnly
                      />
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h5">{item.name}</Typography>
                      <img width={20} height={20} src={GreenTik} alt="" />
                    </Box>
                    <Typography variant="body1">{item.review}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
          <Footer />
        </Grid>
      </Container>
    </>
  );
}

export default Home;
