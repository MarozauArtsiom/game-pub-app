import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const imageSize = 50;

const NavigationBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* If the image is in the public folder, use the path directly */}
            <img
              src="icon.webp"
              alt="icon"
              style={{
                marginRight: 10,
                width: imageSize,
                height: imageSize,
                borderRadius: imageSize / 2, // Makes the image rounded
              }}
            />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Game Pub
            </Typography>
          </Box>
        </Button>
        <Button color="inherit" component={Link} to="/add-game">
          Add Game
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
