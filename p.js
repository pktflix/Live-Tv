addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const targetUrl = url.searchParams.get('url')
  if (!targetUrl) {
    return new Response('Missing url parameter', { status: 400 })
  }

  // Fetch the original request
  const response = await fetch(targetUrl, {
    method: request.method,
    headers: request.headers,
    redirect: 'follow'
  })

  // Create a new response with CORS headers
  const newHeaders = new Headers(response.headers)

  newHeaders.set('Access-Control-Allow-Origin', '*')
  newHeaders.set('Access-Control-Allow-Methods', 'GET,HEAD,POST,OPTIONS')
  newHeaders.set('Access-Control-Allow-Headers', '*')

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders
  })
}
