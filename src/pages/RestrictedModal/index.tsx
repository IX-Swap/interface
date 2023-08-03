import { ButtonIXSGradient } from 'components/Button'
import React, { FC, useState } from 'react'
import { TYPE } from 'theme'
import Column from 'components/Column'

import Modal from 'components/Modal'
import { FormCard } from './styleds'
import home from 'assets/images/home.png'
import group from 'assets/images/group.png'

export const RestrictedModal: FC = () => {
  const [showTaxModal, setShowTaxModal] = useState(true)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (
    <Modal isOpen={showTaxModal} onDismiss={() => setShowTaxModal(true)}>
      <FormCard>
        <Column style={{ alignItems: 'stretch' }}>
          <TYPE.mediumHeader>Restricted Access</TYPE.mediumHeader>
          <br />
          <TYPE.description2>
            Your IP address has been restricted from accessing this site
            <br />
          </TYPE.description2>

          <ButtonIXSGradient
            type="button"
            onClick={() => (location.replace('https://www.ixswap.io/learning-hub'))}
            style={{
              width: '100%',
              marginTop: '32px',
              background: '#1f1129',
              color: '#EDCEFF',
              justifyContent: 'left',
            }}
          >
            <img style={{ width: '32px', height: '32px', marginRight: '10px' }} src={home} alt="homeImg" />
            IXSwap Home
          </ButtonIXSGradient>
          <ButtonIXSGradient
            type="button"
            onClick={() => (location.replace('https://www.ixswap.io/faq'))}
            style={{
              width: '100%',
              marginTop: '32px',
              background: '#1f1129',
              color: '#EDCEFF',
              justifyContent: 'left',
            }}
          >
            <img style={{ width: '32px', height: '32px', marginRight: '10px' }} src={group} alt="groupImg" />
            Learn More
          </ButtonIXSGradient>
        </Column>
      </FormCard>
    </Modal>
  )
}
