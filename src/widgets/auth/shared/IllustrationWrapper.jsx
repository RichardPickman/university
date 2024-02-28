import { Box } from "@mui/material";
import FooterIllustrationsV2 from "src/views/pages/auth/FooterIllustrationsV2";
import { AuthIllustration } from "./styled";

export const IllustrationWrapper = ({ isHidden, src }) => {
    if (isHidden) {
        return null;
    }

    return (
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
    );
};
