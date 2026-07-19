import { createServerSupabaseClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const requestUrl = new URL (request.url)
    const code = requestUrl.searchParams.get("code")


    if(code) {
        const supabase = await createServerSupabaseClient()
        await supabase.auth.exchangeCodeForSession(code)

    }
    //URL PARA REDIRECIONAR APÓS A AUTENTICAÇÃO
    const  redirectTo = requestUrl.searchParams.get("next") || "/"
    return NextResponse.redirect(new URL(redirectTo, requestUrl.origin))

    }
