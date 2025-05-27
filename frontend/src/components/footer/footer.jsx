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
  const isTab = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Container
        maxWidth= "xl"
        sx={{
          height: "auto",
          mt: 20,
          mb: isMobile ? 0 : 4,
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
          <Grid
            container
            sx={{
              display: "flex",

              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Grid>
              <Box>
                <Typography variant="h4">SHOP.CO</Typography>
              </Box>
            </Grid>
            <Grid>
              <Typography variant="body1">
                {" "}
                We have clothes that suits your style <br />
                and which you’re proud to wear. <br />
                From women to men.
              </Typography>
            </Grid>
            <Grid
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
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Grid>
              <Typography variant="h5" fontWeight={isMobile ? "bold" : ""}>
                COMPANY
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="body1">About</Typography>
            </Grid>
            <Grid>
              <Typography variant="body1">Features</Typography>
            </Grid>
            <Grid>
              <Typography variant="body1">Works </Typography>
            </Grid>
            <Grid>
              <Typography variant="body1"> Career </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Grid>
              <Typography variant="h5" fontWeight={isMobile ? "bold" : ""}>
                HELP
              </Typography>
            </Grid>
            <Grid>
              <Typography varia> Customer Support</Typography>
            </Grid>
            <Grid>
              <Typography varia>Delivery Details</Typography>
            </Grid>
            <Grid>
              <Typography varia> Terms & Conditions</Typography>
            </Grid>
            <Grid>
              <Typography varia>Privacy Policy</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Grid>
              <Typography variant="h5" fontWeight={isMobile ? "bold" : ""}>
                FAQ
              </Typography>
            </Grid>
            <Grid>
              <Typography varia> Account</Typography>
            </Grid>
            <Grid>
              <Typography varia>Manage Deliveries</Typography>
            </Grid>
            <Grid>
              <Typography varia> Orders</Typography>
            </Grid>
            <Grid>
              <Typography varia>Payments</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Grid>
              <Typography variant="h5" fontWeight={isMobile ? "bold" : ""}>
                RESOURCES
              </Typography>
            </Grid>
            <Grid>
              <Typography varia> Free eBooks</Typography>
            </Grid>
            <Grid>
              <Typography varia>Development Tutorial</Typography>
            </Grid>
            <Grid>
              <Typography varia> How to - Blog</Typography>
            </Grid>
            <Grid>
              <Typography varia>Youtube Playlist</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Divider />
        <Grid
          container
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
          <Grid item>
            <img src={paymenttype1} alt="" />
            <img src={paymenttype2} alt="" />
            <img src={paymenttype3} alt="" />
            <img src={paymenttype4} alt="" />
            <img src={paymenttype5} alt="" />
          </Grid>
        </Grid>

        <Box
          sx={{
            width: "1240px",
            height: "180px",
            borderRadius: "20px",
            backgroundColor: "#000",
            position: "absolute",
            top: "-90px",
            left: "150px",
          }}
        >
          <Grid
            container
            sx={{
              width: "100%",
              p: 5,
              justifyContent: "space-between",
            }}
          >
            <Grid
              item
              xs={12}
              sx={{
                width: "40%",
              }}
            >
              <Typography variant="h4" color="#fff">
                STAY UPTO DATE ABOUT OUR LATEST OFFERS
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                width: "30%",
                height: "48px",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <TextField
                sx={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#FFF",
                  borderRadius: "62px",
                }}
                fullWidth
                variant="outlined"
                required
                label="Enter your email address "
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
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default Footer;
