import React, { useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { TbDeviceAnalytics } from "react-icons/tb";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);

import employeeData from "../Data/EmployeeData";
import StatusRenderer from "./cellRenderers/StatusRenderer";
import SkillsRenderer from "./cellRenderers/SkillsRenderer";
import PerformanceRenderer from "./cellRenderers/PerformanceRenderer";

const Dashboard = () => {

  const [rowData] = useState(employeeData);

  const columnDefs = useMemo(() => [
    {
      headerName: "Employee Name",
      valueGetter: params => `${params.data.firstName} ${params.data.lastName}`,
      sortable: true,
      filter: true,
      flex: 1.2
    },
    { field: "email", headerName: "Email", flex: 1.5, sortable: true, filter: true },
    { field: "department", sortable: true, filter: true, flex: 1 },
    { field: "position", sortable: true, filter: true, flex: 1 },
    { field: "location", sortable: true, filter: true, flex: .9 },

    
    { field: "skills", headerName: "Skills", cellRenderer: SkillsRenderer, flex: 1.3 },
    { field: "isActive", headerName: "Status", cellRenderer: StatusRenderer, flex: 1 },
    { field: "performanceRating", headerName: "Performance", cellRenderer: PerformanceRenderer, flex: 1.2 },

    { field: "projectsCompleted", headerName: "Projects", sortable: true, filter: "agNumberColumnFilter", flex: .8 },
    { field: "salary", headerName: "Salary ($)", sortable: true, filter: "agNumberColumnFilter", flex: 1 },
  ], []);

  return (
    <div className="dashboard-container">
      
      <h2 style={{ textAlign: "center", marginBottom: "15px"}}>
        <TbDeviceAnalytics /> FactWise Employee Dashboard
      </h2>

      <div
        className="ag-theme-quartz"
        style={{ height: 520, width: "95%", margin: "auto" }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          animateRows={true}
        />
      </div>
    </div>
  );
};

export default Dashboard;