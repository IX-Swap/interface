import { Grid, Typography } from '@material-ui/core'
import React from 'react'

export const TaxDeclarationInfoContent = () => {
  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <Typography>
          InvestaX is collecting information regarding tax residency status of
          each Account Holder in order to comply with Income Tax Act and
          Singapore Income Tax (International Tax Compliance Agreements) (Common
          Reporting Standard) Regulations 2016 and any other related regulations
          (collectively “Tax Regulations”).
        </Typography>
      </Grid>
      <Grid item>
        <Typography>
          The Singapore Tax Regulations implement the standard for automatic
          exchange of financial account information in tax matters developed by
          the Organisation for Economic Co-Operation and Development (“OECD”),
          commonly known as the Common Reporting Standard.
        </Typography>
      </Grid>
      <Grid item>
        <Typography>
          FATCA aims to collect information on United States (US) Tax residents
          using foreign accounts.
        </Typography>
      </Grid>
      <Grid item>
        <Typography>
          It requires Financial Institutions outside the US to report customers
          who are US Tax residents to the US Tax authorities.
        </Typography>
      </Grid>
      <Grid item>
        <Typography>
          If you are a U.S. citizen or tax resident under U.S. law, you should
          indicate that you are a U.S. tax resident on this form and you may
          also need to fill in an IRS W-9 form.
        </Typography>
      </Grid>
      <Grid item>
        <Typography>
          For more information on tax residence, please consult your tax adviser
          or the information at the OECD automatic exchange of information
          portal.
        </Typography>
      </Grid>
      <Grid item>
        <Typography>
          If your tax residence (or the account holder, if you are completing
          the form on their behalf) is located outside Singapore, InvestaX may
          be legally obliged to pass on the information in this form and other
          financial information with respect to your financial accounts to
          Inland Revenue Authorities of another jurisdiction or jurisdictions
          pursuant to bilateral or multilateral agreements to exchange of
          information portal.
        </Typography>
      </Grid>
      <Grid item>
        <Typography>
          If your tax residence(or the account holder, if you should indicate
          that you are a U.S. tax resident on this form and you may also need to
          fill in an IRS W-9 form. For more information on tax residence, please
          consult your tax adviser or the information at the OECD automatic
          exchange of information portal.
        </Typography>
      </Grid>
      <Grid item>
        <Typography>
          If you are U.S. citizen or tax resident under U.S. law, you should
          indicate that you are a U.S. tax resident on this form and you may
          also need to fill in an IRS W-9 form. For more information on tax
          residence, please consult your tax adviser or the information at the
          OECD automatic exchange of information portal.
        </Typography>
      </Grid>
      <Grid item>
        <Typography>
          If your tax residence (or the account holder, if you are completing
          the form on their behalf) is located outside Singapore, InvestaX may
          be legally obliged to pass on the information in this form and other
          financial information with respect to your financial accounts to
          Inland Revenue Authority of Singapore (“IRAS”) and they may exchange
          this information with tax authorities of another jurisdiction or
          jurisdictions pursuant to bilateral or multilateral agreements to
          exchange financial account information.
        </Typography>
      </Grid>
    </Grid>
  )
}
