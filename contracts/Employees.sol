// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.7.0;

contract Employees {

    address public owner;


    constructor () {
        owner = msg.sender;
    }

    modifier onlyAdmin {
        require(owner == msg.sender, "not the admin");
        _;
    }

    struct Employee {
        uint256 id;
        string name;
        string location;
        uint256 startDate;
        string email;
        address account;
        address department;
        uint256 salary;
    }
   
    mapping(address => address) public departments;
 
    uint256[] public employeeId;
    //  Employee array, called employees
    Employee[] employees;

    event employeeCreated (uint id, string name, string location, uint startDate, string email, address account, address department, uint salary);
    event employeeUpdated (uint id, string name, string location, uint startDate, string email, address account, address department, uint salary);
    event employeeDeleted (uint id, string name, address account);

    function createEmployee (string memory _name, string memory _location, uint _startDate,string memory _email, address _account, address _department, uint _salary) public onlyAdmin returns(uint256)
    {   
        require (_department != _account);
        departments[_department] = _department;
        Employee memory _e = Employee({
            id: employeeId.length +1,
            name: _name,
            location: _location,
            startDate: _startDate,
            email: _email,
            account: _account,
            department: _department,
            salary: _salary
        });

            employees.push(_e);
            uint newEmployeeId = employees.length;
            
            emit employeeCreated (
                _e.id, 
                _e.name, 
                _e.location,
                _e.startDate, 
                _e.email, 
                _e.account,
                _e.department,
                _e.salary
            );

            return newEmployeeId;
    }

    function getEmployee(uint _id) public view returns (uint256 id, string memory name, uint256 startDate, string memory email, address account, address department, uint256 salary, string memory location) {
        Employee memory e = employees[_id];

            id = e.id;
            name = e.name;
            startDate = e.startDate;
            email = e.email;
            account = e.account;
            department = e.department;
            salary = e.salary;
            location = e.location;
    }

    function deleteEmployee (uint _id) internal onlyAdmin {
        string memory name = employees[_id].name;
        uint id = _id;
        address account = employees[_id].account;
        delete (employees[_id]);
        assert (employees[_id].startDate == 0);

        emit employeeDeleted(id, name, account);
    }

    function fireWorker (uint _id) public {
        require (msg.sender != employees[_id].account);
        address account = employees[_id].account;
        deleteEmployee(_id);
        delete(departments[account]);
    }

}


