import {
  Box,
  Button,
  Grid,
  Typography,
  Divider,
  TextField,
  Checkbox,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import Header from "../components/header/header";
import { useSelector, useDispatch } from "react-redux";
import { getAllCartData } from "../Thunk/cartThunk";
import { addOrderData } from "../Thunk/orderThunk";
import { deleteAddress, fetchUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { getAddress } from "../redux/authSlice";
import AddAddress from "../components/addAddress/addAddress";
import { openSnackbar } from "../redux/snackBarSlice";

function CheckOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [open, setOpen] = useState(false);
  const [editAddMode, setEditAddMode] = useState(false);
  const [editAddId, setEditAddId] = useState(null);
  const [editAddData, setEditAddData] = useState("");
  const [checked, setChecked] = useState(false);
  const { cartData, total } = useSelector((state) => state.cart);
  const { user, address } = useSelector((state) => state.auth);

  const handleChange = (event) => {
    const selectId = event.target.value;
    const fullAddress = address.find((a) => a._id === selectId);
    setSelectedAddress(fullAddress);
  };
  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };
  const handlePayment = async () => {
    if (!selectedAddress) {
      dispatch(
        openSnackbar({ massage: "Please select Address", severity: "error" })
      );
    } else {
      setSelectedAddress(selectedAddress);
      setChecked(true);
    }
  };
  const handlePlaceOrder = async () => {
    try {
      await dispatch(addOrderData({ ...selectedAddress })).unwrap();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteAddress = async (id) => {
    try {
      await dispatch(deleteAddress(id)).unwrap();
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditAddress = (add) => {
    setOpen(true);
    setEditAddMode(true);
    setEditAddId(add._id);
    setEditAddData(add);
  };

  useEffect(() => {
    dispatch(getAllCartData());
    dispatch(getAddress());
    dispatch(fetchUser());
  }, [dispatch]);

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
          {checked ? (
            <>
              <Box
                sx={{
                  width: "60%",
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <Box
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="h5">Select Payment Method</Typography>
                  </Box>
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
                      width: "80%",
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ArrowDownwardIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography component="span" variant="h5">
                          Cash On Delivery
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Box>
                          <FormControlLabel
                            control={<Radio />}
                            label={total - (total / 100) * (20).toFixed(2)}
                          />
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ArrowDownwardIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography component="span" variant="h5">
                          UPI
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <FormControl component="fieldset">
                          <RadioGroup
                            name="address"
                            value={selectedPayment}
                            onChange={handlePaymentChange}
                          >
                            <Box>
                              <FormControlLabel
                                control={<Radio />}
                                value="googlePay"
                                label="GooglePay"
                              />
                            </Box>
                            <Box>
                              <FormControlLabel
                                value="PhonePay"
                                control={<Radio />}
                                label="PhonePay"
                              />
                            </Box>
                            <Box>
                              <FormControlLabel
                                value="Paytm"
                                control={<Radio />}
                                label="Paytm"
                              />
                            </Box>
                          </RadioGroup>
                        </FormControl>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ArrowDownwardIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography component="span" variant="h5">
                          Card
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Box
                          sx={{
                            width: "100%",
                          }}
                        >
                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "column",
                              gap: 5,
                            }}
                          >
                            <Box
                              sx={{
                                width: "100%",
                              }}
                            >
                              <TextField
                                label="Card Number"
                                name="cardNumber"
                                fullWidth
                              />
                            </Box>
                            <Box
                              sx={{
                                width: "100%",
                                display: "flex",
                                gap: 5,
                              }}
                            >
                              <TextField
                                label="Expiry Date"
                                name="expiryDate"
                                fullWidth
                              />
                              <TextField label="CVV" name="cvv" fullWidth />
                            </Box>
                            <Box>
                              <Box>
                                <FormControlLabel
                                  control={<Checkbox />}
                                  label="save details"
                                />
                              </Box>
                            </Box>
                            <Box
                              sx={{
                                width: "100%",
                              }}
                            >
                              <Button
                                className="black"
                                variant="contained"
                                sx={{
                                  width: "100%",
                                  p: 1.5,
                                }}
                              >
                                Pay
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                </Box>
              </Box>
            </>
          ) : (
            <>
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
                  <Typography variant="h4"> PERSONAL DETAILS</Typography>
                </Box>
                {user && (
                  <Box
                    key={user._id}
                    style={{
                      width: "100%",
                      display: "flex",
                      marginTop: "50px",
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
                          p: 2,
                          flexDirection: "column",
                          gap: 3,
                        }}
                      >
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            gap: 5,
                          }}
                        >
                          <Box>
                            <Typography variant="body1">FulLName:</Typography>
                            <TextField fullWidth value={user.fullName} />
                          </Box>
                          <Box>
                            <Typography variant="body1">Number:</Typography>
                            <TextField fullWidth value={user.number} />
                          </Box>
                        </Box>
                        <Box>
                          <Typography variant="body1">Email:</Typography>
                          <TextField fullWidth value={user.email} />
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          width: "100%",
                          p: 2,
                        }}
                      >
                        <FormControl component="fieldset">
                          <RadioGroup
                            name="address"
                            value={selectedAddress?._id || ""}
                            onChange={handleChange}
                          >
                            {address?.map((add) => (
                              <FormControlLabel
                                key={add._id}
                                value={add._id}
                                control={<Radio />}
                                label={
                                  <>
                                    <Box
                                      sx={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: 5,
                                      }}
                                    >
                                      <Box>
                                        <Typography variant="h6">
                                          {add.address}
                                        </Typography>
                                        <Typography variant="h6">
                                          {add.city}, {add.pincode},{" "}
                                          {add.country}
                                        </Typography>
                                      </Box>
                                      <Box>
                                        <Box>
                                          <IconButton
                                            onClick={() => {
                                              handleDeleteAddress(add._id);
                                            }}
                                          >
                                            <DeleteIcon color="error" />
                                          </IconButton>
                                        </Box>
                                        <Box>
                                          <IconButton
                                            onClick={() => {
                                              handleEditAddress(add);
                                            }}
                                          >
                                            <EditIcon color="info" />
                                          </IconButton>
                                        </Box>
                                      </Box>
                                    </Box>
                                  </>
                                }
                              />
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </Box>
                      <Box
                        onClick={() => setOpen(true)}
                        sx={{
                          width: "30%",
                          borderRadius: 10,
                          backgroundColor: "#f0f0f0",
                          p: 2,
                          cursor: "pointer",
                        }}
                      >
                        <Typography variant="h6"> + Add New Address</Typography>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            </>
          )}

          <AddAddress
            open={open}
            editAddMode={editAddMode}
            editData={editAddData}
            editId={editAddId}
            onClose={() => {
              setOpen(false);
              setEditAddMode(false);
            }}
          />
          <Box
            sx={{
              width: "40%",
            }}
          >
            {checked ? (
              <></>
            ) : (
              <>
                <Box
                  sx={{
                    width: "90%",
                    mt: 5,
                  }}
                >
                  {cartData?.map((product) => {
                    return (
                      <Box
                        key={product.productId._id}
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
                            src={`http://192.168.2.222:5000/${product.productId.image}`}
                            alt=""
                          />
                        </Box>
                        <Box
                          sx={{
                            width: "80%",
                            p: 1,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            // gap: 15,
                            alignItems: "center",
                          }}
                        >
                          <Typography variant="h5">
                            {product.productId.name}
                          </Typography>

                          <Typography variant="body1">
                            ${product.productId.price} x {product.quantity}
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
              </>
            )}

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
                <Typography variant="h5">${total}</Typography>
              </Box>
              <Box
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
              </Box>
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
                  $ {total - (total / 100) * (20).toFixed(2)}
                </Typography>
              </Box>
            </Box>
            {checked ? (
              <Box sx={{ width: "100%" }}>
                <Button
                  onClick={() => {
                    handlePlaceOrder();
                  }}
                  className="black"
                  variant="contained"
                  sx={{ width: "80%", p: 1.5, mt: 10, borderRadius: 7 }}
                >
                  Place Order
                </Button>
              </Box>
            ) : (
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <Button
                  onClick={() => {
                    handlePayment();
                  }}
                  sx={{
                    width: "80%",
                    borderRadius: 7,
                    p: 1.5,
                    mt: 10,
                  }}
                  variant="contained"
                  className="black"
                >
                  Make A Payment
                </Button>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default CheckOut;
