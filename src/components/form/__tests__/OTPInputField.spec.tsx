import React from 'react'
import { render } from 'test-utils'
import { OTPInputField } from 'components/form/OTPInputField'

describe('OTPInputField', () => {
  const onChangeMock = jest.fn()
  const valueMock = '123456'

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <OTPInputField onChange={onChangeMock} value={valueMock} numInputs={6} />
    )
  })
})
