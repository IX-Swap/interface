import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { DSOBaseFields } from 'app/components/DSO/components/DSOBaseFields'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { isDSOLive } from 'app/components/DSO/utils'
import { Box, Paper } from '@mui/material'
import { VSpacer } from 'components/VSpacer'
import { DSOPricing } from 'app/components/DSO/components/DSOPricing'
import { DSOTerms } from 'app/components/DSO/components/DSOTerms'

export const DSOInformationFields = () => {
  const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()

  const { data } = useDSOById(dsoId, issuerId)
  const isLive = isDSOLive(data)
  const isNew = data === undefined

  return (
    <Fragment>
      <Paper>
        <Box px={4} py={2}>
          <DSOBaseFields isNew={isNew} isLive={isLive} />
        </Box>
      </Paper>
      <VSpacer size='small' />
      <Paper>
        <Box px={4} py={2}>
          <DSOPricing />
        </Box>
      </Paper>
      <VSpacer size='small' />
      <Paper>
        <Box px={4} py={2}>
          <DSOTerms />
        </Box>
      </Paper>
    </Fragment>
  )
}
