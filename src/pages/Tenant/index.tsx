import React, { useEffect, useState } from 'react'
import Table from './components/Table'
import styled from 'styled-components'
import { Flex } from 'rebass'
import { Edit } from 'react-feather'

import { PinnedContentButton } from 'components/Button'
import apiService from 'services/apiService'
import { whitelabel } from 'services/apiUrls'
import dayjs from 'dayjs'

interface Tenant {
  key: string
  name: string
  domain: string
  created: string
}

const Tenant: React.FC = () => {
  const [data, setData] = useState<Tenant[]>([])

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
      render: (text: string) => {
        return <DomainText>{text}</DomainText>
      },
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => {
        return (
          <div>
            {dayjs(text).format('MMM D, YYYY')} <TimeText>{dayjs(text).format('hh:mm A')}</TimeText>
          </div>
        )
      },
    },
    {
      title: '',
      key: 'action',
      align: 'right',
      render: (_: any, record: any) => (
        <ActionWrapper>
          <ActionButton>
            <Edit />
          </ActionButton>
        </ActionWrapper>
      ),
    },
  ] as any

  const getData = async () => {
    try {
      const { status, data } = await apiService.get(whitelabel.all)

      if (status === 200) {
        setData(data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  console.log('data', data)

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

        <Table columns={columns} dataSource={data} />
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

const ActionWrapper = styled.div`
  display: flex;
  gap: 16px;
  justify-content: flex-end;
`
const ActionButton = styled.div`
  cursor: pointer;
  color: #b8b8cc;
`

const DomainText = styled.div`
  color: #8f8fb2;
`

const TimeText = styled.span`
  color: #8f8fb2;
`
