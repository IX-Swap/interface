import { VOTING_ESCROW_ADDRESS } from 'constants/addresses'
import { useActiveWeb3React } from 'hooks/web3'
import { useReadContract, useReadContracts } from 'wagmi'
import VOTING_ESCROW_ABI from 'abis/voting-escrow.json'
import { BigNumber } from 'ethers'

const useLockReward = () => {
  const { account, chainId } = useActiveWeb3React()
  const _account = account?.toLowerCase()

  // @ts-ignore
  const { data: balanceOfData } = useReadContract({
    // @ts-ignore
    address: VOTING_ESCROW_ADDRESS[chainId],
    abi: VOTING_ESCROW_ABI,
    functionName: 'balanceOf',
    args: [_account],
    query: {
      enabled: !!_account,
    },
  })

  // iterate from 0 to balanceOfData
  // query ownerToNFTokenIdList function to get the list of NFTs owned by the user
  const nftContracts = []
  for (let i = 0; i < Number(balanceOfData); i++) {
    nftContracts.push({
      address: VOTING_ESCROW_ADDRESS[chainId],
      abi: VOTING_ESCROW_ABI,
      functionName: 'ownerToNFTokenIdList',
      args: [_account, i],
    })
  }
  // @ts-ignore
  const { data: nftData } = useReadContracts({
    // @ts-ignore
    contracts: nftContracts,
    query: {
      enabled: !!_account,
    },
  })
  // const nftIds = nftData?.map((data: BigNumber) => Number(data.result))
  // query nftInfo function to get the information of the NFTs

  console.log('balanceOfData', Number(balanceOfData))
  // console.log('nftIds', nftIds)

  return {
    // nftIds,
  }
}

export default useLockReward
