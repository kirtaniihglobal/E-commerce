import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrderData, getAllOrderData } from "../../Thunk/orderThunk";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Divider,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Container,
  Chip,
  Rating,
} from "@mui/material";

function MyOrders() {
  const dispatch = useDispatch();
  const { orderData } = useSelector((state) => state.order);

  const [open, setOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleRatingChange = (event, newValue) => {
    setRatingValue(newValue);
    console.log("value", newValue);
  };

  useEffect(() => {
    dispatch(getAllOrderData());
  }, [dispatch]);

  return (
    <>
      <Container>
        <Grid container direction="column" p={3}>
          <Typography variant="h4" gutterBottom>
            Order Details
          </Typography>

          {orderData?.length === 0 ? (
            <Typography variant="body1">No orders found.</Typography>
          ) : (
            orderData.map((order) => (
              <>
                <Card key={order._id} sx={{ mb: 3, p: 2 }}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      Order ID: {order._id}
                    </Typography>
                    <Typography>
                      Status:{" "}
                      <Chip
                        label={order.status}
                        color={
                          order.status === "pending"
                            ? "warning"
                            : order.status === "canceled"
                            ? "error"
                            : "success"
                        }
                      />
                    </Typography>{" "}
                    <Typography>Total: ₹{order.total}</Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      Shipping Address
                    </Typography>
                    {order.info && order.info.length > 0 && (
                      <Box>
                        <Typography>
                          Address: {order.info[0].address}
                        </Typography>
                        <Typography>City: {order.info[0].city}</Typography>
                        <Typography>
                          Pincode: {order.info[0].pincode}
                        </Typography>
                        <Typography>
                          Country: {order.info[0].country}
                        </Typography>
                      </Box>
                    )}
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      Products
                    </Typography>
                    <Grid container spacing={2}>
                      {order.status === "delivered" ||
                      order.status === "canceled" ? (
                        order.orderData?.products?.map((productItem) => (
                          <Grid item xs={12} md={8} key={productItem._id}>
                            <Card
                              variant="outlined"
                              sx={{ display: "flex", p: 1 }}
                            >
                              <img
                                src={`http://192.168.2.222:5000/${productItem.productId.image}`}
                                alt={productItem.productId.name}
                                width={150}
                                height={150}
                                style={{ objectFit: "cover", marginRight: 10 }}
                              />
                              <Box sx={{ p: 2 }}>
                                <Typography>
                                  {productItem.productId.name}
                                </Typography>
                                <Typography
                                  variant="h6"
                                  sx={{ color: "green" }}
                                >
                                  ₹{productItem.productId.price}
                                </Typography>
                                <Box
                                  sx={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    mt: 4,
                                  }}
                                >
                                  <Rating
                                    size="large"
                                    name="half-rating"
                                    value={ratingValue}
                                    onChange={handleRatingChange}
                                    precision={0.5}
                                  />
                                </Box>
                              </Box>
                            </Card>
                          </Grid>
                        ))
                      ) : (
                        <>
                          {order.orderData?.products?.map((productItem) => (
                            <Grid item xs={12} md={8} key={productItem._id}>
                              <Card
                                variant="outlined"
                                sx={{ display: "flex", p: 1 }}
                              >
                                <img
                                  src={`http://192.168.2.222:5000/${productItem.productId.image}`}
                                  alt={productItem.productId.name}
                                  width={120}
                                  height={120}
                                  style={{
                                    objectFit: "cover",
                                    marginRight: 10,
                                  }}
                                />
                                <Box>
                                  <Typography>
                                    Name: {productItem.productId.name}
                                  </Typography>
                                  <Typography>
                                    Color: {productItem.color}
                                  </Typography>
                                  <Typography>
                                    Size: {productItem.size}
                                  </Typography>
                                  <Typography>
                                    Quantity: {productItem.quantity}
                                  </Typography>
                                  <Typography>
                                    Price: ₹{productItem.productId.price}
                                  </Typography>
                                </Box>
                              </Card>
                            </Grid>
                          ))}
                        </>
                      )}
                    </Grid>
                    {order.status == "pending" ? (
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Button
                          onClick={() => {
                            handleClickOpen();
                          }}
                          variant="contained"
                          sx={{ borderRadius: 7, px: 3 }}
                          className="black"
                        >
                          Cancel
                        </Button>
                      </Box>
                    ) : (
                      <></>
                    )}
                  </CardContent>
                </Card>
                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>{"Alert"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      <Typography variant="" color="error">
                        Are you sure you want to delete this Order
                      </Typography>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      variant="outlined"
                      className="white"
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="outlined"
                      className="white"
                      onClick={() => {
                        dispatch(cancelOrderData(order._id));
                        handleClose();
                      }}
                      autoFocus
                    >
                      Confirm
                    </Button>
                  </DialogActions>
                </Dialog>
              </>
            ))
          )}
        </Grid>
      </Container>
    </>
  );
}

export default MyOrders;
