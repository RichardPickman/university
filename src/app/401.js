// ** Next Import
import Link from "next/link";

// ** MUI Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import Error401Image from 'public/images/pages/401.png';
import BlankLayout from "src/core/layouts/BlankLayout";
import FooterIllustrations from "src/views/pages/misc/FooterIllustrations";

const BoxWrapper = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
        width: "90vw",
    },
}));

const Img = styled(Image)(({ theme }) => ({
    [theme.breakpoints.down("lg")]: {
        height: 450,
        marginTop: theme.spacing(10),
    },
    [theme.breakpoints.down("md")]: {
        height: 400,
    },
    [theme.breakpoints.up("lg")]: {
        marginTop: theme.spacing(20),
    },
}));

const Error401 = () => {
    return (
        <Box className="content-center">
            <Box
                sx={{
                    p: 5,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                <BoxWrapper>
                    <Typography variant="h2" sx={{ mb: 1.5 }}>
                        You are not authorized!
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                        You do not have permission to view this page using the
                        credentials that you have provided while login.
                    </Typography>
                    <Typography sx={{ mb: 6, color: "text.secondary" }}>
                        Please contact your site administrator.
                    </Typography>
                    <Button href="/" component={Link} variant="contained">
                        Back to Home
                    </Button>
                </BoxWrapper>
                <Img
                    height="500"
                    alt="error-illustration"
                    src={Error401Image}
                />
            </Box>
            <FooterIllustrations />
        </Box>
    );
};

Error401.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;

export default Error401;
