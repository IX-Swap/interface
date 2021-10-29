import React from 'react'
import { render } from 'test-utils'
import { withExtraActions } from 'app/pages/authorizer/components/withExtraActions'
import { Actions } from 'app/pages/authorizer/components/Actions'

jest.mock('app/pages/authorizer/components/ActionsType', () => ({
  Actions: jest.fn(() => null)
}))

describe('withExtraActions', () => {
  const item = {}

  it('extends ActionsType component with provided props', () => {
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
