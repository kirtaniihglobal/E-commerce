import { useEffect } from "react";
import {
  Avatar,
  Container,
  Grid,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Button,
  IconButton,
} from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import { useDispatch, useSelector } from "react-redux";
import { blockUser, getAllUsers } from "../redux/authSlice";

function ManageUsers() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.auth);
  console.log(users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  return (
    <>
      <Container maxWidth="xl">
        <Grid container>
          <Box
            sx={{
              width: "100%",
            }}
          >
            <h1>Users </h1>
          </Box>
          <Box
            sx={{
              border: "2px solid black",
              width: "100%",
            }}
          >
            <TableContainer style={{ maxHeight: 500 }}>
              <Table
                stickyHeader
                aria-label="sticky table"
                sx={{ Width: "100%" }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>FullName</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                {users?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4}>No users found</TableCell>
                  </TableRow>
                ) : (
                  users?.map((u) => (
                    <TableBody key={u._id}>
                      <TableRow>
                        <TableCell>{u.fullName}</TableCell>
                        <TableCell>
                          {u.image && (
                            <Avatar
                              src={`http://192.168.2.222:5000/${u.image}`}
                              width="60"
                              height="60"
                            />
                          )}
                        </TableCell>
                        <TableCell>{u.email}</TableCell>
                        <TableCell
                          style={{
                            maxWidth: "500px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {u.address}
                        </TableCell>
                        <TableCell>{u.number}</TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => {
                              dispatch(blockUser(u._id));
                            }}
                          >
                            <BlockIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ))
                )}
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Container>
    </>
  );
}

export default ManageUsers;
