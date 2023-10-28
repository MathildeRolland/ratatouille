import { useDependencies } from '@ratatouille/modules/app/react/DependenciesProvider';
import { GuestForm } from '@ratatouille/modules/order/core/form/guest.form';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { useRef, useState } from 'react';

export const useGuestsSection = () => {
	const addGuest = () => {
		const newState = guestForm.current.addGuest(guests);
		setGuests(newState);
	};

	const removeGuest = (id: string) => {
		const newState = guestForm.current.removeGuest(guests, id);
		setGuests(newState);
	};

	const updateGuest = (id: string, key: string, value: number | string) => {};

	const changeOrganizer = () => {};

	const onNext = () => {};

	const isSubmittable = () => {
		return false;
	};

	const { idProvider } = useDependencies();
	const guestForm = useRef(new GuestForm(idProvider));
	const [guests, setGuests] = useState<OrderingDomainModel.Guest[]>([]);

	return {
		addGuest,
		removeGuest,
		updateGuest,
		changeOrganizer,
		onNext,
		isSubmittable: isSubmittable(),
		guests,
	};
};
