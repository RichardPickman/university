import * as yup from 'yup';

export const passwordSchema = yup
    .string()
    .min(10, "Password must be length of 10")
    .matches(/[a-zA-Z]/, "Password must contain uppercase and lowercase")
    .matches(/[0-9]/, "Password must contain numbers")
    .required();