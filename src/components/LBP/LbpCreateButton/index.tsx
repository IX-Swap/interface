import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useTheme } from 'styled-components'
import { Plus } from 'react-feather'
import { FlexVerticalCenter } from 'components/LaunchpadMisc/styled'
import { OutlineButton } from 'components/LaunchpadMisc/buttons'
import { text1 } from 'components/LaunchpadMisc/typography'

import { useHistory } from 'react-router-dom'


interface Props {
  background?: string
  color?: string
  showPin?: boolean
}


export const LbpCreateButton: React.FC<Props> = (props) => {
  const theme = useTheme()
  const history = useHistory()

  const openLbpForm = useCallback(async () => {
    history.push(`/lbp-admin/create`)
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
