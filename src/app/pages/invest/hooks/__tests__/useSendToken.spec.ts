import axios from 'axios'
import { BigNumber, ethers } from 'ethers'
import * as sendTokenFuns from '../useSendToken'

describe('estimateMaxGas', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('test gas estimate', async () => {
    jest.spyOn(axios, 'get').mockImplementation(
      async () =>
        new Promise(res =>
          res({
            data: {
              result: { rapidgaspricegwei: 50, standardgaspricegwei: 49 }
            }
          })
        )
    )
    await expect(sendTokenFuns.estimateGas()).resolves.toBe('49')
  })
})
describe('getTransferProps', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('generates correct props', async () => {
    await expect(sendTokenFuns.getTransferProps()).resolves.toEqual({
      gasLimit: BigNumber.from(9999999),
      gasPrice: ethers.utils.parseUnits('49', 'gwei')
    })
  })
})
