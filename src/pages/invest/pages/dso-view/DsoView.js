import React, { useEffect } from 'react'
import {
  Grid,
  Box,
  Card,
  Button,
  Typography,
  CircularProgress
} from '@material-ui/core'
import sanitize from 'sanitize-html'

import {
  INVEST_STATUS,
  useInvestState,
  useInvestDispatch,
  getDso,
  saveDso
} from 'context/InvestContext'

export default function DsoView (props) {
  const { dsoId } = props.match.params

  const { dso, isDsoReady } = useDsoViewLogic(dsoId)

  return (
    <Grid container justify='center' alignContent='center'>
      {!isDsoReady ? (
        <Box p={3} display='flex' justifyContent='center'>
          <CircularProgress size={48} />
        </Box>
      ) : (
        <Grid item lg={8}>
          <Card>
            <Box p={1}>
              <Grid container>
                <Grid item lg={12}>
                  <Button
                    onClick={() =>
                      props.history.push(`/app/invest/${dsoId}/edit`)
                    }
                  >
                    Edit DSO
                  </Button>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item md={3} lg={7}>
                  <Box>
                    <Box p={3}>
                      <img
                        src={dso.logo}
                        width={100}
                        height={100}
                        alt='dso-logo'
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item md={4} lg={5}>
                  {renderButtons()}
                </Grid>
              </Grid>
              <Grid container>
                <Grid item md={12} lg={12}>
                  <Box p={2}>
                    <Typography variant='h1'>{dso.title}</Typography>
                  </Box>
                  <Box p={2}>
                    <Typography variant='body1'>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: sanitize(dso.summary)
                        }}
                      />
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Grid container>
                {renderContent('Business Model', dso.businessModel)}
                {renderContent('Highlights', dso.highlights)}
                {renderContent('Milestones', dso.milestones)}
                {renderContent('Roadmap', dso.roadmap)}
                {renderContent('Team', dso.team)}
                {renderContent('Existing Clients', dso.existingClients)}
                {renderContent('Funding Currency', dso.fundingCurrency)}
                {renderContent('Minimum Investment', dso.minimumInvestment)}
                {renderContent('Funding Goal', dso.investmentTerms)}
                {renderContent('Investment Terms', dso.investmentTerms)}
                {renderContent('Deal Structure', dso.dealStructure)}
                {renderContent('Capital Structure', dso.capitalStructure)}
                {renderContent('Holding Structure', dso.holdingStructure)}
                {renderDocuments('Documents', dso.documents)}
              </Grid>
            </Box>
          </Card>
        </Grid>
      )}
    </Grid>
  )
}

const renderContent = (header, content) => (
  <Grid item md={12} lg={12}>
    <Box p={2}>
      <Typography variant='h3' component='h3'>
        {header}
      </Typography>
    </Box>
    <Box p={2}>
      <span
        dangerouslySetInnerHTML={{
          __html: sanitize(content)
        }}
      />
    </Box>
  </Grid>
)

const renderButtons = () => (
  <Grid container>
    <Grid item>
      <Button color='primary'>Ask a Question</Button>
    </Grid>
    <Grid item>
      <Button color='secondary'>Invest</Button>
    </Grid>
  </Grid>
)
const renderDocuments = (header, documents) => (
  <Grid item md={12} lg={12}>
    <Box p={2}>
      <Typography variant='h3' component='h3'>
        {header}
      </Typography>
    </Box>
    <Box p={2}>
      <span
        dangerouslySetInnerHTML={{
          __html: sanitize(documents)
        }}
      />
    </Box>
  </Grid>
)
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
