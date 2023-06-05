//connect to contract.
export const SpiritStoneABI = [
    {
        name: "constructor",
        type: "function",
        inputs: [
            {
                name: "name",
                type: "core::felt252",
            },
            {
                name: "symbol",
                type: "core::felt252",
            },
        ],
        outputs: [],
        state_mutability: "external",
    },
    {
        name: "name",
        type: "function",
        inputs: [],
        outputs: [
            {
                type: "core::felt252",
            },
        ],
        state_mutability: "view",
    },
    {
        name: "symbol",
        type: "function",
        inputs: [],
        outputs: [
            {
                type: "core::felt252",
            },
        ],
        state_mutability: "view",
    },
    {
        name: "decimals",
        type: "function",
        inputs: [],
        outputs: [
            {
                type: "core::integer::u8",
            },
        ],
        state_mutability: "view",
    },
    {
        name: "totalSupply",
        type: "function",
        inputs: [],
        outputs: [
            {
                type: "core::integer::u256",
            },
        ],
        state_mutability: "view",
    },
    {
        name: "balanceOf",
        type: "function",
        inputs: [
            {
                name: "account",
                type: "core::starknet::contract_address::ContractAddress",
            },
        ],
        outputs: [
            {
                type: "core::integer::u256",
            },
        ],
        state_mutability: "view",
    },
    {
        name: "allowance",
        type: "function",
        inputs: [
            {
                name: "owner",
                type: "core::starknet::contract_address::ContractAddress",
            },
            {
                name: "spender",
                type: "core::starknet::contract_address::ContractAddress",
            },
        ],
        outputs: [
            {
                type: "core::integer::u256",
            },
        ],
        state_mutability: "view",
    },
    {
        name: "start_time",
        type: "function",
        inputs: [],
        outputs: [
            {
                type: "core::integer::u64",
            },
        ],
        state_mutability: "view",
    },
    {
        name: "mint_count",
        type: "function",
        inputs: [],
        outputs: [
            {
                type: "core::integer::u64",
            },
        ],
        state_mutability: "view",
    },
    {
        name: "available_mint_count",
        type: "function",
        inputs: [],
        outputs: [
            {
                type: "core::integer::u64",
            },
        ],
        state_mutability: "view",
    },
    {
        name: "block_time",
        type: "function",
        inputs: [],
        outputs: [
            {
                type: "core::integer::u64",
            },
        ],
        state_mutability: "view",
    },
    {
        name: "max_supply",
        type: "function",
        inputs: [],
        outputs: [
            {
                type: "core::integer::u256",
            },
        ],
        state_mutability: "view",
    },
    {
        name: "block_halve_interval",
        type: "function",
        inputs: [],
        outputs: [
            {
                type: "core::integer::u64",
            },
        ],
        state_mutability: "view",
    },
    {
        name: "block_reward",
        type: "function",
        inputs: [],
        outputs: [
            {
                type: "core::integer::u256",
            },
        ],
        state_mutability: "view",
    },
    {
        name: "transfer",
        type: "function",
        inputs: [
            {
                name: "recipient",
                type: "core::starknet::contract_address::ContractAddress",
            },
            {
                name: "amount",
                type: "core::integer::u256",
            },
        ],
        outputs: [
            {
                type: "core::bool",
            },
        ],
        state_mutability: "external",
    },
    {
        name: "transferFrom",
        type: "function",
        inputs: [
            {
                name: "sender",
                type: "core::starknet::contract_address::ContractAddress",
            },
            {
                name: "recipient",
                type: "core::starknet::contract_address::ContractAddress",
            },
            {
                name: "amount",
                type: "core::integer::u256",
            },
        ],
        outputs: [
            {
                type: "core::bool",
            },
        ],
        state_mutability: "external",
    },
    {
        name: "approve",
        type: "function",
        inputs: [
            {
                name: "spender",
                type: "core::starknet::contract_address::ContractAddress",
            },
            {
                name: "amount",
                type: "core::integer::u256",
            },
        ],
        outputs: [
            {
                type: "core::bool",
            },
        ],
        state_mutability: "external",
    },
    {
        name: "increase_allowance",
        type: "function",
        inputs: [
            {
                name: "spender",
                type: "core::starknet::contract_address::ContractAddress",
            },
            {
                name: "added_value",
                type: "core::integer::u256",
            },
        ],
        outputs: [
            {
                type: "core::bool",
            },
        ],
        state_mutability: "external",
    },
    {
        name: "decrease_allowance",
        type: "function",
        inputs: [
            {
                name: "spender",
                type: "core::starknet::contract_address::ContractAddress",
            },
            {
                name: "subtracted_value",
                type: "core::integer::u256",
            },
        ],
        outputs: [
            {
                type: "core::bool",
            },
        ],
        state_mutability: "external",
    },
    {
        name: "mint",
        type: "function",
        inputs: [],
        outputs: [],
        state_mutability: "external",
    },
    {
        name: "Transfer",
        type: "event",
        inputs: [
            {
                name: "from",
                type: "core::starknet::contract_address::ContractAddress",
            },
            {
                name: "to",
                type: "core::starknet::contract_address::ContractAddress",
            },
            {
                name: "value",
                type: "core::integer::u256",
            },
        ],
    },
    {
        name: "Approval",
        type: "event",
        inputs: [
            {
                name: "owner",
                type: "core::starknet::contract_address::ContractAddress",
            },
            {
                name: "spender",
                type: "core::starknet::contract_address::ContractAddress",
            },
            {
                name: "value",
                type: "core::integer::u256",
            },
        ],
    },
];

export const SpiritStoneAddress = '0x060cf64cf9edfc1b16ec903cee31a2c21680ee02fc778225dacee578c303806a'