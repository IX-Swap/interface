import React from 'react'
import { Grid, Typography } from '@mui/material'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { FieldContainer } from 'app/pages/identity/components/FieldContainer/FieldContainer'
import { DeclarationsListItem } from 'app/pages/identity/components/DeclarationsListItem/DeclarationsListItem'
import { IndividualIdentity } from 'app/pages/identity/types/forms'

export interface FatcaViewProps {
  data: IndividualIdentity
}

export const FatcaView = ({ data }: FatcaViewProps) => {
  return (
    <FieldContainer>
      <Grid container direction={'column'} spacing={3}>
        <Grid item>
          <FormSectionHeader title='FATCA' />
        </Grid>
        <Grid item>
          {data.declarations.tax.fatca ? (
            <Grid container direction={'column'} spacing={1.5}>
              <Grid item>
                <DeclarationsListItem
                  value={true}
                  label={
                    <Typography
                      fontWeight={'inherit'}
                      fontSize={'inherit'}
                      color={'text.secondary'}
                      mt={0.35}
                    >
                      I confirm that{' '}
                      <Typography
                        display={'inline'}
                        fontWeight={'inherit'}
                        fontSize={'inherit'}
                        color={'text.primary'}
                      >
                        I am a US citizen
                      </Typography>{' '}
                      and/or resident in the US for tax purposes and my U.S.
                      federal
                    </Typography>
                  }
                />
              </Grid>
              <Grid item>
                <Typography ml={4.5} fontWeight={400}>
                  <Typography fontWeight={500} display={'inline'}>
                    US Tin:
                  </Typography>{' '}
                  {data.declarations.tax.usTin}
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <DeclarationsListItem
              value={true}
              label={
                <Typography
                  mt={0.35}
                  fontWeight={'inherit'}
                  fontSize={'inherit'}
                  color={'text.secondary'}
                >
                  I confirm that{' '}
                  <Typography
                    display={'inline'}
                    fontWeight={'inherit'}
                    fontSize={'inherit'}
                    color={'text.primary'}
                  >
                    I am not a US citizen
                  </Typography>{' '}
                  or resident in the US for tax purposes.
                </Typography>
              }
            />
          )}
        </Grid>
      </Grid>
    </FieldContainer>
  )
}
