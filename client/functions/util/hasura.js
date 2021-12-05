const fetch = require("node-fetch");

exports.hasuraRequest = async function ({ query, variables }) {
  const result = await fetch(process.env.REACT_APP_HASURA_URL, {
    // GraphQL query is always sent as POST
    method: "POST",
    headers: {
      "X-Hasura-Admin-Secret":
        process.env.REACT_APP_HASURA_GRAPHQL_ADMIN_SECRET,
    },
    body: JSON.stringify({ query, variables }),
  }).then((res) => res.json());

  if (!result || !result.data) {
    console.error(result);
    return [];
  }

  return result.data;
};
