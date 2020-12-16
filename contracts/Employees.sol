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
        uint id;
        string name;
        string location;
        uint startDate;
        string email;
        address account;
        uint salary;
    }


    mapping (address => uint) public salary;
    mapping(address => address) public department;
    mapping (address => Employee) public employees;
 
    uint[] public id;

    event employeeCreated (uint id, string name, string location, uint startDate, string email, address account);
    event employeeUpdated (uint id, string name, string location, uint startDate, string email, address account);
    event employeeDeleted (uint id, string name, address account);

    function createEmployee (string memory _name, string memory _location, uint _startDate,string memory _email, address _account) internal onlyAdmin {
        Employee storage e = Employee;
        if(e.startDate == 0) {
            e.id = id.length+1;
            e.name = _name;
            e._location;
            e.startDate = _startDate;
            e.email = _email;
            e.account = _account;
            
            
            id.push(employees[_account].id);

            emit employeeCreated (
                e.id, 
                e.name, 
                e.location,
                e.startDate, 
                e.email, 
                e.account
            );
        } else {
            e.id = id.length;
            e.name = _name;
            e._location;
            e.startDate = _startDate;
            e.email = _email;
            e.account = _account;

            
            emit employeeUpdated (
                e.id, 
                e.name, 
                e._location,
                e.startDate, 
                e.email, 
                e.account
            );
        }
    }

    function getEmployee(address _account) public view returns (uint, string memory, uint, string memory, address, address, uint, string memory) {
        return (
            employees[_account].id,
            employees[_account].name,
            employees[_account].startDate,
            employees[_account].email,
            employees[_account].account,
            department[_account],
            salary[_account],
            employees[_account].location
        );
    }

    function deleteEmployee (address _account) internal onlyAdmin {
        string memory name = employees[_account].name;
        uint id = employees[_account].id;
        delete (employees[_account]);
        assert (employees[_account].startDate == 0);

        emit employeeDeleted(id, name, _account);
    }

    
 function createWorker (string memory _name, string memory _location, uint _startDate, string memory _email, address _workerAddress, uint _salary, address _department)
    public
    {
        require (_department != _workerAddress);
        createEmployee(_name, _location, _startDate, _email, _workerAddress);
        salary[_workerAddress] = _salary;
        department[_workerAddress] = _department;
    }

    function fireWorker (address _workerAddress) public {
        require (msg.sender != _workerAddress);
        deleteEmployee(_workerAddress);
        delete(salary[_workerAddress]);
        delete(department[_workerAddress]);
    }

}


