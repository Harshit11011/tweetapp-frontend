import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostTweet } from 'src/app/tweetapp-models/post-tweet';
import { Tweet } from 'src/app/tweetapp-models/tweet';
import { TweetReplies } from 'src/app/tweetapp-models/tweet-replies';
import { UsersAll } from 'src/app/tweetapp-models/users-all';
import { TweetService } from 'src/app/tweetapp-services/tweet.service';
import { UserServiceService } from 'src/app/tweetapp-services/user-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  homeTweets: Tweet[] = [];
  isError: boolean = false;
  isShowButton: boolean = false;
  userName: string = "";
  homeUsers!: UsersAll[];
  loggedUser!: any;
  isCollapse: boolean = false;
  isLiked: number = -1;
  userReplyId: number = -1;
  userReply: string = "";
  postTweet: PostTweet = {
    tweetMessage: '',
    tweetTag: '',
  }
  userTag: string = "";

  constructor(private service: UserServiceService, private toastr: ToastrService, private route: Router, private tweetService: TweetService) {
  }

  ngOnInit(): void {
    this.tweetService.getAllTweets().subscribe((tweet) => this.homeTweets = tweet);
    this.isCollapse = false;
    this.isLiked = -1;
    this.userReplyId=-1;
    
  }

  convert(stringDate: any) {
    return new Date(stringDate);
  }
  show() {
    console.log("hello from the other side");
    console.log(this.homeTweets);
  }

  searchUser() {
    if (this.userName == undefined || this.userName.trim().length == 0) {
      this.toastr.error("Please provide a valid username.");


    } else {
      if (this.userName != "%") {
        this.service.getUserWithUserName(this.userName)
          .subscribe((data) => {
            this.homeUsers = data;

          });
      } else {
        this.service.getAllTheUsers()
          .subscribe((data) => {
            this.homeUsers = data;

          });
      }
      this.userName = "";
      this.isShowButton = true;
      this.homeTweets = [];
    }
  }

  hideUsers() {
    this.homeUsers = [];
    this.isShowButton = false;
    this.ngOnInit();
  }

  filterUsersTweets() {
    this.loggedUser = localStorage.getItem('user');
    if (this.loggedUser != null) {
      let response = this.tweetService.getAllTweetsOfUser(this.loggedUser);
      response.subscribe((data) => {
        this.homeTweets = data;
      }, (error) => {
        console.log(error.error);
        this.toastr.error("There were some issues in adding the post.");
      });
    }
    this.isCollapse = true;
    this.userReplyId=-1;
  }

  likeTweet(tweetId: number) {
    this.isLiked = tweetId;
    this.loggedUser = localStorage.getItem('user');
    if (this.loggedUser != null) {
      let response = this.tweetService.likeTweet(this.loggedUser, tweetId);
      response.subscribe((data) => {
        this.toastr.success("Thanks for liking the tweet.");
        this.ngOnInit();
      }, (error) => {
        console.log(error.error);
      });
    }
  }

  deleteTweet(tweetId: number) {
    this.isLiked = tweetId;
    this.loggedUser = localStorage.getItem('user');
    if (this.loggedUser != null) {
      let response = this.tweetService.deleteTweet(this.loggedUser, tweetId);
      response.subscribe((data) => {
        this.filterUsersTweets();
        this.toastr.success("your tweet is deleted.");
      }, (error) => {
        console.log(error.error);
      });
    }
  }

  seeRepliesToggle(tweetId: number) {
    this.userReplyId = tweetId;
  }
  seeRepliesToggleHide() {
    this.userReplyId = -1;
  }

  postReply(tweetId: number) {
    var userReplyOnTweet = JSON.stringify(this.userReply);
    if (userReplyOnTweet.length <= 5) {
      this.toastr.warning("tweet should have a meaningful message");
    }
    else if (userReplyOnTweet.length > 144) {
      this.toastr.warning("tweet should not be more than 144 characters.");
    }
    else {
      console.log(JSON.stringify(this.userReply))
      this.userReplyId = tweetId;
      this.postTweet.tweetMessage = userReplyOnTweet;
      this.postTweet.tweetTag = this.userTag;
      this.loggedUser = localStorage.getItem('user');
      if (this.loggedUser != null) {
        let response = this.tweetService.replyTweet(this.loggedUser, tweetId, this.postTweet);
        response.subscribe((data) => {
          this.ngOnInit();
          this.userReply = "";
          this.userTag = "";
          this.toastr.success("you have replied to tweet successfully.");
        }, (error) => {
          console.log(error.error);
        });
      }
    }
  }
  updateTweet(tweetId: number) {
    this.userReplyId = tweetId +9999;
    console.log("it works");
  }

  updateTweetDetails(tweetId: number){
    var userReplyOnTweet = JSON.stringify(this.userReply);
    if (userReplyOnTweet.length <= 5) {
      this.toastr.warning("tweet should have a meaningful message");
    }
    else if (userReplyOnTweet.length > 144) {
      this.toastr.warning("tweet should not be more than 144 characters.");
    }
    else {
      console.log(JSON.stringify(this.userReply))
      this.userReplyId = tweetId;
      this.postTweet.tweetMessage = userReplyOnTweet;
      this.postTweet.tweetTag = this.userTag;
      this.loggedUser = localStorage.getItem('user');
      if (this.loggedUser != null) {
        let response = this.tweetService.updateTweet(this.loggedUser, tweetId, this.postTweet);
        response.subscribe((data) => {
          this.filterUsersTweets();
          this.userReplyId = -1;
          this.userReply = "";
          this.userTag = "";
          this.toastr.success("you have updated to tweet successfully.");
        }, (error) => {
          console.log(error.error);
        });
      }
    }
    
  }

}
