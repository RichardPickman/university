"use client";

import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import FooterIllustrationsV2 from "src/views/pages/auth/FooterIllustrationsV2";
import { ForgotPasswordWidget } from "src/widgets/auth/forgot-password";
import { AuthIllustration } from "src/widgets/auth/ui/styled";

const ForgotPassword = () => {
    const theme = useTheme();
    const hidden = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Box
            className="content-right"
            sx={{ backgroundColor: "background.paper" }}
        >
            {!hidden ? (
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        position: "relative",
                        alignItems: "center",
                        borderRadius: "20px",
                        justifyContent: "center",
                        backgroundColor: "customColors.bodyBg",
                        margin: (theme) => theme.spacing(8, 0, 8, 8),
                    }}
                >
                    <AuthIllustration
                        alt="forgot-password-illustration"
                        src={`/images/pages/auth-v2-forgot-password-illustration-${theme.palette.mode}.png`}
                    />
                    <FooterIllustrationsV2 />
                </Box>
            ) : null}

            <ForgotPasswordWidget />
        </Box>
    );
};

ForgotPassword.guestGuard = false;

export default ForgotPassword;
