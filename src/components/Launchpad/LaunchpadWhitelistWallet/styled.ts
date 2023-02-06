import styled from 'styled-components'

export const Tabs = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
`

export const Tab = styled.div<{ active: boolean }>`
  display: grid;
  place-content: center;
  padding: 0.25rem 1rem 1.5rem 1rem;
  height: 100%;
  cursor: pointer;
  ${(props) =>
    props.active
      ? `
    border-bottom: 1px solid ${props.theme.launchpad.colors.primary};
  `
      : `
    border-bottom: 1px solid ${props.theme.launchpad.colors.border.default};
  `}
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  width: 50%;
  line-height: 16px;
  letter-spacing: -0.02em;
  color: ${(props) =>
    props.active ? props.theme.launchpad.colors.text.title : props.theme.launchpad.colors.text.bodyAlt};
`
export const DialogWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 90vh;
`
export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`
