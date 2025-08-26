export interface Post {
  id: string;
  title: string;
  content: string;
  creation_date: string;
  public: boolean;
  id_user: string;
  id_parent: string | null;
  id_course: string | null;
  id_question: string | null;
}

export interface NewPostData {
  title: string;
  content: string;
  id_course: string;
  id_user: string; // O ID do usuário logado será necessário
  id_parent?: string | null;
}