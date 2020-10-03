import { connect, MapStateToProps } from 'react-redux';
import { createSelector } from 'reselect';
import { selectors, StoreState } from '../../../store';
import { component, TitlebarProps } from './component';

type StateProps = Pick<
  TitlebarProps,
  'isDev' | 'fileName' | 'hasUnsavedChanges'
>;
type OwnProps = {};

const {
  file: { getFileName, getHasUnsavedChanges },
  attributes: { getEnvironment },
} = selectors;

const mapStateToProps: MapStateToProps<
  StateProps,
  OwnProps,
  StoreState
> = createSelector(
  getFileName,
  getHasUnsavedChanges,
  getEnvironment,
  (fileName, hasUnsavedChanges, environment) => ({
    fileName,
    hasUnsavedChanges,
    isDev: environment === 'development',
  })
);

type DispatchProps = Omit<TitlebarProps, keyof (StateProps & OwnProps)>;

const dispatchProps: DispatchProps = {};

export default connect(mapStateToProps, dispatchProps)(component);
