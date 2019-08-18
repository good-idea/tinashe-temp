import * as React from 'react'
import { Link, Match } from '@reach/router'
import { formatTimeDistance } from '../../utils'
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  isPast,
} from 'date-fns'
import { Track } from '../../types'
import {
  TextWrapper,
  LinkButton,
  TrackButtons,
  TrackTitle,
  TrackNumber,
  Countdown,
} from './styled'

const { useState, useEffect } = React

interface TrackLinkProps {
  track: Track
  released: boolean
  isNextRelease: boolean
}

const formatTimeLeft = (now: Date, releaseDate: Date): string => {
  if (now > releaseDate) return ''
  return formatTimeDistance(now, releaseDate)
}

export const TrackLink = ({
  track,
  isNextRelease,
  released,
}: TrackLinkProps) => {
  const path = `/tracks/${track.slug}`
  const [now, setNow] = useState<null | Date>(new Date())

  useEffect(() => {
    const tickInterval = setTimeout(() => {
      setNow(new Date())
    }, 1000)
    return () => clearInterval(tickInterval)
  }, [now, isNextRelease])

  return (
    <Match path={path}>
      {(props) => {
        const { match } = props
        const { title, trackNumber } = track
        const hidden = props.location.pathname !== '/' && match === null

        return (
          <TextWrapper active={match} isHidden={hidden} aria-hidden={hidden}>
            <TrackNumber>{track.trackNumber}</TrackNumber>
            <TrackTitle released={released}>
              <Link to={path} aria-current={props.match ? 'page' : false}>
                {track.title}
              </Link>
            </TrackTitle>
            {now && isNextRelease ? (
              <Countdown>{formatTimeLeft(now, track.releaseDate)}</Countdown>
            ) : null}
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
