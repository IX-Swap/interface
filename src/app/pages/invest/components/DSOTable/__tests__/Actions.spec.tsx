import React from 'react'
import { render } from 'test-utils'
import {
  Actions,
  ActionsProps
} from 'app/pages/invest/components/DSOTable/Actions'
import { dso } from '__fixtures__/authorizer'

const sampleProps: ActionsProps = {
  item: dso
}

describe('Actions', () => {
  it.skip('renders without any errors', () => {
    render(<Actions {...sampleProps} />)
  })
})
