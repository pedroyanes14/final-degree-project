export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { register } from '../../metrics';

export async function GET(req) {
    const metrics = await register.metrics();
    const response = new NextResponse(metrics, {
        status: 200,
        headers: { 
            'Content-Type': register.contentType,
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
