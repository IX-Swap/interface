import { StatCard } from 'app/pages/admin/components/StatCard/StatCard'
import React from 'react'
import { render } from 'test-utils'
import TotalUsersIcon from 'assets/icons/users.svg'

describe('StatCard', () => {
  const props = {
    title: 'Total',
    value: '100',
    icon: TotalUsersIcon,
    secondaryInfo: <div>Another Info</div>
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders props correctly', () => {
    const { getByText } = render(<StatCard {...props} />)

    expect(getByText('Total')).toBeTruthy()
    expect(getByText('100')).toBeTruthy()
    expect(getByText('Another Info')).toBeTruthy()
  })
})
