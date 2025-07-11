import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import paymenttype1 from "../../assets/paymenttype1.png";
import paymenttype2 from "../../assets/paymenttype2.png";
import paymenttype3 from "../../assets/paymenttype3.png";
import paymenttype4 from "../../assets/paymenttype4.png";
import paymenttype5 from "../../assets/paymenttype5.png";
import { useTheme } from "@emotion/react";
import { TextField, useMediaQuery, Button } from "@mui/material";
import { Box } from "@mui/material";

function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // const isTab = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          height: "auto",
          mt: 20,
          backgroundColor: "#f0f0f0",
          position: "relative",
        }}
      >
        <Grid
          container
          spacing={isMobile ? 1 : 2}
          sx={{
            padding: isMobile ? "10px" : "50px",
            display: "flex",
            gap: isMobile ? "30px" : "",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mt: "80px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 3,

              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Box>
              <Box>
                <Typography variant="h4">SHOP.CO</Typography>
              </Box>
            </Box>
            <Box>
              <Typography variant="body1">
                {" "}
                We have clothes that suits your style <br />
                and which you’re proud to wear. <br />
                From women to men.
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
              }}
            >
              <Avatar
                sx={{
                  borderRadius: 10,
                  backgroundColor: "#fff",
                  color: "#000",
                }}
              >
                <TwitterIcon />
              </Avatar>
              <Avatar
                sx={{
                  borderRadius: 10,
                  backgroundColor: "#000",
                  color: "#fff",
                }}
              >
                <FacebookIcon />
              </Avatar>
              <Avatar
                sx={{
                  borderRadius: 10,
                  backgroundColor: "#fff",
                  color: "#000",
                }}
              >
                <InstagramIcon />
              </Avatar>
              <Avatar
                sx={{
                  borderRadius: 10,
                  backgroundColor: "#fff",
                  color: "#000",
                }}
              >
                <GitHubIcon />
              </Avatar>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Box>
              <Typography variant="h5" fontWeight={isMobile ? "bold" : ""}>
                COMPANY
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1">About</Typography>
            </Box>
            <Box>
              <Typography variant="body1">Features</Typography>
            </Box>
            <Box>
              <Typography variant="body1">Works </Typography>
            </Box>
            <Box>
              <Typography variant="body1"> Career </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Box>
              <Typography variant="h5" fontWeight={isMobile ? "bold" : ""}>
                HELP
              </Typography>
            </Box>
            <Box>
              <Typography varia> Customer Support</Typography>
            </Box>
            <Box>
              <Typography varia>Delivery Details</Typography>
            </Box>
            <Box>
              <Typography varia> Terms & Conditions</Typography>
            </Box>
            <Box>
              <Typography varia>Privacy Policy</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Box>
              <Typography variant="h5" fontWeight={isMobile ? "bold" : ""}>
                FAQ
              </Typography>
            </Box>
            <Box>
              <Typography varia> Account</Typography>
            </Box>
            <Box>
              <Typography varia>Manage Deliveries</Typography>
            </Box>
            <Box>
              <Typography varia> Orders</Typography>
            </Box>
            <Box>
              <Typography varia>Payments</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Box>
              <Typography variant="h5" fontWeight={isMobile ? "bold" : ""}>
                RESOURCES
              </Typography>
            </Box>
            <Box>
              <Typography varia> Free eBooks</Typography>
            </Box>
            <Box>
              <Typography varia>Development Tutorial</Typography>
            </Box>
            <Box>
              <Typography varia> How to - Blog</Typography>
            </Box>
            <Box>
              <Typography varia>Youtube Playlist</Typography>
            </Box>
          </Box>
        </Grid>

        <Divider />
        <Box
          sx={{
            display: "flex",
            p: 2,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body1">
            Shop.co © 2000-2023, All Rights Reserved
          </Typography>
          <Box>
            <img src={paymenttype1} alt="" />
            <img src={paymenttype2} alt="" />
            <img src={paymenttype3} alt="" />
            <img src={paymenttype4} alt="" />
            <img src={paymenttype5} alt="" />
          </Box>
        </Box>

        <Box
          sx={{
            width: "95%",
            height: "180px",
            borderRadius: "20px",
            backgroundColor: "#000",
            position: "absolute",
            top: "-90px",
          }}
        >
          <Box
            sx={{
              width: "90%",
              display: "flex",
              p: 5,
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                width: "40%",
              }}
            >
              <Typography variant="h4" color="#fff">
                STAY UPTO DATE ABOUT OUR LATEST OFFERS
              </Typography>
            </Box>
            <Box
              sx={{
                width: "30%",
                height: "100px",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <input
                type="email"
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#FFF",
                  borderRadius: "62px",
                }}
                required
              />
              <Button
                variant="outlined"
                sx={{
                  backgroundColor: "#fff",
                  p: 1,
                  width: "100%",
                  borderRadius: "62px",
                }}
              >
                {" "}
                Subscribe to Newsletter
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Footer;
