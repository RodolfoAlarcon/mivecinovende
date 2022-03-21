import React, { useEffect, useRef, useState } from 'react';
import sliderApi from '../api/apiSlider'
import { SuccessTrueDataID95Df9F723374408BA18525269E8F3443CiudadesIDNullSectoresID95Df9F722Ab44D3CA5Ef7105Dec742E0BusinessIDNullURLImagenHTTPS04ContenedoresnolvisCOMStorageSectores57E1B0Ce3Ef84512Bc6436E1D5002F5AJpgCreatedAt03212022UpdatedAt03212022ID95Df9F7235514E55Aa211F3Fcca97BaeCiudadesIDNullSectoresID95Df9F722Ab44D3CA5Ef7105Dec742E0BusinessIDNullURLImagenHTTPS04ContenedoresnolvisCOMStorageSectores2229A44A78284661B96DBa6D873387EaJpgCreatedAt03212022UpdatedAt03212022ID95Df9F72368E4Ad4A60E9A79484576AdCiudadesIDNullSectoresID95Df9F722Ab44D3CA5Ef7105Dec742E0BusinessIDNullURLImagenHTTPS04ContenedoresnolvisCOMStorageSectores8094851E318F4Db583D082E22D389522JpgCreatedAt03212022UpdatedAt03212022MessageGaleriaDeImagenesDeSectorFetched, Datum } from '../interfaces/SliderInterface';

export const useSlider = () =>{

    const [SliderActuales, setSliderActuales] = useState<Datum[]>([]);

    const getSlider = async() =>{
      
        const resp = await sliderApi.get<SuccessTrueDataID95Df9F723374408BA18525269E8F3443CiudadesIDNullSectoresID95Df9F722Ab44D3CA5Ef7105Dec742E0BusinessIDNullURLImagenHTTPS04ContenedoresnolvisCOMStorageSectores57E1B0Ce3Ef84512Bc6436E1D5002F5AJpgCreatedAt03212022UpdatedAt03212022ID95Df9F7235514E55Aa211F3Fcca97BaeCiudadesIDNullSectoresID95Df9F722Ab44D3CA5Ef7105Dec742E0BusinessIDNullURLImagenHTTPS04ContenedoresnolvisCOMStorageSectores2229A44A78284661B96DBa6D873387EaJpgCreatedAt03212022UpdatedAt03212022ID95Df9F72368E4Ad4A60E9A79484576AdCiudadesIDNullSectoresID95Df9F722Ab44D3CA5Ef7105Dec742E0BusinessIDNullURLImagenHTTPS04ContenedoresnolvisCOMStorageSectores8094851E318F4Db583D082E22D389522JpgCreatedAt03212022UpdatedAt03212022MessageGaleriaDeImagenesDeSectorFetched>('/galeria-de-imagenes-de-sector/95df9f72-2ab4-4d3c-a5ef-7105dec742e0');
        setSliderActuales(resp.data.data); 

    }

    useEffect(() => {
        getSlider();
    }, [])
    
    return{
        SliderActuales
    }

}