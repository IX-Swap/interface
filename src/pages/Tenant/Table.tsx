import React from 'react';

interface TableProps {
  dataSource: any[];
  columns: { title: string; dataIndex: string; render?: (item: any) => React.ReactNode }[];
}

const Table: React.FC<TableProps> = ({ dataSource, columns }) => {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.dataIndex}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSource.map((item, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.dataIndex}>
                  {column.render ? column.render(item) : item[column.dataIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;