export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Only inject canonical if the page has m=1
    if (url.searchParams.get("m") === "1") {
      const cleanUrl = new URL(url);
      cleanUrl.searchParams.delete("m");

      // Fetch the original response
      const originalResponse = await fetch(request);
      const contentType = originalResponse.headers.get("content-type") || "";

      // Only process HTML responses
      if (contentType.includes("text/html")) {
        const originalText = await originalResponse.text();

        // Inject <link rel="canonical"> in <head>
        const canonicalTag = `<link rel="canonical" href="${cleanUrl.toString()}"/>`;

        const modifiedHtml = originalText.replace(
          /<head[^>]*>/i,
          (match) => `${match}\n  ${canonicalTag}`
        );

        return new Response(modifiedHtml, {
          status: originalResponse.status,
          headers: {
            "Content-Type": contentType,
          },
        });
      }

      // If not HTML, return original response
      return originalResponse;
    }

    // If no m=1, just return the original response
    return fetch(request);
  },
};
