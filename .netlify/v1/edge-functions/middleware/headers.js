export default async (request, context) => {
  const response = await context.next();
  
  if (request.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  response.headers.set("Access-Control-Allow-Origin", "*");
  return response;
};