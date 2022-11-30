import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    Drawer,
    List,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
    TextField
} from '@material-ui/core'
import DehazeIcon from '@mui/icons-material/Dehaze';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import DashboardIcon from '@mui/icons-material/Dashboard';

const SideDrawer = ({users,signOutUser}) => {
    const [state, setState] = useState(false);
    return (
        <>
            <DehazeIcon
                className="drawer_btn"
                onClick={() => setState(true)}
            />
            <Drawer anchor={'right'} open={state} onClose={() => setState(false)}>
                <form style={{ margin: '20px' }}>
                    <TextField id="outlined_basic" label="Search movie"
                        variant="outlined"
                    />
                </form>
                <Divider />
                <List>
                    <ListItem button component={RouterLink} to="/" onClick={() => setState(false)}>
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button component={RouterLink} to="/Contact" onClick={() => setState(false)}>
                        <ListItemIcon><MailIcon /></ListItemIcon>
                        <ListItemText primary="Contact" />
                    </ListItem>
                    {!users.auth ?
                    
                    <ListItem button component={RouterLink} to="/auth" onClick={() => setState(false)}>
                        <ListItemIcon><VpnKeyIcon /></ListItemIcon>
                        <ListItemText primary="Sign in" />
                    </ListItem>
                    :
                    <ListItem button onClick={() =>{
                        signOutUser()
                        setState(false)
                        }}>
                        <ListItemIcon><VpnKeyIcon /></ListItemIcon>
                        <ListItemText primary="Sign out" />
                    </ListItem>
                    }
                </List>
                {users.auth ?
                <>
                <Divider />
                <List>
                    <ListItem button component={RouterLink} to="/dashboard" onClick={() => setState(false)}>
                        <ListItemIcon><DashboardIcon /></ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                </List>
                    </>
                :null}

            </Drawer>
        </>
    )
}
export default SideDrawer;