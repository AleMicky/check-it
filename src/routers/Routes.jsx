import React from 'react';
import {Navigate, useRoutes} from "react-router-dom";
import {Encuesta, Pregunta} from "../pages/encuesta";
import {Dashboard} from "../App";

const Routes = () => {
    return useRoutes([
        {
            path: '/',
            element: <Dashboard/>,
            children: [
                {path: '/', element: <Navigate to="/encuesta"/>},
                {path: 'encuesta', element: <Encuesta/>},
                {path: 'pregunta', element: <Pregunta/>}
            ]
        },
    ]);
};

export default Routes;
