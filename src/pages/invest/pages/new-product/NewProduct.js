import React from 'react'
import { Grid, Box, Card, Typography, Button } from '@material-ui/core'

// "title": "Health Sciences LLC",
// "status": "upcoming",
//   "logo": "https://cdn5.vectorstock.com/i/1000x1000/25/89/building-construction-company-logo-vector-19242589.jpg",
//   "summary": "<div><p>This DSO is a common equity offering for SeaView LLC, a private investment fund working with green companies looking to change the world. This offering is DSO contract available in the Singpaore jursidiction for Accredited investors.</p><p>This project is marture and looking for sophisticated investors to accelerate development and improve time-to-market performance.</div>",
//   "highlights": "<b>Shares Available:</b><p>10,000,000</p><b>Minimum Investment:</b><p>$50,000</p><b>Capital Structure:</b><p>Equity</p><b>Unit Price:</b><p>$0.50 USD</p>",
// "businessModel": "<p>a, b, c</p>",
// "milestones": "<p>2019: Seed Round $50,000</p>",
// "roadmap": "<p>stage1: build</p>",
// "existingClients": "<p>InvestaX</p>",
// "fundingCurrency": "USD",
// "minimumInvestment": "<p>$50,000</p>",
// "investmentTerms": "<p>terms</p>",
// "fundingGoal": "<p>$10,000,000</p>",
// "dealStructure": "<p>the deal structure</p>",
// "capitalStructure": "<p>common equity</p>",
// "holdingStructure": "<p>SVV Singapore</p>",
// "smartContractAddress": "contract address",
// "team": "<p>Tom Smith<p><Linda Jones</p>"

export default function ViewDso () {
  return (
    <Card>
      <Box p={3}>
        <Grid container justify='center'>
          <Grid item md={8}>
            <Box p={4}>
              <Typography variant='h1'>
                <b>DSO</b>
              </Typography>
              <Typography variant='subtitle1'>
                <i>Digital Security Offering</i>
              </Typography>
              <p>
                A digital security offering is a private market security
                offering available to accredited investors. Smart Contracts are
                used to digitize a traditional equity or debt offering.
              </p>
            </Box>
          </Grid>
          <Grid item md={3}>
            <Box mt={5}>
              <Button variant='contained' color='primary'>
                NEW DSO
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Grid container justify='center'>
          <Grid item md={8}>
            <Box p={4}>
              <Typography variant='h1'>
                <b>DESOP</b>
              </Typography>
              <Typography variant='subtitle1'>
                <i>Digital Employee Stock Option Program</i>
              </Typography>
              <p>
                InvestaX is pioneering the use of our latest technology to
                design a better, more transparent, higher velocity ESOP, which
                we believe drives greater productivity and balance. We call it
                the Digital Employee Stock Option Plan (DESOP), a world 1st and
                breakthrough improvement and innovation from the current
                traditional Employee Stock Option Plan (ESOP).
              </p>
            </Box>
          </Grid>
          <Grid item md={3}>
            <Box mt={5}>
              <Button variant='contained' color='primary'>
                NEW DESOP
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Card>
  )
}
