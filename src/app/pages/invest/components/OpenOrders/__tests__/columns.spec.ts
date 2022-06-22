import { render } from 'test-utils'
import { renderTicker } from 'helpers/tables'
import { renderMoney } from 'helpers/numbers'

describe('columns', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders renderTicker correctly', () => {
    const { getByText } = render(renderTicker('SYM/BOL', undefined))
    expect(getByText('SYM/BOL')).toBeTruthy()
  })

  it('renders renderMoney correctly', () => {
    const { getByText } = render(renderMoney(10000.21, undefined))
    expect(getByText('10,000.21')).toBeTruthy()
  })
})
