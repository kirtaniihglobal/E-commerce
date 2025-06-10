import { useEffect, useState } from "react";
import {
  Breadcrumbs,
  Container,
  Grid,
  Link,
  Typography,
  Box,
  Chip,
  Divider,
  useTheme,
  Button,
  Tab,
  Tabs,
} from "@mui/material";
import {
  getAllproductsData,
  getOneproductData,
} from "../../Thunk/productThunk";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import prod9 from "../../assets/prod9.png";
import prod10 from "../../assets/prod10.png";
import prod11 from "../../assets/prod11.png";
import prod12 from "../../assets/prod12.png";
import ProductCard from "../../comon/productCard";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Header from "../header/header";
import RatingPage from "../ratingPage/ratingPage";
import Footer from "../footer/footer";
import img1 from "../../assets/image 1.png";
import img2 from "../../assets/image 2.png";
import img3 from "../../assets/image 3.png";
import GradeIcon from "@mui/icons-material/Grade";

function ProductDetailPage() {
  const dispatch = useDispatch();
  const [value, setValue] = useState(1);
  const product = useSelector((state) => state.products.selectedProduct);
  const { products } = useSelector((state) => state.products);
  console.log(products);
  console.log(product);
  const { id } = useParams();
  useEffect(() => {
    dispatch(getAllproductsData());
  }, [dispatch]);
  useEffect(() => {
    if (!product) {
      const selectProd = products.find((product) => product._id === id);
      console.log(selectProd);
      if (selectProd) {
        dispatch(getOneproductData(id));
      }
    }
  }, [dispatch, id, products]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div role="tabpanel" hidden={value !== index} {...other}>
        {value === index && (
          <Box sx={{ p: 2 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  const Products = [
    {
      id: 1,
      image: prod9,
      name: "Polo with Contrast Trims",
      rating: 4.5,
      price: "$120",
      description: "This is a description of product 1",
    },
    {
      id: 2,
      image: prod10,
      name: "Gradient Graphic T-shirt",
      rating: 4.5,
      price: "$212",
      description: "This is a description of product 1",
    },
    {
      id: 3,
      image: prod11,
      name: "Polo with Tipping Details",
      rating: 4.5,
      price: "$145",
      description: "This is a description of product 1",
    },
    {
      id: 4,
      image: prod12,
      name: "Black Striped T-shirt",
      rating: 4.5,
      price: "$180",
      description: "This is a description of product 1",
    },
  ];

  const theme = useTheme();
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      HOME
    </Link>,
    <Link underline="hover" key="2" color="inherit" href="/">
      Shop
    </Link>,
    <Link underline="hover" key="2" color="inherit" href="/">
      Men
    </Link>,
    <Typography key="3" sx={{ color: "text.primary" }}>
      T-shirts
    </Typography>,
  ];
  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <Grid Grid container>
          <Grid
            container
            spacing={2}
            sx={{
              width: "100%",
            }}
          >
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              {breadcrumbs}
            </Breadcrumbs>
          </Grid>
          {product ? (
            <Grid
              key={id}
              container
              spacing={2}
              sx={{
                width: "100%",
                display: "flex",
                gap: "20px",
                mt: "30px",
              }}
            >
              <Grid
                container
                sx={{
                  width: "45%",
                }}
              >
                <Grid
                  item
                  xs={12}
                  sx={{
                    width: "152px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <img src={img1} alt="" />
                  <img src={img2} alt="" />
                  <img src={img3} alt="" />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    width: "70%",
                  }}
                >
                  <img
                    src={`http://192.168.2.222:5000/${product.image}`}
                    style={{
                      width: "100%",
                    }}
                    alt=""
                  />
                </Grid>
              </Grid>
              <Grid
                container
                sx={{ width: "50%", display: "flex", flexDirection: "column" }}
              >
                <Grid>
                  <Typography variant="h4">{product.name}</Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                  }}
                >
                  <GradeIcon color="warning" />
                  <GradeIcon color="warning" />
                  <GradeIcon color="warning" />
                  <GradeIcon color="warning" />
                  <Typography variant="h5" sx={{ color: "warning" }}>
                    4.5
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h4">${product.price}</Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      textDecoration: "line-through",
                      color: "text.disabled",
                    }}
                  >
                    $300
                  </Typography>

                  <Chip label="- 40%" color="error" />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">{product.description}</Typography>
                </Grid>
                <Divider />
                <Grid item xs={12}>
                  <Typography>Select Colors</Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 1,
                    }}
                  >
                    {product.color?.map((color, index) => (
                      <Box
                        key={index}
                        sx={{
                          backgroundColor: color,
                          borderRadius: "50%",
                          width: "30px",
                          height: "30px",
                        }}
                      ></Box>
                    ))}
                  </Box>

                  {/* <Box
                    sx={{
                      backgroundColor: "#4F4631",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                  />

                  <Box
                    sx={{
                      backgroundColor: "#314F4A",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                  />

                  <Box
                    sx={{
                      backgroundColor: "#31344F",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                  /> */}
                </Grid>
                <Divider />
                <Grid item xs={12}>
                  <Typography variant="body1">Choose Size</Typography>
                </Grid>
                <Grid
                  sx={{
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  {product.size?.map((name, index) => (
                    <Chip key={index} label={name} />
                  ))}
                  {/* <Chip label="Small" variant="outlined" color="primary" />
                  <Chip label="Medium" variant="outlined" color="primary" />
                  <Chip label="Large" variant="filled" color="primary" />
                  <Chip label="X-Large" variant="outlined" color="primary" /> */}
                </Grid>
                <Divider />
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "20px",
                  }}
                >
                  <Box
                    sx={{
                      width: "20%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "#f0f0f0",
                      borderRadius: "62px",
                      justifyContent: "space-between",
                      p: 1,
                    }}
                  >
                    <Button>-</Button>
                    <Typography variant="body1">1</Typography>
                    <Button>+</Button>
                  </Box>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      width: "80%",
                    }}
                  >
                    <Button
                      variant="contained"
                      className="black"
                      sx={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "62px",
                      }}
                    >
                      Add to Cart
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <div>Loading...</div>
          )}
          <Grid container item xs={12} sx={{ width: "100%", mt: 2 }}>
            <Grid item xs={12} sx={{ width: "100%" }}>
              <Box
                sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="product tabs"
                  sx={{
                    width: "100%",
                    "& .MuiTabs-flexContainer": {
                      display: "flex",
                      justifyContent: "space-around",
                    },
                  }}
                >
                  <Tab label="Product Details" sx={{ width: "100%" }} />
                  <Tab label="Rating & Reviews" sx={{ width: "100%" }} />
                  <Tab label="FAQs" sx={{ width: "100%" }} />
                </Tabs>
              </Box>

              {/* Tab Panels */}
              <TabPanel value={value} index={0}>
                This is the **Product Details** section. You can place your
                product info here.
              </TabPanel>
              <TabPanel value={value} index={1}>
                <RatingPage />
              </TabPanel>
              <TabPanel value={value} index={2}>
                This is the **FAQs** section. Display questions and answers
                here.
              </TabPanel>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            sx={{
              width: "100%",
            }}
          >
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "180px",
              }}
            >
              <Typography variant="h2" component="h2">
                You might also like
              </Typography>
            </Grid>
            <Grid
              container
              spacing={0}
              sx={{
                width: "100%",
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
                {Products.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
                <Grid
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="outlined"
                    className="white"
                    sx={{
                      width: "20%",
                      p: 1.5,
                      borderRadius: 10,
                    }}
                  >
                    View All
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ProductDetailPage;
