import React from 'react'
import { Grid, Typography } from '@mui/material'
import { LabelledValue } from 'components/LabelledValue'
import { useIsSingPass } from 'app/pages/identity/hooks/useIsSingPass'
import { formatMoney } from 'helpers/numbers'
import { Divider } from 'ui/Divider'
import { NOA } from 'app/pages/identity/components/FinancialInformationForm/NoticeOfAssesment/Breakdown'
import { FieldContainer } from 'app/pages/identity/components/FieldContainer/FieldContainer'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'

export const NoticeOfAssessmentView = () => {
  const { isSingPass, singPassData } = useIsSingPass()
  const noas = singPassData?.noahistory.noas ?? []

  if (isSingPass || noas.length < 1) {
    return null
  }

  return (
    <Grid item>
      <FieldContainer>
        <Grid item container direction={'column'} spacing={5}>
          <Grid item>
            <FormSectionHeader
              title={
                <Typography fontSize={'inherit'} fontWeight={'inherit'}>
                  Notice of Assessment{' '}
                  <Typography
                    fontSize={'inherit'}
                    fontWeight={'inherit'}
                    display={'inline'}
                    color={'text.secondary'}
                  >
                    (Basic, Last 2 Years)
                  </Typography>
                </Typography>
              }
            />
          </Grid>
          <Grid item>
            <Grid container spacing={5}>
              {noas.map((noa: NOA, i: number) => (
                <React.Fragment key={noa.yearofassessment.value}>
                  <Grid
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { sx: '1fr', sm: '1fr 1fr' }
                    }}
                    item
                    container
                  >
                    <Grid item>
                      <LabelledValue
                        isRedesigned
                        value={noa.yearofassessment.value}
                        label='Year of Assessment'
                      />
                    </Grid>

                    <Grid item>
                      <LabelledValue
                        isRedesigned
                        value={`${noa.category.value}${
                          noa.taxclearance.value === 'Y' ? '(Clearance)' : ''
                        }`}
                        label='Type'
                      />
                    </Grid>
                  </Grid>

                  <Grid
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { sx: '1fr' }
                    }}
                    item
                    container
                  >
                    <Grid item>
                      <LabelledValue
                        isRedesigned
                        value={formatMoney(noa.amount.value)}
                        label='Assessable Income'
                      />
                    </Grid>
                  </Grid>

                  <Grid
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: {
                        sx: '1fr',
                        sm: '1fr 1fr',
                        lg: '1fr 1fr 1fr 1fr'
                      }
                    }}
                    item
                    container
                  >
                    <Grid item>
                      <LabelledValue
                        isRedesigned
                        value={formatMoney(noa.employment.value)}
                        label='Employment'
                      />
                    </Grid>
                    <Grid item>
                      <LabelledValue
                        isRedesigned
                        value={formatMoney(noa.trade.value)}
                        label='Trade'
                      />
                    </Grid>

                    <Grid item>
                      <LabelledValue
                        isRedesigned
                        value={formatMoney(noa.rent.value)}
                        label='Rent'
                      />
                    </Grid>

                    <Grid item>
                      <LabelledValue
                        isRedesigned
                        value={formatMoney(noa.interest.value)}
                        label='Interest'
                      />
                    </Grid>
                  </Grid>

                  {i < noas.length - 1 && (
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                  )}
                </React.Fragment>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </FieldContainer>
    </Grid>
  )
}
