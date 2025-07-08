import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useEffect } from "react";
import Header from "../components/header/header";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearCartData,
  getAllCartData,
  plusData,
  minusData,
  removeFromCartData,
} from "../Thunk/cartThunk";
import { openSnackbar } from "../redux/snackBarSlice";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartData } = useSelector((state) => state.cart);
  const total = useSelector((state) => state.cart.total);
  useEffect(() => {
    dispatch(getAllCartData());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Grid container maxWidth="xl">
        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            height: "100px",
            position: "relative",
          }}
        >
          <Typography variant="h3">Your cart</Typography>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 50,
            }}
          >
            <Button
              variant="contained"
              sx={{
                borderRadius: 7,
                px: 4,
                py: 1,
              }}
              className="black"
              onClick={() => {
                dispatch(clearCartData());
              }}
            >
              clear
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: 3,
          }}
        >
          <Box
            sx={{
              width: "45%",
              border: "2px solid #0000001A",
              borderRadius: 3,
              p: 3,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {cartData?.length === 0 ? (
              <Typography
                variant="h4"
                sx={{
                  textAlign: "center",
                }}
              >
                Cart is Empty
              </Typography>
            ) : (
              <>
                {cartData.map((product) => {
                  return (
                    <Box
                      key={product.productId._id}
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        gap: 2,
                      }}
                    >
                      <Box sx={{ width: "20%" }}>
                        <img
                          style={{
                            width: "100%",
                          }}
                          src={`http://192.168.2.222:5000/${product.productId.image}`}
                          alt=" "
                        />
                      </Box>
                      <Box
                        sx={{
                          width: "60%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="h5">
                          {product.productId.name}
                        </Typography>
                        <Typography variant="body2">
                          Size: {product.size}
                        </Typography>
                        <Typography variant="body2">
                          Color: {product.color}
                        </Typography>
                        <Typography variant="h5">
                          ${product.productId.price} x {product.quantity}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          width: "20%",
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "flex-end",
                          alignItems: "end",
                          position: "relative",
                        }}
                      >
                        <Button
                          onClick={() => {
                            dispatch(removeFromCartData(product._id));
                          }}
                          sx={{ position: "absolute", top: 0, right: 0 }}
                        >
                          <DeleteIcon color="error" />
                        </Button>
                        <Box
                          sx={{
                            width: "80%",
                            height: "30%",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            backgroundColor: "#f0f0f0",
                            borderRadius: "62px",
                            justifyContent: "space-between",
                            p: 1,
                          }}
                        >
                          <IconButton
                            onClick={() => {
                              dispatch(minusData(product._id));
                            }}
                            size="small"
                          >
                            <RemoveIcon />
                          </IconButton>

                          <Typography variant="body1">
                            {product.quantity}
                          </Typography>

                          <IconButton
                            onClick={() => {
                              dispatch(plusData(product._id));
                            }}
                            size="small"
                          >
                            <AddIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              </>
            )}
          </Box>

          <Box
            sx={{
              width: "30%",
              border: "2px solid #0000001A",
              borderRadius: 3,
              p: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <Typography variant="h3">Order Summary</Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h5">Subtotal</Typography>
                <Typography variant="h5">${total}</Typography>
              </Box>
              {/* <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h5" color="red">
                  Discount (-20%)
                </Typography>
                <Typography variant="h5" color="red">
                  -$ {(total / 100) * (20).toFixed(2)}
                </Typography>
              </Box> */}
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h5" color="green">
                  Delivery Free
                </Typography>
                <Typography variant="h5" color="green">
                  $0
                </Typography>
              </Box>
              <Divider
                sx={{
                  width: "100%",
                }}
              />
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h4">Total</Typography>
                <Typography variant="h4">
                  ${total}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    width: "70%",
                    height: "50px",
                    backgroundColor: "#f0f0f0",
                    borderRadius: 7,
                    display: "flex",
                    alignItems: "center",
                    px: 2,
                  }}
                >
                  <TextField
                    variant="standard"
                    fullWidth
                    name="code"
                    placeholder="Add promo code"
                    InputProps={{
                      disableUnderline: true,
                    }}
                    sx={{
                      backgroundColor: "transparent",
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    width: "25%",
                    height: "50px",
                  }}
                >
                  <Button
                    variant="contained"
                    className="black"
                    sx={{
                      borderRadius: 7,
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    Apply
                  </Button>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <Button
                  onClick={() => {
                    if (cartData == "") {
                      dispatch(
                        openSnackbar({
                          massage: "The cart is empty",
                          severity: "error",
                        })
                      );
                    } else {
                      navigate("/checkOut");
                    }
                  }}
                  sx={{
                    width: "100%",
                    borderRadius: 7,
                    p: 2,
                  }}
                  variant="contained"
                  className="black"
                >
                  Go to Checkout
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>
    </>
  );
}

export default Cart;
