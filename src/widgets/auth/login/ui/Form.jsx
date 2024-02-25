import { yupResolver } from "@hookform/resolvers/yup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { FormControlLabel } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CustomTextField from "src/core/components/mui/text-field";
import { useUserStore } from "src/store/userStore";
import { LinkStyled } from "src/widgets/auth/shared/styled";
import * as yup from "yup";
import { passwordSchema } from "../../shared/helpers";

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: passwordSchema,
});

const defaultValues = {
    password: "123Qweasd,.",
    email: "drezzerock+123123@gmail.com",
};

export const LoginForm = () => {
    const [rememberMe, setRememberMe] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useUserStore().getState();
    const router = useRouter();

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
        login({ ...data, rememberMe })
            .then(() => {
                router.push("/dashboard");

                console.log("Successfully logged in!");
            })
            .catch((err) => {
                setError("email", {
                    type: "manual",
                    message: err.response.data.error,
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
