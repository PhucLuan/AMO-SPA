import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import assignmentApi from "../../../api/assignmentApi";
import HomeTable from "../components/HomeList/HomeTable";
import { fetchAssignmentsPaging } from "../homeSlice";

const Main = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.profile["sub"];
  const [isRefresh, setIsRefresh] = useState(false);

  useEffect(() => {
    const fetchAssignments = async () => {
      dispatch(fetchAssignmentsPaging(await assignmentApi.getByUser(userId)));
    };
    fetchAssignments();
  }, [isRefresh, userId, dispatch]);

  const handleRefresh = () => {
    setIsRefresh(!isRefresh);
  };
  const homePaging = useSelector((state) => state.home.homesPaging);
  return (
    <>
      <div className="titleview">My Assignment</div>
      {homePaging !== undefined && (
        <HomeTable listitem={homePaging} onRefresh={handleRefresh}></HomeTable>
      )}
    </>
  );
};

export default Main;
