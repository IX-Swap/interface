import React from 'react'
import { Grid, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

import useStyles from './styles'

import Widget from '../../components/Widget/Widget'
import PageTitle from '../../components/PageTitle/PageTitle'

export default function DeveloperPanel (props) {
  var classes = useStyles()

  return (
    <>
      <PageTitle title='Developer Panel' />

      <Grid container spacing={3}>
        <Grid item lg={3} md={3} sm={3} xs={3}>
          <Widget
            title='Token Components'
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
            disableWidgetMenu
          >
            <Button
              className={classes.button}
              variant='contained'
              color='primary'
              onClick={() => props.history.push('/app/tokens')}
            >
              Tokens
            </Button>
          </Widget>
        </Grid>

        <Grid item lg={3} md={3} sm={3} xs={3}>
          <Widget
            title='Explorer Components'
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
            disableWidgetMenu
          >
            <Button
              className={classes.button}
              variant='contained'
              color='primary'
              onClick={() => props.history.push('/app/explorer')}
            >
              Explorer
            </Button>
          </Widget>
        </Grid>
        <Grid item lg={3} md={3} sm={3} xs={3}>
          <Widget
            title='Account Components'
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
            disableWidgetMenu
          >
            <Button
              className={classes.button}
              variant='contained'
              color='primary'
              onClick={() => props.history.push('/app/accounts')}
            >
              Accounts
            </Button>
          </Widget>
        </Grid>
        <Grid item lg={3} md={3} sm={3} xs={3}>
          <Widget
            title='Trade Components'
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
            disableWidgetMenu
          >
            <Button
              className={classes.button}
              variant='contained'
              color='primary'
              onClick={() => props.history.push('/app/trade')}
            >
              Trade
            </Button>
          </Widget>
        </Grid>
        <Grid item lg={3} md={3} sm={3} xs={3}>
          <Widget
            title='Invest Components'
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
            disableWidgetMenu
          >
            <Button
              className={classes.button}
              variant='contained'
              color='primary'
              onClick={() => props.history.push('/app/invest')}
            >
              Invest
            </Button>
          </Widget>
        </Grid>
        <Grid item lg={3} md={3} sm={3} xs={3}>
          <Widget
            title='Settings Components'
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
            disableWidgetMenu
          >
            <Button
              className={classes.button}
              variant='contained'
              color='primary'
            >
              Settings
            </Button>
          </Widget>
        </Grid>
        <Grid item lg={3} md={3} sm={3} xs={3}>
          <Widget
            title='Support Components'
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
            disableWidgetMenu
          >
            <Button
              className={classes.button}
              variant='contained'
              color='primary'
              onClick={() => props.history.push('/app/support')}
            >
              Support
            </Button>
          </Widget>
        </Grid>
        <Grid item lg={3} md={3} sm={3} xs={3}>
          <Widget
            title='Identity Components'
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
            disableWidgetMenu
          >
            <Button
              className={classes.button}
              variant='contained'
              color='primary'
              onClick={() => props.history.push('/app/identity')}
            >
              Identity
            </Button>
          </Widget>
        </Grid>
      </Grid>
    </>
  )
}
