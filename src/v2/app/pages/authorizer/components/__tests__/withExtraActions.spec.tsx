/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render } from 'test-utils'
import { withExtraActions } from 'v2/app/pages/authorizer/components/withExtraActions'
import { Actions } from 'v2/app/pages/authorizer/components/Actions'

jest.mock('v2/app/pages/authorizer/components/Actions', () => ({
  Actions: jest.fn(() => null)
}))

describe('withExtraActions', () => {
  const item = {}

  it('extends Actions component with provided props', () => {
    const ExtendedActions = withExtraActions()
    render(<ExtendedActions item={item} cacheQueryKey={[]} />)

    expect(Actions).toHaveBeenCalledWith(
      {
        cacheQueryKey: [],
        item
      },
      {}
    )
  })
})
