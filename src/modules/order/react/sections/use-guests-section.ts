import { useState } from 'react';

type Guest = {
	id: string;
	firstName: string;
	lastName: string;
	age: number;
};

export const useGuestsSection = () => {
	const addGuest = () => {
		setGuests((guests) => [
			...guests,
			{
				id: Math.random().toString(),
				firstName: '',
				lastName: '',
				age: 0,
			},
		]);
	};

	const removeGuest = (id: string) => {
		setGuests((guests) => guests.filter((guest) => guest.id !== id));
	};

	const updateGuest = (id: string, key: string, value: number | string) => {};

	const changeOrganizer = () => {};

	const onNext = () => {};

	const isSubmittable = () => {
		return false;
	};

	const [guests, setGuests] = useState<Guest[]>([]);
	// const guests: any[] = [];

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
