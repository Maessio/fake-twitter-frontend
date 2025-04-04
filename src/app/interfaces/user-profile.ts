import { Post } from "./post";

export interface UserProfile {
    id: number;
    email: string;
    userName: string;
    followersCount: number;
    followingCount: number;
    posts: Post[];
    token?: string;
}