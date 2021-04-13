import fs from "fs";

const torIPs = fs.readFileSync("/exitNodes/tor-exit-nodes.txt");

// if (!torIPs) return false;

export default torIPs;
