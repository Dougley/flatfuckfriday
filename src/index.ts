import { APIInteraction, InteractionResponseType, InteractionType } from 'discord-api-types/v10'
import { makeAnimal } from './animals'
import { checkSecurityHeaders } from './util/security'

export default {
  fetch: async (req: Request, env: Record<string, any>) => {
    const body = await req.text()
    const verified = await checkSecurityHeaders(req, body, env)
    if (!verified) return new Response('Invalid signature', { status: 401 })

    const ctx = JSON.parse(body) as APIInteraction
    switch (ctx.type) {
      case InteractionType.Ping: {
        return new Response(JSON.stringify({ type: InteractionResponseType.Pong }), {
          headers: {
            'Content-Type': 'application/json'
          }
        })
      }
      case InteractionType.ApplicationCommand: {
        return makeAnimal()
      }
    }
  }
}
