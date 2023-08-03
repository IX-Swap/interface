import React from 'react'
import {
  Grid,
  List,
  ListItem as MuiListItem,
  ListItemIcon,
  Typography
} from '@mui/material'
import { UploadDocumentField } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/UploadDocumentField'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'
import { InvestorRole } from 'app/pages/identity/utils/shared'
import { FormSectionHeader } from 'ui/FormSectionHeader/FormSectionHeader'

export interface ListItemProps {
  children: React.ReactNode
}

export const ListItem = ({ children }: ListItemProps) => (
  <MuiListItem style={{ paddingLeft: 6, alignItems: 'flex-start' }}>
    <ListItemIcon style={{ minWidth: 16 }}>&#8226;</ListItemIcon>
    {children}
  </MuiListItem>
)

export interface CorporateAccreditationDocumentsProps {
  corporateType?: 'investor' | 'issuer'
  investorRole?: InvestorRole
}

export const CorporateAccreditationDocuments = (
  props: CorporateAccreditationDocumentsProps
) => {
  const { corporateType = 'issuer', investorRole = 'accredited' } = props
  const isIssuer = corporateType === 'issuer'
  const isExpert = investorRole === 'expert'

  return (
    <Grid item>
      <FieldContainer>
        <Grid container direction={'column'} spacing={5}>
          <Grid item>
            <FormSectionHeader title={'Accreditation Documents'} />
          </Grid>
          {/* <Grid item>
            <UploadDocumentField
              name='financialDocuments'
              label='Financial Documents'
              helperElement={
                <Typography color={'text.secondary'} mt={1.5} fontWeight={400}>
                  Balance sheet, profit & loss statement or annual returns
                </Typography>
              }
            />
          </Grid> */}
          {!isIssuer && (
            <Grid item>
              <UploadDocumentField
                name='evidenceOfAccreditation'
                label={`Evidence of ${
                  !isExpert ? 'Accreditation' : 'Expertise'
                }`}
                helperElement={
                  <Grid item container direction='column'>
                    {!isExpert ? (
                      <Grid item>
                        <List>
                          <ListItem>
                            <Typography
                              color={'text.secondary'}
                              fontWeight={400}
                            >
                              Copy of the most recent audited balance sheet of
                              the corporation.
                            </Typography>
                          </ListItem>
                          <ListItem>
                            <Typography
                              color={'text.secondary'}
                              fontWeight={400}
                            >
                              Where the corporation is not required to prepare
                              audited account regularly, a balance sheet of the
                              corporation of the state of affairs of the
                              corporation as of the date of the balance sheet,
                              of which date shall be within the preceding 12
                              months.
                            </Typography>
                          </ListItem>
                        </List>
                      </Grid>
                    ) : (
                      <Grid item>
                        <Typography
                          color={'text.secondary'}
                          fontWeight={400}
                          my={1}
                        >
                          For Example: SGX trading member confirmation, recent
                          custody or broker trading statement, confirmation
                          letter from broker/custodian for trading activity for
                          past 12 months, financial statement/reports showing
                          previous engagement or dealing in capital market
                          products, trust deed showing intended activities of
                          the trust.
                        </Typography>
                      </Grid>
                    )}
                    <Grid item>
                      <Typography color={'text.secondary'} fontWeight={400}>
                        *Note that the above list is not exhaustive.
                      </Typography>
                    </Grid>
                  </Grid>
                }
              />
            </Grid>
          )}

          {/* Hidden upload field for documents in Corporate KYC. This is to preserve their value in the `documents` field */}
          <Grid item hidden>
            <UploadDocumentField
              name='corporateDocuments'
              label='Corporate Documents'
            />
          </Grid>
        </Grid>
      </FieldContainer>
    </Grid>
  )
}
