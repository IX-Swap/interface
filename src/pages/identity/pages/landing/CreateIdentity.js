import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Paper, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  paperContainer: {
    marginTop: '3em'
  },
  buttonGroup: {
    marginTop: '2em'
  },
  corporateButton: {
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
    fontWeight: 'bold'
  }
}))

const CreateIdentity = () => {
  const classes = useStyles()
  const history = useHistory()

  return (
    <Paper elevation={0} className={classes.paperContainer}>
      <Grid
        container
        alignItems='center'
        justify='center'
        style={{ width: '100%', height: '500px' }}
      >
        <div>
          <Typography>You do not have an identity setup.</Typography>

          <Grid
            container
            alignItems='center'
            justify='center'
            className={classes.buttonGroup}
          >
            {/* <Button
              type="button"
              onClick={() => history.push('/identity/individual')}
            >
              Individual
            </Button> */}
            <Button
              type='button'
              className={classes.corporateButton}
              onClick={() => history.push('/identity/individual')}
            >
              Create identity
            </Button>
          </Grid>
        </div>
      </Grid>
    </Paper>
  )
}

export default CreateIdentity
