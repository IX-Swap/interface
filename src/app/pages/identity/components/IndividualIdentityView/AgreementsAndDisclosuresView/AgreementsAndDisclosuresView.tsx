import React from 'react'
import DoneIcon from '@mui/icons-material/Done'
import CloseIcon from '@mui/icons-material/Close'
import { Grid, Link, Box } from '@mui/material'
import {
  CorporateIdentity,
  IndividualIdentity
} from 'app/pages/identity/types/forms'

export interface AgreementsAndDisclosuresViewProps {
  data: IndividualIdentity | CorporateIdentity
  isCorporateIssuerForm?: boolean
}

export const AgreementsAndDisclosuresView = (
  props: AgreementsAndDisclosuresViewProps
) => {
  const { investor, custody, disclosure } =
    props.data.declarations?.agreements ?? {}
  const isCorporateIssuerForm = props.isCorporateIssuerForm ?? false

  const renderAgreementAndDisclosureLink = (label: string, href: string) => {
    return (
      <Link href={href} style={{ fontSize: 16, marginLeft: 16 }}>
        {label}
      </Link>
    )
  }

  return (
    <Grid container direction={'column'} spacing={2}>
      <Grid item xs={12}>
        <Box display={'flex'} alignItems={'center'} color={'#AAAAAA'}>
          {investor ? <DoneIcon /> : <CloseIcon />}
          {renderAgreementAndDisclosureLink(
            isCorporateIssuerForm ? 'Issuer Agreement' : 'Investor Agreement',
            '#'
          )}
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Box display={'flex'} alignItems={'center'} color={'#AAAAAA'}>
          {custody ? <DoneIcon /> : <CloseIcon />}
          {renderAgreementAndDisclosureLink('Custody Agreement', '#')}
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Box display={'flex'} alignItems={'center'} color={'#AAAAAA'}>
          {disclosure ? <DoneIcon /> : <CloseIcon />}
          {renderAgreementAndDisclosureLink('Disclosures', '#')}
        </Box>
      </Grid>
    </Grid>
  )
}
