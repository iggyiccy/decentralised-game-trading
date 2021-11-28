import { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
  const { formState } = JSON.parse(event.body);
  console.log({ formState });
  return {
    statusCode: 200,
    body: JSON.stringify({
      formState,
      message: "This is the formState - ${formState}",
    }),
  };
};
