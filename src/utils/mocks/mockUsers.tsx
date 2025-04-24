import  {UserListProps}  from '@/interfaces/User'
import ProfileIcon from '@/components/svgComponents/icons/ProfileIcon'

export const mockUsers: UserListProps = {
  users: [
    {name: 'Ricardo Menotti', profilePicture: ProfileIcon , college: 'Universade Federal de São Carlos', rating: 1},
    {name: 'Andre Rettondini', profilePicture: ProfileIcon, college: 'Universade Federal de São Carlos', rating: 2},
    {name: 'Enzo Murayama', profilePicture: ProfileIcon , college: 'Universade Federal de São Carlos', rating: 3},
    {name: 'João Bueno', profilePicture: ProfileIcon , college: 'Universade Federal de São Carlos', rating: 4},
    {name: 'Lucas Alves', profilePicture: ProfileIcon , college: 'Universade Federal de São Carlos', rating: 5},
    {name: 'Marcus Oliveira', profilePicture: ProfileIcon , college: 'Universade Federal de São Carlos', rating: 6},
  ]
}
