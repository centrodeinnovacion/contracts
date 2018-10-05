pragma solidity ^0.4.23;

contract Toolkit {
    address public owner;
    Hash[] public hashes;

    struct Hash {
        bytes32 part1;
        bytes32 part2;
    }

    constructor () public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender);
        _;
    }

    function add(bytes32 _part1, bytes32 _part2) public onlyOwner {
        hashes.push(Hash({part1 : _part1, part2 : _part2}));
    }

    function validate(bytes32 _part1, bytes32 _part2) public view onlyOwner returns (bool)  {
        for (uint i = 0; i < hashes.length; i++) {
            Hash memory saved = hashes[i];
            if (saved.part1 == _part1 && saved.part2 == _part2)
                return true;
        }
        return false;
    }
}
