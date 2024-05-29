const { GoogleAuth } = require("google-auth-library");

const params = {
  apiEndpoint: "us-central1-aiplatform.googleapis.com",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  modelId: "text-bison@002",
  parameters: { temperature: 0.2, maxOutputTokens: 1024, topP: 0.8, topK: 40 },
};

const cache = {};

export async function GET(request) {
  const auth = new GoogleAuth({
    credentials: {
      client_id: "106858553140459670684",
      client_email: "final-degree-project@final-degree-project-421721.iam.gserviceaccount.com",
      project_id: "final-degree-project-421721",
      private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC6M7ND0BhtVs9I\nMbiFDmiEJuL2Rq8LVAkbg9Q1lmcJV5B9ZQX6ZZAIIYJBpuLX7OsfOXujPLLKxMik\n1bJ/v68nsW71wvVcjwuUx4qsDOwP7o6Yz+GOu5IeuNpfFInuKjj85qIamCxi0HEN\n154/lzlrELeldQNh/rraLOePHGLcsJ2IqIg04l6bcrJKjOlDuXuxPLvl6QVABCHY\nYcVttisJlwnxoCLtSQuIa+OnotPukdLYCueqD/Sxq76afgejmmugb8MCS54OgXQA\nAOd7q5XKjVA3Gy12HkD/+max7AQMCIxUXu9BBdooCj/Psugnbc29dDSCwosr33/I\ndbzBbR+xAgMBAAECggEASDFaXDz285GYTVvluETlVfODxMuT+5bp7w6WPO6i5Vbb\ncRq1jidJiDWBvLWZNvGnGZSecKRMh9xzFKG8Eta9cOzU4hlkKy5U5arWA64A6o5q\nICpdQAtOdHXkSL/8WGhrbvZ2vEvqzacWZjEGrI4T14SER3TOSnTKemO1peFyHTD9\nnjPWHvwzqbCOZWj/Z3n/KYyMjzTyMfNi4Rqis/96O7QRTiwYb0OSe+gzIRsES8g1\nE5J3euYPvzmhQDTQUUGBR2Xy3r1q2UQwXlVyFcKp2S4DpIKUqbDPqcBcCkvmKVwI\naCNyRqCPPmm72Y6ejiDZUtOOb+//w+dMrOTryKstFwKBgQDalV9r7lzDEN7atpwu\nwoqajtbpK8Cc860TOdB4c18l2nvfMbKPwy5qTK+nTAFbZ6F+8oY/Zv/E2rzrRdTu\nw8rJ6Im99IOeOHSEoC8/RWvFRTWzJFLm6TNovHQXHs2diSRgcNjDJpcs3G18q5sE\nn2R8W5TNLsqNkZ9KWHCIhcgcXwKBgQDaE1MPrv23AbyuHVvnJacrDIcj1pRL1mLy\ngVrki19TIdrAqGi0fm++54L/3qjJRmYChfJSpCPkXXXQtTQLwDucILIySJS3hCFr\n0KkYl1L8cbzb1xdFjiq7TXk0lQ8NOCDFC/i4dPpOqVMuniwMNON8oy9UrJvkrZQ5\nH4FWAig97wKBgH8qyAkS9ATIm97Cvrq1k823rHCbc8PcQKUezZpGBOUQ52BCmY/q\nDebqFodOQLvc3qfskQ3x7nuohqCaT/dZEXHGR9yrlKdIUQGX7+TvjnOGgGdoipKs\nuawFd8S7twQf9XnmLTXcDbebxlbxv45A7UUsQrXcsxsJzZKDQXUr3/AhAoGATPgD\nGgb+X4hKav3LwSKmBOiwDfMfdkDdvY/wX7fdVj8dsV//TK1PjYay0tJoqlmhiYRz\nSb3LOT/PZHGARCF+KJXVry+05azKCv6joB1Q2e7e5IzfFtqdtGwcunVd0aGc109p\nYtlOu1LCHDMRguFr5ULHYtBlWWn2Zc773Dp4r5sCgYEA09PdI4sU6Btw3EZhtQq/\nbBjpArkGr4jyibcFTz+N2twysGaz59iwTwXKnFORf+UN7rDNG4HGLY11UG/xF3hk\nsUy1Wi9bZxo4h7i0yTBinQmf/a9YKCx0RXa7uq8RmD9GQoN70w0bbokW3hWp25q+\n3PCVMrav9kDjE5vW/BpM9Og=\n-----END PRIVATE KEY-----\n"
    },
    scopes: "https://www.googleapis.com/auth/cloud-platform",
  });
  const client = await auth.getClient();
  const accessToken = (await client.getAccessToken()).token;

  const url = request.nextUrl.searchParams;
  const country = url.get("country");

  const cacheKey = `${country}-content`;
  if (cache[cacheKey]) {
    console.log(`Cache hit for ${cacheKey}`);
    return Response.json(cache[cacheKey].predictions[0].content);
  }

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
  cache[cacheKey] = content;

  return Response.json(content.predictions[0].content);
}

module.export = { cache };