export namespace OrderingDomainModel {
	export enum Step {
		GUESTS = 0,
		TABLE = 1,
		MEALS = 2,
		SUMMARY = 3,
		RESERVED = 4,
	}

	export enum MealType {
		ENTRY = 'ENTRY',
		MAIN_COURSE = 'MAIN_COURSE',
		DESSERT = 'DESSERT',
		DRINK = 'DRINK',
	}

	export type Form = {
		guests: Guest[];
		organizerId: string | null;
		tableId: string | null;
	};

	export type MealId = string;

	export type Meal = {
		id: MealId;
		title: string;
		type: string;
		requiredAge: number | null;
	};

	export type Guest = {
		id: string;
		firstName: string;
		lastName: string;
		age: number;
		meals: {
			entry: MealId | null;
			mainCourse: MealId | null;
			dessert: MealId | null;
			drink: MealId | null;
		};
	};

	export type Table = {
		id: string;
		title: string;
		capacity: number;
	};

	export type State = {
		step: OrderingDomainModel.Step;
		form: OrderingDomainModel.Form;

		availableTables: {
			status: 'idle' | 'loading' | 'success' | 'error';
			error: string | null;
			data: OrderingDomainModel.Table[];
		};
		availableMeals: {
			status: 'idle' | 'loading' | 'success' | 'error';
			error: string | null;
			data: OrderingDomainModel.Meal[];
		};
		reservation: ReservationStatus;
	};

	export type ReservationStatus =
		| {
				status: 'idle';
		  }
		| { status: 'loading' }
		| { status: 'error'; error: string }
		| { status: 'success' };
}
