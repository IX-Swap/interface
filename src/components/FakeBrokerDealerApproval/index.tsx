import React, { useEffect, useState, FC } from 'react'
import { createPortal } from 'react-dom'
import { Flex } from 'rebass'
import styled from 'styled-components'

import { DesktopOnly, MobileAndTablet, TYPE } from 'theme'
import Column from 'components/Column'
import { LoadingDots } from 'components/LoadingDots'
import { useBrokerDealerState, useToggleFakeApproval } from 'state/application/hooks'
import { useSubmitBrokerDealerForm } from 'state/swapHelper/hooks'
import { AppLogo } from 'components/AppLogo'

const Wrapper = styled.div`
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
  background-color: rgb(80, 94, 236);
  z-index: 999;
  padding: 120px;

  @media screen and (max-width: 1080px) {
    padding: 24px;
  }
`

interface Props {
  formRef: any
}

export const FakeBrokerDealerApproval: FC<Props> = ({ formRef }) => {
  const [showComponent, setShowComponent] = useState(false)
  const setShowFakeApproval = useToggleFakeApproval()
  const brokerDealerDTO = useBrokerDealerState()
  const submitToBrokerDealer = useSubmitBrokerDealerForm()

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
        setShowFakeApproval(false)
        submitToBrokerDealer({
          dto: brokerDealerDTO,
          formRef,
        })
      }, 5000)
    }
  }, [showComponent, setShowFakeApproval, brokerDealerDTO, formRef, submitToBrokerDealer])

  return createPortal(
    showComponent ? (
      <Wrapper>
        <Column style={{ justifyContent: 'space-between', height: 'calc(100vh - 240px)' }}>
          <Flex alignItems="center">
            <AppLogo width={'38px'} height={'47px'} />
            <TYPE.title4 marginLeft="16px">InvestaX</TYPE.title4>
          </Flex>

          <Flex>
            <Column style={{ width: '100%', maxWidth: '750px' }}>
              <TYPE.main0 marginBottom="24px" fontSize={44}>
                Confirming transaction...
              </TYPE.main0>
              <TYPE.title3 marginBottom="24px" lineHeight={'40px'}>
                We are confirming your transaction. This may take a few moments. Please wait
              </TYPE.title3>
              <DesktopOnly>
                <LoadingDots size="1rem" background={'white'} duration="1.5s" dots={10} />
              </DesktopOnly>
              <MobileAndTablet>
                <LoadingDots size="0.5rem" background={'white'} duration="1.5s" dots={5} />
              </MobileAndTablet>
            </Column>
          </Flex>
        </Column>
      </Wrapper>
    ) : null,
    document.querySelector('#fake-approval') as Element
  )
}
