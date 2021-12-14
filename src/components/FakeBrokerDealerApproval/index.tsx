import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Flex } from 'rebass'
import styled from 'styled-components'

import LogoDark from '../../assets/svg/logo-white.svg'
import { TYPE } from 'theme'
import Column from 'components/Column'
import { LoadingDots } from 'components/LoadingDots'
import { useToggleFakeApproval } from 'state/application/hooks'

const Wrapper = styled.div`
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgb(80, 94, 236);
  z-index: 999;
  padding: 120px;
`

export const FakeBrokerDealerApproval = () => {
  const [showComponent, setShowComponent] = useState(false)
  const [isFirstStep, setIsFirstStep] = useState(true)
  const setShowFakeApproval = useToggleFakeApproval()

  useEffect(() => {
    document.body.style.maxWidth = '100vw'
    document.body.style.maxHeight = '100vh'
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.maxWidth = 'auto'
      document.body.style.maxHeight = 'auto'
      document.body.style.overflow = 'unset'
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setShowComponent(true)
    }, 2000)
  }, [])

  useEffect(() => {
    if (showComponent) {
      setTimeout(() => {
        setIsFirstStep(false)
      }, 7000)
    }
  }, [showComponent])

  useEffect(() => {
    if (!isFirstStep) {
      setTimeout(() => {
        setShowFakeApproval(false)
      }, 3000)
    }
  }, [isFirstStep, setShowFakeApproval])

  return createPortal(
    showComponent ? (
      <Wrapper>
        <Column style={{ justifyContent: 'space-between', height: 'calc(100vh - 240px)' }}>
          <Flex alignItems="center">
            <img width={'38px'} height={'47px'} src={LogoDark} alt="logo" />
            <TYPE.title4 marginLeft="16px">FakeIXS</TYPE.title4>
          </Flex>

          <Flex>
            <Column style={{ width: '100%', maxWidth: '750px' }}>
              {isFirstStep ? (
                <>
                  <TYPE.main0 marginBottom="24px" fontSize={44}>
                    Confirming transaction...
                  </TYPE.main0>
                  <TYPE.title3 marginBottom="24px" lineHeight={'40px'}>
                    We are confirming your transaction. This may take a few moment please wait
                  </TYPE.title3>
                  <LoadingDots size="1rem" background={'white'} duration="1.5s" dots={10} />
                </>
              ) : (
                <>
                  <TYPE.main0 marginBottom="24px" fontSize={44}>
                    Your transaction has been verified!
                  </TYPE.main0>
                  <TYPE.title3 marginBottom="24px" lineHeight={'40px'}>
                    You will be now redirected to IXSwap...
                  </TYPE.title3>
                </>
              )}
            </Column>
          </Flex>
        </Column>
      </Wrapper>
    ) : null,
    document.querySelector('#fake-approval') as Element
  )
}
