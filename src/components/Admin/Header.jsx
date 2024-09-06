import { CgProfile } from "react-icons/cg";
import { IoMdExit } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function HeaderAdmin({ title }) {
  const navigate = useNavigate();

  const handleExit = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/", { replace: true });
  };

  return (
    <header className="header-admin">
      <div className="header-admin__container">
        <div className="header-admin__profile">
          <CgProfile className="header-admin__profile-icon" />
          <p>{title}</p>
        </div>
        <div className="header-admin__exit" onClick={handleExit}>
          <IoMdExit className="header-admin__exit-icon" />
          <p>Вийти</p>
        </div>
      </div>
    </header>
  );
}

export { HeaderAdmin };
