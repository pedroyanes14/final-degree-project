import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

export const dynamicParams = true;

export async function generateStaticParams() {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts?${new Date().getTime()}`
	);
	const posts = await response.json();

	return posts.map((post) => ({
		postId: post.id.toString(),
	}));
}

async function getSinglePost(postId) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts/${postId}?${new Date().getTime()}`
	);
	const post = await response.json();
	return post;
}

const page = async ({ params }) => {
	const post = await getSinglePost(params.postId);

	if (!post) {
		return <div>Loading...</div>;
	}

	return (
		<div className="single-blog-page">
			<h2>{post.title.rendered}</h2>
			<div className="blog-post">
				<p dangerouslySetInnerHTML={{ __html: post.content.rendered }}></p>
			</div>
			<SpeedInsights />
			<Analytics />
		</div>
	);
};

export default page;
