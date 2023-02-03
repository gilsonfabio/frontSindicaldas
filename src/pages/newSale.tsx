import React, {useState} from 'react';
import Router, { useRouter } from "next/router";

import api from './api/api';

const NewSale = () => {
    const [cartao, setCartao] = useState('');
       
    const router = useRouter();
    const [idCnv, setIdVenda] = useState(router.query.id);
    const [nomConvenio, setNomConvenio] = useState(router.query.name);
        
    const {query: { id }, } = router
    
    async function newLancamento(e:any){
        e.preventDefault();
        let conId = idCnv as any;

        if (conId === 4) {
          try {
              const response = await api.get(`verifUser/${cartao}`);
              if(response.data.length === 0) {
                const resp = await api.get(`gerSaldo/${cartao}`);
              }
              Router.push({
                pathname: '/cnfLancamento',
                query: { convenio: `${idCnv}`, nomFantasia: `${nomConvenio}`, nroCartao: `${cartao}`}
              })
          } catch (err) {
              alert('Falha na busca de informações! Tente novamente.');
          }
        }else {
          try {
            const response = await api.get(`verifUser/${cartao}`);
            if(response.data.length === 0) {
              const resp = await api.get(`gerSaldo/${cartao}`);
            }
            Router.push({
              pathname: '/cnfLancamento',
              query: { convenio: `${idCnv}`, nomFantasia: `${nomConvenio}`, nroCartao: `${cartao}`}
            })
          } catch (err) {
            alert('Falha na busca de informações! Tente novamente.');
          }
        }  
    }   
    
    return (
    <section className='flex items-center justify-center h-full gradient-form bg-gray-200 md:h-screen'>
      <div className='container py-12 px-6 h-full'>
        <div className=' flex justify-center items-center flex-wrap h-full g-6 text-gray-800'>
          <div className=''>
            <div className='block bg-white shadow-lg rounded-lg'>
              <div className='lg:flex lg:flex-wrap g-0'>
                <div className='px-4 md:px-0'>
                  <div className='md:p-12 md:mx-6'>
                    <div className='text-center'>
                      <h4 className='text-xl font-semibold mt-1 mb-12 pb-1'>
                        Formulário de Lançamento de Venda
                      </h4>
                    </div>
                    <form>
                      <p className='mb-4'>
                        Por favor, informe o numero do Cartão de Servidor
                      </p>
                      <div className='mb-4'>
                        <input
                          type='email'
                          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          placeholder='Informe número do cartão'
                          name='nroCartao'
                          value={cartao} 
                          onChange={(e) => {setCartao(e.target.value)}} 
                        />
                      </div>                      
                      <div className='text-center pt-1 mb-12 pb-1'>
                        <button
                          className='bg-green inline-block px-6 py-2.5 text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3'
                          type='button'
                          onClick={newLancamento}
                        >
                          Lançar Venda
                        </button>
                      </div>                     
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    );
};
export default NewSale;