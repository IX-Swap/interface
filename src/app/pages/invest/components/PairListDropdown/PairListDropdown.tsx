import {
  ClickAwayListener,
  Grid,
  Paper,
  Popper,
  Typography
} from '@mui/material'
import { PairList } from 'app/pages/invest/components/PairList/PairList'
import useStyles from 'app/pages/invest/components/PairListDropdown/PairListDropdown.styles'
import { PairName } from 'app/pages/invest/components/PairListDropdown/PairName'
import { PairTableFilter } from 'app/pages/invest/components/PairTable/PairTableFilter/PairTableFilter'
import { useOTCMarket } from 'app/pages/invest/hooks/useOTCMarket'
import { AppRouterLink } from 'components/AppRouterLink'
import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
export interface PairListDropdownProps {
  pairName: string
  hideDropdown?: boolean
  path: string
  params: any
}

export const PairListDropdown = ({
  pairName,
  path,
  params,
  hideDropdown = false
}: PairListDropdownProps) => {
  const popperRef = useRef(null)
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const { pairId } = useParams<{ pairId: string }>()
  const { data: marketData } = useOTCMarket(pairId)
  const paramsIsDefined =
    params.userId !== undefined || params.issuerId !== undefined
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
    <Grid container spacing={1} justifyContent='flex-start' alignItems='end'>
      <Grid item>
        <Grid container direction='column' justifyContent='flex-start'>
          <Grid item>
            <Typography sx={{ color: '#778194', marginBottom: '5px' }}>
              Pair
            </Typography>
            <PairName
              handleClick={handleClick}
              hideDropdown={hideDropdown}
              pairName={pairName}
            />
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

      {marketData !== undefined && paramsIsDefined ? (
        <Grid
          item
          sx={{
            paddingBottom: '3px'
          }}
        >
          <Typography variant='body2'>
            <AppRouterLink to={path} params={params} variant='inherit'>
              View Details
            </AppRouterLink>
          </Typography>
        </Grid>
      ) : null}
    </Grid>
  )
}
