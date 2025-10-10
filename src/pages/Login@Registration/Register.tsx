import RegisterForm from '@/components/register/RegisterForm'
import HeaderLinks from '@/components/header/HeaderLinks'

export default function Register() {
  return (
    <div className="min-w-screen min-h-screen bg-grid-pattern relative flex flex-col items-center justify-center px-6 pb-16">
      <HeaderLinks />
      <RegisterForm />
    </div>
  )
}
