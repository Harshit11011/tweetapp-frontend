import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostTweet } from 'src/app/tweetapp-models/post-tweet';
import { TweetService } from 'src/app/tweetapp-services/tweet.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  postTweet!: PostTweet;
  userName!:any;

  tweetForm = this.formBuilder.group({
    tweetTag: ['', Validators.required],
    tweetMessage: ['', [Validators.required, Validators.maxLength(144)]],
  });

  constructor(private service: TweetService, private formBuilder: FormBuilder, private toastr: ToastrService, private route: Router) {
    this.userName=localStorage.getItem('user');
    
    this.postTweet = {
      tweetMessage: '',
      tweetTag: '',
    };
  }

  ngOnInit(): void {
  }

  postTheTweet() {
    this.postTweet.tweetMessage = this.tweetForm.get('tweetMessage')?.value;
    this.postTweet.tweetTag = this.tweetForm.get('tweetTag')?.value;
    this.userName=localStorage.getItem('user');
    if(this.userName!=null){
      console.log(this.userName);
    }
    this.addTweet(this.userName,this.postTweet);
  }

  public addTweet(userName:string,postTweet: PostTweet) {
    let response = this.service.postTweets(userName,postTweet);
    response.subscribe((data) => {
      this.toastr.success('Tweet Added Successfully.');
    }, (error) => {
      console.log(error.error);
      this.toastr.error("There were some issues in adding the post.");
       });

  }


}
