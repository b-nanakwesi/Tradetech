import React from 'react'
import styles from './BouncingBalls.module.css'

const BouncingBalls = () => {
  return (
    <div className={styles.wrapper}>
    <div className={styles.circle}></div>
    <div className={styles.circle}></div>
    <div className={styles.circle}></div>
    <div className={styles.shadow}></div>
    <div className={styles.shadow}></div>
    <div className={styles.shadow}></div>
</div>
  )
}

export default BouncingBalls