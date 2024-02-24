"use client";

import { Divider, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { AuthProviders } from "../shared/AuthProviders";
import { FormHeader } from "../shared/FormHeader";
import { VuexyIcon } from "../shared/VuexyIcon";
import { Wrapper } from "../shared/Wrapper";
import { LinkStyled } from "../shared/styled";
import { RegisterForm } from "./ui/Form";

export const RegisterWidget = () => {
    const theme = useTheme();

    return (
        <Wrapper>
            <VuexyIcon />

            <FormHeader
                header="Adventure starts here 🚀"
                subheader="Make your app management easy and fun!"
            />

            <RegisterForm />

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}
            >
                <Typography sx={{ color: "text.secondary", mr: 2 }}>
                    Already have an account?
                </Typography>
                <Typography component={LinkStyled} href="/login">
                    Sign in instead
                </Typography>
            </Box>

            <Divider
                sx={{
                    color: "text.disabled",
                    "& .MuiDivider-wrapper": { px: 6 },
                    fontSize: theme.typography.body2.fontSize,
                    my: (theme) => `${theme.spacing(6)} !important`,
                }}
            >
                or
            </Divider>

            <AuthProviders />
        </Wrapper>
    );
};
