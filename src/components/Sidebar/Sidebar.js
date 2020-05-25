import React, { useState, useEffect } from 'react';
import { Drawer, IconButton, List } from '@material-ui/core';

import SettingsIcon from '@material-ui/icons/Settings';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import HelpIcon from '@material-ui/icons/Help';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SecurityIcon from '@material-ui/icons/Security';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import PieChartIcon from '@material-ui/icons/PieChart';

import { useTheme } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

// styles
import useStyles from './styles';

// components
import SidebarLink from './components/SidebarLink/SidebarLink';
// import Dot from './components/Dot'

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
    label: 'Exchange',
    link: '/exchange',
    icon: <TrendingUpIcon />,
    children: [
      { label: 'Trade History', link: '/trade-history', icon: <PermIdentityIcon /> },
      { label: 'Order History', link: '/order-history', icon: <SecurityIcon /> },
      { label: 'Markets', link: '/markets', icon: <SecurityIcon /> },
      { label: 'Listings', link: '/listings', icon: <SecurityIcon /> },
    ],
  },
  {
    id: 4,
    label: 'Settings',
    link: '/settings',
    icon: <SettingsIcon />,
    children: [
      { label: 'Identity', link: '/identity', icon: <PermIdentityIcon /> },
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

function Sidebar({ location }) {
  const classes = useStyles();
  const theme = useTheme();

  // global
  const { isSidebarOpened } = useLayoutState();
  const layoutDispatch = useLayoutDispatch();

  // local
  const [isPermanent, setPermanent] = useState(true);

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
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    const windowWidth = window.innerWidth;
    const breakpointWidth = theme.breakpoints.values.md;
    const isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
