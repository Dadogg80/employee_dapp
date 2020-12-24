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
        string startDate;
        string email;
        address account;
        address department;
        uint256 salary;
    }
   
    


    uint256 public employeeId;

    //  Employee array, called employees
    Employee[] public employees;

    //Events
    event employeeCreated (uint id, string name, string location, string startDate, string email, address account, address department, uint salary);
    event employeeDeleted (uint id, string name, address account);

    function createEmployee (string memory _name, string memory _location, string memory _startDate,string memory _email, address _account, address _department, uint _salary) public {   
        require (_department != _account, "Department and Worker address can't be the same. Pick another address.");
        require (msg.sender != _account, "An employee can't register themself.");    
        uint _id = employeeId++;
        

        Employee memory employee = Employee({
            id: _id,
            name: _name,
            location: _location,
            startDate: _startDate,
            email: _email,
            account: _account,
            department: _department,
            salary: _salary
        });

            employees.push(employee);
           // uint newEmployeeId = employees.length;
            
            emit employeeCreated (
                employee.id, 
                employee.name, 
                employee.location,
                employee.startDate, 
                employee.email, 
                employee.account,
                employee.department,
                employee.salary
            );
    }

    function getEmployee(uint _index) public view returns (uint256 id, string memory name, string memory startDate, string memory email, address account, address department, uint256 salary, string memory location) {
        Employee storage employee = employees[_index];

            id = employee.id;
            name = employee.name;
            startDate = employee.startDate;
            email = employee.email;
            account = employee.account;
            department = employee.department;
            salary = employee.salary;
            location = employee.location;
    }

    function deleteEmployee (uint _id) internal onlyAdmin {
        string memory name = employees[_id].name;
        uint id = _id;
        address account = employees[_id].account;
        delete (employees[_id]);
        assert (employees[_id].salary == 0);

        emit employeeDeleted(id, name, account);
    }

    function get(uint _id) public view returns (uint256 id, string memory name, uint256 salary, string memory location) {
        
            Employee memory employee = employees[_id];
            
            id = employee.id; 
            name= employee.name; 
            salary = employee.salary; 
            location = employee.location;
        
    }

}


