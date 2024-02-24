import { Divider, IconButton } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import Link from "next/link";
import { memo } from "react";
import Icon from "src/core/components/icon";

const Providers = memo(() => (
    <Box
        sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}
    >
        <IconButton href="/" component={Link} sx={{ color: "#497ce2" }}>
            <Icon icon="mdi:facebook" />
        </IconButton>
        <IconButton href="/" component={Link} sx={{ color: "#1da1f2" }}>
            <Icon icon="mdi:twitter" />
        </IconButton>
        <IconButton
            href="/"
            component={Link}
            sx={{
                color: (theme) =>
                    theme.palette.mode === "light" ? "#272727" : "grey.300",
            }}
        >
            <Icon icon="mdi:github" />
        </IconButton>
        <IconButton href="/" component={Link} sx={{ color: "#db4437" }}>
            <Icon icon="mdi:google" />
        </IconButton>
    </Box>
));

Providers.displayName = "Providers";

export const UserAccessGateway = ({ children }) => {
    const theme = useTheme();

    return (
        <Box>
            {children}
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

            <Providers />
        </Box>
    );
};
