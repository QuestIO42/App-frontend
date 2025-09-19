export interface Course{
  isSubscribed: boolean
  id: string
  name: string
  description: string
  image: string
  creation_date: string
  begin_date: string
  end_date: string
  open: boolean
  cover_image?: string | null
}
