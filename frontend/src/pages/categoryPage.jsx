import {
  Box,
  Grid,
  Typography,
  Button,
  Divider,
  Slider,
  Chip,
  ButtonBase,
  Skeleton,
  Container,
} from "@mui/material";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { getAllproductsData } from "../Thunk/productThunk";
import { useEffect, useState } from "react";
import ProductCard from "../comon/productCard";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/header/header";
function CategoryPage() {
  const dispatch = useDispatch();
  // const minmin = 0;
  // const maxmax = 1000;
  const { products, total } = useSelector((state) => state.products);
  // const [priceRangeValue, setPriceRangeValue] = useState([100, 500]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 12;
  useEffect(() => {
    dispatch(getAllproductsData({ skip: 0, limit }));
    setSkip(limit);
  }, [dispatch]);

  // const handlePriceRangeChange = (event, newValue) => {
  //   setPriceRangeValue(newValue);
  // };
  const loadMoreProducts = () => {
    if (loading || products.length >= total) return;
    setLoading(true);
    dispatch(getAllproductsData({ skip, limit })).finally(() => {
      setSkip((prev) => prev + limit);
      setLoading(false);
    });
  };

  return (
    <>
      <Header />
      <Container maxWidth={false} disableGutters>
        <Box
          sx={{
            width: "auto",
            display: "flex",
            flexDirection: "row",
          }}
        >
          {/* <Box
          sx={{
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
        </Box> */}
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: "auto",
                p: 3,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 3,
              }}
            >
              {products.map((product, index) => (
                <Grid key={index}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Box>
            <Box
              sx={{
                width: "auto",
                display: "flex",
                justifyContent: "center",
                p: 5,
              }}
            >
              <Button
                sx={{
                  width: "50%",
                  borderRadius: 7,
                  px: 2,
                  py: 2,
                }}
                variant="outlined"
                className="white"
                onClick={loadMoreProducts}
                disabled={loading || products.length >= total}
              >
                {loading
                  ? "Loading..."
                  : products.length >= total
                  ? "No More Products"
                  : "Load More"}
              </Button>
            </Box>
            <Box
              id="loader"
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {loading &&
                Array.from({ length: 4 }).map((_, index) => (
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
      </Container>
    </>
  );
}

export default CategoryPage;
