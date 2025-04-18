import { createServerSupabaseClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const resquestUrl = new URL (request.url)
    const code = request.Url.searchParams.get("code")


    if(code) {
        const supabase = createServerSupabaseClient()
        await supabase.auth.exchangeCodeForSession(code)

    }

    return NextResponse.redirect(resquestUrl.origin)
    
    }