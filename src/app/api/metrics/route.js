//import { NextResponse } from 'next/server';
import { register } from '../../metrics';

export async function GET(request) {
    const metrics = await register.metrics();
    const response = new Response(metrics, {
        status: 200,
        headers: { 
            'Content-Type': register.contentType,
        },
    });
    return response;
}