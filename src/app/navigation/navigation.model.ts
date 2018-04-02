import { FuseNavigationModelInterface } from '../core/components/navigation/navigation.model';

export class FuseNavigationModel implements FuseNavigationModelInterface
{
    public model: any[];

    constructor()
    {
        this.model = [
            {
                'id'       : 'applications',
                'title'    : 'Pages',
                'translate': 'NAV.APPLICATIONS',
                'type'     : 'group',
                'icon'     : 'apps',
                'children' : [
                    {
                        'id'       : 'academy',
                        'title'    : 'Exchanges',
                        'translate': 'NAV.ACADEMY',
                        'type'     : 'item',
                        'icon'     : 'attach_money',
                        'url'      : '/my-components/exchanges'
                    },
                    {
                        'id'       : 'academy',
                        'title'    : 'Order book',
                        'translate': 'NAV.ACADEMY',
                        'type'     : 'item',
                        'icon'     : 'book',
                        'url'      : '/my-components/order-book'
                    },
                    {
                        'id'       : 'balance',
                        'title'    : 'Balance',
                        'translate': 'NAV.ACADEMY',
                        'type'     : 'item',
                        'icon'     : 'account_balance_wallet',
                        'url'      : '/my-components/balance'
                    }
                ]
            },
        ];
    }
}

