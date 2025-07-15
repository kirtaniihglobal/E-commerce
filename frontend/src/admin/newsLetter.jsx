import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Snackbar,
  Alert,
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmailData, getAllEmailsData } from "../Thunk/newSletterThunk";

export default function NewsLetter() {
  const dispatch = useDispatch();
  const { allEmails } = useSelector((state) => state.newSletter);
  console.log("allEmails", allEmails);
  const [form, setForm] = useState({
    subject: "",
    title: "",
    message: "",
    buttonLabel: "View More",
    buttonUrl: "https://yourwebsite.com",
  });
  const [value, setValue] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    dispatch(getAllEmailsData());
  }, [dispatch]);

  return (
    <Container maxWidth={false} disableGutters>
      <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChangeTab}
          sx={{ width: "100%" }}
          aria-label="basic tabs example"
        >
          <Tab label="Send NewsLetter" sx={{ width: "50%" }} />
          <Tab label="Email List" sx={{ width: "50%" }} />
          <Tab label="NewsLetter List" sx={{ width: "50%" }} />
        </Tabs>
      </Box>
      {value === 0 && (
        <Paper sx={{ p: 4, m: 2 }}>
          <Typography variant="h4" gutterBottom>
            Send Newsletter
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Subject"
              name="subject"
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Title"
              name="title"
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Message"
              name="message"
              multiline
              rows={4}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Button Label"
              name="buttonLabel"
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Button URL"
              name="buttonUrl"
              onChange={handleChange}
              fullWidth
            />
            <Button variant="contained" className="black">
              Send
            </Button>
          </Box>
        </Paper>
      )}
      {value === 1 && (
        <Paper sx={{ p: 4, m: 2 }}>
          <Typography variant="h4" gutterBottom>
            Newsletter Subscribers
          </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {allEmails.map((emailItem) => (
                  <TableRow key={emailItem._id}>
                    <TableCell>{emailItem.email}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                          dispatch(deleteEmailData(emailItem._id));
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                {allEmails.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={2} align="center">
                      No subscribers found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Container>
  );
}
