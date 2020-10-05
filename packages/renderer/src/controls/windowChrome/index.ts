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

export const WindowChrome = connect(mapStateToProps)(component);
