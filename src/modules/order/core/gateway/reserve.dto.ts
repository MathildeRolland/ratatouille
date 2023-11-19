export type ReserveDTO = {
	tableId: string;
	guests: {
		firstName: string;
		lastName: string;
		age: number;
		isOrganizer: boolean;
		meals: {
			entry: string | null;
			mainCourse: string | null;
			dessert: string | null;
			drink: string | null;
		};
	}[];
};
