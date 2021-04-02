const DISCORD_NACL_PUBLIC_KEY =
  '6287914aeafeeb18a0363471ada96e23e9ef53843657aa9346c98d98939371e3'
const nacl = require('tweetnacl')

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method !== 'POST')
    return new Response('Method not allowed', {
      status: 405,
    })
  const body = await request.text()
  const securityResponse = await checkSecurityHeaders(request, body)
  if (securityResponse && securityResponse instanceof Response)
    return securityResponse
  return respondToInteraction(JSON.parse(body))
}

async function checkSecurityHeaders(request, body) {
  const signature = request.headers.get('X-Signature-Ed25519')
  const timestamp = request.headers.get('X-Signature-Timestamp')

  const verified = nacl.sign.detached.verify(
    Buffer.from(timestamp + body),
    Buffer.from(signature, 'hex'),
    Buffer.from(DISCORD_NACL_PUBLIC_KEY, 'hex'),
  )
  if (!verified)
    return new Response('Security header violation', {
      status: 403,
    })
}

const flatfucks = [
  'https://b2.dougley.com/fff/vid1.mp4',
  'https://b2.dougley.com/fff/vid2.mp4',
  'https://b2.dougley.com/fff/vid3.mp4',
  'https://b2.dougley.com/fff/img1.jpg',
  'https://b2.dougley.com/fff/img2.png',
  'https://b2.dougley.com/fff/img3.jpg',
  'https://b2.dougley.com/fff/img4.jpg',
  'https://twitter.com/Eflare/status/1362579805422559235',
  '<:flatfuck1:759062458307575849><:flatfuck2:759062460446539796><:flatfuck3:759062458144522300>\n<:flatfuck4:759062457896403004><:flatfuck5:759062460253995019><:flatfuck6:759062457708052559>',
]

async function respondToInteraction(request) {
  if (request.type === 1) return new Response(JSON.stringify({ type: 1 }))
  else {
    const today = new Date().getDay()
    switch (today) {
      case 4: {
        return new Response(
          JSON.stringify({
            type: 4,
            data: {
              content: 'https://b2.dougley.com/fff/tomorrow.jpg',
            },
          }),
        )
      }
      case 5: {
        return new Response(
          JSON.stringify({
            type: 4,
            data: {
              // content: 'https://b2.dougley.com/fff/vid1.mp4'
              content: flatfucks[Math.floor(Math.random() * flatfucks.length)],
            },
          }),
        )
      }
      default: {
        return new Response(
          JSON.stringify({
            type: 4,
            data: {
              content: 'You can only use this command on a friday',
            },
          }),
        )
      }
    }
  }
}
