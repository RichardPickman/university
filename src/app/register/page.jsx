"use client";

import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSettings } from "src/core/hooks/useSettings";
import { staticImagePaths } from "src/helpers/imageMapper";
import { RegisterWidget } from "src/widgets/auth/register";
import { IllustrationWrapper } from "src/widgets/auth/shared/IllustrationWrapper";

const Page = () => {
    const theme = useTheme();
    const { settings } = useSettings();
    const hidden = useMediaQuery(theme.breakpoints.down("md"));

    const { skin } = settings;
    const imageSource =
        skin === "bordered"
            ? "register-illustration-bordered"
            : "register-illustration";

    const src = staticImagePaths[`${imageSource}-${theme.palette.mode}`];

    return (
        <Box
            className="content-center"
            sx={{ backgroundColor: "background.paper" }}
        >
            <IllustrationWrapper isHidden={hidden} src={src} />
            <RegisterWidget />
        </Box>
    );
};

Page.guestGuard = true;

export default Page;
