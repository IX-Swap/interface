import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import { ReactComponent as ArrowBack } from 'assets/images/arrow-back.svg'

interface Props {
  onBack?: () => void
}

export const BackArrowButton = ({ onBack }: Props) => {
  const history = useHistory()

  const onClick = () => {
    if (onBack) {
      onBack()
    } else {
      history.goBack()
    }
  }

  return <StyledArrowBack onClick={onClick} />
}

const StyledArrowBack = styled(ArrowBack)`
  cursor: pointer;
  path {
    fill: ${({ theme: { white } }) => white};
  }
`
