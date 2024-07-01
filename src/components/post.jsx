import Link from 'next/link';
import { counter, duration } from '../app/metrics';

const cache = {};

export default async function Post({ searchParams }) {
    if (!cache[searchParams]) {
        counter.inc();
    }

    const start = performance.now();
    const response = await fetch(
        `https://planyourtravel.000webhostapp.com/wp-json/wp/v2/search?search=${searchParams}`, {
        next: {
            revalidate: 3600
        }
    });
    const postID = await response.json();

    const post = await fetch(
        `https://planyourtravel.000webhostapp.com/wp-json/wp/v2/posts/${postID[0].id}`, {
        next: {
            revalidate: 3600
        }
    });
    const postContent = await post.json();
    const duracion = performance.now() - start;

    cache[searchParams] = postContent;
    duration.set(duracion);

    return (
        <Link href={`/blog/${postID[0].id}`} className="post">
            <h3>{postContent.title.rendered}</h3>
            <div dangerouslySetInnerHTML={{ __html: postContent.content.rendered }} />
        </Link>

    )
}