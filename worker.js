const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>L'Oréal Smart Routine & Product Advisor</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Georgia', 'Times New Roman', serif; background-color: #f9f6f1; color: #1a1a1a; min-height: 100vh; display: flex; flex-direction: column; }
    header { background-color: #000; padding: 0; text-align: center; border-bottom: 3px solid #c4922a; }
    .header-top { background-color: #000; padding: 18px 24px 12px; }
    .logo-wordmark { font-family: 'Georgia', serif; font-size: 2.4rem; font-weight: 700; letter-spacing: 0.18em; color: #fff; text-transform: uppercase; }
    .logo-wordmark span { color: #c4922a; }
    .logo-tagline { font-size: 0.78rem; color: #c4922a; letter-spacing: 0.22em; text-transform: uppercase; margin-top: 4px; font-style: italic; }
    .header-banner { background: linear-gradient(135deg, #c4922a 0%, #e8b84b 50%, #c4922a 100%); padding: 10px 24px; }
    .header-banner h1 { font-size: 1rem; font-weight: 600; color: #000; letter-spacing: 0.1em; text-transform: uppercase; }
    main { flex: 1; max-width: 800px; width: 100%; margin: 32px auto; padding: 0 16px; display: flex; flex-direction: column; gap: 20px; }
    #chat-window { background: #fff; border: 1px solid #e0d9ce; border-radius: 12px; padding: 20px; min-height: 420px; max-height: 520px; overflow-y: auto; display: flex; flex-direction: column; gap: 16px; box-shadow: 0 2px 16px rgba(0,0,0,0.07); }
    .welcome-msg { text-align: center; color: #888; font-style: italic; font-size: 0.95rem; margin: auto; line-height: 1.6; }
    .welcome-msg strong { display: block; color: #c4922a; font-size: 1.1rem; margin-bottom: 6px; font-style: normal; }
    .message-group { display: flex; flex-direction: column; gap: 8px; }
    .user-label { font-size: 0.72rem; font-weight: 600; color: #888; letter-spacing: 0.08em; text-transform: uppercase; text-align: right; padding-right: 4px; }
    .bot-label { font-size: 0.72rem; font-weight: 600; color: #c4922a; letter-spacing: 0.08em; text-transform: uppercase; padding-left: 4px; }
    .bubble { padding: 12px 16px; border-radius: 18px; font-size: 0.95rem; line-height: 1.6; max-width: 82%; word-wrap: break-word; }
    .bubble.user { background: #000; color: #fff; border-bottom-right-radius: 4px; align-self: flex-end; margin-left: auto; }
    .bubble.bot { background: linear-gradient(135deg, #fdf8f1 0%, #fef6e8 100%); color: #1a1a1a; border: 1px solid #e8d8b8; border-bottom-left-radius: 4px; align-self: flex-start; }
    .typing-indicator { display: flex; align-items: center; gap: 5px; padding: 12px 16px; background: #fdf8f1; border: 1px solid #e8d8b8; border-radius: 18px; border-bottom-left-radius: 4px; width: fit-content; }
    .typing-indicator span { width: 8px; height: 8px; background: #c4922a; border-radius: 50%; animation: bounce 1.2s infinite; }
    .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
    .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes bounce { 0%, 60%, 100% { transform: translateY(0); } 30% { transform: translateY(-6px); } }
    .input-area { background: #fff; border: 1px solid #e0d9ce; border-radius: 12px; padding: 16px; box-shadow: 0 2px 16px rgba(0,0,0,0.07); }
    .input-row { display: flex; gap: 10px; align-items: flex-end; }
    #user-input { flex: 1; border: 1.5px solid #d4c9b8; border-radius: 24px; padding: 12px 18px; font-size: 0.95rem; font-family: 'Georgia', serif; resize: none; outline: none; background: #faf8f5; color: #1a1a1a; transition: border-color 0.2s; min-height: 48px; max-height: 120px; }
    #user-input:focus { border-color: #c4922a; background: #fff; }
    #user-input::placeholder { color: #b0a898; font-style: italic; }
    #send-btn { background: linear-gradient(135deg, #c4922a, #e8b84b); color: #000; border: none; border-radius: 24px; padding: 12px 24px; font-size: 0.9rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; transition: opacity 0.2s, transform 0.1s; white-space: nowrap; }
    #send-btn:hover { opacity: 0.9; transform: translateY(-1px); }
    #send-btn:active { transform: translateY(0); }
    #send-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
    .input-hint { font-size: 0.75rem; color: #b0a898; margin-top: 8px; text-align: center; font-style: italic; }
    .suggestions { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
    .suggestion-btn { background: #fff; border: 1.5px solid #c4922a; color: #c4922a; border-radius: 20px; padding: 7px 14px; font-size: 0.8rem; cursor: pointer; transition: all 0.2s; font-family: 'Georgia', serif; }
    .suggestion-btn:hover { background: #c4922a; color: #fff; }
    footer { background: #000; color: #888; text-align: center; padding: 20px 24px; font-size: 0.78rem; border-top: 2px solid #c4922a; letter-spacing: 0.05em; }
    footer a { color: #c4922a; text-decoration: none; }
    footer a:hover { text-decoration: underline; }
    footer .footer-links { margin-top: 6px; display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
    #chat-window::-webkit-scrollbar { width: 5px; }
    #chat-window::-webkit-scrollbar-track { background: #f0ece6; border-radius: 10px; }
    #chat-window::-webkit-scrollbar-thumb { background: #c4922a; border-radius: 10px; }
  </style>
</head>
<body>
  <header>
    <div class="header-top">
      <div class="logo-wordmark">L'<span>O</span>RÉAL <span>PARIS</span></div>
      <div class="logo-tagline">Because You're Worth It</div>
    </div>
    <div class="header-banner">
      <h1>Smart Routine &amp; Product Advisor</h1>
    </div>
  </header>
  <main>
    <div class="suggestions" id="suggestions">
      <button class="suggestion-btn" onclick="useSuggestion(this)">Best anti-aging serum?</button>
      <button class="suggestion-btn" onclick="useSuggestion(this)">Routine for dry skin</button>
      <button class="suggestion-btn" onclick="useSuggestion(this)">Serum vs treatment?</button>
      <button class="suggestion-btn" onclick="useSuggestion(this)">Best hair mask for damage</button>
      <button class="suggestion-btn" onclick="useSuggestion(this)">SPF recommendations</button>
    </div>
    <div id="chat-window">
      <div class="welcome-msg">
        <strong>Welcome to L'Oréal Smart Advisor ✨</strong>
        Ask me anything about L'Oréal products, skincare routines, or haircare tips — I'm here to help you look and feel your best!
      </div>
    </div>
    <div class="input-area">
      <div class="input-row">
        <textarea id="user-input" placeholder="Ask about L'Oréal products, routines, ingredients..." rows="1"></textarea>
        <button id="send-btn" onclick="sendMessage()">Send</button>
      </div>
      <div class="input-hint">Press Enter to send &nbsp;·&nbsp; Shift+Enter for new line</div>
    </div>
  </main>
  <footer>
    <div>© 2026 L'Oréal Paris. All Rights Reserved.</div>
    <div class="footer-links">
      <a href="#">Privacy Policy</a>
      <a href="#">Terms of Use</a>
      <a href="#">Contact Us</a>
      <a href="#">Cookie Preferences</a>
    </div>
  </footer>
  <script>
    const WORKER_URL = window.location.href.replace(/\\/$/, '')
    const conversationHistory = []
    let isLoading = false
    const chatWindow = document.getElementById('chat-window')
    const userInput = document.getElementById('user-input')
    const sendBtn = document.getElementById('send-btn')

    userInput.addEventListener('input', () => {
      userInput.style.height = 'auto'
      userInput.style.height = Math.min(userInput.scrollHeight, 120) + 'px'
    })
    userInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
    })
    function useSuggestion(btn) {
      userInput.value = btn.textContent
      userInput.dispatchEvent(new Event('input'))
      sendMessage()
    }
    function scrollToBottom() { chatWindow.scrollTop = chatWindow.scrollHeight }
    function clearWelcome() {
      const welcome = chatWindow.querySelector('.welcome-msg')
      if (welcome) welcome.remove()
      const suggestions = document.getElementById('suggestions')
      if (suggestions) suggestions.style.display = 'none'
    }
    function appendMessage(role, text) {
      clearWelcome()
      const group = document.createElement('div')
      group.classList.add('message-group')
      if (role === 'user') {
        const label = document.createElement('div')
        label.classList.add('user-label')
        label.textContent = 'You'
        group.appendChild(label)
        const bubble = document.createElement('div')
        bubble.classList.add('bubble', 'user')
        bubble.textContent = text
        group.appendChild(bubble)
      } else {
        const label = document.createElement('div')
        label.classList.add('bot-label')
        label.textContent = "L'Oréal Advisor"
        group.appendChild(label)
        const bubble = document.createElement('div')
        bubble.classList.add('bubble', 'bot')
        bubble.textContent = text
        group.appendChild(bubble)
      }
      chatWindow.appendChild(group)
      scrollToBottom()
    }
    function showTyping() {
      clearWelcome()
      const group = document.createElement('div')
      group.classList.add('message-group')
      group.id = 'typing-group'
      const label = document.createElement('div')
      label.classList.add('bot-label')
      label.textContent = "L'Oréal Advisor"
      group.appendChild(label)
      const indicator = document.createElement('div')
      indicator.classList.add('typing-indicator')
      indicator.innerHTML = '<span></span><span></span><span></span>'
      group.appendChild(indicator)
      chatWindow.appendChild(group)
      scrollToBottom()
    }
    function removeTyping() {
      const el = document.getElementById('typing-group')
      if (el) el.remove()
    }
    async function sendMessage() {
      const text = userInput.value.trim()
      if (!text || isLoading) return
      isLoading = true
      sendBtn.disabled = true
      userInput.value = ''
      userInput.style.height = 'auto'
      appendMessage('user', text)
      conversationHistory.push({ role: 'user', content: text })
      showTyping()
      try {
        const response = await fetch(WORKER_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: conversationHistory })
        })
        const data = await response.json()
        removeTyping()
        if (data.choices && data.choices[0]) {
          const reply = data.choices[0].message.content
          conversationHistory.push({ role: 'assistant', content: reply })
          appendMessage('bot', reply)
        } else {
          appendMessage('bot', "I'm having a moment — please try again! 💛")
        }
      } catch (err) {
        removeTyping()
        appendMessage('bot', "Connection issue — please try again in a moment. 💛")
      }
      isLoading = false
      sendBtn.disabled = false
      userInput.focus()
    }
  </script>
</body>
</html>`

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    })
  }

  // Serve the frontend on GET
  if (request.method === 'GET') {
    return new Response(HTML, {
      headers: { 'Content-Type': 'text/html;charset=UTF-8' }
    })
  }

  // Handle chat on POST
  if (request.method === 'POST') {
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

  return new Response('Not found', { status: 404 })
}
