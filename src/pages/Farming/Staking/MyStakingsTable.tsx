import React, { useEffect } from 'react'
import { t, Trans } from '@lingui/macro'
import styled from 'styled-components'
import dayjs from 'dayjs'

import { Table, BodyRow, HeaderRow } from 'components/Table'
import { useAdminState, useGetKycList, useGetMe } from 'state/admin/hooks'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { shortenAddress } from 'utils'
import { Box } from 'rebass'

import { TYPE } from 'theme'

const items = [
  {
    id: 80,
    status: 'approved',
    userId: 3,
    message: null,
    tokenId: 17,
    custodianApplicationId: null,
    kyc: {
      url: 'https://securer-storage-uat.s3.eu-west-1.amazonaws.com/fake_kyc.png',
    },
    brokerDealerId: 1,
    custodianId: 1,
    createdAt: '2021-08-28T14:40:34.000Z',
    updatedAt: '2021-08-28T14:41:05.000Z',
    deletedAt: null,
    user: {
      principal: 'root/user',
      id: 3,
      email: null,
      tenant: 'root',
      language: 'en',
      role: 'user',
      active: true,
      ethAddress: '0x2966adb1f526069cacac849fdd00c41334652238',
      photoId: null,
      createdAt: '2021-07-16T08:23:44.000Z',
      updatedAt: '2021-07-20T08:37:21.000Z',
      deletedAt: null,
      photo: null,
    },
    token: {
      id: 17,
      name: 'wAAVE',
      symbol: 'wAAVE',
      status: 'approved',
      network: 'ethereum',
      platformId: 2,
      description:
        'Aave is an open source and non-custodial liquidity protocol for earning interest on deposits and borrowing assets.',
      logoId: null,
      address: '0x874Fbc8394A2485979DF7612Bb4bE670dE50fae2',
      decimals: 18,
      ethTransactionId: 2403,
      chainId: 42,
      lastBlockNumber: 26958774,
      custodyVaultId: 'Default',
      custodyAssetId: 'AAVE_AQ_KOVAN',
      custodyAssetAddress: '0x8eC74c3B5d61d7f64b7eB267587709BAb4C0C737',
      createdAt: '2021-08-25T12:00:12.000Z',
      updatedAt: '2021-08-27T11:10:01.000Z',
      deletedAt: null,
    },
    custodian: {
      id: 1,
      name: 'First digital',
      website: 'https://1stdigital.com/',
      description:
        'It starts with an idea: the solution to asset safety and management for digital assets already exists. It’s trusts and custody. But no-one knows how to apply it to a new, fast-moving and entirely digital asset class. First Digital Trust was built out of this realization in 2017, under the umbrella of First Digital Trust Limited. We brought together skills from the traditional financial world and knowledge of the digital assets economy to offer open finance solutions. After spinning off and becoming our own company in 2019, First Digital Trust became a fully independent public trust company headquartered in Hong Kong.',
      logoId: null,
      createdAt: '2021-08-17T12:20:01.000Z',
      updatedAt: '2021-08-27T08:28:41.000Z',
      deletedAt: null,
    },
    brokerDealer: {
      id: 1,
      name: 'IX Prime',
      website: 'https://www.infinox.com/',
      description:
        'Trading the financial markets carries a high degree of risk. This risk is increased when trading on margin. The products and services offered on our website, in all IX Prime communications and any other IX Prime promotional materials are for professional clients and eligible counterparties clients only, who are deemed to be aware and accept the risks of trading using margin.',
      logoId: null,
      createdAt: '2021-08-17T12:19:05.000Z',
      updatedAt: '2021-08-17T12:19:05.000Z',
      deletedAt: null,
    },
  },
  {
    id: 79,
    status: 'approved',
    userId: 3,
    message: null,
    tokenId: 16,
    custodianApplicationId: null,
    kyc: {
      url: 'https://securer-storage-uat.s3.eu-west-1.amazonaws.com/fake_kyc.png',
    },
    brokerDealerId: 1,
    custodianId: 1,
    createdAt: '2021-08-28T14:40:01.000Z',
    updatedAt: '2021-08-28T14:41:04.000Z',
    deletedAt: null,
    user: {
      principal: 'root/user',
      id: 3,
      email: null,
      tenant: 'root',
      language: 'en',
      role: 'user',
      active: true,
      ethAddress: '0x2966adb1f526069cacac849fdd00c41334652238',
      photoId: null,
      createdAt: '2021-07-16T08:23:44.000Z',
      updatedAt: '2021-07-20T08:37:21.000Z',
      deletedAt: null,
      photo: null,
    },
    token: {
      id: 16,
      name: 'wLink',
      symbol: 'wLink',
      status: 'approved',
      network: 'ethereum',
      platformId: 2,
      description: 'Chainlink is a decentralized blockchain oracle network built on Ethereum.',
      logoId: null,
      address: '0xe491654Fe53FE5186e141EEB8A6051EC8C90A6a1',
      decimals: 18,
      ethTransactionId: 2400,
      chainId: 42,
      lastBlockNumber: 26960720,
      custodyVaultId: 'Default',
      custodyAssetId: 'LINK_AQ_KOVAN',
      custodyAssetAddress: '0x8eC74c3B5d61d7f64b7eB267587709BAb4C0C737',
      createdAt: '2021-08-23T09:30:45.000Z',
      updatedAt: '2021-08-27T14:25:01.000Z',
      deletedAt: null,
    },
    custodian: {
      id: 1,
      name: 'First digital',
      website: 'https://1stdigital.com/',
      description:
        'It starts with an idea: the solution to asset safety and management for digital assets already exists. It’s trusts and custody. But no-one knows how to apply it to a new, fast-moving and entirely digital asset class. First Digital Trust was built out of this realization in 2017, under the umbrella of First Digital Trust Limited. We brought together skills from the traditional financial world and knowledge of the digital assets economy to offer open finance solutions. After spinning off and becoming our own company in 2019, First Digital Trust became a fully independent public trust company headquartered in Hong Kong.',
      logoId: null,
      createdAt: '2021-08-17T12:20:01.000Z',
      updatedAt: '2021-08-27T08:28:41.000Z',
      deletedAt: null,
    },
    brokerDealer: {
      id: 1,
      name: 'IX Prime',
      website: 'https://www.infinox.com/',
      description:
        'Trading the financial markets carries a high degree of risk. This risk is increased when trading on margin. The products and services offered on our website, in all IX Prime communications and any other IX Prime promotional materials are for professional clients and eligible counterparties clients only, who are deemed to be aware and accept the risks of trading using margin.',
      logoId: null,
      createdAt: '2021-08-17T12:19:05.000Z',
      updatedAt: '2021-08-17T12:19:05.000Z',
      deletedAt: null,
    },
  },
  {
    id: 77,
    status: 'approved',
    userId: 8,
    message: null,
    tokenId: 17,
    custodianApplicationId: null,
    kyc: {
      url: 'https://securer-storage-uat.s3.eu-west-1.amazonaws.com/fake_kyc.png',
    },
    brokerDealerId: 1,
    custodianId: 1,
    createdAt: '2021-08-28T07:27:47.000Z',
    updatedAt: '2021-08-28T14:40:05.000Z',
    deletedAt: null,
    user: {
      principal: 'root/user',
      id: 8,
      email: null,
      tenant: 'root',
      language: 'en',
      role: 'user',
      active: true,
      ethAddress: '0x78140b507ca3cca6a2174d8eb5a642f36ebc4051',
      photoId: null,
      createdAt: '2021-07-21T06:00:37.000Z',
      updatedAt: '2021-07-21T06:02:29.000Z',
      deletedAt: null,
      photo: null,
    },
    token: {
      id: 17,
      name: 'wAAVE',
      symbol: 'wAAVE',
      status: 'approved',
      network: 'ethereum',
      platformId: 2,
      description:
        'Aave is an open source and non-custodial liquidity protocol for earning interest on deposits and borrowing assets.',
      logoId: null,
      address: '0x874Fbc8394A2485979DF7612Bb4bE670dE50fae2',
      decimals: 18,
      ethTransactionId: 2403,
      chainId: 42,
      lastBlockNumber: 26958774,
      custodyVaultId: 'Default',
      custodyAssetId: 'AAVE_AQ_KOVAN',
      custodyAssetAddress: '0x8eC74c3B5d61d7f64b7eB267587709BAb4C0C737',
      createdAt: '2021-08-25T12:00:12.000Z',
      updatedAt: '2021-08-27T11:10:01.000Z',
      deletedAt: null,
    },
    custodian: {
      id: 1,
      name: 'First digital',
      website: 'https://1stdigital.com/',
      description:
        'It starts with an idea: the solution to asset safety and management for digital assets already exists. It’s trusts and custody. But no-one knows how to apply it to a new, fast-moving and entirely digital asset class. First Digital Trust was built out of this realization in 2017, under the umbrella of First Digital Trust Limited. We brought together skills from the traditional financial world and knowledge of the digital assets economy to offer open finance solutions. After spinning off and becoming our own company in 2019, First Digital Trust became a fully independent public trust company headquartered in Hong Kong.',
      logoId: null,
      createdAt: '2021-08-17T12:20:01.000Z',
      updatedAt: '2021-08-27T08:28:41.000Z',
      deletedAt: null,
    },
    brokerDealer: {
      id: 1,
      name: 'IX Prime',
      website: 'https://www.infinox.com/',
      description:
        'Trading the financial markets carries a high degree of risk. This risk is increased when trading on margin. The products and services offered on our website, in all IX Prime communications and any other IX Prime promotional materials are for professional clients and eligible counterparties clients only, who are deemed to be aware and accept the risks of trading using margin.',
      logoId: null,
      createdAt: '2021-08-17T12:19:05.000Z',
      updatedAt: '2021-08-17T12:19:05.000Z',
      deletedAt: null,
    },
  },
  {
    id: 76,
    status: 'new',
    userId: 31,
    message: null,
    tokenId: 18,
    custodianApplicationId: null,
    kyc: {
      url: 'https://securer-storage-uat.s3.eu-west-1.amazonaws.com/fake_kyc.png',
    },
    brokerDealerId: 1,
    custodianId: 1,
    createdAt: '2021-08-28T07:12:34.000Z',
    updatedAt: '2021-08-28T07:12:34.000Z',
    deletedAt: null,
    user: {
      principal: 'root/user',
      id: 31,
      email: null,
      tenant: 'root',
      language: 'en',
      role: 'user',
      active: true,
      ethAddress: '0xd8e06bf1410b8f9e5086df10d6ab0cdff48126a6',
      photoId: null,
      createdAt: '2021-08-19T13:56:48.000Z',
      updatedAt: '2021-08-19T13:56:50.000Z',
      deletedAt: null,
      photo: null,
    },
    token: {
      id: 18,
      name: 'wYFI',
      symbol: 'wYFI',
      status: 'approved',
      network: 'ethereum',
      platformId: 2,
      description:
        'Yearn.finance is an aggregator service for decentralized finance (DeFi) investors, using automation to allow them to maximize profits from yield farming.',
      logoId: null,
      address: '0x4e53f169134d505325d25c2eE742e1F36850FD8b',
      decimals: 18,
      ethTransactionId: 2404,
      chainId: 42,
      lastBlockNumber: 26931011,
      custodyVaultId: 'Default',
      custodyAssetId: 'YFI_AQ_KOVAN',
      custodyAssetAddress: '0x8eC74c3B5d61d7f64b7eB267587709BAb4C0C737',
      createdAt: '2021-08-25T12:44:51.000Z',
      updatedAt: '2021-08-25T12:50:02.000Z',
      deletedAt: null,
    },
    custodian: {
      id: 1,
      name: 'First digital',
      website: 'https://1stdigital.com/',
      description:
        'It starts with an idea: the solution to asset safety and management for digital assets already exists. It’s trusts and custody. But no-one knows how to apply it to a new, fast-moving and entirely digital asset class. First Digital Trust was built out of this realization in 2017, under the umbrella of First Digital Trust Limited. We brought together skills from the traditional financial world and knowledge of the digital assets economy to offer open finance solutions. After spinning off and becoming our own company in 2019, First Digital Trust became a fully independent public trust company headquartered in Hong Kong.',
      logoId: null,
      createdAt: '2021-08-17T12:20:01.000Z',
      updatedAt: '2021-08-27T08:28:41.000Z',
      deletedAt: null,
    },
    brokerDealer: {
      id: 1,
      name: 'IX Prime',
      website: 'https://www.infinox.com/',
      description:
        'Trading the financial markets carries a high degree of risk. This risk is increased when trading on margin. The products and services offered on our website, in all IX Prime communications and any other IX Prime promotional materials are for professional clients and eligible counterparties clients only, who are deemed to be aware and accept the risks of trading using margin.',
      logoId: null,
      createdAt: '2021-08-17T12:19:05.000Z',
      updatedAt: '2021-08-17T12:19:05.000Z',
      deletedAt: null,
    },
  },
  {
    id: 75,
    status: 'new',
    userId: 31,
    message: null,
    tokenId: 16,
    custodianApplicationId: null,
    kyc: {
      url: 'https://securer-storage-uat.s3.eu-west-1.amazonaws.com/fake_kyc.png',
    },
    brokerDealerId: 1,
    custodianId: 1,
    createdAt: '2021-08-28T07:12:28.000Z',
    updatedAt: '2021-08-28T07:12:28.000Z',
    deletedAt: null,
    user: {
      principal: 'root/user',
      id: 31,
      email: null,
      tenant: 'root',
      language: 'en',
      role: 'user',
      active: true,
      ethAddress: '0xd8e06bf1410b8f9e5086df10d6ab0cdff48126a6',
      photoId: null,
      createdAt: '2021-08-19T13:56:48.000Z',
      updatedAt: '2021-08-19T13:56:50.000Z',
      deletedAt: null,
      photo: null,
    },
    token: {
      id: 16,
      name: 'wLink',
      symbol: 'wLink',
      status: 'approved',
      network: 'ethereum',
      platformId: 2,
      description: 'Chainlink is a decentralized blockchain oracle network built on Ethereum.',
      logoId: null,
      address: '0xe491654Fe53FE5186e141EEB8A6051EC8C90A6a1',
      decimals: 18,
      ethTransactionId: 2400,
      chainId: 42,
      lastBlockNumber: 26960720,
      custodyVaultId: 'Default',
      custodyAssetId: 'LINK_AQ_KOVAN',
      custodyAssetAddress: '0x8eC74c3B5d61d7f64b7eB267587709BAb4C0C737',
      createdAt: '2021-08-23T09:30:45.000Z',
      updatedAt: '2021-08-27T14:25:01.000Z',
      deletedAt: null,
    },
    custodian: {
      id: 1,
      name: 'First digital',
      website: 'https://1stdigital.com/',
      description:
        'It starts with an idea: the solution to asset safety and management for digital assets already exists. It’s trusts and custody. But no-one knows how to apply it to a new, fast-moving and entirely digital asset class. First Digital Trust was built out of this realization in 2017, under the umbrella of First Digital Trust Limited. We brought together skills from the traditional financial world and knowledge of the digital assets economy to offer open finance solutions. After spinning off and becoming our own company in 2019, First Digital Trust became a fully independent public trust company headquartered in Hong Kong.',
      logoId: null,
      createdAt: '2021-08-17T12:20:01.000Z',
      updatedAt: '2021-08-27T08:28:41.000Z',
      deletedAt: null,
    },
    brokerDealer: {
      id: 1,
      name: 'IX Prime',
      website: 'https://www.infinox.com/',
      description:
        'Trading the financial markets carries a high degree of risk. This risk is increased when trading on margin. The products and services offered on our website, in all IX Prime communications and any other IX Prime promotional materials are for professional clients and eligible counterparties clients only, who are deemed to be aware and accept the risks of trading using margin.',
      logoId: null,
      createdAt: '2021-08-17T12:19:05.000Z',
      updatedAt: '2021-08-17T12:19:05.000Z',
      deletedAt: null,
    },
  },
  {
    id: 74,
    status: 'new',
    userId: 31,
    message: null,
    tokenId: 17,
    custodianApplicationId: null,
    kyc: {
      url: 'https://securer-storage-uat.s3.eu-west-1.amazonaws.com/fake_kyc.png',
    },
    brokerDealerId: 1,
    custodianId: 1,
    createdAt: '2021-08-28T07:12:21.000Z',
    updatedAt: '2021-08-28T07:12:21.000Z',
    deletedAt: null,
    user: {
      principal: 'root/user',
      id: 31,
      email: null,
      tenant: 'root',
      language: 'en',
      role: 'user',
      active: true,
      ethAddress: '0xd8e06bf1410b8f9e5086df10d6ab0cdff48126a6',
      photoId: null,
      createdAt: '2021-08-19T13:56:48.000Z',
      updatedAt: '2021-08-19T13:56:50.000Z',
      deletedAt: null,
      photo: null,
    },
    token: {
      id: 17,
      name: 'wAAVE',
      symbol: 'wAAVE',
      status: 'approved',
      network: 'ethereum',
      platformId: 2,
      description:
        'Aave is an open source and non-custodial liquidity protocol for earning interest on deposits and borrowing assets.',
      logoId: null,
      address: '0x874Fbc8394A2485979DF7612Bb4bE670dE50fae2',
      decimals: 18,
      ethTransactionId: 2403,
      chainId: 42,
      lastBlockNumber: 26958774,
      custodyVaultId: 'Default',
      custodyAssetId: 'AAVE_AQ_KOVAN',
      custodyAssetAddress: '0x8eC74c3B5d61d7f64b7eB267587709BAb4C0C737',
      createdAt: '2021-08-25T12:00:12.000Z',
      updatedAt: '2021-08-27T11:10:01.000Z',
      deletedAt: null,
    },
    custodian: {
      id: 1,
      name: 'First digital',
      website: 'https://1stdigital.com/',
      description:
        'It starts with an idea: the solution to asset safety and management for digital assets already exists. It’s trusts and custody. But no-one knows how to apply it to a new, fast-moving and entirely digital asset class. First Digital Trust was built out of this realization in 2017, under the umbrella of First Digital Trust Limited. We brought together skills from the traditional financial world and knowledge of the digital assets economy to offer open finance solutions. After spinning off and becoming our own company in 2019, First Digital Trust became a fully independent public trust company headquartered in Hong Kong.',
      logoId: null,
      createdAt: '2021-08-17T12:20:01.000Z',
      updatedAt: '2021-08-27T08:28:41.000Z',
      deletedAt: null,
    },
    brokerDealer: {
      id: 1,
      name: 'IX Prime',
      website: 'https://www.infinox.com/',
      description:
        'Trading the financial markets carries a high degree of risk. This risk is increased when trading on margin. The products and services offered on our website, in all IX Prime communications and any other IX Prime promotional materials are for professional clients and eligible counterparties clients only, who are deemed to be aware and accept the risks of trading using margin.',
      logoId: null,
      createdAt: '2021-08-17T12:19:05.000Z',
      updatedAt: '2021-08-17T12:19:05.000Z',
      deletedAt: null,
    },
  },
  {
    id: 71,
    status: 'approved',
    userId: 3,
    message: null,
    tokenId: 18,
    custodianApplicationId: null,
    kyc: {
      url: 'https://securer-storage-uat.s3.eu-west-1.amazonaws.com/fake_kyc.png',
    },
    brokerDealerId: 1,
    custodianId: 1,
    createdAt: '2021-08-28T06:54:39.000Z',
    updatedAt: '2021-08-28T06:56:06.000Z',
    deletedAt: null,
    user: {
      principal: 'root/user',
      id: 3,
      email: null,
      tenant: 'root',
      language: 'en',
      role: 'user',
      active: true,
      ethAddress: '0x2966adb1f526069cacac849fdd00c41334652238',
      photoId: null,
      createdAt: '2021-07-16T08:23:44.000Z',
      updatedAt: '2021-07-20T08:37:21.000Z',
      deletedAt: null,
      photo: null,
    },
    token: {
      id: 18,
      name: 'wYFI',
      symbol: 'wYFI',
      status: 'approved',
      network: 'ethereum',
      platformId: 2,
      description:
        'Yearn.finance is an aggregator service for decentralized finance (DeFi) investors, using automation to allow them to maximize profits from yield farming.',
      logoId: null,
      address: '0x4e53f169134d505325d25c2eE742e1F36850FD8b',
      decimals: 18,
      ethTransactionId: 2404,
      chainId: 42,
      lastBlockNumber: 26931011,
      custodyVaultId: 'Default',
      custodyAssetId: 'YFI_AQ_KOVAN',
      custodyAssetAddress: '0x8eC74c3B5d61d7f64b7eB267587709BAb4C0C737',
      createdAt: '2021-08-25T12:44:51.000Z',
      updatedAt: '2021-08-25T12:50:02.000Z',
      deletedAt: null,
    },
    custodian: {
      id: 1,
      name: 'First digital',
      website: 'https://1stdigital.com/',
      description:
        'It starts with an idea: the solution to asset safety and management for digital assets already exists. It’s trusts and custody. But no-one knows how to apply it to a new, fast-moving and entirely digital asset class. First Digital Trust was built out of this realization in 2017, under the umbrella of First Digital Trust Limited. We brought together skills from the traditional financial world and knowledge of the digital assets economy to offer open finance solutions. After spinning off and becoming our own company in 2019, First Digital Trust became a fully independent public trust company headquartered in Hong Kong.',
      logoId: null,
      createdAt: '2021-08-17T12:20:01.000Z',
      updatedAt: '2021-08-27T08:28:41.000Z',
      deletedAt: null,
    },
    brokerDealer: {
      id: 1,
      name: 'IX Prime',
      website: 'https://www.infinox.com/',
      description:
        'Trading the financial markets carries a high degree of risk. This risk is increased when trading on margin. The products and services offered on our website, in all IX Prime communications and any other IX Prime promotional materials are for professional clients and eligible counterparties clients only, who are deemed to be aware and accept the risks of trading using margin.',
      logoId: null,
      createdAt: '2021-08-17T12:19:05.000Z',
      updatedAt: '2021-08-17T12:19:05.000Z',
      deletedAt: null,
    },
  },
  {
    id: 70,
    status: 'approved',
    userId: 30,
    message: 'Your KYC was rejected. Please contact us if you have any questions.',
    tokenId: 17,
    custodianApplicationId: null,
    kyc: {
      url: 'https://securer-storage-uat.s3.eu-west-1.amazonaws.com/fake_kyc.png',
    },
    brokerDealerId: 1,
    custodianId: 1,
    createdAt: '2021-08-28T06:36:48.000Z',
    updatedAt: '2021-08-28T06:59:09.000Z',
    deletedAt: null,
    user: {
      principal: 'root/admin',
      id: 30,
      email: null,
      tenant: 'root',
      language: 'en',
      role: 'admin',
      active: true,
      ethAddress: '0xa531828f6d8a534c6094839ed172c4e60bcd0fce',
      photoId: null,
      createdAt: '2021-08-19T12:19:09.000Z',
      updatedAt: '2021-08-19T12:19:22.000Z',
      deletedAt: null,
      photo: null,
    },
    token: {
      id: 17,
      name: 'wAAVE',
      symbol: 'wAAVE',
      status: 'approved',
      network: 'ethereum',
      platformId: 2,
      description:
        'Aave is an open source and non-custodial liquidity protocol for earning interest on deposits and borrowing assets.',
      logoId: null,
      address: '0x874Fbc8394A2485979DF7612Bb4bE670dE50fae2',
      decimals: 18,
      ethTransactionId: 2403,
      chainId: 42,
      lastBlockNumber: 26958774,
      custodyVaultId: 'Default',
      custodyAssetId: 'AAVE_AQ_KOVAN',
      custodyAssetAddress: '0x8eC74c3B5d61d7f64b7eB267587709BAb4C0C737',
      createdAt: '2021-08-25T12:00:12.000Z',
      updatedAt: '2021-08-27T11:10:01.000Z',
      deletedAt: null,
    },
    custodian: {
      id: 1,
      name: 'First digital',
      website: 'https://1stdigital.com/',
      description:
        'It starts with an idea: the solution to asset safety and management for digital assets already exists. It’s trusts and custody. But no-one knows how to apply it to a new, fast-moving and entirely digital asset class. First Digital Trust was built out of this realization in 2017, under the umbrella of First Digital Trust Limited. We brought together skills from the traditional financial world and knowledge of the digital assets economy to offer open finance solutions. After spinning off and becoming our own company in 2019, First Digital Trust became a fully independent public trust company headquartered in Hong Kong.',
      logoId: null,
      createdAt: '2021-08-17T12:20:01.000Z',
      updatedAt: '2021-08-27T08:28:41.000Z',
      deletedAt: null,
    },
    brokerDealer: {
      id: 1,
      name: 'IX Prime',
      website: 'https://www.infinox.com/',
      description:
        'Trading the financial markets carries a high degree of risk. This risk is increased when trading on margin. The products and services offered on our website, in all IX Prime communications and any other IX Prime promotional materials are for professional clients and eligible counterparties clients only, who are deemed to be aware and accept the risks of trading using margin.',
      logoId: null,
      createdAt: '2021-08-17T12:19:05.000Z',
      updatedAt: '2021-08-17T12:19:05.000Z',
      deletedAt: null,
    },
  },
  {
    id: 64,
    status: 'approved',
    userId: 8,
    message: null,
    tokenId: 16,
    custodianApplicationId: null,
    kyc: {
      url: 'https://securer-storage-uat.s3.eu-west-1.amazonaws.com/fake_kyc.png',
    },
    brokerDealerId: 1,
    custodianId: 1,
    createdAt: '2021-08-27T14:20:46.000Z',
    updatedAt: '2021-08-27T14:21:09.000Z',
    deletedAt: null,
    user: {
      principal: 'root/user',
      id: 8,
      email: null,
      tenant: 'root',
      language: 'en',
      role: 'user',
      active: true,
      ethAddress: '0x78140b507ca3cca6a2174d8eb5a642f36ebc4051',
      photoId: null,
      createdAt: '2021-07-21T06:00:37.000Z',
      updatedAt: '2021-07-21T06:02:29.000Z',
      deletedAt: null,
      photo: null,
    },
    token: {
      id: 16,
      name: 'wLink',
      symbol: 'wLink',
      status: 'approved',
      network: 'ethereum',
      platformId: 2,
      description: 'Chainlink is a decentralized blockchain oracle network built on Ethereum.',
      logoId: null,
      address: '0xe491654Fe53FE5186e141EEB8A6051EC8C90A6a1',
      decimals: 18,
      ethTransactionId: 2400,
      chainId: 42,
      lastBlockNumber: 26960720,
      custodyVaultId: 'Default',
      custodyAssetId: 'LINK_AQ_KOVAN',
      custodyAssetAddress: '0x8eC74c3B5d61d7f64b7eB267587709BAb4C0C737',
      createdAt: '2021-08-23T09:30:45.000Z',
      updatedAt: '2021-08-27T14:25:01.000Z',
      deletedAt: null,
    },
    custodian: {
      id: 1,
      name: 'First digital',
      website: 'https://1stdigital.com/',
      description:
        'It starts with an idea: the solution to asset safety and management for digital assets already exists. It’s trusts and custody. But no-one knows how to apply it to a new, fast-moving and entirely digital asset class. First Digital Trust was built out of this realization in 2017, under the umbrella of First Digital Trust Limited. We brought together skills from the traditional financial world and knowledge of the digital assets economy to offer open finance solutions. After spinning off and becoming our own company in 2019, First Digital Trust became a fully independent public trust company headquartered in Hong Kong.',
      logoId: null,
      createdAt: '2021-08-17T12:20:01.000Z',
      updatedAt: '2021-08-27T08:28:41.000Z',
      deletedAt: null,
    },
    brokerDealer: {
      id: 1,
      name: 'IX Prime',
      website: 'https://www.infinox.com/',
      description:
        'Trading the financial markets carries a high degree of risk. This risk is increased when trading on margin. The products and services offered on our website, in all IX Prime communications and any other IX Prime promotional materials are for professional clients and eligible counterparties clients only, who are deemed to be aware and accept the risks of trading using margin.',
      logoId: null,
      createdAt: '2021-08-17T12:19:05.000Z',
      updatedAt: '2021-08-17T12:19:05.000Z',
      deletedAt: null,
    },
  },
]

const headerCells = [
  t`Tier`,
  t`APY`,
  t`Period of staking`,
  t`Lock Period`,
  t`Amount`,
  t`Distribute`,
  t`Estimated Rewards`,
]

const Header = () => {
  return (
    <StyledHeaderRow>
      {headerCells.map((cell) => (
        <div className="header-cell-label" key={cell}>
          {cell}
        </div>
      ))}
    </StyledHeaderRow>
  )
}

const Body = () => {
  return (
    <>
      {items?.map(
        ({
          id,
          user: { ethAddress },
          custodian: { name: custodian },
          brokerDealer: { name: broker },
          status,
          token,
          createdAt,
          kyc: { url },
        }) => (
          <StyledBodyRow key={id}>
            <Tier>
              <span className="digit">3</span>&nbsp;MONTHS
            </Tier>
            <div>88%</div>
            <div>{dayjs(createdAt).format('MMM D, YYYY HH:mm')}</div>
            <div>2 Months</div>
            <div>1 732 282 IXS</div>
            <div>1 732 282 IXSgov</div>
            <div className="rewards">108.6655 IXS</div>
            <div>Locked till</div>
          </StyledBodyRow>
        )
      )}
    </>
  )
}

export const MyStakingsTable = () => {
  return (
    <Box style={{ width: '100%' }}>
      <Box marginBottom={22}>
        <TYPE.title5>
          <Trans>My ongoing stakings</Trans>
        </TYPE.title5>
      </Box>
      {false && (
        <Loader>
          <LoaderThin size={96} />
        </Loader>
      )}
      {items.length === 0 ? (
        <NoData>
          <Trans>You have no stakings yet</Trans>
        </NoData>
      ) : (
        <Container>
          <Table body={<Body />} header={<Header />} />
        </Container>
      )}
    </Box>
  )
}

const Loader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000000;
`

const NoData = styled.div`
  font-weight: 600;
  color: ${({ theme: { text2 } }) => text2};
  text-align: center;
`

const Dash = styled.div`
  background-color: ${({ theme: { bg7 } }) => bg7};
  width: 21px;
  height: 3px;
  border-radius: 40px;
`

const Tier = styled.div`
  background: ${({ theme: { bgG3 } }) => bgG3};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  display: flex;
  align-items: flex-end !important;

  .digit {
    font-size: 32px;
    font-weight: 700;
    line-height: 37px;
  }
`

const Container = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-gap: 50px;
`

const StyledHeaderRow = styled(HeaderRow)`
  grid-template-columns: 160px 100px 190px 160px 200px 180px auto;
  min-width: 1270px;
  .header-cell-label {
    color: #edceff80;
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
  }
`

const StyledBodyRow = styled(BodyRow)`
  grid-template-columns: 160px 100px 190px 160px 200px 180px 180px auto;
  min-width: 1270px;
  font-size: 14px;
  line-height: 21px;
  font-weight: 400;

  .rewards {
    color: #9df9b1;
  }
`
