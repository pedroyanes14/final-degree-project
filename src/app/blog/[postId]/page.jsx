export default async function Page({ params }) {
	const response = await fetch(
		`https://planyourtravel.000webhostapp.com/wp-json/wp/v2/posts/${params.postId}`, {
			next: {
				revalidate: 3600
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
