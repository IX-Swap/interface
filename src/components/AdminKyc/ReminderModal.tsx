import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import styled from 'styled-components'

import { PinnedContentButton } from 'components/Button'
import apiService from 'services/apiService'
import { admin } from 'services/apiUrls'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'

interface ReminderModalProps {
  isOpen: boolean
  onClose: () => void
  item: any
}

const ReminderModal: React.FC<ReminderModalProps> = ({ isOpen, item, onClose }) => {
  const queryClient = useQueryClient()
  const { data } = useQuery({
    queryKey: ['remiders', item?.id],
    queryFn: () => apiService.get(admin.kycReminder(item?.id)),
    placeholderData: keepPreviousData,
  })
  const mutation = useMutation({
    mutationFn: () => {
      return apiService.post(admin.kycReminder(item?.id), {})
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['remiders', item?.id],
      })
      toast.success('Sent reminder successful!')
    },
    onError: (error: any) => {
      toast.error(error.message)
    },
  })

  const reminderLogs = data?.data?.reminderLogs || []

  const getSentBy = (sentBy: string) => {
    if (sentBy === 'Automatic') {
      return 'Automatic'
    }
    try {
      return JSON.parse(sentBy)?.fullName || 'Unknown'
    } catch (error) {
      return 'Unknown'
    }
  }

  return (
    <ModalBackground isOpen={isOpen}>
      <ModalContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <div>
          <Title>Reminder</Title>
          <Desc>
            This will send a reminder to users to complete their KYC verification process to ensure they can continue
            using the platform without any restrictions.
          </Desc>

          <PinnedContentButton
            style={{ textTransform: 'unset', marginTop: 16 }}
            disabled={mutation.isPending}
            onClick={() => mutation.mutate()}
          >
            <ButtonText>Send Reminder</ButtonText>
          </PinnedContentButton>

          <div style={{ borderTop: 'solid 1px #E6E6FF', marginTop: 16, paddingTop: 16 }}>
            <ReminderLog>Reminder Log</ReminderLog>

            <div>
              {reminderLogs.length > 0 ? (
                <StyledTable>
                  <thead>
                    <TableRow>
                      <TableHeader>Date</TableHeader>
                      <TableHeader style={{ textAlign: 'right' }}>Send by</TableHeader>
                    </TableRow>
                  </thead>
                  <tbody>
                    {reminderLogs.map((row: any) => (
                      <TableRow key={row.id}>
                        <TableCell>{dayjs(row.createdAt).format('MMM DD, YYYY hh:mm')}</TableCell>
                        <TableCell style={{ textAlign: 'right' }}>{getSentBy(row?.sentBy)}</TableCell>
                      </TableRow>
                    ))}
                  </tbody>
                </StyledTable>
              ) : (
                <NoData>No Data</NoData>
              )}
            </div>
          </div>
        </div>
      </ModalContainer>
    </ModalBackground>
  )
}

export default ReminderModal

const ModalBackground = styled.div<{ isOpen: boolean }>`
  display: ${(props: any) => (props.isOpen ? 'block' : 'none !important')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgb(0 0 0 / 0.6);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ModalContainer = styled.div`
  position: relative;
  background-color: white;
  padding: 32px;
  border-radius: 8px;
  width: 453px;
  word-wrap: break-word;
  white-space: pre-wrap;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 32px;
  position: absolute;
  top: 6px;
  right: 10px;
  cursor: pointer;
`

const Title = styled.div`
  color: #292933;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 130%; /* 26px */
  letter-spacing: -0.6px;
  text-align: left;
  margin-bottom: 8px;
`

const Desc = styled.div`
  color: #8f8fb2;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 16.8px */
  letter-spacing: -0.36px;
  text-align: left;
`

const ButtonText = styled.span`
  color: #fff;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.28px;
`

const ReminderLog = styled.div`
  color: #292933;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 130%; /* 19.5px */
  letter-spacing: -0.45px;
`

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const TableRow = styled.tr`
  border-bottom: 1px solid #e6e6ff;

  &:last-child {
    border-bottom: none;
  }
`

const TableCell = styled.td`
  color: #292933;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.26px;
  padding-top: 16px;
  padding-bottom: 16px;
`

const TableHeader = styled.th`
  text-align: left;
  border-bottom: 2px solid #e6e6ff;
  color: #8f8fb2;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.26px;
  padding-top: 16px;
  padding-bottom: 16px;
`

const NoData = styled.div`
  color: #292933;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.26px;
  padding-top: 16px;
  padding-bottom: 16px;
  text-align: center;
`
