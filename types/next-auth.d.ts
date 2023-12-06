import { UserRole } from "@prisma/client";
import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    jti: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      accessToken: string;
      refreshToken: string;
    };
  }
}
