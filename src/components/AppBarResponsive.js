import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import { setCurrentUserLocally } from '../redux/actions/usersAction';
import { useSelector } from 'react-redux';

const drawerWidth = 240;
const navItems = ['Login', 'Register'];

function AppBarResponsive(props) {
    const { token, activeUser } = useSelector(state => state.users);
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const mobileHeaderButton = ({ isActive }) => {
        return {
            backgroundColor: isActive ? "#2691d9" : "white",
            color: isActive ? "white" : "#2691d9",
            textAlign: "center",
            alignItems: "center",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "1rem",
            borderRadius: "5px",
            paddingTop: "10px",
            width: "100vw",
            height: "2rem"
        }
    }

    const desktopHeaderButton = ({ isActive }) => {
        return {
            alignItems: "center",
            color: "white",
            fontSize: "1rem",
            borderRadius: "5px",
            padding: "0px 10px",
            fontWeight: isActive ? "bold" : "normal",
            textDecoration: "none",
            backgroundColor: isActive ? '#98d1f7' : "inherit",
        }
    }

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                REQRES API
            </Typography>
            <Divider />
            <List>
                <ListItem key="Home" disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <NavLink style={mobileHeaderButton} to="/">
                            Home
                        </NavLink>
                    </ListItemButton>
                </ListItem>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <NavLink style={mobileHeaderButton} to={`/${item}`}>

                                {item}
                            </NavLink>
                        </ListItemButton>
                    </ListItem>
                ))}
                {token &&
                    <ListItem key="Profile" disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <NavLink style={mobileHeaderButton} to={`/profile/${activeUser?.id}`} onClick={() => setCurrentUserLocally(activeUser?.id)}>
                                Profile
                            </NavLink>
                        </ListItemButton>
                    </ListItem>
                }
            </List>
        </Box >
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        REQRES API
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Button key="Home" sx={{ color: '#fff' }}>
                            <NavLink style={desktopHeaderButton} to="/">
                                Home
                            </NavLink>
                        </Button>
                        {navItems.map((item) => (
                            <Button key={item} sx={{ color: '#fff' }}>
                                <NavLink style={desktopHeaderButton} to={`/${item}`}>
                                    {item}
                                </NavLink>
                            </Button>
                        ))}
                        {token &&
                            <Button key={"Profile"} sx={{ color: '#fff' }}>
                                <NavLink style={desktopHeaderButton} to={`/Profile/${activeUser?.id}`} onClick={() => setCurrentUserLocally(activeUser?.id)}>
                                    Profile
                                </NavLink>
                            </Button>
                        }
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box component="main" sx={{ p: 3 }}>
            </Box>
        </Box>
    );
}
export default AppBarResponsive;
