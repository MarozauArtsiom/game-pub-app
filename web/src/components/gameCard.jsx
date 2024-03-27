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
  Select,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const GameCard = ({
  game,
  onDelete,
  isLoading,
  onClick,
  onApprove,
  isApproving,
}) => {
  return (
    <Card sx={{ position: "relative" }} onClick={() => onClick?.(game.id)}>
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
      {onDelete && (
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
      )}
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
      {onApprove && (
        <Box sx={{ position: "relative", mt: 2 }}>
          <Select
            value={game.approval?.status || "idle"}
            onChange={(e) => onApprove(e.target.value)}
            displayEmpty
            fullWidth
            disabled={isApproving}
          >
            <MenuItem value="idle">Idle</MenuItem>
            <MenuItem value="yes">Approve</MenuItem>
            <MenuItem value="no">Reject</MenuItem>
          </Select>
          {isApproving && (
            <CircularProgress
              size={24}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>
      )}
    </Card>
  );
};

GameCard.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    approval: PropTypes.shape({
      status: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isApproving: PropTypes.bool,
  onClick: PropTypes.func,
  onApprove: PropTypes.func,
};

export default GameCard;
