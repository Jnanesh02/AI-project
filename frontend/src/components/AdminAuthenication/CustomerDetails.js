// import React, { useEffect, useState, useCallback } from "react";
// import "./AdminStyles/CustomerDetails.css";
// import axios from "axios";

// const CustomerDetails = () => {
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(12);
//   const [customersData, setCustomersData] = useState([]);

//   const displayFields = [
//     "email",
//     "linkedAccount",
//     "plan",
//     "usage",
//     "status",
//     "renewal",
//   ];

//   const tableHeaders = [
//     "Email",
//     "Linked Accounts",
//     "Subscription Plan",
//     "Usage",
//     // "Assistant Instructions",
//     // "Extra Package Purchase Data",
//     // "Last Active Date",
//     "status",
//     "Renewal Date/Subscription Expiry",
//     // "Feedback Section",
//     // "Recent Activity Insights",
//   ];

//   const getCustomerDetails = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (token) {
//         const response = await axios.get(
//           `${process.env.REACT_APP_BACKEND_URL}/customer`,
//           {
//             headers: { authorization: token },
//           }
//         );
//         // console.log(response.data);
//         setCustomersData(response.data);
//       } else {
//         console.log("unauthorised");
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   useEffect(() => {
//     getCustomerDetails();
//   }, []);
//   console.log("outside useEffect", customersData);
//   // const data = //
//   //   useEffect(() => {
//   //     setEmployees(dummyEmployees);
//   //     setLoading(false);
//   //   }, []);

//   const filterBySearchTerm = (employee) =>
//     searchTerm === "" ||
//     employee.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     employee.LastName.toLowerCase().includes(searchTerm.toLowerCase());

//   const applyFilters = useCallback(
//     (data) => {
//       return data.filter((employee) => {
//         return (
//           filterBySearchTerm(employee) &&
//           (statusFilter === "" || employee.status === statusFilter)
//         );
//       });
//     },
//     [searchTerm, statusFilter]
//   );

//   const handleSearchChange = (event) => {
//     const searchTerm = event.target.value;
//     setSearchTerm(searchTerm);
//   };

//   const handleFilterChange = (event) => {
//     const filterValue = event.target.value;
//     setStatusFilter(filterValue);
//   };

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   // Calculate the index range for the current page
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = applyFilters(employees).slice(
//     indexOfFirstItem,
//     indexOfLastItem
//   );

//   return (
//     <div className="main-department-section">
//       <div className="dep-tbl">
//         <h2 className="customer-heading">Customer Details</h2>

//         <input
//           type="text"
//           placeholder="Search..."
//           className="Searchbar form-control"
//           value={searchTerm}
//           onChange={handleSearchChange}
//         />

//         <label className="table-bar-label">
//           <select
//             className="form-select"
//             value={statusFilter}
//             onChange={handleFilterChange}>
//             <option value=""> Status Filter: </option>
//             <option value="active">Active</option>
//             <option value="inactive">Inactive</option>
//           </select>
//         </label>
//       </div>

//       <table className="employee-table">
//         <thead>
//           <tr>
//             {tableHeaders.map((field) => (
//               <th key={field}>{field}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {customersData.map((employee) => {
//             return (
//               <tr key={employee._id}>
//                 {displayFields.map((field) => {
//                   return (
//                     <td key={field}>
//                       {typeof employee[field] === "object" ? (
//                         <span>{JSON.stringify(employee[field])}</span>
//                       ) : (
//                         <span>{employee[field]}</span>
//                       )}
//                     </td>
//                   );
//                 })}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>

//       {/* Pagination controls */}
//       <div className="pagination">
//         <button
//           className="previouss"
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}>
//           Previous
//         </button>
//         <span className="pagination-count">{currentPage}</span>
//         <button
//           className="next"
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={indexOfLastItem >= applyFilters(employees).length}>
//           Next
//         </button>
//       </div>

//       {loading && <p>Loading...</p>}
//       {error && <p>{error}</p>}
//     </div>
//   );
// };

// export default CustomerDetails;
import React, { useEffect, useState, useCallback } from "react";
import "./AdminStyles/CustomerDetails.css";
import axios from "axios";

const CustomerDetails = () => {
  const [customersData, setCustomersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const displayFields = [
    "email",
    "linkedAccount",
    "plan",
    "usage",
    "status",
    "renewal",
  ];

  const tableHeaders = [
    "Email",
    "Linked Accounts",
    "Subscription Plan",
    "Usage",
    "Status",
    "Renewal Date/Subscription Expiry",
  ];

  const getCustomerDetails = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (token) {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/customer`,
          {
            headers: { authorization: token },
          }
        );
        setCustomersData(response.data);
        setLoading(false);
      } else {
        console.log("Unauthorized");
      }
    } catch (err) {
      setError("Error fetching data");
      console.log(err);
    }
  };

  useEffect(() => {
    getCustomerDetails();
  }, []);

  const filterBySearchTerm = (customer) =>
    searchTerm === "" ||
    (customer.name &&
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const applyFilters = useCallback(
    (data) => {
      return data.filter((customer) => {
        return (
          filterBySearchTerm(customer) &&
          (statusFilter === "" || customer.status === statusFilter)
        );
      });
    },
    [searchTerm, statusFilter]
  );

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  };

  const handleFilterChange = (event) => {
    const filterValue = event.target.value;
    setStatusFilter(filterValue);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = applyFilters(customersData).slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  function exportData() {
    const token = localStorage.getItem("adminToken");
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/export/customer`, {
        responseType: "blob",
        headers: { authorization: token },
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement("a");
        a.href = url;
        a.download = "customers.csv";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Export error:", error.message);
      });
  }

  return (
    <div className="main-department-section">
      <div className="dep-tbl">
        <h2 className="customer-heading">Customer Details</h2>
        <button onClick={exportData}>export data</button>
        <input
          type="text"
          placeholder="Search..."
          className="Searchbar form-control"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <label className="table-bar-label">
          <select
            className="form-select"
            value={statusFilter}
            onChange={handleFilterChange}>
            <option value=""> Status Filter: </option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>
      </div>

      <table className="employee-table">
        <thead>
          <tr>
            {tableHeaders.map((field) => (
              <th key={field}>{field}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((customer) => (
            <tr key={customer._id}>
              {displayFields.map((field) => (
                <td key={field}>
                  {typeof customer[field] === "object" ? (
                    <span>{JSON.stringify(customer[field])}</span>
                  ) : (
                    <span>{customer[field]}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          className="previouss"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}>
          Previous
        </button>
        <span className="pagination-count">{currentPage}</span>
        <button
          className="next"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={indexOfLastItem >= applyFilters(customersData).length}>
          Next
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default CustomerDetails;
