import { SanityClient } from '../types'
import { ExpectedQueryResult } from '../context/SiteData/query'
import { imageStub } from './stubs'

const createMockClient = (result: ExpectedQueryResult) => ({
  fetch: jest.fn().mockResolvedValue(result),
})

export const happyResult: ExpectedQueryResult = {
  tracks: [
    {
      trackNumber: 3,
      title: 'Track 3',
      slug: 'track-3',
      releaseDate: new Date().toString(),
    },
    {
      trackNumber: 1,
      slug: 'track-1',
      title: 'Track One',
      releaseDate: new Date().toString(),
    },
  ],
  settings: {
    seoTitle: 'Tinashe - Songs For You',
    seoDescription: 'Sample description',
    seoImage: imageStub,
  },
}

export const mockClient = createMockClient(happyResult)

export const mockClientWithErrors = {
  fetch: jest.fn().mockRejectedValue('There was an error'),
}
