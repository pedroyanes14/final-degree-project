export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { client } from '../../metrics';

export async function GET(req) {
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
