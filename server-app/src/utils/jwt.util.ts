import jwt from "jsonwebtoken";

const privateKey = process.env.JWT_PRIVATEKEY as string;

export function sign(object: Object, options?: jwt.SignOptions | undefined) {
  try {
    return jwt.sign(object, privateKey, options);
  } catch (error) {
    return "error"
  }
}

export function decode(token: string) {
  try {
    const decoded = jwt.verify(token, privateKey);

    return { valid: true, expired: false, decoded };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: null,
    };
  }
}