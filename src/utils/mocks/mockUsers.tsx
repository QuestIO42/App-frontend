import  {UserListProps}  from '@/interfaces/User'
import ProfileIcon from '@/components/svgComponents/icons/ProfileIcon'

export const mockUsers: UserListProps = {
  users: [
    {name: 'Lucas', profilePicture: ProfileIcon , college: 'UFSCar ', rating: 1},
    {name: 'Roucas', profilePicture: ProfileIcon, college: 'Universade Federal de São Carlos ', rating: 2},
    {name: 'Peter_Parker', profilePicture: ProfileIcon , college: 'Universidade de NY', rating: 3},
  ]
}
