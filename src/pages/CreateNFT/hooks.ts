import { SupportedChainId } from 'constants/chains'
import { useNftContract } from 'hooks/useContract'
import { useActiveWeb3React } from 'hooks/web3'
import { useCallback, useState } from 'react'
import { FileWithPath } from 'react-dropzone'
import apiService from 'services/apiService'
import { nft } from 'services/apiUrls'
import { NFTCollection } from 'state/nft/types'
import { collections } from './mocks'
import { TraitType } from './types'

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
  const [collection, setCollection] = useState<NFTCollection | null>(collections[0])
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

export const createNftAsset = async (nft: any) => {
  const result = await apiService.post(nft.create, { amount, pairAddress, orderType, pairSymbol })
  return result.data
}
