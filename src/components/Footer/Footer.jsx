import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer__content">
      <div>
        <p className="footer__developer-text">Developed By Benicen Soto</p>
      </div>
      <div>
        <p className="footer__year-text">{currentYear}</p>
      </div>
    </footer>
  );
}

export default Footer;