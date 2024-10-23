// types.ts

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phonenumber?: string;
  image?: string;
}
export interface CommentValues {
  text: string;
  articleId: string;
}
export interface Comment {
  id: number;
  replyId: number | null;
  content: string;
  createdAt: string;
  user: User;
  childComment: Comment[];
}

  export interface CommentFormValues {
    firstName: string;
    lastName: string;
    phone: string; // Trường này tương ứng với 'phonenumber'
    email: string;
    text: string;
  }
  