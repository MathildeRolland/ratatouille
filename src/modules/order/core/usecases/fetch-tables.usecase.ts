import { orderingSlice } from '@ratatouille/modules/order/core/store/ordering.slice';
import { extractErroMessage } from '@ratatouille/modules/shared/errors.utils';
import { Dependencies } from '@ratatouille/modules/store/dependencies';
import { AppDispatch, AppGetState } from '@ratatouille/modules/store/store';

export const fetchTables = async (
	dispatch: AppDispatch,
	_: AppGetState,
	dependencies: Dependencies
) => {
	dispatch(orderingSlice.actions.handleTablesLoading());

	try {
		const tables = await dependencies.tableGateway.getTables();
		dispatch(orderingSlice.actions.storeTables(tables));
	} catch (error) {
		dispatch(
			orderingSlice.actions.handleTablesError(extractErroMessage(error))
		);
	}
};
