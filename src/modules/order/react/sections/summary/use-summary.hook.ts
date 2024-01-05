import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { orderingSlice } from '@ratatouille/modules/order/core/store/ordering.slice';
import { reserve } from '@ratatouille/modules/order/core/usecases/reserve.usecase';
import { selectSummary } from '@ratatouille/modules/order/react/sections/summary/summary.selector';
import { useAppDispatch } from '@ratatouille/modules/store/store';
import { useSelector } from 'react-redux';

export const useSummary = () => {
	function onNext() {
		dispatch(reserve());
	}

	function onPrevious() {
		dispatch(orderingSlice.actions.setStep(OrderingDomainModel.Step.MEALS));
	}

	const dispatch = useAppDispatch();
	const summary = useSelector(selectSummary);

	return { onNext, onPrevious, summary };
};
