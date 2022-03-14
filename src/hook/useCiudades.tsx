import React, { useEffect, useRef, useState } from 'react';
import ciudadesApi from '../api/apiCiudad';
import { Ciudades, Datum } from '../interfaces/ciudadesInterface';

export const useCiudades = () =>{

    const [CiudadesActuales, setCiudadesActuales] = useState<Datum[]>([]);

    const getCiudades = async() =>{
      
        const resp = await ciudadesApi.get<Ciudades>('/ciudades');
        setCiudadesActuales(resp.data.data); 

    }

    useEffect(() => {
        getCiudades();
    }, [])
    
    return{
        CiudadesActuales
    }

}