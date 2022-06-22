import React from 'react'
import { Grid, Typography } from '@mui/material'

export const SafeguardInfoContent = () => {
  return (
    <>
      <Grid container justifyContent='center' spacing={2}>
        <Grid item>
          <Typography color={'text.secondary'} fontWeight={500}>
            Accredited investors are considered to be sophisticated investors
            and hence eligible to enjoy more flexible and swift investments not
            available to the general public. Accredited investors are expected
            to understand more sophisticated investment products and the risks
            associated with them, and have the ability to conduct their own due
            diligence, therefore, allowing for reduced investor disclosures and
            safeguards, including the following:
          </Typography>
        </Grid>
        <Grid item>
          <Typography color={'text.secondary'} fontWeight={500}>
            - We may provide you preliminary documents, and oral or written
            information in their regard or regarding the prospectus, on
            securities, such as shares and debentures, units in business trusts
            and collective investment schemes (commonly referred to as mutual
            funds or investment funds) (“Investment Products”) before the
            prospectus or profile statement is registered with the Monetary
            Authority of Singapore (sec. 25(3) and (4)(a), 300(2A) and (2B)(a)
            SFA). You may thus receive information that may not meet regulatory
            requirements for public distribution.
          </Typography>
        </Grid>
        <Grid item>
          <Typography color={'text.secondary'} fontWeight={500}>
            - We may offer you Investment Products without a prospectus, i.e.
            without the full disclosures and warnings required for public
            offerings, or with lesser periodic reporting as determined by the
            issuers of the Investment Products in their sole discretion (sec.
            275(1), 305, 305A(1)(b), (2)(i)(A) and (3)(i)(A) SFA). Conversely,
            you may purchase Investment Products offered under these limited
            disclosure requirements without additional requirements (sec.
            276(1)(b), (2)(b), (3)(i)(A) and (3)(i)(A)SFA).
          </Typography>
        </Grid>
        <Grid item>
          <Typography color={'text.secondary'} fontWeight={500}>
            - We do not hold any investment funds on your behalf, you will not
            be entitled to any compensation for any monetary loss of funds from
            misappropriation of funds in any Investment Products from us. (sec.
            186(1) SFA, reg. 7(3) SF(LCB) R).
          </Typography>
        </Grid>
        <Grid item>
          <Typography color={'text.secondary'} fontWeight={500}>
            - We may market and sell Investment Products to you without prior
            due diligence to ascertain its suitability for targeted clients
            (reg. 18B(9) FAR). We may even expressly or implicity make a
            recommendation with respect to any investment product to you without
            ascertaining that the investment product meets your investment
            objectives, financial situation and particular needs. When making a
            recommendation to you without such consideration, we will however
            disclose this fact to you (re. 34(1)(a), (2) FAR).
          </Typography>
        </Grid>
        <Grid item>
          <Typography color={'text.secondary'} fontWeight={500}>
            - We provide you research reports and analysis from 3rd party
            research houses, we are not required to accept legal responsibility
            for the content of such report or analysis (32C(1)(d) FAR).
          </Typography>
        </Grid>
        <Grid item>
          <Typography color={'text.secondary'} fontWeight={500}>
            - We are not required to disclose our interests from investment or
            underwriting of the respective Investment Product, when we offer or
            recommend such Investment Products to you (47A(3)(a)(i)SF(LCB)R).
          </Typography>
        </Grid>
        <Grid item>
          <Typography color={'text.secondary'} fontWeight={500}>
            - A suitable representative of our Company may interact with you on
            his/her own without passing all the examinations required by the
            Monetary Authority of Singapore for representative retail clients
            (reg. 3A(5)(c)-(e) and (7) SF(LCB)R; reg. 4A(6) FAR.
          </Typography>
        </Grid>
      </Grid>
    </>
  )
}
