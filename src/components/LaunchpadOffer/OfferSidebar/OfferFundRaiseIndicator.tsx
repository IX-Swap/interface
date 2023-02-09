import React from 'react'
import styled, { useTheme } from 'styled-components'

interface PartialOffer {
  totalInvestment: number;
  hardCap: string | number;
}

interface Props {
  offer: PartialOffer;
  size?: number;
  textSize?: number;
}

export const OfferFundRaiseIndicator: React.FC<Props> = (props) => {
  const theme = useTheme()

  const size = React.useMemo(() => props.size ?? 20, [props.size])
  const radius = React.useMemo(() => (size / 2) - 1, [size])

  //const invested = React.useMemo(() => Math.floor(Math.random() * Number(props.offer.hardCap)), [props.offer.hardCap])
  const percentage = React.useMemo(() => props.offer.totalInvestment / Number(props.offer.hardCap), [props.offer.totalInvestment, props.offer.hardCap])

  const arc = React.useMemo(() => describeArc(size / 2, size / 2, radius, 0, percentage * 360), [size, radius, percentage])

  return (
    <svg width={size} height={size} fill="none">
      <circle cx={size / 2} cy={size / 2} r={radius} stroke={theme.launchpad.colors.text.caption} />
      <path d={arc} stroke={theme.launchpad.colors.primary} />

      <Text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill={theme.launchpad.colors.primary} textSize={props.textSize}>
        {Math.round(percentage * 100)}%
      </Text>
    </svg>
  )
}


function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  }
}

function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return `M ${start.x}, ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`
}

const Text = styled.text<{ textSize?: number }>`
  font-family: ${props => props.theme.launchpad.font};
  font-style: normal;
  font-weight: 600;
  font-size: ${props => props.textSize || 9}px;

  line-height: 160%;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.primary};
`