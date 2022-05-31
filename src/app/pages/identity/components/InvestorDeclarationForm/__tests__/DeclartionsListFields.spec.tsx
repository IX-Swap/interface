import {
  DeclarationsListFields,
  DeclarationsListFieldsProps
} from 'app/pages/identity/components/InvestorDeclarationForm/DeclarationsList/DeclartionsListFields'
import { Form } from 'components/form/Form'
import React from 'react'
import { render } from 'test-utils'
import { TypedField } from 'components/form/TypedField'
import { Checkbox } from 'components/form/Checkbox'

describe('DeclartionsListFields', () => {
  const props: DeclarationsListFieldsProps = {
    data: [
      {
        label: 'Declaration One',
        name: 'one'
      }
    ]
  }
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders title correctly', () => {
    const { getByTestId } = render(
      <Form>
        <DeclarationsListFields {...props} />
      </Form>
    )
    expect(getByTestId('Declaration-select')).toBeInTheDocument()
  })
})
