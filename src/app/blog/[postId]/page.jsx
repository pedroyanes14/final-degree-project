export default async function Page({ params }) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts/${params.postId}`, {
			next: {
				revalidate: 300
			}
		});
	const post = await response.json();

	return (
		<div className="single-blog-page">
			<h2>{post.title.rendered}</h2>
			<div className="blog-post" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
		</div>
	);
};
