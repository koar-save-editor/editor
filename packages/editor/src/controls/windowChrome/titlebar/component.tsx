import React, { FunctionComponent, useEffect, useMemo } from 'react';

export interface TitlebarProps {
  isDev: boolean;
  fileName?: string;
  hasUnsavedChanges: boolean;
}

export const component: FunctionComponent<TitlebarProps> = ({
  hasUnsavedChanges,
  fileName,
  isDev,
}) => {
  const title = useMemo(() => {
    return `${hasUnsavedChanges ? '* ' : ''}${
      fileName ? `${fileName} - ` : ''
    }KoAR Save Editor${isDev ? ' (DEV)' : ''}`;
  }, [fileName, hasUnsavedChanges]);

  useEffect(() => {
    document.title = title;
  }, [title]);

  return <div />;
};
