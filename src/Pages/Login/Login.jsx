import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const theme = createTheme();

export default function Login({ userId, setUserId, setIsloggedIn }) {
    let goTo = useNavigate();
    const handleSubmit = async (event) => {
        console.log(setUserId);
        console.log(userId);
        event.preventDefault();
        const data = await new FormData(event.currentTarget);
        let formData = {
            email: data.get("email"),
            password: data.get("password"),
        };
        // console.log({
        //     email: data.get("email"),
        //     password: data.get("password"),
        // });

        let getData = async (userId, setUserId) => {
            const rawResponse = await fetch("http://localhost:8000/auth/login", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            console.log(rawResponse.status)
            const content = await rawResponse.json();
            if (rawResponse.status == 200) {
                setIsloggedIn(true);
                localStorage.setItem('testObject', JSON.stringify(content));
                goTo("/");

            }
            else {
                setIsloggedIn(false);
                alert('wrong email/pass')
            }
            // console.log("🚀 ~ file: Login.jsx ~ line 59 ~ content", content)
            // console.log(content.user._id);//Current logged in user's id
            // await setUserId(content.user._doc._id);
            // save in local storeage
            // localStorage.setItem("userId", content.user._doc._id);
            console.log(content)//tokens

            console.log(userId);


        }

        getData(userId, setUserId);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}

                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>

                            </Grid>
                            <Grid item>
                                <Link onClick={() => goTo("/signup")} href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}
