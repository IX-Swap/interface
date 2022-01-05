import React from 'react'
import { render } from 'test-utils'
import { Step3Backup } from 'app/pages/security/pages/setup2fa/components/Step3Backup'
import * as setupContext from '../../context'
import { Setup2faStore } from '../../context/store'

describe('Step3Backup', () => {
  const store: Setup2faStore = {
    activeStep: 1,
    set2faData: jest.fn(),
    image: '',
    key: 'test-store-key',
    encoded: '',
    setActiveStep: jest.fn(),
    nextPage: jest.fn(),
    prevPage: jest.fn(),
    steps: [
      'Download app',
      'Scan QR Code',
      'Backup Key',
      'Enable Google Authenticator'
    ]
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders store.key', () => {
    jest.spyOn(setupContext, 'useSetup2faStore').mockReturnValue({ ...store })

    const { container } = render(<Step3Backup />)
    expect(container.querySelector('h4')).toHaveTextContent(store.key)
  })
})
