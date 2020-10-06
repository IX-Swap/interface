/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render } from 'test-utils'
import {
  withExtraActions,
  WithExtraActionsProps
} from 'v2/app/pages/authorizer/components/withExtraActions'
import { Actions } from 'v2/app/pages/authorizer/components/Actions'

jest.mock('v2/app/pages/authorizer/components/Actions', () => ({
  Actions: jest.fn(() => null)
}))

describe('withExtraActions', () => {
  const item = {}
  const props: WithExtraActionsProps<any> = {
    onView: jest.fn()
  }

  it('extends Actions component with provided props', () => {
    const ExtendedActions = withExtraActions(props)
    render(<ExtendedActions item={item} cacheQueryKey={[]} />)

    expect(Actions).toHaveBeenCalledWith(
      {
        onView: props.onView,
        cacheQueryKey: [],
        item
      },
      {}
    )
  })
})
