import React, { FC } from 'react'
import { Flex } from 'rebass'

import { ButtonText } from 'components/Button'
import { TYPE } from 'theme'

import { ReactComponent as Checked } from 'assets/images/checked_solid.svg'
import { ReactComponent as NotChecked } from 'assets/images/not_checked_solid.svg'
import { ReactComponent as RadioChecked } from 'assets/images/radio-checked.svg'
import { ReactComponent as RadioNotChecked } from 'assets/images/radio-not-checked.svg'

interface Props {
  label: string | JSX.Element
  checked: boolean
  onClick?: () => void
  isRadio?: boolean
  scaleSize?: number
  disabled?: boolean
}

export const Checkbox: FC<Props> = ({ label, checked, onClick, isRadio, scaleSize = 1, disabled = false }: Props) => {
  const style = { transform: `scale(${scaleSize})` }
  const checkedImage = isRadio ? <RadioChecked style={style} /> : <Checked style={style} />
  const notCheckedImage = isRadio ? <RadioNotChecked style={style} /> : <NotChecked style={style} />

  return (
    <ButtonText
      type="button"
      style={{ textDecoration: 'none', textAlign: 'inherit' }}
      onClick={onClick}
      disabled={disabled}
    >
      <Flex>
        <div>{checked ? checkedImage : notCheckedImage}</div>
        <TYPE.body3 marginLeft={scaleSize > 1 ? '12px' : '8px'}>{label}</TYPE.body3>
      </Flex>
    </ButtonText>
  )
}
