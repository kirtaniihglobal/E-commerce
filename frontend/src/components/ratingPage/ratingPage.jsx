import { Grid, Typography } from "@mui/material";
import RatingCard from "../../comon/ratingCard";
// import GreenTik from "../assets/greentik.png";
// import GradeIcon from "@mui/icons-material/Grade";

function RatingPage() {
  const Review = [
    {
      id: 1,
      name: "Samantha D.",
      review:
        "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
      date: "Posted on August 14, 2023",
    },
    {
      id: 2,
      name: "Alex M.",
      review:
        "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
      date: "Posted on August 15, 2023",
    },
    {
      id: 3,
      name: "Ethan R.",
      review:
        "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
      date: "Posted on August 16, 2023",
    },
    {
      id: 4,
      name: "Olivia P.",
      review:
        "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
      date: "Posted on August 17, 2023",
    },
    {
      id: 5,
      name: "Liam K.",
      review:
        "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
      date: "Posted on August 18, 2023",
    },
    {
      id: 6,
      name: "Ava H.",
      review:
        "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
      date: "Posted on August 19, 2023",
    },
  ];
  return (
    <>
      <Grid
        container
        spacing={5}
        sx={{
          width: "100%",
          mt: 5,
          justifyContent: "center",
        }}
      >
        <Grid
          container
          sx={{
            width: "100%",
          }}
        >
          <Grid
            sx={{
              width: "50%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <Typography variant="h5">All Reviews</Typography>
            <Typography variant="h6">(451)</Typography>
          </Grid>
          <Grid></Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{
            width: "95%",
            height: "auto",
            display: "flex",
            flexDirection: "row",
          }}
        >
          {Review.map((item) => (
            <RatingCard key={item.id} item={item} width={600} />
          ))}
        </Grid>
      </Grid>
    </>
  );
}

export default RatingPage;
