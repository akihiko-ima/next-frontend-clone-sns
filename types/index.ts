export interface PostType {
  id: number;
  content: string;
  createdAt: string;
  authorId: number;
  author: UserType;
  profile: Profile;
}

export interface UserType {
  id: number;
  username: string;
  email: string;
  posts: PostType[];
  Profile: Profile;
}

export interface Profile {
  id: number;
  bio: string;
  profileImageUrl: string;
  userId: number;
  user?: UserType;
  username: string;
  email: string;
  authorId: number;
  profileId: number;
  createdAt: string;
  updatedAt: string;
}
