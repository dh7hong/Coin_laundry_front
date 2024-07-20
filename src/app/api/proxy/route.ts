import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const radius = searchParams.get('radius');

  const url = new URL('https://naveropenapi.apigw.ntruss.com/map-place/v1/search');
  url.searchParams.append('query', query || '');
  url.searchParams.append('coordinate', `${lng},${lat}`);
  url.searchParams.append('radius', radius || '3000');

  const headers = {
    'X-NCP-APIGW-API-KEY-ID': process.env.NEXT_PUBLIC_NAVER_CLIENT_ID as string,
    'X-NCP-APIGW-API-KEY': process.env.NAVER_CLIENT_SECRET as string,
  };

  console.log('Request URL:', url.toString());
  console.log('Request Headers:', headers);

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: headers,
    });

    console.log('Response status:', response.status);
    console.log('Response status text:', response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error fetching data:', response.statusText, errorText);
      return NextResponse.json({ error: response.statusText, details: errorText }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error in fetch:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
