"use client";

import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { staticImagePaths } from "src/helpers/imageMapper";
import { ForgotPasswordWidget } from "src/widgets/auth/forgot-password";
import { IllustrationWrapper } from "src/widgets/auth/shared/IllustrationWrapper";

const Page = () => {
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

            <ForgotPasswordWidget />
        </Box>
    );
};

Page.authGuard = false;
Page.guestGuard = true;

export default Page;
