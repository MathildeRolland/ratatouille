import { produce } from 'immer';
import { IIDProvider } from '@ratatouille/modules/core/idProvider';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';

export class GuestForm {
	constructor(private idProvider: IIDProvider) {}

	addGuest(state: OrderingDomainModel.Form) {
		return produce(state, (draft) => {
			draft.guests.push({
				id: this.idProvider.generate(),
				firstName: 'John',
				lastName: 'Doe',
				age: 0,
			});
		});
	}

	removeGuest(state: OrderingDomainModel.Form, id: string) {
		return produce(state, (draft) => {
			const index = draft.guests.findIndex((guest) => guest.id === id);
			if (index < 0) return;

			draft.guests.splice(index, 1);
			if (draft.organizerId == id) {
				draft.organizerId = null;
			}
		});
	}

	changeOrganizer(state: OrderingDomainModel.Form, id: string) {
		return produce(state, (draft) => {
			const userExists = draft.guests.some((guest) => guest.id === id);
			draft.organizerId = userExists ? id : null;
		});
	}

	isSubmittable(state: OrderingDomainModel.Form) {
		return (
			state.organizerId !== null &&
			state.guests.every(
				(guest) =>
					guest.age > 0 &&
					guest.firstName !== '' &&
					guest.lastName !== ''
			)
		);
	}

	updateGuest<T extends keyof OrderingDomainModel.Guest>(
		state: OrderingDomainModel.Form,
		id: string,
		key: T,
		value: OrderingDomainModel.Guest[T]
	) {
		return produce(state, (draft) => {
			const guest = draft.guests.find((guest) => guest.id === id);
			if (!guest) return;

			guest[key] = value;
		});
	}
}
