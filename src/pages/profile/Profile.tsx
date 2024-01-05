import React from "react";
import { Link, useParams } from "react-router-dom";
import "./profile.style.scss";
import useFetchUsers from "../../hooks/useFetchUsers";
import Clock from "../../components/clock/Clock";
import Post from "../../components/post/Post";
import Loading from "../../utils/loading/Loading";

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

interface PostListItem {
  id: number;
  title: string;
  body: string;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  company: Company;
  posts: Array<{
    userId: number;
    id: number;
    title: string;
    body: string;
  }>;
}

const Profile: React.FC = () => {
  const { users, loading } = useFetchUsers();
  const { id } = useParams<{ id: string }>();
  const user: User | any = users?.find((u) => u.id.toString() == id);

  if (loading) {
    return <Loading loading={loading} />;
  }

  return (
    <div className="Profile">
      <div className="top">
        <Link to="/" className="link">
          Back
        </Link>
        <Clock />
      </div>
      <div className="title">Profile Page</div>
      {user && (
        <>
          <div className="details">
            <div>
              <div>{user.name}</div>
              <div className="flex">
                {user.username}
                <span className="pipe">|</span>
                {user.company.catchPhrase}
              </div>
            </div>
            <div>
              <div>{`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}</div>
              <div className="flex">
                {user.email}
                <span className="pipe">|</span>
                {user.phone}
              </div>
            </div>
          </div>
          <ul className="posts">
            {user.posts.map((post:PostListItem) => (
              <li key={post.id} className="card">
                <Post post={post} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Profile;
