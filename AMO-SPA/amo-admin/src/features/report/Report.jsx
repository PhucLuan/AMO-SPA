import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import reportApi from '../../api/reportApi';
import ReactTable from '../../components/ReactTable';

const Report = () => {

    const [report, setreport] = useState()
    const user = localStorage.getItem("user");

    const config = {
      headers: { Authorization: `Bearer ${JSON.parse(user).access_token}` },
      responseType: 'blob'
  };
    const handleClickExport = () => {
        axios.get(
          `${process.env.REACT_APP_API_URL_END_POINT}api/Report/ExportReport`,
          config
        )
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'AMOReport.xlsx');
                document.body.appendChild(link);
                link.click();
            }).catch(e => console.log(e));
    }

    useEffect(() => {
        const feactReportData = async () => {
            const res = await reportApi.getReport();
            setreport(res);
        }
        feactReportData();
    }, [])

    const columns = [
        {
          Header: "Category",
          accessor: "categoryName",
        },
        {
          Header: "Total",
          accessor: "total",
        },
        {
          Header: "Assigned",
          accessor: "assigned",
        },
        {
          Header: "Available",
          accessor: "available",
        }
        ,
        {
          Header: "Not Available",
          accessor: "notAvailable",
        },
        {
            Header: "Waiting For Recycle",
            accessor: "waitingForRecycle",
          },
          {
            Header: "Recycled",
            accessor: "recycled",
          }
      ];

    return (
        <div>
            <div className="titleview">Report</div>
            <Button className="btn-danger" onClick={() => handleClickExport()} style={{float:'right'}}>Export</Button>
            {report && 
            <ReactTable
                columns={columns}
                data={report}
                onSort={function noRefCheck() { }}
                onRowClick={function noRefCheck() {}}
            ></ReactTable>}
        </div>
    )
}

export default Report
