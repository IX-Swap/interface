import React from 'react'
import { Container, Paper, Box } from '@material-ui/core'
import { DSOList } from 'v2/app/components/DSO/DSOList'

const InvestList = () => {
  return (
    <Container>
      <Paper square>
        <Box p={4}>
          <DSOList filter={{}} user={null} />
        </Box>
      </Paper>
    </Container>
  )
}

export default InvestList
