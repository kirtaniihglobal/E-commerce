import { Grid, Typography, Button } from "@mui/material";
import { getNewArrivalsProductData } from "../Thunk/productThunk";
import { useEffect } from "react";
// import { useTheme, useMediaQuery } from "@mui/material";
import ProductCard from "../comon/productCard";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { getUserWishlistData } from "../Thunk/wishlistThunk";
function NewArrivalProduct({ likeData }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { newArrival } = useSelector((state) => state.products);
  // const { userLikes } = useSelector((state) => state.wishList);
  // const [visible, setVisible] = useState(4);
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    dispatch(getNewArrivalsProductData());
    // dispatch(getUserWishlistData());
  }, [dispatch]);
  const displayProducts = newArrival
    .map((product) => ({
      ...product,
      isLiked: likeData?.find((like) => like.productId._id === product._id),
    }))
    .slice(0, 4);
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
              <ProductCard
                key={product._id}
                product={product}
                isLiked={product.isLiked}
              />
            ))}
            <Grid
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {/* {visible < products.length && ( */}
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
              {/* )} */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default NewArrivalProduct;
