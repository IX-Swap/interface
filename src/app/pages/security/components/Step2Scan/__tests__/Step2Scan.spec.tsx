import React from 'react'
import { render } from 'test-utils'
import { Step2Scan } from 'app/pages/security/components/Step2Scan/Step2Scan'
import { fakeTwoFaData } from '__fixtures__/security'

describe('Step2Scan', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders 2fa key', () => {
    const { getByText } = render(<Step2Scan twoFaData={fakeTwoFaData} />)
    expect(getByText(fakeTwoFaData.key)).toBeTruthy()
  })

  it('renders 2fa image', () => {
    const { getByTestId } = render(<Step2Scan twoFaData={fakeTwoFaData} />)
    const el = getByTestId('store-image')
    expect(el.style.backgroundImage).toEqual(`url(${fakeTwoFaData.image})`)
  })
})
