import React from 'react'

import { useTheme } from 'styled-components'
import { useHistory } from 'react-router-dom'

import { Plus } from 'react-feather'

import { Row } from 'components/LaunchpadMisc/styled'
import { FilledButton, OutlineButton } from 'components/LaunchpadMisc/buttons'

import { IssuanceDialog } from '../utils/Dialog'
import { IssuanceTextField } from '../utils/TextField'

interface Props {
  background?: string
  color?: string
}

export const IssuanceCreateButton: React.FC<Props> = (props) => {
  const theme = useTheme()
  const history = useHistory()

  const [showIssuanceDialog, setShowIssuanceDialog] = React.useState(false)
  const [issuer, setIssuer] = React.useState<string>()

  const toggleNewIssuanceDialog = React.useCallback(() => {
    setShowIssuanceDialog(state => !state)
  }, [])

  const openIssuanceForm = React.useCallback(() => {
    setShowIssuanceDialog(false)
    history.push(`/issuance/create?issuer=${issuer}`)
  }, [history, issuer])

  return (
    <>
      <OutlineButton 
        onClick={toggleNewIssuanceDialog}
        background={props.background}
        color={props.color}
        padding="0 1.5rem"
      >
        <Plus size="15" color={props.color ?? theme.launchpad.colors.primary} /> New Issuance
      </OutlineButton>
      
      <IssuanceDialog title="New Issuance" show={showIssuanceDialog} onClose={toggleNewIssuanceDialog}>
        <IssuanceTextField label="Name" placeholder="Name of Asset" onChange={setIssuer} />
        
        <Row gap="1rem" justifyContent='spaced-evenly' width='100%'>
          <OutlineButton grow={1} onClick={toggleNewIssuanceDialog}>Cancel</OutlineButton>
          <FilledButton grow={1} onClick={openIssuanceForm}>Submit</FilledButton>
        </Row>
      </IssuanceDialog>
    </>
  )
}
