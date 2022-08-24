// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IERC1155.sol";
import "./ERC1155.sol";
import "./safeMath.sol";
import "./counters.sol";
import "./reentrancyGuard.sol";

contract eventNFT is ERC1155, ReentrancyGuard {
    using SafeMath for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct eventDetails {
        uint256 eventID;
        address creator;
        string name;
        string description;
        string imageURI;
        uint256 ticketID;
        uint256 ticketCount;
        uint256 ticketPrice;
    }
    eventDetails eventnft;
    mapping(address => eventDetails) public eventOwner;
    eventDetails[] public eventInfo;

    constructor() ERC1155("www.google.com") {}

    function mintEvent(
        string memory _eventName,
        string memory _eventDescription,
        uint256 _ticketCount,
        uint256 _ticketPrice,
        string memory _uri
    ) external returns (uint256) {
        //generate NFT id
        _tokenIds.increment();
        uint256 newID = _tokenIds.current();
        _tokenIds.increment();
        uint256 newBatchID = _tokenIds.current();

        uint256[] memory ids = new uint256[](2);
        ids[0] = newID;
        ids[1] = newBatchID;
        uint256[] memory tCount = new uint256[](2);
        tCount[0] = 1;
        tCount[1] = _ticketCount;

        //create event struct
        eventnft = eventDetails(
            newID,
            msg.sender,
            _eventName,
            _eventDescription,
            _uri,
            newBatchID,
            _ticketCount,
            _ticketPrice
        );
        eventInfo.push(eventnft);
        //mint batch for event
        _mintBatch(msg.sender, ids, tCount, "0x00");

        return newID;
    }

    function transferTicket(
        uint256 _eventID,
        address _from,
        address _to,
        uint256 _ticketCount
    ) external returns (bool) {
        uint256 index;
        for (uint256 i = 0; i < eventInfo.length; i++) {
            if (_eventID == eventInfo[i].eventID) {
                index = i;
            }
        }
        uint256 _ticketId = eventInfo[index].ticketID;
        eventInfo[index].ticketCount -= _ticketCount;

        safeTransferFrom(_from, _to, _ticketId, _ticketCount, "");
        return true;
    }

    function getEvents() external view returns (eventDetails[] memory) {
        return eventInfo;
    }
}