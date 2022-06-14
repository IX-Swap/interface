import React from 'react'
import {
  Grid,
  List,
  ListItem as MuiListItem,
  ListItemIcon,
  Typography
} from '@mui/material'
import { UploadDocumentField } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/UploadDocumentField'
import { FieldContainer } from 'app/pages/identity/components/FieldContainer/FieldContainer'

export interface ListItemProps {
  children: React.ReactNode
}

export const ListItem = ({ children }: ListItemProps) => (
  <MuiListItem style={{ paddingLeft: 6, alignItems: 'flex-start' }}>
    <ListItemIcon style={{ minWidth: 16 }}>&#8226;</ListItemIcon>
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
    <Grid item>
      <FieldContainer>
        <Grid container direction={'column'} spacing={5}>
          <Grid item>
            <UploadDocumentField
              name='corporateDocuments'
              label='Corporate Documents'
              helperElement={
                <Typography color={'text.secondary'} mt={1.5}>
                  Company registry profile, certificate of incorporation,
                  memorandum and articles of association, company organization
                  chart, register of shareholders and directors, partnership
                  deed and trust deed
                </Typography>
              }
            />
          </Grid>
          <Grid item>
            <UploadDocumentField
              name='financialDocuments'
              label='Financial Documents'
              helperElement={
                <Typography color={'text.secondary'} mt={1.5}>
                  Balance sheet, profit & loss statement or annual returns
                </Typography>
              }
            />
          </Grid>
          {!isIssuer && (
            <Grid item>
              <UploadDocumentField
                name='evidenceOfAccreditation'
                label='Evidence of Accreditation'
                helperElement={
                  <Grid item container direction='column'>
                    <Grid item>
                      <List>
                        <ListItem>
                          <Typography color={'text.secondary'}>
                            Copy of the most recent audited balance sheet of the
                            corporation.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <Typography color={'text.secondary'}>
                            Where the corporation is not required to prepare
                            audited account regularly, a balance sheet of the
                            corporation of the state of affairs of the
                            corporation as of the date of the balance sheet, of
                            which date shall be within the preceding 12 months.
                          </Typography>
                        </ListItem>
                      </List>
                    </Grid>
                    <Grid item>
                      <Typography color={'text.secondary'}>
                        *Note that the above list is not exhaustive and other
                        documents may be required or need to be provided.
                      </Typography>
                    </Grid>
                  </Grid>
                }
              />
            </Grid>
          )}
        </Grid>
      </FieldContainer>
    </Grid>
  )
}
