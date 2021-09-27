import { getResultsColumns, getResultsRows } from './helper';

describe('getResultsColumns', () => {
    it('should get correct columns data', () => {
        const result = getResultsColumns();
        const outcome = [
            { field: 'name', headerName: 'Name', width: 500 },
            {
                field: 'country',
                headerName: 'Country',
                width: 300,
                editable: true,
            },
            {
                field: 'web',
                headerName: 'Website',
                width: 300,
                editable: true,
            },
        ]
        expect(result).toEqual(outcome);
    });
});

describe('getResultsRows', () => {
    it('should get correct rows data', () => {
        const param = [{
            name: 'name1',
            country: 'country1',
            web_pages: 'web_pages1'
        }, {
            name: 'name2',
            country: 'country2',
            web_pages: 'web_pages2'
        }]
        const result = getResultsRows(param);
        const outcome = [{
            id: 0,
            name: 'name1',
            country: 'country1',
            web: 'web_pages1'
        }, {
            id: 1,
            name: 'name2',
            country: 'country2',
            web: 'web_pages2'
        }]
        expect(result).toEqual(outcome);
    });
});