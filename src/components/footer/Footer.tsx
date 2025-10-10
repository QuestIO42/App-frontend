import LinkedinIcon from '../svgComponents/icons/linkedin'
import EmailIcon from '../svgComponents/icons/EmailIcon'

export default function Footer() {
  return (
    <footer className="bg-roxo-900 bottom-0 flex min-h-[150px] w-screen flex-col items-start sm:items-center justify-center px-6 py-8">
      <div className="flex flex-col sm:flex-row py-4 gap-6 sm:gap-20">
        <div className="">
          <a href="https://www.vlab.dc.ufscar.br" className="font-bold text-2xl text-verde-300 transition-color duration-300 hover:text-[#2eb875]">QuestIO</a>
        </div>

        <div className="flex flex-row flex-wrap gap-4">
          <a
            href={`/home`}
            className="flex items-center text-roxo-500 text-sm font-semibold py-2 px-4 border border-roxo-500 rounded-full transition delay-10 duration-200 ease-in-out hover:border-[#9386d9] hover:text-[#9386d9]">
            Início
          </a>

          <a
            href={`https://www.vlab.dc.ufscar.br/tutoriais`}
            className="flex items-center text-roxo-500 text-sm font-semibold py-2 px-4 border border-roxo-500 rounded-full transition delay-10 duration-200 ease-in-out hover:border-[#9386d9] hover:text-[#9386d9]">
            Tutoriais
          </a>

          <a
            href={`https://legacy.vlab.dc.ufscar.br/camera.php`}
            className="flex items-center text-roxo-500 text-sm font-semibold py-2 px-4 border border-roxo-500 rounded-full transition delay-10 duration-200 ease-in-out hover:border-[#9386d9] hover:text-[#9386d9]">
            Vlab
          </a>

          <a
            href={`https://legacy.vlab.dc.ufscar.br/agenda`}
            className="flex items-center text-roxo-500 text-sm font-semibold py-2 px-4 border border-roxo-500 rounded-full transition delay-10 duration-200 ease-in-out hover:border-[#9386d9] hover:text-[#9386d9]">
            Agenda
          </a>

          <a
            href={`https://www.vlab.dc.ufscar.br/equipe.html`}
            className="flex items-center text-roxo-500 text-sm font-semibold py-2 px-4 border border-roxo-500 rounded-full transition delay-10 duration-200 ease-in-out hover:border-[#9386d9] hover:text-[#9386d9]">
            Equipe
          </a>
        </div>

        <div className="flex flex-row gap-4">
          <a href="https://www.linkedin.com/company/questio42" className="flex w-10 h-10 items-center justify-center rounded-full bg-roxo-500 transition delay-10 duration-200 ease-in-out hover:bg-[#796db5]">
            <LinkedinIcon className="text-roxo-900"/>
          </a>

          <a href="mailto:questio@ufscar.br" className="flex w-10 h-10 items-center justify-center rounded-full bg-roxo-500 transition delay-10 duration-200 ease-in-out hover:bg-[#796db5]">
            <EmailIcon className="text-roxo-900"/>
          </a>
        </div>
      </div>

      <div className="w-[95%] flex items-center justify-center pt-6 mt-6 text-roxo-500 border-t-[1px] border-[#51469c]">
        <p>&#169; 2024 QuestIO Lab. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}
