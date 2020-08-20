/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  withExtraActions,
  WithExtraActionsProps
} from 'v2/app/authorizer/components/withExtraActions'
import { Actions } from 'v2/app/authorizer/components/Actions'

jest.mock('v2/app/authorizer/components/Actions', () => ({
  Actions: jest.fn(() => null)
}))

describe('withExtraActions', () => {
  const item = {}
  const props: WithExtraActionsProps<any> = {
    onView: jest.fn()
  }

  it('extends Actions component with provided props', () => {
    const ExtendedActions = withExtraActions(props)
    render(<ExtendedActions item={item} />)

    expect(Actions).toHaveBeenCalledTimes(1)
    expect(Actions).toHaveBeenCalledWith(
      {
        onView: props.onView,
        item
      },
      {}
    )
  })
})
