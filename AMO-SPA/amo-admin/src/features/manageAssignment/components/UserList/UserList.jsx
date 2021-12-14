import React, { useEffect, useState } from "react";
import SearchField from "react-search-field";
import { Button, Input } from "reactstrap";
import userApi from "../../../../api/userApi";
import ReactTable from "../../../../components/ReactTable";


const UserList = ({onSelectValue, checked, onSave, currentValue}) => {
    const [listSelector, setListSelector] = useState();
    const [Params, setParams] = useState(    
    {
      propertyName: 'StaffCode',
      desc: true,
      page: 1,
      limit: 10
    });

    const capitalize1st = s => s && s[0].toUpperCase() + s.slice(1);
    
    useEffect(() => {
      const getList = async() =>{
        setListSelector(await userApi.getAll(Params));
      }
      getList();
    }, [Params]);

    const handleOnSort = (e) => {
      if(e[0]) setParams({...Params, propertyName:capitalize1st(e[0].id), desc:e[0].desc });
    }

    const setInputValue = (e) =>{
      onSelectValue(e.id, e.fullName);
    }

    const onSearchSubmit = (key, value) => {
      setParams({ ...Params, search: key });
    }

    const columns = [
      {
        Header: " ",
        Cell: ({ row }) => (
          <>
            <Input type='radio' name='select' onChange = {() => setInputValue(row.original)} checked = {checked === row.original.id}/>
          </>
        ),
      },
      {
        Header: "Staff Code",
        accessor: "codeStaff",
      },
      {
      Header: "Full Name",
      accessor: "fullName",
      },
      {
        Header: "Type",
        accessor: "type",
      }
    ]

  return (
      listSelector?
        <>
         <div className = "title-list-pop-up">User List</div>
          <SearchField
            placeholder="Search..."
            onSearchClick={(key, value) => onSearchSubmit(key, value)}
            onEnter={(key, value) => onSearchSubmit(key, value)}
            classNames="search-list-pop-up"
          />
          <ReactTable 
            columns={columns} 
            data={listSelector.items} 
            onSort={(e) => handleOnSort(e)}  
            onRowClick={(e) => (e)}
          />
          <div style= {{'height':'38px'}}>
              <Button
                color="danger"
                onClick = {onSave}
                disabled = {currentValue === checked}
                style ={{'float':'right'}}
              >
                Save
              </Button>
          </div>
        </>:''
  );
};

export default UserList;