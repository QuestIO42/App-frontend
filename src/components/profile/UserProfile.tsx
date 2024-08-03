import Button from '../utility/Button'
import BookIcon from '../svgComponents/icons/BookIcon'
import BuildingIcon from '../svgComponents/icons/BuildingIcon'
import ProfileIcon from '../svgComponents/icons/ProfileIcon'

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
      <ul className="mr-auto flex flex-col items-center gap-4 text-lg font-bold">
        <li className="mr-auto flex gap-2">
          <BuildingIcon></BuildingIcon>
          <p className="">Universidade Federal de São Carlos</p>
        </li>
        <li className="mr-auto flex gap-2">
          <BookIcon></BookIcon>
          <p className="">Engenharia da Computação</p>
        </li>
      </ul>
      <Button className="text-roxo-300" text={'minhas turmas'}></Button>
    </section>
  )
}
