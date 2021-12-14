import React from 'react';
import ReactTable from "../../../../components/ReactTable";
const HistoryAssignment = ({data}) => {

    const columns = [
        {
          Header: "Date",
          accessor: "assignedDate",
        },
        {
          Header: "Assigned To",
          accessor: "assignedTo",
        },
        {
          Header: "Assigned By",
          accessor: "assignedBy",
        },
        {
          Header: "Return Date",
          accessor: "returnDate",
        }
      ];

    return (
        <div id="historyAssignmenttbl">
            {data && 
                <ReactTable 
                columns={columns}
                data={data}
                onSort={function noRefCheck() { }}
                onRowClick={function noRefCheck() { }}
              ></ReactTable>
            }
        </div>
    )
}

export default HistoryAssignment
