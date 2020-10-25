/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DeclarationFields,
  DeclarationFieldsProps
} from 'v2/app/pages/identity/components/DeclarationFields'
import { Form } from 'v2/components/form/Form'
import { DeclarationHeader } from 'v2/app/pages/identity/components/DeclarationHeader'
import { DeclarationFooter } from 'v2/app/pages/identity/components/DeclarationFooter'

jest.mock('v2/app/pages/identity/components/DeclarationHeader', () => ({
  DeclarationHeader: jest.fn(() => null)
}))
jest.mock('v2/app/pages/identity/components/DeclarationFooter', () => ({
  DeclarationFooter: jest.fn(() => null)
}))

describe('Declaration', () => {
  const defaultValues = {
    declarations: [{ id: 'default' }, { id: 'default1' }]
  }
  const props: DeclarationFieldsProps = {
    declarations: [
      { content: 'declaration 1', key: '1', footer: 'foot 1', header: 'h1' },
      { content: 'declaration 2', key: '2', lastLine: true }
    ]
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form defaultValues={defaultValues}>
        <DeclarationFields {...props} />
      </Form>
    )
  })

  it('renders DeclarationHeader with correct props if header exists for every declaration', () => {
    render(
      <Form defaultValues={defaultValues}>
        <DeclarationFields {...props} />
      </Form>
    )

    expect(DeclarationHeader).toHaveBeenCalledTimes(1)
    expect(DeclarationHeader).toHaveBeenCalledWith({ header: 'h1' }, {})
  })

  it('renders DeclarationFooter with correct props if footer exists for every declaration', () => {
    render(
      <Form defaultValues={defaultValues}>
        <DeclarationFields {...props} />
      </Form>
    )

    expect(DeclarationFooter).toHaveBeenCalledTimes(1)
    expect(DeclarationFooter).toHaveBeenCalledWith(
      {
        footer: 'foot 1',
        classes: expect.anything()
      },
      {}
    )
  })
})
