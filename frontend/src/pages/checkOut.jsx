import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { useState } from "react";
import Header from "../components/header/header";
import { useSelector } from "react-redux";

function CheckOut() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    address: "",
    city: "",
    pincode: "",
  });
  console.log(formData);
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log(cartItems);
  const handaleOpen = () => {
    setOpen(true);
  };
  const handaleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Header />
      <Grid container maxWidth="xl">
        <Grid
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Dialog open={open} onClose={handaleClose}>
            <DialogTitle>
              <Typography variant="h4">Order Details</Typography>
            </DialogTitle>
            <DialogContent>
              <Box>
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "green",
                    }}
                  >
                    Your Order is Successfull!
                  </Typography>
                </Box>
                <Box>
                  <Typography>Name:{formData.firstName}</Typography>
                  <Typography>Email:{formData.email}</Typography>
                  <Typography>Number:{formData.number}</Typography>
                  <Typography>Address:{formData.address}</Typography>
                  <Typography>City:{formData.city}</Typography>
                  <Typography>Pincode:{formData.pincode}</Typography>
                  <Typography>Order Place Date:</Typography>
                  <Typography>Order Amount:</Typography>
                </Box>
              </Box>
            </DialogContent>
          </Dialog>
          <Box
            sx={{
              width: "60%",
            }}
          >
            <Box
              sx={{
                width: "100%",
                textAlign: "center",
              }}
            >
              <Typography variant="h4">DETAILS FORM</Typography>
            </Box>
            <form
              onSubmit={handleSubmit}
              style={{
                width: "100%",
                display: "flex",
                marginTop: "50px",
                // flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: "70%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    gap: 2,
                  }}
                >
                  <TextField
                    value={formData.firstName}
                    fullWidth
                    onChange={handleChange}
                    label="firstName"
                    name="firstName"
                  />

                  <TextField
                    value={formData.lastName}
                    fullWidth
                    onChange={handleChange}
                    label="lastName"
                    name="lastName"
                  />
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    gap: 2,
                  }}
                >
                  <TextField
                    fullWidth
                    onChange={handleChange}
                    value={formData.email}
                    label="Email"
                    name="email"
                  />
                  <TextField
                    fullWidth
                    onChange={handleChange}
                    value={formData.number}
                    label="Number"
                    name="number"
                  />
                </Box>

                <TextField
                  label="Address"
                  name="address"
                  onChange={handleChange}
                  value={formData.address}
                  fullWidth
                  multiline
                  rows={3}
                />
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    gap: 2,
                  }}
                >
                  <TextField
                    fullWidth
                    onChange={handleChange}
                    value={formData.city}
                    label="City"
                    name="city"
                  />
                  <TextField
                    fullWidth
                    onChange={handleChange}
                    type="number"
                    label="Pincode"
                    value={formData.pincode}
                    name="pincode"
                  />
                </Box>

                <Box
                  sx={{
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Button
                    type="submit"
                    onClick={() => {
                      handaleOpen();
                    }}
                    sx={{
                      width: "100%",
                      borderRadius: 7,
                      p: 1.5,
                      mt: 5,
                    }}
                    variant="contained"
                    className="black"
                  >
                    Place Order
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>
          <Box
            sx={{
              width: "40%",
            }}
          >
            <Box
              sx={{
                width: "90%",
                mt: 5,
                // border: "1px solid black",
              }}
            >
              {cartItems.map((prod) => {
                return (
                  <Box
                    sx={{
                      width: "90%",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Box
                      sx={{
                        width: "10%",
                        p: 2,
                      }}
                    >
                      <img
                        style={{
                          width: "100%",
                        }}
                        src={`http://192.168.2.222:5000/${prod.image}`}
                        alt=""
                      />
                    </Box>
                    <Box
                      sx={{
                        width: "80%",
                        p: 1,
                        display: "flex",
                        flexDirection: "row",
                        gap: 15,
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h5">{prod.name}</Typography>

                      <Typography variant="h6">
                        ${prod.price}x{prod.quntity}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
            <Divider
              sx={{
                width: "80%",
              }}
            />
            <Box
              sx={{
                width: "80%",
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
                <Typography variant="h4">Order Summary</Typography>
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
                <Typography variant="h5">Delivery Fee</Typography>
                <Typography variant="h5">$15</Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h5">Payment Type</Typography>
                <Typography variant="h5"></Typography>
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
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default CheckOut;
