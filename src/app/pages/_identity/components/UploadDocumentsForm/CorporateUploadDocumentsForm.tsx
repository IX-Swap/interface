import React from 'react'
import {
  Grid,
  List,
  ListItem as MuiListItem,
  ListItemIcon,
  Typography
} from '@material-ui/core'
import { UploadDocumentField } from 'app/pages/_identity/components/UploadDocumentsForm/UploadDocumentField/UploadDocumentField'

export interface ListItemProps {
  children: React.ReactNode
}

export const ListItem = ({ children }: ListItemProps) => (
  <MuiListItem style={{ paddingLeft: 0, alignItems: 'flex-start' }}>
    <ListItemIcon style={{ minWidth: 15 }}>-</ListItemIcon>
    {children}
  </MuiListItem>
)

export const CorporateUploadDocumentsForm = () => {
  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <UploadDocumentField
          name='corporateDocuments'
          label='Corporate Documents'
          helperElement={
            <Typography variant='body1'>
              Company Registry Profile, Certificate of Incorporation, Memorandum
              and article association, Corporate registry profile, Company
              Organization Chart, Register of shareholders and directors and
              Partnership Deed, Trust Deed.
            </Typography>
          }
        />
      </Grid>
      <Grid item>
        <UploadDocumentField
          name='financialDocuments'
          label='Financial Documents'
          helperElement={
            <Typography variant='body1'>
              Please upload your balance sheet , P&amp;L statement or Annual
              Returns
            </Typography>
          }
        />
      </Grid>
      <Grid item>
        <UploadDocumentField
          name='evidenceOfAccreditation'
          label='Evidence of Accreditation'
          helperElement={
            <Grid container direction='column' spacing={3}>
              <Grid item>
                <List>
                  <ListItem>
                    <Typography variant='body1'>
                      Copy of the most recent audited balance sheet of the
                      corporation.
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant='body1'>
                      Where the corporation is not required to prepare audited
                      account regularly, a balance sheet of the corporation of
                      the state of affairs of the corporation as of the date of
                      the balance sheet, of which date shall be within the
                      preceding 12 months.
                    </Typography>
                  </ListItem>
                </List>
              </Grid>
              <Grid item>
                <Typography>
                  *Note that the above list is not exhaustive and other
                  documents may be required or need to be provided.
                </Typography>
              </Grid>
            </Grid>
          }
        />
      </Grid>
    </Grid>
  )
}
