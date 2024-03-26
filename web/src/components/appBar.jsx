import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import avatarDefault from "../assets/no-profile-photo-image.jpg"

const imageSize = 50;

const NavigationBar = () => {
  const { data, isLoggedIn } = useSelector((state) => state.login);

  const { avatar_url: avatarUrl } = data
console.log('data', {data,isLoggedIn})
  return (
    <AppBar position="static">
      <Toolbar style={{flexGrow: 0}}>
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
        <Button color="inherit" component={Link} to="/scores">Scores</Button>
        <Button color="inherit" component={Link} to="/game-approvals">Game Approvals</Button>
        <Button color="inherit" component={Link} to="/login" style={{flexGrow: 1, justifyContent: "flex-end"}}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={isLoggedIn ? avatarUrl : avatarDefault}
              alt="Avatar"
              style={{
                marginRight: 10,
                width: imageSize,
                height: imageSize,
                borderRadius: imageSize / 2,
              }}
            />
          </Box>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
