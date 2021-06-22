import Card from 'components/Card'
import useTheme from 'hooks/useTheme'
import React, { ReactNode } from 'react'
import { SemiTransparent, TYPE } from 'theme'
import { PrerequisiteMessageWrapper } from './styleds'

export const LightMessage = ({ children }: { children: ReactNode }) => {
  const theme = useTheme()
  return (
    <PrerequisiteMessageWrapper>
      <SemiTransparent>
        <Card>
          <TYPE.body color={theme.text2} textAlign="center">
            {children}
          </TYPE.body>
        </Card>
      </SemiTransparent>
    </PrerequisiteMessageWrapper>
  )
}
