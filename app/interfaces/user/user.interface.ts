export interface IUser {
  id: number;
  walletAddress: string;
  fullname: string;
  username: string;
  role: string;
  imagePath: string;
  posts: Post[];
}

export interface Post {
  id: number;
  title: string;
  body: string;
  imagePath: string;
}
