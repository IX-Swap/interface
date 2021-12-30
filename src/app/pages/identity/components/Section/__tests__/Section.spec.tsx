import { Section } from 'app/pages/identity/components/Section/Section'
import React from 'react'
import { render } from 'test-utils'

describe('Section', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders props correctly', () => {
    const { getByText } = render(
      <Section title='Section Title' subtitle='Subtitle' />
    )

    expect(getByText('Section Title')).toBeTruthy()
    expect(getByText('Subtitle')).toBeTruthy()
  })
})
