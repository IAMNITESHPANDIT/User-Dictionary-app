import React from "react";
import { Link } from "react-router-dom";
import "./users.style.scss";
import useFetchUsers from "../../hooks/useFetchUsers";
import Loading from "../../utils/loading/Loading";

interface User {
  id: number;
  name: string;
  posts: { id: number; title: string; body: string }[];
}

interface UserListProps {}

const Users: React.FC<UserListProps> = () => {
  const { users, loading } = useFetchUsers();

  if (loading) {
    return <Loading loading={loading} />;
  }

  return (
    <div className="user-card">
      <div className="title">Directory</div>
      <ul className="list">
        {users &&
          users.map((user: User) => (
            <li key={user.id} className="card">
              <Link to={`/userDetails/${user.id}`} className="link">
                <div> Name: {user.name}</div>
                <div>Posts: {user.posts.length}</div>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Users;
