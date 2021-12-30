import React from 'react'
import { render } from 'test-utils'
import { SliderTooltip } from 'app/pages/identity/components/FinancialInformationForm/SliderTooltip'

describe('SliderTooltip', () => {
  const props = {
    children: React.createElement('div', null, ''),
    open: true,
    value: 42
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders props correctly', () => {
    const { getByText } = render(<SliderTooltip {...props} />)

    expect(getByText('42%')).toBeTruthy()
  })
})
