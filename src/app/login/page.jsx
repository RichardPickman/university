"use client";

import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSettings } from "src/core/hooks/useSettings";
import { staticImagePaths } from "src/helpers/imageMapper";
import { LoginWidget } from "src/widgets/auth/login";
import { IllustrationWrapper } from "src/widgets/auth/shared/IllustrationWrapper";

const Page = () => {
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
            <IllustrationWrapper isHidden={hidden} src={src} />
            <LoginWidget />
        </Box>
    );
};

Page.authGuard = false;
Page.guestGuard = true;

export default Page;
