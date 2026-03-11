import { z } from "zod"

// Strip control characters that enable email header injection (\r \n \0 \t)
const sanitizeText = (val: string) => val.replace(/[\r\n\0\t]/g, "")

// Strip HTML tags to prevent XSS in mail body
const stripHtml = (val: string) => val.replace(/<[^>]*>/g, "")

const noControlChars = (val: string) => !/[\r\n\0]/.test(val)

export const contactSchema = z.object({
  nombre: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede superar los 100 caracteres")
    .refine(noControlChars, "El nombre contiene caracteres no permitidos")
    .transform(sanitizeText),

  empresa: z
    .string()
    .max(100, "El nombre de empresa no puede superar los 100 caracteres")
    .refine(noControlChars, "La empresa contiene caracteres no permitidos")
    .transform(sanitizeText)
    .optional()
    .or(z.literal("")),

  email: z
    .string()
    .email("El email no tiene un formato válido")
    .max(254, "El email no puede superar los 254 caracteres")
    .refine(noControlChars, "El email contiene caracteres no permitidos")
    .transform(sanitizeText),

  telefono: z
    .string()
    .max(20, "El teléfono no puede superar los 20 caracteres")
    .regex(/^[\d\s+\-()\\.]*$/, "El teléfono solo puede contener dígitos, +, -, espacios y paréntesis")
    .optional()
    .or(z.literal("")),

  asunto: z
    .string()
    .min(5, "El asunto debe tener al menos 5 caracteres")
    .max(150, "El asunto no puede superar los 150 caracteres")
    .refine(noControlChars, "El asunto contiene caracteres no permitidos")
    .transform(sanitizeText),

  mensaje: z
    .string()
    .min(20, "El mensaje debe tener al menos 20 caracteres")
    .max(2000, "El mensaje no puede superar los 2000 caracteres")
    .transform(stripHtml),

  // Honeypot: must be empty — bots fill it, humans don't
  website: z.string().max(0).optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>
