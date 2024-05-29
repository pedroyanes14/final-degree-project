import { NextResponse } from 'next/server';
import { register } from '../../metrics';

export async function GET() {
    const metrics = await register.metrics();
    return NextResponse(metrics, {
        status: 200,
        headers: { 'Content-Type': register.contentType },
    });
}