/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItemText, ListItemIcon, ListItemButton, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


import { PAGINAS } from '../../constants/PAGINAS';
import { Link } from 'react-router-dom';
import ThemeSwitcher from '../ThemeSwitcher';


export default function NavBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List>
        {
          PAGINAS.map((pagina) => {
            return (
              <ListItemButton key={pagina.nome} component={Link} to={pagina.rota}>
                <ListItemIcon>
                  {pagina.icone}
                </ListItemIcon>
                <ListItemText primary={pagina.nome} />
              </ListItemButton>
            )
          })
        }
      </List>

    </div>
  );
  return (
    <>
      <AppBar position="static" elevation={6}>
        <Toolbar>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sistema Eleitoral
          </Typography>
          
          <Stack direction="row" spacing={2}>

            
          <ThemeSwitcher/>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
            >
            <MenuIcon />
          </IconButton>
            </Stack>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        {list()}
      </Drawer>
      <Toolbar /> {/* To push the content down so it's not covered by the app bar */}

    </>
  )
}
