export class NotePost {
  id: string;
  name: string;
  body: string;
  hashtags: string[];
  noteUrl: string;
  likeCount: number;

  constructor(_post: INotePost) {
    this.id = _post.id;
    this.name = _post.name;
    this.body = _post.body;
    this.hashtags = _post.hashtags;
    this.noteUrl = _post.noteUrl;
    this.likeCount = _post.likeCount;
  }
}

export interface INotePost {
  id: string;
  name: string;
  body: string;
  hashtags: string[];
  noteUrl: string;
  likeCount: number;
}
