import { FaLinkedin, FaGithub } from "react-icons/fa"
import styles from './Footer.module.css'
export default function Footer() {
  return (
   <footer className={styles.footer}>
    <ul className={styles.social_list}>
        <li> <a href="https://www.linkedin.com/in/carlos-rocha17/" target="_blank" rel="noopener noreferrer"><FaLinkedin/></a></li>
        <li><a href="https://github.com/K4rlous" target="_blank" rel="noopener noreferrer"><FaGithub/></a></li>
    </ul>
    <p className={styles.copy_right}><span>Scontrol</span> &copy; 2025 / Feito por Carlos Rocha</p>
   </footer>
  )
}
