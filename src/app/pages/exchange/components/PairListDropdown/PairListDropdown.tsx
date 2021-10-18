import {
  ClickAwayListener,
  Grid,
  Paper,
  Popper,
  Typography
} from '@material-ui/core'
import { PairList } from 'app/pages/exchange/components/PairList/PairList'
import { PairTableFilter } from 'app/pages/exchange/components/PairTable/PairTableFilter/PairTableFilter'
import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router'
import useStyles from './PairListDropdown.styles'

export interface PairListDropdownProps {
  pairName: string
}

export const PairListDropdown = ({ pairName }: PairListDropdownProps) => {
  const popperRef = useRef(null)
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const { pairId } = useParams<{ pairId: string }>()
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl !== null ? null : event.currentTarget)
  }

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
      <ClickAwayListener
        onClickAway={evt => {
          if (
            popperRef?.current !== undefined &&
            // @ts-expect-error
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            !popperRef.current.contains(evt.currentTarget)
          ) {
            setAnchorEl(null)
          }
        }}
      >
        {renderPopper()}
      </ClickAwayListener>
    )
  }

  useEffect(() => {
    setAnchorEl(null)
  }, [pairId])

  return (
    <Grid container direction='column' justify='flex-start'>
      <Grid item>
        <Typography
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
  )
}
