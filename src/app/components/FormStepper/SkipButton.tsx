import { Button } from '@material-ui/core'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { history } from 'config/history'
import React from 'react'
import { MutationResultPair } from 'react-query'
import { DetailsOfIssuanceFormValues } from 'types/detailsOfIssuance'

export interface SkipButtonProps {
  mutation: MutationResultPair<any, any, any, any>
}

export const SkipButton = ({ mutation }: SkipButtonProps) => {
  const [save, { isLoading }] = mutation

  const skippedPayload: Partial<DetailsOfIssuanceFormValues> = {
    fullName: ' ',
    companyName: ' ',
    companyRegistrationNumber: ' ',
    contactNumber: ' ',
    email: ' ',
    industry: ' ',
    fundRaisingAmount: 0,
    detail: ' ',
    companyRelated: undefined,
    issuanceRelated: undefined,
    financial: undefined,
    skipped: true
  }

  const handleClick = async () => {
    await save(skippedPayload).then(() =>
      history.push(IdentityRoute.createIssuer)
    )
  }

  return (
    <Button
      variant='outlined'
      color='primary'
      disableElevation
      onClick={handleClick}
      disabled={isLoading}
    >
      SKIP THIS
    </Button>
  )
}
