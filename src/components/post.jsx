import Link from 'next/link';

export default async function Post({ searchParams }) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/search?search=${searchParams}`, {
        next: {
            revalidate: 300
        }
    });
    const postID = await response.json();

    const post = await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts/${postID[0].id}`, {
        next: {
            revalidate: 300
        }
    });
    const postContent = await post.json();

    return (
        <Link href={`/blog/${postID[0].id}`} className="post">
            <h3>{postContent.title.rendered}</h3>
            <div dangerouslySetInnerHTML={{ __html: postContent.content.rendered }} />
        </Link>

    )
}