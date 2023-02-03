import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import Router, { useRouter } from "next/router";

import Header from '../components/Header';
import Menubar from '../components/Menubar';
import moment from "moment";

import api from "../pages/api/api";

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

const Dashboard = () => {
    const [vendas, setVendas] = useState<Array<vendasProps>>([]);
    
    const router = useRouter();
    const [idCnv, setIdVenda] = useState(router.query.id);
    const [name, setName] = useState(router.query.name);
    const {query: { id }, } = router

    useEffect(() => {   
      setIdVenda(id);
      api.get(`/cmpConvenio/${idCnv}`).then(response => {
        setVendas(response.data);
        
      })    
    }, [])

    function handleNewSale() {
      Router.push({
        pathname: '/newSale',
        query: { id: `${idCnv}`, nome: `${name}`}
      })
    }

    function handleEmissao() {
      let dataIni = '2023-02-02';
      let dataFin = '2023-02-02';

      Router.push({
        pathname: '/RelEmiCnv',
        query: { id: `${idCnv}`, datIni: `${dataIni}`, datFin: `${dataFin}`}
      })
    }

    function handleVencto() {
      let dataIni = '2023-03-15';
      let dataFin = '2023-03-15';

      Router.push({
        pathname: '/RelVctCnv',
        query: { id: `${idCnv}`, datIni: `${dataIni}`, datFin: `${dataFin}`}
      })
    }

    return (
    <div className='bg-white w-screen h-auto md:h-full'>
      <div className='flex flex-col w-screen '>
        <Menubar />
        <Header />        
      </div>
      <div className=''> 
      <div className="mb-3">
            <div className="flex flex-row justify-center items-center ">
                <span className="flex flex-row justify-center items-center text-3xl font-bold text-green-600 mt-6 mb-6" >
                    Vendas do dia {idCnv}
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
      </div>
      <div className="p-2 grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-2 mt-6">  
        <button onClick={handleNewSale} >
          <a>            
            <div className="flex items-center justify-center h-24 rounded overflow-hidden shadow-2xl mb-5 " > 
              <p className="text-gray-700 text-2xl font-bold">
                Nova Venda
              </p>
            </div>
          </a>
        </button> 
        <button onClick={handleEmissao} >
          <div className="flex items-center justify-center h-24 rounded overflow-hidden shadow-2xl mb-5 " > 
            <p className="text-gray-700 text-2xl font-bold">
              Vendas p/ Emissão
            </p>
          </div>          
        </button>
        <button onClick={handleVencto} >
          <a>            
            <div className="flex items-center justify-center h-24 rounded overflow-hidden shadow-2xl mb-5 " > 
              <p className="text-gray-700 text-2xl font-bold">
                Vendas p/ Vencto
              </p>
            </div>
          </a>
        </button> 
                                     
      </div>
    </div>
    );
};
export default Dashboard;