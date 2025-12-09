import { FaFacebookSquare, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content">
      <div className="max-w-9/10 mx-auto footer grid sm:grid-cols-2 lg:grid-cols-4 py-10">
        <div>
          <h6 className="footer-title">Contact Info</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
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
          <h6 className="footer-title">Working Hours</h6>
          <a className="link link-hover"><span className="font-bold">Split Shifts:</span> Common in restaurants, e.g., 10 AM - 3 PM and 5 PM - 10 PM.</a>
          <a className="link link-hover"><span className="font-bold">Long Days:</span> 10-14 hour days are standard, sometimes stretching to 16-18 hours, especially for senior roles or busy periods.</a>
          <a className="link link-hover"><span className="font-bold">Weekly Hours:</span> 50+ hours/week is common; some work 60-80+ hours.</a>
        </div>

        <div className="flex justify-center items-center w-full h-full">
          <p className="">Copywrite@2025 LocalChefBazaar, Inc.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
