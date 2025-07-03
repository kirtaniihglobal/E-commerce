import { Grid, Box, Typography, Button, Rating } from "@mui/material";
import GradeIcon from "@mui/icons-material/Grade";
import { getOneproductData } from "../Thunk/productThunk";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openSnackbar } from "../redux/snackBarSlice";
import { addToCartData } from "../Thunk/cartThunk";
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelect = async (id) => {
    try {
      await dispatch(getOneproductData(id));
      navigate(`/productDetail/${id}`);
      window.scrollTo(0, 0);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Grid key={product._id}>
      <Box
        sx={{
          maxWidth: "295px",
          maxHeight: "508px",
        }}
      >
        <Box
          sx={{ cursor: "pointer", maxWidth: "295px" }}
          onClick={() => {
            handleSelect(product._id);
          }}
        >
          <img
            style={{ width: "100%" }}
            src={`http://192.168.2.222:5000/${product.image}`}
            alt=""
          />
        </Box>
        <Box>
          <Typography variant="h6">{product.name}</Typography>
          <Typography variant="h5" sx={{ color: "orange" }}>
            <Rating
              name="read-only"
              value={Number(product.rating?.toFixed(1))}
              precision={0.5}
              readOnly
            />
          </Typography>
          <Typography variant="h5">${product.price}</Typography>
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Button
              sx={{
                width: "100%",
                borderRadius: 10,
                p: 1.5,
              }}
              variant="contained"
              className="black"
              onClick={() => {
                dispatch(
                  addToCartData({
                    // userId: user._id,
                    productId: product._id,
                    quantity: 1,
                    size: "small",
                    color: "red",
                  })
                );
                dispatch(
                  openSnackbar({
                    massage: `${product.name} add in Cart`,
                    severity: "success",
                  })
                );
              }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default ProductCard;
