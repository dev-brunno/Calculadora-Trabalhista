import React from 'react';
import image from '../images/paginaprincipal.png'

function Home() {
  return (
    <div className='w-full'>
      <div className=' m-2 mt-8 lg:m-8 flex justify-center lg:justify-start'>
        <div className=' bg-branco dark:bg-dark1 shadow-lg border rounded-4xl border-solid border-cinzaMedio dark:border-dark4 inline-block p-6 pb-16 lg:p-10'>
          <div className='flex border border-azulEscuro rounded-3xl p-10'>
            <div className=' w-2/3 dark:text-white'>
              <h1 className=' text-azulEscuro font-bold text-3xl'>Bem-Vindo ao Sistema Web de Cálculos Trabalhistas!</h1>
              <div className=' p-5 space-y-2 text-justify'>
                <p>Estamos empolgados em apresentar nosso sistema web que tornará a realização de cálculos trabalhistas mais simples e eficiente, projetado especialmente para escritórios de advocacia. Com o Sistema Web de Cálculos Trabalhistas, você terá acesso a diversas funcionalidades poderosas:</p>
                <ul className=' text-sm'>
                  <li><span className=' font-bold'>Cálculos Trabalhistas:</span> Realize uma variedade de cálculos trabalhistas de forma fácil e precisa. Desde cálculos de férias, décimo terceiro, rescisões até adicional noturno e horas extras, nosso sistema está pronto para ajudar.</li>
                  <li><span className=' font-bold'>Gerenciamento de Clientes:</span> Mantenha um controle eficaz de seus clientes diretamente no sistema. Armazene informações relevantes, mantenha registros e simplifique sua comunicação com eles.</li>
                  <li><span className=' font-bold'>Relatórios em PDF:</span> Crie relatórios profissionais em formato PDF dos cálculos realizados e dos clientes cadastrados. Compartilhe facilmente informações essenciais com seus clientes e colegas de trabalho.</li>
                </ul>
                <p>Nosso objetivo é fornecer uma ferramenta robusta que facilitará seu trabalho diário no campo do direito trabalhista. Simplifique o processo de cálculos, gerenciamento de clientes e geração de relatórios. Junte-se a nós e descubra como o Sistema Web de Cálculos Trabalhistas pode melhorar sua eficiência e produtividade. Bem-vindo a uma nova era de praticidade e desempenho no mundo jurídico.</p>
              </div>
            </div>
            <div className=' w-1/3 flex flex-col justify-center'>
              <img src={image} alt="" className=' ' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
