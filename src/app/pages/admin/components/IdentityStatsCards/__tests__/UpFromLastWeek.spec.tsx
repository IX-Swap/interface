import { UpFromLastWeek } from 'app/pages/admin/components/IdentityStatsCards/UpFromLastWeek'
import React from 'react'
import { render } from 'test-utils'

describe('UpFromLastWeek', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders props correctly', () => {
    const { getByText } = render(<UpFromLastWeek value={'5'} />)

    expect(getByText('+5')).toBeTruthy()
    expect(getByText('Up from last week')).toBeTruthy()
  })
})
