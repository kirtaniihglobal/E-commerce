import { Grid, Box, Typography, Button } from "@mui/material";
import GradeIcon from "@mui/icons-material/Grade";
import { getOneproductData } from "../Thunk/productThunk";
import { addToCart } from "../redux/cartSlice";
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
    } catch (error) {}
  };
  return (
    <Grid key={product._id}>
      <Box>
        <Box
          sx={{ cursor: "pointer" }}
          onClick={() => {
            handleSelect(product._id);
          }}
        >
          <img src={`http://192.168.2.222:5000/${product.image}`} alt="" />
        </Box>
        <Box>
          <Typography variant="h6">{product.name}</Typography>
          <Typography variant="h5">
            <GradeIcon color="warning" />
            <GradeIcon color="warning" />
            <GradeIcon color="warning" />
            <GradeIcon />
            {/* {product.rating} */}
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
                    size:"small",
                    color:"red"
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
