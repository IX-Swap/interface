import { renderCommitment } from 'app/pages/issuance/components/Commitments/columns'

describe('renderCommitment', () => {
  it('returns value with symbol', () => {
    expect(renderCommitment(123, 'SGD')).toEqual('SGD 123.00')
  })
})
