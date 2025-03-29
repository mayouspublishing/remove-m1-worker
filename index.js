export default {
  async fetch(request) {
    const url = new URL(request.url);
    const cookieHeader = request.headers.get("Cookie") || "";
    
    // If the URL has ?m=1 and we haven't already cleaned it (no cookie set)
    if (url.searchParams.get("m") === "1" && !cookieHeader.includes("cleaned=true")) {
      url.searchParams.delete("m");
      const newUrl = url.toString();
      
      // Create a redirect response to the clean URL
      const response = Response.redirect(newUrl, 301);
      
      // Set a cookie so that subsequent requests won't be redirected again
      response.headers.append("Set-Cookie", "cleaned=true; Path=/; Max-Age=3600");
      return response;
    }
    
    // Otherwise, just fetch the request as is
    return fetch(request);
  }
};
