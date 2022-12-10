# listol

LISTOL is a minimal language for describing **list** **o**f **l**ist.

```
- a
 - hoge
 - c
  - d
```

in JSON: (But there is no semantic rule. This is just an example.)

```json
[
  {
    "text": "a",
    "children": [
      {
        "text": "hoge",
        "children": []
      },
      {
        "text": "c",
        "children": [
          {
            "text": "d",
            "children": []
          }
        ]
      }
    ]
  }
]
```

You can omit `-` prefix to make list item.

```
- a
 hoge
 c
  -d
```

Nesting is represented by indenting more than the previous line.

```
- a
      hoge
      c
         -d
```

To escape newline, use `\` in the end of line.

```
- a
      ho\
ge
      c
         -d
```

Done! Enjoy listol!

## Using npm package

```
npm i listol
```

```ts
import { parse } from "listol";

console.log(parse`
- a
 - hoge
 - c
  - d
`)
```
