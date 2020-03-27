import React, { useEffect } from 'react'
import { Grid, Box, Card, Typography } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'

import {
  INVEST_STATUS,
  useInvestState,
  useInvestDispatch,
  getDso,
  saveDso
} from '../../../../context/InvestContext'

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

const defaultTheme = createMuiTheme()

Object.assign(defaultTheme, {
  overrides: {
    MUIRichTextEditor: {
      root: {
        marginTop: 5,
        width: '100%'
      },
      editor: {
        padding: 10
      }
    }
  }
})

export default function ViewDso (props) {
  const { dsoId, mode } = props.match.params

  console.log(mode)
  // const edit = mode === 'edit' ? true : false

  const { dso } = useDsoViewLogic(dsoId)

  return (
    <Card>
      <Grid container spacing={2}>
        <Grid item md={7} lg={5}>
          <Box p={3}>
            <img src={dso.logo} width={100} height={100} alt='dso-logo' />
          </Box>
          <Box p={2}>
            {dso.title}
            {/* <Typography variant='h2' component='h2'>
              {'Title of the DSO'}
            </Typography> */}
          </Box>
          <Box p={2}>
            <Typography variant='body1'>{dso.summary}</Typography>
          </Box>
        </Grid>
        <Grid item md={5}>
          <Box mt={5} p={2}>
            <Typography variant='h3' component='h2'>
              Highlights
            </Typography>
          </Box>

          <Box m={3}>{dso.highlights}</Box>
        </Grid>
      </Grid>
    </Card>
  )
}

const useDsoViewLogic = dsoId => {
  const { status: investStatus, dso, ...invest } = useInvestState()

  const isDsoReady = ![
    INVEST_STATUS.INIT,
    INVEST_STATUS.GETTING,
    INVEST_STATUS.SAVING
  ].includes(investStatus)
  const error = invest.error
  const investDispatch = useInvestDispatch()

  useEffect(() => {
    // fetch deals data for initial values
    if (!dso._id) {
      getDso(investDispatch, dsoId).catch(() => {})
    }
  }, [investStatus, investDispatch, dsoId, dso])

  const handleSave = payload => {
    saveDso(investDispatch, dsoId, payload)
  }

  return { isDsoReady, dso, handleSave, error }
}
