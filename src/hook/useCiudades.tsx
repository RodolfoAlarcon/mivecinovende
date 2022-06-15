import React, { useEffect, useRef, useState } from 'react';
import ciudadesApi from '../api/apiCiudad';
import { Ciudades, Datum } from '../interfaces/CiudadesInterface';

export const useCiudades = () =>{

    const [CiudadesActuales, setCiudadesActuales] = useState<Datum[]>([]);

    const [SectoresActuales, setSectoresActuales] = useState<Datum[]>([]);

    const getCiudades = async() =>{
      
        const resp = await ciudadesApi.get<any>('/getCountry');
        setCiudadesActuales(resp.data.citys); 

        setSectoresActuales(resp.data.sectors); 

    }

    useEffect(() => {
        getCiudades();
    }, [])
    
    return{
        CiudadesActuales,
        SectoresActuales
    }

}