export default {
  async fetch(request) {
    // Perform the fetch with manual redirect mode
    const response = await fetch(request, { redirect: "manual" });
    
    // Check if the response is a 302 redirect
    if (response.status === 302) {
      const location = response.headers.get("Location");
      // If the location exists and includes "m=1", create a new permanent redirect (301)
      if (location && location.includes("m=1")) {
        return new Response(null, {
          status: 301,
          headers: { "Location": location }
        });
      }
    }
    
    // Otherwise, return the response as-is
    return response;
  }
};

