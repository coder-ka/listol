export type Node = {
  text: string;
  children: Node[];
};
export function parse(code: string): Node[] {
  function linesToNodes(
    preIndent: number,
    lines: string[],
    nodes: Node[]
  ): Node[] {
    const line = lines.shift();
    if (!line) return nodes;
    const lineMatch = line.match(/^( *)(-)?(.+)$/m);
    if (lineMatch === null) return nodes;
    let [_1, whitespaces, _2, textSection] = lineMatch;
    let lineEnd = textSection[textSection.length - 1];
    while (lineEnd === "\\") {
      const nextLine = lines.shift();
      if (nextLine === undefined) break;
      textSection = `${textSection}
  ${nextLine};`;

      lineEnd = nextLine[nextLine.length - 1];
    }
    const indent = whitespaces.length;
    const text = textSection.trim();

    if (indent > preIndent) {
      const children = linesToNodes(indent + 1, lines, []);

      return [
        {
          text,
          children,
        },
      ].concat(linesToNodes(indent, lines, []));
    } else if (indent === preIndent) {
      return nodes
        .concat([
          {
            text,
            children: linesToNodes(indent + 1, lines, []),
          },
        ])
        .concat(linesToNodes(indent, lines, []));
    } else {
      lines.unshift(line);
      return nodes;
    }
  }

  const lines = code.split(/\r?\n/);

  return linesToNodes(0, [...lines], []);
}
