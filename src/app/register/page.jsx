"use client";

import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSettings } from "src/core/hooks/useSettings";
import FooterIllustrationsV2 from "src/views/pages/auth/FooterIllustrationsV2";
import { RegisterWidget } from "src/widgets/auth/register";
import { AuthIllustration } from "src/widgets/auth/ui/styled";

const Register = () => {
    const theme = useTheme();
    const { settings } = useSettings();
    const hidden = useMediaQuery(theme.breakpoints.down("md"));

    const { skin } = settings;
    const imageSource =
        skin === "bordered"
            ? "auth-v2-register-illustration-bordered"
            : "auth-v2-register-illustration";

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
                        alt="register-illustration"
                        src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
                    />
                    <FooterIllustrationsV2 />
                </Box>
            ) : null}
            <RegisterWidget />
        </Box>
    );
};

Register.guestGuard = true;

export default Register;