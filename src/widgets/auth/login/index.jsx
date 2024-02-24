"use client";

import { Divider, useTheme } from "@mui/material";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import themeConfig from "src/configs/themeConfig";
import useBgColor from "src/core/hooks/useBgColor";
import { FormHeader } from "src/widgets/auth/shared/FormHeader";
import { VuexyIcon } from "src/widgets/auth/shared/VuexyIcon";
import { LinkStyled } from "src/widgets/auth/shared/styled";
import { AuthProviders } from "../shared/AuthProviders";
import { Wrapper } from "../shared/Wrapper";
import { LoginForm } from "./ui/Form";

const LoginCredentials = () => {
    const bgColors = useBgColor();

    return (
        <Alert
            icon={false}
            sx={{
                py: 3,
                mb: 6,
                ...bgColors.primaryLight,
                "& .MuiAlert-message": { p: 0 },
            }}
        >
            <Typography variant="body2" sx={{ mb: 2, color: "primary.main" }}>
                Admin: <strong>admin@vuexy.com</strong> / Pass:{" "}
                <strong>admin</strong>
            </Typography>
            <Typography variant="body2" sx={{ color: "primary.main" }}>
                Client: <strong>client@vuexy.com</strong> / Pass:{" "}
                <strong>client</strong>
            </Typography>
        </Alert>
    );
};

export const LoginWidget = () => {
    const theme = useTheme();

    return (
        <Wrapper>
            <VuexyIcon />
            <FormHeader
                header={`Welcome to ${themeConfig.templateName}! 👋🏻`}
                subheader="Please sign-in to your account and start the adventure"
            />

            <LoginCredentials />

            <LoginForm />

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}
            >
                <Typography sx={{ color: "text.secondary", mr: 2 }}>
                    New on our platform?
                </Typography>
                <Typography href="/register" component={LinkStyled}>
                    Create an account
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
