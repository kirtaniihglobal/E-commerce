import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../components/header/header";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, removeCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log(cartItems);
  return (
    <>
      <Header />
      <Grid container maxWidth="xl">
        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            height: "100px",
          }}
        >
          <Typography variant="h3">Your cart</Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            // height: "auto",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: 3,
          }}
        >
          <Box
            sx={{
              width: "45%",
              // height: "auto",
              border: "2px solid #0000001A",
              borderRadius: 3,
              p: 3,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {cartItems.map((prod) => {
              console.log(cartItems);
              return (
                <Box
                  key={prod._id}
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
                      src={`http://192.168.2.222:5000/${prod.image}`}
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
                    <Typography variant="h5">{prod.name}</Typography>
                    <Typography variant="body2">Size: {prod.size}</Typography>
                    <Typography variant="body2">Color:{prod.color}</Typography>
                    <Typography variant="h5">
                      ${prod.price} x {prod.quntity}
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
                        dispatch(removeCart(prod._id));
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
                        justifyContent: "center",
                        borderRadius: 10,
                        backgroundColor: "#f0f0f0",
                      }}
                    >
                      <Button
                        onClick={() => {
                          dispatch(decrement(prod._id));
                        }}
                      >
                        -
                      </Button>
                      <Typography>{prod.quntity}</Typography>
                      <Button
                        onClick={() => {
                          dispatch(increment(prod._id));
                        }}
                      >
                        +
                      </Button>
                    </Box>
                  </Box>
                </Box>
              );
              // <Divider
              //   sx={{
              //     width: "100%",
              //   }}
              // />
            })}
          </Box>

          <Box
            sx={{
              width: "30%",
              // height: "auto",
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
                <Typography variant="h5">
                  ${" "}
                  {cartItems
                    .reduce(
                      (total, prod) => total + prod.price * prod.quntity,
                      0
                    )
                    .toFixed(2)}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h5">Discount (-20%)</Typography>
                <Typography variant="h5">
                  -${" "}
                  {cartItems
                    .reduce(
                      (total, prod) =>
                        total + prod.price * prod.quntity - (total / 100) * 20,
                      0
                    )
                    .toFixed(2)}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h5">Delivery Fee</Typography>
                <Typography variant="h5">$15</Typography>
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
                <Typography variant="h5">Total</Typography>
                <Typography variant="h5">
                  ${" "}
                  {cartItems
                    .reduce(
                      (total, prod) => total + prod.price * prod.quntity,
                      0
                    )
                    .toFixed(2)}
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
                    textAlign: "center",
                  }}
                >
                  <TextField
                    sx={{}}
                    fullWidth
                    name="code"
                    label="Add promo code"
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
                      // px: 5,
                      // py: 2,
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
                    navigate("/checkOut");
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
