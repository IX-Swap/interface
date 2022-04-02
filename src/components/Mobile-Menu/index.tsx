import { useActiveWeb3React } from 'hooks/web3'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import menuIcon from '../../assets/images/burger-menu.svg'
import { Menu } from './Menu'

export const MobileMenu = () => {
  const { account } = useActiveWeb3React()
  const [open, handleIsOpen] = useState(false)

  const toggle = () => handleIsOpen((state) => !state)
  const close = () => handleIsOpen(false)

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0]
    if (body) {
      body.setAttribute('style', 'overflow:hidden')
    }
    return () => {
      if (body) {
        body.removeAttribute('style')
      }
    }
  }, [])

  if (!account) return null

  return (
    <>
      <IconContainer>
        <MenuIcon src={menuIcon} alt="menu-burger" onClick={toggle} />
      </IconContainer>
      {open && <Menu close={close} />}
    </>
  )
}

const IconContainer = styled.div`
  text-align: right;
  width: 100%;
  display: none;
  @media (max-width: 1400px) {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  } ;
`

const MenuIcon = styled.img`
  cursor: pointer;
`
