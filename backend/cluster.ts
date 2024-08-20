import { spawn } from "bun";
const cpus = navigator.hardwareConcurrency;
const buns = new Array(cpus);
for (let i = 0; i < cpus; i++) {
  buns[i] = spawn({
    cmd: ["bun", "./src/app.ts"],
    stdout: "inherit",
    stderr: "inherit",
    stdin: "inherit",
  });
}
