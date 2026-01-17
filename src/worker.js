import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event));
});

async function handleRequest(event) {
  try {
    // Try to serve the static asset
    return await getAssetFromKV(event);
  } catch (e) {
    // If asset not found, serve index.html for SPA routing
    try {
      let notFoundResponse = await getAssetFromKV(event, {
        mapRequestToAsset: (req) => new Request(`${new URL(req.url).origin}/index.html`, req),
      });
      return new Response(notFoundResponse.body, {
        ...notFoundResponse,
        status: 200,
      });
    } catch (e) {
      return new Response('Not Found', { status: 404 });
    }
  }
}
