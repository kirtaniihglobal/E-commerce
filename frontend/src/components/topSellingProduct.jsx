import { Grid, Typography, Box, Button } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import { getAllproductsData } from "../Thunk/productThunk";
import { useSelector, useDispatch } from "react-redux";
import prod5 from "../assets/prod5.png";
import prod6 from "../assets/prod6.png";
import prod7 from "../assets/prod7.png";
import prod8 from "../assets/prod8.png";
import ProductCard from "../comon/productCard";
import { useState, useEffect } from "react";
function TopSellingProduct() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [visible, setVisible] = useState(4);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  useEffect(() => {
    dispatch(getAllproductsData());
  }, [dispatch]);
  const handleViewAll = () => {
    setVisible(products.length);
  };

  const displayProducts = products.slice(0, visible);

  // const Products = [
  //   {
  //     id: 1,
  //     image: prod5,
  //     name: "VERTICAL STRIPED SHIRT",
  //     rating: 4.5,
  //     price: "$212",
  //     description: "This is a description of product 1",
  //   },
  //   {
  //     id: 2,
  //     image: prod6,
  //     name: "COURAGE GRAPHIC T-SHIRT",
  //     rating: 4.5,
  //     price: "$145",
  //     description: "This is a description of product 1",
  //   },
  //   {
  //     id: 3,
  //     image: prod7,
  //     name: "LOOSE FIT BERMUDA SHORTS",
  //     rating: 4.5,
  //     price: "$80",
  //     description: "This is a description of product 1",
  //   },
  //   {
  //     id: 4,
  //     image: prod8,
  //     name: "FADED SKINNY JEANS",
  //     rating: 4.5,
  //     price: "$210",
  //     description: "This is a description of product 1",
  //   },
  // ];

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
            TOP SELLING
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
            {displayProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
            <Grid
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {visible < products.length && (
                <Button
                  variant="outlined"
                  className="white"
                  onClick={handleViewAll}
                  sx={{
                    width: "20%",
                    p: 1.5,
                    borderRadius: 10,
                  }}
                >
                  View All
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default TopSellingProduct;
