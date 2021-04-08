import React from 'react'
import { render, cleanup } from 'test-utils'
import { SliderTooltip } from 'app/pages/identity/components/FinancialInformationForm/SliderTooltip'

describe('SliderTooltip', () => {
  const props = {
    children: React.createElement('div', null, ''),
    open: true,
    value: 42
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<SliderTooltip {...props} />)
  })

  it('renders props correctly', () => {
    const { getByText } = render(<SliderTooltip {...props} />)

    expect(getByText('42%')).toBeTruthy()
  })
})
