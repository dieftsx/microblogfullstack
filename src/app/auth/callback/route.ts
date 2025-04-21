import { createServerSupabaseClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const resquestUrl = new URL (request.url)
    const code = resquestUrl.searchParams.get("code")


    if(code) {
        const supabase = createServerSupabaseClient()
        await supabase.auth.exchangeCodeForSession(code)

    }
    //URL PARA REDIRECIONAR APÓS A AUTENTICAÇÃO
    const  redirectTo = resquestUrl.searchParams.get("next") || "/"
    return NextResponse.redirect(new URL(redirectTo, requestUrl.origin))

    }
