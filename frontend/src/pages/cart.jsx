import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import Header from "../components/header/header";
import img from "../assets/prod9.png";
import DeleteIcon from "@mui/icons-material/Delete";

function Cart() {
  return (
    <>
      <Header />
      <Grid
        container
        maxWidth="xl"
        sx={{
          // height: "10px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            height: "100px",
          }}
        >
          <Typography variant="h3">Your cart</Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            // height: "auto",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: 3,
          }}
        >
          <Box
            sx={{
              width: "45%",
              // height: "auto",
              border: "2px solid #0000001A",
              borderRadius: 3,
              p: 3,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                gap: 2,
              }}
            >
              <Box sx={{ width: "20%" }}>
                <img
                  style={{
                    width: "100%",
                  }}
                  src={img}
                  alt=" "
                />
              </Box>
              <Box
                sx={{
                  width: "60%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h5">Gradient Graphic T-shirt</Typography>
                <Typography variant="body1">Size: Large</Typography>
                <Typography variant="body1">Color: White</Typography>
                <Typography variant="h5">$145</Typography>
              </Box>
              <Box
                sx={{
                  width: "20%",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "flex-end",
                  alignItems: "end",
                  position: "relative",
                }}
              >
                <Button sx={{ position: "absolute", top: 0, right: 0 }}>
                  <DeleteIcon color="error" />
                </Button>
                <Box
                  sx={{
                    width: "80%",
                    height: "30%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                    backgroundColor: "#f0f0f0",
                    // border: "1px solid black",
                  }}
                >
                  <Button>-</Button>
                  <Typography>1</Typography>
                  <Button>+</Button>
                </Box>
              </Box>
            </Box>

            <Divider
              sx={{
                width: "100%",
              }}
            />
            {/* <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                gap: 2,
              }}
            >
              <Box sx={{ width: "20%" }}>
                <img
                  style={{
                    width: "100%",
                  }}
                  src={img}
                  alt=" "
                />
              </Box>
              <Box
                sx={{
                  width: "60%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h5">Gradient Graphic T-shirt</Typography>
                <Typography variant="body1">Size: Large</Typography>
                <Typography variant="body1">Color: White</Typography>
                <Typography variant="h5">$145</Typography>
              </Box>
              <Box
                sx={{
                  width: "20%",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "flex-end",
                  alignItems: "end",
                  position: "relative",
                }}
              >
                <Button sx={{ position: "absolute", top: 0, right: 0 }}>
                  <DeleteIcon color="error" />
                </Button>
                <Box
                  sx={{
                    width: "80%",
                    height: "30%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                    backgroundColor: "#f0f0f0",
                    // border: "1px solid black",
                  }}
                >
                  <Button>-</Button>
                  <Typography>1</Typography>
                  <Button>+</Button>
                </Box>
              </Box>
            </Box> */}
          </Box>

          <Box
            sx={{
              width: "30%",
              // height: "auto",
              border: "2px solid #0000001A",
              borderRadius: 3,
              p: 3,
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
                <Typography variant="h3">Order Summary</Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h5">Subtotal</Typography>
                <Typography variant="h5">$565</Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h5">Discount (-20%)</Typography>
                <Typography variant="h5">-$113</Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h5">Delivery Fee</Typography>
                <Typography variant="h5">$15</Typography>
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
                <Typography variant="h5">Total</Typography>
                <Typography variant="h5">$467</Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    width: "70%",
                    height: "50px",
                    backgroundColor: "#f0f0f0",
                    borderRadius: 7,
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h6">Add promo code</Typography>
                </Box>
                <Box
                  sx={{
                    width: "25%",
                    height: "50px",
                  }}
                >
                  <Button
                    variant="contained"
                    className="black"
                    sx={{
                      borderRadius: 7,
                      width: "100%",
                      height: "100%",
                      // px: 5,
                      // py: 2,
                    }}
                  >
                    Apply
                  </Button>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <Button
                  sx={{
                    width: "100%",
                    borderRadius: 7,
                    p: 2,
                  }}
                  variant="contained"
                  className="black"
                >
                  Go to Checkout
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>
    </>
  );
}

export default Cart;
