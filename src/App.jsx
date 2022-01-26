import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  FormControl,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Typography,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import StarRateIcon from "@mui/icons-material/StarRate";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { orange, red } from "@mui/material/colors";
import TopBar from "./shared-components/TopBar";
import Footer from "./shared-components/Footer";

function App(props) {
  const favoriteColor = orange[500];
  const deleteColor = red[500];

  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortType, setSortType] = useState("favorites");

  useEffect(() => {
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

  const handleFavorite = (e, value, is_favorite) => {
    if (e.is_favorite) {
      const newData = data.map((obj) =>
        obj.id === e.id ? { ...obj, is_favorite: false } : obj
      );
      setData(newData);
    } else {
      const newData = data.map((obj) =>
        obj.id === e.id ? { ...obj, is_favorite: true } : obj
      );
      setData(newData);
    }
  };

  const handleAdd = (item) => {
    const newItem = data.slice();
    newItem.push(item);
    setData(newItem);
  };

  const handleDelete = (e) => {
    const itemToRemove = e;
    const newData = data.filter((e) => e !== itemToRemove);
    setData(newData);
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
            <Button variant="contained" onClick={handleAdd}>
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
                          onClick={() => handleDelete(item, data)}
                          size="small"
                          sx={{ ml: 2 }}
                          aria-controls={open ? "account-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                        >
                          <DeleteIcon sx={{ color: deleteColor }} />
                        </IconButton>
                      </>
                    }
                  >
                    <ListItemIcon>
                      <IconButton
                        aria-label="Favorite"
                        onClick={() => handleFavorite(item, data)}
                      >
                        {item.is_favorite ? (
                          <StarRateIcon sx={{ color: favoriteColor }} />
                        ) : (
                          <StarBorderIcon />
                        )}
                      </IconButton>
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
