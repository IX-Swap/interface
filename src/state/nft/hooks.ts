import { t } from '@lingui/macro'
import NFT_CREATE_ABI from 'abis/nft-contract-create.json'
import axios from 'axios'
import NFT_BYTE_CODE from 'byte-code/nft-contract-byte-code.json'
import { SupportedChainId } from 'constants/chains'
import { useNftContract } from 'hooks/useContract'
import { useActiveWeb3React } from 'hooks/web3'
import { useCallback, useEffect, useState } from 'react'
import { FileWithPath } from 'react-dropzone'
import { useDispatch, useSelector } from 'react-redux'
import apiService from 'services/apiService'
import { nft } from 'services/apiUrls'
import { AppDispatch, AppState } from 'state'
import { useShowError } from 'state/application/hooks'
import { useAppDispatch } from 'state/hooks'
import { setCollections, setCollectionsLoading, setCreateNftLoading } from 'state/nft/actions'
import { NFTCollection, NftCreateProps, TraitType } from 'state/nft/types'
import { useTransactionAdder } from 'state/transactions/hooks'
import { wait } from 'utils/retry'
import { saveImages } from './actions'
import { CollectionCreateProps } from './types'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Web3 = require('web3') // for some reason import Web3 from web3 didn't see eth module

export const createNftCollection = async (collectionDto: CollectionCreateProps) => {
  const result = await apiService.post(nft.createCollection, collectionDto)
  return result.data
}

export const createNftAsset = async (nftDto: NftCreateProps) => {
  const { file, name, freeze, keyValues } = nftDto
  const formData = new FormData()
  formData.append('file', file, file.name)
  formData.append('name', name)
  formData.append('freeze', JSON.stringify(freeze))
  formData.append('keyValues', JSON.stringify(keyValues))
  const result = await apiService.post(nft.create, formData)
  return result.data
}

export const getCollections = async (address: string) => {
  const collections = await apiService.get(nft.getCollections(address))
  return collections
}

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

export const useDeployCollection = () => {
  const { account, library } = useActiveWeb3React()
  const addTransaction = useTransactionAdder()
  const showError = useShowError()
  return useCallback(
    async ({ name }: { name: string }) => {
      try {
        if (!account || !library) {
          return
        }
        const web3 = new Web3(library.provider)
        const contract = new web3.eth.Contract(NFT_CREATE_ABI)
        const myContract = contract
          .deploy({
            data: NFT_BYTE_CODE['byteCode'],
            arguments: [1000, 'IXS NFT', 'IXSNFT'],
          })
          .encodeABI()

        const params = {
          from: account,
          gasLimit: Web3.utils.toHex('10000000'),
          gasPrice: Web3.utils.toHex(Web3.utils.toWei('30', 'gwei')),
          data: myContract,
        }

        const result = await library.getSigner().sendTransaction(params)
        addTransaction(result, { summary: t`Created your ${name} collection successfully` })
        const resp = await result.wait()
        console.log({ result, resp })
      } catch (e) {
        showError(t`Could not create collection ${e?.message}`)
      }
    },
    [account, addTransaction, library, showError]
  )
}

export const useMint = () => {
  const nft = useNftContract()
  const { account } = useActiveWeb3React()
  return useCallback(async () => {
    const res = await nft?.mint(
      account,
      'https://gateway.pinata.cloud/ipfs/QmbXjjSG7ovdNhTkHu6VYYQ9hRf787tYBdSW6syKwm18WU',
      {
        gasLimit: 900000,
      }
    )
    const params = await res.wait()
    console.log({ res, params })
  }, [nft, account])
}

export const useGetSupply = () => {
  const nft = useNftContract()
  return useCallback(async () => {
    try {
      const res = await nft?.totalSupply()
      const uri = await nft?.tokenURI(2)
      console.log({ res, uri })
    } catch (e) {
      console.error('cant get uri or supply')
    }
  }, [nft])
}

export const useManageCreateForm = () => {
  const { chainId } = useActiveWeb3React()
  const [file, setFile] = useState<FileWithPath | null>(null)
  const [preview, setPreview] = useState<FileWithPath | null>(null)
  const [name, setName] = useState('')
  const [link, setLink] = useState('')
  const [freeze, setFreeze] = useState(false)
  const [collection, setCollection] = useState<NFTCollection | null>(null)
  const [description, setDescription] = useState('')
  const [activeTraitType, setActiveTraitType] = useState(TraitType.PROGRESS)
  const [properties, setProperties] = useState<Array<{ trait_type: string; value: string }>>([])
  const [levels, setLevels] = useState<Array<{ trait_type: string; value: number; max_value: number }>>([])
  const [stats, setStats] = useState<Array<{ trait_type: string; value: number; max_value: number }>>([])
  const [isNSFW, setIsNSFW] = useState(false)
  const [newCollectionName, setNewCollectionName] = useState('')
  const [selectedChain, setSelectedChain] = useState<SupportedChainId>(
    chainId ? (chainId as SupportedChainId) : SupportedChainId.MAINNET
  )
  return {
    file,
    setFile,
    preview,
    setPreview,
    name,
    setName,
    link,
    setLink,
    description,
    setDescription,
    activeTraitType,
    setActiveTraitType,
    properties,
    setProperties,
    levels,
    setLevels,
    stats,
    setStats,
    isNSFW,
    setIsNSFW,
    selectedChain,
    setSelectedChain,
    collection,
    setCollection,
    newCollectionName,
    setNewCollectionName,
    freeze,
    setFreeze,
  }
}

export const useCreateNft = () => {
  const dispatch = useAppDispatch()
  return useCallback(async (nftDto: NftCreateProps) => {
    try {
      dispatch(setCreateNftLoading({ loading: true }))
      const data = await createNftAsset(nftDto)
      console.log({ data })
      const newCID = data?.CID
      dispatch(setCreateNftLoading({ loading: false }))
      return `https://gateway.pinata.cloud/ipfs/${newCID}`
    } catch (e) {
      dispatch(setCreateNftLoading({ loading: false }))
      console.log({ e })
    }
  }, [])
}

export const useFetchMyCollections = () => {
  const dispatch = useAppDispatch()
  const { account } = useActiveWeb3React()
  return useCallback(async () => {
    if (!account) {
      return
    }
    try {
      dispatch(setCollectionsLoading({ loading: true }))
      const response = await getCollections(account)
      console.log({ response })
      const collections = response.data
      dispatch(setCollections({ collections }))
      dispatch(setCollectionsLoading({ loading: true }))
    } catch (e) {
      dispatch(setCollectionsLoading({ loading: true }))
      console.log({ e })
    }
  }, [account])
}
