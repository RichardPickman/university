"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { FormControlLabel } from "@mui/material";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import themeConfig from "src/configs/themeConfig";
import Icon from "src/core/components/icon";
import CustomTextField from "src/core/components/mui/text-field";
import useBgColor from "src/core/hooks/useBgColor";
import { useAuth } from "src/hooks/useAuth";
import { FormHeader } from "src/widgets/auth/ui/FormHeader";
import { VuexyIcon } from "src/widgets/auth/ui/VuexyIcon";
import { LinkStyled } from "src/widgets/auth/ui/styled";
import * as yup from "yup";
import { UserAccessGateway } from "../ui/UserAccessGateway";
import { Wrapper } from "../ui/Wrapper";

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(5).required(),
});

const defaultValues = {
    password: "admin",
    email: "admin@vuexy.com",
};

export const LoginForm = () => {
    const [rememberMe, setRememberMe] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const auth = useAuth();

    const {
        control,
        setError,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues,
        mode: "onBlur",
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        const { email, password } = data;
        auth.login({ email, password, rememberMe }, (err) => {
            setError("email", {
                type: "manual",
                message: err.error,
            });
        });
    };

    return (
        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ mb: 4 }}>
                <Controller
                    name="email"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                        <CustomTextField
                            fullWidth
                            autoFocus
                            label="Email"
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            placeholder="admin@vuexy.com"
                            error={Boolean(errors.email)}
                            {...(errors.email && {
                                helperText: errors.email.message,
                            })}
                        />
                    )}
                />
            </Box>
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
            <Box
                sx={{
                    mb: 1.75,
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <FormControlLabel
                    label="Remember Me"
                    control={
                        <Checkbox
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                    }
                />
                <Typography component={LinkStyled} href="/forgot-password">
                    Forgot Password?
                </Typography>
            </Box>
            <Button fullWidth type="submit" variant="contained" sx={{ mb: 4 }}>
                Login
            </Button>
        </form>
    );
};

export const LoginWidget = () => {
    const bgColors = useBgColor();

    return (
        <Wrapper>
            <VuexyIcon />
            <FormHeader
                header={`Welcome to ${themeConfig.templateName}! 👋🏻`}
                subheader="Please sign-in to your account and start the adventure"
            />
            <Alert
                icon={false}
                sx={{
                    py: 3,
                    mb: 6,
                    ...bgColors.primaryLight,
                    "& .MuiAlert-message": { p: 0 },
                }}
            >
                <Typography
                    variant="body2"
                    sx={{ mb: 2, color: "primary.main" }}
                >
                    Admin: <strong>admin@vuexy.com</strong> / Pass:{" "}
                    <strong>admin</strong>
                </Typography>
                <Typography variant="body2" sx={{ color: "primary.main" }}>
                    Client: <strong>client@vuexy.com</strong> / Pass:{" "}
                    <strong>client</strong>
                </Typography>
            </Alert>

            <LoginForm />

            <UserAccessGateway>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        justifyContent: "center",
                    }}
                >
                    <Typography sx={{ color: "text.secondary", mr: 2 }}>
                        New on our platform?
                    </Typography>
                    <Typography href="/register" component={LinkStyled}>
                        Create an account
                    </Typography>
                </Box>
            </UserAccessGateway>
        </Wrapper>
    );
};
