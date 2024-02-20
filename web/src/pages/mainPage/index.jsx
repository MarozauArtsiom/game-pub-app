import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames } from '../../features/gameSlice';
import {
  Grid,
  Box,
  CircularProgress,
} from '@mui/material';
import GameCard from '../../components/gameCard';

const MainPage = () => {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.games.data);
  const status = useSelector((state) => state.games.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchGames());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (status !== 'succeeded') {
    return ''
  }

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2}>
        {games.map((game) => (
          <Grid item xs={12} sm={6} md={4} key={game.id}>
            <GameCard game={game} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MainPage;
