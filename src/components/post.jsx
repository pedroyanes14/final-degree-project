import Link from 'next/link';
import { counter, duration } from '../app/metrics';

export default async function Post({ searchParams }) {
    const start = performance.now();
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/search?search=${searchParams}`, {
        next: {
            revalidate: 3600
        }
    });
    const postID = await response.json();

    const post = await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts/${postID[0].id}`, {
        next: {
            revalidate: 3600
        }
    });
    const postContent = await post.json();
    const duracion = performance.now() - start;

    /* await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL ? `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/metrics` : "http://localhost:3000/api/metrics"}?duration=${duracion}&action=fetch&${new Date().getTime()}`
    ); */

    counter.inc();
    duration.set(duracion);

    return (
        <Link href={`/blog/${postID[0].id}`} className="post">
            <h3>{postContent.title.rendered}</h3>
            <div dangerouslySetInnerHTML={{ __html: postContent.content.rendered }} />
        </Link>

    )
}