// ====================
// Class
// ====================

export class NotePost {
  id: number;
  name: string;
  body: string;
  hashtags: Array<{ hashtag: HashTag }>;
  noteUrl: string;
  likeCount: number;
  publishAt: Date;

  constructor(_post: INoteAPIPost) {
    this.id = _post.id;
    this.name = _post.name;
    this.body = _post.body;
    this.hashtags = _post.hashtags;
    this.noteUrl = _post.noteUrl;
    this.likeCount = _post.likeCount;
    this.publishAt = _post.publishAt;
  }
}

// ====================
// Interface
// ====================

// ====================
// Note API のレスポンス型
// ====================

export interface INoteAPIResponse {
  data: {
    contents: INoteAPIPost[];
    isLastPage: boolean;
    totalCount: number;
  };
}

export interface INoteAPIPost {
  id: number;
  name: string;
  body: string;
  hashtags: Array<{ hashtag: HashTag }>;
  noteUrl: string;
  likeCount: number;
  publishAt: Date;
}

// ====================
// Note Feed のレスポンス型
// ====================

export interface INoteFeedPost {
  title: string;
  link: string;
  isoDate: string;
  dateMiliSeconds: number;
  content: string;
}

// ====================
// Type
// ====================

export type HashTag = {
  name: string;
};
