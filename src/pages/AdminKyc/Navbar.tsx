import { Trans } from '@lingui/macro'
import React from 'react'
import { useLogout } from 'state/admin/hooks'
import styled from 'styled-components'

export const Navbar = () => {
  const logout = useLogout()

  return (
    <Container>
      <Logout onClick={logout}>
        <Trans>Logout</Trans>
      </Logout>
    </Container>
  )
}

const Logout = styled.div`
  cursor: pointer;
  font-weight: 600;
  font-size: 18px;
`

const Container = styled.div`
  height: 21px;
  margin-bottom: 26px;
  text-align: right;
  padding: 0 33px;
`
