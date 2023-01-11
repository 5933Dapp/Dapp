// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Simple.sol";
 
contract TestSimple {
 
    Simple info = Simple(DeployedAddresses.Simple());
 
    string name;
    uint age;
 
    function testInfo() public {
 
        info.set(unicode"中本聪",18);
        (name, age) = info.get();
 
        Assert.equal(name, unicode"中本聪", unicode"设置姓名出错");
        Assert.equal(age, 18, unicode"设置年龄出错");
    }
}
