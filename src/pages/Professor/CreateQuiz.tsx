import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import { useState } from 'react'
import { useParams } from 'react-router-dom';

export default function CreateQuiz() {
  const { courseId } = useParams();

  const [form, setForm] = useState({
    idCourse: courseId,
    name: '',
    description: '',
    maxAttempts: 1,
  })

  return (
    <div className="bg-roxo-900 min-h-screen flex flex-col items-center justify-between overflow-x-hidden">
      <Header />

      <div className="w-full xl:w-[60%] flex flex-col flex-1 mt-6 mb-12 md:mt-16 md:mb-24 px-8 md:px-20">
        <h2 className="text-5xl text-[#F8F8F8] font-bold">
          Criar <span className="text-verde-300">Quiz</span>
        </h2>
        <p className="text-lg text-[#F8F8F8] mt-2 leading-[1.8]">
          Cadastre um novo quiz para este curso. Depois, adicione as perguntas!
        </p>

        <div className="flex flex-col gap-8 mt-8 p-8 border border-roxo-300 rounded">
          <div className="flex flex-col gap-2">
            <p className="text-[#F8F8F8]">Nome do Quiz</p>
            <input
              className="p-4 text-[#F8F8F8] border border-roxo-300 bg-[#5A4AC223] rounded focus:outline-none focus:ring-0"
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Quiz 1 - Introdução"
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-[#F8F8F8]">Descrição</p>
            <textarea
              className="p-4 min-h-[100px] text-[#F8F8F8] border border-roxo-300 bg-[#5A4AC223] rounded focus:outline-none focus:ring-0"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Descrição do quiz"
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-[#F8F8F8]">Máximo de tentativas</p>
            <input
              className="p-4 text-[#F8F8F8] border border-roxo-300 bg-[#5A4AC223] rounded focus:outline-none focus:ring-0"
              type="number"
              min={1}
              value={form.maxAttempts}
              onChange={(e) =>
                setForm({ ...form, maxAttempts: Number(e.target.value) })
              }
              placeholder="1"
            />
          </div>

          <button
            onClick={() => {
              // enviar os dados
            }}
            className="py-4 px-6 rounded text-roxo-900 font-semibold bg-[#8c7aff] hover:scale-[1.01] transition-all duration-300"
          >
            Criar Quiz
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}
