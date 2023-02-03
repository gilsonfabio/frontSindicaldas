import React, { useState, useEffect } from "react";
import api from "../api/api";
import Link from "next/link";
import { useRouter } from "next/router";
import Menubar from "../../components/Menubar";

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

interface parcelasProps {
  parId: number;
  parIdCompra: number;
  parNroParcela: number;
  parVctParcela: string;
  parVlrParcela: number;
  parStaParcela: string; 
}

const CmpDetalhes = () => {
    const [vendas, setVendas] = useState<Array<vendasProps>>([]);
    const [parcelas, setParcelas] = useState<Array<parcelasProps>>([]);
    const router = useRouter();
    const [idCmp, setIdVenda] = useState(router.query.cmpId);
    const [email, setEmail] = useState('gilsonfabio@gmail.com');
    const [dados, setDados] = useState([]);

    const {query: { cmpId }, } = router;

    useEffect(() => {    
    
        setIdVenda(cmpId);
  
        api.get(`/dadCompra/${idCmp}`).then(response => {
            setVendas(response.data);
        })   

        api.get(`/parCompra/${idCmp}`).then(resp => {
          setParcelas(resp.data);
      })   
             
    }, [])


    return (
      <div className="w-screen h-screen bg-white">
        <Menubar />
        <div className="ml-2 mr-2 md:ml-36 md:mr-36">
          <div className="flex flex-row justify-between items-center border-b-2 border-gray-300">
            <span className="text-md md:text-2xl font-bold text-green-600 mt-6 h-10" >
              Dados da Compra: {idCmp}
            </span>
          </div>  
            <div className='flex flex-col w-full h-full text-black mt-5'>
              <div className="grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-4 mb-5 ml-1 px-0 py-0 ">            
                {vendas.map((item:any, idx) => {
                  return <Link key={idx} href={''}>
                    <a className="bg-[#d7dddc]/20 rounded overflow-hidden shadow-lg mb-1 hover:bg-[#b5b9b9]/40" > 
                      <div className="flex flex-row items-start justify-between px-2 ">
                        <div className="flex flex-col items-start px-2 py-2">
                          <span className='text-[12px] font-bold'>Nome Convênio</span>
                          <div className="text-[16px] text-green-500 font-bold mb-0">{item.cnvNomFantasia}</div>
                        </div>                
                      </div>
                      <div className="flex flex-row items-start justify-between px-2 py-0 ">
                        <div className="flex flex-col items-start px-2 py-1">
                          <span className='text-[12px] font-bold'>Dt. Compra</span>
                          <div className="text-[12px] mb-0">{item.cmpEmissao}</div>
                        </div>
                        <div className="flex flex-col items-start px-2 py-1">
                          <span className='text-[12px] font-bold'>Hr. Compra</span>
                          <div className="text-[12px] mb-0">{item.cmpHorEmissao}</div>
                        </div>
                      </div>                                
                      <div className="flex flex-row items-start justify-between px-2">
                        <div className="flex flex-col items-start px-2 ">
                          <span className='text-[12px] font-bold'>Nº Parcelas</span>
                          <div className="text-[12px] mb-0">{item.cmpQtParcela}</div>
                        </div>
                        <div className="flex flex-col items-start px-2 ">
                          <span className='text-[12px] font-bold'>Vlr Compra</span>
                          <div className="text-[12px] mb-0">{item.cmpVlrCompra}</div>
                        </div>
                      </div>                      
                    </a>                            
                  </Link>                  
                })}
              </div>
            </div>       
            <div className="flex flex-row justify-between items-center border-b-2 border-gray-300">
              <span className="text-md md:text-2xl font-bold text-green-600 mt-6 h-10" >
                Parcelas: 
              </span>            
            </div> 
            <div className='flex flex-col w-full h-full text-black mt-5'>
              <div className="grid grid-cols-1 gap-1 md:grid-cols-5 md:gap-4 mb-5 ml-1 px-0 py-0 ">            
                {parcelas.map((item:any, idx) => {
                  return <Link key={idx} href={''}>
                    <a className="bg-[#d7dddc]/20 rounded overflow-hidden shadow-lg mb-1 hover:bg-[#b5b9b9]/40" > 
                      <div className="flex flex-row items-start justify-between px-2 ">
                        <div className="flex flex-col items-start px-2 py-2">
                          <div className="text-[16px] text-green-500 font-bold mb-0">{item.parNroParcela}</div>
                        </div>                
                      </div>
                      <div className="flex flex-row items-start justify-between px-2 py-0 ">
                        <div className="flex flex-col items-start px-2 py-1">
                          <span className='text-[12px] font-bold'>Dt. Vencto</span>
                          <div className="text-[12px] mb-0">{item.parVctParcela }</div>
                        </div>
                        <div className="flex flex-col items-start px-2 py-1">
                          <span className='text-[12px] font-bold'>Vlr. Parcela</span>
                          <div className="text-[12px] mb-0">{item.parVlrParcela}</div>
                        </div>
                      </div>                                          
                    </a>                            
                  </Link>                  
                })}
              </div>
            </div>   
          </div> 
      </div>  
    );
}

export default CmpDetalhes;