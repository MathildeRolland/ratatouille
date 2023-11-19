import { AppState } from '@ratatouille/modules/store/store';
import { useSelector } from 'react-redux';

export const selectStep = (state: AppState) => state.ordering.step;
