import styles from './Link.module.css'
import { Link } from 'react-router-dom'

// to se refere aonde o link vai
// text é o texto baseado onde iremos utilizar ele!
export default function LinkButton({ to, text}) {
  return (
    <Link className={styles.btn} to={to}>
        {text}
    </Link>
  )
}