export default {
  async fetch(request) {
    // Fetch the original response from Blogger
    const response = await fetch(request);

    // Check if the response is a 302 redirect
    if (response.status === 302) {
      const location = response.headers.get("Location");
      // If the Location header contains "m=1", change redirect to permanent (301)
      if (location && location.includes("m=1")) {
        return Response.redirect(location, 301);
      }
    }
    
    // Otherwise, return the original response
    return response;
  }
};

