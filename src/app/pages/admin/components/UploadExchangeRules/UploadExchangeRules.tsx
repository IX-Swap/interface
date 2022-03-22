import { Box, Grid, Typography } from '@mui/material'
import { useGetExchangeRules } from 'app/pages/admin/hooks/useGetExchangeRules'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { DataroomFileRow } from 'components/dataroom/DataroomFileRow'
import { DataroomUploader } from 'components/dataroom/DataroomUploader'
import { Form } from 'components/form/Form'
import { LOADING_TEXT } from 'components/form/renderUtils'
import { resourcesQueryKeys } from 'config/queryKeys'
import React from 'react'
import { useQueryCache } from 'react-query'

export const UploadExchangeRules = () => {
  const { data, isLoading } = useGetExchangeRules()

  const queryCache = useQueryCache()

  const invalidateExchangeRulesQueryKey = () => {
    void queryCache.invalidateQueries(resourcesQueryKeys.exchangeRules)
  }

  return (
    <Form>
      <Box pr={5}>
        <Grid container spacing={1}>
          {isLoading ? (
            <>{LOADING_TEXT}</>
          ) : (
            <>
              <Grid item xs={12}>
                <FormSectionHeader title='Upload Document' />
              </Grid>
              <Grid item xs={9} container alignItems='center'>
                <Typography variant='subtitle1'>Exchange Rule</Typography>
              </Grid>
              <Grid item xs={data === undefined ? 3 : 12}>
                <Grid container alignItems='center' wrap='nowrap'>
                  <DataroomUploader
                    name='exchangeRules'
                    label='Exchange Rules'
                    value={data}
                    render={DataroomFileRow}
                    documentInfo={data}
                    onDelete={invalidateExchangeRulesQueryKey}
                    onChange={invalidateExchangeRulesQueryKey}
                    feature='authorization/exchangeRules'
                  />
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </Form>
  )
}
