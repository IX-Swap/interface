import React from 'react'
import { Grid, Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  useReadOnlyAbiDispatch,
  useReadOnlyAbiState,
  getReadOnlyAbi
} from '../../../context/ReadOnlyAbiContext'
import Widget from '../../../components/Widget/Widget'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 700
    },
    panel: {
      marginTop: '25px',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }
}))

export default function ReadOnlyAbi () {
  const classes = useStyles()

  const readOnlyAbiState = useReadOnlyAbiState()
  const readOnlyAbiDispatch = useReadOnlyAbiDispatch()

  function callReadOnlyAbiAction (address) {
    getReadOnlyAbi(readOnlyAbiDispatch, address)
  }
  return (
    <Grid container>
      <Grid item className={classes.panel} xs={12} sm={12} md={12} lg={12}>
        <Widget disableWidgetMenu>
          <form className={classes.root} noValidate autoComplete='off'>
            <TextField
              id='outlined-basic'
              label='Contract Address'
              // value={addressValue}
              // onChange={e => callEtherBalanceAction(e.target.value)}
              margin='normal'
              placeholder='0x..'
              type='string'
              fullWidth
            />
          </form>
          {/* {etherBalanceState.error ? (
            etherBalanceState.error
          ) : ( */}
          {/* <pre>{JSON.stringify(etherBalanceState.data, null, 2)}</pre> */}
          )}
        </Widget>
        <Widget disableWidgetMenu>
          <Button
            variant='contained'
            color='primary'
            onClick={() => callReadOnlyAbiAction()}
          >
            Get RO X-Token ABI
          </Button>
          <Grid item>
            {readOnlyAbiState.error ? (
              readOnlyAbiState.error
            ) : (
              <pre>{JSON.stringify(readOnlyAbiState.data, null, 2)}</pre>
            )}
          </Grid>
        </Widget>
      </Grid>
    </Grid>
  )
}
