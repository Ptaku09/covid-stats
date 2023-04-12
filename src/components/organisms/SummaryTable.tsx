import React, { Component } from 'react';
import { CountrySummary, TotalSummary } from '../../types/summary';
import DataGrid, { FormatterProps, SortColumn } from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import FilterRendererWithHooks, { FilterContext } from '../utils/FileRendererWithHooks';
import CountryNameWithFlag from '../atoms/CountryNameWithFlag';

interface MyProps {
  data: TotalSummary;
}

interface CustomCountrySummary extends Omit<CountrySummary, 'ID' | 'Date' | 'Premium'> {
  [key: string]: string | number;
  Index: number;
}

export interface Filter extends Pick<CustomCountrySummary, 'Country'> {
  complete: number | undefined;
  enabled: boolean;
}

interface MyState {
  rows: CustomCountrySummary[];
  sortColumns: readonly SortColumn[];
  filters: Filter;
}

type Comparator = (a: CustomCountrySummary, b: CustomCountrySummary) => number;
function getComparator(column: string): Comparator {
  switch (column) {
    case 'Country':
      return (a, b) => a['Country'].localeCompare(b['Country']);
    case 'Index':
    case 'NewConfirmed':
    case 'TotalConfirmed':
    case 'NewDeaths':
    case 'TotalDeaths':
    case 'NewRecovered':
    case 'TotalRecovered':
      return (a, b) => a[column] - b[column];
    default:
      return (a, b) => 0;
  }
}

class SummaryTable extends Component<MyProps, MyState> {
  columns = [
    { key: 'Index', name: '#' },
    {
      key: 'Country',
      name: 'Country',
      headerCellClass: 'leading-9 p-0 h-36 flex items-center justify-center flex-col bg-red-100',
      headerRenderer: (props: any) => (
        <FilterRendererWithHooks<CustomCountrySummary, unknown, HTMLInputElement> {...props}>
          {({ filters, ...rest }) => (
            <input
              {...rest}
              value={filters['Country']}
              className="w-5/6 h-8 p-3 border-2 rounded-lg"
              maxLength={30}
              onChange={(e) =>
                this.setState({
                  filters: {
                    ...filters,
                    Country: e.target.value,
                  },
                })
              }
              onKeyDown={(e) => ['ArrowLeft', 'ArrowRight'].includes(e.key) && e.stopPropagation()}
            />
          )}
        </FilterRendererWithHooks>
      ),
    },
    { key: 'NewConfirmed', name: 'New Confirmed' },
    { key: 'TotalConfirmed', name: 'Total Confirmed' },
    { key: 'NewDeaths', name: 'New Deaths' },
    { key: 'TotalDeaths', name: 'Total Deaths' },
    { key: 'NewRecovered', name: 'New Recovered' },
    { key: 'TotalRecovered', name: 'Total Recovered' },
  ];

  constructor(props: MyProps) {
    super(props);
    this.state = {
      rows: props.data['Countries'].map((item, index) => ({
        Index: index + 1,
        Country: item['Country'],
        CountryCode: item['CountryCode'],
        Slug: item['Slug'],
        NewConfirmed: item['NewConfirmed'],
        TotalConfirmed: item['TotalConfirmed'],
        NewDeaths: item['NewDeaths'],
        TotalDeaths: item['TotalDeaths'],
        NewRecovered: item['NewRecovered'],
        TotalRecovered: item['TotalRecovered'],
      })),
      sortColumns: [],
      filters: {
        complete: undefined,
        enabled: true,
        Country: '',
      },
    };
  }

  sortedRows() {
    if (this.state.sortColumns.length === 0) {
      return this.state.rows;
    }

    return [...this.state.rows].sort((a, b) => {
      for (const sort of this.state.sortColumns) {
        const comparator = getComparator(sort.columnKey);
        const result = comparator(a, b);

        if (result !== 0) {
          return sort.direction === 'ASC' ? result : -result;
        }
      }

      return 0;
    });
  }

  setSortColumns = (sortColumns: readonly SortColumn[]) => {
    this.setState({ sortColumns });
  };

  render() {
    return (
      <div className="w-full h-screen flex items-center justify-center py-10">
        <FilterContext.Provider value={this.state.filters}>
          <DataGrid
            className="rdg-light w-5/6 h-full border-2"
            rows={this.sortedRows()}
            rowClass={(row) => `hover:bg-blue-100 ${row.Index % 2 === 0 ? 'bg-neutral-100' : ''}`}
            onCellClick={(cell) => console.log(cell.row['Slug'])}
            columns={this.columns}
            sortColumns={this.state.sortColumns}
            onSortColumnsChange={this.setSortColumns}
            defaultColumnOptions={{
              sortable: true,
              formatter: (e: FormatterProps<CustomCountrySummary>) => {
                if (e.column.key === 'Country') {
                  return <CountryNameWithFlag countryCode={e.row['CountryCode']} countryName={e.row['Country']} />;
                }

                return e.row[e.column.key];
              },
            }}
          />
        </FilterContext.Provider>
      </div>
    );
  }
}

export default SummaryTable;
