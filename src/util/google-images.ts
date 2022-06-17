// @ts-ignore
import GImages from 'free-google-images'

export async function imageSearch (query: string): Promise<string> {
  const data = await GImages.searchRandom(query)
  return data.image.url
}
