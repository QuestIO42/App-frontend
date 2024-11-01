import EmailIcon from '../svgComponents/icons/EmailIcon'

export default function Footer() {
  return (
    <footer className="bg-roxo-900 bottom-0 flex min-h-[204px] w-screen flex-col items-center justify-center gap-16 p-4 text-center text-white">
      <div className="flex w-full items-center justify-around">
        <div className="flex flex-1 flex-col items-center justify-start">
          <p className="text-2xl font-bold text-amarelo">Contato</p>
          <div className="flex items-center justify-center gap-2">
            <EmailIcon></EmailIcon>
            <p>questio@ufscar.br</p>
          </div>
        </div>

        <p className="flex-1 text-center text-2xl font-bold text-amarelo">
          Quem somos
        </p>
        <p className="flex-1 text-center text-2xl font-bold text-amarelo">
          Minha conta
        </p>
      </div>

      <div className="flex flex-col items-center justify-center">
        <p className="text-center text-xs font-semibold">
          - 2024 | <a href="https://questio42.github.io/">questio42.github.io</a> -
        </p>
        <p className="text-center text-[0.63rem]">by QuestI0 Lab</p>
      </div>
    </footer>
  )
}
