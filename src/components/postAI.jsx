import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

export default async function PostAI({ searchParams }) {
    const response = await fetch(
        `http://localhost:3000/api?country=${searchParams}`
      );
    const data = await response.json();

    return (
        <Link href={`/blog/vertexAI?country=${searchParams}`} className="post">
            <h3>Respuesta de Vertex AI</h3>
            <ReactMarkdown>{data}</ReactMarkdown>
        </Link>
    )
}