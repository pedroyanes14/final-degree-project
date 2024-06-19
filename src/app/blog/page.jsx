// import { Analytics } from '@vercel/analytics/react';
// import ReactGA from "react-ga4";
import Post from "../../components/post";
import PostAI from "../../components/postAI";
import { register } from "../../app/metrics";

// ReactGA.initialize('G-4KV9660FP3');

/* async function fetchWithMetrics(url, action) {
  const start = performance.now();
  const response = await fetch(url);
  const duration = performance.now() - start;

  // ReactGA.event('Peticion realizada por al API de WordPress', { numero_de_peticion: metrics.fetchCount });
  // ReactGA.event('Duracion de la peticion WordPress', { duracion: duration });

  await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL ? `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/increment` : "http://localhost:3000/api/increment"}?duration=${duration}&action=${action}`
  );
  
  return response;
} */

/* async function fetchWithMetricsAI(url) {
  const start = performance.now();
  const response = await fetch(url);
  const duration = performance.now() - start;

  // ReactGA.event('Peticion realizada por al API de Vertex AI', { numero_de_peticion: metricsAI.fetchCount });
  // ReactGA.event('Duracion de la peticion Vertex AI', { duracion: duration });

  await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL ? `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/increment` : "http://localhost:3000/api/increment"}?duration=${duration}&action=fetchAI`
  );
  
  return response;
} */

/* async function getPosts() {
  const response = await fetchWithMetrics(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts?${new Date().getTime()}`, 'fetch'
  );
  const posts = await response.json();
  return posts;
}

async function postByCountry(posts, country) {
  const filteredPosts = await Promise.all(
    posts.map(async (post) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/tags/${post.tags[0]}?${new Date().getTime()}`
      );
      const postByTagId = await response.json();
      return postByTagId.name == country ? post : null;
    })
  );

  return filteredPosts.filter((post) => post !== null);
}

async function getTest(country) {
  const response = await fetchWithMetrics(
    `${process.env.NEXT_PUBLIC_BASE_API_URL ? `${process.env.NEXT_PUBLIC_BASE_API_URL}/api` : "http://localhost:3000/api"}?country=${country}`, 'fetchAI'
  );
  const data = await response.json();
  return data;
}; */

export default function BlogPage({ searchParams }) {
  console.log(register.metrics());

  return (
    <div className="blog-page">
      <h2>All Blog Posts</h2>
      <p>All blog posts are fetched from WordPress via the WP REST API.</p>
      <div className="posts">
        <Post searchParams={searchParams.country}/>
        <PostAI searchParams={searchParams.country}/>
      </div>
    </div>
  );
};
