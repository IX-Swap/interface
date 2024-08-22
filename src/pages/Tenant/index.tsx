import React from 'react'
import Table from './Table'
import styled from 'styled-components'
import { Flex } from 'rebass'
import { PinnedContentButton } from 'components/Button'
import { Copy, Edit } from 'react-feather'

import { ReactComponent as SearchIcon } from 'assets/launchpad/svg/search-icon.svg'
import Paginator from './Paginator'

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
    {
      key: '2',
      name: 'Quantum 1',
      domain: 'www.quantum1.ixswap.io',
      created: '24 July. 2024 03:48AM',
    },
    {
      key: '3',
      name: 'Quantum 2',
      domain: 'www.quantum2.ixswap.io',
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
        <ActionWrapper>
          <ActionButton>
            <Copy />
          </ActionButton>
          <ActionButton>
            <Edit />
          </ActionButton>
        </ActionWrapper>
      ),
    },
  ] as any

  return (
    <Container>
      <Content>
        <Flex justifyContent="space-between" alignItems="center">
          <h1>Tenant Page</h1>

          <div>
            <PinnedContentButton type="button">
              <span style={{ fontSize: 20, marginRight: 8 }}>+</span> Add Tenant
            </PinnedContentButton>
          </div>
        </Flex>

        <InputWrapper>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <Input type="text" placeholder="Search" />
        </InputWrapper>

        <Table columns={columns} dataSource={dataSource} />
        <Flex justifyContent="flex-end">
          <Paginator total={10} pageSize={10} currentPage={0} onPageChange={() => {}} />
        </Flex>
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

const ActionWrapper = styled.div`
  display: flex;
  gap: 16px;
  justify-content: flex-end;
`
const ActionButton = styled.div`
  cursor: pointer;
  color: #b8b8cc;
`
