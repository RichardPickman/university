import { Box } from "@mui/material";
import { RightWrapper } from "./styled";

export const Wrapper = ({ children }) => (
    <RightWrapper>
        <Box
            sx={{
                p: [6, 12],
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box sx={{ width: "100%", maxWidth: 400 }}>{children}</Box>
        </Box>
    </RightWrapper>
);
