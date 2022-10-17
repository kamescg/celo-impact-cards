import { HardhatRuntimeEnvironment } from "hardhat/types";

export default async function deploy(hardhat: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts } = hardhat;

    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const svg = await deploy("svg", {
      contract: "contracts/svg/svg.sol:svg",
      from: deployer,
      args: [],
      skipIfAlreadyDeployed: true,
      log: true,
    });
    
    const svgUtils = await deploy("svgUtils", {
      contract: "contracts/svg/svgUtils.sol:svgUtils",
      from: deployer,
      args: [],
      skipIfAlreadyDeployed: true,
      log: true,
    });

    const SVGColor = await deploy("SVGColor", {
      contract: "contracts/svg/SVGColor.sol:SVGColor",
      from: deployer,
      args: [],
      skipIfAlreadyDeployed: true,
      log: true,
    });
    
    const SVGLibrary = await deploy("SVGLibrary", {
      contract: "contracts/svg/SVGLibrary.sol:SVGLibrary",
      from: deployer,
      libraries: {
        svg: svg.address,
        svgUtils: svgUtils.address
    },
      args: [SVGColor.address],
      skipIfAlreadyDeployed: true,
      log: true,
    });

    await deploy("SVGRegistry", {
      contract: "contracts/svg/SVGRegistry.sol:SVGRegistry",
      from: deployer,
      args: [],
      skipIfAlreadyDeployed: true,
      log: true,
    });
}
