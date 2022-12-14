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

There are only **5+1** rules.

*1.* You can omit `-` prefix to make list item.

```
- a
 hoge
 c
  -d
```

*2.* Nesting is represented by indenting more than the previous line.

```
- a
      hoge
      c
         -d
```

*3.* To escape newline, use `\` in the end of line.

```
- a
      ho\
      ge
      c
         -d
```

*4.* Empty lines are ignored.

```

- a

      ho\
      ge

      c
         -d

```

*5.* **No syntax error!** Every strings are accepted.

*6.* Done! Enjoy LISTOL!

## Using npm package

```
npm i listol
```

```ts
import { parse } from "listol";

console.log(parse(`
- a
 - hoge
 - c
  - d
`))
```
