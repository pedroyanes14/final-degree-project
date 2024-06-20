export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
// import { client, counter, duration, counterAI, durationAI } from '../../metrics';
// import { client, duration, durationAI } from '../../metrics';
import { client } from '../../metrics';

export async function GET(req) {
    /* const { searchParams } = new URL(req.url);
    const duracion = parseFloat(searchParams.get('duration'));
    const action = searchParams.get('action');

    if (action === 'fetch') {
        // counter.inc();
        duration.set(duracion);
    } else if (action === 'fetchAI') {
        // counterAI.inc();
        durationAI.set(duracion);
    } */
    const metrics = await client.register.metrics();
    const response = new NextResponse(metrics, {
        status: 200,
        headers: { 
            'Content-Type': client.register.contentType,
            'Access-Control-Allow-Origin': '*'
            // 'Cache-Control': 'no-store',
        },
    });
    return response;
}

/* export async function POST(request) {
    const body = await request.json();
    await counter.inc(body.counter);
    await duration.set(body.duration);
    await counterAI.inc(body.counterAI);
    await durationAI.set(body.durationAI);
    return new NextResponse(JSON.stringify(data), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
        },
    });
} */
