import { PropsWithChildren } from 'react'

import styles from './AppLayout.module.css'

export const AppLayout = (props: PropsWithChildren<object>) => (
  <div className={styles.layout}>{props.children}</div>
)
