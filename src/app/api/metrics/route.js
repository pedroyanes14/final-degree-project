export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { register } from '../../metrics';

export async function GET(request) {
    console.log(await register.metrics());
    const metrics = await register.metrics();
    const response = new NextResponse(metrics, {
        status: 200,
        headers: { 
            'Content-Type': register.contentType,
            'Cache-Control': 'no-store',
        },
    });
    return response;
}