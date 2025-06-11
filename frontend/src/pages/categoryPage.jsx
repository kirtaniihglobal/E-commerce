import { Box, Grid, Typography, Button } from "@mui/material";
import { getAllproductsData } from "../Thunk/productThunk";
import { useEffect, useState } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import ProductCard from "../comon/productCard";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/header/header";
function CategoryPage() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  // const [visible, setVisible] = useState(4);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    dispatch(getAllproductsData());
  }, [dispatch]);
  // const handleViewAll = () => {
  //   setVisible(products.length);
  // };

  // const displayProducts = products.slice(0, visible);
  return (
    <>
      <Header />
      <Grid
        container
        spacing={2}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {/* <Box
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
        </Box> */}
        <Grid
          container
          sx={{
            width: "25%",
            height: "100vh",
          }}
        >
          <Box></Box>
        </Grid>
        <Grid
          container
          spacing={0}
          sx={{
            width: "70%",
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
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
            {/* <Grid
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {/* {visible < products.length && ( */}
            {/* <Button
              variant="outlined"
              className="white"
              // onClick={handleViewAll}
              sx={{
                width: "20%",
                p: 1.5,
                borderRadius: 10,
              }}
            >
              View All
            </Button> */}
            {/* )} */}
            {/* </Grid> */}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default CategoryPage;
