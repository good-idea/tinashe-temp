import * as React from 'react'
import { Link, Location } from '@reach/router'
import styled, { css } from '@xstyled/styled-components'
import { useSiteData } from '../context/SiteData'
import { TrackLink } from '../components/TrackLink'
import { Header2, Ol } from '../components/Text'

interface NavProps {
  isHomepage: boolean
}

const Nav = styled.nav`
  ${({ isHomepage }: NavProps) => css`
    position: fixed;
    top: 0;
    left: 0;
    mix-blend-mode: ${isHomepage ? 'initial' : 'difference'};
    color: ${isHomepage ? 'black' : '#a9a5a6'};
  `}
`

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
  if (loading || !data) return null
  return (
    <Location>
      {({ location }) => (
        <Nav isHomepage={location.pathname === '/'}>
          <TrackList>
            <Title>
              <Link to="/">{data.settings.albumTitle}</Link>
            </Title>
            {data.tracks.map((track) => (
              <TrackLink key={track.slug} track={track} />
            ))}
          </TrackList>
        </Nav>
      )}
    </Location>
  )
}
