import ReactMarkdown from 'react-markdown';

export default async function PostAIPage ({ searchParams }) {
	const vertextResponse = await fetch(
        `https://us-central1-aiplatform.googleapis.com/v1/projects/final-degree-project-421721/locations/us-central1/publishers/google/models/text-bison:predict`,
        {
            method: "POST",
            headers: {
            Authorization: "Bearer ya29.a0AXooCgtDRoL8QGLa1q7ptuCCTY0wvnFREi0zDmrKyh7OD0QwtrhUevk8hxRyBSrJcbJ1tvR6Cu6dJTU0DshOJmQdjGmrZi9V_hjK1_xFR7JyLIYE1Dy815_7nTnmoZCRIWMDzLLMJOUssuPex2Cb1CGoox3eeJjLs3X38gFTtAaCgYKAbwSARMSFQHGX2Miup7XY35e7B2DxPSUlCmw9w0177",
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
};
