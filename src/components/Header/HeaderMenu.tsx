import React, { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import AccountCircle from '@material-ui/icons/AccountCircle';

import IconButton from '../../muiComponents/IconButton';
import MenuItem from '../../muiComponents/MenuItem';
import Menu from '../../muiComponents/Menu';

import HeaderGreetings from './HeaderGreetings';

interface Props {
  username: string;
  isMenuOpen: boolean;
  anchorEl?: Element | ((element: Element) => Element) | null | undefined;
  onLogout: () => void;
  onLoggedInMenu: (event: MouseEvent<HTMLButtonElement>) => void;
  onLoggedInMenuClose: () => void;
}

const HeaderMenu: React.FC<Props> = ({
  onLogout,
  username,
  isMenuOpen = false,
  anchorEl,
  onLoggedInMenu,
  onLoggedInMenuClose,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <IconButton
        color="inherit"
        data-testid="header--menu-accountcircle"
        id="header--button-account"
        onClick={onLoggedInMenu}>
        <AccountCircle />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={onLoggedInMenuClose}
        open={isMenuOpen}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}>
        <MenuItem>
          <HeaderGreetings username={username} />
        </MenuItem>
        <MenuItem button={true} data-testid="header--button-logout" id="header--button-logout" onClick={onLogout}>
          {t('button.logout')}
        </MenuItem>
      </Menu>
    </>
  );
};

export default HeaderMenu;
