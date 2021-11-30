import { Handler } from "@netlify/functions";

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // When the method is POST, the name will no longer be in the event’s
  // queryStringParameters – it’ll be in the event body encoded as a query string
  const params = JSON.parse(event.body);
  const name = params.name || "World";

  return {
    statusCode: 200,
    body: `Hello, ${name}`,
  };
};
