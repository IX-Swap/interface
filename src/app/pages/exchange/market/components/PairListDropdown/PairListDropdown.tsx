import { Button, Grid, Paper, Popper, Typography } from '@material-ui/core'
import { PairList } from 'app/pages/exchange/market/components/PairList/PairList'
import { PairTableFilter } from 'app/pages/exchange/market/components/PairTable/PairTableFilter/PairTableFilter'
import React from 'react'

export interface PairListDropdownProps {
  pairName: string
}

export const PairListDropdown = ({ pairName }: PairListDropdownProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl !== null ? null : event.currentTarget)
  }

  return (
    <Grid container direction='column' justify='flex-start'>
      <Grid item>
        <Button color='primary' size='small' onClick={handleClick}>
          <Typography variant='subtitle1' color='textPrimary'>
            {pairName}
          </Typography>
        </Button>
      </Grid>
      <Grid item>
        <Popper
          id='pairList'
          open={anchorEl !== null}
          anchorEl={anchorEl}
          placement='bottom-start'
        >
          <Paper
            elevation={3}
            style={{
              width: '100%',
              padding: 16,
              maxWidth: 400,
              maxHeight: '"calc(100vh - 155px)"'
            }}
          >
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
      </Grid>
    </Grid>
  )
}
