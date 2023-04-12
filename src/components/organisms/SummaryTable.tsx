import React, { Component } from 'react';
import { CountrySummary, TotalSummary } from '../../types/summary';
import DataGrid, { SortColumn } from 'react-data-grid';
import 'react-data-grid/lib/styles.css';

interface MyProps {
  data: TotalSummary;
}

interface CustomCountrySummary extends CountrySummary {
  Index: number;
  CountryWithFlag: JSX.Element;
}

interface MyState {
  rows: CustomCountrySummary[];
  sortColumns: readonly SortColumn[];
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
  static columns = [
    { key: 'Index', name: '#' },
    { key: 'CountryWithFlag', name: 'Country' },
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
        CountryWithFlag: (
          <div className="flex items-center justify-start gap-3">
            <img src={`https://flagcdn.com/20x15/${item['CountryCode'].toLowerCase()}.png`} width="20" height="15" alt={item['Country']} />
            <p>{item['Country']}</p>
          </div>
        ),
        ...item,
      })),
      sortColumns: [],
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
        <DataGrid
          className="rdg-light w-5/6 h-full border-2"
          rows={this.sortedRows()}
          rowClass={(row) => `hover:bg-blue-100 ${row.Index % 2 === 0 ? 'bg-neutral-100' : ''}`}
          onCellClick={(cell) => console.log(cell.row['Slug'])}
          columns={SummaryTable.columns}
          sortColumns={this.state.sortColumns}
          onSortColumnsChange={this.setSortColumns}
          defaultColumnOptions={{ sortable: true }}
        />
      </div>
    );
  }
}

export default SummaryTable;
