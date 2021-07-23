import { sampleSecurity } from 'app/pages/home/components/Securities/__tests__/SecurityCard.spec'
import { SecurityViewHeader } from 'app/pages/home/components/SecurityViewHeader/SecurityViewHeader'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('SecurityViewHeader', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<SecurityViewHeader data={sampleSecurity} />)
  })

  it('renders logo correctly', () => {
    const { container } = render(<SecurityViewHeader data={sampleSecurity} />)
    const logo = container.querySelector('img') as HTMLImageElement

    expect(logo).toHaveAttribute(
      'src',
      'https://assets.atlasone-staging.ca/uploads/5fd94af5847528002fb70f32-REALT.png'
    )
    expect(logo).toHaveAttribute(
      'alt',
      'REALTOKEN-S-3432-HARDING-ST-DETROIT-MI'
    )
  })

  it('renders currentPrice correctly', () => {
    const { getByText } = render(<SecurityViewHeader data={sampleSecurity} />)

    expect(getByText('$ 81.00')).toBeTruthy()
  })
})
