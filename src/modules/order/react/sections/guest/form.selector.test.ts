import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { selectForm } from '@ratatouille/modules/order/react/sections/guest/form.selector';
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

		expect(selectForm(state)).toEqual({
			guests: [],
			organizerId: null,
			tableId: null,
		});
	});
});
