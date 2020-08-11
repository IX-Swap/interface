import React, { useState } from 'react'

import { useStore } from '../context'
import { useObserver } from 'mobx-react'
import DigitalSecurity from '../../../components/digital-security/index'
import { Redirect, useHistory } from 'react-router-dom'
import { Dso, DsoRequest } from '../../../../../types/dso'
import { Box, Container } from '@material-ui/core'
import PageTitle from '../../../components/page-title'
import { editDso } from '../../../../../services/dso'
import storageHelper from '../../../../../helpers/storageHelper'
import { snackbarService } from 'uno-material-ui'

const DsoView = ({ dso }: { dso: Dso }) => {
  const history = useHistory()

  const save = (formValues?: DsoRequest) => {
    if (!formValues) return
    ;(async () => {
      const res = await editDso(dso._id, formValues, storageHelper.getUserId())
      if (res.status) {
        setState({
          ...state,
          editMode: false,
          action: edit,
          button: 'Edit'
        })

        snackbarService.showSnackbar(
          `Successfully saved Digital Security (${res.data!.tokenSymbol})`
        )
        history.push('.')
        return
      }

      snackbarService.showSnackbar(
        `Unable to save ${formValues?.tokenSymbol}. (${res.message})`,
        'error'
      )
    })()
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
    dsoState.selectedDso ? (
      <MemoedDsoView dso={dsoState.selectedDso} />
    ) : (
      <Redirect to='.' />
    )
  )
}

export default InvestViewDso
