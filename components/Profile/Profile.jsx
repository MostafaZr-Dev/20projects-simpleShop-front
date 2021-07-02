import Layout from "./Layout";

function Profile({ pageTitle, children }) {
  return <Layout pageTitle={pageTitle}>{children}</Layout>;
}

export default Profile;
