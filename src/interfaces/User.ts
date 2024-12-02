import { ElementType } from 'react'

export interface User{
  id: number
  fullname: string
  username: string
  email: string
  college_register: string
  xp_count?: number
}


export interface RankingItemProps {
  name: string
  profilePicture?: ElementType
  college: string
  rating: number
}

export interface UserListProps{
  users: RankingItemProps[]
}
