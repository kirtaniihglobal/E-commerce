import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  IconButton,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { deleteAddress } from "../../redux/authSlice";
import { useEffect, useState } from "react";
import { getAddress } from "../../redux/authSlice";
import { useSelector, useDispatch } from "react-redux";
import AddAddress from "../addAddress/addAddress";

function MyAddress() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const [editAddMode, setEditAddMode] = useState(false);
  const [editAddId, setEditAddId] = useState(null);
  const [editAddData, setEditAddData] = useState("");
  const { address } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getAddress());
  }, [dispatch]);
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

  return (
    <>
      <Container maxWidth={false} disableGutters>
        <Box
          sx={{
            p: 1,
          }}
        >
          <Box
            sx={{
              width: "auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Box>
              <Typography variant={isMobile ? "h6" : "h4"} fontWeight={600}>
                My Address
              </Typography>
            </Box>
            <Box>
              <Button variant="contained" onClick={() => setOpen(true)}>
                + Add New Address
              </Button>
            </Box>
          </Box>
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
              mt: 3,
              width: "100%",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 3,
            }}
          >
            {address?.length === 0 ? (
              <Typography
                variant="body1"
                sx={{
                  textAlign: "center",
                }}
              >
                Dont have Address
              </Typography>
            ) : (
              address.map((add) => (
                <Box
                  key={add._id}
                  sx={{
                    maxWidth: "350px",
                    maxHeight: "350px",
                  }}
                >
                  <Paper
                    elevation={2}
                    sx={{
                      p: 2,
                      display: "flex",
                    }}
                  >
                    <Box>
                      <Typography variant="h6">{add.address}</Typography>
                      <Typography variant="h6">
                        {add.city}, {add.pincode}, {add.country}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
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
                  </Paper>
                </Box>
              ))
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default MyAddress;
