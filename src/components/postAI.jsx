import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { counterAI, durationAI } from '../app/metrics';

export default async function PostAI({ searchParams }) {
    const start = performance.now();

    const vertextResponse = await fetch(
        `https://us-central1-aiplatform.googleapis.com/v1/projects/final-degree-project-421721/locations/us-central1/publishers/google/models/text-bison:predict`,
        {
            method: "POST",
            headers: {
            Authorization: "Bearer ya29.a0AXooCgv1tJa9XCBhDgao6HHTu8SzVhumm0p1jijNGyxQt8wfBgGSPnjq_AnjjKZ2bY9D6-f1i87G8wh0qO5RpYEhjm0JX9QsETAaQFvpp50FzGMAvjO2Y-ZYEuL51kBX__u8J0moelOtVKJZE2XX4mze80CZP6zKY73mayk_mZcaCgYKARASARMSFQHGX2MinzjxKnGiyyxuV8WNGRYszg0178",
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            instances: [
                { content: `Make for me the best 2-day route in ${searchParams}` },
            ],
            parameters: { temperature: 0.2, maxOutputTokens: 1024, topP: 0.8, topK: 40 },
            })
        }
    );

    const data = await vertextResponse.json();

    const duracion = performance.now() - start;

    /* await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL ? `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/metrics` : "http://localhost:3000/api/metrics"}?duration=${duracion}&action=fetchAI&${new Date().getTime()}`
    ); */

    counterAI.inc();
    durationAI.set(duracion);
    
    return (
        <Link href={`/blog/vertexAI?country=${searchParams}`} className="post">
            <h3>Respuesta de Vertex AI</h3>
            <ReactMarkdown>{data.predictions[0].content}</ReactMarkdown>
        </Link>
    )
}