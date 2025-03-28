import { z } from "zod";

export const verifyTokenSchema = z.object({
    body: z.object({
        token: z.string(),
    }),
})


export const v2VerifyTokenSchema = z.object({
    body: z.object({
      token: z.string({
        required_error: "Token wajib disertakan",
        invalid_type_error: "Token harus berupa string",
      }),
    }),
  });
  