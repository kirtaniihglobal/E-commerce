import { Grid, Typography, Box } from "@mui/material";
import GradeIcon from "@mui/icons-material/Grade";
import { useTheme, useMediaQuery } from "@mui/material";
import prod1 from "../assets/prod1.png";
import prod2 from "../assets/prod2.png";
import prod3 from "../assets/prod3.png";
import prod4 from "../assets/prod4.png";
function NewArrivalProduct() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const Products = [
    {
      id: 1,
      image: prod1,
      name: "T-SHIRT WITH TAPE DETAILS",
      rating: 4.5,
      price: "$120",
      description: "This is a description of product 1",
    },
    {
      id: 2,
      image: prod2,
      name: "SKINNY FIT JEANS",
      rating: 4.5,
      price: "$240",
      description: "This is a description of product 1",
    },
    {
      id: 3,
      image: prod3,
      name: "CHECKERED SHIRT",
      rating: 4.5,
      price: "$180",
      description: "This is a description of product 1",
    },
    {
      id: 4,
      image: prod4,
      name: "SLEEVE STRIPED T-SHIRT",
      rating: 4.5,
      price: "$130",
      description: "This is a description of product 1",
    },
  ];

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          width: "100%",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "180px",
          }}
        >
          <Typography variant="h2" component="h2">
            NEW ARRIVALS
          </Typography>
        </Grid>
        <Grid
          container
          spacing={0}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid
            sx={{
              width: "90%",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            {Products.map((product, index) => (
              <Grid key={product.id}>
                <Box>
                  <img src={product.image} alt="" />
                  <Box>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography variant="h5">
                      <GradeIcon color="warning" />
                      <GradeIcon color="warning" />
                      <GradeIcon color="warning" />
                      <GradeIcon />
                      {product.rating}
                    </Typography>
                    <Typography variant="h5">{product.price}</Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default NewArrivalProduct;
