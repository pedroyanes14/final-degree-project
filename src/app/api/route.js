const { GoogleAuth } = require("google-auth-library");

const params = {
  apiEndpoint: "us-central1-aiplatform.googleapis.com",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  modelId: "text-bison@002",
  parameters: { temperature: 0.2, maxOutputTokens: 1024, topP: 0.8, topK: 40 },
};

export async function GET(request) {
  const auth = new GoogleAuth({
    /* credentials: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY      
    }, */
    scopes: "https://www.googleapis.com/auth/cloud-platform",
  });
  const client = await auth.getClient();
  const accessToken = (await client.getAccessToken()).token;

  const url = request.nextUrl.searchParams;
  const country = url.get("country");

  params.instances = [
    { content: `Make for me the best 2-day route in ${country}` },
  ];

  const data = { instances: params.instances, parameters: params.parameters };

  const response = await fetch(
    `https://${params.apiEndpoint}/v1/projects/${params.projectId}/locations/us-central1/publishers/google/models/${params.modelId}:predict`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const content = await response.json();

  return Response.json(content.predictions[0].content);
}
