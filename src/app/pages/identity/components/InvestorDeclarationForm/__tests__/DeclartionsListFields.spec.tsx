import {
  DeclarationsListFields,
  DeclarationsListFieldsProps
} from 'app/pages/identity/components/InvestorDeclarationForm/DeclarationsList/DeclartionsListFields'
import { Form } from 'components/form/Form'
import React from 'react'
import { render } from 'test-utils'

describe('DeclartionsListFields', () => {
  const props: DeclarationsListFieldsProps = {
    data: [
      {
        label: 'Declaration One',
        name: 'one'
      }
    ],
    title: 'This is the title'
  }
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders title correctly', () => {
    const { getByText } = render(
      <Form>
        <DeclarationsListFields {...props} />
      </Form>
    )

    expect(getByText('This is the title')).toBeTruthy()
  })
})
