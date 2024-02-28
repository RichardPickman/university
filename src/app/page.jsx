"use client";

import { Box } from "@mui/material";
import Link from "next/link";

const Home = () => {
    return (
        <Box>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
        </Box>
    );
};

Home.authGuard = false;
Home.guestGuard = true;

export default Home;
