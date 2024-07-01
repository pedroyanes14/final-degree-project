import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { counterAI, durationAI } from '../app/metrics';
const { GoogleAuth } = require('google-auth-library');

const cache = {};

export default async function PostAI({ searchParams }) {
    let accessToken = "";

    if (!cache[searchParams]) {
        counterAI.inc();
    }
    
    const start = performance.now();
    const vertextResponse = await fetch(
        `https://us-central1-aiplatform.googleapis.com/v1/projects/final-degree-project-421721/locations/us-central1/publishers/google/models/text-bison:predict`,
        {
            method: "POST",
            headers: {
            Authorization: `Bearer ${accessToken}`,
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
    const duracion = performance.now() - start;

    if (vertextResponse.status !== 200) {
        const auth = await new GoogleAuth({
            scopes: "https://www.googleapis.com/auth/cloud-platform"
        });
        
        const client = await auth.getClient();
        accessToken = (await client.getAccessToken()).token;

        const start = performance.now();
        
        const vertextResponse = await fetch(
            `https://us-central1-aiplatform.googleapis.com/v1/projects/final-degree-project-421721/locations/us-central1/publishers/google/models/text-bison:predict`,
            {
                method: "POST",
                headers: {
                Authorization: `Bearer ${accessToken}`,
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

        const duracion = performance.now() - start;
        const data = await vertextResponse.json();

        cache[searchParams] = data;
        durationAI.set(duracion);
        
        return (
            <Link href={`/blog/vertexAI?country=${searchParams}`} className="post">
                <h3>Respuesta de Vertex AI</h3>
                <ReactMarkdown>{data.predictions[0].content}</ReactMarkdown>
            </Link>
        )
    }

    const data = await vertextResponse.json();

    cache[searchParams] = data;
    durationAI.set(duracion);
    
    return (
        <Link href={`/blog/vertexAI?country=${searchParams}`} className="post">
            <h3>Respuesta de Vertex AI</h3>
            <ReactMarkdown>{data.predictions[0].content}</ReactMarkdown>
        </Link>
    )
}