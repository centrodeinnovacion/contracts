pragma solidity ^0.4.23;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';

contract Toolkit is Ownable {
  mapping(bytes32 => mapping(bytes32 => string)) hashes;

  function add(bytes32 _part1, bytes32 _part2, string _name) public onlyOwner {
    hashes[_part1][_part2] = _name;
  }

  function validate(bytes32 _part1, bytes32 _part2) public view onlyOwner returns (string result)  {
    result = hashes[_part1][_part2];
  }

  function kill() public onlyOwner {
    selfdestruct(owner());
  }
}
