import { connect, MapStateToProps } from 'react-redux';
import { createSelector } from 'reselect';
import { selectors, StoreState } from '../../../store';
import { component, TitlebarProps } from './component';

type StateProps = Pick<TitlebarProps, 'fileName' | 'hasUnsavedChanges'>;
type OwnProps = {};

const {
  file: { getFileName, getHasUnsavedChanges },
} = selectors;

const mapStateToProps: MapStateToProps<
  StateProps,
  OwnProps,
  StoreState
> = createSelector(
  getFileName,
  getHasUnsavedChanges,
  (fileName, hasUnsavedChanges) => ({
    fileName,
    hasUnsavedChanges,
  })
);

type DispatchProps = Omit<TitlebarProps, keyof (StateProps & OwnProps)>;

const dispatchProps: DispatchProps = {};

export default connect(mapStateToProps, dispatchProps)(component);
