import {
  ClickAwayListener,
  Grid,
  Paper,
  Popper,
  Typography
} from '@material-ui/core'
import { PairList } from 'app/pages/exchange/components/PairList/PairList'
import { PairTableFilter } from 'app/pages/exchange/components/PairTable/PairTableFilter/PairTableFilter'
import { useMarket } from 'app/pages/exchange/hooks/useMarket'
import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import useStyles from './PairListDropdown.styles'
import { InvestRoute as paths } from 'app/pages/invest/router/config'
import { AppRouterLink } from 'components/AppRouterLink'

export interface PairListDropdownProps {
  pairName: string
}

export const PairListDropdown = ({ pairName }: PairListDropdownProps) => {
  const popperRef = useRef(null)
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const { pairId } = useParams<{ pairId: string }>()
  const { data: marketData } = useMarket(pairId)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl !== null ? null : event.currentTarget)
  }

  useEffect(() => {
    setAnchorEl(null)
  }, [pairId])

  const renderPopper = () => {
    return (
      <Popper
        id='pairList'
        open={anchorEl !== null}
        anchorEl={anchorEl}
        placement='bottom-start'
        modifiers={{
          flip: {
            enabled: false
          }
        }}
      >
        <Paper ref={popperRef} elevation={3} className={classes.paper}>
          <Grid container spacing={2} direction='column'>
            <Grid item>
              <PairTableFilter />
            </Grid>
            <Grid item>
              <PairList />
            </Grid>
          </Grid>
        </Paper>
      </Popper>
    )
  }

  const renderPopperWithOutsideClickHandler = () => {
    return (
      <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
        {renderPopper()}
      </ClickAwayListener>
    )
  }

  return (
    <Grid container spacing={1} justifyContent='flex-start' alignItems='center'>
      <Grid item>
        <Grid container direction='column' justifyContent='flex-start'>
          <Grid item>
            <Typography
              data-testid={'pairName'}
              variant='subtitle1'
              className={classes.pairName}
              color='primary'
              onClick={handleClick}
            >
              {pairName}
              <svg
                className={classes.icon}
                width='12'
                height='6'
                viewBox='0 0 12 6'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  className={classes.path}
                  d='M5.99155 6L0.802453 0.749999L11.1806 0.75L5.99155 6Z'
                />
              </svg>
            </Typography>
          </Grid>
          <Grid item>
            {anchorEl === null
              ? renderPopper()
              : renderPopperWithOutsideClickHandler()}
          </Grid>
        </Grid>
      </Grid>
      {marketData !== undefined ? (
        <Grid item>
          <AppRouterLink
            to={paths.viewListing}
            params={{
              userId: marketData.listing.createdBy,
              listingId: marketData.listing._id
            }}
          >
            View Details
          </AppRouterLink>
        </Grid>
      ) : null}
    </Grid>
  )
}
