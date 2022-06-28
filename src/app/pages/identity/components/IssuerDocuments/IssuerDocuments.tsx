import { Grid, Paper, Typography } from '@mui/material'
import { UploadDocumentField } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/UploadDocumentField'
import { identityQueryKeys } from 'config/queryKeys'
import React, { useEffect } from 'react'
import { useQueryCache } from 'react-query'
import { useDetailsOfIssuance } from '../../hooks/useDetailsOfIssuance'

export const IssuerDocuments = () => {
  const { data, isLoading } = useDetailsOfIssuance()
  const queryCache = useQueryCache()

  useEffect(() => {
    async function refetchIssuer() {
      if (data === undefined && !isLoading) {
        await queryCache.invalidateQueries(
          identityQueryKeys.getDetailsOfIssuance
        )
      }
    }
    void refetchIssuer()
  }, [data, queryCache, isLoading])

  return (
    <Grid container spacing={6} direction='column'>
      <Grid item>
        <Paper sx={{ borderRadius: 2, p: 5 }}>
          <Grid item xs={12}>
            <Typography variant='h5'>Upload Documents</Typography>
          </Grid>
          <UploadDocumentField
            name='companyRelated'
            label='Company-Related Documents'
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
            name='issuanceRelated'
            label='Issuance-Related Documents'
            helperElement={
              <Typography variant='body1'>
                offering memorandum, one pager of the issuance or any other
                marketing material
              </Typography>
            }
          />
        </Paper>
      </Grid>
      <Grid item>
        <Paper sx={{ borderRadius: 2, p: 5 }}>
          <UploadDocumentField
            name='financial'
            label='Financial Documents'
            helperElement={
              <Typography variant='body1'>
                balance sheet, profit &amp; loss statement or annual returns
              </Typography>
            }
          />
        </Paper>
      </Grid>
    </Grid>
  )
}
