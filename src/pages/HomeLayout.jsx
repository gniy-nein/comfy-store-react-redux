import { Outlet, useNavigation } from "react-router-dom";
import { Header, Navbar } from "../components";
import { Loading } from "../components/index";

const HomeLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <>
      <Header />
      <Navbar />
      {isLoading ? (
        <Loading />
      ) : (
        <section className="align-element py-20">
          <Outlet />
        </section>
      )}
    </>
  );
};

export default HomeLayout;
