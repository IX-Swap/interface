import React from 'react'
import { Grid, Container } from '@material-ui/core'
import { withRouter } from 'react-router-dom'

import PageTitle from '../../components/PageTitle/PageTitle'
import Widget from '../../components/Widget/Widget'
import TokenDeployForm from './components/TokenDeployForm'

import { TokenDeployProvider } from '../../context/TokenDeployContext'

function DeployToken () {

  return (
    <TokenDeployProvider>
      <PageTitle title='Deploy a Digital Security'/>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Widget upperTitle disableWidgetMenu>
            <Container spacing={4} style={{ paddingTop: '30px'}}>
              <TokenDeployForm />
            </Container>
          </Widget>
        </Grid>
      </Grid>
    </TokenDeployProvider>
  )
}

export default withRouter(DeployToken)

