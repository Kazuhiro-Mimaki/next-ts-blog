type PostType = {
  slug: string;
  title: string;
  date: string;
  thumbnail: string;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
  coverImage: string;
  author: {
    name: string;
    picture: string;
  };
};

export default PostType;