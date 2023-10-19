import Column, { AutoColumn, ColumnCenter } from 'components/Column'
import styled from 'styled-components'

export const PrerequisiteMessageWrapper = styled.div`
  background: ${({ theme }) => theme.bgG7};
  border-radius: 34px;
  backdrop-filter: blur(4px);
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
}
`

export const FoundPoolWrapper = styled(ColumnCenter)`
  justify-items: center;
  // background: ${({ theme }) => theme.bg25};
  padding: 24px 35px 46px 35px;
  border-radius: 8px;
  border: 1px solid #e6e6ff;
  gap: 34px;
  // margin-top: 35px;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
  padding: 24px 20px 46px 20px;
  `};
`
export const SelectCurrencyContainer = styled(AutoColumn)`
  padding: 24px;
  border: 1px solid #e6e6ff;
  margin-bottom: 10px;
  border-radius: 8px;
  @media (max-width: 500px) {
    padding: 0 0.7rem;
  }
`
export const PrerequesiteMessageWrapper = styled(Column)`
  padding: 0 0.7rem 1rem 0.7rem;
  align-items: center;
  gap: 20px;
  padding: 0 36px 36px 36px;
  @media (max-width: 500px) {
    padding: 0 0.7rem 1rem 0.7rem;
  }
`
export const PoolStateColumn = styled(Column)`
  padding: 37px;
  @media (max-width: 500px) {
    padding: 1rem 0.7rem;
  }
`
