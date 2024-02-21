export interface IBlogs {
  id: number;
  title: string;
  body: string;
  img_url: string;
  user: User;
  comments: any[];
}

export interface User {
  id: number;
  walletAddress: string;
  fullname: string;
  username: string;
  role: string;
  img_url: any;
}
