import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { TableFactory } from '@ratatouille/modules/order/core/model/table.factory';
import { orderingSlice } from '@ratatouille/modules/order/core/store/ordering.slice';
import { AppState, useAppDispatch } from '@ratatouille/modules/store/store';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export const useTable = () => {
	function assignTable(tableId: string) {
		setAssignedTableId(tableId);
	}

	function onNext() {
		dispatch(orderingSlice.actions.setStep(OrderingDomainModel.Step.MEALS));
	}

	function onPrevious() {
		dispatch(
			orderingSlice.actions.setStep(OrderingDomainModel.Step.GUESTS)
		);
	}

	function isSubmittable() {
		return assignedTableId;
	}

	const dispatch = useAppDispatch();
	const [assignedTableId, setAssignedTableId] = useState<string | null>(null);

	const availableTables = useSelector(
		(state: AppState) => state.ordering.availableTables.data
	);

	return {
		assignTable,
		onNext,
		onPrevious,
		isSubmittable: isSubmittable(),
		availableTables,
		assignedTableId,
	};
};
