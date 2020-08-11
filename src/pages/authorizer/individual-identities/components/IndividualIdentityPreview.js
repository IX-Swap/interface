//
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { forEach, findIndex } from 'lodash'
import { Container, Button, Typography, Box, Grid } from '@material-ui/core'

import { snackbarService } from 'uno-material-ui'
import declarationTemplate from 'pages/identity/data/declarations'
import IndividualIdentityForm from 'pages/identity/pages/individual/IndividualIdentityForm'
import { IdentityProvider } from 'pages/identity/modules'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import AuthorizeConfirmDialog from './AuthorizeConfirmDialog'
import actions from '../modules/actions'

const formatDeclarations = (payloadItems, type) => {
  const declarations = []
  forEach(payloadItems, d => {
    // get item key
    const key = Object.keys(d)[0]
    // get index of template with same key
    const index = findIndex(
      declarationTemplate[type],
      item => item.key === key
    )
    // add merged object
    declarations.push({
      ...declarationTemplate[type][index],
      value: d[key]
    })
  })

  return declarations
}

const IndividualIdentityPreview = ({ onClickBack, identity }) => {
  const [saving, setSaving] = useState(false)
  const [newStatus, setNewStatus] = useState('')
  const [open, setOpen] = useState(false)
  const [declarations, setDeclarations] = useState([])

  useEffect(() => {
    const formatted = formatDeclarations(identity.declarations, 'individual')
    setDeclarations(formatted)
    // run once on mount
  }, [])

  const handleConfirm = async () => {
    setSaving(true)
    const confirm = await actions.toggleIdentityStatus(identity, newStatus)
    let message = 'Failed to update indentity status!'
    let type = 'error'

    if (confirm) {
      message = 'Successfully updated identity status!'
      type = 'success'
      setOpen(false)
    }

    snackbarService.showSnackbar(message, type)
    setSaving(false)
  }

  return (
    <Container>
      {identity && (
        <Container>
          <Box mb={3}>
            <Grid container>
              <Button
                type='button'
                disabled={saving}
                onClick={() => onClickBack()}
              >
                <ArrowBackIosIcon />
              </Button>
              <Typography variant='h3'>Identity</Typography>
            </Grid>
          </Box>
          <IdentityProvider>
            <IndividualIdentityForm
              identity={{ ...identity, declarations }}
              editMode={false}
              useOwnEmail={false}
              dataroom={identity.documents}
            />
          </IdentityProvider>

          {identity.status === 'Unauthorized' && (
            <Box mt={2}>
              <Grid container justify='flex-end'>
                <Button
                  onClick={() => {
                    setOpen(true)
                    setNewStatus('approve')
                  }}
                  disabled={saving}
                  variant='contained'
                  color='primary'
                >
                  Approve
                </Button>

                <Button
                  onClick={() => {
                    setOpen(true)
                    setNewStatus('reject')
                  }}
                  disabled={saving}
                  variant='contained'
                  color='error'
                  style={{ marginLeft: '0.5em' }}
                >
                  Reject
                </Button>
              </Grid>
            </Box>
          )}
        </Container>
      )}

      <AuthorizeConfirmDialog
        open={open}
        handleClose={() => {
          setOpen(false)
        }}
        newStatus={newStatus}
        handleConfirm={handleConfirm}
      />
    </Container>
  )
}

export default IndividualIdentityPreview
