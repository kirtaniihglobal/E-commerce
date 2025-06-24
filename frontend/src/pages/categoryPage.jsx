import {
  Box,
  Grid,
  Typography,
  Button,
  Pagination,
  Stack,
  Card,
  Divider,
  Slider,
  Chip,
} from "@mui/material";
// import { useState } from "react";
import { getAllproductsData } from "../Thunk/productThunk";
import { useEffect, useState } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import ProductCard from "../comon/productCard";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/header/header";
function CategoryPage() {
  const dispatch = useDispatch();
  const [minNum, setMinNum] = useState(0);
  const [maxNum, setMaxNum] = useState(1000);
  const minmin = 0;
  const maxmax = 1000;
  const [priceRangeValue, setPriceRangeValue] = useState([100, 500]);
  // function valuetext(value) {
  //   return `${value}`;
  // }
  const handlePriceRangeChange = (event, newValue) => {
    setMinNum(newValue[0]);
    setMaxNum(newValue[1]);
    setPriceRangeValue(newValue);
  };

  // const [currentPage, setCurrentPage] = useState(1);
  // const [productPerPage] = useState(9);
  const { products } = useSelector((state) => state.products);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // const lastProduct = currentPage * productPerPage;
  // const firstProduct = lastProduct - productPerPage;
  // const currentProduct = products.slice(firstProduct, lastProduct);
  // const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // const handleChange = (value) => {
  //   setCurrentPage(value);
  // };

  useEffect(() => {
    dispatch(getAllproductsData());
  }, [dispatch]);
  return (
    <>
      <Header />
      <Grid
        container
        spacing={2}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Grid
          container
          sx={{
            width: "25%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "80%",
              border: "1px solid black",
            }}
          >
            <Box
              sx={{
                width: "90%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                p: 3,
              }}
            >
              <Typography variant="h5">Filters</Typography>
              <Button>hello</Button>
            </Box>
            <Divider sx={{ width: "100%" }} />
            <Box sx={{ width: "100%" }}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  p: 1,
                }}
              >
                <Typography>Tshirt</Typography>
                <Button>h</Button>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  p: 1,
                }}
              >
                <Typography>Tshirt</Typography>
                <Button>h</Button>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  p: 1,
                }}
              >
                <Typography>Tshirt</Typography>
                <Button>h</Button>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  p: 1,
                }}
              >
                <Typography>Tshirt</Typography>
                <Button>h</Button>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  p: 1,
                }}
              >
                <Typography>Tshirt</Typography>
                <Button>h</Button>
              </Box>
            </Box>
            <Divider sx={{ width: "100%" }} />
            <Box sx={{ width: "100%" }}>
              <Box
                sx={{
                  width: "90%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  p: 3,
                }}
              >
                <Typography variant="h5">Price</Typography>
                <Button>hello</Button>
              </Box>
              <Box>
                <Slider
                  getAriaLabel={() => "Price range"}
                  value={priceRangeValue}
                  onChange={handlePriceRangeChange}
                  valueLabelDisplay="auto"
                  // getAriaValueText={valuetext}
                  min={minmin}
                  max={maxmax}
                />
              </Box>
            </Box>
            <Divider sx={{ width: "100%" }} />
            <Box sx={{ width: "100%" }}>
              <Box
                sx={{
                  width: "90%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  p: 3,
                }}
              >
                <Typography variant="h5">Colors</Typography>
                <Button>hello</Button>
              </Box>
              <Box
                sx={{
                  width: "90%",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                  ml: 3,
                  // justifyContent: "space-evenly",
                }}
              >
                <Box
                  variant="contained"
                  sx={{
                    width: "20px",
                    height: "20px",
                    p: 1,
                    borderRadius: "50%",
                    backgroundColor: "black",
                  }}
                ></Box>
                <Box
                  variant="contained"
                  sx={{
                    width: "20px",
                    height: "20px",
                    p: 1,
                    borderRadius: "50%",
                    backgroundColor: "red",
                  }}
                ></Box>
                <Box
                  variant="contained"
                  sx={{
                    width: "20px",
                    height: "20px",
                    p: 1,
                    borderRadius: "50%",
                    backgroundColor: "green",
                  }}
                ></Box>
                <Box
                  variant="contained"
                  sx={{
                    width: "20px",
                    height: "20px",
                    p: 1,
                    borderRadius: "50%",
                    backgroundColor: "yellow",
                  }}
                ></Box>
                <Box
                  variant="contained"
                  sx={{
                    width: "20px",
                    height: "20px",
                    p: 1,
                    borderRadius: "50%",
                    backgroundColor: "grey",
                  }}
                ></Box>

                <Box
                  variant="contained"
                  sx={{
                    width: "20px",
                    height: "20px",
                    p: 1,
                    borderRadius: "50%",
                    backgroundColor: "pink",
                  }}
                ></Box>
                <Box
                  variant="contained"
                  sx={{
                    width: "20px",
                    height: "20px",
                    p: 1,
                    borderRadius: "50%",
                    backgroundColor: "blue",
                  }}
                ></Box>
                <Box
                  variant="contained"
                  sx={{
                    width: "20px",
                    height: "20px",
                    p: 1,
                    borderRadius: "50%",
                    backgroundColor: "black",
                  }}
                ></Box>
                <Box
                  variant="contained"
                  sx={{
                    width: "20px",
                    height: "20px",
                    p: 1,
                    borderRadius: "50%",
                    backgroundColor: "#7D06F5",
                  }}
                ></Box>
                <Box
                  variant="contained"
                  sx={{
                    width: "20px",
                    height: "20px",
                    p: 1,
                    borderRadius: "50%",
                    backgroundColor: "orange",
                  }}
                ></Box>
              </Box>
            </Box>
            <Divider sx={{ width: "100%" }} />

            <Box
              sx={{
                width: "100%",
              }}
            >
              <Box
                sx={{
                  width: "90%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  p: 3,
                }}
              >
                <Typography variant="h5">Sizes</Typography>
                <Button>hello</Button>
              </Box>
              <Box>
                <Chip
                  sx={{
                    p: 2,
                  }}
                  clickable
                  label="big"
                />
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid
          container
          spacing={5}
          sx={{
            width: "70%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid
            sx={{
              width: "90%",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </Grid>
          <Stack spacing={2}>
            {/* <Pagination
              count={10}
              page={currentPage}
              onChange={handleChange}
              shape="rounded"
              paginate={paginate}
            /> */}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default CategoryPage;
