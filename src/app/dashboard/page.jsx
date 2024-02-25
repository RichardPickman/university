"use client";

import AppsIcon from "@mui/icons-material/Apps";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import FolderIcon from "@mui/icons-material/Folder";
import HomeIcon from "@mui/icons-material/Home";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import Shop2Icon from "@mui/icons-material/Shop2";
import { Button, Divider, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Sidebar from "src/core/components/sidebar";
import { useUserStore } from "src/store/userStore";

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
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: headerHeight + "rem",
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
                    <Typography sx={{ fontWeight: "bold" }}>
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
                                    height: "6rem",
                                    width: "6rem",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "1rem",
                                }}
                            >
                                <ChatBubbleIcon fontSize="large" />
                            </Box>
                            <Typography
                                sx={{ marginTop: 2, fontWeight: "bold" }}
                            >
                                Powerflow
                            </Typography>
                        </Box>
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
                                    height: "6rem",
                                    width: "6rem",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "1rem",
                                }}
                            >
                                <RocketLaunchIcon fontSize="large" />
                            </Box>
                            <Typography
                                sx={{
                                    marginTop: 2,
                                    fontWeight: "bold",
                                }}
                            >
                                Accelerate System
                            </Typography>
                        </Box>
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
                                    display: "flex",
                                    height: "6rem",
                                    width: "6rem",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "1rem",
                                }}
                            >
                                <BubbleChartIcon fontSize="large" />
                            </Box>
                            <Typography
                                sx={{
                                    marginTop: 2,
                                    fontWeight: "bold",
                                }}
                            >
                                Knowledge Graph
                            </Typography>
                        </Box>
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
                                    height: "6rem",
                                    width: "6rem",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "1rem",
                                }}
                            >
                                <FolderIcon fontSize="large" />
                            </Box>
                            <Typography
                                sx={{ marginTop: 2, fontWeight: "bold" }}
                            >
                                My files
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

Page.authGuard = true;
Page.guestGuard = false;

export default Page;
