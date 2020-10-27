/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DeclarationView,
  DeclarationViewProps
} from 'v2/app/pages/identity/components/DeclarationView'
import { declarations } from '../../const/declarations'

describe('DeclarationView', () => {
  const props: DeclarationViewProps = {
    data: declarations.individual.map(({ key }) => ({
      [key]: undefined
    })),
    declarations: declarations.individual
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DeclarationView {...props} />)
  })
})
