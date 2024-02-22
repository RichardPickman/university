"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button, IconButton, InputAdornment, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Icon from "src/core/components/icon";
import CustomTextField from "src/core/components/mui/text-field";
import { useAuth } from "src/hooks/useAuth";
import * as yup from "yup";
import { Wrapper } from "../ui/Wrapper";
import { LinkStyled } from "../ui/styled";

const passwordSchema = yup
    .string()
    .min(10, "Password must be length of 10")
    .matches(/[a-zA-Z]/, "Password must contain uppercase and lowercase")
    .matches(/[0-9]/, "Password must contain numbers")
    .required();

const schema = yup.object().shape({
    password: passwordSchema,
    password2: passwordSchema,
});

const ForgotPasswordForm = () => {
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
                                            <Icon
                                                fontSize="1.25rem"
                                                icon={
                                                    showPassword
                                                        ? "tabler:eye"
                                                        : "tabler:eye-off"
                                                }
                                            />
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
                                            <Icon
                                                fontSize="1.25rem"
                                                icon={
                                                    showPassword
                                                        ? "tabler:eye"
                                                        : "tabler:eye-off"
                                                }
                                            />
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
                    <Icon fontSize="1.25rem" icon="tabler:chevron-left" />
                    <span>Back to login</span>
                </LinkStyled>
            </Typography>
        </form>
    );
};

export const ForgotPasswordWidget = () => {
    return (
        <Wrapper>
            <Box sx={{ my: 6 }}>
                <Typography
                    sx={{
                        mb: 1.5,
                        fontWeight: 500,
                        fontSize: "1.625rem",
                        lineHeight: 1.385,
                    }}
                >
                    Update password 🔒
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                    Enter your email and we&prime;ll send you instructions to
                    reset your password
                </Typography>
            </Box>

            <ForgotPasswordForm />
        </Wrapper>
    );
};
