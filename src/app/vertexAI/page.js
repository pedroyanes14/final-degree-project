import Link from "next/link";

const { sendRequest } = require("../google-foundation-models");

let fetchedContent = '';

const params = {
	apiEndpoint: "us-central1-aiplatform.googleapis.com",
	projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
	modelId: "text-bison@002",
	instances: [{ content: "Make for me the best 2-day route in Albania" }],
	parameters: { temperature: 0.2, maxOutputTokens: 1024, topP: 0.8, topK: 40 },
};
  
sendRequest(params)
	.then((response) => {
		fetchedContent = response.predictions[0].content;
		console.log(fetchedContent);
	})
	.catch((error) => {
		console.error(error);
	});

const HomePage = () => {
	return (
		<div className="blog-page">
			<h2>All AI Blog Posts</h2>
			<p>All blog posts are fetched from Vertex AI via the REST API.</p>
			<div className="posts">
				<Link href={`/blog`} className="post">
					<h3>Respuesta de Vertex AI</h3>
					<p>{fetchedContent}</p>
				</Link> 
			</div>
		</div>
	);
}

export default HomePage;
