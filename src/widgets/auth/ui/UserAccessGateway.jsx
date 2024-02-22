import { Divider, IconButton } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import Link from "next/link";
import Icon from "src/core/components/icon";

export const UserAccessGateway = ({ children }) => {
    const theme = useTheme();

    return (
        <>
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
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <IconButton
                    href="/"
                    component={Link}
                    sx={{ color: "#497ce2" }}
                    onClick={(e) => e.preventDefault()}
                >
                    <Icon icon="mdi:facebook" />
                </IconButton>
                <IconButton
                    href="/"
                    component={Link}
                    sx={{ color: "#1da1f2" }}
                    onClick={(e) => e.preventDefault()}
                >
                    <Icon icon="mdi:twitter" />
                </IconButton>
                <IconButton
                    href="/"
                    component={Link}
                    onClick={(e) => e.preventDefault()}
                    sx={{
                        color: (theme) =>
                            theme.palette.mode === "light"
                                ? "#272727"
                                : "grey.300",
                    }}
                >
                    <Icon icon="mdi:github" />
                </IconButton>
                <IconButton
                    href="/"
                    component={Link}
                    sx={{ color: "#db4437" }}
                    onClick={(e) => e.preventDefault()}
                >
                    <Icon icon="mdi:google" />
                </IconButton>
            </Box>
        </>
    );
};
