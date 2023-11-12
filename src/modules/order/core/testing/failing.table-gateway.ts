import { ITableGateway } from '@ratatouille/modules/order/core/gateway/table.gateway';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';

export class FailingTableGateway implements ITableGateway {
	async getTables(): Promise<OrderingDomainModel.Table[]> {
		throw new Error('Failed to fetch data');
	}
}
