import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import RoomIcon from "@mui/icons-material/Room";
import hero from "../../assets/hero.jpg";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import { Box } from "@mui/material";

function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTab = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Container
        maxWidth={isMobile ? "sm" : isTab ? "md" : "xl"}
        sx={{
          height: "auto",
          mt: 4,
          mb: isMobile ? 0 : 4,
          backgroundColor: "#f0f0f0",
        }}
      >
        <Grid
          container
          spacing={isMobile ? 1 : 2}
          sx={{
            // backgroundColor  :"#f0f0f0",
            padding: isMobile ? "10px" : "50px",
            display: "flex",
            gap: isMobile ? "30px" : "",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mt: "50px",
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
                {/* <EmailIcon /> */}
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
              {/* <Typography variant="body1">
                <PhoneIcon />
                +91 9714022044
              </Typography> */}
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
            <Grid>
              <Typography variant="body1">
                <RoomIcon /> surat
              </Typography>
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
                HElP
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
                Social Profiles
              </Typography>
            </Grid>
            <Grid container>
              <Avatar
                sx={{
                  borderRadius: 2,

                  color: "#000",
                }}
              >
                <InstagramIcon />
              </Avatar>
              <Grid>
                <Avatar
                  sx={{
                    borderRadius: 2,

                    color: "#000",
                  }}
                >
                  <TwitterIcon />
                </Avatar>
              </Grid>
              <Grid>
                <Avatar
                  sx={{
                    borderRadius: 2,

                    color: "#000",
                  }}
                >
                  <GitHubIcon />
                </Avatar>
              </Grid>
              <Grid></Grid>
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
            justifyContent: "center",
          }}
        >
          <Typography variant="body1">
            © 2023 Skillbridge. All rights reserved.
          </Typography>
        </Grid>
      </Container>
    </>
  );
}

export default Footer;
