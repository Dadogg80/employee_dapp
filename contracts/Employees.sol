// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.8.0;

contract Employees {

    address public owner;

    constructor () public {
        owner = msg.sender;
    }

    modifier onlyAdmin {
        require(owner == msg.sender, "not the admin");
        _;
    }

    struct Employee {
        uint employeeId;
        string name;
        string gender;
        uint dateOfBirth;
        string email;
        address account;
    }

    mapping (address => Employee) public employees;
    uint[] id;

    event employeeCreated (uint employeeId, string name, address account);
    event employeeDeleted (uint employeeId, string name, address account);
    event employeeUpdated (uint employeeId, string name, string gender, uint dateOfBirth, string email, address account);

    function createEmployee (string memory _name, string memory _gender, uint _dateOfBirth, string memory _email, address _account) internal onlyAdmin {
       
        if(employees[_account].dateOfBirth == 0) {
            employees[_account].employeeId = id.length;
            employees[_account].name = _name;
            employees[_account].gender = _gender;
            employees[_account].dateOfBirth = _dateOfBirth;
            employees[_account].email = _email;
            employees[_account].account = _account;
            
            
            id.push(employees[_account].employeeId);
            emit employeeCreated (employees[_account].employeeId, _name, _account);
        } else {
            employees[_account].employeeId = id.length;
            employees[_account].name = _name;
            employees[_account].gender = _gender;
            employees[_account].dateOfBirth = _dateOfBirth;
            employees[_account].email = _email;
            employees[_account].account = _account;

            
            emit employeeUpdated (
                employees[_account].employeeId, 
                employees[_account].name, 
                employees[_account].gender, 
                employees[_account].dateOfBirth, 
                employees[_account].email, 
                employees[_account].account
            );
        }
    }

    function getEmployee(address _account) public view returns (uint, string memory, uint, string memory, address)
    {
        return (employees[_account].employeeId, employees[_account].name, employees[_account].dateOfBirth, employees[_account].email , employees[_account].account);
    }

    function deleteEmployee (address _account) public onlyAdmin {
        string memory name = employees[_account].name;
        uint employeeId = employees[_account].employeeId;
        delete (employees[_account]);
        assert (employees[_account].dateOfBirth == 0);

        emit employeeDeleted(employeeId, name, _account);
    }
}
