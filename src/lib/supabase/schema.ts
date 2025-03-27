export type Tables = {
    posts: {
      id: string;
      title: string;
      slug: string;
      excerpt: string;
      content: string;
      featured_image: string;
      category_id: string;
      author_id: string;
      published: boolean;
      created_at: string;
      updated_at: string;
    };
    categories: {
      id: string;
      name: string;
      slug: string;
      description: string;
      image: string;
    };
    authors: {
      id: string;
      name: string;
      avatar: string;
      bio: string;
    };
    comments: {
      id: string;
      post_id: string;
      user_name: string;
      user_email: string;
      content: string;
      created_at: string;
      approved: boolean;
    };
    newsletter_subscribers: {
      id: string;
      email: string;
      created_at: string;
    };
  };
  
  export type TablesInsert = {
    posts: Omit<Tables['posts'], 'id' | 'created_at' | 'updated_at'> & { id?: string };
    categories: Omit<Tables['categories'], 'id'> & { id?: string };
    authors: Omit<Tables['authors'], 'id'> & { id?: string };
    comments: Omit<Tables['comments'], 'id' | 'created_at'> & { id?: string };
    newsletter_subscribers: Omit<Tables['newsletter_subscribers'], 'id' | 'created_at'> & { id?: string };
  };
  
  export type TablesUpdate = {
    posts: Partial<TablesInsert['posts']>;
    categories: Partial<TablesInsert['categories']>;
    authors: Partial<TablesInsert['authors']>;
    comments: Partial<TablesInsert['comments']>;
    newsletter_subscribers: Partial<TablesInsert['newsletter_subscribers']>;
  };