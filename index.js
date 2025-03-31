export default {
  async fetch(request, env, ctx) {
    const response = await fetch(request);

    // Check if it's a 302 redirect to ?m=1
    if (
      response.status === 302 &&
      response.headers.get("Location")?.includes("?m=1")
    ) {
      // Copy headers and change status to 301
      const newHeaders = new Headers(response.headers);
      return new Response(null, {
        status: 301,
        headers: newHeaders,
      });
    }

    // Otherwise, return original response
    return response;
  },
};
