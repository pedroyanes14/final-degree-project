import Post from "../../components/post";
import PostAI from "../../components/postAI";

export default function BlogPage({ searchParams }) {

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
