import React from 'react'
import { render } from 'test-utils'
import { Step2Scan } from 'app/pages/security/pages/update2fa/components/Step2Scan/Step2Scan'
import { fakeTwoFaData } from '__fixtures__/security'

describe('Step2Scan', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders 2fa key and image', () => {
    const { getByText, getByTestId } = render(
      <Step2Scan twoFaData={fakeTwoFaData} />
    )
    const image = getByTestId('store-image')
    expect(getByText(fakeTwoFaData.key)).toBeTruthy()
    expect(image).toBeInTheDocument()
  })
})
