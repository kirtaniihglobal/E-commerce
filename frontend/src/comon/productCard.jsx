import {
  Grid,
  Box,
  Typography,
  Button,
  Rating,
  IconButton,
  Tooltip,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { getOneproductData } from "../Thunk/productThunk";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openSnackbar } from "../redux/snackBarSlice";
import { addToCartData } from "../Thunk/cartThunk";
import {
  addWishlistData,
  deleteUserWishlistData,
} from "../Thunk/wishlistThunk";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(product.isLiked);
  const handleSelect = async (id) => {
    try {
      await dispatch(getOneproductData(id));
      navigate(`/productDetail/${id}`);
      window.scrollTo(0, 0);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = async (id) => {
    try {
      if (liked) {
        await dispatch(deleteUserWishlistData({ id }));
        setLiked(false); // toggle like state locally
      } else {
        await dispatch(addWishlistData({ id }));
        setLiked(true);
      }
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
          sx={{ cursor: "pointer", maxWidth: "295px", position: "relative" }}
          onClick={() => {
            handleSelect(product._id);
          }}
        >
          <img
            style={{ width: "100%" }}
            src={`http://192.168.2.222:5000/${product.image}`}
            alt=""
          />
          <Tooltip title={liked ? "Remove Like" : "Like"} placement="top" arrow>
            <IconButton
              sx={{
                position: "absolute",
                top: "15px",
                right: "15px",
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleChange(product._id);
              }}
            >
              {liked ? (
                <FavoriteIcon color="error" />
              ) : (
                <FavoriteBorderIcon color="primary" />
              )}
            </IconButton>
          </Tooltip>
        </Box>
        <Box>
          <Typography variant="h6">{product.name}</Typography>
          <Typography variant="h5" sx={{ color: "orange" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              {product.rating == null ? (
                <Typography variant="h6">No Rating</Typography>
              ) : (
                <>
                  <Rating
                    name="read-only"
                    value={Number(product.rating?.toFixed(1))}
                    precision={0.5}
                    readOnly
                  />
                  <Typography variant="h6">
                    {product.rating?.toFixed(1)}/5
                  </Typography>
                </>
              )}
            </Box>
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
