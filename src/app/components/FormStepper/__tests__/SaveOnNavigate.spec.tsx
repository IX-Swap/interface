import { SaveOnNavigate } from 'app/components/FormStepper/SaveOnNavigate'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { Route } from 'react-router-dom'
import { history } from 'config/history'
import { waitFor } from '@testing-library/dom'
import { act } from 'react-dom/test-utils'
import { IdentityRoute } from 'app/pages/identity/router/config'

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useFormContext: () => ({
    formState: {
      isDirty: true
    },
    watch: () => jest.fn()
  })
}))

describe('SaveOnNavigate', () => {
  const pathname = '/test'
  const save = jest.fn(async () => await Promise.resolve({}))
  const mutation = [save, { isLoading: false }] as any
  const transformer = jest.fn()

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  beforeEach(() => {
    history.push(pathname)
  })

  it('renders without errors', () => {
    render(
      <Form>
        <SaveOnNavigate
          mutation={mutation}
          transformData={transformer}
          isCreateMode={false}
          createModeRedirect={IdentityRoute.editCorporate}
        />
      </Form>
    )
  })

  it('invokes save function when location changed', async () => {
    render(
      <Route path={pathname}>
        <Form>
          <SaveOnNavigate
            mutation={mutation}
            transformData={transformer}
            isCreateMode={false}
            createModeRedirect={IdentityRoute.editCorporate}
          />
        </Form>
      </Route>
    )

    act(() => {
      history.push(pathname + '?test')
    })

    await waitFor(() => {
      expect(save).toBeCalledTimes(0)
    })
  })
})
