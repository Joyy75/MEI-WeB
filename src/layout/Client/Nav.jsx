import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import { AppBar, Toolbar, Button, IconButton, Menu, MenuItem, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { MenuIcon, Night, Light, DropDown, Close } from '@icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { AllContext } from '../../context/AllContext';
import { navLinks } from '@data';

export const Nav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { darkMode, setDarkMode } = useContext(AllContext);
  const location = useLocation();
  const nav = useNavigate();

  const isLinkActive = (link) => {
    const currentPath = location.pathname;

    if (link.href === '/' && currentPath === '/') return true;
    if (link.href !== '/' && currentPath.startsWith(link.href)) return true;
    if (link.submenu) {
      return link.submenu.some((sub) => sub.href !== '/' && currentPath.startsWith(sub.href));
    }

    return false;
  };

  return (
    <>
      <AppBar position="fixed" elevation={1} className="sub-card">
        <Toolbar className="flex items-center justify-between">
          <Logo darkMode={darkMode} onClick={() => nav('/')} />

          <DesktopNav isLinkActive={isLinkActive} />

          <div className="flex gap-5 items-center">
            <IconButton onClick={() => setDarkMode((prev) => !prev)} className="sub-card transition-colors duration-100">
              {darkMode ? <Night /> : <Light />}
            </IconButton>

            <div className="lg:hidden">
              <IconButton onClick={() => setMobileOpen(true)}>
                <MenuIcon className="sub-card" />
              </IconButton>
            </div>
          </div>
        </Toolbar>
      </AppBar>

      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} isLinkActive={isLinkActive} darkMode={darkMode} nav={nav} />
    </>
  );
};


const Logo = ({ darkMode, onClick }) => (
  <div className="flex items-center gap-2">
    <img onClick={onClick} src={darkMode ? '/assets/logo-dark.svg' : '/assets/logo-light.svg'} className="object-cover cursor-pointer w-24 h-24" alt="Logo" />
  </div>
);

const DesktopNav = ({ isLinkActive }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const nav = useNavigate();
  const location = useLocation();

  const baseBtn = 'font-serif text-base font-normal normal-case transition-colors duration-100';
  const activeBtn = 'card';
  const inactiveBtn = 'sub-card';
  const hoverClass = 'hover:card';

  return (
    <div className="hidden lg:flex gap-5 items-center">
      {navLinks.map((link) => {
        const isActive = isLinkActive(link);
        const menuId = `menu-${link.label}`;

        if (link.submenu) {
          return (
            <div key={link.label}>
              <Button
                onClick={(e) => setOpenMenu((prev) => (prev?.id === menuId ? null : { id: menuId, anchor: e.currentTarget }))}
                endIcon={<DropDown />}
                className={clsx(baseBtn, isActive ? activeBtn : inactiveBtn, hoverClass, 'z-30')}
              >
                <span className="font-serif">{link.label}</span>
              </Button>

              <Menu
                className="z-40"
                anchorEl={openMenu?.id === menuId ? openMenu.anchor : null}
                open={openMenu?.id === menuId}
                onClose={() => setOpenMenu(null)}
                MenuListProps={{ 'aria-labelledby': menuId }}
                sx={{ '& .MuiPaper-root': { backgroundColor: 'transparent' } }}
              >
                {link.submenu.map((sub) => {
                  const isSubActive = location.pathname === sub.href;

                  return (
                    <MenuItem
                      key={sub.label}
                      onClick={() => {
                        setOpenMenu(null);
                        nav(sub.href);
                      }}
                      className={clsx('transition-colors duration-100', isSubActive ? 'card' : 'sub-card', 'hover:card')}
                    >
                      <span className="font-serif">{sub.label}</span>
                    </MenuItem>
                  );
                })}
              </Menu>
            </div>
          );
        }

        return (
          <Button key={link.label} onClick={() => nav(link.href)} className={clsx(baseBtn, isActive ? activeBtn : inactiveBtn, hoverClass)}>
            <span className="font-serif">{link.label}</span>
          </Button>
        );
      })}
    </div>
  );
};

const MobileDrawer = ({ open, onClose, isLinkActive, darkMode, nav }) => (
  <Drawer anchor="right" open={open} onClose={onClose} className="lg:hidden">
    <div className="w-64 flex flex-col p-4 gap-4 sub-card">
      <div className="flex justify-between items-center mb-4">
        <img
          onClick={() => {
            nav('/');
            onClose();
          }}
          src={darkMode ? '/assets/logo-dark.svg' : '/assets/logo-light.svg'}
          className="w-24 h-24 cursor-pointer"
          alt="Logo"
        />
        <IconButton onClick={onClose}>
          <Close className="sub-card" />
        </IconButton>
      </div>

      <List>
        {navLinks.map((link) => {
          const isActive = isLinkActive(link);
          if (link.submenu) {
            return link.submenu.map((sub) => (
              <ListItem
                button
                key={sub.label}
                onClick={() => {
                  nav(sub.href);
                  onClose();
                }}
                className={clsx(isLinkActive(sub) ? 'card' : 'sub-card', 'hover:card')}
              >
                <span className="font-serif">{sub.label}</span>
              </ListItem>
            ));
          }

          return (
            <ListItem
              button
              key={link.label}
              onClick={() => {
                nav(link.href);
                onClose();
              }}
              className={clsx('font-serif', isActive ? 'card' : 'sub-card', 'hover:card')}
            >
              <span className="font-serif">{link.label}</span>
            </ListItem>
          );
        })}
      </List>
    </div>
  </Drawer>
);
