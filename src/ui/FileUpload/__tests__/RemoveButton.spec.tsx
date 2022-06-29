import React from 'react'
import { render } from 'test-utils'
import { RemoveButton } from 'ui/FileUpload/RemoveButton'
import { fireEvent, waitFor } from '@testing-library/dom'
import * as useFormContext from 'react-hook-form'

describe('RemoveButton', () => {
  const useFormContextResponse = {
    setValue: jest.fn()
  }
  const name = 'test'
  const remove = jest.fn()
  const setCompleted = jest.fn()

  beforeEach(() => {
    jest
      .spyOn(useFormContext, 'useFormContext')
      .mockImplementation(() => useFormContextResponse as any)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('invokes remove function on button click when remove props is not undefined', async () => {
    const { getByRole } = render(
      <RemoveButton name={name} remove={remove} setCompleted={setCompleted} />
    )

    fireEvent.click(getByRole('button'))

    await waitFor(() => {
      expect(remove).toHaveBeenCalledTimes(1)
    })
  })

  it('invokes setValue and setCompleted functions on button click when remove props is undefined', async () => {
    const { getByRole } = render(
      <RemoveButton name={name} setCompleted={setCompleted} />
    )

    fireEvent.click(getByRole('button'))

    await waitFor(() => {
      expect(setCompleted).toHaveBeenCalledWith(0)
      expect(useFormContextResponse.setValue).toHaveBeenCalledWith(
        name,
        undefined
      )
    })
  })
})
