import React from 'react'
import {
  Button,
  Dialog as MUIDialog,
  DialogTitle,
  Box,
  Typography,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery
} from '@material-ui/core'
import { useHistory, useParams } from 'react-router-dom'
import { CustodyManagementRoute } from 'app/pages/admin/router/config'
import { VSpacer } from 'components/VSpacer'
import useStyles from 'app/pages/admin/components/CustodyDetailsDialog/CustodyDetailsDialog.styles'
import { useGetCustodianDetails } from 'app/pages/admin/hooks/useGetCustodianDetails'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'

export const CustodyDetailsDialog = () => {
  const { replace } = useHistory()
  const theme = useTheme()
  const classes = useStyles()
  const params = useParams<{ accountId: string }>()

  // TODO Change next line after backend api will change
  const currentCustodyName = 'Investor Name'
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const { data, isLoading } = useGetCustodianDetails(params.accountId)

  if (isLoading) {
    return <LoadingIndicator />
  }

  return (
    <MUIDialog
      maxWidth={'md'}
      fullWidth
      fullScreen={fullScreen}
      open={true}
      className={classes.root}
      aria-labelledby='custody-details-modal-title'
      aria-describedby='custody-details-modal-description'
    >
      <DialogTitle className={classes.titleRoot}>
        <Box justifyContent='center' alignItems='center'>
          <Typography
            variant='h4'
            component='span'
            align='center'
            className={classes.title}
          >
            Tokens Supported for the {currentCustodyName}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent className={classes.contentWrapper}>
        <VSpacer size={'small'} />
        <Box
          alignItems='center'
          justifyContent='center'
          className={classes.content}
        >
          <pre>{JSON.stringify(data, null, 1)}</pre>
        </Box>
      </DialogContent>
      <VSpacer size={'small'} />
      <DialogActions className={classes.actions}>
        <Button
          size='large'
          color='primary'
          variant='contained'
          onClick={() => replace(CustodyManagementRoute.main)}
        >
          Close
        </Button>
      </DialogActions>
    </MUIDialog>
  )
}
