import * as z from "zod";

export const authSchema = z.object({
  email: z.string().email(),
});
