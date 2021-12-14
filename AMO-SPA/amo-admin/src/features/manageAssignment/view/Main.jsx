import Multiselect from 'multiselect-react-dropdown';
import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import Pagination from "react-js-pagination";
import { Link } from 'react-router-dom';
//import { useDispatch } from 'react-redux';
import SearchField from "react-search-field";
import { Button, Input } from "reactstrap";
import assignmentApi from '../../../api/assignmentApi';
import AssignmentTable from '../components/AssignmentList/AssignmentTable';

const initialParams = {
    OrderProperty: 'UpdatedDate',
    Desc: true,
    Page: 1,
    Limit: 5
};
const Main = () => {
    const [activePage, setActivePage] = useState();
    const [assignmentList, setAssignmentList] = useState();
    const [assignedDate, onDateChange] = useState(null);
    const [isRefresh, setisRefresh] = useState(false);
    const [Params, setParams] = useState(initialParams)
    //const dispatch = useDispatch();
    //const Params = useSelector(state => state.assignment.Params);

    const mapState = (object) => {
        if (object) {
            const listItem = (object.items.map(x => {
                if (x.state === 2) {
                    x.state = 'Accepted';
                } else {
                    x.state = 'Waiting for accept';
                }
                return x;
            }));

            return { ...object, items: listItem };
        }
        return null;
    }
    const handleAssignedDateOnClick = (value) => {
        if (value == null) {
            //dispatch(onParamsChange({ ...Params, AssignedDate: null }));
            setParams({ ...Params, AssignedDate: null,Page:1 });
        } else {
            //dispatch(onParamsChange({ ...Params, AssignedDate: new Date(new Date(value).setHours(12, 0, 0, 0)) }));
            setParams({ ...Params, AssignedDate: new Date(new Date(value).setHours(12, 0, 0, 0)), Page:1 });
        }
        onDateChange(value);
        setActivePage(1)
    }

    const handlePageChange = (pageNumber) => {
        //dispatch(onParamsChange({ ...Params, Page: pageNumber }));
        setParams({ ...Params, Page: pageNumber });
        setActivePage(pageNumber);
    }

    const onSelect = (selectedList, selectedItem) => {
        //dispatch(onParamsChange({ ...Params, State: selectedList.map(x => x.key).join(" ") }));
        setParams({ ...Params, State: selectedList.map(x => x.key).join(" "),Page:1 });
        setActivePage(1)
    }

    const onRemove = (selectedList, removedItem) => {
        //dispatch(onParamsChange({ ...Params, State: selectedList.map(x => x.key).join(" ") }));
        setParams({ ...Params, State: selectedList.map(x => x.key).join(" "),Page:1 });
        setActivePage(1)
    }

    const onSearchSubmit = (key, value) => {
        //dispatch(onParamsChange({ ...Params, KeySearch: key }));
        setParams({ ...Params, KeySearch: key,Page:1 });
        setActivePage(1);
    }
    const handleonRefresh = () => {
        setisRefresh(!isRefresh)
    }
    useEffect(() => {
        const fetchAssignments = async () => {
            setAssignmentList(mapState(await assignmentApi.getAll(Params)));
        }
        fetchAssignments();

    }, [isRefresh, Params]);
    return (
        <div id='user-listing'>
            <div className='titleview'>Assignment List</div>
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
                                cat: 'Waiting Accept',
                                key: '3'
                            },
                            {
                                cat: 'Accepted',
                                key: '2'
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
                        placeholderText="Assigned Date"
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
                    {'  '}
                    <Button
                        color="danger"
                        id="add-assignment-btn"
                    >
                        <Link className="btn-user-text" to="/manageassignment/add">Add New Assignment</Link>
                    </Button>
                </div>
            </div>
            {assignmentList &&
                <>
                    <AssignmentTable listitem={assignmentList.items} onRefresh={handleonRefresh} setParams={setParams} Params={Params} />
                    <Pagination
                        activePage={activePage}
                        itemsCountPerPage={5}
                        totalItemsCount={assignmentList.totalItems}
                        pageRangeDisplayed={5}
                        hideFirstLastPages={true}
                        prevPageText="Previous"
                        nextPageText="Next"
                        onChange={(e) => handlePageChange(e)}
                    />
                </>
            }

        </div>
    )
}

export default Main
