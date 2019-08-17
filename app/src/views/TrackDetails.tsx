import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { useSiteData } from '../context/SiteData'
import { NotFound } from './NotFound'

const Wrapper = styled.div`
  img {
    width: 100%;
    height: 100%;
    position: fixed;
    object-fit: cover;
    z-index: -1;
  }
`

interface TrackDetailsProps {
  path: string
  trackName: string
}

export const TrackDetails = (props: TrackDetailsProps) => {
  const { loading, data, error, getTrack } = useSiteData()
  const track = getTrack(props.trackName)
  console.log(track)
  console.log(props)
  if (loading || error || !data) return null
  if (!track) return <NotFound />
  const { tracks } = data
  return (
    <Wrapper>
      {tracks.map((track) => (
        <img
          style={{ opacity: track.slug === props.trackName ? 1 : 0 }}
          key={track.background.url}
          src={track.background.url}
        />
      ))}
    </Wrapper>
  )
}
