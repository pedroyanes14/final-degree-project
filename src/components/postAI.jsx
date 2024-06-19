import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { counterAI, durationAI } from '../app/metrics';

export default async function PostAI({ searchParams }) {
    const start = performance.now();
    console.log("hola");
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL ? `${process.env.NEXT_PUBLIC_BASE_API_URL}/api` : "http://localhost:3000/api"}?country=${searchParams}`
      );
    const data = await response.json();
    const duracion = performance.now() - start;

    counterAI.inc();
    durationAI.set(duracion);

    console.log("adios");

    return (
        <Link href={`/blog/vertexAI?country=${searchParams}`} className="post">
            <h3>Respuesta de Vertex AI</h3>
            <ReactMarkdown>{data}</ReactMarkdown>
        </Link>
    )
}