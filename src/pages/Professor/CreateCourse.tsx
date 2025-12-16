import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import { CreateCourseForm } from '@/interfaces/Course'
import { useState } from 'react'

export default function CreateCourse() {
  const handleDateChange = (field: 'beginDate' | 'endDate') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Regex simples: yyyy-mm-dd
    if (/^\d{0,4}-?\d{0,2}-?\d{0,2}$/.test(value)) {
      setForm({ ...form, [field]: value });
    }
  };

  const [form, setForm] = useState<CreateCourseForm>({
    name: '',
    description: '',
    beginDate: '',
    endDate: '',
    isOpen: true,
    coverImage: null,
  });

  return (
    <div className="bg-roxo-900 min-h-screen flex flex-col items-center justify-between overflow-x-hidden">
      <Header/>

      <div className="w-full xl:w-[60%] flex flex-col flex-1 mt-6 mb-12 md:mt-16 md:mb-24 px-8 md:px-20">
        <h2 className="text-5xl text-[#F8F8F8] font-bold">Criar <span className="text-verde-300">Curso</span></h2>
        <p className="text-lg text-[#F8F8F8] mt-2 leading-[1.8]">Abra um novo curso para o público. Lembre-se de adicionar os questionários depois!</p>

        <div className="flex flex-col gap-8 mt-8 p-8 border border-roxo-300 rounded">
          <div className="flex flex-col gap-2">
            <p className="text-[#F8F8F8]">Nome do curso</p>
            <input
              className="p-4 text-[#F8F8F8] border border-roxo-300 bg-[#5A4AC223] rounded focus:outline-none focus:ring-0"
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Verilog"
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-[#F8F8F8]">Data de início</p>
            <input
              className="p-4 text-[#F8F8F8] border border-roxo-300 bg-[#5A4AC223] rounded focus:outline-none focus:ring-0 appearance-none"
              type="date"
              value={form.beginDate}
              onChange={handleDateChange('beginDate')}
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-[#F8F8F8]">Data de fim</p>
            <input
              className="p-4 text-[#F8F8F8] border border-roxo-300 bg-[#5A4AC223] rounded focus:outline-none focus:ring-0 appearance-none"
              type="date"
              value={form.endDate}
              onChange={handleDateChange('endDate')}
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-[#F8F8F8]">Descrição</p>
            <textarea
              className="p-4 min-h-[100px] text-[#F8F8F8] border border-roxo-300 bg-[#5A4AC223] rounded focus:outline-none focus:ring-0 appearance-none"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Descrição do curso"
            />
          </div>

          <label className="flex items-center gap-4 text-[#F8F8F8]">
            <input
              className="w-6 h-6 rounded border border-roxo-300 bg-[#5A4AC223] checked:bg-roxo-300 checked:border-[#8c7aff] focus:outline-none appearance-none transition-all"
              type="checkbox"
              checked={form.isOpen}
              onChange={(e) => setForm({ ...form, isOpen: e.target.checked })}
            />
            Aberto ao público
          </label>

          <div className="flex flex-col gap-3">
            <p className="text-[#F8F8F8]">Imagem de capa</p>
            <label className="flex items-center gap-4 cursor-pointer p-4 border border-roxo-300 rounded bg-[#5A4AC223] hover:bg-[#5A4AC244]">
              <span className="text-[#F8F8F8]">Escolher imagem</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  setForm({ ...form, coverImage: e.target.files ? e.target.files[0] : null })
                }
              />
            </label>
          </div>

          {form.coverImage && (
            <img
              src={URL.createObjectURL(form.coverImage)}
              alt="Pré-visualização da capa"
              className="w-full h-64 mb-8 object-cover"
            />
          )}

          <button onClick={() => {}} className="py-4 px-6 rounded text-roxo-900 font-semibold bg-[#8c7aff] hover:scale-[1.01] transition-all duration-300">Criar</button>
        </div>
      </div>

      <Footer/>
    </div>
  )
}
