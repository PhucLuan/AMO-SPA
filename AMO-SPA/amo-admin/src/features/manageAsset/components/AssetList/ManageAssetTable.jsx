import React, { useState } from "react";
import { JsonTable } from "react-json-to-html";
//import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import assetApi from "../../../../api/assetApi";
import assignmentApi from "../../../../api/assignmentApi";
import Editbtn from "../../../../components/Button/Editbtn";
import Xcirclebtn from "../../../../components/Button/Xcirclebtn";
import ReactTable from "../../../../components/ReactTable";
import RookieModal from "../../../../components/rookiemodal/RookieModal";
import YesNoModal from "../../../../components/rookiemodal/YesNoModal";
//import { onListChange } from "../../manageassetSlice";
import HistoryAssignment from "../HistoryAssignment/HistoryAssignment";

const ManageAssetTable = ({ listitem, onRefresh, params, setparams }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  //const params = useSelector((state) => state.asset.params);
  const [assetInfor, setAssetInfor] = useState(null);
  const [deleteAsset, setDeleteAsset] = useState(null);
  const [assetId, setassetId] = useState(null);
  const [historyAssignment, sethistoryAssignment] = useState();
  const [modalfalseIsOpen, setmodalfalseIsOpen] = useState(false);

  const history = useHistory();
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setAssetInfor(null);
    setDeleteAsset(null);
    setIsOpen(false);
  }

  function openModalRejectDelete() {
    closeModal();
    setmodalfalseIsOpen(true);
  }

  function closeModalRejectDelete() {
    setmodalfalseIsOpen(false);
  }

  
  const handleRowClick = (dataRow) => {
    const code = dataRow.code == null ? "Is unavailable" : dataRow.code;

    setassetId(dataRow.id)
    setAssetInfor({
      "Asset Code": code,
      "Asset Name": dataRow.name,
      Category: dataRow.categoryName,
      "Installed Date": dataRow.installedDate,
      State: dataRow.state,
      Location: dataRow.location,
      Specification: dataRow.specification,
      //History: dataRow.id,
    });

    const fetchhistoryAssignment = async (id) => {
      const Params = { assetid: id }
      const res = await assignmentApi.getHistoryAssignment(Params);
      console.log('res', res)
      sethistoryAssignment(res);
    }
    fetchhistoryAssignment(dataRow.id);

    console.log(assetInfor);
    openModal();
  };

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

  //const dispatch = useDispatch();

  const handleDeleteAsset = (id) => {
    setDeleteAsset(id);
    setAssetInfor(null);
    openModal();
  };

  const handleConfirmDeleteAsset = async () => {
    try {
      const res = await assetApi.delete(deleteAsset);
      if (res === "existed") {
        openModalRejectDelete()
      }
      onRefresh();
      //dispatch(onListChange());
    } catch (error) {
      console.log("Failed to post user: ", error);
    }
    onRefresh();
    closeModal();
  };

  const handleOnSort = (e) => {
    if (e[0])
      // dispatch(
      //   onChangeParam({
      //     ...params,
      //     OrderProperty: e[0].id,
      //     Desc: e[0].desc,
      //   })
      // );
      setparams(
        {
          ...params,
          OrderProperty: e[0].id,
          Desc: e[0].desc,
        }
      )
  };

  const columns = [
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
    },
    {
      Header: "State",
      accessor: "state",
    },
    {
      Header: "Action",
      Cell: ({ row }) => (
        <div className="rookie-group-btn">
          <Editbtn
            onClick={() => history.push("/manageasset/" + row.original.id)}
            disabled={row.original.state === "Assigned"}
          />
          <Xcirclebtn
            onClick={() => handleDeleteAsset(row.original.id)}
            disabled={row.original.state === "Assigned"}
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
        onSort={(e) => handleOnSort(e)}
        onRowClick={(e) => handleRowClick(e)}
      ></ReactTable>
      {deleteAsset ?
        <YesNoModal
          title={"Are You Sure?"}
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          customStyles={customStyles}>
          <>
            <div>Do you want to delete this asset?</div>
            <Button color="danger" onClick={() => handleConfirmDeleteAsset()}>
              Delete
            </Button>
            {" "}
            <Button color="btn btn-outline-secondary" onClick={() => closeModal()}>
              Cancel
            </Button>
          </>
        </YesNoModal>
        :
        <RookieModal
          title={deleteAsset ? "Are You Sure?" : "Detailed Asset Information"}
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          customStyles={customStyles}
        >
          {
            assetInfor && assetId ? (
              <>
                <JsonTable json={assetInfor} />
                {historyAssignment && <HistoryAssignment data={historyAssignment} />}
    
              </>):''
          }
        </RookieModal>
      }

        <RookieModal
          title={"Cannot Delete Asset"}
          modalIsOpen={modalfalseIsOpen}
          closeModal={closeModalRejectDelete}
          customStyles={customStyles}
        >
          <div>Cannot delete the asset because it belongs to one or more historical assignments.</div>
          <div>
            <p>If the asset is not able to be used anymore, please update its state in</p>
            <Link to={`/manageasset/${assetId}`}>Edit Asset page</Link>
          </div>
        </RookieModal>
    </>
  );
};

export default ManageAssetTable;
