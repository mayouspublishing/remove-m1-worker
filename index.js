export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Check if ?m=1 is present in the query parameters
    if (url.searchParams.has("m") && url.searchParams.get("m") === "1") {
      // Remove the m=1 parameter
      url.searchParams.delete("m");

      // Return a 301 redirect to the cleaned URL
      return Response.redirect(url.toString(), 301);
    }

    // If no m=1, just pass through
    return fetch(request);
  },
};
