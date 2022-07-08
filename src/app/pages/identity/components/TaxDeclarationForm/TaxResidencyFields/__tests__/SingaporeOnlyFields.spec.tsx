import { SingaporeOnlyFields } from 'app/pages/identity/components/TaxDeclarationForm/TaxResidencyFields/SingaporeOnlyFields'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup, fireEvent, act, waitFor } from 'test-utils'
import * as useIsSingPass from 'app/pages/identity/hooks/useIsSingPass'
import { renderHook } from '@testing-library/react-hooks'
import { useFormContext } from 'react-hook-form'

describe('SingaporeOnlyFields', () => {
  const objResponse = {
    isSingPass: true
  }

  jest
    .spyOn(useIsSingPass, 'useIsSingPass')
    .mockImplementation(() => objResponse as any)

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <SingaporeOnlyFields />
      </Form>
    )
  })
})
