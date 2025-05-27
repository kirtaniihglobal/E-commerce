import {
  Breadcrumbs,
  Container,
  Grid,
  Link,
  Typography,
  Box,
  Chip,
  Divider,
  Avatar,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Header from "../header/header";
import Footer from "../footer/footer";
import img1 from "../../assets/image 1.png";
import img2 from "../../assets/image 2.png";
import img3 from "../../assets/image 3.png";
import GradeIcon from "@mui/icons-material/Grade";

function ProductDetailPage() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      HOME
    </Link>,
    <Link underline="hover" key="2" color="inherit" href="/">
      Shop
    </Link>,
    <Link underline="hover" key="2" color="inherit" href="/">
      Men
    </Link>,
    <Typography key="3" sx={{ color: "text.primary" }}>
      T-shirts
    </Typography>,
  ];
  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <Grid
          container
          spacing={2}
          sx={{
            width: "100%",
          }}
        >
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{
            width: "100%",
          }}
        >
          <Grid
            container
            sx={{
              width: "45%",
            }}
          >
            <Grid
              item
              xs={12}
              sx={{
                width: "152px",
                // height: "167px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <img src={img1} alt="" />
              <img src={img2} alt="" />
              <img src={img3} alt="" />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                width: "70%",
              }}
            >
              <img
                src={img2}
                style={{
                  width: "100%",
                }}
                alt=""
              />
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ width: "50%", display: "flex", flexDirection: "column" }}
          >
            <Grid>
              <Typography variant="h4">One Life Graphic T-shirt</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
              }}
            >
              <GradeIcon color="warning" />
              <GradeIcon color="warning" />
              <GradeIcon color="warning" />
              <GradeIcon color="warning" />
              <Typography variant="h5" sx={{ color: "warning" }}>
                4.5
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <Typography variant="h4">$120</Typography>
              <Typography variant="h5">$120</Typography>
              <Chip label="40%" color="error" />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                This graphic t-shirt which is perfect for any occasion. Crafted
                from a soft and breathable fabric, it offers superior comfort
                and style.
              </Typography>
            </Grid>
            <Divider />
            <Grid item xs={12}>
              <Typography>Select Colors</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#4F4631",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                }}
              />

              <Box
                sx={{
                  backgroundColor: "#314F4A",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                }}
              />

              <Box
                sx={{
                  backgroundColor: "#31344F",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                }}
              />
            </Grid>
            <Divider />
            <Grid item xs={12}>
              <Typography variant="body1">Choose Size</Typography>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                gap: "10px",
              }}
            >
              <Chip label="Small" variant="outlined" color="primary" />
              <Chip label="Medium" variant="outlined" color="primary" />
              <Chip label="Large" variant="outlined" color="primary" />
              <Chip label="X-Large" variant="outlined" color="primary" />
            </Grid>
          </Grid>
        </Grid>
      </Container>
      {/* <Footer/> */}
    </>
  );
}

export default ProductDetailPage;
