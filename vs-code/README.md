# Sadako Script

## Features

Syntax highlighting for Sadako script. All grammar is accounted for.

## Known Issues

* The `<>` attach token is able to be used inside a `::` line conditional. 
* The `@:` name, `::` condition, and `>>` jump tokens highlight everywhere instead of just inside their respective blocks.

## Change Log

### 1.5
- Added highlighting for `>>` jump token to mark passing of arguments.
- Added highlighting for `&.` and `&:` engine tokens. 

### 1.4
- Inline comments using `//` token can only begin a line now.

### 1.3
- Reserved words are now case insensitive.

### 1.2
- Any (or no) amount of space is allowed between `else` and `if` in `~ else if` conditionals.

### 1.1

- Added support for `+ >>=` choice include tokens.
- Fixed issue where `<>` attach token wasn't highlighting before `::` inline condition tokens.
- Changed all instances of `\s` in regexp to `[\t\ ]`. This may not be necessary since TextMate format only supports single line matching, but it's better to be safe.

### 1.0

- Initial release