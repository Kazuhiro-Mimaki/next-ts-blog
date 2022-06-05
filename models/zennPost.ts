// ====================
// Class
// ====================

export class ZennPost {
  title: string;
  link: string;
  isoDate: string;
  dateMiliSeconds: number;
  content: string;
  summary: string;

  constructor(_zennPost: IZennFeedPost) {
    this.title = _zennPost.title;
    this.link = _zennPost.link;
    this.isoDate = _zennPost.isoDate;
    this.dateMiliSeconds = _zennPost.dateMiliSeconds;
    this.content = _zennPost.content;
    this.summary = this.getSummary(this.content);
  }

  private getSummary(fullContents: ZennPost["content"]) {
    const SUMMARY_RANGE = {
      START: 0,
      END: 200,
    };
    return fullContents.substring(SUMMARY_RANGE.START, SUMMARY_RANGE.END);
  }
}

// ====================
// Interface
// ====================

// ====================
// Zenn feed の型
// ====================

export interface IZennFeedPost {
  title: string;
  link: string;
  isoDate: string;
  dateMiliSeconds: number;
  content: string;
}
