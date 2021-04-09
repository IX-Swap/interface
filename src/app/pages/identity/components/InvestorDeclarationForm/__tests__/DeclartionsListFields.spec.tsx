import {
  DeclarationsListFields,
  DeclarationsListFieldsProps
} from 'app/pages/_identity/components/InvestorDeclarationForm/DeclarationsList/DeclartionsListFields'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'

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
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <DeclarationsListFields {...props} />
      </Form>
    )
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
