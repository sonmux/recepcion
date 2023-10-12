import { useMemo } from "react";

function SliderColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id }
}) {
  // Calculate the min and max
  // using the preFilteredRows

  const [min, max] = useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <>
      <input
        type="range"
        min={min}
        max={max}
        value={filterValue || min}
        onChange={(e) => {
          setFilter(parseInt(e.target.value, 10));
        }}
      />
      <button onClick={() => setFilter(undefined)}>Off</button>
    </>
  );
}

/*export default function useColumns() {
  const columns = useMemo(
    () => [
      {
        Header: "Brand",
        accessor: "brand"
      },
      {
        Header: "Model",
        accessor: "model"
      },
      {
        Header: "Segment",
        accessor: "segment"
      },
      {
        Header: "Year",
        accessor: "year",
        Filter: SliderColumnFilter,
        filter: "equals"
      }
    ],
    []
  );

  return columns;
}*/

export default function useColumns() {
  const columns = useMemo(
    () => [
      {
        Header: "Tipo",
        accessor: "tipo"
      },
      {
        Header: "Descripcion",
        accessor: "descripcion"
      },
      {
        Header: "Serie",
        accessor: "serie"
      },
      {
        Header: "Marca",
        accessor: "marca"
      },
      {
        Header: "Modelo",
        accessor: "modelo"
      },
      {
        Header: "Cantidad",
        accessor: "cantidad",
      }
    ],
    []
  );

  return columns;
}
