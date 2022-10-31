import { TweetReplies } from "./tweet-replies";

export interface Tweet {
    tweetId: number;
    tweetMessage: string;
    tweetTag: string;
    createdDate: string;
    likes: number;
    userName: string;
    reply:TweetReplies[];

}
