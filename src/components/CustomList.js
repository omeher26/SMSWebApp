import React from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const CustomList = ({
  to,
  onClick,
  icon,
  primaryText,
  isActive,
}) => {
  return (
    <ListItemButton
      component={Link}
      to={to}
      onClick={onClick}
      sx={{
        background: isActive
          // ? 'linear-gradient(to top, #b3ffed, #eefffb)'
          ? 'linear-gradient(180deg, rgba(246,244,250,1) 10%, rgba(156,125,226,1) 100%)'
          : 'inherit',
          // borderLeft: isActive ? '4px solid #088F8F' : 'none',
          borderLeft: isActive ? '4px solid #bf50fb' : 'none',
          paddingLeft: '20px',
      }}
    >
      <ListItemIcon>
        {React.cloneElement(icon, {
          style: {
            color: isActive ? '#bf50fb' : 'inherit',
            fontSize: '26',
          },
        })}
      </ListItemIcon>
      <ListItemText
        primary={primaryText}
        primaryTypographyProps={{
          style: {
            color: isActive ? '#bf50fb' : 'inherit',
            fontWeight: isActive ? 'bold' : 'normal',
          },
        }}
      />
    </ListItemButton>
  );
};

export default CustomList;
