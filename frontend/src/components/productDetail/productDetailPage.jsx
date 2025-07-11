import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Chip,
  Divider,
  Button,
  Skeleton,
  Rating,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { getAllproductsData } from "../../Thunk/productThunk";
import { addToCartData } from "../../Thunk/cartThunk";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../../comon/productCard";
import Header from "../header/header";
import Footer from "../footer/footer";
// import img1 from "../../assets/image 1.png";
// import img2 from "../../assets/image 2.png";
// import img3 from "../../assets/image 3.png";
import { openSnackbar } from "../../redux/snackBarSlice";
import { getOneProductRatingData } from "../../Thunk/ratingThunk";
import RatingCard from "../../comon/ratingCard";

function ProductDetailPage() {
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const { OneProductRatingData } = useSelector((state) => state.rating);
  const { id } = useParams();
  const { products } = useSelector((state) => state.products);
  const selectedProduct = products.find((p) => p._id === id);
  console.log("selectedProduct", selectedProduct);
  useEffect(() => {
    dispatch(getAllproductsData({ skip: 0, limit: 9 }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOneProductRatingData(id));
  }, [dispatch, id]);

  const handlePlus = () => {
    setQuantity((quantity) => quantity + 1);
  };

  const handleMins = () => {
    setQuantity((quantity) => {
      if (quantity == 1) {
        return quantity;
      } else {
        return quantity - 1;
      }
    });
  };
  const handleSubmit = () => {
    if (!selectedColor) {
      dispatch(
        openSnackbar({ massage: "Please select color", severity: "error" })
      );
    } else if (!selectedSize) {
      dispatch(
        openSnackbar({ massage: "Please select Size", severity: "error" })
      );
    } else {
      dispatch(
        openSnackbar({
          massage: `${selectedProduct.name}add to Cart`,
          severity: "success",
        })
      );
      dispatch(
        addToCartData({
          productId: selectedProduct._id,
          quantity,
          size: selectedSize,
          color: selectedColor,
        })
      );
    }
  };
  const handleChangeColor = (color) => {
    setSelectedColor(color);
  };
  const handleChangeSize = (name) => {
    setSelectedSize(name);
  };
  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <Grid container>
          {selectedProduct ? (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                mt: "30px",
              }}
            >
              <Box
                sx={{
                  width: "50%",
                  display: "flex",
                  gap: 3,
                }}
              >
                {/* <Box
                  sx={{
                    width: "152px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <img src={img1} alt="" />
                  <img src={img2} alt="" />
                  <img src={img3} alt="" />
                </Box> */}
                <Box
                  sx={{
                    width: "70%",
                    position: "relative",
                  }}
                >
                  <img
                    src={`http://192.168.2.222:5000/${selectedProduct.image}`}
                    style={{
                      width: "100%",
                    }}
                    alt=""
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: "20px",
                      right: "20px",
                    }}
                  >
                    {selectedProduct.isLiked ? (
                      <FavoriteIcon color="error" />
                    ) : (
                      <FavoriteBorderIcon color="primary" />
                    )}
                  </IconButton>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "40%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Box>
                  <Typography variant="h4">{selectedProduct.name}</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  {selectedProduct.rating == null ? (
                    <Typography variant="h6">No rating</Typography>
                  ) : (
                    <>
                      <Rating
                        name="read-only"
                        value={Number(selectedProduct.rating?.toFixed(1))}
                        precision={0.5}
                        readOnly
                      />
                      <Typography variant="h6">
                        {selectedProduct.rating?.toFixed(1)}/5
                      </Typography>
                    </>
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h4">${selectedProduct.price}</Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      textDecoration: "line-through",
                      color: "text.disabled",
                    }}
                  >
                    $300
                  </Typography>

                  <Chip label="- 40%" color="error" />
                </Box>
                <Box>
                  <Typography variant="body1">
                    {selectedProduct.description}
                  </Typography>
                </Box>
                <Divider />
                <Box>
                  <Typography>Select Colors</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 1,
                    }}
                  >
                    {selectedProduct.color?.map((color, index) => (
                      <Box
                        value={selectedColor}
                        key={index}
                        required
                        onClick={() => handleChangeColor(color)}
                        sx={{
                          border:
                            selectedColor === color ? "2px solid black" : "",
                          backgroundColor: color,
                          borderRadius: "50%",
                          width: "30px",
                          height: "30px",
                          cursor: "pointer",
                        }}
                      ></Box>
                    ))}
                  </Box>
                </Box>
                <Divider />
                <Box>
                  <Typography variant="body1">Choose Size</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  {selectedProduct.size?.map((name, index) => (
                    <Chip
                      clickable
                      onClick={() => handleChangeSize(name)}
                      value={selectedSize}
                      key={index}
                      label={name}
                      color={selectedSize === name ? "primary" : "default"}
                    />
                  ))}
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "20px",
                  }}
                >
                  <Box
                    sx={{
                      width: "20%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "#f0f0f0",
                      borderRadius: "62px",
                      justifyContent: "space-between",
                      p: 1,
                    }}
                  >
                    <IconButton onClick={handleMins} size="small">
                      <RemoveIcon />
                    </IconButton>

                    <Typography variant="body1">{quantity}</Typography>

                    <IconButton onClick={handlePlus} size="small">
                      <AddIcon />
                    </IconButton>
                  </Box>

                  <Box
                    sx={{
                      width: "80%",
                    }}
                  >
                    <Button
                      variant="contained"
                      className="black"
                      onClick={() => {
                        handleSubmit();
                      }}
                      sx={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "62px",
                      }}
                    >
                      Add to Cart
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  width: "100%",
                  gap: 2,
                }}
              >
                <Box sx={{ width: "50%" }}>
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    sx={{
                      borderRadius: 7,
                    }}
                  >
                    <div style={{ height: "550PX" }} />
                  </Skeleton>
                </Box>
                <Box sx={{ width: "60%" }}>
                  <Skeleton width="100%">
                    <div style={{ height: "80PX" }} />
                  </Skeleton>
                  <Skeleton width="30%">
                    <div style={{ height: "50PX" }} />
                  </Skeleton>
                  <Skeleton width="40%">
                    <div style={{ height: "70PX" }} />
                  </Skeleton>
                  <Skeleton width="70%">
                    <div style={{ height: "50PX" }} />
                  </Skeleton>
                  <Skeleton width="30%">
                    <div style={{ height: "70PX" }} />
                  </Skeleton>
                  <Skeleton width="60%">
                    <div style={{ height: "70PX" }} />
                  </Skeleton>
                  <Skeleton width="100%">
                    <div style={{ height: "100PX" }} />
                  </Skeleton>
                </Box>
              </Box>
            </>
          )}
          <Grid
            container
            spacing={5}
            sx={{
              width: "100%",
              mt: 5,
              justifyContent: "center",
            }}
          >
            <Grid
              container
              sx={{
                width: "100%",
              }}
            >
              <Grid
                sx={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <Typography variant="h5">All Reviews</Typography>
                <Typography variant="h5">
                  ({OneProductRatingData.length})
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              sx={{
                width: "95%",
              }}
            >
              {OneProductRatingData.map((item) => (
                <RatingCard key={item.id} item={item} width={600} />
              ))}
            </Grid>
          </Grid>
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "180px",
              }}
            >
              <Typography variant="h2" component="h2">
                You might also like
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
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
              </Box>
            </Box>
          </Box>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ProductDetailPage;
