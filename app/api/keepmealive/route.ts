import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const supabase = createClient(
    'https://ewhxtorjycyjjaorajcs.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3aHh0b3JqeWN5amphb3JhamNzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NDY0ODI4MCwiZXhwIjoyMDYwMjI0MjgwfQ.Xo7MCryyfd3NWH1s6RZEa2RaT2Ky38bz5SVly9ZXtQM'
  );

  try {
    const { data, error } = await supabase
      .from('UserBalance')
      .select('*')
      .limit(1);

    if (error) {
      console.error('❌ Keepalive query failed:', error.message);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: '✅ Supabase keepalive query successful',
      sample: data[0] ?? null
    });
  } catch (err: any) {
    console.error('❌ Unexpected error:', err.message);
    return NextResponse.json({ success: false, error: 'Unexpected server error' }, { status: 500 });
  }
}

