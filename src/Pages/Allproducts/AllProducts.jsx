import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../auth";

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
                @sif's Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function AllProducts({ isloggedIn }) {
    let goTo = useNavigate();

    let [products, setProducts] = React.useState([]);

    let getProducts = async () => {
        const rawResponse = await fetch("http://localhost:8000/post/allproducts", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        const content = await rawResponse.json();
        console.log(content)
        setProducts(content);
    };
    let showInterest = async (id) => {
        let data = await localStorage.getItem("testObject")
        let info = JSON.parse(data);
        fetch(`http://localhost:8000/post/interested/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                // your expected POST request payload goes here
                buyer: info.id
            })
        })
            .then(res => res.json())
            .then(data => {
                // enter you logic when the fetch is successful
                console.log(data)
            })
            .catch(error => {
                // enter your logic for when there is an error (ex. error toast)
                console.log(error)
            })


    }

    React.useEffect(() => {

        getProducts();
        // console.log(products);

        // axiosClient.get('/post').then(resp => setProducts(resp))
    }, []);

    if (products.length < 0) {
        return (
            <div>
                <h1>Loading</h1>
            </div>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        ALL PRODUCTS
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: "background.paper",
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            CellIT
                        </Typography>
                        <Typography
                            variant="h5"
                            align="center"
                            color="text.secondary"
                            paragraph
                        >
                            Buy,Sell,Trade;
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            {!isloggedIn ? (
                                <>
                                    {" "}
                                    <Button variant="contained" onClick={() => goTo("./signup")}>
                                        Sign Up
                                    </Button>
                                    <Button variant="outlined" onClick={() => goTo("./login")}>
                                        Login
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button variant="outlined" onClick={() => goTo("./login")}>
                                        Logout
                                    </Button>
                                    <Button variant="outlined" onClick={() => goTo("./create")}>
                                        Create a new Ad
                                    </Button>
                                    <Button variant="outlined" onClick={() => goTo("./admin/" + localStorage.getItem('userId'))}>
                                        Profile
                                    </Button>
                                </>
                            )}
                        </Stack>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {products.map((card) => (
                            <Grid item key={card._id} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            // 16:9
                                            pt: "56.25%",
                                        }}
                                        image={`${card.imgUrl}`}
                                        alt="random"
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {card.title}
                                        </Typography>
                                        <Typography>{card.description}</Typography>
                                        <Typography>{`$ ${card.price}`}</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" onClick={() => showInterest(card._id)}>Show Interest</Button>
                                        <Button size="small">Edit</Button>
                                    </CardActions>
                                    <Button size="small" >Intrested:{card.interestedBuyers.length}</Button>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    Happy Shopping!
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    Contact US!
                </Typography>
                <Copyright />
            </Box>
            {/* End footer */}
        </ThemeProvider>
    );
}
