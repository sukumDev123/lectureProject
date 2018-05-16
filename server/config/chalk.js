import chalk from "chalk";



export function chalkF(color, msg) {
    console.log(chalk.rgb(color[0], color[1], color[2]).bold(msg))
}