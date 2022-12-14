
/** @param {import(".").NS } ns **/
export async function main(ns) {
    if (ns.args.length < 3) {
        ns.tprint(" no Arguments given. Format: \nrun basic.js hostName targetName");
        return;
    }
    let host = ns.args[0];
    let target = ns.args[1];
    let freeThreads = ns.args[2];
    while (true) { 
    let moneyThresh = ns.getServerMaxMoney(target) * 0.75;
    let securityThresh = ns.getServerMinSecurityLevel(target) + 5;
    while(true) {
        if (ns.getServerSecurityLevel(target) > securityThresh) {
            await ns.weaken(target, {threads: freeThreads });
        } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
            await ns.grow(target, {threads: freeThreads });
        } else {
            await ns.hack(target, {threads: Math.min(freeThreads,50) });
            }
        }
    }
}

