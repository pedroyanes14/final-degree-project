"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'

async function getPosts() {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts?${new Date().getTime()}`
	);
	const posts = await response.json();
	return posts;
}

async function postByCountry(posts, country) {
    const filteredPosts = await Promise.all(posts.map(async (post) => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/tags/${post.tags[0]}?${new Date().getTime()}`
        );
        const postByTagId = await response.json();
        return postByTagId.name == country ? post : null;
    }));

    return filteredPosts.filter(post => post !== null);
}

const BlogPage = () => {
	const [filteredPosts, setFilteredPosts] = useState([]);
	const country = useSearchParams().get('country');

	useEffect(() => {
        getPosts().then(posts => {
            if (country) {
                postByCountry(posts, country).then(filtered => setFilteredPosts(filtered));
            } else {
                setFilteredPosts(posts);
            }
        });
    }, [country]);

	return (
		<div className="blog-page">
			<h2>All Blog Posts</h2>
			<p>All blog posts are fetched from WordPress via the WP REST API.</p>
			<div className="posts">
				{filteredPosts.map((post) => {
					return (
						<Link href={`/blog/${post.id}`} className="post" key={post.id}>
							<h3>{post.title.rendered}</h3>
							<p
								dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
							></p>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default BlogPage;
