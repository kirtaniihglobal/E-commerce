import {
  Box,
  Grid,
  Typography,
  Button,
  Pagination,
  Stack,
} from "@mui/material";
import { getAllproductsData } from "../Thunk/productThunk";
import { useEffect, useState } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import ProductCard from "../comon/productCard";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/header/header";
function CategoryPage() {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage] = useState(9);
  const { products } = useSelector((state) => state.products);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const lastProduct = currentPage * productPerPage;
  const firstProduct = lastProduct - productPerPage;
  const currentProduct = products.slice(firstProduct, lastProduct);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    dispatch(getAllproductsData());
  }, [dispatch, currentPage]);
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
          }}
        >
          <Box></Box>
        </Grid>
        <Grid
          container
          spacing={0}
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
            {currentProduct.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
            <Stack spacing={2}>
              <Pagination
                count={10}
                page={currentPage}
                onChange={handleChange}
                shape="rounded"
                paginate={paginate}
              />
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default CategoryPage;
