import React from 'react'
import { Grid, Typography } from '@mui/material'

export const SafeguardInfoContent = () => {
  return (
    <>
      <Grid container justifyContent='center' spacing={2}>
        <Grid item>
          <Typography color={'text.secondary'} fontWeight={500}>
            Pursuant to regulation 33 and 34 of the Financial Advisers
            Regulations, you acknowledge that we have no obligation to disclose
            all material information relating to designated investment products
            nor have a duty to determine suitability of the recommendations
            provided to you.
          </Typography>
        </Grid>
        <Grid item>
          <Typography color={'text.secondary'} fontWeight={500}>
            We do not hold any investment funds on your behalf, you will not be
            entitled to any compensation for any monetary loss of funds from
            misappropriation of funds in any Investment Products from us. (sec.
            186(1) SFA, reg.7(3) SF(LCB) R).
          </Typography>
        </Grid>
        <Grid item>
          <Typography color={'text.secondary'} fontWeight={500}>
            Where we provide you research reports and analysis from 3rd party
            research houses, we are not required to accept legal responsibility
            for the content of such a report or analysis (32C(1)(d) FAR).
          </Typography>
        </Grid>
        <Grid item>
          <Typography color={'text.secondary'} fontWeight={500}>
            We may market and sell Investment Products to you without prior due
            diligence to ascertain its suitability for targeted clients (reg.
            18B(9) FAR). We may even expressly or implicitly make a
            recommendation with respect to any investment product to you without
            ascertaining that the investment product meets your investment
            objectives, financial situation and particular needs. When making a
            recommendation to you without such consideration, we will however
            disclose this fact to you (reg. 34(1)(a), (2) FAR).
          </Typography>
        </Grid>
        <Grid item>
          <Typography color={'text.secondary'} fontWeight={500}>
            We are not required to disclose our interests from investment or
            underwriting of the respective Investment Product, when we offer or
            recommend such Investment Products to you (47A(3)(a)(i) SF(LCB)R).
          </Typography>
        </Grid>
        <Grid item>
          <Typography color={'text.secondary'} fontWeight={500}>
            A suitable representative of our Company may interact with you on
            his/her own without passing all the examinations required by the
            Monetary Authority of Singapore for representatives working with
            retail clients (reg. 3A(5)(c) – (e) and (7) SF(LCB)R; reg. 4A(6)
            FAR.
          </Typography>
        </Grid>
      </Grid>
    </>
  )
}
