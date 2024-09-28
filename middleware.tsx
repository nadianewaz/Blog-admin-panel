import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// @utils
import {isAuthenticated, isAuthorized} from "@/lib/utils/auth";

// @constants
import {publicPaths} from "@/lib/constants/pageList";

const isPublicPath = (path: string) => {
    return publicPaths.includes(path)
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    console.log('route:: ', pathname)

    if (!pathname.startsWith('/dashboard') && isAuthenticated() && !isPublicPath(pathname)) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (!isAuthenticated() && !pathname.startsWith('/login')) {
        return Response.redirect(new URL('/login', request.url))
    }

    if (!isPublicPath(pathname) && isAuthenticated() && !isAuthorized(pathname)) {
        return NextResponse.redirect(new URL('/dashboard/unauthorized', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - .png (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|tinymce|.*\\.woff|.*\\.ico|.*\\.png$).*)'
    ]
}
