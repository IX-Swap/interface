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
import { useCreateIssuance, useGetIssuancePlain } from 'state/launchpad/hooks'

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

  const issuances = useGetIssuancePlain()
  const createIssunace = useCreateIssuance()

  const [showIssuanceDialog, setShowIssuanceDialog] = React.useState(false)

  const toggleNewIssuanceDialog = React.useCallback(() => {
    setShowIssuanceDialog(state => !state)
  }, [])

  const openIssuanceForm = React.useCallback(async (values: IssuanceNameFormValues) => {
    if (!issuances.items) {
      return 
    }

    if (issuances.items?.some(x => x.name === values.name)) {
      throw new Error('Issuance with that name already exists')
    }

    const result = await createIssunace(values.name)

    setShowIssuanceDialog(false)
    history.push(`/issuance/create?id=${result.id}`)
  }, [history])

  const textFilter = React.useCallback((value: string) => value.split('').filter(x => /[a-zA-Z0-9 .,!?"'/\[\]+\-#$%&@:;]/.test(x)).join(''), [])

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
                inputFilter={textFilter}
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
