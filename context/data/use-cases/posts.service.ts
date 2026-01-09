import api from "../../../services/api";
import { Post } from "../../../types";

const mapPostFromAPI = (post: any): Post => {
  return {
    id: post._id || post.id,
    title: post.title,
    content: post.content,
    author: post.author,
    authorId: post.authorId || post._id,
    createdAt: post.createdAt || new Date().toISOString().split("T")[0],
    description: post.description || post.subject || "",
  };
};

const mapPostToAPI = (post: Partial<Post>): any => {
  const apiData: any = {};
  if (post.title) apiData.title = post.title;
  if (post.content) apiData.content = post.content;
  if (post.description) apiData.subject = post.description;
  if (post.author) apiData.author = post.author;
  return apiData;
};

export const loadPostsService = async (): Promise<Post[]> => {
  try {
    const response = await api.get("/api/posts");

    const mappedPosts = (response.data || []).map(mapPostFromAPI);
    const validPosts = mappedPosts.filter((post: Post) => post?.id);

    return validPosts;
  } catch (error: any) {
    console.error(
      "Erro ao carregar posts:",
      error.response?.data || error.message
    );
    return [];
  }
};

export const createPostService = async (
  postData: Omit<Post, "id" | "createdAt">
): Promise<Post> => {
  const apiData = {
    title: postData.title,
    content: postData.content,
    author: postData.author || "Autor Desconhecido",
    subject: postData.description,
  };

  const response = await api.post("/api/posts", apiData);
  return mapPostFromAPI(response.data);
};

export const updatePostService = async (
  id: string,
  postData: Partial<Post>
): Promise<void> => {
  const apiData = mapPostToAPI(postData);
  await api.patch(`/api/posts/${id}`, apiData);
};

export const deletePostService = async (id: string): Promise<void> => {
  await api.delete(`/api/posts/${id}`);
};
