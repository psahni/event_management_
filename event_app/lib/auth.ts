import { SignJWT, jwtVerify } from "jose";
import cookie, { serialize } from 'cookie'
import { NextApiRequest, NextRequest, NextResponse } from "next/server";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10 minutes")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  console.log("payload" , payload)
  return payload;
}

export async function setCookie(data: { email: string, role: string, id: string }) {
  // Verify credentials && get the user
  const  { email, role, id } = data;
  const user = { email, role, id };

  // Create the session
  const session = await encrypt({ user });

  const cookie = await serialize('session', session, {
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 * 1, // One day
    path: '/',
    domain: '.app.localhost',
    sameSite: 'lax' // FOR LOCAL ENV SET lax (https://stackoverflow.com/questions/70646632/cookie-not-set-in-request-with-nodejs-and-nextjs)
  })

  return cookie
}

export async function logout() {
  // Destroy the session
  // cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession(req: (NextApiRequest | NextRequest)) {
  const sessioncookie =  cookie.parse(req.headers.cookie);
  if (!sessioncookie) return null;

  return await decrypt(sessioncookie.session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 1000 * 60 * 60);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
