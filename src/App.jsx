import React, {useState} from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {
    CssBaseline,
    Box,
} from '@mui/material';
import Header from "./layout/Header";
import Nav from "./layout/Nav";
import {Outlet} from "react-router-dom";
import Routes from "./routers/Routes";





export function Dashboard() {
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    return (<Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <Header open={open}
                    toggleDrawer={toggleDrawer}/>
            <Nav open={open}
                 toggleDrawer={toggleDrawer}/>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}>
                <Outlet/>
            </Box>
        </Box>
    );
}

const mdTheme = createTheme();

export default function App() {
    return (
        <ThemeProvider theme={mdTheme}>
             <Routes/>
         </ThemeProvider>
    );
}
