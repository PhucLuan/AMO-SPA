import React, { useState } from "react";
import { JsonTable } from "react-json-to-html";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";
import assignmentApi from "../../../../api/assignmentApi";
import requestApi from "../../../../api/requestApi";
import Arrowcircle from "../../../../components/Button/Arrowcircle";
import Checkbtn from "../../../../components/Button/Checkbtn";
import Xcirclebtn from "../../../../components/Button/Xcirclebtn";
import ReactTable from "../../../../components/ReactTable";
import RookieModal from "../../../../components/rookiemodal/RookieModal";
import YesNoModal from "../../../../components/rookiemodal/YesNoModal";
import { ParseDateTime } from "../../../../utils/ParseDateTime";
import { onListChange } from "../../homeSlice";

const HomeTable = ({ listitem, onRefresh }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.profile["sub"];
  const [modalIsOpen, setIsOpen] = useState(false);
  const [yesnomodalIsOpen, yesnosetIsOpen] = useState(false);
  const [assignInfor, setAssignInfor] = useState(null);
  const [requestReturn, setRequestReturn] = useState(null);
  const [acceptAssign, setAcceptAssign] = useState(null);
  const [rejectAssign, setRejectAssign] = useState(null);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setAssignInfor(null);
    setAcceptAssign(null);
    setRejectAssign(null);
    setRequestReturn(null);
    setIsOpen(false);
  }

  function openyesnoModal() {
    yesnosetIsOpen(true);
  }

  function closeyesnoModal() {
    setAssignInfor(null);
    setAcceptAssign(null);
    setRejectAssign(null);
    setRequestReturn(null);
    yesnosetIsOpen(false);
  }

  const handleRowClick = (dataRow) => {
    const code =
      dataRow.assetCode == null ? "Is unavailable" : dataRow.assetCode;
    console.log(dataRow);
    setAssignInfor({
      "Asset Code": code,
      "Asset Name": dataRow.assetName,
      Specification: dataRow.specification,
      "Assigned to": dataRow.assignedTo,
      "Assigned by": dataRow.assignedBy,
      "Assigned Date": ParseDateTime(dataRow.assignedDate),
      State: dataRow.stateName,
      Note: dataRow.note,
    });
    openModal();
  };

  const handleAcceptAssign = (e, id) => {
    e.stopPropagation();
    setAcceptAssign(id);
    setAssignInfor(null);
    openyesnoModal();
  };

  const handleDeclineAssign = (e, id) => {
    e.stopPropagation();
    setRejectAssign(id);
    setAssignInfor(null);
    openyesnoModal();
  };

  const handleRequestReturn = (e, id, userId) => {
    const request = { Id: id, UserId: userId };
    e.stopPropagation();
    setRequestReturn(request);
    setAssignInfor(null);
    openModal();
  };

  const handleConfirmAcceptAssign = async () => {
    try {
      await assignmentApi.acceptrespond(acceptAssign);
      dispatch(onListChange());
    } catch (error) {
      console.log("Failed to accept: ", error);
    }
    onRefresh();
    closeyesnoModal();
  };

  const handleConfirmDeleteAssign = async () => {
    try {
      await assignmentApi.delete(rejectAssign);
      dispatch(onListChange());
    } catch (error) {
      console.log("Failed to decline: ", error);
    }
    onRefresh();
    closeyesnoModal();
  };

  const handleConfirmRequestReturn = async () => {
    try {
      dispatch(await requestApi.post(requestReturn));
    } catch (error) {
      console.log("Failed to create Request: ", error);
    }
    onRefresh();
    closeModal();
  };
  function checkRequest(stateName, requestid) {
    if (requestid !== null) {
      return true;
    }
    if (stateName === "Waiting for Accept") {
      return true;
    }
    return false;
  }

  const customStyles = {
    content: {
      top: "30%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const columns = [
    {
      Header: "Asset Code",
      accessor: "assetCode",
    },
    {
      Header: "Asset Name",
      accessor: "assetName",
    },
    {
      Header: "Category",
      accessor: "categoryName",
    },
    {
      Header: "Assigned Date",
      accessor: "assignedDate",
    },
    {
      Header: "State",
      accessor: "stateName",
    },
    {
      Header: "Action",
      Cell: ({ row }) => (
        <div className="rookie-group-btn">
          <Checkbtn
            onClick={(e) => handleAcceptAssign(e, row.original.id)}
            disabled={row.original.stateName === "Accepted"}
          />
           <span style = {{'marginLeft': '15px', 'marginRight':'15px'}}>
            <Xcirclebtn
              onClick={(e) => handleDeclineAssign(e, row.original.id)}
              disabled={row.original.stateName === "Accepted"}
            />
           </span>
          <Arrowcircle
            onClick={(e) => handleRequestReturn(e, row.original.id, userId)}
            disabled={checkRequest(
              row.original.stateName,
              row.original.requestAssignmentId
            )}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <ReactTable
        columns={columns}
        data={listitem}
        onSort={(e) => console.log(e)}
        onRowClick={(e) => handleRowClick(e)}
      ></ReactTable>
      <YesNoModal
        title={"Are you sure?"}
        modalIsOpen={yesnomodalIsOpen}
        closeModal={closeyesnoModal}
        customStyles={customStyles}
      >
        {acceptAssign ? (
          <>
            <div>Do you want to accept this Assignment ?</div>
            <Button color="danger" onClick={() => handleConfirmAcceptAssign()}>
              Accept
            </Button>{" "}
            <Button onClick={() => closeyesnoModal()}>Close</Button>
          </>
        ) : rejectAssign ? (
          <>
            <div>Do you want to decline this Assignment ?</div>
            <Button color="danger" onClick={() => handleConfirmDeleteAssign()}>
              Decline
            </Button>{" "}
            <Button onClick={() => closeyesnoModal()}>Close</Button>
          </>
        ) : (
          ""
        )}
      </YesNoModal>
      {requestReturn ?
        <YesNoModal
          title={"Are you sure?"}
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          customStyles={customStyles}>
          <>
            <div>Do you want to create a returning request for this asset?</div>
            <Button color="danger" onClick={() => handleConfirmRequestReturn()}>
              Yes
            </Button>{" "}
            <Button onClick={() => closeModal()}>No</Button>
          </>
        </YesNoModal>
        :
        <RookieModal
          title={"Detailed Assignment Information"}
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          customStyles={customStyles}
        >
          {assignInfor ? (
            <JsonTable json={assignInfor} />
          ) : ''}
        </RookieModal>
      }
    </>
  );
};

export default HomeTable;
