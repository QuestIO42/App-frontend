import Button from '@/components/utility/Button'
export default function Forum() {
  return (
    <div className=" min-h-[271px] max-w-[360px] my-10 items-center justify-center bg-laranja shadow-default-laranja">
      <p className="mr-2 text-center items-center mt-6 text-3xl font-bold text-cinza">
          fórum
      </p>

      <hr className="border-t-2 border-gray-700 mx-8 mb-5"/>

      <p className="text-center flex flex-col px-7 text-xl font-bold text-cinza mb-5">
        Dúvidas? Acrescente um novo tópico de discussão ao fórum!
      </p>

      <div className="flex  justify-center">
        <Button variant='tertiary' text="entrar" size="small"></Button>
      </div>
    </div>
  )
}
