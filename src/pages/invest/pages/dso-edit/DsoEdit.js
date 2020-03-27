import React, { useState, useCallback, useEffect } from 'react'
import {
  Grid,
  Card,
  Box,
  CircularProgress,
  TextField,
  Button,
  IconButton,
  Snackbar,
  Input
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import {
  useInvestState,
  useInvestDispatch,
  INVEST_STATUS,
  saveDso,
  getDso
} from 'context/InvestContext'

export default function DsoEdit (props) {
  const { dsoId } = props.match.params
  const { state, actions } = useDsoEditLogic(dsoId)

  return (
    <Grid component='article' container justify='center' spacing={3}>
      <Grid item xs={12} sm={10} md={8}>
        {!state.isDsoReady ? (
          // loading
          <Card>
            <Box p={3} display='flex' justifyContent='center'>
              <CircularProgress size={48} />
            </Box>
          </Card>
        ) : (
          <Card>
            <form onSubmit={actions.handleSave}>
              <Box p={3}>
                <Box mt={3}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='title'>Title</InputLabel>
                    <Input
                      id='title'
                      value={state.title}
                      aria-describedby={'title'}
                      onChange={e => actions.setTitle(e.target.value)}
                    />
                  </FormControl>
                </Box>
                <Box mt={3}>
                  <TextField
                    fullWidth
                    id='summary'
                    label='Summary of DSO'
                    multiline
                    variant='outlined'
                    value={state.summary}
                    onChange={e => actions.setSummary(e.target.value)}
                  />
                </Box>
                <Box mt={3}>
                  <TextField
                    fullWidth
                    multiline
                    id='highlights'
                    label='Highlights of DSO'
                    variant='outlined'
                    value={state.highlights}
                    onChange={e => actions.setHighlights(e.target.value)}
                  />
                </Box>
                <Box mt={3}>
                  <TextField
                    fullWidth
                    multiline
                    id='businessModel'
                    label='Business Model of DSO'
                    variant='outlined'
                    value={state.businessModel}
                    onChange={e => actions.setBusinessModel(e.target.value)}
                  />
                </Box>
                <Box mt={3}>
                  <TextField
                    fullWidth
                    multiline
                    id='milestones'
                    label='Funding Milestones'
                    variant='outlined'
                    value={state.milestones}
                    onChange={e => actions.setMilestones(e.target.value)}
                  />
                </Box>
                <Box mt={3}>
                  <TextField
                    fullWidth
                    multiline
                    id='roadmap'
                    label='Business Roadmap'
                    variant='outlined'
                    value={state.roadmap}
                    onChange={e => actions.setRoadmap(e.target.value)}
                  />
                </Box>
                <Box mt={3}>
                  <TextField
                    fullWidth
                    multiline
                    id='existing'
                    label='Existing Clients'
                    variant='outlined'
                    value={state.existingClients}
                    onChange={e => actions.setExistingClients(e.target.value)}
                  />
                </Box>
                <Grid container mt={3}>
                  <Box width='30%' m={3}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor='status'>Status</InputLabel>
                      <Select
                        labelId='status'
                        id='status'
                        aria-describedby='dso-status'
                        value={state.status}
                        onChange={e => actions.setStatus(e.target.value)}
                      >
                        <MenuItem value={'live'}>Live</MenuItem>
                        <MenuItem value={'upcoming'}>Upcoming</MenuItem>
                        <MenuItem value={'complete'}>Complete</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box width='30%' m={3}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor='fundingCurrency'>
                        Funding Currency
                      </InputLabel>
                      <Select
                        labelId='fundingCurrency'
                        id='fundingCurrency'
                        aria-describedby='funding-currency'
                        value={state.fundingCurrency}
                        onChange={e =>
                          actions.setFundingCurrency(e.target.value)
                        }
                      >
                        <MenuItem value={'SGD'}>Singapore Dollar</MenuItem>
                        <MenuItem value={'USD'}>United States Dollar</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Box mt={3}>
                  <TextField
                    fullWidth
                    multiline
                    id='miniumum'
                    label='minimum Investment'
                    variant='outlined'
                    value={state.miniumumInvestment}
                    onChange={e => actions.miniumumInvestment(e.target.value)}
                  />
                </Box>
                <Box mt={3}>
                  <TextField
                    fullWidth
                    multiline
                    id='investment-terms'
                    label='Investment Terms'
                    variant='outlined'
                    value={state.investmentTerms}
                    onChange={e => actions.setInvestmentTerms(e.target.value)}
                  />
                </Box>
                <Box mt={3}>
                  <TextField
                    fullWidth
                    multiline
                    id='funding-goal'
                    label='Funding Goal'
                    variant='outlined'
                    value={state.fundingGoal}
                    onChange={e => actions.setFundingGoal(e.target.value)}
                  />
                </Box>
                <Box mt={3}>
                  <TextField
                    fullWidth
                    multiline
                    id='deal-structure'
                    label='Deal Structure'
                    variant='outlined'
                    value={state.dealStructure}
                    onChange={e => actions.setDealStructure(e.target.value)}
                  />
                </Box>
                <Box mt={3}>
                  <TextField
                    fullWidth
                    multiline
                    id='capital-structure'
                    label='Capital Structure'
                    variant='outlined'
                    value={state.capitalStructure}
                    onChange={e => actions.setCapitalStructure(e.target.value)}
                  />
                </Box>
                <Box mt={3}>
                  <TextField
                    fullWidth
                    multiline
                    id='holding-structure'
                    label='Holding Structure'
                    variant='outlined'
                    value={state.holdingStructure}
                    onChange={e => actions.setHoldingStructure(e.target.value)}
                  />
                </Box>
                <Box mt={3}>
                  <TextField
                    fullWidth
                    multiline
                    id='smart-contract-address'
                    label='Smart Contract Address'
                    variant='outlined'
                    value={state.smartContractAddress}
                    onChange={e =>
                      actions.setSmartContractAddress(e.target.value)
                    }
                  />
                </Box>
                <Box mt={3}>
                  <TextField
                    fullWidth
                    multiline
                    id='team'
                    label='DSO Team'
                    variant='outlined'
                    value={state.team}
                    onChange={e => actions.setTeam(e.target.value)}
                  />
                </Box>
                <Box m={3}>
                  <Button type='submit'>Save</Button>
                </Box>
              </Box>
            </form>
          </Card>
        )}
      </Grid>

      <Snackbar
        message={state.error.save}
        open={state.snackBarOpen}
        action={
          <IconButton
            size='small'
            aria-label='close'
            color='inherit'
            onClick={actions.handleSnackbarErrorClose}
          >
            <CloseIcon fontSize='small' />
          </IconButton>
        }
      />
    </Grid>
  )
}

const useDsoEditLogic = dsoId => {
  const { status: investStatus, dso, ...invest } = useInvestState()
  const investDispatch = useInvestDispatch()

  const isDsoReady = ![
    INVEST_STATUS.INIT,
    INVEST_STATUS.GETTING,
    INVEST_STATUS.SAVING
  ].includes(investStatus)

  useEffect(() => {
    // fetch deals data for initial values
    if (investStatus === INVEST_STATUS.INIT) {
      getDso(investDispatch, dsoId).catch(() => {})
    }

    if (invest.error.save) {
      setSnackBarOpen(true)
    }
  }, [investStatus, investDispatch, dsoId, invest])

  const handleSave = async () => {
    await saveDso(investDispatch, dsoId, state)
  }

  const [title = dso.title, setTitle] = useState()
  const [status = dso.status, setStatus] = useState()
  const [summary = dso.summary, setSummary] = useState()
  const [highlights = dso.highlights, setHighlights] = useState()
  const [businessModel = dso.businessModel, setBusinessModel] = useState()
  const [milestones = dso.milestones, setMilestones] = useState()
  const [roadmap = dso.roadmap, setRoadmap] = useState()
  const [existingClients = dso.existingClients, setExistingClients] = useState()
  const [fundingCurrency = dso.fundingCurrency, setFundingCurrency] = useState()
  const [
    miniumumInvestment = dso.miniumumInvestment,
    setMinimumInvestment
  ] = useState()
  const [investmentTerms = dso.investmentTerms, setInvestmentTerms] = useState()
  const [fundingGoal = dso.fundingGoal, setFundingGoal] = useState()
  const [dealStructure = dso.dealStructure, getDealStructure] = useState()
  const [
    captialStructure = dso.captialStructure,
    setCapitalStructure
  ] = useState()
  const [
    holdingStructure = dso.holdingStructure,
    setHoldingStructure
  ] = useState()
  const [
    smartContractAddress = dso.smartContractAddress,
    setSmartContractAddress
  ] = useState()
  const [team = dso.team, setTeam] = useState()
  const [logo = dso.logo, setLogo] = useState()
  const [snackBarOpen, setSnackBarOpen] = useState()

  const handleSnackbarErrorClose = useCallback(() => setSnackBarOpen(false), [
    setSnackBarOpen
  ])

  const state = {
    isDsoReady,
    snackBarOpen,
    error: invest.error,
    status,
    title,
    summary,
    highlights,
    businessModel,
    milestones,
    roadmap,
    existingClients,
    fundingCurrency,
    miniumumInvestment,
    investmentTerms,
    fundingGoal,
    dealStructure,
    captialStructure,
    holdingStructure,
    smartContractAddress,
    team,
    logo
  }

  const actions = {
    handleSave,
    handleSnackbarErrorClose,
    setTitle,
    setStatus,
    setSummary,
    setHighlights,
    setBusinessModel,
    setMilestones,
    setRoadmap,
    setExistingClients,
    setFundingCurrency,
    setMinimumInvestment,
    setInvestmentTerms,
    setFundingGoal,
    getDealStructure,
    setCapitalStructure,
    setHoldingStructure,
    setSmartContractAddress,
    setTeam,
    setLogo
  }

  return { state, actions }
}
