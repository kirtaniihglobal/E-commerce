export const MuiButton = {
  styleOverrides: {
    root: {
      cursor: "pointer",
      fontFamily: "",
      transition: "background-color 0.3s ease",
    },
  },
  variants: [
    {
      props: { variant: "contained" },
      style: ({ theme, ownerState }) => ({
        "&.black": {
          backgroundColor: "#000",
          color: "#fff",
          fontWeight: 500,
          "&:hover": {
            backgroundColor: "#ffff",
            color: "#000",
          },
        },
      }),
    },

    {
      props: { variant: "outlined" },
      style: ({ theme, ownerState }) => ({
        "&.white": {
          backgroundColor: "#fff",
          color: "#000",
          fontWeight: 500,
          border: "1 solid #000",
          "&:hover": {
            backgroundColor: "#000",
            color: "#fff",
          },
        },
      }),
    },
  ],
};

export const MuiTypography = {
  styleOverrides: {
    root: {},
  },
  variants: [
    {
      props: { variant: "h1" },
      style: {
        fontSize: "70px",
        fontWeight: 700,
        color: "#000",
      },
    },
    {
      props: { variant: "h2" },
      style: {
        fontSize: "64px",
        fontWeight: 700,
        color: "#000",
      },
    },
    {
      props: { variant: "h3" },
      style: {
        fontSize: "50px",
        fontWeight: 600,
        color: "#000",
      },
    },
    {
      props: { variant: "h4" },
      style: {
        fontSize: "40px",
        fontWeight: 700,
        color: "#000",
      },
    },
    {
      props: { variant: "h5" },
      style: {
        fontSize: "25px",
        fontWeight: 400,
        color: "#333",
      },
    },
    {
      props: { variant: "h6" },
      style: {
        fontSize: "20px",
        fontWeight: 500,
        color: "#333",
      },
    },
    {
      props: { variant: "body1" },
      style: {
        fontSize: "16px",
        fontWeight: 400,
        color: "#333",
      },
    },
    {
      props: { variant: "body2" },
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#fff",
      },
    },
  ],
};
