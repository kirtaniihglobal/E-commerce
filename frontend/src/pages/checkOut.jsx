import {
  Box,
  Button,
  Typography,
  Divider,
  TextField,
  Checkbox,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  IconButton,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Container,
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm", "ssm", "xs"));
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [open, setOpen] = useState(false);
  const [editAddMode, setEditAddMode] = useState(false);
  const [editAddId, setEditAddId] = useState(null);
  const [editAddData, setEditAddData] = useState("");
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      await dispatch(addOrderData({ ...selectedAddress })).unwrap();
      setLoading(false);
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
      {loading ? (
        <Box
          sx={{
            width: "100%",
            height: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress size={80} color="primary" />
        </Box>
      ) : (
        <Container maxWidth={false} disableGutters>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: {
                xs: "column",
                ssm: "column",
                sm: "column",
                md: "row",
                lg: "row",
                xl: "row",
                xxl: "row",
              },
            }}
          >
            {checked ? (
              <>
                <Box
                  sx={{
                    width: "100%",
                  }}
                >
                  <Box sx={{ width: "auto" }}>
                    <Box
                      sx={{
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="h5">
                        Select Payment Method
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      width: "auto",
                      display: "flex",
                      justifyContent: "center",
                      mt: 5,
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
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
                              label={total}
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
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      width: "auto",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant={isMobile ? "h5" : "h4"}>
                      {" "}
                      PERSONAL DETAILS
                    </Typography>
                  </Box>
                  {user && (
                    <Box
                      key={user._id}
                      style={{
                        width: "auto",
                        display: { xs: "flex" },
                        marginTop: "50px",
                        justifyContent: "center",
                      }}
                    >
                      <Box
                        sx={{
                          width: { md: "90%", lg: "90%", xl: "90%" },
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                        }}
                      >
                        <Box
                          sx={{
                            width: "auto",
                            display: "flex",
                            p: 2,
                            flexDirection: "column",
                            gap: 3,
                          }}
                        >
                          <Box
                            sx={{
                              width: "auto",
                              display: { xs: "flex", xl: "block" },
                              gap: { xs: 2, sm: 5, md: 5, xl: 5 },
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
                            width: "auto",
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
                                          width: "auto",
                                          display: "flex",
                                          flexDirection: "row",
                                          gap: 1,
                                        }}
                                      >
                                        <Box>
                                          <Typography
                                            variant={isMobile ? "body1" : "h6"}
                                          >
                                            {add.address}
                                          </Typography>
                                          <Typography
                                            variant={isMobile ? "body1" : "h6"}
                                          >
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
                            width: { xs: "auto", md: "50%", xl: "50%" },
                            borderRadius: 10,
                            backgroundColor: "#f0f0f0",
                            p: 2,
                            cursor: "pointer",
                          }}
                        >
                          <Typography variant="h6">
                            {" "}
                            + Add New Address
                          </Typography>
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
                width: { md: "70%", xl: "70%" },
              }}
            >
              {checked ? (
                <></>
              ) : (
                <>
                  <Box
                    sx={{
                      width: "auto",
                      mt: 5,
                    }}
                  >
                    {cartData?.map((product) => {
                      return (
                        <Box
                          key={product.productId._id}
                          sx={{
                            width: "auto",
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          <Box
                            sx={{
                              width: {
                                xs: "20%",
                                sm: "15%",
                                md: "10%",
                                xl: "10%",
                              },
                              p: { md: 2, xl: 2 },
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
                              width: "auto",
                              p: 1,
                              display: { sm: "flex", md: "flex", xl: "flex" },
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
                  width: "auto",
                  height: "460px",
                  mt: 5,
                  p: { xs: 1.5, md: 3, xl: 3 },
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
                    <Typography variant={isMobile ? "h4" : "h3"}>
                      Order Summary
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "auto",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant={isMobile ? "h6" : "h5"}>
                      Subtotal
                    </Typography>
                    <Typography variant={isMobile ? "h6" : "h5"}>
                      ${total}
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
                    <Typography variant={isMobile ? "h6" : "h5"} color="green">
                      Delivery Free
                    </Typography>
                    <Typography variant={isMobile ? "h6" : "h5"} color="green">
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
                    <Typography variant={isMobile ? "h5" : "h4"}>
                      Total
                    </Typography>
                    <Typography variant={isMobile ? "h5" : "h4"}>
                      ${total}
                    </Typography>
                  </Box>
                </Box>
                {checked ? (
                  <Box sx={{ width: "auto" }}>
                    <Button
                      onClick={() => {
                        handlePlaceOrder();
                      }}
                      className="black"
                      variant="contained"
                      sx={{ width: "100%", p: 1.5, mt: 10, borderRadius: 7 }}
                    >
                      Place Order
                    </Button>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      width: "auto",
                    }}
                  >
                    <Button
                      onClick={() => {
                        handlePayment();
                      }}
                      sx={{
                        width: "100%",
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
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
}

export default CheckOut;
