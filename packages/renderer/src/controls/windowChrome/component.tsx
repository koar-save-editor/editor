import { Classes } from '@blueprintjs/core';
import React, { FunctionComponent, ReactNode } from 'react';
import { ThemeName } from '../../store';
import styles from './styles.scss';
import Titlebar from './titlebar';

export interface WindowChromeProps {
  themeName: ThemeName;
  children?: ReactNode;
}

export const component: FunctionComponent<WindowChromeProps> = ({
  themeName,
  children,
}) => (
  <div className={styles.container}>
    <Titlebar />
    <main className={themeName === 'dark' ? Classes.DARK : undefined}>
      {children}
    </main>
  </div>
);
