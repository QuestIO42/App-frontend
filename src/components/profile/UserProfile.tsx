import Button from '../utility/Button'
import ProfileIcon from '../svgComponents/icons/ProfileIcon'
import StudentInformation from './StudentInformation'

export default function UserProfile() {
  return (
    <section className="relative flex flex-col items-center justify-center gap-4 lg:max-w-[27rem]">
      <Button
        className="absolute right-0 top-0"
        text="editar"
        size="small"
        variant="secondary"
      ></Button>
      <ProfileIcon className="mt-10 h-40 w-40 text-verde-300"></ProfileIcon>
      <h2 className="text-6xl font-bold">Usuário Tal</h2>
      <StudentInformation />
      <Button className="text-roxo-300" text={'minhas turmas'}></Button>
    </section>
  )
}
