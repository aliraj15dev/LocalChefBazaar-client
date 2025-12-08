import { FaFacebookSquare, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content">
      <div className="footer grid sm:grid-cols-2 lg:grid-cols-4 max-w-9/10 mx-auto py-10">
        <div>
          <h6 className="footer-title">Contact Info</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </div>
        <div>
          <h6 className="footer-title">Working Hours</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </div>
        <div>
          <h6 className="footer-title">Social Media Links</h6>
          <div className="text-3xl flex gap-5">
            <a href="link link-hover">
              <FaFacebookSquare />
            </a>
            <a href="link link-hover">
              <FaXTwitter />
            </a>
            <a href="link link-hover">
              <FaLinkedin />
            </a>
            <a href="link link-hover">
              <FaGithub />
            </a>
          </div>
        </div>
        <div>
          <p>@copywrite 2025 LocalChefBazaar, Inc.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
