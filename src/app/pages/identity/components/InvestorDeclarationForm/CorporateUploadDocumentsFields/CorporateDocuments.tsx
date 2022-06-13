import React from 'react'
import {
  Grid,
  List,
  ListItem as MuiListItem,
  ListItemIcon,
  Paper,
  Typography
} from '@mui/material'
import { UploadDocumentField } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/UploadDocumentField'

export interface ListItemProps {
  children: React.ReactNode
}

export const ListItem = ({ children }: ListItemProps) => (
  <MuiListItem style={{ paddingLeft: 0, alignItems: 'flex-start' }}>
    <ListItemIcon style={{ minWidth: 15 }}>-</ListItemIcon>
    {children}
  </MuiListItem>
)

export interface CorporateDocumentsProps {
  corporateType?: 'investor' | 'issuer'
}

export const CorporateDocuments = (props: CorporateDocumentsProps) => {
  const { corporateType = 'issuer' } = props
  const isIssuer = corporateType === 'issuer'

  return (
    <Grid item container direction='column' spacing={3}>
      <Grid item>
        <Paper sx={{ borderRadius: 2, p: 5 }}>
          <UploadDocumentField
            name='corporateDocuments'
            label='Corporate Documents'
            helperElement={
              <Typography variant='body1'>
                company registry profile, certificate of incorporation,
                memorandum and articles of association, company organization
                chart, register of shareholders and directors, partnership deed
                and trust deed
              </Typography>
            }
          />
        </Paper>
      </Grid>
      <Grid item>
        <Paper sx={{ borderRadius: 2, p: 5 }}>
          <UploadDocumentField
            name='financialDocuments'
            label='Financial Documents'
            helperElement={
              <Typography variant='body1'>
                balance sheet, profit &amp; loss statement or annual returns
              </Typography>
            }
          />
        </Paper>
      </Grid>
      {!isIssuer && (
        <Grid item>
          <Paper sx={{ borderRadius: 2, p: 5 }}>
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
                          Where the corporation is not required to prepare
                          audited account regularly, a balance sheet of the
                          corporation of the state of affairs of the corporation
                          as of the date of the balance sheet, of which date
                          shall be within the preceding 12 months.
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
          </Paper>
        </Grid>
      )}
    </Grid>
  )
}
