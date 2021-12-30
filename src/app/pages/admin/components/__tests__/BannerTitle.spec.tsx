import * as React from 'react'
import { render } from 'test-utils'
import { Form } from 'components/form/Form'
import { BannerTitle } from 'app/pages/admin/components/BannerTitle'
import { fireEvent, waitFor } from '@testing-library/dom'

describe('BannerTitle', () => {
  const changeHandler = jest.fn()

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('calls onChange handler when input has changed', async () => {
    const { getByTestId } = render(
      <Form>
        <BannerTitle text={'title'} onChange={changeHandler} />
      </Form>
    )

    const input = getByTestId('input')

    fireEvent.change(input, { target: { value: 'test' } })
    await waitFor(() => {
      expect(changeHandler).toHaveBeenCalledWith('test')
    })
  })

  it('focuses input on button click', () => {
    const { getByTestId } = render(
      <Form>
        <BannerTitle text={'title'} onChange={changeHandler} />
      </Form>
    )

    const button = getByTestId('button')
    const input = getByTestId('input')
    fireEvent.click(button)

    expect(input).toHaveFocus()
  })

  it('renders Grid components with correct props when isEdit is true', () => {
    const { getByTestId } = render(
      <Form>
        <BannerTitle text={'title'} onChange={changeHandler} />
      </Form>
    )

    const button = getByTestId('button')
    fireEvent.click(button)

    const firstGrid = getByTestId('firstGrid')
    const secondGrid = getByTestId('secondGrid')
    expect(firstGrid).toHaveAttribute(
      'style',
      'display: none; min-height: 54px; align-items: center;'
    )
    expect(secondGrid).toHaveAttribute('style', 'display: block;')
  })

  it('renders Grid components with correct props when isEdit is false', () => {
    const { getByTestId } = render(
      <Form>
        <BannerTitle text={'title'} onChange={changeHandler} />
      </Form>
    )

    const firstGrid = getByTestId('firstGrid')
    const secondGrid = getByTestId('secondGrid')
    expect(firstGrid).toHaveAttribute(
      'style',
      'display: flex; min-height: 54px; align-items: center;'
    )
    expect(secondGrid).toHaveAttribute('style', 'display: none;')
  })
})
