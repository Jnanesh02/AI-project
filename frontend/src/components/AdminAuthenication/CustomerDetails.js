import React, { useEffect, useState, useCallback } from "react";
import "./AdminStyles/CustomerDetails.css";

const CustomerDetails = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const displayFields = [
    "FirstName",
    "LastName",
    "Email",
    "PhoneNumber",
    "Plan",
    "status",
    "SocialMedia",
  ];

  // Dummy data
  const dummyEmployees = [
    /* Your dummy data here */
        {
      "_id": 1,
      "FirstName": "John",
      "LastName": "Doe",
      "Email": "john@example.com",
      "PhoneNumber": "123-456-7890",
      "Plan": "Basic",
      "status": "active",
      "SocialMedia": {
        "youtubeId": "john_youtube"
      }
    },
    {
      "_id": 2,
      "FirstName": "Alice",
      "LastName": "Smith",
      "Email": "alice@example.com",
      "PhoneNumber": "987-654-3210",
      "Plan": "Standard",
      "status": "inactive",
      "SocialMedia": {
        "youtubeId": null
      }
    },
    {
      "_id": 3,
      "FirstName": "Bob",
      "LastName": "Johnson",
      "Email": "bob@example.com",
      "PhoneNumber": "456-789-0123",
      "Plan": "Premium",
      "status": "active",
      "SocialMedia": {
        "youtubeId": "bob_youtube"
      }
    },
    {
      "_id": 4,
      "FirstName": "Emma",
      "LastName": "Brown",
      "Email": "emma@example.com",
      "PhoneNumber": "321-654-9870",
      "Plan": "Basic",
      "status": "inactive",
      "SocialMedia": {
        "youtubeId": "emma_youtube"
      }
    },
    {
      "_id": 5,
      "FirstName": "Michael",
      "LastName": "Davis",
      "Email": "michael@example.com",
      "PhoneNumber": "789-012-3456",
      "Plan": "Standard",
      "status": "active",
      "SocialMedia": {
        "youtubeId": "michael_youtube"
      }
    },
    {
      "_id": 6,
      "FirstName": "Olivia",
      "LastName": "Miller",
      "Email": "olivia@example.com",
      "PhoneNumber": "210-543-8769",
      "Plan": "Basic",
      "status": "active",
      "SocialMedia": {
        "youtubeId": "olivia_youtube"
      }
    },
    {
      "_id": 7,
      "FirstName": "William",
      "LastName": "Wilson",
      "Email": "william@example.com",
      "PhoneNumber": "654-987-3210",
      "Plan": "Premium",
      "status": "inactive",
      "SocialMedia": {
        "youtubeId": "william_youtube"
      }
    },
    {
      "_id": 8,
      "FirstName": "Sophia",
      "LastName": "Taylor",
      "Email": "sophia@example.com",
      "PhoneNumber": "543-210-9876",
      "Plan": "Standard",
      "status": "active",
      "SocialMedia": {
        "youtubeId": "sophia_youtube"
      }
    },
    {
      "_id": 9,
      "FirstName": "James",
      "LastName": "Anderson",
      "Email": "james@example.com",
      "PhoneNumber": "876-543-2109",
      "Plan": "Basic",
      "status": "inactive",
      "SocialMedia": {
        "youtubeId": "james_youtube"
      }
    },
    {
      "_id": 10,
      "FirstName": "Isabella",
      "LastName": "White",
      "Email": "isabella@example.com",
      "PhoneNumber": "432-109-8765",
      "Plan": "Premium",
      "status": "active",
      "SocialMedia": {
        "youtubeId": "isabella_youtube"
      }
    },
    {
      "_id": 11,
      "FirstName": "Liam",
      "LastName": "Jones",
      "Email": "liam@example.com",
      "PhoneNumber": "109-876-5432",
      "Plan": "Standard",
      "status": "active",
      "SocialMedia": {
        "youtubeId": "liam_youtube"
      }
    },
    {
      "_id": 12,
      "FirstName": "Charlotte",
      "LastName": "Martinez",
      "Email": "charlotte@example.com",
      "PhoneNumber": "876-543-2109",
      "Plan": "Basic",
      "status": "inactive",
      "SocialMedia": {
        "youtubeId": "charlotte_youtube"
      }
    },
    {
      "_id": 13,
      "FirstName": "Ethan",
      "LastName": "Hernandez",
      "Email": "ethan@example.com",
      "PhoneNumber": "432-109-8765",
      "Plan": "Premium",
      "status": "active",
      "SocialMedia": {
        "youtubeId": "ethan_youtube"
      }
    },
    {
      "_id": 14,
      "FirstName": "Amelia",
      "LastName": "Garcia",
      "Email": "amelia@example.com",
      "PhoneNumber": "109-876-5432",
      "Plan": "Standard",
      "status": "active",
      "SocialMedia": {
        "youtubeId": "amelia_youtube"
      }
    },
    {
      "_id": 15,
      "FirstName": "Benjamin",
      "LastName": "Lopez",
      "Email": "benjamin@example.com",
      "PhoneNumber": "765-432-1098",
      "Plan": "Basic",
      "status": "inactive",
      "SocialMedia": {
        "youtubeId": "benjamin_youtube"
      }
    }
  ];

  useEffect(() => {
    setEmployees(dummyEmployees);
    setLoading(false);
  }, []);

  const filterBySearchTerm = (employee) =>
    searchTerm === "" ||
    (employee.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.LastName.toLowerCase().includes(searchTerm.toLowerCase()));

  const applyFilters = useCallback(
    (data) => {
      return data.filter((employee) => {
        return (
          filterBySearchTerm(employee) &&
          (statusFilter === "" || employee.status === statusFilter)
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

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = applyFilters(employees).slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className="main-department-section">
      <div className="dep-tbl">
        <h2 className="customer-heading">Customer Details</h2>

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
            {displayFields.map((field) => (
              <th key={field}>{field}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* {employees.map((employee, key) => ( */}
          {currentItems.filter(employee => filterBySearchTerm(employee, searchTerm)).map((employee,key) => (
            <tr key={`${employee._id}-${key}`}>
              {displayFields.map((field) => (
                <td key={`${employee._id}-${field}`}>
                  {field === "SocialMedia" && typeof employee[field] === "object" ? (
                    <>
                      {employee[field].facebookId && <span>Login with Facebook</span>}
                      {employee[field].linkedinId && <span>Login with LinkedIn</span>}
                      {employee[field].googleId && <span>Login with Google</span>}
                      {employee[field].youtubeId && <span>Login with youtubeId</span>}
                      {!employee[field].facebookId &&
                        !employee[field].linkedinId &&
                        !employee[field].googleId &&
                        !employee[field].youtubeId && (
                          <span>No social media IDs</span>
                        )}
                    </>
                  ) : (
                    <span>
                      {employee[field] !== null && employee[field] !== ""
                        ? employee[field]
                        : "--"}
                    </span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="pagination">
        <button
          className="previouss"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="pagination-count">{currentPage}</span>
        <button
          className="next"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={indexOfLastItem >= applyFilters(employees).length}>
          Next
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default CustomerDetails;


