export type Node = {
  text: string;
  children: Node[];
};
export function parse(code: string): Node[] {
  const lines = code.split(/\r?\n/);

  function linesToNodes(preIndent: number, nodes: Node[]): Node[] {
    let line: string | undefined = undefined;

    // skip empty lines.
    do {
      line = lines.shift();
    } while (line === "");
    if (line === undefined) return nodes;

    while (line[line.length - 1] === "\\") {
      const nextLine = lines.shift();
      if (nextLine === undefined) break;
      line = `${line.slice(0, line.length - 1)}${nextLine.trimStart()}`;
    }

    const lineMatch = line.match(/^( *)(-)?(.+)$/m);
    if (lineMatch === null) return nodes;
    let [_1, whitespaces, _2, textSection] = lineMatch;

    const indent = whitespaces.length;
    const text = textSection.trimStart();

    if (indent > preIndent) {
      const children = linesToNodes(indent + 1, []);

      return [
        {
          text,
          children,
        },
      ].concat(linesToNodes(indent, []));
    } else if (indent === preIndent) {
      return nodes
        .concat([
          {
            text,
            children: linesToNodes(indent + 1, []),
          },
        ])
        .concat(linesToNodes(indent, []));
    } else {
      lines.unshift(line);
      return nodes;
    }
  }

  return linesToNodes(0, []);
}
