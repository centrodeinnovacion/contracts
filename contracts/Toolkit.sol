pragma solidity ^0.4.23;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';
import './StringUtils.sol';

contract Toolkit is Ownable {
  using StringUtils for string;
  mapping(bytes32 => mapping(bytes32 => string)) hashes;

  function add(string _part1, string _part2, string _name) public onlyOwner {
    bytes32 part1 = _part1.stringToBytes32();
    bytes32 part2 = _part2.stringToBytes32();
    hashes[part1][part2] = _name;
  }

  function validate(string _part1, string _part2) public view onlyOwner returns (string result)  {
    bytes32 part1 = _part1.stringToBytes32();
    bytes32 part2 = _part2.stringToBytes32();
    result = hashes[part1][part2];
  }

  function kill() public onlyOwner {
    selfdestruct(owner());
  }
}
