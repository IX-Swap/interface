import { cleanup } from 'test-utils'
import {
  getCorrectDirectionFilterValues,
  renderAmount,
  renderDirection,
  renderFromField,
  renderToField
} from 'app/pages/admin/components/VirtualTransactionsTable/utils'
import { virtualTransactionsItemSample } from '__fixtures__/virtualAccountsAudit'
import { formatMoney } from 'helpers/numbers'

describe('renderFromField', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('returns correct from value', () => {
    expect(
      renderFromField(
        virtualTransactionsItemSample.detail.debtorAccountNumber,
        virtualTransactionsItemSample
      )
    ).toEqual(
      `${virtualTransactionsItemSample.detail.debtorAccountNumber} (${virtualTransactionsItemSample.detail.debtorSwiftCode})`
    )
  })

  it('returns correct from value if debtorSwiftCode is undefined', () => {
    expect(
      renderFromField(
        virtualTransactionsItemSample.detail.debtorAccountNumber,
        {
          ...virtualTransactionsItemSample,
          detail: {
            ...virtualTransactionsItemSample.detail,
            debtorSwiftCode: undefined as any
          }
        }
      )
    ).toEqual(virtualTransactionsItemSample.detail.debtorAccountNumber)
  })

  it('returns correct from value if debtorSwiftCode is empty string', () => {
    expect(
      renderFromField(
        virtualTransactionsItemSample.detail.debtorAccountNumber,
        {
          ...virtualTransactionsItemSample,
          detail: {
            ...virtualTransactionsItemSample.detail,
            debtorSwiftCode: ''
          }
        }
      )
    ).toEqual(virtualTransactionsItemSample.detail.debtorAccountNumber)
  })

  it('returns correct from value if debtorAccountNumber is empty string', () => {
    expect(renderFromField('', virtualTransactionsItemSample)).toEqual('-')
  })

  it('returns correct from value if debtorAccountNumber is undefined', () => {
    expect(
      renderFromField(undefined as any, virtualTransactionsItemSample)
    ).toEqual('-')
  })
})

describe('renderToField', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('returns correct to value', () => {
    expect(
      renderToField(
        virtualTransactionsItemSample.detail.creditorAccountNumber,
        virtualTransactionsItemSample
      )
    ).toEqual(
      `${virtualTransactionsItemSample.detail.creditorAccountNumber} (${virtualTransactionsItemSample.detail.creditorSwiftCode})`
    )
  })

  it('returns correct to value if creditorSwiftCode is undefined', () => {
    expect(
      renderToField(
        virtualTransactionsItemSample.detail.creditorAccountNumber,
        {
          ...virtualTransactionsItemSample,
          detail: {
            ...virtualTransactionsItemSample.detail,
            creditorSwiftCode: undefined as any
          }
        }
      )
    ).toEqual(virtualTransactionsItemSample.detail.creditorAccountNumber)
  })

  it('returns correct to value if creditorSwiftCode is empty string', () => {
    expect(
      renderToField(
        virtualTransactionsItemSample.detail.creditorAccountNumber,
        {
          ...virtualTransactionsItemSample,
          detail: {
            ...virtualTransactionsItemSample.detail,
            creditorSwiftCode: ''
          }
        }
      )
    ).toEqual(virtualTransactionsItemSample.detail.creditorAccountNumber)
  })

  it('returns correct to value if creditorAccountNumber is empty string', () => {
    expect(renderToField('', virtualTransactionsItemSample)).toEqual('-')
  })

  it('returns correct to value if creditorAccountNumber is undefined', () => {
    expect(
      renderToField(undefined as any, virtualTransactionsItemSample)
    ).toEqual('-')
  })
})

describe('getCorrectDirectionFilterValues', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('returns correct value when transferDirection is undefined', () => {
    expect(getCorrectDirectionFilterValues(undefined)).toEqual(undefined)
  })

  it('returns correct value when transferDirection includes " to " ', () => {
    expect(getCorrectDirectionFilterValues('VA to VA')).toEqual('VA2VA')
  })

  it('returns correct value when transferDirection not includes " to " ', () => {
    expect(getCorrectDirectionFilterValues('Inbound')).toEqual('Inbound')
  })
})

describe('renderDirection', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('returns correct value when direction includes "2" ', () => {
    expect(renderDirection('VA2VA')).toEqual('VA to VA')
  })

  it('returns correct value when direction not includes "2" ', () => {
    expect(renderDirection('Inbound')).toEqual('Inbound')
  })
})

describe('renderAmount', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('returns correct value', () => {
    expect(
      renderAmount(
        virtualTransactionsItemSample.amount,
        virtualTransactionsItemSample
      )
    ).toEqual(
      formatMoney(
        virtualTransactionsItemSample.amount,
        virtualTransactionsItemSample.detail.currency
      )
    )
  })
})
