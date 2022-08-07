import React, {useState} from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button, ButtonGroup,
    Card,
    CardActions,
    CardContent,
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


const buttons = [
    <Button key="one">Add</Button>,
];

export const Pregunta = () => {


    const [respuesta, setRespuesta] = useState([
        {
            respuesta: 'Opción'
        }
    ]);
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

    const [age, setAge] = useState('opcion');
    const handleChangeSelect = (event) => {
        setAge(event.target.value);
    };
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
    }

    return (
        <React.Fragment>
            <Toolbar/>
            <Box sx={{flexDirection: 'row-reverse', justifyContent: 'center', alignItems: 'center'}}>
                <Box sx={{width: 700, marginTop: 5, marginBottom: 5}}>
                    <Card>
                        <CardContent>
                            <Box sx={{
                                width: 700,
                                maxWidth: '100%',
                            }}>
                                <TextField fullWidth
                                           id="outlined-basic"
                                           label="Encuesta"
                                           variant="standard"/>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
                <Box sx={{width: 700, marginBottom: 3}}>
                    {
                        pregunta.map(({id, pregunta}, index) => {
                            let accordionId = `panel-${index}`;
                            return (
                                <Accordion key={index} expanded={expanded === accordionId}
                                           onChange={handleChange(accordionId)}>
                                    <AccordionSummary aria-controls={`panel-${index}-a-content`}
                                                      id={`panel1a-header-${index}`}>
                                        <Typography>{pregunta}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Stack direction="row" spacing={1}>
                                            <Box sx={{minWidth: 300}}>
                                                <TextField fullWidth id="filled-basic" label="Pregunta"
                                                           variant="filled"/>
                                            </Box>
                                            <IconButton aria-label="imagen">
                                                <ImageIcon/>
                                            </IconButton>
                                            <Box sx={{minWidth: 300}}>
                                                <FormControl fullWidth>
                                                    <InputLabel>Varias opciones</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        value={age}
                                                        label="Tipo Respuesta"
                                                        onChange={handleChangeSelect}>
                                                        <MenuItem value={'opcion'}>Varias opciones</MenuItem>
                                                        <MenuItem value={'casiilla'}>Casilla</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </Stack>
                                        <Box sx={{width: '100%', maxWidth: 300, bgcolor: 'background.paper'}}>
                                            <List>
                                                { respuesta.map(({respuesta}, index) => (
                                                    <ListItem disablePadding key={index}>
                                                    <ListItemIcon>
                                                {
                                                    age === 'opcion' ? <RadioButtonUncheckedIcon/> :
                                                    <CheckBoxOutlineBlankIcon/>
                                                }
                                                    </ListItemIcon>
                                                    <Box sx={{minWidth: 550}}>
                                                    <TextField fullWidth id="filled-basic"
                                                    label={`Opcion ${index + 1}`}
                                                    variant="standard"/>
                                                    </Box>
                                                    <IconButton aria-label="add"
                                                    onClick={() => handleChangeClear(index)}>
                                                    <ClearIcon/>
                                                    </IconButton>
                                                    </ListItem>
                                                    ))
                                                }
                                            </List>
                                            <IconButton aria-label="add" onClick={handleChangeAdd}>
                                                <AddIcon/>
                                            </IconButton>
                                        </Box>
                                    </AccordionDetails>
                                </Accordion>
                            )
                        })
                    }
                </Box>
                <ButtonGroup
                    orientation="vertical"
                    aria-label="vertical contained button group"
                    variant="contained"
                    onClick={handleChangePregunta}>
                    {buttons}
                </ButtonGroup>
            </Box>
        </React.Fragment>
    );
};
