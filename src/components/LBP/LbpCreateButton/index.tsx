import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { useTheme } from 'styled-components'
import { Plus } from 'react-feather'
import { ErrorText, FlexVerticalCenter, Row } from 'components/LaunchpadMisc/styled'
import { FilledButton, OutlineButton } from 'components/LaunchpadMisc/buttons'
import { text1 } from 'components/LaunchpadMisc/typography'
import { Formik } from 'formik'
import { Label } from 'recharts'
import { textFilter } from 'utils/input'
import { useCreateLbp, useGetLbpByName } from 'state/lbp/hooks'
import { IssuanceTextField } from 'components/LaunchpadIssuance/utils/TextField'
import { LbpDialog } from '../utils/Dialog'
import { useHistory } from 'react-router-dom'
import { object, string } from 'yup'

interface Props {
  background?: string
  color?: string
  showPin?: boolean
}

interface LbpNameFormValues {
  name: string
}

const initialValues: LbpNameFormValues = {
  name: '',
}

const schema = object().shape({
  name: string().required('Please enter name of your issuance'),
})

export const LbpCreateButton: React.FC<Props> = (props) => {
  const theme = useTheme()
  const [showLbpDialog, setShowLbpDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const createLbp = useCreateLbp()
  const history = useHistory()
  const getLbpByName = useGetLbpByName()

  const toggleNewLbpDialog = useCallback(() => {
    setShowLbpDialog((state) => !state)
  }, [])

  const openLbpForm = useCallback(
    async (values: LbpNameFormValues) => {
      const lbp = await getLbpByName(values.name)

      if (lbp) {
        throw new Error('Lbp with that name already exists')
      }

      setLoading(true)
      const result = await createLbp(values.name)
      setLoading(false)

      setShowLbpDialog(false)
      history.push(`/lbp/create?id=${result.id}`)
    },
    [history]
  )

  return (
    <>
      <FlexVerticalCenter style={{ marginRight: '17px' }}>
        <OutlineButton
          onClick={toggleNewLbpDialog}
          background={props.background}
          color={props.color}
          padding="0 1.5rem"
        >
          <Plus size="15" color={props.color ?? theme.launchpad.colors.primary} />
          <NewLbpLabel>New Lbp</NewLbpLabel>
        </OutlineButton>
      </FlexVerticalCenter>

      <LbpDialog title="New Lbp" show={showLbpDialog} onClose={toggleNewLbpDialog} width="480px">
        <Formik initialValues={initialValues} validationSchema={schema} onSubmit={openLbpForm}>
          {({ values, errors, submitForm, setFieldValue }) => (
            <>
              <Label style={{ margin: '6px 0px 0px 0px' }}>Name</Label>
              <IssuanceTextField
                // label="Name"
                placeholder="Name of Asset"
                value={values.name}
                onChange={(v) => setFieldValue('name', v)}
                inputFilter={textFilter}
                maxLength={1000}
              />

              {errors.name && <ErrorText>{errors.name}</ErrorText>}

              <Row gap="1rem" justifyContent="spaced-evenly" width="100%">
                <OutlineButton
                  style={{ border: '1px solid #6666FF33' }}
                  color="#B8B8CC"
                  grow={1}
                  onClick={toggleNewLbpDialog}
                >
                  Cancel
                </OutlineButton>
                <FilledButton grow={1} onClick={submitForm} disabled={loading || !values.name}>
                  Submit
                </FilledButton>
              </Row>
            </>
          )}
        </Formik>
      </LbpDialog>
    </>
  )
}

const NewLbpLabel = styled.span`
  ${text1}
`
