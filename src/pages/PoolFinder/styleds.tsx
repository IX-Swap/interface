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
  background: ${({ theme }) => theme.bg11};
  padding: 24px 35px 46px 35px;
  border-radius: 20px;
  gap: 34px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  margin-top: 35px;
`
export const SelectCurrencyContainer = styled(AutoColumn)`
  padding: 0 37px;
  margin-bottom: 10px;
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
