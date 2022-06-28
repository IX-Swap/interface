import '@testing-library/jest-dom'
import React from 'react'
import { render } from 'test-utils'
import { DeclarationsListItem } from 'app/pages/identity/components/DeclarationsListItem/DeclarationsListItem'
import { Icon } from 'ui/Icons/Icon'

jest.mock('ui/Icons/Icon', () => ({
  Icon: jest.fn(() => null)
}))

describe('DeclarationsListItem', () => {
  const label = 'Tax One'

  it('renders DoneIcon when value is true', () => {
    render(<DeclarationsListItem label={label} value={true} />)

    expect(Icon).toHaveBeenCalledWith({ color: '#7DD320', name: 'check' }, {})
  })

  it('renders CloseIcon when value is false', () => {
    render(<DeclarationsListItem label={label} value={false} />)

    expect(Icon).toHaveBeenCalledWith({ color: '#F56283', name: 'close' }, {})
  })

  it('renders label as a string', () => {
    const { getByText } = render(
      <DeclarationsListItem label={label} value={false} />
    )
    expect(getByText(label)).toBeInTheDocument()
  })

  it('renders label as a react element', () => {
    const { getByTestId } = render(
      <DeclarationsListItem
        label={<span data-testid='label'>Tax Two</span>}
        value={false}
      />
    )
    expect(getByTestId('label')).toHaveTextContent('Tax Two')
  })
})
