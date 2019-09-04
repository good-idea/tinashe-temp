import * as React from 'react'
import { withRouter, Link, RouteComponentProps } from 'react-router-dom'
import styled, { css } from '@xstyled/styled-components'
import { Track } from '../types'
import { useSiteData } from '../context/SiteData'
import { TrackLink } from '../components/TrackLink'
import { Header2, Ol } from '../components/Text'

const { useState, useEffect } = React

interface NavProps {
  isHomepage: boolean
}

const Nav = styled.nav`
  ${({ isHomepage }: NavProps) => css`
    flex-grow: 1;
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

interface NavigationProps extends RouteComponentProps {
  /* */
}

const unreleased = (track: Track) => track.releaseDate > new Date()

const sortByReleaseDate = (a: Track, b: Track): number => {
  if (a.releaseDate > b.releaseDate) return 1
  if (a.releaseDate < b.releaseDate) return -1
  return -1
}

function head<T>(arr: T[]): T | void {
  return arr.length ? arr[0] : undefined
}

export const NavigationBase = (props: NavigationProps) => {
  const { location } = props
  const siteData = useSiteData()
  const { loading, data } = siteData
  const now = new Date()

  const nextRelease =
    data && data.tracks
      ? head(data.tracks.filter(unreleased).sort(sortByReleaseDate))
      : undefined

  if (loading || !data) return null
  return (
    <Nav isHomepage={location.pathname === '/'}>
      <TrackList>
        <Title>
          <Link to="/">{data.settings.albumTitle}</Link>
        </Title>
        {data.tracks.map((track) => (
          <TrackLink
            location={location}
            key={track.slug}
            track={track}
            isNextRelease={track === nextRelease}
            released={track.releaseDate < now}
          />
        ))}
      </TrackList>
    </Nav>
  )
}

export const Navigation = withRouter(NavigationBase)
