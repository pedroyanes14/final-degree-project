"use client";

import { Analytics } from '@vercel/analytics/react';
import { useState, useEffect } from 'react';
import ContentLoader from 'react-content-loader';

async function getSinglePost(postId) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts/${postId}?${new Date().getTime()}`
	);
	const post = await response.json();
	return post;
}

const Page = ({ params }) => {
	const [post, setPost] = useState(null);
	const [loadingPosts, setLoading] = useState(true);

	useEffect(() => {
		const fetchPost = async () => {
		  const postData = await getSinglePost(params.postId);
		  setPost(postData);
		  setLoading(false);
		};
	
		fetchPost();
	}, [params.postId]);

	if (loadingPosts) {
		return <ContentLoader viewBox="0 0 2000 720" height={720} width={2000}>
		  <rect x="0" y="13" rx="4" ry="4" width="1200" height="9" />
		  <rect x="0" y="29" rx="4" ry="4" width="400" height="8" />
		  <rect x="0" y="50" rx="4" ry="4" width="1200" height="10" />
		  <rect x="0" y="65" rx="4" ry="4" width="1200" height="10" />
		  <rect x="0" y="79" rx="4" ry="4" width="400" height="10" />
		  <rect x="0" y="99" rx="5" ry="5" width="1200" height="200" />
		</ContentLoader>;
	}

	return (
		<div className="single-blog-page">
			<h2>{post.title.rendered}</h2>
			<div className="blog-post">
				<p dangerouslySetInnerHTML={{ __html: post.content.rendered }}></p>
			</div>
			<Analytics />
		</div>
	);
};

export default Page;
