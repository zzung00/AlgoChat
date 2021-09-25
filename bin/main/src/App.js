import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import ToolBar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import SignDialog from './components/SignDialog';
import React from 'react';

function App() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <ToolBar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Algo Chat
            </Typography>
            <Button color="inherit" onClick={handleClickOpen}>로그인</Button>
          </ToolBar>
        </AppBar>
      </Box>
      <SignDialog open={open} onClose={handleClose} />
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default App;
