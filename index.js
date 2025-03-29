export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.searchParams.get("m") === "1") {
      url.searchParams.delete("m");
      return Response.redirect(url.toString(), 301);
    }

    return fetch(request);
  }
}

