import BookIcon from '../svgComponents/icons/BookIcon'
import BuildingIcon from '../svgComponents/icons/BuildingIcon'

export default function StudentInformation() {
  return (
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
  )
}
