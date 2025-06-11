import { ElementType } from 'react'

export interface User{
  id: number
  full_name: string
  username: string
  email: string
  college_register: string
  xp_count?: number
  role: 0 | 1 | 2 | 3
}


export interface RankingItemProps {
  name: string
  profilePicture: ElementType
  college: string
  rating: number
}

export interface UserListProps{
  users: RankingItemProps[]
}

export interface UserUpdateProps{
  id: string
  full_name: string
  username: string
  email: string
  password: string
  confirmPassword: string
}
