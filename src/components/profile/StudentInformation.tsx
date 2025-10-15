import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuildingColumns } from '@fortawesome/free-solid-svg-icons'

export default function StudentInformation() {
  return (
    <ul className="flex flex-col items-center justify-center gap-6 text-lg leading-[1.9] text-cinza-900 my-3">
      <li className="flex gap-4">
        <FontAwesomeIcon icon={faBuildingColumns} className="text-[#47bf85] text-3xl" />
        <p>Universidade Federal de São Carlos</p>
      </li>
    </ul>
  )
}
