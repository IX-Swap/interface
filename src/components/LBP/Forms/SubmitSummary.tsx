import { PinnedContentButton, ButtonOutlined } from 'components/Button'
import styled from 'styled-components'

export const SubmitSummary = () => {
  return (
    <SummaryContainer>
      <SummaryTitle>Quick Summary</SummaryTitle>
      <AddressField>
        <FieldLabel>Pool Address</FieldLabel>
        <FieldValue>0x1a5b3F4589d82aB367B680b7e3Be3b72E5B4246f</FieldValue>
      </AddressField>
      <Row>
        <TextBlock>
          <FieldLabel>Swap Fee</FieldLabel>
          <FieldValue>1.00%</FieldValue>
        </TextBlock>
        <TextBlock>
          <FieldLabel>Platform Fee</FieldLabel>
          <FieldValue>5.00%</FieldValue>
        </TextBlock>
      </Row>
      <Row>
        <TextBlock>
          <FieldLabel>Start Date</FieldLabel>
          <FieldValue>05/05/2024 09:30AM</FieldValue>
        </TextBlock>
        <TextBlock>
          <FieldLabel>End Date</FieldLabel>
          <FieldValue>06/05/2024 09:30AM </FieldValue>
        </TextBlock>
      </Row>
      <SectionTitle>Quantities</SectionTitle>
      <Row>
        <FieldBlock>
          <FieldLabel>Project Token</FieldLabel>
          <TokenBlock>
            <TokenRow>
              <img />
              <span>Serenity</span>
            </TokenRow>
            <TokenPrice>500,000.00</TokenPrice>
          </TokenBlock>
        </FieldBlock>
        <FieldBlock>
          <FieldLabel>Base Token</FieldLabel>
          <TokenBlock>
            <TokenRow>
              <img />
              <span>USDC</span>
            </TokenRow>
            <TokenPrice>20,000.00</TokenPrice>
          </TokenBlock>
        </FieldBlock>
      </Row>
      <SectionTitle>Weights</SectionTitle>
      <Row>
        <FieldBlock>
          <FieldLabel>Start Weights</FieldLabel>
          <TokenBlock>
            <TokenRow>
              <img />
              <span>Serenity</span>
            </TokenRow>
            <TokenPrice>56%</TokenPrice>
          </TokenBlock>
        </FieldBlock>
        <FieldBlock>
          <FieldLabel></FieldLabel>
          <TokenBlock>
            <TokenRow>
              <img />
              <span>USDC</span>
            </TokenRow>
            <TokenPrice>44%</TokenPrice>
          </TokenBlock>
        </FieldBlock>
      </Row>
      <Row>
        <TextBlock>
          <FieldLabel>Start Price</FieldLabel>
          <FieldValue>$3.00</FieldValue>
        </TextBlock>
        <TextBlock>
          <FieldLabel>Start Market Cap</FieldLabel>
          <FieldValue>$100,000.00 </FieldValue>
        </TextBlock>
      </Row>
      <ButtonOutlined style={{ width: '100%' }}>Cancel</ButtonOutlined>
      <PinnedContentButton type="submit" data-testid="deployButton" style={{ width: '100%' }} marginY="24px">
        Deploy
      </PinnedContentButton>
    </SummaryContainer>
  )
}

const SummaryContainer = styled.div`
  display: flex;
`

const SummaryTitle = styled.h1``
const SectionTitle = styled.h2``
const AddressField = styled.div``
const Row = styled.div``
const TextBlock = styled.div``
const FieldBlock = styled.div``
const TokenBlock = styled.div``
const FieldLabel = styled.span``
const FieldValue = styled.p``
const TokenRow = styled.div``
const TokenPrice = styled.div``
