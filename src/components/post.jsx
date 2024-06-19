import Link from 'next/link';
import { counter, duration } from '../app/metrics';
// import { revalidatePath } from 'next/cache';

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

    counter.inc();
    duration.set(duracion);

    // revalidatePath("/api/metrics");

    return (
        <Link href={`/blog/${postID[0].id}`} className="post">
            <h3>{postContent.title.rendered}</h3>
            <div dangerouslySetInnerHTML={{ __html: postContent.content.rendered }} />
        </Link>

    )
}