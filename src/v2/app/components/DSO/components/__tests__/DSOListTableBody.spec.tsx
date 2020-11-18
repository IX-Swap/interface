import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSOCard } from 'v2/app/components/DSO/components/DSOCard'
import {
  DSOListTableBody,
  DSOListTableBodyProps
} from 'v2/app/components/DSO/components/DSOListTableBody'
import { dso } from '__fixtures__/authorizer'

jest.mock('v2/app/components/DSO/components/DSOCard', () => ({
  DSOCard: jest.fn(() => null)
}))

describe('DSOListTableBody', () => {
  const props: DSOListTableBodyProps = {
    items: [dso],
    viewURL: '/'
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DSOListTableBody {...props} />)
  })

  it('renders DSOCard once per item with correct props', () => {
    render(<DSOListTableBody {...props} />)

    expect(DSOCard).toHaveBeenCalledTimes(props.items.length)
    props.items.forEach((item, n) => {
      expect(DSOCard).toHaveBeenNthCalledWith(
        n + 1,
        {
          dso: item,
          viewURL: props.viewURL
        },
        {}
      )
    })
  })
})
