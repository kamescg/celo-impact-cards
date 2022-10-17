import { utils } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

export default async function deploy(hardhat: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts, ethers } = hardhat;

    const { deploy } = deployments;
    const { deployer, ethicHub, impactMarket, administrator  } = await getNamedAccounts();

    const SVGRegistry = await deployments.get("SVGRegistry");
    const SVGLibrary = await deployments.get("SVGLibrary");

    const svgRegistry = await ethers.getContractAt("contracts/svg/SVGRegistry.sol:SVGRegistry", SVGRegistry.address);
    
    const ImpactCardSvgModule = await deploy("ImpactCardSvgModule", {
      contract: "ImpactCardSvgModule",
      from: deployer,
      args: [SVGLibrary.address],
      skipIfAlreadyDeployed: true,
      log: true,
    });

    // await svgRegistry.setWidget("0x464f554e44455200000000000000000000000000000000000000000000000000", ImpactCardSvgModule.address);

    console.log(SVGLibrary.address, SVGRegistry.address)
    const ImpactCardRender = await deploy("ImpactCardRender", {
      contract: "ImpactCardRender",
      from: deployer,
      args: [SVGLibrary.address, SVGRegistry.address],
      skipIfAlreadyDeployed: true,
      log: true,
      gasPrice: utils.parseUnits("10", "gwei"),
    });
    
    const ImpactCardTraits = await deploy("ImpactCardTraits", {
      contract: "ImpactCardTraits",
      from: deployer,
      args: [],
      skipIfAlreadyDeployed: true,
      log: true,
    });

    const contactInformation = {
      name: "ImpactCard",
      description: "ImpactCards - Built on Celo.",
      image: "",
      externalLink: "https://impactcards.xyz",
      sellerFeeBasisPoints: "0",
      feeRecipient: "0x0000000000000000000000000000000000000000",
    };

    const ImpactCardStorage = await deploy("ImpactCardStorage", {
      contract: "ImpactCardStorage",
      from: deployer,
      args: [ImpactCardRender.address, ImpactCardTraits.address, contactInformation],
      skipIfAlreadyDeployed: true,
      log: true,
    });
    
    // console.log(impactMarket, ethicHub, administrator, 'DEPLOYY')

    const ImpactCardOracle = await deploy("ImpactCardOracle", {
      contract: "ImpactCardOracle",
      from: deployer,
      args: [impactMarket, ethicHub, administrator],
      skipIfAlreadyDeployed: true,
      log: true,
      gasPrice: utils.parseUnits("10", "gwei"),
    });

    const ImpactCard = await deploy("ImpactCard", {
      contract: "ImpactCard",
      from: deployer,
      args: ["Impact Card", "IMPACT", ImpactCardStorage.address, ImpactCardOracle.address],
      skipIfAlreadyDeployed: true,
      log: true,
      gasPrice: utils.parseUnits("10", "gwei"),
    });
    
    // const ImpactCardMinter = await deploy("ImpactCardMinter", {
    //   contract: "ImpactCardMinter",
    //   from: deployer,
    //   args: [ ImpactCardStorage.address, ImpactCard.address],
    //   skipIfAlreadyDeployed: true,
    //   log: true,
    //   gasPrice: utils.parseUnits("10", "gwei"),
    // });
    
    // const minter = await ethers.getContractAt("ImpactCardMinter", ImpactCardMinter.address);
    // await minter.mint(deployer);
}
