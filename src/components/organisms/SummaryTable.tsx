import React, { useEffect, useMemo, useState } from 'react';
import { CountrySummary, TotalSummary } from '../../types/summary';
import DataGrid, { FormatterProps, SortColumn } from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import FilterRenderer, { FilterContext } from '../molecules/FilterRenderer';
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

type Comparator = (a: CustomCountrySummary, b: CustomCountrySummary) => number;
const getComparator = (column: string): Comparator => {
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
};

const SummaryTable = ({ data }: MyProps) => {
  const [rows] = useState<CustomCountrySummary[]>(
    data['Countries'].map((item, index) => ({
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
    }))
  );
  const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([]);
  const [filters, setFilters] = useState<Filter>({
    complete: undefined,
    enabled: true,
    Country: '',
  });
  const [combinedRows, setCombinedRows] = useState<CustomCountrySummary[]>([]);
  const columns = [
    { key: 'Index', name: '#', headerCellClass: 'box-border border-b-2 border-r-2' },
    {
      key: 'Country',
      name: 'Country',
      headerCellClass: 'leading-8 box-border border-b-2 border-r-2',
      headerRenderer: (props: any) => (
        <FilterRenderer<CustomCountrySummary, unknown, HTMLInputElement> {...props}>
          {({ filters, ...rest }) => (
            <input
              {...rest}
              value={filters['Country']}
              className="w-auto h-8 px-2 border-2 rounded-lg font-thin"
              maxLength={30}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  Country: e.target.value,
                })
              }
              onKeyDown={(e) => ['ArrowLeft', 'ArrowRight'].includes(e.key) && e.stopPropagation()}
            />
          )}
        </FilterRenderer>
      ),
    },
    { key: 'NewConfirmed', name: 'New Confirmed', headerCellClass: 'box-border border-b-2 border-r-2' },
    { key: 'TotalConfirmed', name: 'Total Confirmed', headerCellClass: 'box-border border-b-2 border-r-2' },
    { key: 'NewDeaths', name: 'New Deaths', headerCellClass: 'box-border border-b-2 border-r-2' },
    { key: 'TotalDeaths', name: 'Total Deaths', headerCellClass: 'box-border border-b-2 border-r-2' },
    { key: 'NewRecovered', name: 'New Recovered', headerCellClass: 'box-border border-b-2 border-r-2' },
    { key: 'TotalRecovered', name: 'Total Recovered', headerCellClass: 'box-border border-b-2' },
  ];

  useEffect(() => {
    setCombinedRows(rows);
  }, []);

  useEffect(() => {
    combineRows();
  }, [filters, sortColumns]);

  const handleSort = useMemo((): readonly CustomCountrySummary[] => {
    if (sortColumns.length === 0) return rows;

    return [...rows].sort((a, b) => {
      for (const sort of sortColumns) {
        const comparator = getComparator(sort.columnKey);
        const result = comparator(a, b);

        if (result !== 0) {
          return sort.direction === 'ASC' ? result : -result;
        }
      }

      return 0;
    });
  }, [rows, sortColumns]);

  const handleFilter = useMemo((): readonly CustomCountrySummary[] => {
    return rows.filter((row) => {
      return row['Country'].toLowerCase().startsWith(filters.Country.toLowerCase());
    });
  }, [rows, filters]);

  const combineRows = () => {
    const sortedRows = handleSort;
    const filteredRows = handleFilter;
    const combinedRows = sortedRows.filter((row) => filteredRows.includes(row));

    setCombinedRows(combinedRows);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <FilterContext.Provider value={filters}>
        <DataGrid
          className="rdg-light w-5/6 h-full border-2"
          headerRowHeight={80}
          rows={combinedRows}
          rowClass={(row) => `hover:bg-blue-100 ${combinedRows.indexOf(row) % 2 === 0 ? 'bg-neutral-100' : ''}`}
          rowHeight={50}
          columns={columns}
          sortColumns={sortColumns}
          onSortColumnsChange={setSortColumns}
          defaultColumnOptions={{
            sortable: true,
            formatter: (e: FormatterProps<CustomCountrySummary>) => {
              if (e.column.key === 'Country') {
                return <CountryNameWithFlag countryCode={e.row['CountryCode']} countryName={e.row['Country']} countrySlug={e.row['Slug']} />;
              }

              return e.row[e.column.key];
            },
          }}
        />
      </FilterContext.Provider>
    </div>
  );
};

export default SummaryTable;
