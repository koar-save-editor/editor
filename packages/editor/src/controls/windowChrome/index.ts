import { connect, MapStateToProps } from 'react-redux';
import { createSelector } from 'reselect';
import { selectors, StoreState } from '../../store';
import { component, WindowChromeProps } from './component';

type StateProps = Pick<WindowChromeProps, 'themeName'>;
type OwnProps = Pick<WindowChromeProps, 'children'>;

const {
  preferences: { getThemeName },
} = selectors;

const mapStateToProps: MapStateToProps<
  StateProps,
  OwnProps,
  StoreState
> = createSelector(getThemeName, (themeName): StateProps => ({ themeName }));

type DispatchProps = Omit<WindowChromeProps, keyof (StateProps & OwnProps)>;

const dispatchProps: DispatchProps = {};

export const WindowChrome = connect(mapStateToProps, dispatchProps)(component);
