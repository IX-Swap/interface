import React from 'react'
import { render } from 'test-utils'
import { AuthorizerTable } from '../AuthorizerTable'
import {
  AuthorizerList,
  AuthorizerListProps
} from 'app/pages/authorizer/components/AuthorizerList'
import { Filters } from 'app/pages/authorizer/components/Filters'

jest.mock('../AuthorizerTable', () => ({
  AuthorizerTable: jest.fn(() => null)
}))

jest.mock('app/pages/authorizer/components/Filters', () => ({
  Filters: jest.fn(() => null)
}))

describe('AuthorizerList', () => {
  const props: AuthorizerListProps<any> = {
    title: 'Banks',
    name: 'Bank Account(s)',
    uri: '/some/uri',
    columns: [],
    renderView: jest.fn()
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders as expected in normal mode', async () => {
    render(<AuthorizerList {...props} />)

    expect(AuthorizerTable).toHaveBeenCalledWith({ ...props }, {})
    expect(Filters).toHaveBeenCalled()
  })
})
