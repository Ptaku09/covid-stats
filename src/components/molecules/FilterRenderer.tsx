import React, { createContext, ReactElement, RefObject, useContext } from 'react';
import { HeaderRendererProps, useFocusRef } from 'react-data-grid';
import { Filter } from '../organisms/SummaryTable';

export const FilterContext = createContext<Filter | undefined>(undefined);

function FilterRenderer<R, SR, T extends HTMLOrSVGElement>({
  isCellSelected,
  column,
  children,
}: HeaderRendererProps<R, SR> & {
  children: (args: { ref: RefObject<T>; tabIndex: number; filters: Filter }) => ReactElement;
}) {
  const filters = useContext(FilterContext)!;
  const { ref, tabIndex } = useFocusRef<T>(isCellSelected);

  return (
    <>
      <div>{column.name}</div>
      {filters.enabled && <div>{children({ ref, tabIndex, filters })}</div>}
    </>
  );
}

export default FilterRenderer;
