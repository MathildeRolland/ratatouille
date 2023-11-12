import { useDependencies } from '@ratatouille/modules/app/react/DependenciesProvider';
import { GuestForm } from '@ratatouille/modules/order/core/form/guest.form';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { chooseGuests } from '@ratatouille/modules/order/core/usecases/choose-guests.usecase';
import { AppState, useAppDispatch } from '@ratatouille/modules/store/store';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export const useGuestsSection = () => {
	const addGuest = () => {
		const newState = guestForm.current.addGuest(form);
		setForm(newState);
	};

	const removeGuest = (id: string) => {
		const newState = guestForm.current.removeGuest(form, id);
		setForm(newState);
	};

	const updateGuest = <T extends keyof OrderingDomainModel.Guest>(
		id: string,
		key: T,
		value: OrderingDomainModel.Guest[T]
	) => {
		const newState = guestForm.current.updateGuest(form, id, key, value);
		setForm(newState);
	};

	const changeOrganizer = (id: string) => {
		const newState = guestForm.current.changeOrganizer(form, id);
		setForm(newState);
	};

	const onNext = () => {
		dispatch(chooseGuests(form));
	};

	const isSubmittable = () => {
		return guestForm.current.isSubmittable(form);
	};

	const initialForm = useSelector((state: AppState) => state.ordering.form);
	const dispatch = useAppDispatch();
	const { idProvider } = useDependencies();
	const guestForm = useRef(new GuestForm(idProvider));
	const [form, setForm] = useState<OrderingDomainModel.Form>({
		guests: initialForm.guests,
		organizerId: initialForm.organizerId,
		tableId: initialForm.tableId,
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
