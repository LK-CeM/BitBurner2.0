import { getServerInfo } from "./lib/lib";
/** @param {import(".").NS } ns **/
export async function main(ns) {
    
    if (ns.args.length < 2){
        ns.tprint(" no Arguments given. Format: \nrun basic.js hostName targetName");
        return;
    }
    ns.disableLog("ALL");
    let weakenPID = -1; 
    let growPID = -1;
    let hackPID = -1;
    let host = ns.args[0];
    let freeThreads = 0;
    while (true){ // hold a list of running pids and check every second if they are stil running
    let target = getServerInfo(ns, ns.args[1], false);
    freeThreads = Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / 1.75);
    target.freeThreads = freeThreads;
    if (freeThreads < 1){ 
       ns.print("freeThreads < 1 ... waiting.")
       await ns.sleep(10000-freeThreads*10);
       continue;
    }

    if (!ns.isRunning(weakenPID)){
        if (target.secLevel >= target.minSecLevel + 0.05 * freeThreads ){ //  0.05 == ns.weakenAnalyze(1)
            weakenPID = ns.exec("lib/weaken.js", host, freeThreads, target.name);
            ns.print("weaken on target: ",target);
            continue;
        }
    }
    if (!ns.isRunning(growPID)){
        if (target.money < target.maxMoney * 0.75){
            growPID = ns.exec("lib/grow.js", host, freeThreads, target.name);
            ns.print("grow on target: ",target);
            continue; 
            }
        }
    if (!ns.isRunning(hackPID)){
        if (target.money >= target.maxMoney * 0.75){
            hackPID = ns.exec("lib/hack.js", host, freeThreads, target.name);
            ns.print("hack on target: ",target);
            }
        }
        
    }   
}