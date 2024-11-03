import Button from '@/components/utility/Button'
export default function Forum() {
  return (
  <div className=" min-h-[271px] max-w-[312px] min-w-[300px] mt-10 items-center justify-center bg-laranja shadow-default-laranja">
        <p className="mr-2 text-center items-center mt-6 text-3xl font-bold text-gray-800">
          fórum
        </p>
        <br />
        <hr className="border-t-2 border-gray-700 mx-8 mb-4" />
        <p className="text-center flex flex-col px-7 text-2xl font-bold text-gray-800">
          Dúvidas? Acrescente um novo tópico de discussão ao fórum!
        </p>
        <div className="flex  justify-center">
        <Button variant='tertiary' text="entrar" size="small"></Button>
        </div>
      </div>
  )
}
