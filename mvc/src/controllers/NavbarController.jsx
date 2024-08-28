import { useNavigate } from "react-router-dom";
import useSignOut from "react-auth-kit/hooks/useSignOut";

export const useNavbarController = () => {
  const navigate = useNavigate();
  const signOut = useSignOut();

  const handlePageChange = (page) => {
    if (page === "Home") {
      navigate("/");
    } else {
      navigate(`/${page.toLowerCase()}`);
    }
  };

  const handleSignOut = () => {
    signOut();
    navigate("/login");
  };

  return {
    handlePageChange,
    handleSignOut,
  };
};
