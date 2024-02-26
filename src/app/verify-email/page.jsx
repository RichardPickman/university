"use client";

import { Button, Typography, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { useSearchParams } from "next/navigation";

import { VuexyIcon } from "src/widgets/auth/shared/VuexyIcon";
import { Wrapper } from "src/widgets/auth/shared/Wrapper";

import { staticImagePaths } from "src/helpers/imageMapper";
import { IllustrationWrapper } from "src/widgets/auth/shared/IllustrationWrapper";

const VerifyEmail = () => {
    const params = useSearchParams();
    const email = params.get("email");

    const theme = useTheme();
    const hidden = useMediaQuery(theme.breakpoints.down("md"));

    const src =
        staticImagePaths[`forgot-password-illustration-${theme.palette.mode}`];

    return (
        <Box
            className="content-center"
            sx={{ backgroundColor: "background.paper" }}
        >
            <IllustrationWrapper isHidden={hidden} src={src} />

            <Wrapper>
                <VuexyIcon />
                <Box
                    sx={{
                        my: 6,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    <Typography
                        sx={{
                            mb: 1.5,
                            fontWeight: 500,
                            fontSize: "1.625rem",
                            lineHeight: 1.385,
                        }}
                    >
                        Verify your email 󱃝
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                        We sent an email to <strong>{email}</strong> with a
                        verification link.
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                        Check your inbox and click on that link to complete your
                        sign up.
                    </Typography>

                    <Typography sx={{ color: "text.secondary" }}>
                        If you don&apos;t see the email, check your spam folder.
                    </Typography>
                </Box>
                <Box sx={{ my: 6 }}>
                    <Button type="button" variant="contained">
                        Resend email
                    </Button>
                </Box>
            </Wrapper>
        </Box>
    );
};

VerifyEmail.guestGuard = true;

export default VerifyEmail;
