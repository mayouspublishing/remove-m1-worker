export default {
  async fetch(request) {
    // Clone the request and update the headers
    const modifiedHeaders = new Headers(request.headers);
    
    // Set a typical desktop User-Agent (this one is Chrome on Windows)
    modifiedHeaders.set(
      "User-Agent",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
    );
    
    // Create a new request with the updated headers
    const modifiedRequest = new Request(request, { headers: modifiedHeaders });
    
    // Fetch and return the response using the modified request
    return fetch(modifiedRequest);
  }
};
