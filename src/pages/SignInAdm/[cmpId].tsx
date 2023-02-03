import React, {useState, useEffect} from 'react';
import Router from 'next/router';
import { useRouter } from "next/router";
import api from '../api/api';

const SignInAdm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const router = useRouter();
    const [idCmp, setIdVenda] = useState(router.query.cmpId);
    const {query: { cmpId }, } = router

    async function sendLogin(e:any){
        e.preventDefault();
        try {
          const response = await api.get(`signInCnc/${email}/${password}`); 
          let idUsuario = response.data.cnvId;
          let nomUsuario = response.data.cnvNomFantasia;
          try {
            api.put(`cncCompra/${idCmp}`, {
              cmpIdCanc: idUsuario,
            }).then(() => {
                alert('Compra Excluida com sucesso!')
            }).catch(() => {
                alert('Erro na Exclusão!');
            })  
            Router.back();
          }catch (err) {
            alert('Falha na Exclusão da Compra!');
          }          
        } catch (err) {
          alert(`Falha no login administrador! Tente novamente. ${email}`);
        } 
    }  
        
    return (
    <section className='flex items-center justify-center h-screen gradient-form bg-gray-200 md:h-screen'>
      <div className='container py-12 px-6 h-full'>
        <div className=' flex justify-center items-center flex-wrap h-full g-6 text-gray-800'>
          <div className=''>
            <div className='block bg-white shadow-lg rounded-lg'>
              <div className='lg:flex lg:flex-wrap g-0'>
                <div className='px-4 md:px-0'>
                  <div className='md:p-12 md:mx-6'>
                    <div className='text-center'>
                      <h4 className='text-xl font-semibold mt-1 mb-12 pb-1'>
                        Faça sua Autenticação no Administrador(a)
                      </h4>
                    </div>
                    <form>
                      <p className='mb-4'>
                        Para cancelar venda você precisa ser administrador do Convênio
                      </p>
                      <div className='mb-4'>
                        <input
                          type='email'
                          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          placeholder='Informe seu email'
                          name='userEmail'
                          value={email} 
                          onChange={(e) => {setEmail(e.target.value)}} 
                        />
                      </div>
                      <div className='mb-4'>
                        <input
                          type='password'
                          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          placeholder='Senha'
                          name='pin'
                          value={password} 
                          onChange={(e) => {setPassword(e.target.value)}} 
                        />
                      </div>
                      <div className='text-center pt-1 mb-12 pb-1'>
                        <button
                          className='bg-green inline-block px-6 py-2.5 text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3'
                          type='button'
                          onClick={sendLogin}
                        >
                          Entrar
                        </button>
                      </div>
                      <div className='flex items-center justify-between pb-6'>
                        <p className='mb-0 mr-2'>Esqueceu a senha?</p>
                        <button
                          type='button'
                          className='inline-block px-6 py-2 border-2 border-green-600 text-green-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out'
                          onClick={() => {}}
                        >
                          Alt.Senha
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
export default SignInAdm;