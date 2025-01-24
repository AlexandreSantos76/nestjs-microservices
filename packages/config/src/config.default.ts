import { ConfigData } from "./config.interface";
import { Transport } from "@nestjs/microservices";

export const DEFAULT_CONFIG: ConfigData = {
    port: Number(process.env.PORT || 3001),
    env: "production",
    db: {
        url: process.env.DATABASE_URL || "postgres://fullcycle:admin@postgres:6432/monorepo",
    },
    auth: {
        expiresIn: 30000,
        access_token_secret: "",
        refresh_token_secret: "",
    },
    swagger: {
        username: "",
        password: "",
    },
    logLevel: "",
    userService: {
        options: {
            host: "",
            port: 9001,
        },
        transport: Transport.TCP,
    },
    authService: {
        options: {
            host: "",
            port: 9002,
        },
        transport: Transport.TCP,
    },
};