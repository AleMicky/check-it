import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    List,
    ListItem,
    ListItemIcon,
    MenuItem,
    Paper,
    Select,
    Stack,
    Step,
    StepLabel,
    Stepper,
    TextField,
    Toolbar,
    Typography
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';

const Encuesta = ({ encuesta, onEncuesta }) => {

    const { nombre, descripcion } = encuesta;

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
                        value={nombre}
                        onChange={(e) => onEncuesta(e.target.value, 'nombre')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        name="descripcion"
                        label="Descripción"
                        fullWidth
                        value={descripcion}
                        onChange={(e) => onEncuesta(e.target.value, 'descripcion')}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    )
};




function CardPregunta({ pregunta, nuevo, elminar, actualizar, nuevoResp, deleteRespuesta }) {

    const { id, nombre, respuestas, tipoRespuesta } = pregunta;

    const [tipo, setTipo] = useState(tipoRespuesta);

    const handleChangeSelect = (event) => {
        setTipo(event.target.value);
    };

    return (
        <Card>
            <CardContent>
                <Stack direction="row" spacing={1}>
                    <TextField
                        fullWidth
                        label="Pregunta"
                        variant="outlined"
                        value={nombre}
                        onChange={e => actualizar(id, e.target.value)}
                    />
                    <Box sx={{ minWidth: 260 }}>
                        <FormControl fullWidth>
                            <InputLabel>Varias opciones</InputLabel>
                            <Select
                                value={tipo}
                                label="Tipo Respuesta"
                                variant="outlined"
                                onChange={handleChangeSelect}>
                                <MenuItem value={'opcion'}>Varias opciones</MenuItem>
                                <MenuItem value={'casiilla'}>Casilla</MenuItem>
                                <MenuItem value={'texto'}>Texto Corto</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Stack>
                <Box sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}>
                    <List>
                        {
                            respuestas.map((resp, i) => (
                                <ListItem disablePadding key={resp.id}>
                                    <ListItemIcon>
                                        <RadioButtonUncheckedIcon />
                                    </ListItemIcon>
                                    <Box sx={{ minWidth: 600, marginBlockEnd: 1 }}>
                                        <TextField
                                            fullWidth
                                            label={`Opcion ${i + 1}`}
                                             variant="outlined"
                                        />
                                    </Box>
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() => deleteRespuesta(id, resp.id)}
                                        color="error"
                                        size='large'>
                                        <DoNotDisturbOnIcon />
                                    </IconButton>
                                </ListItem>
                            ))
                        }
                    </List>
                    <IconButton aria-label="add" color="primary" onClick={() => nuevoResp(id)}>
                        <AddBoxIcon />
                    </IconButton>
                </Box>
            </CardContent>
            <CardActions>
                <IconButton aria-label="nuevo" onClick={nuevo} size="large" color="success">
                    <AddCircleIcon />
                </IconButton>
                <IconButton aria-label="elminar" onClick={() => elminar(id)} size="large" color="error">
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}

const PreguntaRespuesta = ({ encuesta, nuevo, elminar, actualizar, nuevoRespuesta, deleteRespuesta }) => {
    const { pregunta } = encuesta;
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Pregunta
            </Typography>
            <Grid container spacing={3}>
                {
                    pregunta.map((pre) => (
                        <Grid item xs={12} key={pre.id} >
                            <CardPregunta pregunta={pre}
                                nuevo={nuevo}
                                elminar={elminar}
                                actualizar={actualizar}
                                nuevoResp={nuevoRespuesta}
                                deleteRespuesta={deleteRespuesta} />
                        </Grid>
                    ))
                }
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

function getStepContent(
    step,
    encuesta,
    onEncuesta,
    newPregunta,
    deletePregunta,
    updatePregunta,
    newRespuesta,
    deleteRespuesta) {
    switch (step) {
        case 0:
            return <Encuesta
                encuesta={encuesta}
                onEncuesta={onEncuesta}
            />;
        case 1:
            return <PreguntaRespuesta
                encuesta={encuesta}
                nuevo={newPregunta}
                elminar={deletePregunta}
                actualizar={updatePregunta}
                nuevoRespuesta={newRespuesta}
                deleteRespuesta={deleteRespuesta}
            />;
        case 2:
            return <Resumen encuesta={encuesta} />;
        default:
            throw new Error('Unknown step');
    }
}

export const Pregunta = () => {

    const initialState = {
        nombre: '',
        descripcion: '',
        pregunta: [
            {
                id: uuidv4(),
                nombre: '',
                tipoRespuesta: 'opcion',
                respuestas: [
                    {
                        id: uuidv4(),
                        nombre: ''
                    }
                ]
            }
        ]
    };

    const [activeStep, setActiveStep] = useState(0);

    const [encuesta, setEncuesta] = useState(initialState);

    const onEncuesta = (value, field) => {
        setEncuesta({
            ...encuesta,
            [field]: value
        });
    }

    const newPregunta = () => {
        const prevEncuesta = { ...encuesta };
        prevEncuesta.pregunta.push({
            id: uuidv4(),
            nombre: '',
            tipoRespuesta: 'opcion',
            respuestas: [{
                id: uuidv4(),
                nombre: ''
            }]
        });
        setEncuesta(prevEncuesta);
    }


    const deletePregunta = (id) => {
        let prevEncuesta = { ...encuesta };
        const arrayPregunta = prevEncuesta.pregunta.filter((item) => item.id !== id);
        prevEncuesta.pregunta = arrayPregunta;
        setEncuesta(prevEncuesta);
    }

    const deleteRespuesta = (idPregunta, idRespuesta) => {

        let prevEncuesta = { ...encuesta };

        const index = prevEncuesta.pregunta.findIndex(p => p.id === idPregunta);

        const { respuestas, ...preguntaDetalle } = prevEncuesta.pregunta[index];

        const newPregunta = {
            ...preguntaDetalle,
            respuestas: respuestas.filter((item) => item.id !== idRespuesta)
        }
        prevEncuesta.pregunta[index] = newPregunta;


        setEncuesta(prevEncuesta);

    }


    const newRespuesta = (id) => {
        let prevEncuesta = { ...encuesta };
        const index = prevEncuesta.pregunta.findIndex(p => p.id === id);
        const { respuestas, ...preguntaDetalle } = prevEncuesta.pregunta[index];
        const newPregunta = {
            ...preguntaDetalle,
            respuestas: [...respuestas, { id: uuidv4(), nombre: '', }]
        }
        prevEncuesta.pregunta[index] = newPregunta;
        setEncuesta(prevEncuesta);
    }

    const updatePregunta = (idPregunta, pregunta) => {

        let prevEncuesta = { ...encuesta };

        const pregutan = prevEncuesta.pregunta.map((obj) => {
            if (obj.id === idPregunta) {
                return { ...obj, nombre: pregunta }
            }
            return obj
        })

        prevEncuesta.pregunta = pregutan;

        setEncuesta(prevEncuesta);

    }

    const updateRespuesta = (idPregunta, idRespuesta, respuesta) => {
        let prevEncuesta = { ...encuesta };
        const indexPregunta = prevEncuesta.pregunta.findIndex(p => p.id === idPregunta);
        console.log(indexPregunta);
    }


    const handleNext = () => {
        setActiveStep(activeStep + 1);
        if (activeStep === 2) {
            console.log(encuesta);
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <React.Fragment>
            <Toolbar />
            <Container maxWidth="lg" sx={{ mb: 4 }}>
                <Paper variant="elevation" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Nuevo Encuesta
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
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
                                    Encuesta Creada
                                </Typography>
                                <Typography variant="subtitle1">
                                    Exito
                                </Typography>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {getStepContent(
                                    activeStep,
                                    encuesta,
                                    onEncuesta,
                                    newPregunta,
                                    deletePregunta,
                                    updatePregunta,
                                    newRespuesta,
                                    deleteRespuesta)}
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                            Atras
                                        </Button>
                                    )}
                                    <Button variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 3, ml: 1 }}   >
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

