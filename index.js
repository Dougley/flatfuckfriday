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
  'https://b2.dougley.com/fff/vid4.mp4',
  'https://cdn.discordapp.com/attachments/577263838483972117/829803295949324298/yiscwazwjyr61.mp4',
  'https://b2.dougley.com/fff/img1.jpg',
  'https://b2.dougley.com/fff/img2.png',
  'https://b2.dougley.com/fff/img3.jpg',
  'https://b2.dougley.com/fff/img4.jpg',
  'https://twitter.com/Eflare/status/1362579805422559235',
  'https://twitter.com/krithgor/status/1251161012457205762',
  'https://twitter.com/VSavron/status/1405924528593702918?s=20',
  'https://twitter.com/Dewndeym/status/1246114373489381376?s=19',
  'https://twitter.com/merzb0w/status/1243641348479053824?s=20',
  '<:flatfuck1:759062458307575849><:flatfuck2:759062460446539796><:flatfuck3:759062458144522300>\n<:flatfuck4:759062457896403004><:flatfuck5:759062460253995019><:flatfuck6:759062457708052559>',
]

async function respondToInteraction(request) {
  switch (request.type) {
    case 1: return new Response(JSON.stringify({ type: 1 }))
    case 2: {
      const today = new Date().getDay()
      // const today = 5
      switch (today) {
        case 4: {
          return new Response(
            JSON.stringify({
              type: 4,
              data: {
                content: 'https://b2.dougley.com/fff/tomorrow.jpg',
              },
            }), {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          )
        }
        case 5: {
          return new Response(
            JSON.stringify({
              type: 4,
              data: {
                // content: 'https://b2.dougley.com/fff/vid1.mp4'
                content: flatfucks[Math.floor(Math.random() * flatfucks.length)],
                components: [{
                  type: 1,
                  components: [{ 
                    type: 2,
                    label: "Reroll",
                    style: 1,
                    custom_id: "click_one"
                   }]
                }]
              },
            }), {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          )
        }
        case 7: {
          return new Response(
            JSON.stringify({
              type: 4,
              data: {
                content: 'https://b2.dougley.com/fff/sunday.mp4'
              },
            }), {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          )
        }
        default: {
          return new Response(
            JSON.stringify({
              type: 4,
              data: {
                // content: 'https://b2.dougley.com/fff/notyet.mp4',
                content: `It's not friday yet, next friday is <t:${(nextDay(5).getTime() / 1000).toFixed()}:R>`
              },
            }), {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          )
        }
      }  
    }
    case 3: {
      return new Response(
        JSON.stringify({
          type: 7,
          data: {
            // content: 'https://b2.dougley.com/fff/vid1.mp4'
            content: flatfucks[Math.floor(Math.random() * flatfucks.length)],
            components: [{
              type: 1,
              components: [{ 
                type: 2,
                label: "Reroll",
                style: 1,
                custom_id: "click_one"
               }]
            }]
          },
        }), {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
  }
}

function nextDay(x) { // https://stackoverflow.com/a/1579109
  var now = new Date();    
  now.setDate(now.getDate() + (x+(7-now.getDay())) % 7);
  now = new Date(now.toUTCString().substr(0, 16)) // lol, what works works
  return now;
}