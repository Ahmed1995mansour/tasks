import { useAuthUser } from 'react-auth-kit';
import Avatar from '../../components/avatar/Avatar';
import './profile.styles.scss';

const Profile = () => {
  const authUser = useAuthUser();
  const user = authUser();

  return (
    <div className="profile container">
      <div className="basic-info">
        <div className="avatar">
          <Avatar />
        </div>
        {user && (
          <div className="info">
            <h3 className="name">{`${user.firstName} ${user.lastName}`}</h3>
            <h4 className="username">@{user.username}</h4>
            <h4 className="email">{user.email}</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
