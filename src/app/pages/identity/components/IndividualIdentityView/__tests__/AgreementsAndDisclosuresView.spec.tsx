import { AgreementsAndDisclosuresView } from 'app/pages/identity/components/IndividualIdentityView/AgreementsAndDisclosuresView/AgreementsAndDisclosuresView'
import React from 'react'
import { render } from 'test-utils'
import { individual } from '__fixtures__/identity'
import DoneIcon from '@material-ui/icons/Done'
import CloseIcon from '@material-ui/icons/Close'

jest.mock('@material-ui/icons/Done', () => jest.fn(() => null))

jest.mock('@material-ui/icons/Close', () => jest.fn(() => null))

describe('AgreementsAndDisclosuresView', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<AgreementsAndDisclosuresView data={individual} />)
  })

  it('renders correct label if isCorporateIssuerForm is true', () => {
    const { getByText } = render(
      <AgreementsAndDisclosuresView data={individual} isCorporateIssuerForm />
    )

    expect(getByText('Issuer Agreement')).toBeTruthy()
  })

  it('renders correct label if isCorporateIssuerForm is false', () => {
    const { getByText } = render(
      <AgreementsAndDisclosuresView
        data={individual}
        isCorporateIssuerForm={false}
      />
    )

    expect(getByText('Investor Agreement')).toBeTruthy()
  })

  it('renders Icons correctly', () => {
    render(
      <AgreementsAndDisclosuresView
        data={{
          ...individual,
          declarations: {
            ...individual.declarations,
            agreements: {
              investor: false,
              custody: true,
              disclosure: false
            }
          }
        }}
        isCorporateIssuerForm={false}
      />
    )

    expect(CloseIcon).toHaveBeenNthCalledWith(1, {}, {})
    expect(DoneIcon).toHaveBeenNthCalledWith(1, {}, {})
    expect(CloseIcon).toHaveBeenNthCalledWith(2, {}, {})
  })
})
