// src/components/GameCard.jsx
import PropTypes from "prop-types";

import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  CircularProgress,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const GameCard = ({ game, onDelete, isLoading }) => {
  return (
    <Card sx={{ position: "relative" }}>
      <CardActionArea disabled={isLoading}>
        <CardMedia
          component="img"
          height="140"
          image={game.imageUrl}
          alt={game.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {game.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {game.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Author: {game.author}
          </Typography>
        </CardContent>
      </CardActionArea>
      <IconButton
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          backgroundColor: "white", // Adding a white background
          padding: "5px", // Padding around the icon
          borderRadius: "50%", // Circular background
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Slightly transparent on hover
          },
        }}
        onClick={() => onDelete(game.id)}
        disabled={isLoading}
      >
        <DeleteIcon />
      </IconButton>
      {isLoading && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Card>
  );
};

GameCard.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired, // Assuming 'author' is a required string
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default GameCard;
