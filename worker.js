addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    })
  }

  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const { messages } = await request.json()

    const systemPrompt = `You are "Smart Routine & Product Advisor," a knowledgeable and friendly beauty expert for L'Oréal. You help customers discover L'Oréal products and build personalized beauty routines.

You ONLY answer questions about:
- L'Oréal products across all lines (skincare, haircare, makeup, fragrance, men's grooming)
- Beauty routines, skincare steps, and haircare tips
- Ingredient explanations as they relate to beauty products
- Comparisons between L'Oréal product lines (e.g., Revitalift vs. Age Perfect)
- General beauty and self-care advice tied to L'Oréal solutions

If a user asks about anything unrelated to beauty, skincare, haircare, or L'Oréal products, politely decline and redirect them. For example: "I'm your L'Oréal beauty advisor — I'm best equipped to help with skincare, haircare, and product recommendations! What can I help you with today? 💄"

Be warm, enthusiastic, and empowering. Use occasional emojis. Always end by offering further help.`

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        max_tokens: 600,
        temperature: 0.7
      })
    })

    const data = await response.json()

    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  }
}
