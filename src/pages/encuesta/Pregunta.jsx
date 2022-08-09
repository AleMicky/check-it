import React, {useState} from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    ButtonGroup,
    Card,
    CardActions,
    CardContent,
    Container, Fab,
    FormControl,
    FormControlLabel,
    IconButton,
    InputLabel,
    List,
    ListItem,
    ListItemIcon,
    MenuItem,
    Select,
    Stack,
    Switch,
    TextField,
    Toolbar,
    Typography
} from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import AddIcon from '@mui/icons-material/Add';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';


export const Pregunta = () => {
        /* const [respuesta, setRespuesta] = useState();
         const handleChangeAdd = () => {
             setRespuesta(respuesta => [...respuesta, {
                 respuesta: 'Opción'
             }])
         }

         const handleChangeClear = (index) => {
             if (respuesta.length === 1) return;
             setRespuesta([
                 ...respuesta.splice(0, index),
                 ...respuesta.splice(index + 1, respuesta.length)
             ])
         }


         const [expanded, setExpanded] = useState(false);

         const handleChange = (panel) => (event, isExpanded) => {
             setExpanded(isExpanded ? panel : false);
         };

         const [pregunta, setPregunta] = useState([
             {
                 pregunta: 'Como esta el servicio'
             },
             {
                 pregunta: 'Como esta la atencio'
             },
             {
                 pregunta: 'Como se encuentra'
             },
         ]);
         const handleChangePregunta = () => {
             setPregunta(pregunta => [...pregunta, {
                 pregunta: ''
             }])
         }*/

        const [encuesta, setEncuesta] = useState('');

        const [tipoRespuesta, setTipoRespuesto] = useState('opcion');

        const handleChangeSelect = (event) => {
            setTipoRespuesto(event.target.value);
        };

        const [pregunta, setPregunta] = useState([
            {
                pregunta: 'Como esta el servicio',
                respuesta: [
                    {
                        respuesta: 'Opción'
                    }
                ]
            },
            {
                pregunta: 'Como esta la atencio',
                respuesta: [
                    {
                        respuesta: 'Opción'
                    }
                ]
            },
            {
                pregunta: 'Como se encuentra',
                respuesta: [
                    {
                        respuesta: 'Opción'
                    }
                ]
            },
        ]);

        const handleChangeNewPregunta = () => {
            setPregunta(pregunta => [...pregunta, {
                pregunta: ''
            }])
        }
        const handleChangeClearPregunta = (index) => {
            if (pregunta.length === 1) return;
            setPregunta([
                ...pregunta.splice(0, index),
                ...pregunta.splice(index + 1, pregunta.length)
            ])
        }


        return (
            <Container maxWidth="sm">
                <Toolbar/>
                <Typography component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom>
                    Crear Encuesta
                </Typography>
                <Box sx={style.container}>
                    <Card>
                        <CardContent>
                            <Box sx={style.cardEncuesta}>
                                <TextField fullWidth
                                           label="Encuesta"
                                           variant="standard"
                                           onChange={e => setEncuesta(e.target.value)}
                                           value={encuesta}/>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
                {
                    pregunta.map(({pregunta, respuesta}, index) => (
                        <Card sx={{minWidth: 600, marginTop: 3}} key={index}>
                            <CardContent>
                                <Stack direction="row" spacing={1}>
                                    <Box sx={{minWidth: 260}}>
                                        <TextField fullWidth
                                                   label="Pregunta"
                                                   variant="filled"
                                                   value={pregunta}/>
                                    </Box>
                                    <IconButton aria-label="imagen">
                                        <ImageIcon/>
                                    </IconButton>
                                    <Box sx={{minWidth: 260}}>
                                        <FormControl fullWidth>
                                            <InputLabel>Varias opciones</InputLabel>
                                            <Select
                                                value={tipoRespuesta}
                                                label="Tipo Respuesta"
                                                variant="filled"
                                                onChange={handleChangeSelect}>
                                                <MenuItem value={'opcion'}>Varias opciones</MenuItem>
                                                <MenuItem value={'casiilla'}>Casilla</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Stack>
                                <Box sx={{width: '100%', maxWidth: 300, bgcolor: 'background.paper'}}>
                                    <List>
                                        {respuesta.map(({respuesta}, i) => (
                                            <ListItem disablePadding key={i}>
                                                <ListItemIcon>
                                                    {
                                                        tipoRespuesta === 'opcion' ? <RadioButtonUncheckedIcon/> :
                                                            <CheckBoxOutlineBlankIcon/>
                                                    }
                                                </ListItemIcon>
                                                <Box sx={{minWidth: 400}}>
                                                    <TextField fullWidth
                                                               label={`Opcion ${i + 1}`}
                                                               variant="standard"/>
                                                </Box>
                                                <IconButton aria-label="add"
                                                            onClick={() => console.log(1)}>
                                                    <ClearIcon/>
                                                </IconButton>
                                            </ListItem>
                                        ))
                                        }
                                    </List>
                                    <IconButton aria-label="add" onClick={() => console.log(1)}>
                                        <AddIcon/>
                                    </IconButton>
                                </Box>
                            </CardContent>
                            <CardActions>
                                <IconButton aria-label="elminar" onClick={() => handleChangeClearPregunta(index)}>
                                    <DeleteIcon/>
                                </IconButton>
                                <IconButton aria-label="nuevo" onClick={handleChangeNewPregunta}>
                                    <AddIcon/>
                                </IconButton>
                                <FormControlLabel control={<Switch defaultChecked/>} label="Obligatorio"/>
                            </CardActions>
                        </Card>
                    ))
                }
                <Fab sx={style.fab}
                     color="primary"
                     aria-label="add"
                     onClick={() => navigate('/pregunta')}>
                    <SaveIcon/>
                </Fab>
            </Container>
        )
            ;
    }
;
const style = {
    container: {
        width: 600,
        marginTop: 5,
        marginBottom: 5
    },
    cardEncuesta: {
        width: 700,
        maxWidth: '100%',
    },
    fab: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    }
}
