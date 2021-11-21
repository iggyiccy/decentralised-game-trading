const fetch = require("node-fetch");
const { hasuraRequest } = require("./util/hasura");
const web3 = require("web3");

exports.handler = async () => {
  // Get the user's ethereum address
  const { address } = await web3.eth.getAccounts();

  // Create the user in the database
  const hasuraPromise = hasuraRequest({
    query: `
      mutation CreateUser {
        insert_users(objects: {user_id: "0x811A49Bea75c77a0F9b67b21032b9d79849cA4BD", postcode: 1234, email: "light@test.com", newsletter: true, trading: true}) {
          returning {
            created_at
          }
        }
      }
    `,
    variables: {
      corgis: corgis.map(({ id }) => ({ id, count: 0 })),
    },
  });

  const [unsplashData, hasuraData] = await Promise.all([
    unsplashPromise,
    hasuraPromise,
  ]);

  const completeData = corgis.map((corgi) => {
    const photo = unsplashData.find((p) => corgi.id === p.id);
    const boops = hasuraData.boops.returning.find((b) => b.id === corgi.id);

    return {
      ...corgi,
      alt: photo.alt_description,
      credit: photo.user.name,
      url: `${photo.urls.raw}&auto=format&fit=crop&w=300&h=300&q=80&crop=entropy`,
      boops: boops.count,
    };
  });

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(completeData),
  };
};
