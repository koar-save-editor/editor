import React, { FunctionComponent } from 'react';
import styles from './styles.scss';

export interface AppProps {}

export const component: FunctionComponent<AppProps> = ({}) => (
  <div className={styles.container} />
);
