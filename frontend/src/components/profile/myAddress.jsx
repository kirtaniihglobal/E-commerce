import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  IconButton,
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
    } catch (error) {}
  };

  const handleEditAddress = (add) => {
    setOpen(true);
    setEditAddMode(true);
    setEditAddId(add._id);
    // console.log(add._id);
    setEditAddData(add);
    // console.log(add);
  };

  return (
    <>
      <Container maxWidth="xl">
        <Grid
          container
          sx={{
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              p: 2,
            }}
          >
            <Button variant="contained" onClick={() => setOpen(true)}>
              + Add New Address
            </Button>
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
          <Grid
            sx={{
              ml: 5,
              width: "100%",
              display: "flex",
              gap: 3,
              flexDirection: "column",
            }}
          >
            {address?.length === 0 ? (
              <Typography
                variant="h4"
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
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      p: 3,
                      width: "400px",
                      borderRadius: 2,
                      border: "1px solid black",
                      display: "flex",
                    }}
                  >
                    <Box>
                      <Typography variant="h6">{add.address}</Typography>
                      <Typography variant="h6">
                        {add.city}, {add.pincode}, {add.country}
                      </Typography>
                    </Box>
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
              ))
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default MyAddress;
