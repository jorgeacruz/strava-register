  import { useState } from 'react';
  import InputMask from 'react-input-mask';
  //toastify
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  // styles
  import './App.css';

  // add EmailJs Service
  import emailjs from '@emailjs/browser'

  function App() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isValid, setIsValid] = useState(true);
    const [telefone, setTelefone] = useState('')
    const [senha, setSenha] = useState('')
    
    // Chama a função de validação sempre que o valor do email mudar
    const handleEmailChange = (event) => {
      const inputValue = event.target.value;
      setEmail(inputValue);
      validateEmail(inputValue);
    };
    
    const validateEmail = (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = regex.test(email);
      setIsValid(isValidEmail);
    };

    function sendEmail(e){
      e.preventDefault();
      if(name === '') {
        toast.error('Preencha campo Nome e Sobrenome')
        return;
      } if (email === '' || null) {
        toast.error('Campo E-mail Error')
        return;
      } if (senha === '') {
        toast.error('Preencha campo Senha')
        return;
      }
    /*
      if(name === '' || telefone === '' || senha === ''){
        toast('Preencha todos os campos');
        return;
      } if(email === isValid) {
        return;
      }
    */

      // template Params
      const templateParams = {
        from_name:name,
        from_email:email,
        from_telefone:telefone,
        from_senha:senha
      }
      /* require paramaters
        - service Id
        - template Id
        - public key
        - template Prams (optcional)
      */  
      emailjs.send("service_3x9as5x","template_zonvuqw",templateParams,"IEKIt16szD8mT7mnw")
      .then(() => {
        toast('Email enviado com sucesso');
        setName('');
        setEmail('');
        setTelefone('');
        setSenha('');
      }, (err) => {
        console.log('ERRO: ', err);
        toast.error('Erro ao enviar');
      })
    }

    
    return (
  // <div className='bg-cover bg-[url("https://d3nn82uaxijpm6.cloudfront.net/assets/website/backgrounds/login-page/background-04-dbc040386803111656feab0a093bd4e885d2ee4ea76eefd9ddf2f0963e043c7f.jpg")]'>
  <div class="bg-gradient-to-tr from-orange-700 to-yellow-600 relative w-full h-screen flex items-center justify-center">
  <img class="mix-blend-overlay absolute inset-0 w-full h-full object-cover" src="https://d3nn82uaxijpm6.cloudfront.net/assets/website/backgrounds/login-page/background-04-dbc040386803111656feab0a093bd4e885d2ee4ea76eefd9ddf2f0963e043c7f.jpg" alt="" />
  <div class="bg-white w-[400px] h-[600px] flex items-center justify-center rounded-2xl z-30">
  <div className='w-full h-[600px] max-w-sm rounded-2xl bg-white shadow-xl'>
          <form onSubmit={sendEmail} className='h-[550px] flex flex-col justify-center items-center gap-3 p-10'>
            <img src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/323_Strava_logo-512.png" alt="Strava Inscrição" className='w-24'/>
              <div className='text-black'>
                <h1 className='text-center'> Faça seu Cadastro</h1>
                <p className='text-center'>e concorra a prêmios</p>
              </div>
              <input 
                className='w-full text-center rounded-lg border border-black p-2 z-30'
                type="text"
                placeholder="Digite seu nome e sobrenome"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <InputMask 
                className='w-full text-center  rounded-lg border border-black p-2 z-30'
                type="text"
                placeholder="Deixe seu contato telefônico"
                onChange={(e) => setTelefone(e.target.value)}
                value={telefone}
                mask="(99) 99999-9999"
              />
              <input
              className='w-full text-center rounded-lg border border-black p-2 z-30'
              type="text"
              placeholder="Digite seu email"
              value={email}
              onChange={handleEmailChange}
              />
              <input 
                className='w-full text-center rounded-lg border border-black p-2 z-30'
                type="password"
                placeholder="Cadastre sua senha"
                autoComplete="current-password"
                onChange={(e) => setSenha(e.target.value)}
                value={senha}
              />
              <button className='w-full bg-[#fc4c02] p-2 rounded-lg text-white font-bold hover:bg-black duration-300' >
                Registrar minha Conta Strava
              </button>
          {!isValid && <p style={{ color: 'red' }}>Por favor, insira um email válido.</p>}
          </form>
        </div>
  </div>  
  {/** Toastify */}
  <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
</div> 
    );
  }

  export default App;
