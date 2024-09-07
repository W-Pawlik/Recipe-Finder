import styles from "./SocialMediaContainer.module.css";

export default function SocialMediaContainer({ icons, contDirection = "row" }) {
  const listDirectionCss = {
    flexDirection: `${contDirection}`,
  };
  return (
    <div className={styles.socialMediaContainer}>
      <ul
        className={styles.list}
        style={{ flexDirection: listDirectionCss.flexDirection }}
      >
        {icons.map(({ icon, url }) => (
          <li>
            <a
              className={styles.iconStyle}
              href={url}
              target="_blank"
              rel="noreferrer"
            >
              <p>{icon}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
