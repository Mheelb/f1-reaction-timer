import { JwtPayload } from 'jsonwebtoken';
import { Request } from "express"

interface RequestAuth extends Request {
    user?: string | JwtPayload;
}

declare module 'express-serve-static-core' {
    interface Request {
        user?: string | JwtPayload;
    }
}
export { RequestAuth };

