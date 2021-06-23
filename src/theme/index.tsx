import React, { useMemo } from 'react'
import { Text, TextProps as TextPropsOriginal } from 'rebass'
import styled, {
  createGlobalStyle,
  css,
  DefaultTheme,
  ThemeProvider as StyledComponentsThemeProvider,
} from 'styled-components'
import { useIsDarkMode } from '../state/user/hooks'
import { Colors } from './styled'

export * from './components'

type TextProps = Omit<TextPropsOriginal, 'css'>

export const MEDIA_WIDTHS = {
  upToExtraSmall: 500,
  upToSmall: 720,
  upToMedium: 960,
  upToLarge: 1280,
}

const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(MEDIA_WIDTHS).reduce(
  (accumulator, size) => {
    ;(accumulator as any)[size] = (a: any, b: any, c: any) => css`
      @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
        ${css(a, b, c)}
      }
    `
    return accumulator
  },
  {}
) as any

const white = '#FFFFFF'
const black = '#000000'

export function colors(darkMode: boolean): Colors {
  return {
    // base
    white,
    black,

    // text
    text1: darkMode ? '#FFFFFF' : '#000000',
    text2: darkMode ? '#EDCEFF' : '#565A69',
    text3: darkMode ? '#6C7284' : '#888D9B',
    text4: darkMode ? '#565A69' : '#C3C5CB',
    text5: darkMode ? '#2C2F36' : '#EDEEF2',
    text6: darkMode ? '#8275BC' : '#8275BC',
    text7: darkMode ? '#9184C4' : '#9184C4',
    text8: darkMode ? '#9184C3' : '#9184C3',
    // backgrounds / greys
    bg0: darkMode ? '#0D0415' : '#FFF',
    bg1: darkMode ? '#1A123A' : '#F7F8FA',
    bg2: darkMode ? '#2C2F36' : '#EDEEF2',
    bg3: darkMode ? '#40444F' : '#CED0D9',
    bg4: darkMode ? '#565A69' : '#888D9B',
    bg5: darkMode ? '#6C7284' : '#888D9B',
    bg6: darkMode ? '#1A2028' : '#6C7284',
    bg7: darkMode ? '#372E5E' : '#372E5E',
    bg8: darkMode ? '#0F0518' : '#0F0518',
    bg9: darkMode ? '#372E5D' : '#372E5D',
    bg10: darkMode ? '#EDCEFF' : '#EDCEFF',
    bg11: darkMode ? '#272046' : '#272046',
    bgGradient: darkMode
      ? 'radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.33) 0%, rgba(26, 18, 58, 0) 100%), #2C254A;'
      : 'radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.33) 0%, rgba(26, 18, 58, 0) 100%), #2C254A;',
    bgGradientMuted: darkMode
      ? 'radial-gradient(93.65% 93.65% at 58.57% 22.42%,rgba(206,20,132,0.1) 0%,rgba(26,18,58,0.4) 100%),rgb(44,37,74,0.6);'
      : 'radial-gradient(93.65% 93.65% at 58.57% 22.42%,rgba(206,20,132,0.1) 0%,rgba(26,18,58,0.4) 100%),rgb(44,37,74,0.6);',
    bgGradientBright: darkMode
      ? 'linear-gradient(116.36deg, #7B42A9 33.43%, #ED0376 95.41%), #0C469C;'
      : 'linear-gradient(116.36deg, #7B42A9 33.43%, #ED0376 95.41%), #0C469C;',
    bgGradientDark: darkMode
      ? 'radial-gradient(53.24% 225.7% at 49.91% 82.11%, rgba(123, 66, 169, 0.04) 0%, rgba(237, 3, 118, 0.02) 100%), #0F0518;'
      : 'radial-gradient(53.24% 225.7% at 49.91% 82.11%, rgba(123, 66, 169, 0.04) 0%, rgba(237, 3, 118, 0.02) 100%), #0F0518;',
    bgGradientShadow: darkMode
      ? 'radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.099) 0%, rgba(26, 18, 58, 0) 100%), rgba(44, 37, 74, 0.2);'
      : 'radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.099) 0%, rgba(26, 18, 58, 0) 100%), rgba(44, 37, 74, 0.2);',
    bgHighlightGradient: darkMode
      ? 'linear-gradient(0deg, #ED0376, #ED0376), linear-gradient(116.36deg, #7B42A9 33.43%, #ED0376 95.41%);'
      : 'linear-gradient(0deg, #ED0376, #ED0376), linear-gradient(116.36deg, #7B42A9 33.43%, #ED0376 95.41%);',
    bgGradientGray: darkMode
      ? 'linear-gradient(0deg, #272046, #272046), #170E20;'
      : 'linear-gradient(0deg, #272046, #272046), #170E20;',
    bgGradientDarkAppBody: darkMode
      ? 'linear-gradient(0deg, #1A123A, #1A123A), #170E20;'
      : 'linear-gradient(0deg, #1A123A, #1A123A), #170E20;',
    //specialty colors
    modalBG: darkMode ? 'rgba(0,0,0,.425)' : 'rgba(0,0,0,0.3)',
    advancedBG: darkMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.6)',

    //primary colors
    primary1: darkMode ? '#2172E5' : '#ff007a',
    primary2: darkMode ? '#3680E7' : '#FF8CC3',
    primary3: darkMode ? '#4D8FEA' : '#FF99C9',
    primary4: darkMode ? '#376bad70' : '#F6DDE8',
    primary5: darkMode ? '#153d6f70' : '#FDEAF1',

    // color text
    primaryText1: darkMode ? '#6da8ff' : '#ff007a',

    // secondary colors
    secondary1: darkMode ? '#2172E5' : '#ff007a',
    secondary2: darkMode ? '#17000b26' : '#F6DDE8',
    secondary3: darkMode ? '#17000b26' : '#FDEAF1',

    // other
    red1: '#FD4040',
    red2: '#F82D3A',
    red3: '#D60000',
    green1: '#27AE60',
    yellow1: '#e3a507',
    yellow2: '#ff8f00',
    yellow3: '#F3B71E',
    blue1: '#2172E5',
    blue2: '#5199FF',

    error: '#FD4040',
    success: '#27AE60',
    warning: '#ff8f00',
    popUpInputBorder: darkMode ? '#7A02E0' : '#7A02E0',

    // dont wanna forget these blue yet
    // blue4: darkMode ? '#153d6f70' : '#C4D9F8',
    // blue5: darkMode ? '#153d6f70' : '#EBF4FF',
  }
}

export function theme(darkMode: boolean): DefaultTheme {
  return {
    ...colors(darkMode),

    grids: {
      sm: 8,
      md: 12,
      lg: 24,
    },

    //shadows
    shadow1: darkMode ? '#000' : '#2F80ED',

    // media queries
    mediaWidth: mediaWidthTemplates,

    // css snippets
    flexColumnNoWrap: css`
      display: flex;
      flex-flow: column nowrap;
    `,
    flexRowNoWrap: css`
      display: flex;
      flex-flow: row nowrap;
    `,
  }
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const darkMode = useIsDarkMode()

  const themeObject = useMemo(() => theme(darkMode), [darkMode])

  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}

const TextWrapper = styled(Text)<{ color: keyof Colors }>`
  color: ${({ color, theme }) => (theme as any)[color]};
`

export const TYPE = {
  main(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text2'} {...props} />
  },
  link(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'primary1'} {...props} />
  },
  label(props: TextProps) {
    return <TextWrapper fontWeight={600} color={'text1'} {...props} />
  },
  black(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text1'} {...props} />
  },
  white(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'white'} {...props} />
  },
  body(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={16} color={'text1'} {...props} />
  },
  largeHeader(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={24} {...props} />
  },
  mediumHeader(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={20} {...props} />
  },
  subHeader(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={14} {...props} />
  },
  small(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={11} {...props} />
  },
  blue(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'blue1'} {...props} />
  },
  yellow(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'yellow3'} {...props} />
  },
  darkGray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text3'} {...props} />
  },
  gray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'bg3'} {...props} />
  },
  italic(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={12} fontStyle={'italic'} color={'text2'} {...props} />
  },
  error({ error, ...props }: { error: boolean } & TextProps) {
    return <TextWrapper fontWeight={500} color={error ? 'red1' : 'text2'} {...props} />
  },
}

export const ThemedGlobalStyle = createGlobalStyle`
html {
  color: ${({ theme }) => theme.text1};
  background-color: ${({ theme }) => theme.bg0} !important;
}

a {
 color: ${({ theme }) => theme.blue1}; 
}
`
