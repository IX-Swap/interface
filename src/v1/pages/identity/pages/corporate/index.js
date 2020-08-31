//
import React from 'react'
import { Redirect } from 'react-router-dom'
import { Box, Button } from '@material-ui/core'
import CorporateIdentityForm from './CorporateIdentityForm'
import { useIdentityState, useIdentityDispatch } from '../../modules'
import { createIdentity, toggleEditMode } from '../../modules/actions'

const CorporateIdentity = () => {
  const {
    status,
    corporate,
    editMode,
    corporateDataroom: dataroom
  } = useIdentityState()
  const identityDispatch = useIdentityDispatch()

  if (status === 'INIT') {
    return <Redirect to='/identity' />
  }

  const handleOnCreate = data => {
    const id = corporate ? corporate._id : undefined
    createIdentity(identityDispatch, data, 'corporate', id)
  }

  return (
    <Box position='relative'>
      {corporate && !editMode && (
        <Box position='absolute' top='-3em' right='0'>
          <Button
            variant='contained'
            color='primary'
            onClick={() => toggleEditMode(identityDispatch, true)}
          >
            Edit
          </Button>
        </Box>
      )}
      <CorporateIdentityForm
        editMode={editMode}
        corporate={corporate}
        handleCreateIdentity={handleOnCreate}
        dataroom={dataroom}
        onCancelEdit={() => toggleEditMode(identityDispatch, false)}
      />
    </Box>
  )
}

export default CorporateIdentity
