import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DeclarationFields,
  DeclarationFieldsProps
} from 'app/pages/identity/components/DeclarationFields'
import { Form } from 'components/form/Form'
import { checkedDeclarations } from '__fixtures__/identity'

describe('DeclarationFields', () => {
  const defaultValues = {
    declarations: checkedDeclarations
  }
  const props: DeclarationFieldsProps = {
    type: 'individual'
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
})
