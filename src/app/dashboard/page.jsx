"use client";

import AppsIcon from "@mui/icons-material/Apps";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import FolderIcon from "@mui/icons-material/Folder";
import HomeIcon from "@mui/icons-material/Home";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import Shop2Icon from "@mui/icons-material/Shop2";
import { Button, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Sidebar from "src/core/components/sidebar";
import { useUserStore } from "src/store/userStore";

const AppItem = ({ icon, text }) => (
    <Box
        sx={{
            height: "6rem",
            width: "6rem",
            cursor: "pointer",
        }}
    >
        <Box
            sx={{
                backgroundColor: "background.paper",
                height: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 1,
            }}
        >
            {icon}
        </Box>
        <Typography sx={{ marginTop: 2, fontWeight: "bold" }}>
            {text}
        </Typography>
    </Box>
);

const MenuItem = ({ children }) => (
    <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
            borderRadius: 1,
            padding: 2,
            cursor: "pointer",
            ":hover": {
                backgroundColor: "background.paper",
            },
        }}
    >
        {children}
    </Box>
);

const Header = ({ headerHeight, onClick }) => (
    <Box
        sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingX: 4,
            height: headerHeight + "rem",
        }}
    >
        <Box>UNIC</Box>
        <Box
            sx={{
                display: "flex",
                gap: 6,
            }}
        >
            <MenuItem>
                <HomeIcon fontSize="large" />
                <Typography sx={{ fontWeight: "bold" }}>Dashboard</Typography>
            </MenuItem>
            <MenuItem>
                <AppsIcon fontSize="large" />
                <Typography sx={{ fontWeight: "bold" }}>My Apps</Typography>
            </MenuItem>
            <MenuItem>
                <Shop2Icon fontSize="large" />
                <Typography sx={{ fontWeight: "bold" }}>App Store</Typography>
            </MenuItem>
        </Box>
        <Box>
            <Button onClick={onClick}>Logout</Button>
        </Box>
    </Box>
);

const Page = () => {
    const [isOpen, setOpen] = useState(true);
    const logout = useUserStore().getState().logout;
    const headerHeight = 6;
    const sidebarWidth = 14;
    const router = useRouter();
    const mainContentWidth = (isOpen ? sidebarWidth : 0) + 6 + "rem";

    // Using the zustand for this project was a huge mistake.... Ask me later :)
    const onLogoutClick = () => {
        logout();

        router.push("/login");
    };

    return (
        <Box sx={{ height: "100vh" }}>
            <Header headerHeight={headerHeight} onClick={onLogoutClick} />
            <Box
                id="menu-box"
                sx={{ display: "flex", height: "100%", position: "relative" }}
            >
                <Sidebar
                    show={isOpen}
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 2,
                        height: "100%",
                        flexDirection: "column",
                    }}
                    direction="left"
                    onOpen={() => setOpen(true)}
                    onClose={() => setOpen(false)}
                    backDropClick={() => setOpen(false)}
                >
                    <Box sx={{ height: "80%" }}>Empty bar</Box>
                    <Divider />
                    <Box>
                        <Box sx={{ padding: "1rem", border: "1px solid " }}>
                            EN
                        </Box>
                    </Box>
                </Sidebar>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                        padding: 2,
                        paddingLeft: mainContentWidth,
                        transition: "all 0.25s ease-in-out",
                    }}
                >
                    <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                        Frequently used apps
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            textWrap: "wrap",
                            gap: 4,
                            textAlign: "center",
                        }}
                    >
                        <AppItem
                            icon={<ChatBubbleIcon fontSize="large" />}
                            text={"Powerflow"}
                        />
                        <AppItem
                            icon={<RocketLaunchIcon fontSize="large" />}
                            text={"Accelerate System"}
                        />
                        <AppItem
                            icon={<BubbleChartIcon fontSize="large" />}
                            text={"Knowledge Graph"}
                        />
                        <AppItem
                            icon={<FolderIcon fontSize="large" />}
                            text={"My files"}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

Page.authGuard = true;

export default Page;
