import Multiselect from "multiselect-react-dropdown";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import Pagination from "react-js-pagination";
import SearchField from "react-search-field";
import { Button, Input } from 'reactstrap';
import requestApi from '../../../api/requestApi';
import Cancelbtn from "../../../components/Button/Cancelbtn";
import Checkbtn from "../../../components/Button/Checkbtn";
import ReactTable from "../../../components/ReactTable";
import YesNoModal from "../../../components/rookiemodal/YesNoModal";


const initialFilter = {
    state: "",
    returnDate: null,
    orderProperty: "",
    desc: true,
    page: 1,
    limit: 5,
    keySearch: "",
    adminId: "00000000-0000-0000-0000-000000000000"
}

const Main = () => {
    const [activePage, setActivePage] = useState();
    const [requestList, setrequestList] = useState()
    const [Filter, setFilter] = useState(initialFilter)
    const [modalIsOpen, setIsOpen] = useState(false);
    const [acceptRequestId, setacceptRequestId] = useState(null)
    const [cancelRequest, setCancelRequest] = useState(null);
    const [assignedDate, onDateChange] = useState(null);
    const [onRefresh, setonRefresh] = useState(false)

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setCancelRequest(null);
        setIsOpen(false);
    }

    const handleCancelRequest = (id) => {
        setCancelRequest(id);
        openModal();
    };
    const handleAccpetRequest = (id) => {
        setacceptRequestId(id)
        setCancelRequest(null);
        openModal();
    }
    const handleConfirmCancelRequest = () => {
        const callCancelRequestApi = async () => {
            try {
                await requestApi.delete(cancelRequest);
                setonRefresh(!onRefresh);
            } catch (error) {
                console.log("Failed to post user: ", error);
            }
        }
        callCancelRequestApi();
        closeModal();
    };
    const handleAcceptRequest = () => {
        const callAcceptRequestApi = async () => {
            try {
                await requestApi.accept(acceptRequestId);
                setonRefresh(!onRefresh);
            } catch (error) {
                console.log("Failed to post user: ", error);
            }
        }
        callAcceptRequestApi();
        closeModal();
    }
    const handleOnSort = (e) => {
        if (e[0])
            setFilter({
                ...Filter,
                orderProperty: e[0].id,
                desc: e[0].desc,
            })
        console.log(e);
    };



    const columns = [
        {
            Header: "No.",
            accessor: "No",
            Cell: ({ row }) => {
                return <div>{row.index + 1}</div>;
            }
        },
        {
            Header: "Asset Code",
            accessor: "assetCode",
        },
        {
            Header: "Asset Name",
            accessor: "assetName",
        },
        {
            Header: "Requested by",
            accessor: "requestedBy",
        },
        {
            Header: "Assigned Date",
            accessor: "assignedDate",
        },
        {
            Header: "Accepted by",
            accessor: "acceptedBy",
        },
        {
            Header: "Returned Date",
            accessor: "returnDate",
        },
        {
            Header: "State",
            accessor: "state",
            Cell: ({ row }) => {
                return <div>{row.original.state === 7 ? "Completed" : "Waiting For Returning"}</div>;
            }
        },
        {
            Header: "Action",
            Cell: ({ row }) => (
                <div className="rookie-group-btn">
                    <Checkbtn
                        onClick={() => handleAccpetRequest(row.original.id)}
                        disabled={row.original.state === 7}
                    />
                    {" "}
                    <Cancelbtn
                        disabled={row.original.state === 7}
                        onClick={() => handleCancelRequest(row.original.id)}
                    />
                </div>
            ),
        },
    ];
    const handleAssignedDateOnClick = (value) => {
        if (value == null) {
            setFilter({ ...Filter, returnDate: null,page:1 })
        }
        else {
            setFilter({ ...Filter, returnDate: new Date(new Date(value).setHours(12, 0, 0, 0)),page:1 })
        }

        onDateChange(value);
        setActivePage(1);
    }
    const onSelect = (selectedList, selectedItem) => {
        setFilter({ ...Filter, state: selectedList.map(x => x.key).join(" "),page:1 });
        setActivePage(1)
    }

    const onRemove = (selectedList, removedItem) => {
        setFilter({ ...Filter, state: selectedList.map(x => x.key).join(" "),page:1 });
        setActivePage(1)
    }
    const onSearchSubmit = (key, value) => {
        setFilter({ ...Filter, keySearch: key,page:1 });
        setActivePage(1);
    }

    const handlePageChange = (pageNumber) => {
        //dispatch(onParamsChange({ ...Params, Page: pageNumber }));
        setFilter({ ...Filter, page: pageNumber });
        setActivePage(pageNumber);
    }

    useEffect(() => {
        const FetchListRequestForReturn = async () => {
            const response = await requestApi.find(Filter);
            console.log(response)
            setrequestList(response)
        }
        FetchListRequestForReturn()
    }, [onRefresh, Filter])
    console.log(requestList)
    return (
        <>
            <div className='titleview'>Request List</div>
            <div id="user-search-filter">
                <div className="user-search-filter-select">
                    <Multiselect
                        placeholder="Filter by State"
                        avoidHighlightFirstOption
                        hidePlaceholder
                        displayValue="cat"
                        onKeyPressFn={function noRefCheck() { }}
                        onRemove={(selectedList, selectedItem) => onRemove(selectedList, selectedItem)}
                        onSearch={function noRefCheck() { }}
                        onSelect={(selectedList, selectedItem) => onSelect(selectedList, selectedItem)}
                        options={[
                            {
                                cat: 'Completed',
                                key: '7'
                            },
                            {
                                cat: 'Waiting For Returning',
                                key: '8'
                            }
                        ]}
                        showCheckbox
                        closeOnSelect={false}
                        style={{
                            chips: {
                                background: 'red'
                            },
                            multiselectContainer: {
                                'width': '175px',
                                'display': 'inline-block'
                            },
                            searchBox: {
                                'borderRadius': '5px',
                                'width': '175px',
                                'height': '39px',
                                'background':
                                    'url(https://i.ibb.co/1mTS0k7/Capture.png) no-repeat right center',
                            }
                        }}
                    />
                    <DatePicker
                        placeholderText="Return Date"
                        selected={assignedDate}
                        onChange={(value) => handleAssignedDateOnClick(value)}
                        wrapperClassName="assign-date-filter"
                        customInput={<Input />}
                        isClearable
                        dateFormat="dd/MM/yyyy"
                        className="calendar-icon"
                        clearButtonTitle = "Clear"
                        clearButtonClassName = "clear-date-button"
                    />
                </div>
                <div id="user-search-filter__right">
                    <SearchField
                        placeholder="Search..."
                        onSearchClick={(key, value) => onSearchSubmit(key, value)}
                        onEnter={(key, value) => onSearchSubmit(key, value)}
                        classNames="test-class"
                    />
                </div>
            </div>
            {requestList !== undefined && requestList.items !== null &&
                <React.Fragment>
                    <ReactTable
                        columns={columns}
                        data={requestList.items}
                        onSort={(e) => handleOnSort(e)}
                        onRowClick={function noRefCheck() { }}
                    ></ReactTable>
                    <Pagination
                        activePage={activePage}
                        itemsCountPerPage={5}
                        totalItemsCount={requestList.totalItems}
                        pageRangeDisplayed={5}
                        hideFirstLastPages={true}
                        prevPageText="Previous"
                        nextPageText="Next"
                        onChange={(e) => handlePageChange(e)}
                    />
                </React.Fragment>
            }
            <YesNoModal
                title={"Are You Sure?"}
                modalIsOpen={modalIsOpen}
                closeModal={closeModal}
            //customStyles={customStyles}
            >
                {cancelRequest ? (
                    <>
                        <div>Do you want to cancel this returning request?</div>
                        <Button color="danger" onClick={() => handleConfirmCancelRequest()}>
                            Yes
                        </Button>
                        {" "}
                        <Button color="btn btn-outline-secondary" onClick={() => closeModal()}>
                            No
                        </Button>
                    </>
                ) :
                    <>
                        <div>Do you want to mark this returning request as 'Completed'?</div>
                        <Button color="danger" onClick={() => handleAcceptRequest()}>
                            Yes
                        </Button>
                        {" "}
                        <Button color="btn btn-outline-secondary" onClick={() => closeModal()}>
                            No
                        </Button>
                    </>}
            </YesNoModal>
        </>
    );
};

export default Main
