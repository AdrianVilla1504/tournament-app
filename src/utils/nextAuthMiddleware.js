import { getToken } from "next-auth/jwt";
const secret = process.env.NEXTAUTH_SECRET;

async function next_auth_credentials_token(req) {
  const token = await getToken({ req, secret });
  return token;
}

export { next_auth_credentials_token };
