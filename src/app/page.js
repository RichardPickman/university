'use client';

import { Box } from "@mui/system";
import Link from "next/link";

const Home = () => {
  return (
    <Box sx={{ justifyContent: 'space-between', display: 'flex' }}>
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
    </Box>
  );
}

export default Home
