import React, {useState, useEffect} from 'react';
import Router from 'next/router';
import { useRouter } from "next/router";

import api from './api/api';

interface modalidadesProps {
  modId: number;
  modDescricao: string;
}

interface userProps {
  usrId: number;
  usrNome: string;
  usrMatricula: number;
  usrMes: number;
  usrAno: number;
  usrVlrDisponivel: number;
  usrStatus: string;
  tipId: number;
  tipDescricao: string;
  tipParcelas: number;
}
1234
const CnfLancamento = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [vlrCompra, setVlrCompra] = useState('');
    const [qtdParcelas, setQtdParcelas] = useState('');
    const [user, setUser] = useState<Array<userProps>>([]);
    const [servidor, setServidor] = useState('');
    const [cmpCartao, setCmpCartao] = useState('');

    const [saldo, setSaldo] = useState('');
    const [statusUsr, setStatusUsr] = useState('');
    const [contrato, setContrato] = useState('');
    const [maxParc, setMaxParc] = useState('');

    const router = useRouter();
    const idCrt = router.query.nroCartao;
    const cnvId = router.query.convenio;
    const nomConvenio = router.query.nomFantasia;

    const arr_alfa = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","U","V","W","X","Y","Z","!","@","$","%","&","*"];
     
    async function handleCnfLanc(e: any){
      e.preventDefault();
      try {
          let cartao = router.query.nroCartao;
          console.log(cartao);
          console.log(password);
          const response = await api.get(`loginUsr/${cartao}/${password}`);
          //console.log(parseFloat(saldo));
          //console.log(parseFloat(vlrCompra));
          //console.log(statusUsr);
          console.log(response.data);

          let vlrParcela = parseFloat('0.00');
          vlrParcela = parseFloat(vlrCompra) / parseInt(qtdParcelas);
          console.log(vlrParcela);

          if (parseFloat(saldo) < vlrParcela ) {
              alert(`Falha na confirmação da compra! Codigo 55 - Vlr:${vlrParcela}`);
              Router.push({pathname: '/Dashboard'})
          }else {
              if (statusUsr != 'A') {
                  alert('Falha na confirmação da compra! Codigo 54');
                  Router.push({pathname: '/'})
              }else {
                  if (maxParc < qtdParcelas){
                      alert('Falha na confirmação da compra! Codigo 56');
                      Router.push({pathname: '/'})
                  }else {
                      let data = new Date();
                      var dia = data.getDate();
                      var mes = data.getMonth() + 1;
                      var ano = data.getFullYear();
                      var dataString = ano + '-' + mes + '-' + dia;
                      var dataAtual = dataString;
      
                      var hor = data.getHours();
                      var min = data.getMinutes();
                      var seg = data.getSeconds();
                      var horaString = hor + ':' + min + ':' + seg;
                      var horaAtual = horaString;
      
                      var priLetra = arr_alfa[dia];
                      var segLetra = arr_alfa[hor];
                      var codSeguranca = priLetra + segLetra + ano + cnvId + min + seg;
                  
                      var taxAdmin = 3;
                      var statusCmp = 'A';
      
                      api.post('newcompra', {
                          cmpEmissao: dataAtual, 
                          cmpHorEmissao: horaAtual, 
                          cmpConvenio: cnvId, 
                          cmpQtdParcela: parseInt(qtdParcelas), 
                          cmpVlrCompra: parseFloat(vlrCompra), 
                          cmpServidor: servidor, 
                          cmpCodSeguranca: codSeguranca, 
                          cmpStatus: statusCmp,
                          cmpCartao: cartao      
                      }).then(() => {
                          alert('Compra cadastrada com sucesso!')
                      }).catch(() => {
                          alert('Erro no cadastro!');
                      })  
                      Router.push({
                          pathname: '/Dashboard',
                          query: { id: `${cnvId}`, name: `${nomConvenio}`}
                      });
                  }    
              }
          }
      } catch (err) {
          alert('Falha na confirmação da compra!');
      }  
    }

    useEffect(() => {
      console.log(idCrt);
      
      let cartao = idCrt;        
      api.get(`findUser/${cartao}`).then(resp => {
          //console.log(resp.data)
          setUser(resp.data);
          setServidor(resp.data[0].usrId);
          setSaldo(resp.data[0].usrVlrDisponivel);
          setStatusUsr(resp.data[0].usrStatus);
          setContrato(resp.data[0].tipDescricao);
      })     
      
      api.get(`maxParcelas/${cnvId}`).then(res => {
        setMaxParc(res.data[0].cnvQtdParc);
      }) 
      
    },[]);

    return (
    <section className='flex items-center justify-center h-screen gradient-form bg-gray-200 md:h-screen'>
      <div className='container'>
      <div className=' flex justify-center items-center flex-wrap h-full g-6 text-gray-800'>
          <div className=''>
            <div className='block bg-white shadow-lg rounded-lg'>
              <div className='lg:flex lg:flex-wrap g-0'>
                <div className='px-4 md:px-0'>
                  <div className='md:p-12 md:mx-6'>
                    <div className='text-center'>
                      <h4 className='text-xl font-semibold mt-1 mb-12 pb-1'>
                        Dados do Servidor(a)
                      </h4>
                    </div>
                      {user.map((row) => (
                        <div key={row.usrId}>
                          <div className='dados mb-4'>
                            Nome:{row.usrNome} 
                          </div>
                          <div className='dados mb-4'>
                            Matricula:{row.usrMatricula} 
                          </div>
                          <div className='dados mb-4'>
                            Contrato:{row.tipDescricao} - {row.usrStatus} 
                          </div>
                          <div className='dados mb-4'>
                            Mes/Ano Saldo:{row.usrMes} / {row.usrAno} 
                          </div>
                          <div className='dados mb-4'>
                              <p className='text-green-500 text-[22px] font-bold ' >Saldo Disponivel: {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(row.usrVlrDisponivel)}</p>
                          </div>
                          <div className='dados mb-4'>
                            Máximo de Parcelas:{maxParc} 
                          </div>
                        </div>    
                      ))}                            
                        </div>
                      </div>  
                  </div>
                </div>
              </div>
            </div>
          </div>
      <div className='container py-12 px-6 h-full'>
        <div className=' flex justify-center items-center flex-wrap h-full g-6 text-gray-800'>
          <div className=''>
            <div className='block bg-white shadow-lg rounded-lg'>
              <div className='lg:flex lg:flex-wrap g-0'>
                <div className='px-4 md:px-0'>
                  <div className='md:p-12 md:mx-6'>
                    <div className='text-center'>
                      <h4 className='text-xl font-semibold mt-1 mb-12 pb-1'>
                        Formulário Confirmação de Venda
                      </h4>
                    </div>
                    <form>                       
                      <div className='mb-4'>
                          <input
                            type='number'
                            className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                            placeholder='Informe Valor da Compra'
                            name='vlrCompra'
                            value={vlrCompra} 
                            onChange={(e) => {setVlrCompra(e.target.value)}} 
                          />
                      </div>                      
                      <div className='mb-4'>
                        <select className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example" 
                          value={qtdParcelas}
                          onChange={(e) => {setQtdParcelas(e.target.value)}} 
                        >
                          <option selected>Selecione o qtde Parcelas</option>
                            <option value={1}>{'PARCELA ÚNICA'}</option>
                            <option value={2}>{'2 X PARCELAS'}</option>
                            <option value={3}>{'3 X PARCELAS'}</option>
                            <option value={4}>{'4 X PARCELAS'}</option>
                            <option value={5}>{'5 X PARCELAS'}</option>
                            <option value={6}>{'6 X PARCELAS'}</option>
                            <option value={7}>{'7 X PARCELAS'}</option>
                            <option value={8}>{'8 X PARCELAS'}</option>
                            <option value={9}>{'9 X PARCELAS'}</option>
                            <option value={10}>{'10 X PARCELAS'}</option>
                            <option value={11}>{'11 X PARCELAS'}</option>
                            <option value={12}>{'12 X PARCELAS'}</option>
                            <option value={13}>{'13 X PARCELAS'}</option>
                            <option value={14}>{'14 X PARCELAS'}</option>
                            <option value={15}>{'15 X PARCELAS'}</option>
                            <option value={16}>{'16 X PARCELAS'}</option>
                            <option value={17}>{'17 X PARCELAS'}</option>
                            <option value={18}>{'18 X PARCELAS'}</option>
                            <option value={19}>{'19 X PARCELAS'}</option>
                            <option value={20}>{'20 X PARCELAS'}</option>
                            <option value={21}>{'21 X PARCELAS'}</option>
                            <option value={22}>{'22 X PARCELAS'}</option>
                            <option value={23}>{'23 X PARCELAS'}</option>
                            <option value={24}>{'24 X PARCELAS'}</option>
                        </select> 
                      </div>         
                      <div className='mb-4'>
                          <input
                            type='password'
                            className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                            placeholder='Informe a Senha'
                            name='password'
                            value={password} 
                            onChange={(e) => {setPassword(e.target.value)}} 
                          />
                        </div>             
                      <div className='text-center pt-1 mb-12 pb-1'>
                        <button
                          className='bg-green inline-block px-6 py-2.5 text-black hover:text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3'
                          type='button'
                          onClick={handleCnfLanc}
                        >
                          Cadastrar
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
export default CnfLancamento;
