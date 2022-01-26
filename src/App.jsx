import "./App.css";
import { useEffect, useState } from "react";
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

function App() {
  const favoriteColor = orange[500];
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortType, setSortType] = useState("favorites");

  useEffect(() => {
    console.log(data);
    const sortArray = (type) => {
      const types = {
        favorites: "is_favorite",
        created: "creation_date",
      };
      const sortProperty = types[type];
      const sorted = [...data].sort(
        (a, b) => b[sortProperty] - a[sortProperty]
      );
      setData(sorted);
    };

    sortArray(sortType);
  }, [sortType]);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://61f0b8d3e386270017fe1e49.mockapi.io/notes?sortBy=is_favorite&order=desc"
      );
      setData(result.data);
    };
    fetchData().catch(setError(true));
  }, []);

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
        <Card elevation={1}>
          <CardContent>
            <div style={{ textAlign: "left" }}>
              <FormControl sx={{ width: "200px", marginBottom: "8px" }}>
                <Select
                  labelId="list-select-label"
                  id="note-sort-select"
                  value={sortType}
                  displayEmpty
                  onChange={(e) => setSortType(e.target.value)}
                  inputProps={{ "aria-label": "Sort Notes By" }}
                >
                  <MenuItem value={"favorites"}>Favorites</MenuItem>
                  <MenuItem value={"created"}>Created On</MenuItem>
                </Select>
              </FormControl>
            </div>
            <Divider />
            <List>
              {data.map((item) => (
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
                      secondary={
                        <>
                          <div>{item.content}</div>
                          <div>Created on: {item.creation_date}</div>
                        </>
                      }
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
