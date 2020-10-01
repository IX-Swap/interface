/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'

import {
  Declaration,
  DeclarationProps
} from 'v2/app/pages/identity/components/Declaration'
import { Form } from 'v2/components/form/Form'

describe('Declaration', () => {
  const defaultValues = {
    declarations: [{ id: 'default' }, { id: 'default1' }]
  }
  const props: DeclarationProps = {
    declarations: [
      { content: 'declaration 1', key: '1', footer: 'foot 1', header: 'h1' },
      { content: 'declaration 2', key: '2', lastLine: true }
    ],
    isEditing: false
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form defaultValues={defaultValues}>
        <Declaration {...props} />
      </Form>
    )
  })
})
