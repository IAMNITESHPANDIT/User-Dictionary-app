import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  posts: Post[];
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface FetchUsersResult {
  users: User[] | undefined;
  loading: boolean;
}

const useFetchUsers = (): FetchUsersResult => {
  const [users, setUsers] = useState<User[] | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const usersResponse = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const postsResponse = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const usersResponseData: User[] = await usersResponse.json();
        const postsResponseData: Post[] = await postsResponse.json();
        const enrichedUsers = usersResponseData.map((user) => ({
          ...user,
          posts: postsResponseData.filter((post) => post.userId === user.id),
        }));
        setUsers(enrichedUsers);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };

    if (!users) {
      fetchUsers();
    }
  }, [users, setUsers]);

  return { users, loading };
};

export default useFetchUsers;
