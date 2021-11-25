import '@testing-library/jest-dom'
import React from 'react'
import { render } from 'test-utils'
import { DeclarationsListItem } from 'app/pages/identity/components/DeclarationsListItem/DeclarationsListItem'

describe('DeclarationsListItem', () => {
  it('renders DoneIcon when value is true', () => {
    const { queryByTestId } = render(
      <DeclarationsListItem label='Tax One' value={true} />
    )

    expect(queryByTestId('declarations-list-item-checked')).toBeTruthy()
    expect(queryByTestId('declarations-list-item-unchecked')).toBeFalsy()
  })

  it('renders CloseIcon when value is false', () => {
    const { queryByTestId } = render(
      <DeclarationsListItem label='Tax One' value={false} />
    )

    expect(queryByTestId('declarations-list-item-checked')).toBeFalsy()
    expect(queryByTestId('declarations-list-item-unchecked')).toBeTruthy()
  })

  it('renders label as a string', () => {
    const { getByTestId } = render(
      <DeclarationsListItem label='Tax One' value={false} />
    )
    expect(getByTestId('declarations-list-item-label')).toHaveTextContent(
      'Tax One'
    )
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
