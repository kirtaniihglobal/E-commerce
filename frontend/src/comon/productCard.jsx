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
<<<<<<< HEAD
import { useState } from "react";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(product.isLiked);
=======
import { getUserRatingData } from "../Thunk/ratingThunk";
// import { useEffect } from "react";
const ProductCard = ({ product, isLiked }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { userLikes } = useSelector((state) =>   state.wishList);
  // console.log(userLikes);
  // const isLiked = userLikes?.find((like) => like.productId._id === product._id);

  // useEffect(() => {
  //   dispatch(getUserWishlistData());
  // }, [dispatch]);
>>>>>>> 6a15ae0f658c522fcd9a4526f4bed7decae36d8a
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
<<<<<<< HEAD
      if (liked) {
        await dispatch(deleteUserWishlistData({ id }));
        setLiked(false); // toggle like state locally
      } else {
        await dispatch(addWishlistData({ id }));
        setLiked(true);
=======
      if (isLiked) {
        await dispatch(deleteUserWishlistData(id));
      } else {
        await dispatch(addWishlistData(id));
        dispatch(getUserRatingData());
>>>>>>> 6a15ae0f658c522fcd9a4526f4bed7decae36d8a
      }
    } catch (error) {
      console.log(error);
    }
  };
<<<<<<< HEAD

=======
>>>>>>> 6a15ae0f658c522fcd9a4526f4bed7decae36d8a
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
<<<<<<< HEAD
          <Tooltip title={liked ? "Remove Like" : "Like"} placement="top" arrow>
=======
          <Tooltip
            title={isLiked ? "Remove Like" : "like"}
            placement="top"
            arrow
          >
>>>>>>> 6a15ae0f658c522fcd9a4526f4bed7decae36d8a
            <IconButton
              sx={{
                position: "absolute",
                top: "15px",
                right: "15px",
              }}
              onClick={(e) => {
                e.stopPropagation();
<<<<<<< HEAD
                handleChange(product._id);
              }}
            >
              {liked ? (
=======
                handleChange({ id: product._id });
              }}
            >
              {isLiked ? (
>>>>>>> 6a15ae0f658c522fcd9a4526f4bed7decae36d8a
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
<<<<<<< HEAD
              {product.rating == null ? (
                <Typography variant="h6">No Rating</Typography>
=======
              {product.rating == 0 ? (
                <Typography variant="h6">No rating</Typography>
>>>>>>> 6a15ae0f658c522fcd9a4526f4bed7decae36d8a
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
