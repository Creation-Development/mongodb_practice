import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Carousel } from 'react-bootstrap';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';

const theme = createTheme();


const ProductDetail = () => {
    const { id } = useParams()
    const [product, setProduct] = React.useState([]);
    React.useEffect(() => {
        axios.get(`http://localhost:5000/product/${id}`)
            .then((res) => {
                setProduct(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);
    var path = product.pic
    return (
        <>
            {path != undefined ?
                <ThemeProvider theme={theme}>
                    <Grid container component="main" sx={{ height: '100vh' }}>
                        <CssBaseline />
                        <Grid
                            item
                            xs={false}
                            sm={4}
                            md={7}
                        >
                            <Carousel>
                                {
                                    path.map((item) => (
                                        <Carousel.Item>
                                            <img
                                                className="d-block w-100"
                                                src={`http://localhost:5000/${item}`}
                                                height={"780px"}
                                            />
                                        </Carousel.Item>
                                    ))
                                }

                            </Carousel>
                        </Grid>
                        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                            <Box
                                sx={{
                                    my: 8,
                                    mx: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <h1>Product Name :- {product.name}</h1>
                                <h4>Product Price :- Rs.{product.price}</h4>
                                <h6>Product Description :- <br />{product.desc}</h6>
                                <div className="container my-4">
                                    <h3>Features</h3>
                                    <hr />
                                    <ImageList className='mb-0' sx={{ width: 500, height: 450 }}>
                                        {product.feature.map((value, index) => (
                                            <>
                                                <ImageListItem key={index}>
                                                    <img
                                                        src={`http://localhost:5000/${value.Fpic}`}
                                                        alt="img"
                                                    // loading="lazy"
                                                    />
                                                    <ImageListItemBar
                                                        title={value.name}
                                                        position="below"
                                                    />
                                                </ImageListItem>
                                            </>
                                        ))}
                                    </ImageList>
                                </div>
                            </Box>
                        </Grid>
                    </Grid>
                </ThemeProvider>
                : null
            }
        </>
    );
};

export default ProductDetail;





