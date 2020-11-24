import React from 'react'
import { render, cleanup, fireEvent, waitFor, screen } from 'test-utils'
import {
  initialValues,
  SearchAndDateFilter,
  SearchAndDateFilterProps
} from 'v2/app/pages/authorizer/components/SearchAndDateFilter'
import { convertDateToISO } from 'v2/helpers/dates'

describe('SearchAndDateFilter', () => {
  const props: SearchAndDateFilterProps = { onApplyFilter: jest.fn() }

  afterEach(async () => {
    await cleanup()
  })

  it('renders submit button and form with empty default values', async () => {
    const { getByText, getByTestId } = render(
      <SearchAndDateFilter {...props} />
    )
    const form = getByTestId('form')
    const submitButton = getByText(/submit/i)

    expect(submitButton).toBeTruthy()
    expect(form).toHaveFormValues({ ...initialValues, from: '', to: '' })
  })

  it('invokes callback on submit button click', async () => {
    const { getByText } = render(<SearchAndDateFilter {...props} />)
    const submitButton = getByText(/submit/i)

    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(props.onApplyFilter).toHaveBeenCalledTimes(1)
      expect(props.onApplyFilter).toHaveBeenCalledWith(initialValues)
    })
  })

  it('hides reset button initially', () => {
    const { queryByText } = render(<SearchAndDateFilter {...props} />)
    const resetButton = queryByText(/reset/i)

    expect(resetButton).toBeNull()
  })

  it('invokes callback with initial values on reset button click', async () => {
    const { getByText } = render(<SearchAndDateFilter {...props} />)
    fireEvent.input(screen.getByRole('textbox', { name: /search/i }), {
      target: {
        value: 'test'
      }
    })

    const resetButton = getByText(/reset/i)

    fireEvent.click(resetButton)

    await waitFor(() => {
      expect(props.onApplyFilter).toHaveBeenCalled()
      expect(props.onApplyFilter).toHaveBeenCalledWith({
        from: convertDateToISO(initialValues.from),
        to: convertDateToISO(initialValues.to),
        search: initialValues.search
      })
    })
  })

  it('handles user input on search field', async () => {
    const term = 'hello'
    const { getByTestId, getByLabelText } = render(
      <SearchAndDateFilter {...props} />
    )
    const form = getByTestId('form')
    const search = getByLabelText(/search/i)

    fireEvent.change(search, { target: { value: term } })

    await waitFor(() => {
      expect(form).toHaveFormValues({
        from: '',
        to: '',
        search: term
      })
    })
  })
})
