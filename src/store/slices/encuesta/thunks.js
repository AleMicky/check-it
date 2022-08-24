import { setSurveys, startLoadingSurveys } from "./encuestaSlice";
import { checkItApi } from "../../../api/checkItApi";

export const getSurveys = (page = 0) => {

    return async (dispatch, getState) => {
        dispatch(startLoadingSurveys());
        // TODO: realizar petición http

        const { data } = await checkItApi.get(`/encuesta?limit=10&offset=${ page * 10 }`);
 
        dispatch(setSurveys({ surveys: data, page: page + 1 }));
    }

}