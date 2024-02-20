import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames } from '../../features/gameSlice';
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Box,
  CircularProgress,
  Typography,
} from '@mui/material';

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
        {games.map((game, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={game.imageUrl} // Adjust field names based on your API response
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
                    Author: {game.author} {/* Displaying the author */}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MainPage;
