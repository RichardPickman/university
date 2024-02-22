const { Typography } = require("@mui/material");
const { Box } = require("@mui/system");

export const FormHeader = ({ header, subheader }) => (
    <Box sx={{ my: 6 }}>
        <Typography variant="h3" sx={{ mb: 1.5 }}>
            {header}
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>{subheader}</Typography>
    </Box>
);
