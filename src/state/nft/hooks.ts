import { Description } from '@ethersproject/properties'
import { t } from '@lingui/macro'
import NFT_CREATE_ABI from 'abis/nft-contract-create.json'
import axios from 'axios'
import NFT_BYTE_CODE from 'byte-code/nft-contract-byte-code.json'
import { SupportedChainId } from 'constants/chains'
import { Contract } from 'ethers'
import { getNftContract, useNftContract } from 'hooks/useContract'
import { useActiveWeb3React } from 'hooks/web3'
import { useCallback, useEffect, useState } from 'react'
import { FileWithPath } from 'react-dropzone'
import { useDispatch, useSelector } from 'react-redux'
import apiService from 'services/apiService'
import { nft } from 'services/apiUrls'
import { AppDispatch, AppState } from 'state'
import { useShowError } from 'state/application/hooks'
import { useAppDispatch } from 'state/hooks'
import {
  setActiveTraitType,
  setCollection,
  setCollections,
  setCollectionsLoading,
  setCreateNftLoading,
  setDescription,
  setFile,
  setFreeze,
  setLevels,
  setLink,
  setName,
  setNewCollectionName,
  setNSFW,
  setPreview,
  setProperties,
  setSelectedContractAddress,
  setStats,
} from 'state/nft/actions'
import { AssetForm, NFTCollection, NftCreateProps, NumericTrait, Trait, TraitType } from 'state/nft/types'
import { useTransactionAdder } from 'state/transactions/hooks'
import { wait } from 'utils/retry'
import { saveImages } from './actions'
import { CollectionCreateProps } from './types'
import { groupKeyValues } from './utils'
import * as H from 'history'
import { exception } from 'react-ga'

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

// export const useGetUserTokens = () => {
//   // make api call to my-tokens
//   const dispatch = useDispatch<AppDispatch>()
//   const nft = useNftContract()

//   return useCallback(async () => {
//     const tokenIds = [2, 3]
//     //
//     console.log('gettting metadata')
//     const promises = tokenIds.map(async (id: number) => {
//       const uri = await nft?.tokenURI(Number(id))
//       return uri
//     })
//     const uris = await Promise.all(promises)
//     const metadataPromises = uris.map(async (uri: string) => {
//       console.log({ uri })
//       const json = await axios.get(uri)
//       await wait(4000)
//       return json.data
//     })
//     const jsons = await Promise.all(metadataPromises)
//     dispatch(saveImages({ images: jsons, ids: tokenIds }))
//     console.log({ jsons })
//   }, [nft, dispatch])
// }

// export const useGetNftData = () => {
//   const getUserTokens = useGetUserTokens()
//   useEffect(() => {
//     getUserTokens()
//   }, [getUserTokens])
// }

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
        console.log('Deploy contract')
        const web3 = new Web3(library.provider)
        const contract = new web3.eth.Contract(NFT_CREATE_ABI)
        const myContract = contract
          .deploy({
            data: NFT_BYTE_CODE['byteCode'],
            arguments: [1000, `IXS-${name}`, 'IXSNFT'],
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
        return resp?.contractAddress
      } catch (e) {
        showError(t`Could not create collection ${e?.message}`)
      }
    },
    [account, addTransaction, library, showError]
  )
}

export const mintNFT = async ({
  nft,
  account,
  assetURI,
}: {
  nft: Contract | null
  assetURI: string
  account?: string | null
}) => {
  const res = await nft?.mint(account, assetURI, {
    gasLimit: 900000,
  })
  const params = await res.wait()
  const status = params.status
  // mint transaction will have status 0 if fail and 1 if success
  return Boolean(status)
}

export const useGetNFTDetails = (contractAddress?: string, itemId?: number) => {
  const nft = useNftContract(contractAddress)
  return useCallback(async () => {
    try {
      if (!nft || itemId === undefined) {
        return null
      }
      const URI = await nft?.tokenURI(itemId)
      const json = await axios.get(URI)
      const data = json.data
      return data
    } catch (e) {
      console.error('cant get uri')
    }
  }, [nft, itemId])
}

export function useAssetFormState(): AppState['assetForm'] {
  return useSelector<AppState, AppState['assetForm']>((state) => state.assetForm)
}

export function useCreateAssetActionHandlers(): {
  onSelectFile: (file: FileWithPath | null) => void
  onSelectPreview: (file: FileWithPath | null) => void
  onSetName: (name: string) => void
  onSetLink: (link: string) => void
  onSetFreeze: (freeze: boolean) => void
  onSetDescription: (description: string) => void
  onSetActiveTraitType: (trait: TraitType) => void
  onSetProperties: (properties: Array<Trait>) => void
  onSetLevels: (levels: Array<NumericTrait>) => void
  onSetStats: (stats: Array<NumericTrait>) => void
  onSetIsNSFW: (isNSFW: boolean) => void
  onSetCollection: (collection: NFTCollection | null) => void
  onSetNewCollectionName: (name: string) => void
  onSetActiveContractAddress: (address: string) => void
} {
  const dispatch = useDispatch<AppDispatch>()

  const onSelectFile = useCallback(
    (file: FileWithPath | null) => {
      dispatch(setFile({ file }))
    },
    [dispatch]
  )
  const onSelectPreview = useCallback(
    (file: FileWithPath | null) => {
      dispatch(setPreview({ file }))
    },
    [dispatch]
  )
  const onSetName = useCallback(
    (name: string) => {
      dispatch(setName({ name }))
    },
    [dispatch]
  )
  const onSetLink = useCallback(
    (link: string) => {
      dispatch(setLink({ link }))
    },
    [dispatch]
  )
  const onSetFreeze = useCallback(
    (freeze: boolean) => {
      dispatch(setFreeze({ freeze }))
    },
    [dispatch]
  )
  const onSetDescription = useCallback(
    (description: string) => {
      dispatch(setDescription({ description }))
    },
    [dispatch]
  )
  const onSetActiveTraitType = useCallback(
    (trait: TraitType) => {
      dispatch(setActiveTraitType({ trait }))
    },
    [dispatch]
  )
  const onSetProperties = useCallback(
    (properties: Array<Trait>) => {
      dispatch(setProperties({ properties }))
    },
    [dispatch]
  )
  const onSetLevels = useCallback(
    (levels: Array<NumericTrait>) => {
      dispatch(setLevels({ levels }))
    },
    [dispatch]
  )
  const onSetStats = useCallback(
    (stats: Array<NumericTrait>) => {
      dispatch(setStats({ stats }))
    },
    [dispatch]
  )
  const onSetIsNSFW = useCallback(
    (isNSFW: boolean) => {
      dispatch(setNSFW({ isNSFW }))
    },
    [dispatch]
  )
  const onSetCollection = useCallback(
    (collection: NFTCollection | null) => {
      dispatch(setCollection({ collection }))
    },
    [dispatch]
  )
  const onSetNewCollectionName = useCallback(
    (name: string) => {
      dispatch(setNewCollectionName({ name }))
    },
    [dispatch]
  )
  const onSetActiveContractAddress = useCallback(
    (address: string) => {
      dispatch(setSelectedContractAddress({ address }))
    },
    [dispatch]
  )
  return {
    onSelectFile,
    onSelectPreview,
    onSetName,
    onSetLink,
    onSetFreeze,
    onSetDescription,
    onSetActiveTraitType,
    onSetProperties,
    onSetLevels,
    onSetStats,
    onSetIsNSFW,
    onSetCollection,
    onSetNewCollectionName,
    onSetActiveContractAddress,
  }
}

export const useCreateNft = () => {
  const dispatch = useAppDispatch()
  return useCallback(async (nftDto: NftCreateProps) => {
    try {
      dispatch(setCreateNftLoading({ loading: true }))
      const data = await createNftAsset(nftDto)
      console.log({ data })
      const assetURI = data?.metaUrl
      dispatch(setCreateNftLoading({ loading: false }))
      return assetURI
    } catch (e) {
      dispatch(setCreateNftLoading({ loading: false }))
      throw e
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
      console.log({ collections })
      dispatch(setCollections({ collections }))
      dispatch(setCollectionsLoading({ loading: true }))
    } catch (e) {
      dispatch(setCollectionsLoading({ loading: true }))
      console.log({ e })
    }
  }, [account])
}

const getCreateNftDto = ({
  name,
  file,
  freeze,
  description,
  link,
  properties,
  stats,
  levels,
  isNSFW,
}: AssetForm): NftCreateProps | null => {
  if (!name || !file) {
    return null
  }
  const dto: NftCreateProps = {
    file,
    name,
    keyValues: groupKeyValues({ description, link, properties, stats, levels, isNSFW }),
  }
  if (freeze) {
    dto.freeze = freeze
  }
  return dto
}

export const useCreateNftAssetForm = (history: H.History) => {
  const deployCollection = useDeployCollection()
  const createNFTAsset = useCreateNft()
  const form = useAssetFormState()
  const { collection, newCollectionName } = form
  const { library, account, chainId } = useActiveWeb3React()
  const { onSetActiveContractAddress } = useCreateAssetActionHandlers()
  return useCallback(async () => {
    try {
      // first we create the asset on backend (uploading all files, etc, and get an assetUri)
      const nftDto = getCreateNftDto(form)
      if (!nftDto) {
        return
      }
      const assetURI = await createNFTAsset(nftDto)
      // end creating asset

      // we create a contract instance either with the selected collection, or we create a new one on the spot
      let contractInstance
      let contractAddress
      //this is contract instance with test contract created by me
      // const contractInstance = getNftContract({
      //   addressOrAddressMap: '0xadc2e42d74f57028d7be2da41ba9643bdb70d99b',
      //   library,
      //   account,
      //   chainId,
      // })
      if (collection) {
        contractInstance = getNftContract({ addressOrAddressMap: collection?.address, library, account, chainId })
        contractAddress = collection.address
      } else {
        if (newCollectionName) {
          const newContractAddress = await deployCollection({ name: newCollectionName })
          contractAddress = newContractAddress
          if (contractAddress) {
            contractInstance = getNftContract({ addressOrAddressMap: contractAddress, library, account, chainId })
            await createNftCollection({ name: newCollectionName, address: contractAddress })
          }
        }
      }
      // end getting contract instance
      if (contractInstance) {
        await mintNFT({ nft: contractInstance, account, assetURI })
        const supply = await contractInstance?.getTokenId()
        console.log({ supply })
        // supply shows how many. index starts at 0
        history.push(`/nft/collections/${contractAddress}/${supply - 1}`)
        //redirect to individual asset page
      }
    } catch (e) {
      console.log({ e })
      throw new Error('An error occured when creating NFT')
    }
  }, [account, chainId, collection, createNFTAsset, deployCollection, form, library, , history, newCollectionName])
}
