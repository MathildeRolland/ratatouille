import { useDependencies } from '@ratatouille/modules/app/react/DependenciesProvider';
import { GuestForm } from '@ratatouille/modules/order/core/form/guest.form';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { useRef, useState } from 'react';

export const useGuestsSection = () => {
	const addGuest = () => {
		const newState = guestForm.current.addGuest(form);
		setForm(newState);
	};

	const removeGuest = (id: string) => {
		const newState = guestForm.current.removeGuest(form, id);
		setForm(newState);
	};

	const updateGuest = (id: string, key: string, value: number | string) => {};

	const changeOrganizer = () => {};

	const onNext = () => {};

	const isSubmittable = () => {
		return false;
	};

	const { idProvider } = useDependencies();
	const guestForm = useRef(new GuestForm(idProvider));
	const [form, setForm] = useState<OrderingDomainModel.Form>({
		guests: [],
		organizerId: null,
	});

	return {
		addGuest,
		removeGuest,
		updateGuest,
		changeOrganizer,
		onNext,
		isSubmittable: isSubmittable(),
		form,
	};
};
