import React from 'react'
import { Grid, Container } from '@material-ui/core'

// components
import PageTitle from '../../components/PageTitle/PageTitle'
import Widget from '../../components/Widget/Widget'
import NewDsoForm from './components/NewDsoForm'

export default function CreateDso (props) {
  return (
    <>
      <PageTitle title='Create New DSO'/>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget upperTitle noBodyPadding disableWidgetMenu>
            <Container spacing={4}>
              <NewDsoForm />
            </Container>
          </Widget>
        </Grid>
      </Grid>
    </>
  )
}
