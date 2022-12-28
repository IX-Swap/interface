import React from 'react'

import { useTheme } from 'styled-components'
import { useHistory } from 'react-router-dom'

import { Plus } from 'react-feather'

import { ErrorText, Row } from 'components/LaunchpadMisc/styled'
import { FilledButton, OutlineButton } from 'components/LaunchpadMisc/buttons'

import { IssuanceDialog } from '../utils/Dialog'
import { IssuanceTextField } from '../utils/TextField'
import { object, string } from 'yup'
import { Formik } from 'formik'

interface Props {
  background?: string
  color?: string
}

interface IssuanceNameFormValues {
  name: string
}

const initialValues: IssuanceNameFormValues = {
  name: ''
}

const schema = object().shape({
  name: string().required('Please enter name of your issuance')
})

export const IssuanceCreateButton: React.FC<Props> = (props) => {
  const theme = useTheme()
  const history = useHistory()

  const [showIssuanceDialog, setShowIssuanceDialog] = React.useState(false)
  const [issuer, setIssuer] = React.useState<string>()

  const toggleNewIssuanceDialog = React.useCallback(() => {
    setShowIssuanceDialog(state => !state)
  }, [])

  const openIssuanceForm = React.useCallback((values: IssuanceNameFormValues) => {
    setShowIssuanceDialog(false)
    history.push(`/issuance/create?issuer=${values.name}`)
  }, [history])

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
      
      <IssuanceDialog title="New Issuance" show={showIssuanceDialog} onClose={toggleNewIssuanceDialog} width='480px'>
        <Formik initialValues={initialValues} validationSchema={schema} onSubmit={openIssuanceForm}>
          {({ values, errors, submitForm, setFieldValue }) => (
            <>
              <IssuanceTextField 
                label="Name"
                placeholder="Name of Asset"
                value={values.name}
                onChange={v => setFieldValue('name', v)} 
              />

              {errors.name && <ErrorText>{errors.name}</ErrorText>}
              
              <Row gap="1rem" justifyContent='spaced-evenly' width='100%'>
                <OutlineButton grow={1} onClick={toggleNewIssuanceDialog}>Cancel</OutlineButton>
                <FilledButton grow={1} onClick={submitForm}>Submit</FilledButton>
              </Row>
            </>
          )}
        </Formik>
      </IssuanceDialog>
    </>
  )
}
