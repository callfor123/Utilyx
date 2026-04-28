import { NextRequest } from 'next/server';
import { pingSearchEngines } from '../../lib/search-engine-pinger';
import { requireAdminAuth } from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
  const authError = requireAdminAuth(request)
  if (authError) return authError

  try {
    await pingSearchEngines();
    return new Response(
      JSON.stringify({ success: true, message: 'Successfully pinged search engines' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error pinging search engines:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to ping search engines' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';