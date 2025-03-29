export default {
  async fetch(request) {
    // Define a typical desktop User-Agent
    const desktopUA =
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36";
    
    // Clone the request and set the desktop User-Agent
    const modifiedHeaders = new Headers(request.headers);
    modifiedHeaders.set("User-Agent", desktopUA);
    const modifiedRequest = new Request(request, { headers: modifiedHeaders });
    
    // Fetch the response from Blogger using the modified request
    let response = await fetch(modifiedRequest);
    
    // If Blogger is issuing a redirect (3xx) and the Location header includes "m=1"
    if (response.status >= 300 && response.status < 400) {
      let loc = response.headers.get("Location");
      if (loc && loc.includes("m=1")) {
        // Remove the m=1 parameter from the URL (works for both ?m=1 and &m=1)
        const newLoc = loc.replace(/(\?|&)m=1/, "");
        return Response.redirect(newLoc, response.status);
      }
    }
    
    return response;
  }
};

