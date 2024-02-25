"use client";

import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import Sidebar from "src/core/components/sidebar";

const Page = () => {
    const [isOpen, setOpen] = useState(true);

    return (
        <Box>
            <Box></Box>
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

Page.guestGuard = true;
export default Page;
