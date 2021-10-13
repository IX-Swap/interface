import React from 'react'
import {
  Typography,
  Dialog as MUIDialog,
  DialogTitle,
  DialogContent,
  DialogProps,
  DialogActions,
  useMediaQuery,
  useTheme,
  Button,
  Grid
} from '@material-ui/core'
import useStyles from 'app/pages/admin/components/ListedTokensDialog/ListedTokensDialog.styles'
import { VSpacer } from 'components/VSpacer'
import { SearchFilter } from 'app/components/SearchFilter'

export interface ModalProps extends Partial<DialogProps> {
  currentCustodian: string
  open?: boolean
  onClose: () => void
}

export const ListedTokensDialog = (props: ModalProps) => {
  const { open = false, onClose, currentCustodian } = props
  const classes = useStyles()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const handleClose = () => onClose()
  // TODO added get tokens list function after complete backend api endpoint
  // const {
  //   mutation: [closeDeal, { isLoading }]
  // } = useCloseDeal()

  return (
    <MUIDialog
      fullWidth
      open={open}
      maxWidth={'md'}
      fullScreen={fullScreen}
      className={classes.root}
      onClose={handleClose}
      onBackdropClick={handleClose}
      aria-labelledby='close-deal-modal-title'
      aria-describedby='close-deal-modal-description'
    >
      <DialogTitle className={classes.titleRoot}>
        <Typography
          variant='h4'
          component='span'
          align='center'
          className={classes.title}
        >
          Tokens Listed on {currentCustodian}
        </Typography>
      </DialogTitle>
      <DialogContent className={classes.content}>
        <VSpacer size={'small'} />
        <SearchFilter
          fullWidth
          placeholder='Search token'
          inputAdornmentPosition='start'
          filterValue={'searchToken'}
        />
        <Grid container className={classes.list} alignContent={'flex-start'}>
          {/* TODO Remove fake items and added data from backend api when it will be complete */}
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 134
          </Grid>
          <Grid item className={classes.item}>
            Item 13
          </Grid>
          <Grid item className={classes.item}>
            Item 14563
          </Grid>
          <Grid item className={classes.item}>
            Item 15656889
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 134
          </Grid>
          <Grid item className={classes.item}>
            Item 13
          </Grid>
          <Grid item className={classes.item}>
            Item 14563
          </Grid>
          <Grid item className={classes.item}>
            Item 15656889
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 134
          </Grid>
          <Grid item className={classes.item}>
            Item 13
          </Grid>
          <Grid item className={classes.item}>
            Item 14563
          </Grid>
          <Grid item className={classes.item}>
            Item 15656889
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 134
          </Grid>
          <Grid item className={classes.item}>
            Item 13
          </Grid>
          <Grid item className={classes.item}>
            Item 14563
          </Grid>
          <Grid item className={classes.item}>
            Item 15656889
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 134
          </Grid>
          <Grid item className={classes.item}>
            Item 13
          </Grid>
          <Grid item className={classes.item}>
            Item 14563
          </Grid>
          <Grid item className={classes.item}>
            Item 15656889
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 134
          </Grid>
          <Grid item className={classes.item}>
            Item 13
          </Grid>
          <Grid item className={classes.item}>
            Item 14563
          </Grid>
          <Grid item className={classes.item}>
            Item 15656889
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 134
          </Grid>
          <Grid item className={classes.item}>
            Item 13
          </Grid>
          <Grid item className={classes.item}>
            Item 14563
          </Grid>
          <Grid item className={classes.item}>
            Item 15656889
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 134
          </Grid>
          <Grid item className={classes.item}>
            Item 13
          </Grid>
          <Grid item className={classes.item}>
            Item 14563
          </Grid>
          <Grid item className={classes.item}>
            Item 15656889
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 134
          </Grid>
          <Grid item className={classes.item}>
            Item 13
          </Grid>
          <Grid item className={classes.item}>
            Item 14563
          </Grid>
          <Grid item className={classes.item}>
            Item 15656889
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 134
          </Grid>
          <Grid item className={classes.item}>
            Item 13
          </Grid>
          <Grid item className={classes.item}>
            Item 14563
          </Grid>
          <Grid item className={classes.item}>
            Item 15656889
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 134
          </Grid>
          <Grid item className={classes.item}>
            Item 13
          </Grid>
          <Grid item className={classes.item}>
            Item 14563
          </Grid>
          <Grid item className={classes.item}>
            Item 15656889
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
          <Grid item className={classes.item}>
            Item 1
          </Grid>
        </Grid>
      </DialogContent>
      <VSpacer size={'small'} />
      <DialogActions className={classes.actions}>
        <Button
          size='large'
          variant='contained'
          color='primary'
          onClick={handleClose}
        >
          Close
        </Button>
      </DialogActions>
    </MUIDialog>
  )
}
