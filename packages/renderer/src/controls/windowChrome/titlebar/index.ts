import { connect, MapStateToProps } from 'react-redux';
import { createSelector } from 'reselect';
import { actions, selectors, StoreState } from '../../../store';
import { component, TitlebarProps } from './component';

type StateProps = Pick<
  TitlebarProps,
  'fileName' | 'hasUnsavedChanges' | 'isFocused' | 'status'
>;
type OwnProps = {};

const {
  file: { getFileName, getHasUnsavedChanges },
  window: { getIsFocused, getStatus },
} = selectors;

const mapStateToProps: MapStateToProps<
  StateProps,
  OwnProps,
  StoreState
> = createSelector(
  getFileName,
  getHasUnsavedChanges,
  getIsFocused,
  getStatus,
  (fileName, hasUnsavedChanges, isFocused, status): StateProps => ({
    fileName,
    hasUnsavedChanges,
    isFocused,
    status,
  })
);

type DispatchProps = Omit<TitlebarProps, keyof (StateProps & OwnProps)>;

const {
  window: { close, maximize, minimize, unmaximize },
} = actions;

const dispatchProps: DispatchProps = {
  close,
  maximize,
  minimize,
  unmaximize,
};

export default connect(mapStateToProps, dispatchProps)(component);
