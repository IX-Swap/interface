import React, { useState, useEffect } from 'react';
import { Drawer, IconButton, List } from '@material-ui/core';

import SettingsIcon from '@material-ui/icons/Settings';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import HelpIcon from '@material-ui/icons/Help';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SecurityIcon from '@material-ui/icons/Security';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import PieChartIcon from '@material-ui/icons/PieChart';
import PersonIcon from '@material-ui/icons/Person';

import { useTheme } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

// styles
import useStyles from './styles';

// components
import SidebarLink from './components/SidebarLink/SidebarLink';

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from '../../context/LayoutContext';

const structure = [
  {
    id: 0,
    label: 'Trade',
    link: '/trade',
    icon: <ShowChartIcon />,
  },
  {
    id: 1,
    label: 'Invest',
    link: '/invest',
    icon: <PieChartIcon />,
  },
  {
    id: 2,
    label: 'Accounts',
    link: '/accounts',
    icon: <AccountBalanceIcon />,
  },
  {
    id: 3,
    label: 'Identity',
    link: '/identity',
    icon: <PersonIcon />,
  },
  {
    id: 4,
    label: 'Settings',
    link: '/settings',
    icon: <SettingsIcon />,
    children: [
      { label: 'Security', link: '/security', icon: <SecurityIcon /> },
      { label: 'Users', link: '/users', icon: <SecurityIcon /> },
      { label: 'Authorizer', link: '/authorizer', icon: <SecurityIcon /> },
    ],
  },
  {
    id: 5,
    label: 'Support',
    link: '/primary',
    icon: <HelpIcon />,
  },
  { id: 6, type: 'divider' },
];

function Sidebar({ location }: { location: any }) {
  const classes = useStyles();
  const theme = useTheme();

  // global
  const { isSidebarOpened } = useLayoutState();
  const layoutDispatch = useLayoutDispatch();

  // local
  const [isPermanent, setPermanent] = useState(true);

  const handleWindowWidthChange = () => {
    const windowWidth = window.innerWidth;
    const breakpointWidth = theme.breakpoints.values.md;
    const isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  };

  useEffect(function () {
    window.addEventListener('resize', handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener('resize', handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? 'permanent' : 'temporary'}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map((link) => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link} // eslint-disable-line react/jsx-props-no-spreading
          />
        ))}
      </List>
    </Drawer>
  );
}

export default withRouter(Sidebar);
