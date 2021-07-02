import ProfileWrapper from "components/Profile";

import Orders from "components/Profile/Orders";

function ProfileOrders() {
  return (
    <ProfileWrapper pageTitle="لیست سفارشات">
      <Orders />
    </ProfileWrapper>
  );
}

export default ProfileOrders;
