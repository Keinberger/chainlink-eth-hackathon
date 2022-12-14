// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

interface IVault {
    event Deposit(address user, uint256 aspanMinted, uint256 usdcDeposited);
    event Withdraw(address user, uint256 aspanBurnt, uint256 usdcWithdrawn);

    function deposit(
        uint256 _amount,
        bytes calldata dc2dtSwapCallData,
        bytes calldata dc2daiSwapCallData
    ) external;

    function withdraw(
        uint256 aspanTokenAmount,
        bytes calldata dt2dcSwapCallData,
        bytes calldata dai2dcSwapCallData
    ) external;
}
