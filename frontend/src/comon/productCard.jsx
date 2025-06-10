import { Grid, Box, Typography } from "@mui/material";
import GradeIcon from "@mui/icons-material/Grade";
import { getOneproductData } from "../Thunk/productThunk";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelect = async (id) => {
    try {
      await dispatch(getOneproductData(id));
      navigate(`/productDetail/${id}`);
      window.scrollTo(0, 0);
    } catch (error) {}
  };
  return (
    <Grid key={product._id}>
      <Box
        sx={{ cursor: "pointer" }}
        onClick={() => {
          handleSelect(product._id);
        }}
      >
        <img src={`http://192.168.2.222:5000/${product.image}`} alt="" />
        <Box>
          <Typography variant="h6">{product.name}</Typography>
          <Typography variant="h5">
            <GradeIcon color="warning" />
            <GradeIcon color="warning" />
            <GradeIcon color="warning" />
            <GradeIcon />
            {product.rating}
          </Typography>
          <Typography variant="h5">${product.price}</Typography>
        </Box>
      </Box>
    </Grid>
  );
};

export default ProductCard;
