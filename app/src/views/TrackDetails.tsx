import * as React from 'react'
import { RouteComponentProps } from 'react-router'
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

interface TrackParams {
  trackName: string
}

interface TrackDetailsProps extends RouteComponentProps<TrackParams> {
  path: string
  trackName?: string
}

export const TrackDetails = (props: TrackDetailsProps) => {
  const { trackName } = props.match.params
  const { loading, data, error, getTrack } = useSiteData()
  if (loading || error || !data) return null
  const track = getTrack(trackName)
  if (!track) return <NotFound />
  const { tracks } = data
  return (
    <Wrapper>
      {tracks.map((track) =>
        track.background ? (
          <img
            style={{ opacity: track.slug === trackName ? 1 : 0 }}
            key={track.background.url}
            src={track.background.url}
          />
        ) : null,
      )}
    </Wrapper>
  )
}
