import { Post } from "./post.interface";

export interface UserProfile {
    id: number;
    email: string;
    userName: string;
    followersCount: number;
    followingCount: number;
    posts: Post[];
    token?: string;
}