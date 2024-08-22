import React from 'react'
import Table from './Table'
import styled from 'styled-components'
import { Flex } from 'rebass'
import { PinnedContentButton } from 'components/Button'

import { ReactComponent as SearchIcon } from 'assets/launchpad/svg/search-icon.svg'

interface Tenant {
  key: string
  name: string
  domain: string
  created: string
}

const Tenant: React.FC = () => {
  const dataSource = [
    {
      key: '1',
      name: 'Quantum',
      domain: 'www.quantum.ixswap.io',
      created: '24 July. 2024 03:48AM',
    },
  ]

  const columns = [
    {
      title: 'Tenant Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Domain',
      dataIndex: 'domain',
      key: 'domain',
    },
    {
      title: 'Created',
      dataIndex: 'created',
      key: 'created',
    },
    {
      title: '',
      key: 'action',
      align: 'right',
      render: (_: any, record: any) => (
        <div>
          <a style={{marginRight: 4}}>Invite</a>
          <a>Delete</a>
        </div>
      ),
    },
  ] as any

  return (
    <Container>
      <Content>
        <Flex justifyContent="space-between" alignItems="center">
          <h1>Tenant Page</h1>

          <div>
            <PinnedContentButton type="button">Add Tenant</PinnedContentButton>
          </div>
        </Flex>

        <InputWrapper>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <Input type="text" placeholder="Search" />
        </InputWrapper>

        <Table columns={columns} dataSource={dataSource} />
      </Content>
    </Container>
  )
}

export default Tenant

const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  background: #ffffff;
`
const Content = styled.div`
  margin: 0 auto;
  max-width: 1440px;
  width: 100%;
  padding: 32px 16px;
`

const InputWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  position: relative;
  border-radius: 8px;
  border: solid 1px #e6e6ff;
  background: #fff;
  border-radius: 4px;
  height: 48px;
`

const Input = styled.input`
  width: 100%;
  margin-left: 40px;
  border: none;
  outline: none;
  font-size: 14px;
`

const SearchIconWrapper = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-40%);
`
