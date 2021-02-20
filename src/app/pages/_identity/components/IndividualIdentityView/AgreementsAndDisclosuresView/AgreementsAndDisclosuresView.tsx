import React from 'react'
import DoneIcon from '@material-ui/icons/Done'
import CloseIcon from '@material-ui/icons/Close'
import { Grid, Link, Box } from '@material-ui/core'
import { AgreementsAndDisclosures } from 'types/identity'

export interface AgreementsAndDisclosuresViewProps {
  data: AgreementsAndDisclosures
}

export const AgreementsAndDisclosuresView = (
  props: AgreementsAndDisclosuresViewProps
) => {
  const { investorAgreement, custodyAgreement, disclosures } = props.data

  return (
    <Grid container direction={'column'} spacing={2}>
      <Grid item xs={12}>
        <Box display={'flex'} alignItems={'center'} color={'#AAAAAA'}>
          {investorAgreement ? <DoneIcon /> : <CloseIcon />}
          <Link href={'#'} style={{ marginLeft: 16 }}>
            Investor Agreement
          </Link>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Box display={'flex'} alignItems={'center'} color={'#AAAAAA'}>
          {custodyAgreement ? <DoneIcon /> : <CloseIcon />}
          <Link href={'#'} style={{ marginLeft: 16 }}>
            Custody Agreement
          </Link>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Box display={'flex'} alignItems={'center'} color={'#AAAAAA'}>
          {disclosures ? <DoneIcon /> : <CloseIcon />}
          <Link href={'#'} style={{ marginLeft: 16 }}>
            Disclosures
          </Link>
        </Box>
      </Grid>
    </Grid>
  )
}
