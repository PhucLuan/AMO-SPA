import Multiselect from 'multiselect-react-dropdown';
import React, { useEffect, useState } from 'react';
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchField from "react-search-field";
import { Button } from "reactstrap";
import userApi from '../../../api/userApi';
import UserTable from '../components/UserList/UserTable';
import { fetchUsersPaging } from '../userSlice';

const Main = () => {
    const [activePage, setActivePage] = useState();
    const dispatch = useDispatch();
    const [Params, setParams] = useState({
        propertyName: 'LastModified',
        desc: true,
        page: 1
    });
    const listChange = useSelector(state => state.user.listChange);
    useEffect(() => {
        const fetchUsers = async () => {
            dispatch(fetchUsersPaging(await userApi.getAll(Params)));
        }
        fetchUsers();
    }, [listChange, Params, dispatch]);

    const handlePageChange = (pageNumber) => {
        setParams({ ...Params, page: pageNumber });
        setActivePage(pageNumber);
    }

    const onSelect = (selectedList, selectedItem) => {
        setParams({ ...Params, Type: selectedList.map(x => x.key).join(" "),page:1 });
        setActivePage(1);
    }

    const onRemove = (selectedList, removedItem) => {
        setParams({ ...Params, Type: selectedList.map(x => x.key).join(" "),page:1 });
        setActivePage(1);
    }

    const onSearchSubmit = (key, value) => {
        setParams({ ...Params, Search: key,page:1 });
        setActivePage(1);
    }

    const userPaging = useSelector(state => state.user.usersPaging);
    return (
        <div id='user-listing'>
            <div className='titleview'>User List</div>
            <div id="user-search-filter">
                <Multiselect
                    placeholder="Filter by Type"
                    avoidHighlightFirstOption
                    hidePlaceholder
                    displayValue="cat"
                    onKeyPressFn={function noRefCheck() { }}
                    onRemove={(selectedList, selectedItem) => onRemove(selectedList, selectedItem)}
                    onSearch={function noRefCheck() { }}
                    onSelect={(selectedList, selectedItem) => onSelect(selectedList, selectedItem)}
                    options={[
                        {
                            cat: 'Staff',
                            key: 'Staff'
                        },
                        {
                            cat: 'Administrator',
                            key: 'Admin'
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
                        id="add-user-btn"
                    >
                        <Link className="btn-user-text" to="/manageuser/add">Add new user</Link>
                    </Button>
                </div>
            </div>
            {userPaging !== undefined && (
                <>
                    <UserTable setParams = {setParams} listitem={userPaging.items}></UserTable>
                    <Pagination
                        activePage={activePage}
                        itemsCountPerPage={3}
                        totalItemsCount={userPaging.totalItems}
                        pageRangeDisplayed={5}
                        hideFirstLastPages={true}
                        prevPageText="Previous"
                        nextPageText="Next"
                        onChange={(e) => handlePageChange(e)}
                    />
                </>
            )}

        </div>
    )
}

export default Main
