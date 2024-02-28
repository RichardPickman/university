'use client';

import MuiFormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";

export const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
    '& .MuiFormControlLabel-label': {
        color: theme.palette.text.secondary
    }
}))