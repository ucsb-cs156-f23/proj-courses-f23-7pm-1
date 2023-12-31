import React, { Fragment } from "react";
import { useTable, useExpanded } from "react-table";
import { Table } from "react-bootstrap";

export default function InstructorSearchTableBase({
  columns,
  data,
  testid = "testid",
}) {
  // Stryker disable next-line ObjectLiteral
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        // Stryker disable next-line all
        initialState: {
          hiddenColumns: ["isSection"],
        },
        columns,
        data,
      },
      useExpanded,
    );

  return (
    <Table {...getTableProps()} striped bordered hover>
      <thead key="thead">
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()} key="tbody">
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell, _index) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    data-testid={`${testid}-cell-row-${cell.row.index}-col-${cell.column.id}`}
                    style={{
                      background: "#34859b",
                      color: "#effcf4",
                      fontWeight: "bold",
                    }}
                  >
                    {cell.render("Cell")}
                    <></>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
