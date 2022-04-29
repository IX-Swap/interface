import { ClickAwayListener, Grid, Paper, Popper } from '@mui/material'
import { PairList } from 'app/pages/exchange/components/PairList/PairList'
import { PairTableFilter } from 'app/pages/exchange/components/PairTable/PairTableFilter/PairTableFilter'
import { useMarket } from 'app/pages/exchange/hooks/useMarket'
import { InvestRoute as paths } from 'app/pages/invest/router/config'
import { AppRouterLink } from 'components/AppRouterLink'
import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import useStyles from './PairListDropdown.styles'
import { PairName } from 'app/pages/exchange/components/PairListDropdown/PairName'
export interface PairListDropdownProps {
  pairName: string
  hideDropdown?: boolean
}

export const PairListDropdown = ({
  pairName,
  hideDropdown = false
}: PairListDropdownProps) => {
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
        modifiers={[{ name: 'flip', enabled: false }]}
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
            <PairName handleClick={handleClick} pairName={pairName} />
          </Grid>
          {!hideDropdown && (
            <Grid item>
              {anchorEl === null
                ? renderPopper()
                : renderPopperWithOutsideClickHandler()}
            </Grid>
          )}
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
