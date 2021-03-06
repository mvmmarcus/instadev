import React, { useState, useEffect } from "react";

import UserProfile from "../../containers/UserProfile";
import UserPosts from "../../containers/UserPosts";

import Loading from "../../components/Loading";
import { useParams } from "react-router-dom";

const ProfileRoute = () => {
  const [loadingUserPosts, setLoadingUserPosts] = useState(true);
  const [usersList, setUsersList] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  const { username } = useParams();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const url = "https://5e7d0266a917d70016684219.mockapi.io/api/v1/users";
        const response = await fetch(url);
        const data = await response.json();
        setUsersList(data);
        setLoadingUserPosts(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    usersList.map((user) => {
      if (user.name === username) {
        setUserInfo(user);
        const fetchUserPosts = async () => {
          try {
            const url = `https://5e7d0266a917d70016684219.mockapi.io/api/v1/users/${user.id}/posts`;
            const response = await fetch(url);
            const data = await response.json();
            setUserPosts(data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchUserPosts();
      }
      return user;
    });
  }, [username, usersList]);

  return (
    <div data-testid="profile-route">
      {loadingUserPosts ? (
        <Loading />
      ) : (
        <>
          <UserProfile
            avatar={userInfo.avatar}
            name={userInfo.name}
            username={userInfo.username}
          />
          <UserPosts posts={userPosts} />
        </>
      )}
    </div>
  );
};

export default ProfileRoute;
