import * as React from 'react'
import { Link, Match } from '@reach/router'
import { Track } from '../../types'
import {
  TextWrapper,
  TrackTitle,
  LinkButton,
  TrackButtons,
  TrackNumber,
} from './styled'

interface TrackLinkProps {
  track: Track
}

export const TrackLink = ({ track }: TrackLinkProps) => {
  const path = `/tracks/${track.slug}`
  return (
    <Match path={path}>
      {(props) => {
        const { match } = props
        const isReleased = true
        const { title, trackNumber } = track

        console.log(props)
        return (
          <TextWrapper isReleased={isReleased} active={match}>
            <TrackTitle active={match}>
              <TrackNumber>{track.trackNumber}</TrackNumber>
              <Link to={path} aria-current={props.match ? 'page' : false}>
                {track.title}
              </Link>
            </TrackTitle>
            {props.match ? (
              <TrackButtons>
                <LinkButton>Share</LinkButton>
                <a href="https://www.google.com">Listen</a>
              </TrackButtons>
            ) : null}
          </TextWrapper>
        )
      }}
    </Match>
  )
}
