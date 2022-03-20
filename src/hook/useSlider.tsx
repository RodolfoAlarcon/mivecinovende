import React, { useEffect, useRef, useState } from 'react';
import sliderApi from '../api/apiSlider'
import { SuccessTrueDataID95Db8Ee6030842B49B622C630Ec85A14CiudadesIDNullSectoresID95Db8Ee6003340EbBb4C09B9D9261Ea0BusinessIDNullURLImagenHTTPS04ContenedoresnolvisCOMStorageSectores3B383A76485C450EAd543980F69B2043JpgCreatedAt03192022UpdatedAt03192022ID95Db8Ee603D447Fe9A3D4753E8Ebe9FcCiudadesIDNullSectoresID95Db8Ee6003340EbBb4C09B9D9261Ea0BusinessIDNullURLImagenHTTPS04ContenedoresnolvisCOMStorageSectoresF236Ba3F6E514470982BA5Ac5856012CJpgCreatedAt03192022UpdatedAt03192022ID95Db8Ee6078E477481062Be55D000896CiudadesIDNullSectoresID95Db8Ee6003340EbBb4C09B9D9261Ea0BusinessIDNullURLImagenHTTPS04ContenedoresnolvisCOMStorageSectoresF61D3477470646988C5465951Bf1864CJpgCreatedAt03192022UpdatedAt03192022MessageGaleriaDeImagenesDeSectorFetched, Datum } from '../interfaces/SliderInterface';

export const useSlider = () =>{

    const [SliderActuales, setSliderActuales] = useState<Datum[]>([]);

    const getSlider = async() =>{
      
        const resp = await sliderApi.get<SuccessTrueDataID95Db8Ee6030842B49B622C630Ec85A14CiudadesIDNullSectoresID95Db8Ee6003340EbBb4C09B9D9261Ea0BusinessIDNullURLImagenHTTPS04ContenedoresnolvisCOMStorageSectores3B383A76485C450EAd543980F69B2043JpgCreatedAt03192022UpdatedAt03192022ID95Db8Ee603D447Fe9A3D4753E8Ebe9FcCiudadesIDNullSectoresID95Db8Ee6003340EbBb4C09B9D9261Ea0BusinessIDNullURLImagenHTTPS04ContenedoresnolvisCOMStorageSectoresF236Ba3F6E514470982BA5Ac5856012CJpgCreatedAt03192022UpdatedAt03192022ID95Db8Ee6078E477481062Be55D000896CiudadesIDNullSectoresID95Db8Ee6003340EbBb4C09B9D9261Ea0BusinessIDNullURLImagenHTTPS04ContenedoresnolvisCOMStorageSectoresF61D3477470646988C5465951Bf1864CJpgCreatedAt03192022UpdatedAt03192022MessageGaleriaDeImagenesDeSectorFetched>('/galeria-de-imagenes-de-sector/95db8ee6-0033-40eb-bb4c-09b9d9261ea0');
        setSliderActuales(resp.data.data); 

    }

    useEffect(() => {
        getSlider();
    }, [])
    
    return{
        SliderActuales
    }

}