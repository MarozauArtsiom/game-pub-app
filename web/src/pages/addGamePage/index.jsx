import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGames, addGame, deleteGame } from "../../features/gameSlice";
import {
  TextField,
  Button,
  Box,
  Paper,
  Typography,
  CircularProgress,
  Card,
  CardActions,
  CardContent,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const AddGamePage = () => {
  const dispatch = useDispatch();
  const { data: games, status, isAdding } = useSelector((state) => state.games);
  const [newGame, setNewGame] = useState({
    name: "",
    description: "",
    imageUrl: "",
    gameUrl: "",
  });
  const [deletingGames, setDeletingGames] = useState(new Set());

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchGames());
    }
  }, [status, dispatch]);

  const handleChange = (e) => {
    setNewGame({ ...newGame, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addGame(newGame));
    setNewGame({ name: "", description: "", imageUrl: "", gameUrl: "" });
  };

  const handleDelete = (gameId) => {
    setDeletingGames((prev) => new Set([...prev, gameId]));
    dispatch(deleteGame(gameId)).then(() => {
      setDeletingGames((prev) => {
        const newSet = new Set(prev);
        newSet.delete(gameId);
        return newSet;
      });
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper sx={{ p: 2, mb: 2, maxWidth: 500, width: "100%" }}>
        <Typography variant="h6">Add New Game</Typography>
        <form onSubmit={handleSubmit}>
          {/* Form Fields */}
          <TextField
            label="Game Name"
            name="name"
            value={newGame.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={newGame.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Image URL"
            name="imageUrl"
            value={newGame.imageUrl}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Game URL"
            name="gameUrl"
            value={newGame.gameUrl}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={isAdding}
          >
            {isAdding ? <CircularProgress size={24} /> : "Submit Game"}
          </Button>
        </form>
      </Paper>

      {games.map((game) => (
        <Card key={game.id} sx={{ maxWidth: 345, mb: 2, position: "relative" }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {game.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {game.description}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton
              onClick={() => handleDelete(game.id)}
              aria-label="delete game"
              disabled={deletingGames.has(game.id)}
            >
              <DeleteIcon />
            </IconButton>
          </CardActions>
          {deletingGames.has(game.id) && (
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
      ))}
    </Box>
  );
};

export default AddGamePage;
