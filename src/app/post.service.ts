import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URL = 'https://jsonplaceholder.typicode.com/posts';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  allPost = () => this.http.get(URL);
}
