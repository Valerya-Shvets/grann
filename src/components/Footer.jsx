import { LiaTelegram } from "react-icons/lia";
import { TiSocialFacebook } from "react-icons/ti";
import { FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="container">
        <address className="footer__address">
          <a
            href="#hero"
            className="footer__logo"
            onClick={() => navigate("/")}
          >
            <img
              src="../../logoGrann.png"
              alt="Grann logo"
              width="255"
              height="200"
            />
          </a>
          <ul className="footer__list">
            <li>
              <a className="footer__list-link" href="#">
                м.Кривий Ріг
              </a>
            </li>
            <li>
              <a className="footer__list-link" href="mailto:grann@gmail.com">
                Email: grann@gmail.com
              </a>
            </li>
            <li>
              <a className="footer__list-link" href="tel:+380960000007">
                Tel: +38(096) 000 62 40
              </a>
            </li>
          </ul>
          <div className="footer__contacts">
            <div className="footer__socials">
              <FaInstagram className="footer__socials-icon" />
              <LiaTelegram className="footer__socials-icon" />
              <TiSocialFacebook className="footer__socials-icon" />
            </div>
            <a className="footer__list-link" href="#">
              Політика конфіденційності
            </a>
          </div>
        </address>
      </div>
    </footer>
  );
}

export { Footer };
