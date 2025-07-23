import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const sessionId = new URLSearchParams(location.search).get("session_id");
    if (sessionId) {
      console.log("Payment Success:", sessionId);
    }
  }, []);

  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h4" color="green" gutterBottom>
        Payment Successful!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Your order has been placed successfully.
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate("/profile/myOrders")}
        sx={{ mt: 2 }}
      >
        View My Orders
      </Button>
    </Box>
  );
};

export default SuccessPage;
