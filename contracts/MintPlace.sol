// SPDX-License-Identifier: MIT
// Author: Nik Kalyani @techbubble

pragma solidity 0.8.17;

import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/Base64Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MintPlace is 
    Initializable, 
    ERC721EnumerableUpgradeable, 
    AccessControlUpgradeable, 
    ReentrancyGuardUpgradeable, 
    UUPSUpgradeable 
{
    IERC20 public usdc;
    uint public constant MAX_TOKENS = 1000000000;
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");
 
    struct ProjectInfo {
        address owner;
        string name;
        string imageUrl;
        string externalUrl;
        uint mints;
        uint maxSupply;
    }

    uint public projects;
    mapping(uint => ProjectInfo) public allProjects;
    mapping(uint => uint) public tokenToProject;
    mapping(address => mapping(uint => uint)) public userMints;  // address => (projectId => true)

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() initializer public {
        __ERC721_init("MintPlace", "MPX");
        __ERC721Enumerable_init();
        __AccessControl_init();
        __ReentrancyGuard_init();
        __UUPSUpgradeable_init();

        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(UPGRADER_ROLE, msg.sender);

    }

    function mintPublic(uint projectId) public isProject(projectId) nonReentrant {        
        mint(projectId, msg.sender);
    }

    function mintProject(uint projectId, address[] memory accounts) public isProject(projectId) nonReentrant {
        require(msg.sender == allProjects[projectId].owner || hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Unauthorized user");

        for(uint a=0; a<accounts.length; a++) {
            mint(projectId, accounts[a]);
        }
    }

    function minted(uint projectId, address account) public view returns(uint) {
        return userMints[account][projectId];
    }

    function mint(uint projectId, address account) internal {
        require(userMints[account][projectId] == 0, "Account already has this token");
        if (allProjects[projectId].maxSupply == 0 || allProjects[projectId].mints < allProjects[projectId].maxSupply) {
            uint tokenId = totalSupply() + 1;
            tokenToProject[tokenId] = projectId;
            allProjects[projectId].mints++;
            userMints[account][projectId] = tokenId;
            _mint(account, tokenId);
        }
    }

    function registerProject(string calldata name, string calldata imageUrl, string calldata externalUrl, uint maxSupply) public {
        projects = projects + 1;
        allProjects[projects] = ProjectInfo(msg.sender, name, imageUrl, externalUrl, 0, maxSupply);
    }

    function updateProject(uint projectId, string calldata name, address owner, string calldata imageUrl, string calldata externalUrl, uint maxSupply) public isProject(projectId) {
        ProjectInfo storage project = allProjects[projectId];

        require(msg.sender == project.owner || hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Unauthorized user");
        project.name = name;
        project.owner = owner;
        project.imageUrl = imageUrl;
        project.externalUrl = externalUrl;
        project.maxSupply = maxSupply;
    }

    function getProject(uint projectId) external view returns(ProjectInfo memory) {
        return allProjects[projectId];
    }

    function tokenURI(uint tokenId) override public view returns (string memory) {

        uint projectId = tokenToProject[tokenId];
        ProjectInfo memory project = allProjects[projectId];
        require(project.owner != address(0), "Token project not found");

	    string memory json = Base64Upgradeable.encode(bytes(string(abi.encodePacked('{"name": "', project.name, '", "description": "', project.name, ' NFT", "image": "', project.imageUrl, '", "external_url": "', project.externalUrl, '"}'))));
        return string(abi.encodePacked('data:application/json;base64,', json));
    }
    
    modifier isProject(uint projectId) {
        require(allProjects[projectId].owner != address(0), "Project not found");
        _;
    }

    receive() external payable {
    }

    function withdrawVTRU() external onlyRole(DEFAULT_ADMIN_ROLE) nonReentrant {
        (bool recovered, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(recovered, "Withdraw VTRU failed"); 
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721EnumerableUpgradeable, AccessControlUpgradeable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}
}
