import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../model/post';

const URL = 'https://jsonplaceholder.typicode.com/posts';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  allPost = (): Observable<Post[]> => this.http.get<Post[]>(URL);
}
