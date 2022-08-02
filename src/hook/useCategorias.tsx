import React, { useEffect, useRef, useState } from 'react';
import categoriaApi from '../api/apiCategoria';
import { Datum, SuccessTrueDataID95D9A4B9E8374D2F8A4D8459A1B14B86NameAlimentosCaserosURLImagenHTTPS04ContenedoresnolvisCOMPublicStorageCategoriasFc7061A4Cb114573Ac7660C949Bb43A4PNGCreatedAt03182022UpdatedAt03182022ID95D9A7CA83924Eea88Cb7740D6997FDCNameAlimentosDeFabricaURLImagenHTTPS04ContenedoresnolvisCOMPublicStorageCategorias82027Ed236De48C39617323Bbd585Dd1PNGCreatedAt03182022UpdatedAt03182022MessageCategoriasFetched } from '../interfaces/CategoriaInterface';

export const useCategorias = () =>{

    const [Categorias, setCategorias] = useState<Datum[]>([]);

    const getCategorias = async() =>{
      
        const resp = await categoriaApi.get<SuccessTrueDataID95D9A4B9E8374D2F8A4D8459A1B14B86NameAlimentosCaserosURLImagenHTTPS04ContenedoresnolvisCOMPublicStorageCategoriasFc7061A4Cb114573Ac7660C949Bb43A4PNGCreatedAt03182022UpdatedAt03182022ID95D9A7CA83924Eea88Cb7740D6997FDCNameAlimentosDeFabricaURLImagenHTTPS04ContenedoresnolvisCOMPublicStorageCategorias82027Ed236De48C39617323Bbd585Dd1PNGCreatedAt03182022UpdatedAt03182022MessageCategoriasFetched>('/categorias');
        setCategorias(resp.data.data); 

    }

    useEffect(() => {
        getCategorias();
    }, [])
    
    return{
        Categorias
    }

}