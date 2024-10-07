import { authkitMiddleware } from '@workos-inc/authkit-nextjs';

export default authkitMiddleware({
    middlewareAuth: {
        enabled: true,
        unauthenticatedPaths: ['/','/login','/register'],
    }
});

export const config = { matcher: ['/','/login','/register','/dashboard/:path*'] };
