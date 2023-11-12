import { UserComment } from "./user-comment";

export interface Post {
    id: string; 
    title: string;
    permalink: string;
    category: string;
    postImgPath: any;
    excerpt: string;
    content: string;
    isFeatured: boolean;
    views: number;
    userComments: UserComment[]
    status: number;
    createdAt: Date;
  }