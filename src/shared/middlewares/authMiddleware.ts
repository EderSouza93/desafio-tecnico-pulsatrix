import AppError from "@shared/errors/AppError";
import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Secret } from "jsonwebtoken";

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default class AuthMiddleware {
    static execute(
        request: Request,
        response: Response,
        next: NextFunction
    ): void {
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw new AppError('O token JWT está faltando.', 401);
        }

        const [, token] = authHeader.split(' ');

        try {
            const decodedToken = verify(token, process.env.APP_SECRET as Secret);

            const { sub } = decodedToken as ITokenPayload;

            request.usuario = {
                id: Number(sub),
            };

            return next()
        } catch (error) {
            throw new AppError('Token JWT inválido.', 401);
        }
    }
}