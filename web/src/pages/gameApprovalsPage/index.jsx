import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGames, approveGame, deleteGame } from "../../features/gameSlice";
import GameCard from "../../components/gameCard";
import { Box, CircularProgress, Typography, Grid, Select, MenuItem } from "@mui/material";

const GameApprovalsPage = () => {
  const [approvingGames, setApprovingGames] = useState(new Set());
  const [approvalFilter, setApprovalFilter] = useState('all'); // 'all', 'yes', 'no', 'idle'

  const dispatch = useDispatch();
  const { data: games, status: gamesStatus } = useSelector((state) => state.games);

  useEffect(() => {
    dispatch(fetchGames()); // Assuming this fetches games with the 'approval' field
  }, [dispatch]);

  const handleApprove = (gameId, status) => {
    setApprovingGames(prev => new Set(prev).add(gameId));
    dispatch(approveGame({ gameId, status })).then(() => {
      setApprovingGames(prev => {
        const newSet = new Set(prev);
        newSet.delete(gameId);
        return newSet;
      });
    });
  };

  if (gamesStatus === "loading") {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  const filteredGames = games.filter(game => {
    return approvalFilter === 'all' || (game.approval?.status === approvalFilter) || (approvalFilter === 'idle' && !game.approval?.status);
  });

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Game Approvals
      </Typography>

      <Select
        value={approvalFilter}
        onChange={(e) => setApprovalFilter(e.target.value)}
        sx={{ mb: 2 }}
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="yes">Approved</MenuItem>
        <MenuItem value="no">Rejected</MenuItem>
        <MenuItem value="idle">Idle</MenuItem>
      </Select>

      <Grid container spacing={2}>
        {filteredGames.map((game) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={game.id}>
            <GameCard
              game={game}
              onApprove={(status) => handleApprove(game.id, status)}
              onDelete={() => dispatch(deleteGame(game.id))}
              isApproving={approvingGames.has(game.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GameApprovalsPage;
