import * as React from 'react'
import { Link } from '@reach/router'
import styled, { css } from '@xstyled/styled-components'
import { useSiteData } from '../context/SiteData'
import { TrackLink } from '../components/TrackLink'
import { Header2, Ol } from '../components/Text'

const Nav = styled.nav``

const Title = styled(Header2)`
  margin-bottom: 5;
`

const TrackList = styled(Ol)`
  margin: 0;
  padding: 6 8;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

interface NavigationProps {
  /* */
}

export const Navigation = (props: NavigationProps) => {
  const siteData = useSiteData()

  const { loading, data } = siteData
  if (loading) return null
  return (
    <Nav>
      <TrackList>
        <Title>
          <Link to="/">{data.settings.albumTitle}</Link>
        </Title>
        {data.tracks.map((track) => (
          <TrackLink key={track.slug} track={track} />
        ))}
      </TrackList>
    </Nav>
  )
}
