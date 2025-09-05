import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'

interface UserPosition {
  position: number
}

export default function UserRank({
  position,
}: UserPosition) {
  return (
    <div className="flex min-h-[80px] min-w-[260px] p-4 items-center justify-center bg-laranja shadow-default-laranja gap-4">
      <FontAwesomeIcon icon={faTrophy} className="text-[#97581F] text-3xl" />
      <div className="flex flex-row gap-2">
        <p className="text-left text-xl font-bold text-[#97581F]">
          Minha posição:
        </p>
        <p className="text-left text-xl font-bold text-[#97581F]">{position}°</p>
      </div>
    </div>

  )
}
