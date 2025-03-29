export default {
  async fetch(request) {
    const url = new URL(request.url);

    // If the URL contains ?m=1 or &m=1, remove it and redirect
    if (url.searchParams.get("m") === "1") {
      url.searchParams.delete("m");
      return Response.redirect(url.toString(), 301);
    }

    return fetch(request);
  }
}
