"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Analytics } from '@vercel/analytics/react';
import ContentLoader from 'react-content-loader'
import ReactMarkdown from 'react-markdown';

async function getPosts() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts?${new Date().getTime()}`
  );
  const posts = await response.json();
  return posts;
}

async function postByCountry(posts, country) {
  const filteredPosts = await Promise.all(
    posts.map(async (post) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/tags/${
          post.tags[0]
        }?${new Date().getTime()}`
      );
      const postByTagId = await response.json();
      return postByTagId.name == country ? post : null;
    })
  );

  return filteredPosts.filter((post) => post !== null);
}

async function getTest(country) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL ? `${process.env.NEXT_PUBLIC_BASE_API_URL}/api` : "/api"}?country=${country}`
  );
  const data = await response.json();
  return data;
};

const BlogPage = () => {
  const country = useSearchParams().get("country");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [fetchedContent, setFetchedContent] = useState();
  const [loadingPosts, setLoading] = useState(true);
  const [loadingAI, setLoadingAI] = useState(true);

  useEffect(() => {
    getTest(country).then((data) => { 
      setFetchedContent(data);
      setLoadingAI(false);
    });
    getPosts().then((posts) => {
      if (country) {
        postByCountry(posts, country).then((filtered) =>
          setFilteredPosts(filtered)
        );
        setLoading(false);
      } else {
        setFilteredPosts(posts);
        setLoading(false);
      }
    });
  }, [country]);

  if (loadingPosts || loadingAI) {
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
        <Link href={`/blog/vertexAI?country=${country}&content=${fetchedContent}`} className="post">
          <h3>Respuesta de Vertex AI</h3>
          <ReactMarkdown>{fetchedContent}</ReactMarkdown>
        </Link>
      </div>
      <Analytics />
    </div>
  );
};

export default BlogPage;
