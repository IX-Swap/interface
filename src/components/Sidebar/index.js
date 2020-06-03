import React, { useState, useEffect } from 'react';
import { Drawer, IconButton, List } from '@material-ui/core';

import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import HelpIcon from '@material-ui/icons/Help';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SecurityIcon from '@material-ui/icons/Security';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import PieChartIcon from '@material-ui/icons/PieChart';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

import { useTheme } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

// styles
import { useIsAdmin, useIsAuthorizer, useIsIssuer } from 'services/acl';
import useStyles from './styles';

// components
import SidebarLink from './components/SidebarLink/SidebarLink';

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from '../../context/LayoutContext';

function Sidebar({ location }: { location: any }) {
  const classes = useStyles();
  const theme = useTheme();
  const isAdmin = useIsAdmin();
  const isAuthorizer = useIsAuthorizer();
  const isIssuer = useIsIssuer();

  const structure = [
    {
      id: 'identity',
      label: 'Identity',
      link: '/identity',
      icon: <PersonIcon />,
    },
    {
      id: 'invest',
      label: 'Invest',
      link: '/invest',
      icon: <PieChartIcon />,
    },
    {
      id: 'accounts',
      label: 'Accounts',
      link: '/accounts',
      icon: <AccountBalanceIcon />,
    },
    {
      id: 'exchange',
      label: 'Exchange',
      link: '/exchange',
      icon: <TrendingUpIcon />,
      children: [
        { 
          label: 'Markets', 
          link: '/markets' 
        },
        {
          label: 'Trade History',
          link: '/trade-history',
        },
        {
          label: 'Order History',
          link: '/order-history',
        },
      ],
    },
    // Show only when user has issuer role
    ...(isIssuer
      ? [
          {
            id: 'issuance',
            label: 'Issuance',
            link: '/issuance',
            icon: <LocalAtmIcon />,
          },
        ]
      : []),
    // Show only when user has authorizer role
    ...(isAuthorizer
      ? [
          {
            id: 'authorizer',
            label: 'Authorizer',
            link: '/authorizer',
            icon: <AccountBoxIcon />,
            children: [
              { label: 'Bank Accounts', link: '/authorizer/banks' },
              { label: 'Cash Deposits', link: '/authorizer/deposits' },
              { label: 'Cash Withdrawals', link: '/authorizer/withdrawals' },
              {
                label: 'DS Withdrawals',
                link: '/authorizer/ds-withdrawals',
              },
              {
                label: 'Indentities (Individual)',
                link: '/authorizer/individual-identities',
              },
              {
                label: 'Indentities (Corporate)',
                link: '/authorizer/corporate-identities',
              },
              {
                label: 'Digital Securities',
                link: '/authorizer/digital-securities',
              },
              {
                label: 'Commitments',
                link: '/authorizer/commitments',
              },
              { 
                label: 'Listings', 
                link: '/listings'
              },
            ],
          },
        ]
      : []),
    // Show only when user has admin role
    ...(isAdmin
      ? [
          {
            id: 'users',
            label: 'User Management',
            link: '/users',
            icon: <PeopleIcon />,
          },
        ]
      : []),
    { id: 6, type: 'divider' },
    {
      id: 'security',
      label: 'Security',
      link: '/security',
      icon: <SecurityIcon />,
    },
    {
      id: 5,
      label: 'Support',
      link: '/primary',
      icon: <HelpIcon />,
    },
  ];

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
