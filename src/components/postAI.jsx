import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { counterAI, durationAI } from '../app/metrics';
const { GoogleAuth } = require('google-auth-library');

export default async function PostAI({ searchParams }) {
    let accessToken = "ya29.a0AXooCgv85laDFXjBL0OYEmVC1OEOUj4VyNzxwF5O_Iv_HTAi8bydINLqhC2DvljW7J6AmAWZhpyXeBO8CgrTZ57wPyDViXAdANiIl7McHkE-GdQp5zUP924H32jzUHFtbgQeD0zr6b40OV0CkAI2wplP5uQROLHjNS3itYUazIcaCgYKAZwSARMSFQHGX2MiOXLstGZnAKe7D67JAz99Dg0178";

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

        counterAI.inc();
        durationAI.set(duracion);
        
        return (
            <Link href={`/blog/vertexAI?country=${searchParams}`} className="post">
                <h3>Respuesta de Vertex AI</h3>
                <ReactMarkdown>{data.predictions[0].content}</ReactMarkdown>
            </Link>
        )
    }

    const data = await vertextResponse.json();

    counterAI.inc();
    durationAI.set(duracion);
    
    return (
        <Link href={`/blog/vertexAI?country=${searchParams}`} className="post">
            <h3>Respuesta de Vertex AI</h3>
            <ReactMarkdown>{data.predictions[0].content}</ReactMarkdown>
        </Link>
    )
}