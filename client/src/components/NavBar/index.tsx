/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import BallotIcon from '@mui/icons-material/Ballot';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import GenerateWalletBtn from '../GenerateWalletBtn';


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
            {['Votar', 'Administração', 'Resultados'].map((text, index) => (
              <ListItem  key={text}>
                <ListItemIcon>
                  {index === 0 ? <HomeIcon /> : index === 1 ? <BusinessIcon /> : <BallotIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
            <ListItem>
                <ListItemIcon>
                    <CardMembershipIcon />
                </ListItemIcon>
                <ListItemText  >
                    <GenerateWalletBtn/>
                </ListItemText>
            </ListItem>
          </List>
          
        </div>
      );
    return (
        <>
            <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sistema Eleitoral
          </Typography>
          <GenerateWalletBtn/>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        {list()}
      </Drawer>
      <Toolbar /> {/* To push the content down so it's not covered by the app bar */}

        </>
    )
}
