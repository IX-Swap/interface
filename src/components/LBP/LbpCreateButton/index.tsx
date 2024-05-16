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
  const history = useHistory()

  const openLbpForm = useCallback(async () => {
    history.push(`/lbp/create`)
  }, [history])

  return (
    <>
      <FlexVerticalCenter style={{ marginRight: '17px' }}>
        <OutlineButton onClick={openLbpForm} background={props.background} color={props.color} padding="0 1.5rem">
          <Plus size="15" color={props.color ?? theme.launchpad.colors.primary} />
          <NewLbpLabel>New LBP</NewLbpLabel>
        </OutlineButton>
      </FlexVerticalCenter>
    </>
  )
}

const NewLbpLabel = styled.span`
  ${text1}
`
