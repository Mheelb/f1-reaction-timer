import { JwtPayload } from 'jsonwebtoken';
import { Request } from "express"

declare module 'express-serve-static-core' {
    interface RequestAuth extends Request {
        user?: string | JwtPayload;
    }
}
export { RequestAuth };

