import React from 'react'
import { render } from 'test-utils'
import { Login } from 'auth/pages/login/Login'
import { Form } from 'components/form/Form'

describe('Login', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <Form>
        <Login hidden={false} isLoading={false} />
      </Form>
    )
  })
})
