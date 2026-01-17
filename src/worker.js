export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Try to get the asset from the static assets binding
    try {
      const response = await env.ASSETS.fetch(request);
      if (response.status !== 404) {
        return response;
      }
    } catch (e) {
      // Asset not found, fall through to serve index.html
    }
    
    // For SPA routing, serve index.html for any path
    return env.ASSETS.fetch(new Request(new URL('/index.html', url.origin), request));
  }
};
