import Link from 'next/link';

export default async function Post({ searchParams }) {
    const start = performance.now();
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/search?search=${searchParams}`
    );
    const postID = await response.json();

    const post = await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts/${postID[0].id}`
    );
    const postContent = await post.json();
    const duracion = performance.now() - start;

    fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL ? `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/metrics` : "http://localhost:3000/api/metrics"}?duration=${duracion}&action=fetch`
    );

    return (
        <Link href={`/blog/${postID[0].id}`} className="post">
            <h3>{postContent.title.rendered}</h3>
            <div dangerouslySetInnerHTML={{ __html: postContent.content.rendered }} />
        </Link>

    )
}