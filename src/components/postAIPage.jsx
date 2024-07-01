import ReactMarkdown from 'react-markdown';
const { GoogleAuth } = require('google-auth-library');

export default async function PostAIPage ({ searchParams }) {
    let accessToken = "";

	const vertextResponse = await fetch(
        `https://us-central1-aiplatform.googleapis.com/v1/projects/final-degree-project-421721/locations/us-central1/publishers/google/models/text-bison:predict`,
        {
            method: "POST",
            headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            instances: [
                { content: `Make for me the best 2-day route in ${searchParams}` },
            ],
            parameters: { temperature: 0.2, maxOutputTokens: 1024, topP: 0.8, topK: 40 },
            })
        }
    );

    if (vertextResponse.status !== 200) {
        const auth = await new GoogleAuth({
            scopes: "https://www.googleapis.com/auth/cloud-platform"
        });
        
        const client = await auth.getClient();
        accessToken = (await client.getAccessToken()).token;

        const vertextResponse = await fetch(
            `https://us-central1-aiplatform.googleapis.com/v1/projects/final-degree-project-421721/locations/us-central1/publishers/google/models/text-bison:predict`,
            {
                method: "POST",
                headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                instances: [
                    { content: `Make for me the best 2-day route in ${searchParams}` },
                ],
                parameters: { temperature: 0.2, maxOutputTokens: 1024, topP: 0.8, topK: 40 },
                })
            }
        );

        const data = await vertextResponse.json();

        return (
            <div className="single-blog-page">
                <h2>{searchParams.toUpperCase()} ROAD TRIP</h2>
                <div className="blog-post">
                    <ReactMarkdown>{data.predictions[0].content}</ReactMarkdown>
                </div>
            </div>
        );
    }

    const data = await vertextResponse.json();

	return (
		<div className="single-blog-page">
			<h2>{searchParams.toUpperCase()} ROAD TRIP</h2>
			<div className="blog-post">
				<ReactMarkdown>{data.predictions[0].content}</ReactMarkdown>
			</div>
		</div>
	);
};
