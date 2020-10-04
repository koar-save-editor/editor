import React, { FunctionComponent, useEffect, useMemo } from 'react';

export interface TitlebarProps {
  fileName?: string;
  hasUnsavedChanges: boolean;
}

export const component: FunctionComponent<TitlebarProps> = ({
  hasUnsavedChanges,
  fileName,
}) => {
  const title = useMemo(() => {
    return `${hasUnsavedChanges ? '* ' : ''}${
      fileName ? `${fileName} - ` : ''
    }KoAR Save Editor${process.env.NODE_ENV === 'development' ? ' (DEV)' : ''}`;
  }, [fileName, hasUnsavedChanges]);

  useEffect(() => {
    document.title = title;
  }, [title]);

  return <div />;
};
