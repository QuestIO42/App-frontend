export interface Course{
  isSubscribed: boolean
  id: string
  name: string
  description: string
  creation_date: string
  begin_date: string
  end_date: string
  open: boolean
  cover_image?: string | null
}

export interface CreateCourseForm {
  name: string;
  description: string;
  beginDate: string;
  endDate: string;
  isOpen: boolean;
  coverImage: File | null;
}
