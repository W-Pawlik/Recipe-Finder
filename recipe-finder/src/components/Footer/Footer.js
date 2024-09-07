import styles from "./Footer.module.css";
import SocialMediaContainer from "../ui/SocialMediaContainer/SocialMediaContainer";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>Copyright &copy; Wojciech Pawlik. rights reserved</p>
        <SocialMediaContainer
          icons={[
            {
              icon: <FacebookIcon fontSize="large" />,
              url: "https://www.facebook.com",
            },
            {
              icon: <LinkedInIcon fontSize="large" />,
              url: "https://pl.linkedin.com/",
            },
            {
              icon: <LanguageIcon fontSize="large" />,
              url: "https://WojciechPawlik.pl",
            },
            {
              icon: <AlternateEmailIcon fontSize="large" />,
              url: "https://mail.google.com/mail/?view=cm&fs=1&to=wojtek.pawlik17@gmail.com",
            },
          ]}
        />
      </div>
    </footer>
  );
}
