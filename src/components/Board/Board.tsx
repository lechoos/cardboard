import { PropsWithChildren } from 'react'

import styles from './Board.module.css'

export const Board = (props: PropsWithChildren<object>) => (
  <div data-cy={'board'} className={styles.board}>
    {props.children}
  </div>
)
