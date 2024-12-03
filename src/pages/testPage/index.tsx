import OpenAnswer from "@/components/quiz/OpenAnswer"

export default function Test() {
  return(
      <div className="px-4">
        <OpenAnswer
          title="Título do Componente"
          description="Uma descrição que não deve ultrapassar o limite do contêiner pai.skjkdjakjdkasjdkajsdkajsdkajsdkjaskdjaksjdakjsdkajsdjasjdkasdkajskdaksjdkasjdaskdaksdjaksjdkasjdkajsdkjaskdjaskjdksajdkajsdkajsdkjaskdjaksjdkasjdkajsdkjaskdjkasjdkajsdk"
        />
      </div>
  )
}
