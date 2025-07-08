import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Rating,
  Tooltip,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserWishlistData,
  getUserWishlistData,
} from "../../Thunk/wishlistThunk";
import { useEffect } from "react";
import { getOneproductData } from "../../Thunk/productThunk";
import { useNavigate } from "react-router-dom";

function MyWishlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userLikes } = useSelector((state) => state.wishList);
  console.log(userLikes);
  useEffect(() => {
    dispatch(getUserWishlistData());
  }, [dispatch]);
  const handleSelect = async (id) => {
    try {
      await dispatch(getOneproductData(id));
      navigate(`/productDetail/${id}`);
      window.scrollTo(0, 0);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteUserWishlistData({ id })).unwrap();
      console.log("Deleted successfully");
    } catch (err) {
      console.error("Error deleting wishlist item", err);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight={600}>
        My Wishlist
      </Typography>
      <Grid container spacing={4}>
        {userLikes?.length > 0 ? (
          userLikes.map((likes) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={likes._id}>
              <Box
                sx={{ position: "relative", width: "200px" }}
                onClick={() => {
                  handleSelect(likes.productId._id);
                }}
              >
                <img
                  style={{ width: "100%" }}
                  src={`http://192.168.2.222:5000/${likes.productId.image}`}
                  alt=""
                />
                <Tooltip title="Remove" placement="top" arrow>
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      backgroundColor: "white",
                      "&:hover": { backgroundColor: "#fdd" },
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(likes.productId._id);
                    }}
                  >
                    <FavoriteIcon color="error" />
                  </IconButton>
                </Tooltip>
                <CardContent>
                  <Typography variant="h6" noWrap>
                    {likes.productId.name}
                  </Typography>
                  {/* <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    {likes.productId.rating == null ? (
                      <Typography variant="h6">No rating</Typography>
                    ) : (
                      <>
                        <Rating
                          name="read-only"
                          value={Number(likes.productId.rating?.toFixed(1))}
                          precision={0.5}
                          readOnly
                        />
                        <Typography variant="h6">
                          {likes.productId.rating?.toFixed(1)}/5
                        </Typography>
                      </>
                    )}
                  </Box> */}
                  <Typography variant="h6" color="primary" mt={1}>
                    ${likes.productId.price}
                  </Typography>
                </CardContent>
              </Box>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" sx={{ m: 2 }}>
            Your wishlist is empty.
          </Typography>
        )}
      </Grid>
    </Box>
  );
}

export default MyWishlist;
