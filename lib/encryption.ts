import crypto from "crypto";

const ALB="aes_256-cbc";

export const symmetricEncrypt=(data:string)=>{
    const key=process.env.ENCRYPTION_KEY;
    if (!key) throw new Error("encyption key not found");

    const iv=crypto.randomBytes(16);
}