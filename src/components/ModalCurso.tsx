import SeletorCor from "./SeletorCor"
import Button from "./utility/Button"
import ModalSquareForm from "./utility/ModalSquareForm";
import FormInputGeral from "./FormInputGeral";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createCourse } from '@/services/api/auth'

const CreateCourseSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Este campo é obrigatório' }),
  prof: z
    .string()
    .min(1, { message: 'Este campo é obrigatório' }),
  description: z
    .string()
    .min(1, { message: 'Este campo é obrigatório' }),
  selectedColor: z
    .string()
    .min(1, { message: 'Este campo é obrigatório' }),
})

type CreateCourseSchemaType = z.infer<typeof CreateCourseSchema>

interface ModalProps {
  onClose: () => void
}

export default function ModalCurso({onClose} : ModalProps) {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateCourseSchemaType>({ resolver: zodResolver(CreateCourseSchema)})

  const handleCreateCourse = async (data: CreateCourseSchemaType) => {

    try {
      const response= await createCourse(data) //???????
      console.log(response)
      onClose()
    } catch(error:any) {
      console.log(error)
    }

  }

  return(
    <div className=" flex flex-col center p-6" >
      <dialog className="relative flex flex-col border-2 border-verde-300 self-center shadow-default-verde-300 p-6 min-w-[850px] min-h-[450px]"  >

      <form onSubmit={handleSubmit(handleCreateCourse)}>

        <div className="flex justify-start p-4 mt-2 gap-20">
          <div>
            <FormInputGeral type="text" label="Nome do curso" {...register("name")} />
            {errors.name && <span className="mr-auto text-[0.5rem] text-red-500 md:text-xs">{errors.name.message}</span>}

            <FormInputGeral type="text" label="Professores" {...register("prof")}/>
            {errors.prof && <span className="mr-auto text-[0.5rem] text-red-500 md:text-xs">{errors.prof.message}</span>}

            <FormInputGeral type="text" label="Descrição do curso" {...register("description")}/>
            {errors.description && <span className="mr-auto text-[0.5rem] text-red-500 md:text-xs">{errors.description.message}</span>}

            <div>
              <p className="font-mono font-semibold text-preto-texto mt-2">cor do seu curso </p>
              <div className="flex gap-4 ">
                {["verde", "laranja", "roxo"].map((cor) => (
                  <SeletorCor key={cor} value={cor} {...register("selectedColor")} />
                ))}
              </div>
              {errors.selectedColor && <span className="mr-auto text-[0.5rem] text-red-500 md:text-xs">{errors.selectedColor.message}</span>}

              </div>
          </div>
          <div className="ml-4">

          <button onClick={onClose} className="absolute top-0 right-0 mr-2 text-red-600 font-bold text-2xl">x</button>

          <p className="font-mono font-semibold text-preto-texto mb-4 ">imagem do curso</p>

          <ModalSquareForm>
            <div className="bg-cinzaClaro h-[220px] w-[220px]"></div>
          </ModalSquareForm>

          </div>
        </div>

        <Button
          disabled={isSubmitting}
          type="submit"
          className="text-roxo-300 mx-auto center mt-4 "
          variant="primary"
          text="criar novo curso"
          size="small"
        />

        </form>
      </dialog>
    </div>
  )
}

