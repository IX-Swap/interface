import { renderHook } from '@testing-library/react-hooks'
import * as useErc20Contract from 'hooks/blockchain/useContract'
import { useCryptoBalance } from 'hooks/blockchain/useCryptoBalance'
import * as useActiveWeb3React from 'hooks/blockchain/web3'

describe('useCryptoBalance', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })
  const balanceOf = async () => await Promise.resolve({} as any)

  it('should render hook', () => {
    jest.spyOn(useActiveWeb3React, 'useActiveWeb3React').mockReturnValueOnce({
      account: '123345465464645',
      active: false
    } as any)
    jest.spyOn(useErc20Contract, 'useErc20Contract').mockImplementation(
      (address?: string, withSignerIfPossible?: boolean) =>
        ({
          balanceOf
        } as any)
    )
    const { result } = renderHook(() => useCryptoBalance('123456'))
    expect(result.current).toEqual(0)
  })
})
