import * as React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import { SiteDataProvider, useSiteData } from '../context/SiteData'
import { parseData } from '../context/siteData/parseData'
import { mockClient, mockClientWithErrors, happyResult } from './mockedClient'

const DummyInner = () => {
  const { loading, data, error } = useSiteData()
  if (loading) return <p>'Loading...'</p>
  if (error) return <p>Error: {error}</p>
  return (
    <>
      <p>Everything loaded ok!</p>
      <ul>
        {data.tracks.map((track) => (
          <li key={track.slug}>
            {track.trackNumber} - {track.title}
          </li>
        ))}
      </ul>
    </>
  )
}

describe('SiteData', () => {
  it('should start with "loading" and then pass down the loaded data', async () => {
    const { container, getByTestId, debug } = render(
      <SiteDataProvider client={mockClient}>
        <DummyInner />
      </SiteDataProvider>
    )
    expect(container.textContent).toContain('Loading...')
    await wait()
    expect(container.textContent).toContain('Everything loaded ok!')
  })

  it('should return the tracks sorted by trackNumber', async () => {
    const { container, getByTestId, debug } = render(
      <SiteDataProvider client={mockClient}>
        <DummyInner />
      </SiteDataProvider>
    )
    await wait()
    const trackListItems = container.querySelectorAll('li')
    trackListItems.forEach((listItem, index) => {
      expect(listItem.textContent).toContain(`${index + 1} - `)
    })
  })

  it('should return with an error message if the request failed', async () => {
    const { container, getByTestId, debug } = render(
      <SiteDataProvider client={mockClientWithErrors}>
        <DummyInner />
      </SiteDataProvider>
    )
    expect(container.textContent).toContain('Loading...')
    await wait()
    expect(container.textContent).toContain('Error:')
  })
})

describe('useSiteData', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error')
    //@ts-ignore
    console.error.mockImplementation(() => {})
  })

  afterEach(() => {
    //@ts-ignore
    console.error.mockRestore()
  })
  it('should throw an error if used outside of the Context', () => {
    const shouldFail = () => render(<DummyInner />)
    expect(shouldFail).toThrow()
    // expect(a).toBe(b)
  })
})

describe('parseData', () => {
  it('should filter out tracks with missing data', async () => {
    const tracks = [
      { trackNumber: 5, releaseDate: new Date().toString(), slug: 'abc' }, // missing title, should filter out
      {
        trackNumber: 3,
        releaseDate: new Date().toString(),
        title: 'Track Title',
      }, // missing slug, should filter out
      {
        trackNumber: '3',
        releaseDate: new Date().toString(),
        title: 'Track Title',
      }, // trackNumber type is wrong, should filter out
      { trackNumber: 1, title: 'Track 2 Title', slug: 'track-2-title' }, // missing releaseDate
      {
        trackNumber: 1,
        releaseDate: new Date().toString(),
        title: 'Track 2 Title',
        slug: 'track-2-title',
      }, // should not be filtered
    ]
    const parsed = parseData({
      // @ts-ignore
      tracks,
      settings: happyResult.settings,
    })

    expect(parsed.tracks.length).toBe(1)
    expect(parsed.tracks[0].slug).toBe('track-2-title')
  })

  it('should sort tracks by track number', async () => {
    const tracks = [
      {
        trackNumber: 3,
        releaseDate: new Date().toString(),
        title: 'Track 2 Title',
        slug: 'track-2-title',
      },

      {
        trackNumber: 4,
        releaseDate: new Date().toString(),
        title: 'Track 4 Title',
        slug: 'track-4-title',
      },

      {
        trackNumber: 3,
        releaseDate: new Date().toString(),
        title: 'Track 3 Title',
        slug: 'track-3-title',
      },

      {
        trackNumber: 1,
        releaseDate: new Date().toString(),
        title: 'Track 1 Title',
        slug: 'track-1-title',
      },
    ]
    const parsed = parseData({
      tracks,
      settings: happyResult.settings,
    })
    expect(parsed.tracks.length).toBe(4)
    expect(parsed.tracks[0].trackNumber).toBe(1)
    expect(parsed.tracks[1].trackNumber).toBe(2)
    expect(parsed.tracks[2].trackNumber).toBe(3)
    expect(parsed.tracks[3].trackNumber).toBe(4)
  })

  it('should transform the releaseDate string into a date', async () => {
    const parsed = parseData(happyResult)
    expect(parsed.tracks.length).toBe(2)
    expect(parsed.tracks[0].releaseDate).toBeInstanceOf(Date)
  })
})
