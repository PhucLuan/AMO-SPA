import React, { useState } from "react";
import { JsonTable } from 'react-json-to-html';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import assignmentApi from '../../../../api/assignmentApi';
import userApi from '../../../../api/userApi';
import Editbtn from "../../../../components/Button/Editbtn";
import Xcirclebtn from "../../../../components/Button/Xcirclebtn";
import ReactTable from "../../../../components/ReactTable";
import RookieModal from "../../../../components/rookiemodal/RookieModal";
import YesNoModal from "../../../../components/rookiemodal/YesNoModal";
import { onListChange } from '../../userSlice';


const UserTable = ({ listitem, onEditMode, setParams }) => {

  const dispatch = useDispatch();
  const Params = useSelector(state => state.user.Params);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [relateModalIsOpen, setRelateIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteIsOpen] = useState(false);
  const [userInfor, setUserInfor] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);
  const history = useHistory();

  function openDeleteModal() {
    setDeleteIsOpen(true);
  }

  function closeDeleteModal() {
    closeModal();
    setDeleteIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setUserInfor(null);
    setDeleteUser(null);
    setIsOpen(false);
  }
  function openRelateModal() {
    setRelateIsOpen(true);
  }
  function closeRelateModal() {
    closeModal();
    setRelateIsOpen(false);
  }
  const customStyles = {
    content: {
      top: '30%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    },
  };
  const handleDisableUser = async (id) => {
    setDeleteUser(id);
    setUserInfor(null);
    if((await assignmentApi.checkRelation(id)) === true){
      openRelateModal();
    }else{
      openDeleteModal();
    } 
  }

  const handleConfirmDisableUser = async () => {
    try {
      await userApi.delete(deleteUser) ;
      dispatch(onListChange());
    } catch (error) {
      console.log('Failed to post user: ', error);
    }
    closeDeleteModal();
  }


  const capitalize1st = s => s && s[0].toUpperCase() + s.slice(1);

  const handleOnSort = (e) => {
    if (e[0]) setParams({ ...Params, propertyName: capitalize1st(e[0].id), desc: e[0].desc });
    console.log("called");
  }

  const handleRowClick = (dataRow) => {
    const codeStaff = dataRow.codeStaff == null ? 'Code unavailable' : dataRow.codeStaff;
    setUserInfor({
      'Staff Code': codeStaff,
      'Full Name': dataRow.fullName,
      'User Name': dataRow.userName,
      'Joined Date': dataRow.joinedDate,
      'Birth Day': dataRow.dateOfBirth,
      'Location': dataRow.location,
      'Gender': dataRow.gender,
      'Type': dataRow.type
    });
    openModal();
  }

  const columns = [
    {
      Header: "Staff Code",
      accessor: "codeStaff",
    },
    {
      Header: "Full Name",
      accessor: "fullName",
    },
    {
      Header: "Username",
      accessor: "userName",
    },
    {
      Header: "Joined Date",
      accessor: "joinedDate",
    },
    {
      Header: "Type",
      accessor: "type",
    },
    {
      Header: "Action",
      Cell: ({ row }) => (
        <div className="rookie-group-btn">
          <Editbtn 
            onClick={() => history.push(`/manageuser/${row.original.id}`)}
            disabled={false}
          />          
          <Xcirclebtn
            onClick={() =>
              handleDisableUser(row.original.id)
            }
            disabled={false}
          />
        </div>
      ),
    },
  ]

  return (
    <>
      <ReactTable columns={columns} data={listitem} onSort={(e) => handleOnSort(e)} onRowClick={(e) => handleRowClick(e)}></ReactTable>
      {deleteUser ?
        <YesNoModal
          title={"Are You Sure?"}
          modalIsOpen={deleteModalIsOpen}
          closeModal={closeDeleteModal}
          customStyles={customStyles}>
          <div style={{ 'paddingTop': '10px', 'paddingBottom': '20px' }}>
            <p>Do you want to disable this user?</p>
            <Button
              color="danger"
              onClick={() =>
                handleConfirmDisableUser()
              }
            >
              Delete
            </Button>
            <Button onClick={() => closeDeleteModal()} id='cancelUserBtn'>Cancel</Button>
          </div>
        </YesNoModal> :
        <RookieModal
          title={"User Details"}
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          customStyles={customStyles}>
          {userInfor ? <JsonTable json={userInfor} /> : ""}

        </RookieModal>
      }
      <RookieModal
        title="Can not disable user"
        modalIsOpen={relateModalIsOpen}
        closeModal={closeRelateModal}
        customStyles={customStyles}>
        <div style={{ 'marginBottom': '27px', 'marginTop': '35px' }}>
          <p style={{ 'marginBottom': '0px', 'marginTop': '15px', 'textAlign': 'center' }}>There are valid assignment belonging to this user.</p> 
          <p style={{ 'textAlign': 'center' }}>Please close all assignments before disabling user.</p>
        </div>
      </RookieModal>
    </>
  );
};

export default UserTable;