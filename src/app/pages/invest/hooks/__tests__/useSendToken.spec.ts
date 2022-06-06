// import { act } from '@testing-library/react-hooks'
// import axios from 'axios'
import { BigNumber, ethers } from 'ethers'
// import { waitFor } from 'test-utils'
import * as sendTokenFuns from '../useSendToken'

// describe('estimateMaxGas', () => {
//   afterEach(async () => {
//     jest.clearAllMocks()
//   })

//   it('test gas estimate', async () => {
//     jest
//       .spyOn(axios, 'get')
//       .mockImplementation(
//         async () =>
//           new Promise(res =>
//             res({ data: { result: { rapidgaspricegwei: 50 } } })
//           )
//       )
//     await expect(sendTokenFuns.estimateMaxGas()).resolves.toBe('50')
//   })
// })
describe('getTransferProps', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('generates correct props', async () => {
    jest
      .spyOn(sendTokenFuns, 'estimateMaxGas')
      .mockImplementation(async () => new Promise(res => res(null)))
    await expect(sendTokenFuns.getTransferProps()).resolves.toEqual({
      gasLimit: BigNumber.from(9999999)
      // gasPrice: ethers.utils.parseUnits('50', 'gwei')
    })
  })
})
