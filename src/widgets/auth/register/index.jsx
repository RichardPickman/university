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
import { FormHeader } from "../ui/FormHeader";
import { UserAccessGateway } from "../ui/UserAccessGateway";
import { VuexyIcon } from "../ui/VuexyIcon";
import { Wrapper } from "../ui/Wrapper";
import { LinkStyled } from "../ui/styled";

const passwordSchema = yup
    .string()
    .min(10, "Password must be length of 10")
    .matches(/[a-zA-Z]/, "Password must contain uppercase and lowercase")
    .matches(/[0-9]/, "Password must contain numbers")
    .required();

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: passwordSchema,
    password2: passwordSchema,
});

export const RegisterForm = () => {
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
        const { email, password, password2 } = data;

        auth.register({ email, password, password2 }, (err) => {
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
                            placeholder="guest@vuexy.com"
                            error={Boolean(errors.email)}
                            {...(errors.email && {
                                helperText: errors.email.message,
                            })}
                        />
                    )}
                />
            </Box>
            <Box sx={{ mb: 4 }}>
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
            <Box sx={{ mb: 4 }}>
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
                Sign up
            </Button>
        </form>
    );
};

export const RegisterWidget = () => {
    return (
        <Wrapper>
            <VuexyIcon />
            <FormHeader
                header="Adventure starts here 🚀"
                subheader="Make your app management easy and fun!"
            />
            <RegisterForm />
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
                        Already have an account?
                    </Typography>
                    <Typography component={LinkStyled} href="/login">
                        Sign in instead
                    </Typography>
                </Box>
            </UserAccessGateway>
        </Wrapper>
    );
};
