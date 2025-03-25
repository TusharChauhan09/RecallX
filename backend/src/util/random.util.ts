export function random(len: number): string {
  let options = "hgjdksusnskaldrnfjjj";
  let linkString: string = "";
  for (let i = 0; i < len; i++) {
    linkString += options[Math.floor(Math.random() * options.length)];
  }
  return linkString;
}
