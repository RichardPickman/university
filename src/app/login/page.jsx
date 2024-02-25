"use client";

import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSettings } from "src/core/hooks/useSettings";
import { staticImagePaths } from "src/helpers/imageMapper";
import FooterIllustrationsV2 from "src/views/pages/auth/FooterIllustrationsV2";
import { LoginWidget } from "src/widgets/auth/login";
import { AuthIllustration } from "src/widgets/auth/shared/styled";

const LoginPage = () => {
    const theme = useTheme();
    const { settings } = useSettings();
    const hidden = useMediaQuery(theme.breakpoints.down("md"));
    const { skin } = settings;
    const imageSource =
        skin === "bordered"
            ? "login-illustration-bordered"
            : "login-illustration";

    const src = staticImagePaths[`${imageSource}-${theme.palette.mode}`];

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
            <LoginWidget />
        </Box>
    );
};

LoginPage.guestGuard = true;

export default LoginPage;
