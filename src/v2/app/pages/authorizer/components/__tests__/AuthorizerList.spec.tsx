/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { AuthorizerTable } from '../AuthorizerTable'
import {
  AuthorizerList,
  AuthorizerListProps
} from 'v2/app/pages/authorizer/components/AuthorizerList'
import { Filters } from 'v2/app/pages/authorizer/components/Filters'

jest.mock('../AuthorizerTable', () => ({
  AuthorizerTable: jest.fn(() => null)
}))

jest.mock('v2/app/pages/authorizer/components/Filters', () => ({
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
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders as expected in normal mode', async () => {
    render(<AuthorizerList {...props} />)

    expect(AuthorizerTable).toHaveBeenCalledWith(props, {})
    expect(Filters).toHaveBeenCalled()
  })
})
