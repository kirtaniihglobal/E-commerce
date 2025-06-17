import { Box, Grid, Typography } from "@mui/material";

import GreenTik from "../assets/greentik.png";
import GradeIcon from "@mui/icons-material/Grade";
const RatingCard = ({ item, width }) => {
  return (
    <Grid container
  
      sx={{
        height: "auto",
      }}
    >
      <Box
        sx={{
          width: width || "400px",
          height: "240px",
          borderRadius: "20px",
          border: "1px solid #ccc",
          p: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <Typography>
          <GradeIcon color="warning" />
          <GradeIcon color="warning" />
          <GradeIcon color="warning" />
          <GradeIcon color="warning" />
          <GradeIcon />
        </Typography>
        <Typography variant="h5">
          {item.name}
          <img src={GreenTik} alt="" />
        </Typography>
        <Typography variant="body1">{item.review}</Typography>
        <Typography variant="h6">{item.date}</Typography>
      </Box>
    </Grid>
  );
};
export default RatingCard;
