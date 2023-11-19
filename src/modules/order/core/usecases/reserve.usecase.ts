import { orderingSlice } from '@ratatouille/modules/order/core/store/ordering.slice';
import { extractErrorMessage } from '@ratatouille/modules/shared/errors.utils';
import { Dependencies } from '@ratatouille/modules/store/dependencies';
import { AppDispatch, AppGetState } from '@ratatouille/modules/store/store';

export const reserve =
	() =>
	async (
		dispatch: AppDispatch,
		getState: AppGetState,
		{ reservationGateway }: Dependencies
	) => {
		const form = getState().ordering.form;

		dispatch(orderingSlice.actions.handleReservationLoading());

		try {
			await reservationGateway.reserve({
				tableId: form.tableId!,
				guests: form.guests.map(
					({ firstName, lastName, age, id, meals }) => ({
						firstName,
						lastName,
						age,
						isOrganizer: id === form.organizerId,
						meals: {
							entry: meals.entry,
							mainCourse: meals.mainCourse,
							dessert: meals.dessert,
							drink: meals.drink,
						},
					})
				),
			});
			dispatch(orderingSlice.actions.handleReservationSuccess());
		} catch (error) {
			dispatch(
				orderingSlice.actions.handleReservationError(
					extractErrorMessage(error)
				)
			);
		}
	};
