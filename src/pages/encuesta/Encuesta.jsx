import React, { useEffect } from 'react';
import { Card, CardContent, Container, Fab, Grid, Toolbar, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getSurveys } from '../../store/slices/encuesta/thunks';



export const Encuesta = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading, surveys = [], page } = useSelector(state => state.surveys);

    useEffect(() => {
        dispatch(getSurveys());
    }, [])

    console.log(isLoading);

    return (
        <React.Fragment>
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    Crear un formulario
                </Typography>
                <Grid container spacing={4}>
                    {surveys.map(({ id, descripcion, nombre }) => (
                        <Grid item key={id} xs={12} sm={6} md={4}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {nombre}
                                    </Typography>
                                    <Typography>
                                        {descripcion}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Fab sx={{
                    margin: 0,
                    top: 'auto',
                    right: 20,
                    bottom: 20,
                    left: 'auto',
                    position: 'fixed',
                }}
                    color="primary"
                    aria-label="add"
                    onClick={() => navigate('/pregunta')}>
                    <AddIcon />
                </Fab>
            </Container>
        </React.Fragment>
    );
};
