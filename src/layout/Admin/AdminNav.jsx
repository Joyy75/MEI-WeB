import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { LayoutDashboard, LogOut, UsersRound, School, MessageSquareText, Calendar } from 'lucide-react';
import { SnackBar } from '@components';
import { useSnackbar } from '@hooks';

import Cookies from 'js-cookie';

export const AdminNav = () => {
  const location = useLocation();
  const { message: snackMessage, type: snackType, trigger: snackTrigger, showSnack } = useSnackbar();

  const nav = useNavigate();
  const handleLogout = () => {
    showSnack('Logged out successfully', 'success');
    Cookies.remove('token');
    nav('/');
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 75,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          backgroundColor: 'transparent',
          width: 75,
          boxSizing: 'border-box',
          boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.4)',
        },
      }}
    >
      <SnackBar message={snackMessage} type={snackType} trigger={snackTrigger} />

      <List>
        {/* Dashboard */}
        <ListItem className={`cursor-pointer `} component={Link} to="/admin/dashboard" sx={{ mb: 3, mt: 5 }}>
          <ListItemIcon>
            <LayoutDashboard className={`hover:text-light/80 text-cyan-700 duration-500 ${location.pathname == '/admin/dashboard' ? 'text-light/100' : ' '} `} />
          </ListItemIcon>
          <ListItemText />
        </ListItem>

        {/* Courses */}
        <ListItem className=" cursor-pointer  transition-all duration-300 ease-in-out " component={Link} to="/admin/courses" sx={{ mb: 3 }}>
          <ListItemIcon>
            <School className={`hover:text-light/80 text-cyan-700 duration-500 ${location.pathname == '/admin/courses' ? 'text-light/100' : ' '} `} />
          </ListItemIcon>
          <ListItemText />
        </ListItem>

        {/* Volunteers */}
        <ListItem className=" cursor-pointer hover:bg-transparent hover:shadow-sm transition-all duration-500 ease-in-out " component={Link} to="/admin/volunteers" sx={{ mb: 3 }}>
          <ListItemIcon>
            <UsersRound className={` hover:text-light/80 text-cyan-700 duration-500 ${location.pathname == '/admin/volunteers' ? 'text-light/100 ' : ' '} `} />
          </ListItemIcon>
          <ListItemText />
        </ListItem>

        {/* Eveent */}
        <ListItem className=" cursor-pointer hover:bg-transparent hover:shadow-sm transition-all duration-500 ease-in-out " component={Link} to="/admin/events" sx={{ mb: 3 }}>
          <ListItemIcon>
            <Calendar className={` hover:text-light/80 text-cyan-700 duration-500 ${location.pathname == '/admin/events' ? 'text-light/100 ' : ' '} `} />
          </ListItemIcon>
          <ListItemText />
        </ListItem>

        {/* Contact */}
        <ListItem className=" cursor-pointer hover:bg-transparent hover:shadow-sm transition-all duration-500 ease-in-out " component={Link} to="/admin/contacts" sx={{ mb: 3 }}>
          <ListItemIcon>
            <MessageSquareText className={` hover:text-light/80 text-cyan-700 duration-500 ${location.pathname == '/admin/contacts' ? 'text-light/100 ' : ' '} `} />
          </ListItemIcon>
          <ListItemText />
        </ListItem>

        {/* Signout */}
        <ListItem
          onClick={handleLogout}
          className=" 
           mt-[200px] cursor-pointer "
          sx={{ mb: 5 }}
        >
          <ListItemIcon>
            <LogOut className=" hover:text-light/80 text-light duration-500 transition-all  ease-in-out" />
          </ListItemIcon>
          <ListItemText />
        </ListItem>
      </List>
    </Drawer>
  );
};
