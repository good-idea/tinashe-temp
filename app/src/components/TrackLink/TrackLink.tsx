import * as React from 'react'
import { matchPath } from 'react-router'
import { Link } from 'react-router-dom'
import { ScrambledText } from 'scrambled-text'
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
  location: {
    pathname: string
  }
}

const formatTimeLeft = (now: Date, releaseDate: Date): string => {
  if (now > releaseDate) return ''
  return formatTimeDistance(now, releaseDate)
}

export const TrackLink = ({
  track,
  isNextRelease,
  released,
  location,
}: TrackLinkProps) => {
  const path = `/tracks/${track.slug}`
  const [now, setNow] = useState<null | Date>(new Date())
  const match = matchPath(location.pathname, path)

  const { title, trackNumber } = track
  const hidden = location.pathname !== '/' && match === null

  useEffect(() => {
    if (!isNextRelease) return () => undefined
    const tickInterval = setTimeout(() => {
      setNow(new Date())
    }, 1000)
    return () => clearInterval(tickInterval)
  }, [now, isNextRelease])

  return (
    <TextWrapper active={match} isHidden={hidden} aria-hidden={hidden}>
      <TrackNumber>{track.trackNumber}</TrackNumber>
      <TrackTitle released={released}>
        <Link to={path} aria-current={match ? 'page' : false}>
          <ScrambledText
            duration={1000 + trackNumber * 700}
            text={track.title}
            config={{ sequential: true, preserveCasing: true }}
            running={released}
          />
        </Link>
      </TrackTitle>
      {now && isNextRelease ? (
        <Countdown>{formatTimeLeft(now, track.releaseDate)}</Countdown>
      ) : null}
      {match ? (
        <TrackButtons>
          <LinkButton>Share</LinkButton>
          <a href="https://www.google.com">Listen</a>
        </TrackButtons>
      ) : null}
    </TextWrapper>
  )
}
