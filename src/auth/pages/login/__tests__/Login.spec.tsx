import React from 'react'
import { render, cleanup } from 'test-utils'
import { Login } from 'auth/pages/login/Login'
import { Form } from 'components/form/Form'

describe('Login', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <Login hidden={false} />
      </Form>
    )
  })
})
