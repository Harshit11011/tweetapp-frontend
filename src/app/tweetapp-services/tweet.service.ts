import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PostTweet } from '../tweetapp-models/post-tweet';
import { Tweet } from '../tweetapp-models/tweet';

@Injectable({
  providedIn: 'root'
})
export class TweetService {
  baseUrl:string="http://tweetapp-env-1.eba-abudzswx.ap-south-1.elasticbeanstalk.com/"+"api/v1.0/tweets";
  constructor(private http: HttpClient) { }

  getAllTweets(): Observable<Tweet[]> {
    return this.http.get<Tweet[]>(this.baseUrl +"/all").pipe(catchError(this.errorHandler));
  }

  getAllTweetsOfUser(userName: string): Observable<Tweet[]> {
    return this.http.get<Tweet[]>(this.baseUrl +"/" + userName).pipe(catchError(this.errorHandler));
  }


  postTweets(userName: string, postTweet: PostTweet) {
    return this.http.post(this.baseUrl +"/" + userName + "/add"
      , postTweet).pipe(catchError(this.errorHandler));
  }

  likeTweet(userName: string, tweetId: number) {
    return this.http.put(this.baseUrl +"/" + userName + "/like/" + tweetId, { responseType: 'text' as 'json' }).pipe(catchError(this.errorHandler));
  }

  deleteTweet(userName: string, tweetId: number) {
    return this.http.delete(this.baseUrl +"/" + userName + "/delete/" + tweetId, { responseType: 'text' as 'json' }).pipe(catchError(this.errorHandler));
  }

  replyTweet(userName: string, tweetId: number, postTweet: PostTweet) {
    return this.http.post(this.baseUrl +"/" + userName + "/reply/" + tweetId
      , postTweet, { responseType: 'text' as 'json' }).pipe(catchError(this.errorHandler));
  }

  updateTweet(userName: string, tweetId: number, postTweet: PostTweet) {
    return this.http.put(this.baseUrl +"/" + userName + "/update/" + tweetId
      , postTweet, { responseType: 'text' as 'json' }).pipe(catchError(this.errorHandler));

  }
  public errorHandler(error: HttpErrorResponse) {
    return throwError(error || "server error");
  }

}
