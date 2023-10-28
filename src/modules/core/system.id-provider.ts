import { IIDProvider } from '@ratatouille/modules/core/idProvider';
import { nanoid } from 'nanoid';

export class SystemIDProvider implements IIDProvider {
	generate(): string {
		return nanoid();
	}
}
