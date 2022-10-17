// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import { strings } from "./libraries/strings.sol";
import { svg } from "./svg/svg.sol";
import { svgUtils } from "./svg/svgUtils.sol";
import { SVGLibrary } from "@erc721k/periphery-sol/contracts/svg/SVGLibrary.sol";
import { SVGRegistry } from "@erc721k/periphery-sol/contracts/svg/SVGRegistry.sol";
import { Base64 } from "base64-sol/base64.sol";

contract ImpactCardRender is Ownable {
  address internal _svgLibrary;
  address internal _svgRegistry;

  string private constant ENCODING = "data:image/svg+xml;base64, ";

  mapping(uint8 => bytes) private colorFill;

  constructor(address _svgLibrary_, address _svgRegistry_) {
    _svgLibrary = _svgLibrary_;
    _svgRegistry = _svgRegistry_;
    colorFill[0] = hex"35D07F"; // Green
    colorFill[1] = hex"FBCC5C"; // Yellow
    colorFill[2] = hex"BF97FF"; // Purple
    colorFill[3] = hex"FB7C6D"; // Red
    colorFill[4] = hex"000000"; // Black
    colorFill[5] = hex"3488EC"; // Blue
  }

  /* ===================================================================================== */
  /* External Functions                                                                    */
  /* ===================================================================================== */

  function render(bytes memory input) external view returns (string memory) {
    return string(abi.encodePacked(ENCODING, Base64.encode(bytes(_render(input)))));
  }

  /* ===================================================================================== */
  /* Internal Functions                                                                    */
  /* ===================================================================================== */
  function encodeSvgToDataURI(string memory data) internal view returns (string memory) {
    return string(abi.encodePacked(ENCODING, Base64.encode(bytes(data))));
  }

  function _render(bytes memory input) internal view returns (string memory) {
    (
      uint256 balance,
      uint8 cardStyle,
      bool gitcoinGrantFlag,
      bool impactMarketFlag,
      bool ethicHubFlag,
      string memory emoji
    ) = abi.decode(input, (uint256, uint8, bool, bool, bool, string));
    bytes memory _colorFill = colorFill[cardStyle];

    uint256 questCount = 0;

    if (gitcoinGrantFlag) {
      questCount++;
    }
    if (impactMarketFlag) {
      questCount++;
    }
    if (ethicHubFlag) {
      questCount++;
    }

    return
      string.concat(
        '<svg xmlns="http://www.w3.org/2000/svg" width="500" height="300" viewBox="0 0 500 300" fill="none" style="font-family: EB Garamond;" >',
        // '<g opacity="0.92" filter="url(#filter0_ii_86_67)"><path d="M0 18C0 8.05887 8.05887 0 18 0H1018C1027.94 0 1036 8.05887 1036 18V570C1036 579.941 1027.94 588 1018 588H18C8.05887 588 0 579.941 0 570V18Z" fill="#D9D9D9" fill-opacity="0.01"/></g>',
        '<svg x="1%" y="0.25%" width="98%" height="99.5%" viewBox="0 0 1036 588" fill="none"> <g opacity="0.92" filter="url(#filter0_ii_86_67)"> <path d="M0 18C0 8.05887 8.05887 0 18 0H1018C1027.94 0 1036 8.05887 1036 18V570C1036 579.941 1027.94 588 1018 588H18C8.05887 588 0 579.941 0 570V18Z" fill="#D9D9D9" fill-opacity="0.01"/> </g> <defs> <filter id="filter0_ii_86_67" x="-2.93008" y="-2.93008" width="1043.33" height="596.79" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"/> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/> <feOffset dx="4.39512" dy="5.86016"/> <feGaussianBlur stdDeviation="2.93008"/> <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/> <feBlend mode="normal" in2="shape" result="effect1_innerShadow_86_67"/> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/> <feOffset dx="-2.93008" dy="-2.93008"/> <feGaussianBlur stdDeviation="5.86016"/> <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/> <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.18 0"/> <feBlend mode="normal" in2="effect1_innerShadow_86_67" result="effect2_innerShadow_86_67"/> </filter> </defs> </svg>',
        svg.rect(
          string.concat(
            svg.prop("x", "0"),
            svg.prop("width", "500"),
            svg.prop("height", "500"),
            // svg.prop("transform", "translaterotate(90 526.995 20.9999)("),
            svg.prop("fill", string(svgUtils.getRgba(_colorFill)))
          )
        ),
        renderHeader(emoji),
        renderPartnerOne(impactMarketFlag),
        renderPartnerTwo(ethicHubFlag),
        renderPartnerThree(gitcoinGrantFlag),
        renderFooter(balance, questCount),
        '<defs><style>.cls-1{fill:#FFF;}.text-shadow-md {text-shadow: 0px 4px 10px rgba(0, 0, 0, 0.12);}</style><linearGradient id="myGradient" gradientTransform="rotate(90)"> <stop offset="5%" stop-color="gold" /> <stop offset="95%" stop-color="red" /> </linearGradient></defs>',
        "</svg>"
      );
  }

  function _lib(bytes32 _key, bytes memory _value) internal view returns (string memory) {
    return SVGLibrary(_svgLibrary).execute(_key, _value);
  }

  function _registry(bytes32 _key, bytes memory _value) internal view returns (string memory) {
    return SVGRegistry(_svgRegistry).fetch(_key, _value);
  }

  function renderHeader(string memory emoji) internal view returns (string memory) {
    return
      string.concat(
        svg.text(
          string.concat(
            svg.prop("class", "text-shadow-md"),
            svg.prop("x", "5%"),
            svg.prop("y", "15%"),
            svg.prop("font-size", "26"),
            svg.prop("font-family", "EB Garamond"),
            svg.prop("dominant-baseline", "middle"),
            svg.prop("text-anchor", "start"),
            svg.prop("fill", "white")
          ),
          "Impact Card"
        ),
        svg.text(
          string.concat(
            svg.prop("class", "text-shadow-md"),
            svg.prop("x", "82%"),
            svg.prop("y", "15%"),
            svg.prop("font-size", "16"),
            svg.prop("font-family", "EB Garamond"),
            svg.prop("dominant-baseline", "middle"),
            svg.prop("text-anchor", "end"),
            svg.prop("fill", "white")
          ),
          "Built on Celo"
        ),
        svg.circle(
          string.concat(
            svg.prop("cx", "89.5%"),
            svg.prop("cy", "15%"),
            svg.prop("r", "25"),
            svg.prop("fill", "white"),
            svg.prop("stroke", string(svgUtils.getRgba(colorFill[1]))),
            svg.prop("stroke-width", "4")
          )
        ),
        svg.text(
          string.concat(
            svg.prop("x", "91.65%"),
            svg.prop("y", "16.5%"),
            svg.prop("font-size", "22"),
            svg.prop("font-family", "EB Garamond"),
            svg.prop("dominant-baseline", "middle"),
            svg.prop("text-anchor", "end"),
            svg.prop("fill", "white")
          ),
          emoji
        )
      );
  }

  function renderFooter(uint256 balance, uint256 questCount) internal view returns (string memory) {
    return
      string.concat(
        // '<svg x="5%" y="78%" width="27" height="37" viewBox="0 0 41 37" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M15.8015 32.674C22.2013 32.674 27.3892 27.3996 27.3892 20.8931C27.3892 14.3866 22.2013 9.1122 15.8015 9.1122C9.40167 9.1122 4.21373 14.3866 4.21373 20.8931C4.21373 27.3996 9.40167 32.674 15.8015 32.674ZM15.8015 36.9579C7.07485 36.9579 0 29.7652 0 20.8931C0 12.021 7.07485 4.82825 15.8015 4.82825C24.5281 4.82825 31.603 12.021 31.603 20.8931C31.603 29.7652 24.5281 36.9579 15.8015 36.9579Z" fill="#FFF"/> <path d="M24.229 27.8457C30.6288 27.8457 35.8167 22.5713 35.8167 16.0648C35.8167 9.55836 30.6288 4.28396 24.229 4.28396C17.8292 4.28396 12.6412 9.55836 12.6412 16.0648C12.6412 22.5713 17.8292 27.8457 24.229 27.8457ZM24.229 32.1297C15.5023 32.1297 8.42749 24.9369 8.42749 16.0648C8.42749 7.19276 15.5023 0 24.229 0C32.9556 0 40.0304 7.19276 40.0304 16.0648C40.0304 24.9369 32.9556 32.1297 24.229 32.1297Z" fill="#FFF"/> </svg>',
        '<svg id="Layer_1" x="5%" y="80%" width="25" height="25" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve"> <style type="text/css"> .st0{fill:#FBCC5C;} .st1{fill:#FFFFFF;} </style> <desc>Symbol for the Celo Gold currency</desc> <path class="st0" d="M50,0L50,0c27.6,0,50,22.4,50,50v0c0,27.6-22.4,50-50,50h0C22.4,100,0,77.6,0,50v0C0,22.4,22.4,0,50,0z"/> <g> <path class="st1" d="M78.6,44c0-12.4-10.1-22.5-22.5-22.5c-9.4,0-17.4,5.7-20.8,13.9c-8,3.4-13.7,11.4-13.7,20.7 c0,12.4,10.1,22.5,22.5,22.5c9.4,0,17.4-5.7,20.8-13.9C72.8,61.3,78.6,53.3,78.6,44z M44.1,73c-9.3,0-16.9-7.6-16.9-16.9 c0-5.3,2.5-10.1,6.4-13.2c0,0.4,0,0.8,0,1.1c0,12.4,10.1,22.5,22.5,22.5c0.5,0,0.9,0,1.4,0C54.3,70.5,49.5,73,44.1,73z M60.5,60.3 c-1.4,0.4-2.9,0.6-4.4,0.6c-9.3,0-16.9-7.6-16.9-16.9c0-1.5,0.2-2.9,0.6-4.2c1.4-0.4,2.9-0.6,4.4-0.6c9.3,0,16.9,7.6,16.9,16.9 C61,57.6,60.8,59,60.5,60.3z M66.6,57.2c0-0.4,0-0.8,0-1.1c0-12.4-10.1-22.5-22.5-22.5c-0.5,0-0.9,0-1.4,0c3.1-4,7.9-6.5,13.3-6.5 c9.3,0,16.9,7.6,16.9,16.9C72.9,49.4,70.4,54.1,66.6,57.2z"/> </g> </svg>',
        svg.text(
          string.concat(
            svg.prop("class", "text-shadow-md"),
            svg.prop("x", "11.5%"),
            svg.prop("y", "85%"),
            svg.prop("font-size", "28"),
            svg.prop("font-family", "EB Garamond"),
            svg.prop("dominant-baseline", "middle"),
            svg.prop("text-anchor", "start"),
            svg.prop("fill", "white")
          ),
          string(svgUtils.round2Txt(balance, 18, 3))
        ),
        svg.text(
          string.concat(
            svg.prop("class", "text-shadow-md"),
            svg.prop("x", "95%"),
            svg.prop("y", "85%"),
            svg.prop("font-size", "24"),
            svg.prop("font-family", "EB Garamond"),
            svg.prop("dominant-baseline", "middle"),
            svg.prop("text-anchor", "end"),
            svg.prop("fill", "white")
          ),
          string.concat(
            svgUtils.uint2str(questCount),
            "/3 "
            //  unicode"🌎"
          )
        )
        // svg.rect(
        //   string.concat(
        //     svg.prop("x", "86.35%"),
        //     svg.prop("y", "90%"),
        //     svg.prop("width", "42.5px"),
        //     svg.prop("height", "3px"),
        //     svg.prop("fill", "white"),
        //     svg.prop("fill-opacity", "0.75")
        //   )
        // )
      );
  }

  function renderPartnerOne(bool status) internal view returns (string memory) {
    string memory opacity_ = status ? "1" : "0.5";

    string memory inner = string.concat(
      '<svg width="100" height="60" viewBox="0 0 392 367" fill="none" xmlns="http://www.w3.org/2000/svg" x="25" y="20"> <path d="M246.581 101.13C268.05 116.814 281.838 142.023 281.838 170.459C281.838 217.828 243.437 256.229 196.068 256.229C148.699 256.229 110.298 217.828 110.298 170.459C110.298 142.023 124.086 116.814 145.555 101.13C167.474 85.1171 172.261 54.3682 156.249 32.4499C140.236 10.5316 109.487 5.74394 87.569 21.7564C41.8557 55.1523 12 109.322 12 170.459C12 272.117 94.41 354.527 196.068 354.527C297.726 354.527 380.136 272.117 380.136 170.459C380.136 109.322 350.28 55.1523 304.567 21.7564C282.648 5.74394 251.899 10.5316 235.887 32.4499" stroke="white" stroke-width="23.2758" stroke-linecap="round"/> <path d="M141.781 104.05C122.519 119.82 110.296 143.702 110.296 170.46C110.296 217.829 148.697 256.23 196.066 256.23C243.436 256.23 281.836 217.829 281.836 170.46C281.836 143.702 269.613 119.82 250.351 104.05C239.643 95.2844 238.069 79.4979 246.836 68.7903C255.602 58.0827 271.388 56.5088 282.096 65.2749C312.485 90.1537 331.949 128.044 331.949 170.46C331.949 245.506 271.112 306.342 196.066 306.342C121.02 306.342 60.1836 245.506 60.1836 170.46C60.1836 128.044 79.6476 90.1537 110.036 65.2749" stroke="white" stroke-width="23.2758" stroke-linecap="round"/> </svg>',
      svg.rect(string.concat(svg.prop("width", "150"), svg.prop("height", "120")), ""),
      svg.text(
        string.concat(
          svg.prop("x", "75"),
          svg.prop("y", "105"),
          svg.prop("font-size", "18"),
          svg.prop("alignment-baseline", "middle"),
          svg.prop("text-anchor", "middle"),
          svg.prop("fill", "white")
        ),
        "impactMarket"
      )
    );

    return
      string.concat(
        svg.g(
          string.concat(svg.prop("transform", "translate(25,90)"), svg.prop("opacity", opacity_)),
          inner
        )
      );
  }

  function renderPartnerTwo(bool status) internal view returns (string memory) {
    string memory opacity_ = status ? "1" : "0.5";
    string memory inner = string.concat(
      '<svg width="230" height="140" viewBox="0 0 1224 792" fill="#FFF" xmlns="http://www.w3.org/2000/svg" x="25" y="-20"><path class="cls-1" d="M229.84,379.43h0l-89.48-51.66a29.89,29.89,0,0,0-2.59,11.77V444.86a30,30,0,0,0,14.38,25.19l92.59,53.46a30.07,30.07,0,0,0,10.46,3V491.72a30,30,0,0,1-12.36-4l-.14-.07-64-36.94v0c-3.26-2.13-5.84-6.33-5.84-9.66s2.58-4.56,5.84-2.92h0l.21.13.26.13.27.16,49.16,28.39,16.07,9.28a29.87,29.87,0,0,0,10.51,3.06V444.42a29.6,29.6,0,0,1-11.82-3.77h0l-.24-.14-.3-.16-.09-.06-63.49-36.65c-.05,0-.11-.06-.17-.1l-.17-.1-.19-.11v0c-2.9-1.86-5.21-5.6-5.21-8.55s2.31-4,5.21-2.55v0l.34.21h0l0,0,64.84,37.43a29.74,29.74,0,0,0,11.26,3.47V394.07Zm53.09-18.93-105.4-60.85-25,14.43a30.05,30.05,0,0,0-9,8.21L258.19,388.5l34-19.64a30.22,30.22,0,0,0-9.29-8.36m-9.8,69.05.52-.29L298,415.2V386.92c0-.11,0-.22,0-.34a30,30,0,0,0-2.58-12.17l-34.05,19.66v39.24a30.06,30.06,0,0,0,11.76-3.76m105.61-89.71a30,30,0,0,0-2.53-12.07L339.47,349a29.82,29.82,0,0,1,2.33,8.65l.2.39v2.41c0,.23,0,.44,0,.67s0,.59,0,.89v38.94l-68.85,39.75-.14,0a29.92,29.92,0,0,1-11.64,3.7v34.77A29.75,29.75,0,0,0,273,475.51l69-39.85V483l21.74-12.56a.85.85,0,0,1,.19-.14,30.06,30.06,0,0,0,14.81-25.91,7.27,7.27,0,0,1,.08-1.07V340.82a6.17,6.17,0,0,1-.08-1M273,488.12l-.29.14a29.77,29.77,0,0,1-11.32,3.44v34.84a29.67,29.67,0,0,0,11.51-3.64L298,508.39V473.66Zm92.73-173-91.58-52.87a9.34,9.34,0,0,1-.95-.47,30.11,30.11,0,0,0-30.76.54,9.08,9.08,0,0,1-1.36.68l-10.34,6-9.09,5.25L326.91,335l.15.16a30.18,30.18,0,0,1,9.21,8.32L373,322.2a30.06,30.06,0,0,0-7.29-7.12"/></svg>',
      svg.rect(string.concat(svg.prop("width", "150"), svg.prop("height", "120")), ""),
      svg.text(
        string.concat(
          svg.prop("x", "75"),
          svg.prop("y", "105"),
          svg.prop("font-size", "18"),
          svg.prop("alignment-baseline", "middle"),
          svg.prop("text-anchor", "middle"),
          svg.prop("fill", "white")
        ),
        "EthicHub"
      )
    );

    return
      string.concat(
        svg.g(
          string.concat(svg.prop("transform", "translate(175,90)"), svg.prop("opacity", opacity_)),
          inner
        )
      );
  }

  function renderPartnerThree(bool status) internal view returns (string memory) {
    string memory opacity_ = status ? "1" : "0.5";
    string memory inner = string.concat(
      '<svg width="50" height="104" viewBox="0 0 117 144" fill="none" x="50" xmlns="http://www.w3.org/2000/svg"> <path d="M111.041 78.8701C111.041 89.1183 107.625 98.5124 101.647 106.483L99.3697 104.775L92.5376 99.6511C97.0923 93.673 99.6544 86.2715 99.6544 78.8701C99.6544 71.4686 97.377 64.3518 92.8223 58.6584L96.8077 54.9577L101.362 50.9723C107.625 58.6584 111.041 68.3372 111.041 78.8701V78.8701Z" fill="white"/> <path d="M99.3698 104.775L92.5377 99.651L79.4428 89.9722C82.0049 86.5561 83.7129 82.5707 83.7129 78.016C83.7129 74.8846 82.8589 71.7532 81.4355 69.1911L93.1071 58.3736L97.0925 54.6729L101.647 50.6875L113.034 40.1547L116.735 36.4539L112.465 32.1839C100.793 20.5123 85.4209 13.6802 68.91 13.1109V4.57073C68.91 2.00869 66.9173 0.0159912 64.3553 0.0159912C61.7932 0.0159912 59.8005 2.00869 59.8005 4.57073V13.3955C56.0998 13.6802 52.3991 14.5342 48.6983 15.3882V4.57073C48.6983 2.00869 46.7056 0.300661 44.1436 0.300661C41.5815 0.300661 39.5888 2.29336 39.5888 4.57073V18.8043C16.8151 29.0525 0.873535 51.8262 0.873535 78.3006C0.873535 113.315 28.7713 142.067 63.5012 143.49H115.027V115.877L101.647 106.483L99.3698 104.775V104.775ZM71.7567 78.3006C71.7567 82.5707 68.3407 85.9868 64.0706 85.9868C59.8005 85.9868 56.3845 82.5707 56.3845 78.3006C56.3845 74.0306 59.8005 70.6145 64.0706 70.6145C68.3407 70.6145 71.7567 74.0306 71.7567 78.3006ZM102.786 132.104H66.0633V131.819C36.4575 131.819 12.2604 107.906 12.2604 78.3006C12.2604 58.3736 23.0779 41.0087 39.3042 31.8992V50.9722C39.3042 53.2495 41.2969 55.2422 43.8589 55.2422C46.421 55.2422 48.4137 53.2495 48.4137 50.9722V27.6291C51.8297 26.4904 55.5304 25.6364 59.5158 25.0671C61.5085 24.7824 63.7859 24.7824 66.0633 24.7824H68.6253C80.0122 25.3517 90.545 29.3371 99.3698 36.4539L72.8954 60.9357C70.3334 59.5123 67.202 58.943 64.0706 58.943C53.5377 58.943 44.7129 67.4831 44.7129 78.3006C44.7129 88.8335 53.2531 97.6583 64.0706 97.6583C65.7786 97.6583 67.202 97.3736 68.91 97.0889L74.8881 101.359L103.071 121.855V132.104H102.786Z" fill="white"/> </svg> ',
      svg.rect(string.concat(svg.prop("width", "150"), svg.prop("height", "120")), ""),
      svg.text(
        string.concat(
          svg.prop("x", "75"),
          svg.prop("y", "105"),
          svg.prop("font-size", "18"),
          svg.prop("alignment-baseline", "middle"),
          svg.prop("text-anchor", "middle"),
          svg.prop("fill", "white")
        ),
        "Gitcoin Grants"
      )
    );

    return
      string.concat(
        svg.g(
          string.concat(svg.prop("transform", "translate(325,90)"), svg.prop("opacity", opacity_)),
          inner
        )
      );
  }
}
