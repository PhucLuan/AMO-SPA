import React, { useEffect, useState } from "react";
import SearchField from "react-search-field";
import { Button, Input } from "reactstrap";
import assetApi from "../../../../api/assetApi";
import ReactTable from "../../../../components/ReactTable";


const AvailableAssetList = ({onSelectValue, checked, onSave, currentValue}) => {
    const [listSelector, setListSelector] = useState();
    const [Params, setParams] = useState(    
    {
      OrderProperty: 'code',
      Desc: true,
      Page: 1,
      Limit: 10
    });

    
    useEffect(() => {
      const getList = async() =>{
        setListSelector(await assetApi.findAvailable(Params));
      }
      getList();
    }, [Params]);

    const handleOnSort = (e) => {
      if(e[0]) setParams({...Params, OrderProperty: e[0].id, Desc:e[0].desc });
    }

    const setInputValue = (e) =>{
      onSelectValue(e.id, e.name);
    }

    const onSearchSubmit = (key, value) => {
      setParams({ ...Params, KeySearch: key });
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
        Header: "Asset Code",
        accessor: "code",
      },
      {
        Header: "Asset Name",
        accessor: "name",
      },
      {
        Header: "Category",
        accessor: "categoryName",
      }
    ]

  return (
      listSelector?
        <>
         <div className = "title-list-pop-up">Asset List</div>
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

export default AvailableAssetList;