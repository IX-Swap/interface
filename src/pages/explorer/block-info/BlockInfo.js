import React, { useState } from 'react'
import { Grid, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import {
  getBlockInfo,
  useBlockInfoDispatch,
  useBlockInfoState
} from '../../../context/BlockInfoContext'
import Widget from '../../../components/Widget/Widget'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200
    }
  },
  panel: {
    marginTop: '25px',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
}))

export default function BlockInfo (props) {
  const classes = useStyles()

  const blockInfoDispatch = useBlockInfoDispatch()
  const blockInfoState = useBlockInfoState()
  const [blockNumberValue, setBlockNumberValue] = useState('')

  function getBlock (number) {
    setBlockNumberValue(number)
    getBlockInfo(blockInfoDispatch, number)
  }

  return (
    <Grid container>
      <Grid className={classes.panel} sm={12} xs={12} md={12}>
        <Widget disableWidgetMenu>
          <form className={classes.root} noValidate autoComplete='off'>
            <TextField
              id='outlined-basic'
              label='Get Block Number'
              value={blockNumberValue}
              onChange={e => getBlock(e.target.value)}
              margin='normal'
              placeholder='0'
              type='number'
              fullWidth
            />
          </form>
          <pre className={classes.panel}>
            {JSON.stringify(blockInfoState.data, null, 2)}
          </pre>
        </Widget>
      </Grid>
    </Grid>
  )
}
