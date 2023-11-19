import { IIDProvider } from '@ratatouille/modules/core/idProvider';

export class StubIDProvider implements IIDProvider {
	generate(): string {
		return '1';
	}
}
