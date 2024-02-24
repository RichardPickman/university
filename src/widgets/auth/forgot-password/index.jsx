"use client";

import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Wrapper } from "../shared/Wrapper";
import { ForgotPasswordForm } from "./ui/Form";

export const ForgotPasswordWidget = () => {
    return (
        <Wrapper>
            <Box sx={{ my: 6 }}>
                <Typography
                    sx={{
                        mb: 1.5,
                        fontWeight: 500,
                        fontSize: "1.625rem",
                        lineHeight: 1.385,
                    }}
                >
                    Update password 🔒
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                    Enter your email and we&prime;ll send you instructions to
                    reset your password
                </Typography>
            </Box>

            <ForgotPasswordForm />
        </Wrapper>
    );
};
