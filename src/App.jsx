import "./App.css";
import { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListeItemIcon,
  ListItemText,
  ListSubheader,
  Menu,
  MenuItem,
  Paper,
  Select,
  Typography,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import StarRateIcon from "@mui/icons-material/StarRate";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import { orange } from "@mui/material/colors";
import TopBar from "./shared-components/TopBar";
import Footer from "./shared-components/Footer";

const ListSelector = () => {
  const [list, setList] = useState("favorites");

  const handleChange = (event) => {
    setList(event.target.value);
  };

  return (
    <>
      <FormControl sx={{ width: "200px", marginBottom: "8px" }}>
        <Select
          labelId="list-select-label"
          id="demo-simple-select"
          value={list}
          displayEmpty
          onChange={handleChange}
          inputProps={{ "aria-label": "Sort Notes By" }}
        >
          <MenuItem value={"favorites"}>Favorites</MenuItem>
          <MenuItem value={"created-on"}>Created On</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

function App() {
  const favoriteColor = orange[500];
  const listData = [
    {
      id: 0,
      title: "Shopping List",
      content: "Pickup a few groceries after the game",
      creation_date: "mmddyyy",
      is_favorite: true,
    },
    {
      id: 1,
      title: "Ideas for Project Names",
      content: "Creative names",
      creation_date: "mmddyyy",
      is_favorite: true,
    },
    {
      id: 2,
      title: "To-Do List",
      content: "Things you must get done this weekend",
      creation_date: "mmddyyy",
      is_favorite: true,
    },
    {
      id: 3,
      title: "Upcoming Appointment",
      content: "Dr's Appointment on January 31, 2022",
      creation_date: "mmddyyy",
      is_favorite: true,
    },
    {
      id: 4,
      title: "Upcoming Appointment",
      content: "Dr's Appointment on January 31, 2022",
      creation_date: "mmddyyy",
      is_favorite: true,
    },
    {
      id: 5,
      title: "Upcoming Appointment",
      content: "Dr's Appointment on January 31, 2022",
      creation_date: "mmddyyy",
      is_favorite: false,
    },
    {
      id: 6,
      title: "Upcoming Appointment",
      content: "Dr's Appointment on January 31, 2022",
      creation_date: "mmddyyy",
      is_favorite: false,
    },
  ];

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      className="App"
      style={{
        backgroundColor: "#efefef",
      }}
    >
      <TopBar />
      <Container sx={{ marginTop: "24px" }}>
        <Box sx={{ display: "flex", marginBottom: "16px" }}>
          <Box sx={{ flexGrow: 1, display: { xs: "flex" } }}>
            <Typography variant="h4" component="h2">
              My Notes
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Button variant="contained">
              <AddIcon />
              New Note
            </Button>
          </Box>
        </Box>
        <Card>
          <CardContent>
            <div style={{ textAlign: "left" }}>
              <ListSelector />
            </div>
            <Divider />
            <List>
              {listData.map((item) => (
                <>
                  <ListItem
                    key={item.id}
                    secondaryAction={
                      <>
                        <IconButton
                          onClick={handleClick}
                          size="small"
                          sx={{ ml: 2 }}
                          aria-controls={open ? "account-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl}
                          id={item.id}
                          open={open}
                          onClose={handleClose}
                          onClick={handleClose}
                        >
                          <MenuItem>Edit</MenuItem>
                          <MenuItem>Delete</MenuItem>
                        </Menu>
                      </>
                    }
                  >
                    <ListItemIcon>
                      {item.is_favorite ? (
                        <StarRateIcon sx={{ color: favoriteColor }} />
                      ) : (
                        <StarBorderIcon />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.title}
                      secondary={item.content}
                    />
                  </ListItem>
                  <Divider />
                </>
              ))}
            </List>
          </CardContent>
        </Card>
        <Footer />
      </Container>
    </div>
  );
}

export default App;