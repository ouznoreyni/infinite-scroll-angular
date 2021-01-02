import { Component, OnInit } from '@angular/core';
import { PostDataSource } from '../helper/post-data-source';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  dataSource: PostDataSource;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.dataSource = new PostDataSource(this.postService);
  }
}
