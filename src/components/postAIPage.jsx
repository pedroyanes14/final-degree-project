import ReactMarkdown from 'react-markdown';

export default async function PostAIPage ({ searchParams }) {
	const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL ? `${process.env.NEXT_PUBLIC_BASE_API_URL}/api` : "http://localhost:3000/api"}?country=${searchParams}`
      );
    const data = await response.json();

	return (
		<div className="single-blog-page">
			<h2>{searchParams.toUpperCase()} ROAD TRIP</h2>
			<div className="blog-post">
				<ReactMarkdown>{data}</ReactMarkdown>
			</div>
		</div>
	);
};
