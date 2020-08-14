import React, { useState, ReactNode } from 'react'

import {
  Grid,
  Typography,
  IconButton,
  Paper,
  Popper,
  ClickAwayListener,
  ListItemIcon,
  ListItemText,
  ListItem
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import {
  AssignmentTurnedIn as ApproveIcon,
  Gavel as RejectIcon,
  ChevronLeft as ChevronLeftIcon,
  MoreHoriz as MoreHorizIcon,
  Launch as LaunchIcon
} from '@material-ui/icons'

import Filter from './components/filter'
import TableWithPagination from '../../../../components/table-with-pagination'
import {
  TableColumn,
  BaseFilter,
  Viewable,
  RowAction
} from '../../../../types/util'
import { useStore } from './store'
import classNames from 'classnames'

interface TableProps<T> {
  uri: string
  columns: Array<TableColumn<T>>
  name: string
  filter?: BaseFilter
  idKey?: string
}

interface AuthorizerPageProps<T> extends TableProps<T> {
  title: string
}

const useStyles = makeStyles((theme: any) => ({
  authStatus: {
    border: '1px solid red',
    borderRadius: '6px',
    width: '24px',
    height: '24px',
    display: 'flex',
    justifyContent: 'center',
    fontSize: '0.875rem',
    alignItems: 'center'
  },
  approved: {
    color: '#0BBE12',
    borderColor: '#0BBE12'
  },
  rejected: {
    color: '#D20000',
    borderColor: '#D20000'
  },
  unauthorized: {
    color: '#666666',
    borderColor: '#666666'
  },
  viewColor: {
    color: '#DADADA'
  },
  moreColor: {
    color: '#C4C4C4'
  },
  filters: {
    backgroundColor: '#FAFAFA',
    paddingTop: '48px',
    minHeight: '500px',
    [theme.breakpoints.up('lg')]: {
      maxWidth: '300px'
    }
  },
  content: {
    padding: '48px',
    [theme.breakpoints.up('lg')]: {
      maxWidth: 'calc(100% - 300px)',
      flexGrow: 1
    }
  },
  popover: {
    backgroundColor: '#444444',
    color: '#DDDDDD',
    '&:before': {
      /* tricky doubly-quoted empty string so mui parses it as truly empty */
      content: '""',
      display: 'block',
      width: '0',
      height: '0',
      position: 'absolute',
      borderLeft: '10px solid transparent',
      borderRight: '10px solid transparent',
      /* border color should probably match whatever your tooltip color is */
      borderBottom: '10px solid #444444',
      left: 'calc(100% - 30px)',
      bottom: '100%'
    }
  },
  popoverDark: {
    color: '#DDDDDD'
  },
  popoverText: {
    minWidth: '100px'
  }
}))

const AuthorizerTable = <T extends unknown>({
  uri,
  columns,
  name,
  filter,
  actions
}: TableProps<T> & { actions: RowAction<T> }) => {
  return (
    <TableWithPagination<T>
      uri={uri}
      columns={columns}
      name={name}
      filter={filter}
      hasActions
      actions={actions}
    />
  )
}

const TableMemoed = React.memo(AuthorizerTable)

const Actions = <T extends unknown>({
  onView,
  item
}: { item: T } & { onView: (row: T) => void }) => {
  const authorizerGenericStore = useStore()
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const togglePopper = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const handleClickAway = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  const actions = [
    {
      label: 'Approve',
      icon: () => <ApproveIcon />,
      onClick: async () => {
        await authorizerGenericStore.approve(item)
        handleClickAway()
      }
    },
    {
      label: 'Reject',
      icon: () => <RejectIcon />,
      onClick: async () => {
        await authorizerGenericStore.reject(item)
        handleClickAway()
      }
    },
    {
      label: 'View',
      icon: () => <LaunchIcon />,
      onClick: () => onView?.(item)
    }
  ]

  return (
    <Grid container>
      <IconButton onClick={() => onView?.(item)}>
        <LaunchIcon className={classes.viewColor} />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement='bottom-end'
        modifiers={{
          flip: {
            enabled: false
          }
        }}
      >
        <ClickAwayListener onClickAway={handleClickAway}>
          <Paper className={classes.popover}>
            {actions.map((e) => (
              <ListItem button key={e.label} onClick={() => e.onClick()}>
                <ListItemIcon
                  className={classes.popoverDark}
                  style={{ minWidth: '40px' }}
                >
                  {e.icon()}
                </ListItemIcon>
                <ListItemText className={classes.popoverText}>
                  {e.label}
                </ListItemText>
              </ListItem>
            ))}
          </Paper>
        </ClickAwayListener>
      </Popper>
      {(item as any).status === 'Unauthorized' && (
        <IconButton onClick={togglePopper}>
          <MoreHorizIcon className={classes.moreColor} />
        </IconButton>
      )}
    </Grid>
  )
}

const Preview = ({
  children,
  onBack
}: {
  children: ReactNode
  onBack: () => void
}) => {
  return (
    <Grid container spacing={4} direction='column'>
      <Grid item container xs={12} alignItems='center' style={{ flex: '0' }}>
        <IconButton aria-label='back' onClick={() => onBack()}>
          <ChevronLeftIcon fontSize='inherit' />
        </IconButton>
        <Typography variant='h3'>Preview</Typography>
      </Grid>
      <Grid container item xs={12} style={{ flex: '0' }} justify='center'>
        {children}
      </Grid>
    </Grid>
  )
}

const AuthorizerPage = <T extends unknown>(
  props: AuthorizerPageProps<T> & Viewable<T>
) => {
  const authorizerGenericStore = useStore()
  const classes = useStyles()
  const [filters, setFilters] = useState<BaseFilter>({
    status: 'Unauthorized'
  })
  const [isViewing, setIsViewing] = useState(false)
  const [item, setItem] = useState<T | null>(null)
  let columns = [...props.columns]
  const additionalColumn = {
    key: 'status',
    label: '',
    render: (a: string) => {
      switch (a) {
        case 'Approved':
          return (
            <Typography
              className={classNames(classes.authStatus, classes.approved)}
            >
              A
            </Typography>
          )
        case 'Rejected':
          return (
            <Typography
              className={classNames(classes.authStatus, classes.rejected)}
            >
              R
            </Typography>
          )
        default:
          return (
            <Typography
              className={classNames(classes.authStatus, classes.unauthorized)}
            >
              U
            </Typography>
          )
      }
    }
  }

  const onView = (row: T) => {
    setItem(row)
    setIsViewing(true)
  }

  const onBack = () => {
    setIsViewing(false)
  }

  authorizerGenericStore.setIdKey(props.idKey ?? '_id')
  authorizerGenericStore.setUri(props.uri)

  if (filters.status === '') {
    columns = [...columns, { ...additionalColumn }]
  }

  if (isViewing && props.onView && item) {
    const retValue = props.onView(item)
    if (retValue) {
      return <Preview onBack={onBack}>{retValue}</Preview>
    }
  }

  return (
    <Grid
      container
      style={{
        margin: '-24px',
        width: 'calc(100% + 48px)',
        height: 'calc(100% - 24px)'
      }}
    >
      <Grid item xs={12} md={3} className={classes.filters}>
        <Filter onApplyFilter={(mFilters) => setFilters({ ...mFilters })} />
      </Grid>
      <Grid item xs={12} md={9} className={classes.content}>
        <Grid item xs={12}>
          <Typography style={{ fontWeight: 'bold', fontSize: '1.875rem' }}>
            {props.title}
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ marginTop: '48px' }} component={Paper}>
          <TableMemoed<T>
            uri={props.uri}
            columns={columns}
            name={props.name}
            filter={filters}
            actions={(row: T) => <Actions item={row} onView={onView} />}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default AuthorizerPage
