"use client";

import AppsIcon from "@mui/icons-material/Apps";
import HomeIcon from "@mui/icons-material/Home";
import Shop2Icon from "@mui/icons-material/Shop2";
import { Button, Divider, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Sidebar from "src/core/components/sidebar";
import { useUserStore } from "src/store/userStore";

const Page = () => {
    const [isOpen, setOpen] = useState(true);
    const logout = useUserStore().getState().logout;
    const headerHeight = "4rem";
    const router = useRouter();

    const onLogoutClick = () => {
        logout();

        router.push("/login");
    };

    return (
        <Box sx={{ height: "100vh" }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: headerHeight,
                }}
            >
                <Box>UNIC</Box>
                <Box>
                    <IconButton>
                        <HomeIcon fontSize="large" />
                    </IconButton>
                    <IconButton>
                        <AppsIcon fontSize="large" />
                    </IconButton>
                    <IconButton>
                        <Shop2Icon fontSize="large" />
                    </IconButton>
                </Box>
                <Box>
                    <Button onClick={onLogoutClick}>Logout</Button>
                </Box>
            </Box>
            <Sidebar
                show={isOpen}
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 2,
                    flexDirection: "column",
                }}
                direction="left"
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                backDropClick={() => setOpen(false)}
            >
                <Box sx={{ padding: "1rem", height: "100%" }}>
                    <Box sx={{ height: "80%" }}>Empty bar</Box>
                    <Divider />
                    <Box>
                        <Box sx={{ padding: "1rem", border: "1px solid " }}>
                            EN
                        </Box>
                    </Box>
                </Box>
            </Sidebar>
        </Box>
    );
};

Page.authGuard = true;
Page.guestGuard = false;

export default Page;
