import { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

function ManageProducts() {
  const [open, setOpen] = useState(false);

  const handaleOpen = () => {
    setOpen(true);
  };
  const handaleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Container maxWidth="xl">
        <Grid container>
          <Box
            sx={{
              width: "100%",
            }}
          >
            <h1>Add Product </h1>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              mb: 4,
            }}
          >
            <Button
              onClick={handaleOpen}
              variant="contained"
              className="black"
              sx={{
                borderRadius: 5,
              }}
            >
              Add Product
            </Button>
            <Dialog
              open={open}
              onClose={handaleClose}
              slotProps={{
                paper: {
                  component: "form",
                },
              }}
            >
              <DialogTitle>Add Product</DialogTitle>
              <DialogContent>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <Box>
                    <input type="file" name="Image" label="Image" />
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      gap: 3,
                    }}
                  >
                    <TextField name="Name" label="Name" />
                    <TextField name="Price" label="Price" />
                  </Box>
                  <Box>
                    <TextField
                      fullWidth
                      name="Description"
                      label="Description"
                    />
                  </Box>
                  <Box
                    sx={{
                      width: "80%",
                    }}
                  >
                    <TextField fullWidth name="Stock" label="Stock" />
                  </Box>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handaleClose}
                  variant="outlined"
                  className="white"
                  sx={{
                    borderRadius: 5,
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="outlined"
                  className="white"
                  sx={{
                    borderRadius: 5,
                  }}
                >
                  Add
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
          <Box
            sx={{
              border: "1px solid black",
              width: "100%",
            }}
          >
            <Table sx={{ Width: "100%" }}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Stock</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>t-shirt</TableCell>
                  <TableCell>
                    <Avatar></Avatar>
                  </TableCell>
                  <TableCell>100$</TableCell>
                  <TableCell>t-shirt for man</TableCell>
                  <TableCell>22</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Grid>
      </Container>
    </>
  );
}

export default ManageProducts;
