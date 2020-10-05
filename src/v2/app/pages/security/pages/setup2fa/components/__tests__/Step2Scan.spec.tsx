/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { Step2Scan } from 'v2/app/pages/security/pages/setup2fa/components/Step2Scan'
import * as setupContext from '../../context'
import * as setupHook from '../../hooks/useSetup2fa'
import {generateQueryResult} from "../../../../../../../../__fixtures__/useQuery";
import {Setup2faStore} from "../../context/store";

describe('Step2Scan', () => {
  const store: Setup2faStore = {
    activeStep: 1,
    image:
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    key: 'test-store-key',
    encoded: '',
    set2faData: jest.fn(),
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

  beforeEach(() => {
    jest.spyOn(setupContext, 'useSetup2faStore').mockReturnValue({ ...store })
    jest.spyOn(setupHook, 'useSetup2fa').mockReturnValue(generateQueryResult({ isLoading: false }))
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<Step2Scan />)
  })

  it('renders store.key', () => {
    const { container } = render(<Step2Scan />)
    expect(container.querySelector('h5')).toHaveTextContent(store.key)
  })

  it('renders store.image', () => {
    const { getByTestId } = render(<Step2Scan />)
    const el = getByTestId('store-image')
    expect(el.style.backgroundImage).toEqual(`url(${store.image})`)
  })
})
