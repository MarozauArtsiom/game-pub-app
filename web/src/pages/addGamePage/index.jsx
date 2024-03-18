import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGames, addGame, deleteGame } from "../../features/gameSlice";
import GameCard from "../../components/gameCard";
import {
  TextField,
  Button,
  Box,
  Paper,
  Typography,
  CircularProgress,
  Grid,
  Container,
} from "@mui/material";

const AddGamePage = () => {
  const dispatch = useDispatch();
  const { data: games, status, isAdding } = useSelector((state) => state.games);
  const [newGame, setNewGame] = useState({
    name: "",
    description: "",
    imageUrl: "",
    author: "",
  });
  const [deletingGames, setDeletingGames] = useState(new Set());

  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  const handleChange = (e) => {
    setNewGame({ ...newGame, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addGame(newGame)).then(() => {
      dispatch(fetchGames()); // Reload games after adding a new one
    });
    setNewGame({ name: "", description: "", imageUrl: "", author: "" });
  };

  const handleDelete = (gameId) => {
    setDeletingGames((prev) => new Set([...prev, gameId]));
    dispatch(deleteGame(gameId)).then(() => {
      setDeletingGames((prev) => {
        const newSet = new Set(prev);
        newSet.delete(gameId);
        return newSet;
      });
      dispatch(fetchGames()); // Reload games after deletion
    });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Paper sx={{ p: 2, mb: 2, maxWidth: 500, width: "100%" }}>
        <Typography variant="h6">Add New Game</Typography>
        <form onSubmit={handleSubmit}>
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
            label="Author"
            name="author"
            value={newGame.author}
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

      <Typography variant="h4" sx={{ mb: 2 }}>
        Games List
      </Typography>
      {status === "loading" && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            my: 4,
          }}
        >
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>loading...</Typography>
        </Box>
      )}

      {status === "succeeded" && games.length === 0 && (
        <Typography variant="subtitle1">No games available.</Typography>
      )}

      {status !== "loading" && (
        <Grid container spacing={2}>
          {games.map((game) => (
            <Grid item xs={12} sm={6} md={4} key={game.id}>
              <GameCard
                game={game}
                onDelete={handleDelete}
                isLoading={deletingGames.has(game.id)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default AddGamePage;
