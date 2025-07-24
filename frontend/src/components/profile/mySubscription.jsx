import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "../../redux/authSlice";
import { Box, Typography } from "@mui/material";

function MySubscription() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  return (
    <>
      <Box
        sx={{
          mt: 5,
        }}
      >
        {user?.isSubscribe === "basic" || user?.isSubscribe === "premium" ? (
          <>
            <Typography variant="h3" align="center">
              Already Subscribed
            </Typography>
          </>
        ) : (
          <stripe-pricing-table
            pricing-table-id="prctbl_1Ro18LQZ9KjLUhb41VcmdA3m"
            publishable-key="pk_test_51RnY3oQZ9KjLUhb4pk7asbXcqmHYgnRTLwIKsVkXzJ6xTv9U19DAjNpLzs0ePNMroXxXaqeZkXhCSjk2YvBdPSup00wrhTJ41L"
            client-reference-id={user?._id}
          ></stripe-pricing-table>
        )}
      </Box>
    </>
  );
}

export default MySubscription;
