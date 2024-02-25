"use client";

import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { staticImagePaths } from "src/helpers/imageMapper";
import FooterIllustrationsV2 from "src/views/pages/auth/FooterIllustrationsV2";
import { ForgotPasswordWidget } from "src/widgets/auth/forgot-password";
import { AuthIllustration } from "src/widgets/auth/shared/styled";

const ForgotPassword = () => {
    const theme = useTheme();
    const hidden = useMediaQuery(theme.breakpoints.down("md"));
    const src =
        staticImagePaths[`forgot-password-illustration-${theme.palette.mode}`];

    return (
        <Box
            className="content-center"
            sx={{ backgroundColor: "background.paper" }}
        >
            {hidden ? null : (
                <Box
                    sx={{
                        display: "flex",
                        position: "relative",
                        width: "100%",
                        alignItems: "center",
                        flexDirection: "column",
                        borderRadius: "20px",
                        justifyContent: "center",
                        backgroundColor: "customColors.bodyBg",
                        margin: (theme) => theme.spacing(8, 0, 8, 8),
                    }}
                >
                    <AuthIllustration
                        sx={{
                            width: "100%",
                            objectFit: "contain",
                        }}
                        src={src}
                    />
                    <FooterIllustrationsV2 />
                </Box>
            )}

            <ForgotPasswordWidget />
        </Box>
    );
};

ForgotPassword.guestGuard = false;

export default ForgotPassword;
