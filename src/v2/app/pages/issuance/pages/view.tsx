import React, { useState } from 'react'
import { useStore } from 'v2/app/pages/issuance/context'
import { useObserver } from 'mobx-react'
import DigitalSecurity from 'v2/app/components/digital-security'
import { Redirect, useHistory } from 'react-router-dom'
import { Dso, DsoRequest } from 'v2/types/dso'
import { Box, Container } from '@material-ui/core'
import PageTitle from 'v2/app/components/page-title'
import { editDso } from 'v2/services/dso'
import storageHelper from 'v2/helpers/storageHelper'
import { snackbarService } from 'uno-material-ui'

const DsoView = ({ dso }: { dso: Dso }) => {
  const history = useHistory()

  const save = async (formValues?: DsoRequest) => {
    if (formValues === undefined) {
      return
    }

    const res = await editDso(dso._id, formValues, storageHelper.getUserId())
    if (res.status) {
      setState({
        ...state,
        editMode: false,
        action: edit,
        button: 'Edit'
      })

      await snackbarService.showSnackbar(
        `Successfully saved Digital Security (${res.data?.tokenSymbol ?? ''})`
      )
      history.push('.')
      return
    }

    await snackbarService.showSnackbar(
      `Unable to save ${formValues?.tokenSymbol}. (${res.message ?? ''})`,
      'error'
    )
  }

  const edit = () => {
    setState({
      ...state,
      editMode: true,
      action: save,
      button: 'Save'
    })
  }

  const [state, setState] = useState({
    button: 'Edit',
    editMode: false,
    action: edit
  })

  return (
    <Container>
      <PageTitle title={dso.tokenName} subPage />
      <Box mb={4} />
      <DigitalSecurity
        dso={dso}
        editMode={state.editMode}
        buttonAction={state.action}
        buttonString={state.button}
      />
    </Container>
  )
}

const MemoedDsoView = React.memo(DsoView)

const InvestViewDso = () => {
  const dsoState = useStore()

  return useObserver(() =>
    dsoState.selectedDso !== undefined ? (
      <MemoedDsoView dso={dsoState.selectedDso} />
    ) : (
      <Redirect to='.' />
    )
  )
}

export default InvestViewDso
