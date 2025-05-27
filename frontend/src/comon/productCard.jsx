import { Grid, Box, Typography } from "@mui/material";
import GradeIcon from "@mui/icons-material/Grade";
const ProductCard = ({ product }) => {
  return (
    <Grid key={product.id}>
      <Box>
        <img src={product.image} alt="" />
        <Box>
          <Typography variant="h6">{product.name}</Typography>
          <Typography variant="h5">
            <GradeIcon color="warning" />
            <GradeIcon color="warning" />
            <GradeIcon color="warning" />
            <GradeIcon />
            {product.rating}
          </Typography>
          <Typography variant="h5">{product.price}</Typography>
        </Box>
      </Box>
    </Grid>
  );
};

export default ProductCard;
