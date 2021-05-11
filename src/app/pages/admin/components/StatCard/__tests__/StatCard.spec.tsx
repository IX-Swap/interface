import { StatCard } from 'app/pages/admin/components/StatCard/StatCard'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { ReactComponent as TotalUsersIcon } from 'assets/icons/users.svg'

describe('StatCard', () => {
  const props = {
    title: 'Total',
    value: '100',
    icon: TotalUsersIcon,
    secondaryInfo: <div>Another Info</div>
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<StatCard {...props} />)
  })

  it('renders props correctly', () => {
    const { getByText } = render(<StatCard {...props} />)

    expect(getByText('Total')).toBeTruthy()
    expect(getByText('100')).toBeTruthy()
    expect(getByText('Another Info')).toBeTruthy()
  })
})
