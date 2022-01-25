import "./App.css";
import { useState } from "react";
import {
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
  MenuItem,
  Paper,
  Select,
  Typography,
  ListItemIcon,
} from "@mui/material";
import StarRateIcon from "@mui/icons-material/StarRate";
import StarRate from "@mui/icons-material/StarRate";
import TopBar from "./shared-components/TopBar";
import Footer from "./shared-components/Footer";

const ListSelector = () => {
  const [list, setList] = useState("Favorites");

  const handleChange = (event) => {
    setList(event.target.value);
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="list-select-label">Sort By</InputLabel>
        <Select
          labelId="list-select-label"
          id="demo-simple-select"
          value={list}
          label="Sort By"
          onChange={handleChange}
        >
          <MenuItem value={"favorites"}>Favorites</MenuItem>
          <MenuItem value={"created-on"}>Created On</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

function App() {
  const listData = [
    {
      id: 0,
      title: "Shooping List",
      content: "Pickup a few groceries after the game",
      creattion_date: "mmddyyy",
      is_favorite: true,
    },
    {
      id: 1,
      title: "Ideas for Project Names",
      content: "Creative names",
      creattion_date: "mmddyyy",
      is_favorite: true,
    },
    {
      id: 2,
      title: "To-Do List",
      content: "Things you must get done this weekend",
      creattion_date: "mmddyyy",
      is_favorite: true,
    },
    {
      id: 3,
      title: "Upcoming Appointment",
      content: "Dr's Appointment on January 31, 2022",
      creattion_date: "mmddyyy",
      is_favorite: true,
    },
  ];
  return (
    <div
      className="App"
      style={{
        backgroundColor: "#efefef",
        margin: "0",
        padding: "0",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TopBar />
        </Grid>
        <Grid item xs={12} sx={{ margin: "8px" }}>
          <Paper elevation={0}>
            <List
              subheader={
                <ListSubheader sx={{ paddingTop: "24px" }}>
                  <ListSelector />
                </ListSubheader>
              }
            >
              {/* map over all items, sort by favorite */}
              {listData.map((item) => (
                <>
                  <ListItem>
                    <ListItemIcon>
                      <StarRateIcon />
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
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Footer />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
