import { useAuthUser } from 'react-auth-kit';
import Avatar from '../../components/avatar/Avatar';
import EditUserProfileModal from '../../components/edit-user-profile-modal/EditUserProdileModal';
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
          <div className="user-name">
            <h3 className="name">{`${user.firstName} ${user.lastName}`}</h3>
            <span className="user-title">Software Engineer</span>
          </div>
        )}

        {user && (
          <div className="contact-info">
            <ul className="fa-ul">
              <li>
                <span className="fa-li">
                  <i className="fa-solid fa-location-dot"></i>
                </span>
                Address
              </li>
              <li>
                <span className="fa-li">
                  <i className="fa-regular fa-envelope"></i>
                </span>
                {user.email}
              </li>
              <li>
                <span className="fa-li">
                  <i className="fa-solid fa-mobile-screen"></i>
                </span>
                0201112345678
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="general-info">
        <div className="bio">BIO</div>
      </div>
      <div className="edit-icon">
        <EditUserProfileModal />
      </div>
    </div>
  );
};

export default Profile;
