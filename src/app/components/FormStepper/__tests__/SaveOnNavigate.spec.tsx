import { SaveOnNavigate } from 'app/components/FormStepper/SaveOnNavigate'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('SaveOnNavigate', () => {
  const save = jest.fn(async () => await Promise.resolve({}))
  const mutation = [save, { isLoading: false }] as any
  const transformer = jest.fn()

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <SaveOnNavigate mutation={mutation} transformData={transformer} />
      </Form>
    )
  })
})
