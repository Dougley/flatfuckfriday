import { APIInteraction, InteractionResponseType, Snowflake } from 'discord-api-types/v10'

export function callback (msg: string | object, ephemeral: Boolean = false) {
  return new Response(JSON.stringify({
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      ...((typeof msg === 'string') ? { content: msg } : msg),
      allowed_mentions: {
        parse: []
      },
      ...(ephemeral ? { flags: 64 } : {})
    }
  }), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function defer () {
  return new Response(JSON.stringify({
    type: InteractionResponseType.DeferredChannelMessageWithSource
  }), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export async function editCallback (ctx: APIInteraction, msg: string | object) {
  return await fetch(`https://discord.com/api/v10/webhooks/${ctx.application_id}/${ctx.token}/messages/@original`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      data: {
        ...((typeof msg === 'string') ? { content: msg } : msg),
        allowed_mentions: {
          parse: []
        }
      }
    })
  })
}

export async function deleteCallback (ctx: APIInteraction) {
  return await fetch(`https://discord.com/api/v10/webhooks/${ctx.application_id}/${ctx.token}/messages/@original`, {
    method: 'DELETE'
  })
}

export async function createMessage (ctx: APIInteraction, msg: string | object) {
  return await fetch(`https://discord.com/api/v10/webhooks/${ctx.application_id}/${ctx.token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...((typeof msg === 'string') ? { content: msg } : msg),
      allowed_mentions: {
        parse: []
      }
    })
  })
}

export async function deleteMessage (ctx: APIInteraction, msg: Snowflake) {
  return await fetch(`https://discord.com/api/v10/webhooks/${ctx.application_id}/${ctx.token}/messages/${msg}`, {
    method: 'DELETE'
  })
}

export async function editMessage (ctx: APIInteraction, id: Snowflake, msg: string | object) {
  return await fetch(`https://discord.com/api/v10/webhooks/${ctx.application_id}/${ctx.token}/messages/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...((typeof msg === 'string') ? { content: msg } : msg),
      allowed_mentions: {
        parse: []
      }
    })
  })
}

export function createAutocompleteReply (choices: Array<{name: string, value: string}>) {
  return new Response(JSON.stringify({
    type: InteractionResponseType.ApplicationCommandAutocompleteResult,
    data: {
      choices
    }
  }), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
