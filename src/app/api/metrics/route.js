import { NextResponse } from 'next/server';
import { register } from '../../metrics';

export async function GET(req) {
  try {
    const metrics = await register.metrics();
    return new NextResponse(metrics, {
      status: 200,
      headers: { 'Content-Type': register.contentType },
    });
  } catch (error) {
    console.error('Error generating metrics:', error);
    return NextResponse.json({ error: 'Failed to generate metrics' }, { status: 500 });
  }
}