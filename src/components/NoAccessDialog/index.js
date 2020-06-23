import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  DialogActions
} from '@material-ui/core'
import { useHasSpecialRole, useIsAccredited } from 'services/acl'
import { useUserState } from 'context/user'
import { useLocation, useHistory } from 'react-router-dom'

const NoAccessDialog = () => {
  const hasSpecialRole = useHasSpecialRole()
  const isAccreditted = useIsAccredited()
  const { user: { totpConfirmed = false } = {} } = useUserState()
  const { pathname } = useLocation()
  const history = useHistory()

  if (
    isAccreditted ||
    hasSpecialRole ||
    !totpConfirmed ||
    pathname.match(/^\/identity.*$/)
  ) {
    return <></>
  }

  return (
    <Dialog aria-labelledby='simple-dialog-title' open fullWidth>
      <DialogTitle id='simple-dialog-title'>
        <b>Setup Identity</b>
      </DialogTitle>
      <DialogContent>
        <Typography paragraph>
          You need to setup Identity first and have it verified before having
          access to this page.
        </Typography>
        <DialogActions>
          <Button
            variant='contained'
            color='primary'
            onClick={() => history.push('/identity')}
          >
            Setup Identity
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

export default NoAccessDialog
