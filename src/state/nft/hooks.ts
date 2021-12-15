import { Web3Provider } from '@ethersproject/providers'
import NFT_CREATE_ABI from 'abis/nft-contract-create.json'
import axios from 'axios'
import NFT_BYTE_CODE from 'byte-code/nft-contract-byte-code.json'
import { useNftContract } from 'hooks/useContract'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from 'state'
import { wait } from 'utils/retry'
import { saveImages } from './actions'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Web3 = require('web3') // for some reason import Web3 from web3 didn't see eth module
export function useNFTState(): AppState['nft'] {
  return useSelector<AppState, AppState['nft']>((state) => state.nft)
}
export const useGetUserTokens = () => {
  // make api call to my-tokens
  const dispatch = useDispatch<AppDispatch>()
  const nft = useNftContract()

  return useCallback(async () => {
    const tokenIds = [2, 3]
    //
    console.log('gettting metadata')
    const promises = tokenIds.map(async (id: number) => {
      const uri = await nft?.tokenURI(Number(id))
      return uri
    })
    const uris = await Promise.all(promises)
    const metadataPromises = uris.map(async (uri: string) => {
      console.log({ uri })
      const json = await axios.get(uri)
      await wait(4000)
      return json.data
    })
    const jsons = await Promise.all(metadataPromises)
    dispatch(saveImages({ images: jsons, ids: tokenIds }))
    console.log({ jsons })
  }, [nft, dispatch])
}

export const useGetNftData = () => {
  const getUserTokens = useGetUserTokens()
  useEffect(() => {
    getUserTokens()
  }, [getUserTokens])
}

export const deployNFTCollection = async ({ address, library }: { address: string; library: Web3Provider }) => {
  try {
    const web3 = new Web3(library.provider)
    const contract = new web3.eth.Contract(NFT_CREATE_ABI)
    const myContract = contract
      .deploy({
        data: NFT_BYTE_CODE['byteCode'],
        arguments: [1000, 'RANDOM_NAME', 'IXSNFT'],
      })
      .encodeABI()

    const params = {
      from: address,
      gasLimit: Web3.utils.toHex('10000000'),
      gasPrice: Web3.utils.toHex(Web3.utils.toWei('30', 'gwei')),
      data: myContract,
    }

    const result = await library.getSigner().sendTransaction(params)
    const resp = await result.wait()
    console.log({ result, resp })
  } catch (e) {
    console.log({ e })
  }
}
