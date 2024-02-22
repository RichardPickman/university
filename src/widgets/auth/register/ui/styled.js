import MuiFormControlLabel from '@mui/material/FormControlLabel';
import { styled } from "@mui/system";

export const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.75),
    '& .MuiFormControlLabel-label': {
        color: theme.palette.text.secondary
    }
}))