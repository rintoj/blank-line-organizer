# Blank Line Organizer

This extension will help you organize blank lines in the code by removing multiple blank lines. The extension removes blank lines only from the selected lines if any, otherwise from the entire file.

## Demo

![Demo](./demo/demo.gif)

## Usage

Press `Ctrl + ;` / `Cmd + ;`

or

Enter `Ctrl/Cmd + P` search for `> Remove blank lines`

or

Set triggerOnSave to true and save the file

## Configuration

| Configuration                   | Type      | Default Value | Description
| ------------------------------- | --------- | ------------- | -----------------------------
| blankLine.keepOneEmptyLine      | `boolean` | `true`        | Set to false to remove all blank lines or true to keep one.
| blankLine.triggerOnSave         | `boolean` | `true`        | If set to true, the command will be triggered on save.
| blankLine.insertLineAfterBlock  | `boolean` | `true`        | If set to true inserts a blank line after block statement (unless the next line is also closing a block).
| blankLine.removeBlockPadding    | `boolean` | `true`        | If set to true removes all blank lines after opening and before closing a block statement.
| blankLine.languageIds           | `string[]`| `["javascript", "typescript", "json", "css", "scss"]` | Trigger this command on save, only if current language-id is in the list

NOTE: By default the extension is configured to format on save, you can disable this by setting `blankLine.triggerOnSave` to `false`.

## Contributing

Contributions are very welcome! Just send a pull request. Feel free to contact me or checkout my [Github](https://github.com/LucasAMello/blank-line-organizer-plus) page.

## Author

**Lucas Mello** (LucasAMello)

Follow me:
  [Github](https://github.com/LucasAMello)

## License

```
The MIT License (MIT)

Copyright (c) 2021 Lucas Mello (LucasAMello)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

**Enjoy!**
