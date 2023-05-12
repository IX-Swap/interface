import React from 'react'
import { useMediaQuery } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { RootContainer } from 'ui/RootContainer'
import { useTheme } from '@mui/material/styles'
import { IndividualAccreditationForm } from '../../components/IndividualAccreditationForm/IndividualAccreditationForm'

export interface CreateIndividualAccreditationProps {
  title?: string
}

export const CreateIndividualAccreditation = ({
  title
}: CreateIndividualAccreditationProps) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <>
      {matches ? null : <PageHeader title={title} />}
      <RootContainer>
        <IndividualAccreditationForm formTitle='Individual Investor Accreditation' />
      </RootContainer>
    </>
  )
}
