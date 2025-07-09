import { Grid, Typography, Button } from "@mui/material";
import {
  getAllproductsData,
  // getNewArrivalsProductData,
} from "../Thunk/productThunk";
import { useEffect } from "react";
import ProductCard from "../comon/productCard";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function NewArrivalProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.products);
  const newArrivalProduct = products.filter(
    (product) => product.productType === "newArrival"
  );

  console.log(newArrivalProduct);

  useEffect(() => {
    dispatch(getAllproductsData({ skip: 0, limit: 9 }));
  }, [dispatch]);
  const displayProducts = newArrivalProduct.slice(0, 4);
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
            {displayProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
            <Grid
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                variant="outlined"
                className="white"
                onClick={() => {
                  navigate("/categoryPage");
                  window.scroll(0, 0);
                }}
                sx={{
                  width: "20%",
                  p: 1.5,
                  borderRadius: 10,
                }}
              >
                View All
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default NewArrivalProduct;
