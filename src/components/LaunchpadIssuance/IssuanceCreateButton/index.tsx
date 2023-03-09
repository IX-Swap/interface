import React, { useState, useCallback, useMemo, useEffect } from 'react'
import styled from 'styled-components'

import { useTheme } from 'styled-components'
import { useHistory } from 'react-router-dom'

import { Plus } from 'react-feather'

import { ErrorText, FlexVerticalCenter, Row } from 'components/LaunchpadMisc/styled'
import { FilledButton, OutlineButton } from 'components/LaunchpadMisc/buttons'

import { IssuanceDialog } from '../utils/Dialog'
import { IssuanceTextField } from '../utils/TextField'
import { object, string } from 'yup'
import { Formik } from 'formik'
import { useCreateIssuance, useGetIssuancePlain, useGetPinnedOffer, usePinOffer } from 'state/launchpad/hooks'
import { textFilter } from 'utils/input'
import { useRole } from 'state/user/hooks'
import { ReactComponent as PinIcon } from 'assets/launchpad/svg/pin.svg'
import { DropdownField } from '../IssuanceForm/shared/fields/DropdownField'
import { ConfirmPopup } from '../utils/ConfirmPopup'
import { Loader } from 'components/LaunchpadOffer/util/Loader'
import { Centered } from 'components/LaunchpadMisc/styled'
import { text1 } from 'components/LaunchpadMisc/typography'

interface Props {
  background?: string
  color?: string
  showPin?: boolean
}
interface PinProps {
  onClose: () => void
}

interface IssuanceNameFormValues {
  name: string
}

const initialValues: IssuanceNameFormValues = {
  name: '',
}

const schema = object().shape({
  name: string().required('Please enter name of your issuance'),
})

const PinForm = ({ onClose }: PinProps) => {
  const { items } = useGetIssuancePlain({ forPinning: 'true' })
  const getPinnedOffer = useGetPinnedOffer()
  const { load: pinOffer, isLoading } = usePinOffer()

  const [selected, setSelected] = useState<string>()
  const [openConfirm, setOpenConfirm] = useState(false)

  const onSave = () => {
    setOpenConfirm(false)
    pinOffer(selected, onClose)
  }
  useEffect(() => {
    getPinnedOffer().then((offer) => {
      if (offer && offer.issuanceId) {
        setSelected(offer.issuanceId.toString())
      }
    })
  }, [getPinnedOffer])
  const issuanceOptions = useMemo(() => {
    if (!items) return []
    return items.map(({ id, name }) => ({
      value: id.toString(),
      label: name,
    }))
  }, [items])

  const onClickDone = () => {
    if (selected) {
      setOpenConfirm(true)
    }
  }

  if (isLoading) {
    return (
      <Centered height="160px">
        <Loader />
      </Centered>
    )
  }
  return (
    <PinContainer>
      <DropdownField
        field="issuance"
        onChange={setSelected}
        label="Choose issuance"
        options={issuanceOptions}
        value={selected}
        wrapperStyle={{
          cursor: 'pointer',
          marginTop: '16px',
        }}
        searchable
      />
      <FilledButton onClick={onClickDone} style={{ marginTop: '16px' }} disabled={!selected}>
        <ButtonLabel>Done</ButtonLabel>
      </FilledButton>
      <ConfirmPopup isOpen={openConfirm} onDecline={() => setOpenConfirm(false)} onAccept={onSave} />
    </PinContainer>
  )
}

export const IssuanceCreateButton: React.FC<Props> = (props) => {
  const theme = useTheme()
  const history = useHistory()
  const { isAdmin } = useRole()

  const issuances = useGetIssuancePlain({ forPinning: 'true' })
  const createIssunace = useCreateIssuance()

  const [showIssuanceDialog, setShowIssuanceDialog] = useState(false)
  const [openPin, setOpenPin] = useState(false)
  const [loading, setLoading] = useState(false)

  const toggleNewIssuanceDialog = useCallback(() => {
    setShowIssuanceDialog((state) => !state)
  }, [])

  const openIssuanceForm = useCallback(
    async (values: IssuanceNameFormValues) => {
      if (!issuances.items) {
        return
      }

      if (issuances.items?.some((x) => x.name === values.name)) {
        throw new Error('Issuance with that name already exists')
      }

      setLoading(true)
      const result = await createIssunace(values.name)
      setLoading(false)

      setShowIssuanceDialog(false)
      history.push(`/issuance/create?id=${result.id}`)
    },
    [history]
  )

  const showPin = props.showPin && isAdmin

  return (
    <>
      <FlexVerticalCenter>
        {showPin && (
          <OutlineButton
            onClick={() => setOpenPin(true)}
            background={props.background}
            color={props.color}
            padding="1rem"
            style={{ marginRight: '17px' }}
          >
            <PinIcon />
          </OutlineButton>
        )}
        <OutlineButton
          onClick={toggleNewIssuanceDialog}
          background={props.background}
          color={props.color}
          padding="0 1.5rem"
        >
          <Plus size="15" color={props.color ?? theme.launchpad.colors.primary} /> New Issuance
        </OutlineButton>
      </FlexVerticalCenter>

      <IssuanceDialog title="New Issuance" show={showIssuanceDialog} onClose={toggleNewIssuanceDialog} width="480px">
        <Formik initialValues={initialValues} validationSchema={schema} onSubmit={openIssuanceForm}>
          {({ values, errors, submitForm, setFieldValue }) => (
            <>
              <IssuanceTextField
                label="Name"
                placeholder="Name of Asset"
                value={values.name}
                onChange={(v) => setFieldValue('name', v)}
                inputFilter={textFilter}
              />

              {errors.name && <ErrorText>{errors.name}</ErrorText>}

              <Row gap="1rem" justifyContent="spaced-evenly" width="100%">
                <OutlineButton grow={1} onClick={toggleNewIssuanceDialog}>
                  Cancel
                </OutlineButton>
                <FilledButton grow={1} onClick={submitForm} disabled={loading}>
                  Submit
                </FilledButton>
              </Row>
            </>
          )}
        </Formik>
      </IssuanceDialog>

      {showPin && (
        <IssuanceDialog
          title="Pin deal on top of Homepage"
          show={openPin}
          onClose={() => setOpenPin(false)}
          width="480px"
        >
          <PinForm onClose={() => setOpenPin(false)} />
        </IssuanceDialog>
      )}
    </>
  )
}

const PinContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const ButtonLabel = styled.div`
  ${text1}
  color: ${(props) => props.theme.launchpad.colors.text.light};
`
