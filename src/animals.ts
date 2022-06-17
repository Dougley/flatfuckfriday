/* eslint-disable n/no-callback-literal */
import animals from './data/animals.json'
import adjectives from './data/adjectives.json'
import { imageSearch } from './util/google-images'
import { generate } from './util/memegen'
import { callback } from './util/interactions'

export async function makeAnimal (): Promise<Response> {
  // get a random adjective and a random animal
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
  const animal = animals[Math.floor(Math.random() * animals.length)]
  // get the name of today
  const date = new Date()
  const day = date.toLocaleString('en-US', { weekday: 'long' })
  // search for an animal image
  const image = await imageSearch(animal)
  // memegen it
  const url = generate({
    template: 'custom',
    bottom: `${adjective}_${animal}_${day}`,
    customBackground: image
  })
  console.log(adjective, animal, day, image, url)
  // send it to the user
  return callback({
    embeds: [{
      image: {
        url
      }
    }]
  })
}
