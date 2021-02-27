import SignJWT from "jose/dist/browser/jwt/sign";
import jwtVerify from "jose/dist/browser/jwt/verify";
import firebase from "firebase/app";
import "firebase/auth";

const SECRET_STR =
  "L3tGLlskXFB0c2MyR3hSRSwnVjk1SloocFxMalFaNTp+SXhQNk9kQ3VbcHQ5b2lIJVEhNkIwdURjPWR2cSJAQA==";
const PRIVATE_KEY = Buffer.from(atob(SECRET_STR));

export async function statusToJWT(status: any) {
  const uid = firebase.auth().currentUser?.uid;
  if (uid == undefined) {
    console.warn("user not logged in, not converting status to jwt");
    return;
  }
  const jwt = await new SignJWT({ status: status, uid: uid })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .sign(PRIVATE_KEY);
  console.log(jwt);
  return jwt;
}

export async function validateJWT(jwt: string) {
  if (jwt == null) {
    return null;
  }
  let res;
  try {
    res = await jwtVerify(jwt, PRIVATE_KEY);
  } catch (e) {
    console.warn("jwt token invalid");
    alert(
      "The status key supplied is invalid. Returning to start of game. If you believe this is in error, please contact support."
    );
    return 1;
  }
  console.log(res);
  const uid = firebase.auth().currentUser?.uid;
  const payload = res.payload;
  if (uid != payload.uid) {
    console.warn("jwt uid mismatch");
    alert(
      "The status key supplied does not match your user account. Returning to start of game. If you believe this is in error, please contact support."
    );
    return 1;
  }
  return payload.status;
}
