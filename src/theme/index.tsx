import React, { useMemo } from 'react'
import { Text, TextProps as TextPropsOriginal } from 'rebass'
import { useWhitelabelState } from 'state/whitelabel/hooks'
import { Whitelabel, WlColors } from 'state/whitelabel/types'
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
  upToExtremelySmall: 370,
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

export function colors(configColors?: WlColors): Colors {
  const wlColorsByType = configColors || ({} as WlColors)

  return {
    config: wlColorsByType,
    // base
    white,
    black,

    // text
    text1: wlColorsByType.text?.main || '#FFFFFF',
    text2: wlColorsByType.text?.additional1 || '#EDCEFF',
    text3: wlColorsByType.text?.main || '#6C7284',
    text4: wlColorsByType.text?.main || '#565A69',
    text5: wlColorsByType.text?.main || '#2C2F36',
    text6: wlColorsByType.text?.main || '#8275BC',
    text7: wlColorsByType.text?.main || '#9184C4',
    text8: wlColorsByType.text?.main || '#9184C3',
    text9: wlColorsByType.text?.main || '#EDCEFF80',
    // backgrounds / greys
    bg0: wlColorsByType.background?.main || '#0D0415',
    bg1: wlColorsByType.background?.secondary || '#1A123A',
    bg2: '#2C2F36',
    bg3: '#40444F',
    bg4: '#565A69',
    bg5: '#6C7284',
    bg6: '#1A2028',
    bg7: wlColorsByType.background?.main || '#372E5E',
    bg8: wlColorsByType.background?.secondary || '#0F0518',
    bg9: wlColorsByType.background?.main || '#372E5D',
    bg10: '#EDCEFF',
    bg11: wlColorsByType.background?.secondary || '#272046',
    bg12: wlColorsByType.background?.secondary || '#271F4A',
    bg13: wlColorsByType.background?.secondary || '#2F254E',
    bg14: '#ED0376',
    bg15: '#2C254A',
    bg16: wlColorsByType.background?.secondary || '#170626',
    bg17: '#1C112D',
    bg18: wlColorsByType.background?.main || '#27204666',
    bg19: wlColorsByType.background?.secondary || '#271F4A66',
    bg20: '#7B42A9',
    bgG1:
      wlColorsByType.background?.main ||
      'radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.33) 0%, rgba(26, 18, 58, 0) 100%), #2C254A;',
    bgG2:
      wlColorsByType.background?.main ||
      'radial-gradient(93.65% 93.65% at 58.57% 22.42%,rgba(206,20,132,0.1) 0%,rgba(26,18,58,0.4) 100%),rgb(44,37,74,0.6);',
    bgG3:
      wlColorsByType.background?.secondary || 'linear-gradient(116.36deg, #7B42A9 33.43%, #ED0376 95.41%), #0C469C;',
    bgG4:
      wlColorsByType.background?.main ||
      'radial-gradient(53.24% 225.7% at 49.91% 82.11%, rgba(123, 66, 169, 0.04) 0%, rgba(237, 3, 118, 0.02) 100%), #0F0518;',
    bgG5:
      wlColorsByType.background?.secondary ||
      'radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.099) 0%, rgba(26, 18, 58, 0) 100%), rgba(44, 37, 74, 0.2);',
    bgG6:
      wlColorsByType.background?.main ||
      'linear-gradient(0deg, #ED0376, #ED0376), linear-gradient(116.36deg, #7B42A9 33.43%, #ED0376 95.41%);',
    bgG7: wlColorsByType.background?.main || 'linear-gradient(0deg, #272046, #272046), #170E20;',
    bgG8: wlColorsByType.background?.main || 'linear-gradient(0deg, #1A123A, #1A123A), #170E20;',
    bgG9: wlColorsByType.background?.main || 'linear-gradient(0deg, #14051B 0%, rgba(20, 5, 27, 0) 82.89%);',
    bgG10:
      wlColorsByType.background?.main ||
      'radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.231) 0%, rgba(26, 18, 58, 0) 100%), rgba(44, 37, 74, 0.1);',
    bgG11:
      wlColorsByType.background?.main ||
      'radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.099) 0%, rgba(26, 18, 58, 0) 100%), rgba(44, 37, 74, 0.5);',
    bgG12:
      wlColorsByType.background?.main ||
      'radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.099) 0%, rgba(26, 18, 58, 0) 100%), rgba(44, 37, 74, 0.3)',
    bgG13:
      wlColorsByType.background?.main ||
      'radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.099) 0%, rgba(26, 18, 58, 0) 100%), rgba(44, 37, 74, 0.3);',
    bgG14:
      wlColorsByType.background?.main ||
      'radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.033) 0%, rgba(26, 18, 58, 0) 100%), rgba(44, 37, 74, 0.5);',
    bgG15:
      wlColorsByType.background?.main ||
      'radial-gradient(76.91% 60% at 2.38% 3.84%, rgba(123, 66, 169, 0.195) 0%, rgba(26, 18, 58, 0) 100%), radial-gradient(79.76% 116.06% at 44.22% 136.36%, rgba(102, 20, 206, 0.132) 0%, rgba(26, 18, 58, 0) 100%), radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.132) 0%, rgba(26, 18, 58, 0) 100%), rgba(44, 37, 74, 0.3)',
    bgG16:
      wlColorsByType.background?.main ||
      'linear-gradient(0deg, rgba(13, 4, 21, 0.7), rgba(13, 4, 21, 0.7)), radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.099) 0%, rgba(26, 18, 58, 0) 100%), rgba(44, 37, 74, 0.2);',
    bgG17:
      wlColorsByType.background?.secondary ||
      'radial-gradient(53.24% 225.7% at 49.91% 82.11%, rgba(123, 66, 169, 0.028) 0%, rgba(237, 3, 118, 0.014) 100%), rgba(15, 5, 24, 0.7);',
    bgG18:
      wlColorsByType.background?.main ||
      'radial-gradient(83.59% 55.66% at 2.38% 3.84%, rgba(123, 66, 169, 0.39) 0%, rgba(26, 18, 58, 0) 100%), radial-gradient(50.28% 108.33% at 73.7% 9%, rgba(102, 20, 206, 0.165) 1.94%, rgba(26, 18, 58, 0) 100%), radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.33) 0%, rgba(26, 18, 58, 0) 100%), rgba(44, 37, 74, 0.3);',

    bgG19:
      wlColorsByType.background?.secondary ||
      'radial-gradient(39.01% 78.49% at 10.99% 63.28%, rgba(138, 54, 152, 0.18) 18.75%, rgba(0, 0, 0, 0) 100%),radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(154, 55, 114, 0.33) 0%, rgba(26, 18, 58, 0) 100%) #29113d',
    //specialty colors
    borderG1: wlColorsByType.background?.main || 'linear-gradient(116.36deg, #7b42a9 33.43%, #ed0376 95.41%);',
    borderG2:
      wlColorsByType.text?.main ||
      'linear-gradient(116.36deg, rgb(123, 66, 169) 33.43%, rgb(237, 3, 118) 95.41%), rgb(12, 70, 156);',
    borderG3:
      wlColorsByType.background?.main ||
      'linear-gradient(90deg, rgba(237, 206, 255, 0) 0%, #edceff 4.92%, #edceff 94.53%, rgba(237, 206, 255, 0) 98.88%);',
    modalBG: 'rgba(0,0,0,0.9)',
    advancedBG: wlColorsByType.background?.main || 'rgba(0,0,0,0.1)',
    divider: wlColorsByType.background?.main || 'rgba(43, 43, 43, 0.435)',

    //primary colors
    primary1: wlColorsByType.primary?.main || '#2172E5',
    primary2: wlColorsByType.primary?.additional1 || '#3680E7',
    primary3: wlColorsByType.primary?.additional2 || '#4D8FEA',
    primary4: wlColorsByType.primary?.additional3 || '#376bad70',
    primary5: '#153d6f70',

    // color text
    primaryText1: '#6da8ff',

    // secondary colors
    secondary1: '#2172E5',
    secondary2: '#17000b26',
    secondary3: '#17000b26',

    // other
    red1: '#FD4040',
    red2: '#F82D3A',
    red3: '#D60000',
    green1: '#9DF9B1',
    yellow1: '#e3a507',
    yellow2: '#ff8f00',
    yellow3: '#F3B71E',
    yellow4: wlColorsByType.status?.warning || '#F2F99D',
    blue1: '#2172E5',
    blue2: '#5199FF',

    error: '#ED0376',
    success: '#27AE60',
    warning: '#ff8f00',
    popUpInputBorder: '#7A02E0',

    // dont wanna forget these blue yet
    // blue4: darkMode ? '#153d6f70' : '#C4D9F8',
    // blue5: darkMode ? '#153d6f70' : '#EBF4FF',
  }
}

export function theme(darkMode: boolean, config: Whitelabel | null): DefaultTheme {
  return {
    ...colors(config?.colors),

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
  const { config } = useWhitelabelState()

  const themeObject = useMemo(() => theme(darkMode, config), [darkMode, config])

  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}

const TextWrapper = styled(Text)<{ color: keyof Colors }>`
  color: ${({ color, theme }) => (theme as any)[color]};
`

export const TYPE = {
  main0(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={52} lineHeight={'56px'} color={'text1'} {...props} />
  },
  main(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text2'} {...props} />
  },
  main1(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={20} lineHeight={'30px'} color={'text1'} {...props} />
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
  body1(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={16} color={'text2'} lineHeight={'24px'} {...props} />
  },
  body2(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={17} color={'text1'} lineHeight={'24px'} {...props} />
  },
  body3(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={14} lineHeight={'21px'} color={'text2'} {...props} />
  },
  body4(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={18} lineHeight={'34px'} color={'text1'} {...props} />
  },
  body5(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={20} lineHeight={'33px'} color={'text2'} {...props} />
  },
  body6(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={17} color={'text1'} lineHeight={'40px'} {...props} />
  },
  popOver(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={14} color={'text2'} lineHeight={'17px'} {...props} />
  },
  status(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={14} color={'text2'} lineHeight={'32px'} {...props} />
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
  subHeader1(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={14} lineHeight={'21px'} {...props} />
  },
  buttonMuted(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={14} lineHeight={'21px'} {...props} />
  },
  titleBig(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={36} lineHeight={'56px'} {...props} />
  },
  titleSmall(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={18} lineHeight={'27px'} color={'text1'} {...props} />
  },
  title3(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={28} lineHeight={'56px'} color={'text1'} {...props} />
  },
  title4(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={36} lineHeight={'56px'} color={'text1'} {...props} />
  },
  title5(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={22} lineHeight={'33px'} color={'text1'} {...props} />
  },
  title6(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={16} lineHeight={'24px'} color={'text1'} {...props} />
  },
  title7(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={18} lineHeight={'40px'} color={'text1'} {...props} />
  },
  title8(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={28} lineHeight={'42px'} color={'text2'} {...props} />
  },
  title9(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={18} lineHeight={'40px'} color={'text1'} {...props} />
  },
  title10(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={12} lineHeight={'18px'} color={'text1'} {...props} />
  },
  title11(props: TextProps) {
    return <TextWrapper fontWeight={300} fontSize={16} lineHeight={'24px'} color={'text1'} {...props} />
  },
  descriptionThin(props: TextProps) {
    return <TextWrapper fontWeight={300} fontSize={16} lineHeight={'24px'} color={'text2'} {...props} />
  },
  description2(props: TextProps) {
    return <TextWrapper fontWeight={300} fontSize={12} lineHeight={'18px'} color={'text2'} {...props} />
  },
  description3(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={12} lineHeight={'18px'} color={'text2'} {...props} />
  },
  description4(props: TextProps) {
    return <TextWrapper fontWeight={300} fontSize={18} lineHeight={'29px'} color={'text2'} {...props} />
  },
  description5(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={22} lineHeight={'33px'} color={'text2'} {...props} />
  },
  description6(props: TextProps) {
    return <TextWrapper fontWeight={300} fontSize={28} lineHeight={'56px'} color={'text1'} {...props} />
  },
  description7(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={30} lineHeight={'45px'} color={'text2'} {...props} />
  },
  small(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={11} {...props} />
  },
  smallError(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={10} lineHeight={'15px'} color={'error'} {...props} />
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
    return <TextWrapper fontWeight={500} color={error ? 'error' : 'text2'} {...props} />
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

  ${({ theme }) =>
    theme.config.elements &&
    css`
      path {
        fill: ${theme.config.elements.main};
      }
    `};


  /* svg{
    ${({ theme }) =>
      theme.config.elements &&
      css`
        stroke: ${({ theme }) => theme.config.elements.main};
      `};
  } */
`
