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
   
    mapping(address => address) public departments;
 
    uint256 public employeeId = 0;

    //  Employee array, called employees
    Employee[] employees;

    event employeeCreated (uint id, string name, string location, string startDate, string email, address account, address department, uint salary);
    event employeeDeleted (uint id, string name, address account);

    function createEmployee (string memory _name, string memory _location, string memory _startDate,string memory _email, address _account, address _department, uint _salary) public 
    returns(uint256, string memory, string memory, string memory, string memory, address, address, uint) {   
        require (_department != _account, "Department and Worker address can't be the same. Pick another address.");
        require (msg.sender != _account, "An employee can't register themself.");    
        uint _id = employeeId++;
        
        departments[_account] = _department;

        Employee memory _e = Employee({
            id: _id,
            name: _name,
            location: _location,
            startDate: _startDate,
            email: _email,
            account: _account,
            department: departments[_account],
            salary: _salary
        });

            employees.push(_e);
           // uint newEmployeeId = employees.length;
            
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

            return (_e.id,_e.name, _e.location,_e.startDate, _e.email, _e.account,_e.department,_e.salary);
    }

    function getEmployee(uint _index) public view returns (uint256 id, string memory name, string memory startDate, string memory email, address account, address department, uint256 salary, string memory location) {
        Employee memory e = employees[_index];

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
        assert (employees[_id].salary == 0);

        emit employeeDeleted(id, name, account);
    }
}


