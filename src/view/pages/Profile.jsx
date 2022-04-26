import AddAddress from "../components/AddAddress";
import "../../styles/profile.scss";

const Profile = ({ isSeller }) => {
  return (
    <section className="profile">
      <AddAddress isSeller={isSeller} />
    </section>
  );
};

export default Profile;
