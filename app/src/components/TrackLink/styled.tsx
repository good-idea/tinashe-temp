import styled, { css } from '@xstyled/styled-components'
import { Li, Header4, Header5 } from '../Text'

interface TextWrapperProps {
  isHidden: boolean
  active: boolean
}

export const TextWrapper = styled(Li)`
  ${({ active, isHidden }: TextWrapperProps) => css`
    position: relative;
    font-size: 2;
    opacity: ${isHidden ? '0' : '1'};
    pointer-events: ${isHidden ? 'none' : 'initial'};

    a {
      color: inherit;
      text-decoration: none;
    }

    & + & {
      margin-top: 4;
    }
  `}
`

export const LinkButton = styled.button`
  font: inherit;
  border: none;
  background: none;
  margin: 0;
  padding: 0;
  color: inherit;
`

interface TrackTitleProps {
  released: boolean
}

export const TrackTitle = styled.div`
  ${({ released }: TrackTitleProps) => css`
    display: inline-block;
    filter: ${released ? 'none' : 'blur(7px)'};
    opacity: ${released ? '0.7' : '1'};
    transition: 0.3s;
  `}
`

export const TrackNumber = styled(Header5)`
  ${({ theme }) => css`
    position: absolute;
    width: ${theme.space[8]};
    height: 100%;
    right: 100%;
    display: block;
    text-align: center;
    line-height: ${theme.fontSizes[2]}px;
    margin: 0;
    top: 0;
  `}
`

export const TrackButtons = styled.span`
  color: white;

  & > * {
    margin-left: 6;
  }
`

export const Countdown = styled(Header4)`
  display: inline-block;
  padding-left: 4;
`
