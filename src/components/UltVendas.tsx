import React, { useState, useEffect } from "react";
import api from "../pages/api/api";
import Link from "next/link";

interface vendasProps {
    cmpId: number;
    cmpEmissao: string;
    cmpHorEmissao: string; 
    cmpConvenio: number, 
    cmpQtdParcela: number; 
    cmpVlrCompra: number; 
    cmpServidor: number; 
    cmpCodSeguranca: string; 
    cmpStatus: string; 
    usrNome: string;
}

const UltVendas = () => {
    const [vendas, setVendas] = useState<Array<vendasProps>>([]);
    
    useEffect(() => {   
        api.get(`/cmpConvenio/:idCnv`).then(response => {
            setVendas(response.data);
            
        })    
    }, [])

    return (
        <div className="mb-3">
            <div className="flex flex-row justify-center items-center ">
                <span className="flex flex-row justify-center items-center text-3xl font-bold text-green-600 mt-6 mb-6" >
                    Vendas do dia
                </span>
                
            </div>
            <div className="p-2 grid grid-cols-1 gap-1 md:grid-cols-5 md:gap-2 ">  
                {vendas.map((row) => (
                    <Link key={row.cmpId} href={`/vdaDetalhes/${row.cmpId}`}>
                        <a className="bg-[#d7dddc]/20 rounded overflow-hidden shadow-lg mb-1 hover:bg-[#b5b9b9]/40" > 
                            <div className="flex flex-row items-start justify-between px-2 ">
                                <div className="flex flex-col items-start px-2 py-2">
                                    <span className='text-[12px] font-bold'>Cliente</span>
                                    <div className="text-[16px] text-green-500 font-bold mb-0">{row.usrNome}</div>
                                </div>                
                            </div>
                            <div className="flex flex-row items-start justify-between px-2 py-0 ">
                                <div className="flex flex-col items-start px-2 py-1">
                                    <span className='text-[12px] font-bold'>Dt. Venda</span>
                                    <div className="text-[12px] mb-0">{moment(row.cmpEmissao).format('DD-MM-YYYY')}</div>
                                </div>
                                <div className="flex flex-col items-start px-2 py-1">
                                    <span className='text-[12px] font-bold'>Hr. Venda</span>
                                    <div className="text-[12px] mb-0">{moment(row.cmpHorEmissao ).format('DD-MM-YYYY')}</div>
                                </div>
                            </div>                                
                            <div className="flex flex-row items-start justify-between px-2">
                                <div className="flex flex-col items-start px-2 ">
                                    <span className='text-[12px] font-bold'>Nº Parc.</span>
                                    <div className="text-[12px] mb-0">{row.cmpQtdParcela}</div>
                                </div>
                                <div className="flex flex-col items-start px-2 ">
                                    <span className='text-[12px] font-bold'>Vlr. Venda</span>
                                    <div className="text-[12px] mb-0">{row.cmpVlrCompra}</div>
                                </div>
                            </div>                                
                        </a>                     
                    </Link>                               
                ))}
            </div>
        </div>   
    );
}

export default UltVendas;