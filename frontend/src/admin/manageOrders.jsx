import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrderAdminData,
  updateOrderAdminData,
} from "../Thunk/orderThunk";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Divider,
  Box,
  Button,
  Chip,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";

function ManageOrders() {
  const dispatch = useDispatch();
  const { allOrders } = useSelector((state) => state.order);
  const [filter, setFilter] = useState("");
  console.log(filter);
  console.log(allOrders);
  useEffect(() => {
    dispatch(getAllOrderAdminData(filter));
  }, [filter]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Grid container direction="column" sx={{ width: "100%" }}>
        <Typography variant="h4" gutterBottom>
          Order Details
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
          <Tabs
            sx={{
              width: "100%",
            }}
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              label="All"
              onClick={() => setFilter("")}
              sx={{ width: "25%" }}
            />
            <Tab
              label="Pending"
              onClick={() => setFilter("pending")}
              sx={{ width: "25%" }}
            />
            <Tab
              label="Delivered"
              onClick={() => setFilter("delivered")}
              sx={{ width: "25%" }}
            />
            <Tab
              label="Canceled"
              onClick={() => setFilter("canceled")}
              sx={{ width: "25%" }}
            />
          </Tabs>
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            pt: 4,
          }}
        >
          <Box>
            {allOrders?.length === 0 ? (
              <Typography variant="body1">No orders found.</Typography>
            ) : (
              allOrders.map((order) => (
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
                    </Typography>
                    <Typography>Total: ₹{order.total}</Typography>
                    <Divider sx={{ my: 2 }} />

                    <Typography variant="h6" gutterBottom>
                      Coustomer Details
                    </Typography>
                    {order.userId && (
                      <Box>
                        <Typography>Name: {order.userId.fullName}</Typography>
                        <Typography>Number: {order.userId.number}</Typography>
                        <Typography>Email: {order.userId.email}</Typography>
                      </Box>
                    )}
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
                              <Typography>Size: {productItem.size}</Typography>
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
                    </Grid>
                    {order.status === "pending" ? (
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "flex-end",
                          pt: 3,
                        }}
                      >
                        <Button
                          onClick={() => {
                            console.log(order._id);
                            dispatch(updateOrderAdminData(order._id));
                          }}
                          variant="contained"
                          className="black"
                          sx={{
                            borderRadius: 7,
                            px: 2,
                          }}
                        >
                          Delivered
                        </Button>
                      </Box>
                    ) : (
                      <></>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </Box>
        </Box>
      </Grid>
    </>
  );
}

export default ManageOrders;
