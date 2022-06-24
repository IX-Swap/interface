import React from 'react'
import { Grid, Typography, Paper, Box } from '@mui/material'
import { LabelledValue } from 'components/LabelledValue'
import { DeclarationsListItem } from '../../DeclarationsListItem/DeclarationsListItem'
import { VSpacer } from 'components/VSpacer'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { IndividualIdentity } from 'app/pages/identity/types/forms'
import { useStyles } from 'app/pages/identity/components/UploadDocumentsForm/styles'

export interface TaxDeclarationViewProps {
  data: IndividualIdentity
}

export const TaxDeclarationView = ({ data }: TaxDeclarationViewProps) => {
  const { taxResidencies, declarations } = data
  const singaporeOnly = taxResidencies?.[0]?.residentOfSingapore ?? false
  const styles = useStyles()

  const renderFatcaBlock = () => {
    const fatcaLabel =
      declarations?.tax?.fatca || false ? (
        <Typography className={styles.text} textTransform='capitalize'>
          <span className={styles.blackText}>I confirm that</span> I am a US
          citizen and/or resident in the US for tax purposes and my U.S. federal
          Taxpayer Identifying Number (US TIN) is as follows:
        </Typography>
      ) : (
        <Typography className={styles.text} textTransform='capitalize'>
          <span className={styles.blackText}>I confirm that</span> I am not a US
          citizen or resident in the US for tax purposes.
        </Typography>
      )

    return (
      <Grid container direction={'column'}>
        <Grid item>
          <FormSectionHeader title='FATCA' />
          <Box py={2} />
        </Grid>
        <Grid item>
          <Typography>
            <DeclarationsListItem label={fatcaLabel} value={true} />{' '}
          </Typography>
        </Grid>
      </Grid>
    )
  }

  const renderContentForSingaporeResident = () => {
    return (
      <LabelledValue
        label={'My Singapore NRIC/FIN is:'}
        value={taxResidencies?.[0].taxIdentificationNumber}
      />
    )
  }

  const renderContentForAnotherCountriesResident = () => {
    return (
      <Paper sx={{ borderRadius: 2, p: 5 }}>
        <Grid item xs={12}>
          {renderFatcaBlock()}
        </Grid>
      </Paper>
    )
  }

  return (
    <Grid container spacing={4}>
      <Grid item>
        <Paper sx={{ borderRadius: 2, p: 5 }}>
          <Grid item xs={12}>
            <Grid container>
              <Grid item>
                <FormSectionHeader title='Tax Declaration' />
                <VSpacer size='medium' />
              </Grid>
              <Grid item>
                <Typography>
                  Are you currently solely a tax resident of Singapore?
                </Typography>
                <VSpacer size={'small'} />
                <Typography>
                  {singaporeOnly ? (
                    <DeclarationsListItem
                      label={
                        <Typography
                          className={styles.text}
                          textTransform='capitalize'
                        >
                          <span className={styles.blackText}>Yes</span>, I’m
                          currently only tax resident in Singapore and do not
                          have a foreign tax residency.
                        </Typography>
                      }
                      value={false}
                    />
                  ) : (
                    <DeclarationsListItem
                      label={
                        <Typography
                          className={styles.text}
                          textTransform='capitalize'
                        >
                          <span className={styles.blackText}>No</span>, I’m
                          currently tax resident in the following list of
                          jurisdictions (including Singapore, if applicable):
                        </Typography>
                      }
                      value={true}
                    />
                  )}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item sx={{ width: '100%' }}>
        {singaporeOnly
          ? renderContentForSingaporeResident()
          : renderContentForAnotherCountriesResident()}
      </Grid>
    </Grid>
  )
}
