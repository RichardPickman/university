import { yupResolver } from "@hookform/resolvers/yup";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Button, IconButton, InputAdornment, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CustomTextField from "src/core/components/mui/text-field";
import { useAuth } from "src/hooks/useAuth";
import * as yup from "yup";
import { passwordSchema } from "../../shared/helpers";
import { LinkStyled } from "../../shared/styled";

const schema = yup.object().shape({
    password: passwordSchema,
    password2: passwordSchema,
});

export const ForgotPasswordForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const auth = useAuth();

    const {
        control,
        setError,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        auth.forgotMyPassword(data, (err) => {
            console.log(err);
            setError("password", {
                type: "manual",
                message: err.error,
            });
        });
    };

    return (
        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ mb: 1.5 }}>
                <Controller
                    name="password"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                        <CustomTextField
                            fullWidth
                            value={value}
                            onBlur={onBlur}
                            label="Password"
                            onChange={onChange}
                            id="auth-login-v2-password"
                            error={Boolean(errors.password)}
                            {...(errors.password && {
                                helperText: errors.password.message,
                            })}
                            type={showPassword ? "text" : "password"}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            edge="end"
                                            onMouseDown={(e) =>
                                                e.preventDefault()
                                            }
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        >
                                            {showPassword ? (
                                                <VisibilityIcon fontSize="1.25rem" />
                                            ) : (
                                                <VisibilityOffIcon fontSize="1.25rem" />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}
                />
            </Box>
            <Box sx={{ mb: 1.5 }}>
                <Controller
                    name="password2"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                        <CustomTextField
                            fullWidth
                            value={value}
                            onBlur={onBlur}
                            label="Repeat password"
                            onChange={onChange}
                            id="auth-login-v2-password"
                            error={Boolean(errors.password2)}
                            {...(errors.password2 && {
                                helperText: errors.password2.message,
                            })}
                            type={showPassword ? "text" : "password"}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            edge="end"
                                            onMouseDown={(e) =>
                                                e.preventDefault()
                                            }
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        >
                                            {showPassword ? (
                                                <VisibilityIcon fontSize="1.25rem" />
                                            ) : (
                                                <VisibilityOffIcon fontSize="1.25rem" />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}
                />
            </Box>
            <Button fullWidth type="submit" variant="contained" sx={{ mb: 4 }}>
                Change password
            </Button>
            <Typography
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    "& svg": { mr: 1 },
                }}
            >
                <LinkStyled href="/login">
                    <ChevronLeftIcon fontSize="1.25rem" />
                    <span>Back to login</span>
                </LinkStyled>
            </Typography>
        </form>
    );
};
