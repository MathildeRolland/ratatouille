import { IIDProvider } from '@ratatouille/modules/core/idProvider';
import { GuestForm } from '@ratatouille/modules/order/core/form/guest.form';
import { GuestFactory } from '@ratatouille/modules/order/core/model/guest.factory';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';

class StubIDProvider implements IIDProvider {
	generate(): string {
		return '1';
	}
}

const idProvider = new StubIDProvider();

const johnDoe = GuestFactory.create({
	id: '1',
	firstName: 'John',
	lastName: 'Doe',
	age: 24,
});
const janeDoe = GuestFactory.create({
	id: '1',
	firstName: 'Jane',
	lastName: 'Doe',
	age: 24,
});

const emptyInitialState: OrderingDomainModel.Form = {
	guests: [],
	organizerId: null,
};
const stateWithOneUser: OrderingDomainModel.Form = {
	guests: [johnDoe],
	organizerId: null,
};
const stateWithTwoUsers: OrderingDomainModel.Form = {
	guests: [johnDoe, { id: '2', firstName: 'Jane', lastName: 'Doe', age: 24 }],
	organizerId: null,
};

const form = new GuestForm(idProvider);

describe('Add a guest', () => {
	it('should add a guest', () => {
		const state = form.addGuest(emptyInitialState);

		expect(state.guests).toEqual([
			{ id: '1', firstName: 'John', lastName: 'Doe', age: 0 },
		]);
	});

	it('should add a guest when there is already one', () => {
		const state = form.addGuest(stateWithOneUser);

		expect(state.guests).toEqual([
			{ id: '1', firstName: 'John', lastName: 'Doe', age: 24 },
			{ id: '1', firstName: 'John', lastName: 'Doe', age: 0 },
		]);
	});

	it('should add a guest when there is already two', () => {
		const state = form.addGuest(stateWithTwoUsers);

		expect(state.guests).toEqual([
			{ id: '1', firstName: 'John', lastName: 'Doe', age: 24 },
			{ id: '2', firstName: 'Jane', lastName: 'Doe', age: 24 },
			{ id: '1', firstName: 'John', lastName: 'Doe', age: 0 },
		]);
	});
});

describe('Removing a guest', () => {
	it('when there is no user, the remove should do nothing', () => {
		const state = form.removeGuest(emptyInitialState, '1');
		expect(state.guests).toEqual([]);
	});

	it('when there is one user with ID 1, the user with ID 1 should be removed', () => {
		const state = form.removeGuest(stateWithOneUser, '1');
		expect(state.guests).toEqual([]);
	});

	it('when there is two users, only the user with ID 1 should be removed', () => {
		const state = form.removeGuest(stateWithTwoUsers, '1');
		expect(state.guests).toEqual([
			{ id: '2', firstName: 'Jane', lastName: 'Doe', age: 24 },
		]);
	});
	it('when I remove an organizer, it should set the organizerId to null', () => {
		const stateWithOrganizer = {
			...stateWithOneUser,
			organizerId: '1',
		};
		const state = form.removeGuest(stateWithOrganizer, '1');
		expect(state.organizerId).toEqual(null);
	});
});

describe('Add an organizer', () => {
	it('set organizerId when the user does not exists', () => {
		const state = form.changeOrganizer(emptyInitialState, '1');
		expect(state.organizerId).toEqual(null);
	});

	it('set organizer ID when the user exists', () => {
		const state = form.changeOrganizer(stateWithOneUser, '1');
		expect(state.organizerId).toEqual('1');
	});
});

describe('Is submittable', () => {
	it('when no guest is an organizer, it should not be submittable', () => {
		const isSubmittable = form.isSubmittable(emptyInitialState);
		expect(isSubmittable).toEqual(false);
	});
	it('when one guest is an organizer, it should be submittable', () => {
		const withOrganizerState = {
			...stateWithOneUser,
			organizerId: '1',
		};
		const isSubmittable = form.isSubmittable(withOrganizerState);
		expect(isSubmittable).toEqual(true);
	});

	it.each([
		{
			age: 0,
		},
		{
			firstName: '',
		},
		{ lastName: '' },
	])('when the guest is not valid, it should NOT be submittable', (guest) => {
		const withOrganizerState = {
			organizerId: '1',
			guests: [{ ...johnDoe, ...guest }],
		};
		const isSubmittable = form.isSubmittable(withOrganizerState);
		expect(isSubmittable).toEqual(false);
	});
});

describe('Update a guest', () => {
	it.each([
		{
			key: 'firstName' as keyof OrderingDomainModel.Guest,
			value: 'Jane',
		},
		{
			key: 'lastName' as keyof OrderingDomainModel.Guest,
			value: 'Wick',
		},
		{
			key: 'age' as keyof OrderingDomainModel.Guest,
			value: 42,
		},
	])(`should change the %s of the guest`, ({ key, value }) => {
		const state = form.updateGuest(stateWithOneUser, '1', key, value);
		expect(state.guests[0][key]).toEqual(value);
	});

	it('should do nothing if the id is not assigned', () => {
		const state = form.updateGuest(
			stateWithOneUser,
			'2',
			'firstName',
			'Jane'
		);
		expect(state.guests).toEqual(stateWithOneUser.guests);
	});
});
