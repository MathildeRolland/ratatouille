import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { selectStep } from '@ratatouille/modules/order/core/selectors/step.selector';
import { createTestState } from '@ratatouille/modules/testing/tests-environment';

const orderingState: OrderingDomainModel.State = {
	step: OrderingDomainModel.Step.GUESTS,
	form: { guests: [], organizerId: null, tableId: null },

	availableTables: { status: 'idle', error: null, data: [] },
	availableMeals: { status: 'idle', error: null, data: [] },
	reservation: { status: 'idle' },
};

describe('', () => {
	it('should return the current step ', () => {
		const state = createTestState({
			ordering: orderingState,
		});

		expect(selectStep(state)).toEqual(OrderingDomainModel.Step.GUESTS);
	});
});
