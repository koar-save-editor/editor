import { WindowStatus } from '@koar/shared';
import classNames from 'classnames';
import React, { FunctionComponent, useEffect, useMemo } from 'react';
import styles from './styles.scss';

export interface TitlebarProps {
  fileName?: string;
  hasUnsavedChanges: boolean;
  status: WindowStatus;
  isFocused: boolean;
  close: () => void;
  maximize: () => void;
  minimize: () => void;
  unmaximize: () => void;
}

export const component: FunctionComponent<TitlebarProps> = ({
  hasUnsavedChanges,
  fileName,
  isFocused,
  maximize,
  minimize,
  unmaximize,
  status,
}) => {
  const title = useMemo(() => {
    return `${hasUnsavedChanges ? '* ' : ''}${
      fileName ? `${fileName} - ` : ''
    }KoAR Save Editor`;
  }, [fileName, hasUnsavedChanges]);

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div
      className={classNames(styles.container, { [styles.focused]: isFocused })}
    >
      <div className={styles.middle}>
        <div className={styles.caption}>
          <label>{title}</label>
          {process.env.NODE_ENV === 'development' && (
            <span className={styles.environment}>DEBUG</span>
          )}
        </div>
        <div className={styles.spacer} />
      </div>
      <div className={styles.buttons}>
        <div className={styles.divider} />
        <TitlebarButton icon={'\uE921'} onClick={minimize} />
        <TitlebarButton
          icon={status === 'maximized' ? '\uE923' : '\uE922'}
          onClick={status === 'maximized' ? unmaximize : maximize}
        />
        <TitlebarButton
          className={styles.close}
          icon={'\uE8BB'}
          onClick={close}
        />
      </div>
    </div>
  );
};

interface TitlebarButtonProps {
  className?: string;
  icon: string;
  disabled?: boolean;
  onClick: () => void;
}

const TitlebarButton: FunctionComponent<TitlebarButtonProps> = ({
  className,
  icon,
  disabled,
  onClick,
}) => (
  <div
    className={classNames(className, styles.button, {
      [styles.disabled]: disabled,
    })}
    onClick={onClick}
  >
    <span>{icon}</span>
  </div>
);
