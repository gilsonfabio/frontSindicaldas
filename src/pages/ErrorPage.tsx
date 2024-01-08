import React, {useState} from 'react';
import Router, { useRouter } from "next/router";

import api from './api/api';

const ErrorPage = () => {
    async function retornarPage(){
        Router.push({pathname: '/'})              
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
                    <form>
                      <p className='mb-4'>
                        Erro na confirmação dos dados! Dados em duplicidade, Favor Conferir
                      </p>                                            
                      <div className='text-center pt-1 mb-12 pb-1'>
                        <button
                          className='bg-green inline-block px-6 py-2.5 text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3'
                          type='button'
                          onClick={retornarPage}
                        >
                          OK
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
export default ErrorPage;