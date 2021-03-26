import { Section } from 'app/pages/_identity/components/Section/Section'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('Section', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<Section title='Section Title' />)
  })

  it('renders props correctly', () => {
    const { getByText } = render(
      <Section title='Section Title' subtitle='Subtitle' />
    )

    expect(getByText('Section Title')).toBeTruthy()
    expect(getByText('Subtitle')).toBeTruthy()
  })
})
