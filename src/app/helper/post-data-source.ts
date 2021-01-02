import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Post } from '../model/post';
import { PostService } from '../services/post.service';

export class PostDataSource extends DataSource<Post | undefined> {
  private cachedPosts = Array.from<Post>({ length: 0 });
  private dataStream = new BehaviorSubject<(Post | undefined)[]>(
    this.cachedPosts
  );
  private subscription = new Subscription();

  private pageSize = 10;
  private lastPage = 0;

  constructor(private PostService: PostService) {
    super();

    // Start with some data.
    this._fetchPostPage();
  }

  connect(
    collectionViewer: CollectionViewer
  ): Observable<(Post | undefined)[] | ReadonlyArray<Post | undefined>> {
    this.subscription.add(
      collectionViewer.viewChange.subscribe((range) => {
        const currentPage = this._getPageForIndex(range.end);

        if (currentPage && range) {
          console.log(currentPage, this.lastPage);
        }

        if (currentPage > this.lastPage) {
          this.lastPage = currentPage;
          this._fetchPostPage();
        }
      })
    );
    return this.dataStream;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.subscription.unsubscribe();
  }

  private _fetchPostPage(): void {
    for (let i = 0; i < this.pageSize; ++i) {
      this.PostService.allPost().subscribe((res) => {
        this.cachedPosts = this.cachedPosts.concat(res);
        this.dataStream.next(this.cachedPosts);
      });
    }
  }

  private _getPageForIndex(i: number): number {
    return Math.floor(i / this.pageSize);
  }
}
