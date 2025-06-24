import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrderData } from "../../Thunk/orderThunk";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Divider,
  Box,
} from "@mui/material";

function MyOrders() {
  const dispatch = useDispatch();
  const { orderData } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getAllOrderData());
  }, [dispatch]);

  return (
    <>
      <Grid container direction="column" p={3}>
        <Typography variant="h4" gutterBottom>
          Order Details
        </Typography>

        {orderData?.length === 0 ? (
          <Typography variant="body1">No orders found.</Typography>
        ) : (
          orderData.map((order) => (
            <Card key={order._id} sx={{ mb: 3, p: 2 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Order ID: {order._id}
                </Typography>
                <Typography>Status: {order.status}</Typography>
                <Typography>Total: ₹{order.total}</Typography>
                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" gutterBottom>
                  Shipping Address
                </Typography>
                {order.info && order.info.length > 0 && (
                  <Box>
                    <Typography>Address: {order.info[0].address}</Typography>
                    <Typography>City: {order.info[0].city}</Typography>
                    <Typography>Pincode: {order.info[0].pincode}</Typography>
                    <Typography>Country: {order.info[0].country}</Typography>
                  </Box>
                )}
                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" gutterBottom>
                  Products
                </Typography>
                <Grid container spacing={2}>
                  {order.orderData?.products?.map((productItem) => (
                    <Grid item xs={12} md={8} key={productItem._id}>
                      <Card variant="outlined" sx={{ display: "flex", p: 1 }}>
                        <img
                          src={`http://192.168.2.222:5000/${productItem.productId.image}`}
                          alt={productItem.productId.name}
                          width={120}
                          height={120}
                          style={{ objectFit: "cover", marginRight: 10 }}
                        />
                        <Box>
                          <Typography>
                            Name: {productItem.productId.name}
                          </Typography>
                          <Typography>Color: {productItem.color}</Typography>
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
              </CardContent>
            </Card>
          ))
        )}
      </Grid>
    </>
  );
}

export default MyOrders;
