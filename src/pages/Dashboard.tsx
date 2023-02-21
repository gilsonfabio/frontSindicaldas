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
    const [auxInicial, setAuxInicial] = useState('');
    const [auxFinal, setAuxFinal] = useState('');

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
      let dataIni = auxInicial.substring(6,10) + '-' + auxInicial.substring(3,5) + '-' + auxInicial.substring(0,2);
      let dataFin = auxFinal.substring(6,10) + '-' + auxFinal.substring(3,5) + '-' + auxFinal.substring(0,2);

      Router.push({
        pathname: '/RelEmiCnv',
        query: { id: `${idCnv}`, datIni: `${dataIni}`, datFin: `${dataFin}`}
      })
    }

    function handleVencto() {
      let dataIni = auxInicial.substring(6,10) + '-' + auxInicial.substring(3,5) + '-' + auxInicial.substring(0,2);
      let dataFin = auxFinal.substring(6,10) + '-' + auxFinal.substring(3,5) + '-' + auxFinal.substring(0,2);

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
                                    <div className="text-[12px] mb-0">{Intl.DateTimeFormat('pt-BR', {timeZone: 'UTC'}).format(Date.parse(row.cmpEmissao))}</div>
                                </div>
                                <div className="flex flex-col items-start px-2 py-1">
                                    <span className='text-[12px] font-bold'>Hr. Venda</span>
                                    <div className="text-[12px] mb-0">{row.cmpHorEmissao}</div>
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
            <div className="flex items-center justify-center h-36 rounded overflow-hidden shadow-2xl mb-5 " > 
              <p className="text-gray-700 text-2xl font-bold">
                Nova Venda
              </p>
            </div>
          </a>
        </button> 
        <div className="bg-white flex flex-col h-auto rounded overflow-hidden shadow-2xl mb-5 " >        
          <div className="flex flex-col items-center justify-center mb-5 " > 
            <p className="text-gray-700 text-2xl font-bold">
              Vendas p/ Emissão
            </p>
          </div>  
          <div className='flex flex-row items-center justify-between ml-3 mr-3' >
            <input
              type='text'
              className='px-3 py-1.5 text-base font-normal text-gray-800 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              placeholder='data Inicial'
              name='auxInicial'
              value={auxInicial} 
              onChange={(e) => {setAuxInicial(e.target.value)}} 
            />
            <input
              type='text'
              className='px-3 py-1.5 text-base font-normal text-gray-800 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              placeholder='data Final'
              name='auxFinal'
              value={auxFinal} 
              onChange={(e) => {setAuxFinal(e.target.value)}} 
            />
          </div>
          <button onClick={handleEmissao} 
            className='ml-3 mt-5 mb-3 mr-3 inline-block px-6 py-2 border-2 border-green-600 text-green-600 hover:border-white hover:text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-green-600 '>        
            Gerar Relatório
          </button>
        </div>
        <div className="bg-white flex flex-col h-auto rounded overflow-hidden shadow-2xl mb-5 " >        
          <div className="flex flex-col items-center justify-center mb-5 " > 
            <p className="text-gray-700 text-2xl font-bold">
              Vendas p/ Vencimento
            </p>
          </div>  
          <div className='flex flex-row items-center justify-between ml-3 mr-3' >
            <input
              type='text'
              className='px-3 py-1.5 text-base font-normal text-gray-800 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              placeholder='data Inicial'
              name='auxInicial'
              value={auxInicial} 
              onChange={(e) => {setAuxInicial(e.target.value)}} 
            />
            <input
              type='text'
              className='px-3 py-1.5 text-base font-normal text-gray-800 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              placeholder='data Final'
              name='auxFinal'
              value={auxFinal} 
              onChange={(e) => {setAuxFinal(e.target.value)}} 
            />
          </div>
          <button onClick={handleVencto}
            className='ml-3 mt-5 mb-3 mr-3 inline-block px-6 py-2 border-2 border-green-600 text-green-600 hover:border-white hover:text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-green-600 '>        
            Gerar Relatório
          </button>
        </div>                                             
      </div>
    </div>
    );
};
export default Dashboard;