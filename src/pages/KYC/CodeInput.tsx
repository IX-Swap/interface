import { PinnedContentButton } from 'components/Button'
import React, { useState } from 'react'
import styled from 'styled-components'

interface CodeInputProps {
  numberOfBoxes: number
  boxBackgroundColor: string
  boxBorderColor: string
  gapBetweenBoxes: number
  handleNextClick: (code: string) => void
  reset: boolean
}

const CodeInput: React.FC<CodeInputProps> = ({
  numberOfBoxes,
  boxBackgroundColor,
  boxBorderColor,
  gapBetweenBoxes,
  handleNextClick,
  reset,
}) => {
  const [code, setCode] = useState(Array(numberOfBoxes).fill(''))

  const handleChange = (value: string, index: number) => {
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && index > 0) {
      ;(document.getElementById(`code-input-${index - 1}`) as HTMLInputElement).focus()
    } else if (index < numberOfBoxes - 1) {
      ;(document.getElementById(`code-input-${index + 1}`) as HTMLInputElement).focus()
    }
  }

  const handleSubmit = () => {
    handleNextClick(code.join(''))
  }

  React.useEffect(() => {
    if (reset) {
      setCode(Array(numberOfBoxes).fill(''))
    }
  }, [reset, numberOfBoxes])

  return (
    <Container>
      <CodeInputContainer gapBetweenBoxes={gapBetweenBoxes}>
        {code.map((value, index) => (
          <CodeInputBox
            key={index}
            id={`code-input-${index}`}
            value={value}
            backgroundColor={boxBackgroundColor}
            borderColor={boxBorderColor}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyUp={(e) => handleKeyUp(e, index)}
          />
        ))}
      </CodeInputContainer>
      <PinnedContentButton style={{ marginTop: '20px' }} onClick={handleSubmit}>
        Submit
      </PinnedContentButton>
    </Container>
  )
}

const CodeInputContainer = styled.div<{ gapBetweenBoxes: number }>`
  display: flex;
  gap: 10px;
  justify-content: center;
`

const CodeInputBox = styled.input<{ backgroundColor: string; borderColor: string }>`
  width: 40px;
  height: 40px;
  text-align: center;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border: 1px solid ${({ borderColor }) => borderColor};
  border-radius: 4px;
`

const Container = styled.div`
  text-align: center;
`

export default CodeInput
