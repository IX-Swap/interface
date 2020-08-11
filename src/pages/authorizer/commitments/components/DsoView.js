import React from 'react'
import { Container, Box, Grid, Button, Typography } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import DsoInformation from 'components/Dso/DsoInformation'

const DsoView = ({ onClickBack, dso }: { onClickBack: Function, dso: Dso }) => (
  <Container>
    <Box mb={3}>
      <Grid container alignItems='center'>
        <Button type='button' onClick={() => onClickBack()}>
          <ArrowBackIosIcon />
        </Button>
        <Typography variant='h5'>Back</Typography>
      </Grid>
    </Box>

    <DsoInformation dso={dso} />
  </Container>
)

export default DsoView
