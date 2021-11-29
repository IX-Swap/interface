import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  TopList,
  TopListProps
} from 'app/pages/educationCentre/components/TopList'
import { individual } from '__fixtures__/identity'
import { IndividualAvatar } from 'components/IndividualAvatar'
import { CorporateAvatar } from 'components/CorporateAvatar'

jest.mock('components/IndividualAvatar', () => ({
  IndividualAvatar: jest.fn(() => null)
}))

jest.mock('components/CorporateAvatar', () => ({
  CorporateAvatar: jest.fn(() => null)
}))

describe('TopList', () => {
  const props: TopListProps = {
    items: [
      {
        user: individual._id,
        label: 'Top List',
        _id: individual._id
      }
    ]
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<TopList {...props} />)
  })

  it('renders IndividualAvatar when user is not undefined', () => {
    const { getByText } = render(<TopList {...props} />)

    expect(getByText('Top List')).toBeTruthy()
    expect(IndividualAvatar).toHaveBeenCalledWith(
      {
        userId: individual._id
      },
      {}
    )
  })

  it('renders CorporateAvatar when user is undefined', () => {
    const noUserProps = {
      items: [
        {
          user: undefined,
          label: 'Top List',
          _id: individual._id
        }
      ]
    }

    render(<TopList {...noUserProps} />)

    expect(CorporateAvatar).toHaveBeenCalledWith(
      {
        _id: individual._id
      },
      {}
    )
  })
})
