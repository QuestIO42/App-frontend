import LockIcon from '@/components/svgComponents/icons/LockIcon'
import ExerciseTemplate from '@/components/utility/ExerciseTemplate'

export default function TestPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <ExerciseTemplate
        Icon={LockIcon}
        text="Circuitos Combinacionais"
      ></ExerciseTemplate>
    </div>
  )
}
