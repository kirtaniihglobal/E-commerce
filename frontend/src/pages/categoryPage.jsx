import {
  Box,
  Grid,
  Typography,
  Button,
  Stack,
  Card,
  Divider,
  Slider,
  Chip,
  Paper,
  ButtonBase,
  Skeleton,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
// import { useState } from "react";
import { getAllproductsData } from "../Thunk/productThunk";
import { useEffect, useState } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import ProductCard from "../comon/productCard";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/header/header";
import { useRef } from "react";
import useIntersectionObserver from "../components/myHook/intersaction";
function CategoryPage() {
  const dispatch = useDispatch();
  const [minNum, setMinNum] = useState(0);
  const [maxNum, setMaxNum] = useState(1000);
  const minmin = 0;
  const maxmax = 1000;
  const [priceRangeValue, setPriceRangeValue] = useState([100, 500]);
  const handlePriceRangeChange = (event, newValue) => {
    setMinNum(newValue[0]);
    setMaxNum(newValue[1]);
    setPriceRangeValue(newValue);
  };
  const loaderRef = useRef(null);
  const { products, total } = useSelector((state) => state.products);
  console.log(products);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 6;
  // const loading = true;
  useEffect(() => {
    dispatch(getAllproductsData({ skip: 0, limit }));
    setSkip(limit);
  }, [dispatch]);

  const loadMoreProducts = () => {
    if (loading || products.length >= total) return;
    setLoading(true);
    dispatch(getAllproductsData({ skip, limit })).finally(() => {
      setSkip((prev) => prev + limit);
      setLoading(false);
    });
  };
  useIntersectionObserver({
    target: loaderRef,
    onIntersect: loadMoreProducts,
    enabled: !loading && products.length < total,
  });

  return (
    <>
      <Header />
      <Box
        sx={{
          // height:"100vh",
          width: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            // backgroundColor:"black",
            // position: "sticky",
            // top: "100px",
            // left:0,
            width: "25%",
            p: 2,
          }}
        >
          <Box
            sx={{
              position: "sticky",
              top: 100,
              left: 0,
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
              <Button size="small">
                <FilterAltIcon />
              </Button>
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
                  ml: 2,
                }}
              >
                <ButtonBase
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: "black",
                    border: "2px solid white",
                    boxShadow: "0 0 0 1px #ccc",
                  }}
                />
                <ButtonBase
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: "red",
                    border: "2px solid white",
                    boxShadow: "0 0 0 1px #ccc",
                  }}
                />
                <ButtonBase
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: "green",
                    border: "2px solid white",
                    boxShadow: "0 0 0 1px #ccc",
                  }}
                />
                <ButtonBase
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: "yellow",
                    border: "2px solid white",
                    boxShadow: "0 0 0 1px #ccc",
                  }}
                />
                <ButtonBase
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: "gray",
                    border: "2px solid white",
                    boxShadow: "0 0 0 1px #ccc",
                  }}
                />
                <ButtonBase
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: "pink",
                    border: "2px solid white",
                    boxShadow: "0 0 0 1px #ccc",
                  }}
                />
                <ButtonBase
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: "blue",
                    border: "2px solid white",
                    boxShadow: "0 0 0 1px #ccc",
                  }}
                />
                <ButtonBase
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: "orange",
                    border: "2px solid white",
                    boxShadow: "0 0 0 1px #ccc",
                  }}
                />
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
        </Box>
        <Box
          sx={{
            width: "75%",
          }}
        >
          <Box
            sx={{
              p: 3,
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
            }}
          >
            {products.map((product, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Box>
          <Box
            ref={loaderRef}
            id="loader"
            sx={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {loading &&
              Array.from({ length: 6 }).map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 295,
                    height: 508,
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    p: 2,
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    height={298}
                    sx={{ borderRadius: 2 }}
                  />
                  <Skeleton variant="text" height={40} width="80%" />
                  <Skeleton variant="text" height={30} width="60%" />
                  <Skeleton variant="text" height={30} width="40%" />
                  <Skeleton
                    variant="rectangular"
                    height={50}
                    width="100%"
                    sx={{ borderRadius: 2 }}
                  />
                </Box>
              ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default CategoryPage;
