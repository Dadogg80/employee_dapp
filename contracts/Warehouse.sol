// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.8.0;

import "./Employees.sol";

contract Warehouse is Employees {

    mapping (address => uint) public salary;
    mapping(address => address) public bossOf;

    function createWorker (string memory _name, string memory _gender, uint _dateOfBirth,string memory _email, address _workerAddress, uint _salary, address _boss)
    public
    {
        require (_boss != _workerAddress);
        createEmployee(_name, _gender, _dateOfBirth, _email, _workerAddress);
        salary[_workerAddress] = _salary;
        bossOf[_workerAddress] = _boss;
    }

    function fireWorker (address _workerAddress) public {
        require (msg.sender == _workerAddress);
        deleteEmployee(_workerAddress);
        delete(salary[_workerAddress]);
        delete(bossOf[_workerAddress]);
    }
}
