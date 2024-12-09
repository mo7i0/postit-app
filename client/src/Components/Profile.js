import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, isLogin } = useSelector(state => state.users);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin, navigate]); // Include navigate in the dependency array

  return (
    <div>
      <h3>Profile Components</h3>
      <h3>{user?.name}</h3>
      <h3>{user?.email}</h3>
    </div>
  );
};

export default Profile;