import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Box, IconButton } from "@mui/material";
import Link from "next/link";

export const AuthProviders = () => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <IconButton href="/" component={Link} sx={{ color: "#497ce2" }}>
                <FacebookIcon />
            </IconButton>
            <IconButton href="/" component={Link} sx={{ color: "#1da1f2" }}>
                <TwitterIcon />
            </IconButton>
            <IconButton
                href="/"
                component={Link}
                sx={{
                    color: (theme) =>
                        theme.palette.mode === "light" ? "#272727" : "grey.300",
                }}
            >
                <GitHubIcon />
            </IconButton>
            <IconButton href="/" component={Link} sx={{ color: "#db4437" }}>
                <GoogleIcon />
            </IconButton>
        </Box>
    );
};
