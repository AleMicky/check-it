import React, {useState} from 'react';
import {
    Box,
    Button, Card, CardContent,
    Container, FormControl,
    Grid, IconButton, InputLabel, MenuItem,
    Paper, Select, Stack,
    Step,
    StepLabel,
    Stepper,
    TextField,
    Toolbar,
    Typography
} from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';


const Encuesta = () => {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Encuesta
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        name="nombre"
                        label="Nombre"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        name="descripcion"
                        label="Descripción"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-standard-label">Entidad</InputLabel>
                        <Select
                            label="Entidad"
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard">
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={1}>FarmaCoorp</MenuItem>
                            <MenuItem value={2}>Helias</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </React.Fragment>
    )
};


function CardPregunta() {
    return (
        <Card>
            <CardContent>
                <Stack direction="row" spacing={1}>
                    <TextField fullWidth
                               label="Pregunta"
                               variant="filled"/>
                    <IconButton aria-label="imagen">
                        <ImageIcon/>
                    </IconButton>
                </Stack>
            </CardContent>
        </Card>
    );
}

const PreguntaRespuesta = () => {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Pregunta
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <CardPregunta/>
                </Grid>
            </Grid>
        </React.Fragment>
    )
};


const Resumen = () => {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Resumen
            </Typography>
        </React.Fragment>
    )
};


const steps = ['Encuesta', 'Pregunta', 'Resumen'];

function getStepContent(step) {
    switch (step) {
        case 0:
            return <Encuesta/>;
        case 1:
            return <PreguntaRespuesta/>;
        case 2:
            return <Resumen/>;
        default:
            throw new Error('Unknown step');
    }
}

export const Pregunta = () => {

    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };
    return (
        <React.Fragment>
            <Toolbar/>
            <Container component="main" maxWidth="sm" sx={{mb: 4}}>
                <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
                    <Typography component="h1" variant="h4" align="center">
                        Nuevo Encuesta
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{pt: 3, pb: 5}}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Thank you for your order.
                                </Typography>
                                <Typography variant="subtitle1">
                                    Your order number is #2001539. We have emailed your order
                                    confirmation, and will send you an update when your order has
                                    shipped.
                                </Typography>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep)}
                                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} sx={{mt: 3, ml: 1}}>
                                            Atras
                                        </Button>
                                    )}

                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{mt: 3, ml: 1}}
                                    >
                                        {activeStep === steps.length - 1 ? 'Realizar Encuesta' : 'Siguente'}
                                    </Button>
                                </Box>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </Paper>
            </Container>
        </React.Fragment>
    );
}

