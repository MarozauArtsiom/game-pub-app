import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGames } from "../../features/gameSlice";
import { fetchScores } from "../../features/scoreSlice";
import GameCard from "../../components/gameCard";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Box,
  TextField,
  Avatar,
} from "@mui/material";

const ScoreTablePage = () => {
  const dispatch = useDispatch();
  const { data: games, status: gamesStatus } = useSelector(
    (state) => state.games
  );
  const { data: scores, status: scoresStatus } = useSelector(
    (state) => state.scores
  );
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  const handleGameClick = (gameId) => {
    setSelectedGameId(gameId);
    dispatch(fetchScores(gameId));
  };

  // need to optimize render and only then make updates
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     if (selectedGameId) {
  //       dispatch(fetchScores(selectedGameId));
  //     }
  //   }, 1000);

  //   return () => clearInterval(intervalId); // Clear interval on component unmount
  // }, [dispatch, selectedGameId]);

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Box sx={{ p: 2 }}>
      <TextField
        label="Filter by Game Name"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setFilter(e.target.value)}
      />

      <Typography variant="h4" sx={{ mb: 2 }}>
        Select a Game
      </Typography>
      <Box sx={{ display: "flex", overflowX: "auto", mb: 4 }}>
        {gamesStatus === "loading" ? (
          <CircularProgress />
        ) : (
          filteredGames.map((game) => (
            <Box key={game.id} sx={{ minWidth: 300, mx: 1 }}>
              <GameCard
                game={game}
                onClick={handleGameClick}
                isLoading={false}
              />
            </Box>
          ))
        )}
      </Box>

      {selectedGameId && (
        <React.Fragment>
          <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
            Scores for {games.find((g) => g.id === selectedGameId)?.name}
          </Typography>
          {scoresStatus === "loading" ? (
            <CircularProgress />
          ) : (
            <TableContainer component={Paper}>
              <Table aria-label="score table">
                <TableHead>
                  <TableRow>
                    <TableCell>Top Score</TableCell>
                    <TableCell align="right">Player Name</TableCell>
                    <TableCell align="right">Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {scores.map((score) => (
                    <TableRow key={score.id}>
                      <TableCell>{score.topScore}</TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            src={score.profileUrl}
                            sx={{ width: 30, height: 30, mr: 1 }}
                          />
                          <Typography variant="body2">
                            {score.playerName}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        {new Date(score.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </React.Fragment>
      )}
    </Box>
  );
};

export default ScoreTablePage;
