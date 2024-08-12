import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Container, Button } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

const Navbar = ({ deferredPrompt, handleInstallClick }) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#2c3e50' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <IconButton edge="start" color="inherit" aria-label="logo" sx={{ mr: 2 }}>
            <LockIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            CipherSafe
          </Typography>
          {deferredPrompt && (
            <Button
              onClick={handleInstallClick}
              sx={{
                backgroundColor: 'black',
                color: 'white',
                borderRadius: '40px',
                padding: '5px 10px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                fontSize: '16px',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'purple',
                },
              }}
            >
              Install App
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
