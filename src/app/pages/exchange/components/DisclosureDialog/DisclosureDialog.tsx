import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle
} from '@material-ui/core'
import { useStyles } from './DisclosureDialog.style'

export interface DisclosureDialogProps {
  isOpen: boolean
  onClose: () => void
}

export const DisclosureDialog = ({
  isOpen,
  onClose
}: DisclosureDialogProps) => {
  const classes = useStyles()
  return (
    <Dialog open={isOpen} maxWidth={'md'} classes={{ paper: classes.root }}>
      <DialogTitle disableTypography classes={{ root: classes.title }}>
        Disclosure
      </DialogTitle>
      <DialogContentText classes={{ root: classes.content }}>
        <b>
          “You are now entering IC SG Pte Ltd’s secondary trading platform,
          which is unregulated. Instead, it is operated under the Monetary
          Authority of Singapore’s (“MAS”) regulatory sandbox scheme.{' '}
        </b>
        <br />
        <br />
        IC SG Pte. Ltd. (the “Company”) holds a Capital Markets Services license
        No. CMS100635-1 (“CMSL”) to deal in securities by the MAS, which allows
        the Company to facilitate the primary offer and issuance of securities
        and act as an intermediary between issuers and investors. The Company
        also holds a regulatory exemption under the Financial Advisers Act (Cap.
        110) which allows it to provide advice on units in collective investment
        schemes (broadly, pooled investments).
        <br />
        <br />
        ICSG Pte Ltd. (the “Company”) operates an organised market allowing
        investors to purchase securities from, and sell securities to, other
        investors. At present, the Company operates this organised market in
        accordance with the MAS regulatory sandbox scheme. The sandbox is
        presently scheduled to continue until 14 March 2022, subject to
        extension. While in the sandbox, the Company is exempted from compliance
        with the regulatory requirements of operating an organised market under
        the SFA.
        <br />
        <br />
        <b>
          Please note that in the event the regulatory sandbox for the organised
          market is terminated/discontinued, investors may not be able to sell
          their investments.”
        </b>
      </DialogContentText>
      <DialogActions classes={{ root: classes.actions }}>
        <Button
          type={'button'}
          variant={'contained'}
          color={'primary'}
          onClick={() => onClose()}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}
