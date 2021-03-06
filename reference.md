## Sadako Script Reference

#### Table of Contents

* [Comments](#comments)
    * [Comment Block](#comment-block) `/* */`
    * [Line Comment](#line-comment) `//`
    * [Escape](#escape) `\`
    * [Line Concatenation](#line-concatenation) `\`

* [Story Sections](#story-sections)
    * [Pages](#pages) `##`
        * [Tags](#tags) `~:`
    * [Inline Labels](#inline-labels) `{ }`
    * [Jumps](#jumps) `>>`
        * [Arguments](#arguments)
    * [Returns](#returns) `<<`
        * [Includes](#includes) `>>=`

* [Text Formatting](#text-formatting)
    * [Line Ending](#line-ending) `;;`
    * [Text Attachment](#text-attachment) `<>`
    * [Span Markup](#span-markup) `<: :>`
    * [Tags](#tags-1) `~:`
        * [Class](#class)
        * [Choice](#choice)
        * [Delay](#delay)
        * [User Defined](#user-defined)

* [Variables and Conditionals](#variables-and-conditionals)
    * [Variable Embedding](#variable-embedding)
        * [For use in Story Script](#for-use-in-story-script) `:`
        * [For use in Script Blocks](#for-use-in-script-blocks) `.`
        * [var, tmp](#var-tmp) `$.` `$:` `_.` `_:`
        * [page_seen, label_seen](#page_seen-label_seen) `#.` `#:` `%.` `%:`
        * [text](#text) `~~=` `~~+`
        * [scripts](#scripts) `^.` `^:`
        * [scenes](#scenes) `*.` `*:`
        * [processScript()](#processscript) `{{ }}`
    * [Conditional Display](#conditional-display) `::`
    * [Inline Text Options](#inline-text-options) `{: :}`
* [Script Blocks](#script-blocks)
    * [Redirects](#redirects) `[: :]` `[:# :]` `[:% :]`
    * [Arguments](#arguments-1)
    * [JavaScript](#javascript) `[:& :]` `[:= :]`
        * [Internal Script Blocks](#internal-script-blocks)
    * [Input Boxes](#input-boxes) `[:> :]` `[:>> :]`
    * [Reveal Links](#reveal-links) `[:+ :]` `[:+# :]` `[:+% :]` `[:+& :]` `[:+= :]` `[:+> :]`
    * [Dialog Links](#dialog-links) `[:* :]` `[:*! :]` `[:*# :]` `[:*% :]` `[:*& :]` `[:*= :]`
* [Macros](#macros) `(: :)`

* [Choices](#choices)
    * [Choice Formatting](#choice-formatting) `[ ]`
    * [Choice Links](#choice-links) `<< >>`
    * [Static Choice](#static-choice) `+`
    * [Labels](#labels) `{ }`
    * [Limited Choice](#limited-choice) `*`
    * [Fallback Choice](#fallback-choice)
    
* [Depths](#depths)
    * [Depth Token](#depth-token) `-`
    * [Depth Labels](#depth-labels) `=`
    
* [Condition Block](#condition-block)
    * [Branches](#branches) `~ if` `~ else if` `~ else`
    * [Loops](#loops) `~ for` `~ while`

* [Scenes](#scenes-1) `*.` `*:`
    * [Examples](#examples)
    * [Defining](#defining)

* [Saving Checkpoints](#saving-checkpoints)

## Comments

### Comment Block

`/*` `*/`

Anything within the these tokens is removed from the story script before it's even parsed. Because of this, it will also ignore line breaks.

```
/*
None of this will matter.
So write whatever you want.
*/
```


### Line Comment

`//`

When a line begins with this token, the entire line will be ignored by **Sadako**. This only affects this one line.

```
// This text will not display.
This text will also display.
This URL will also display correctly: http://www.bleh.com/
```

If you need to comment in the middle of a line, you should use the `/* */` block comments.

```
This text will display. /* This text will not display. */
```


### Escape

`\`

An escape token is used to prevent **Sadako** from recognizing depth tokens such as `+`, `*`, `-`, and `~`. These tokens and their functions will be explained in depth later.
```
*** You win! ***

// outputs (a choice, which is not what we want)
<You win! ***>
```
```
\*** You win! ***

// outputs (desired output)
*** You win! ***
```

The collecting of these tokens by Sadako happens during compilation, and so this token is only looked for during compilation. Attempting to escape any tokens other than depth tokens will not work.


### Line Concatenation

`\`

When the `\` escape token ends a line, it will join that line and following line together.

```
## page1 \
    ~:tag1 \
    ~:tag2

// is read by the compiler as:
## page1 ~:tag1 ~:tag2
```

Later on you will read about the `<>` attach token which appears to do something similar. The difference between this token and that token is that is this one is used during the compiling. By the time your game starts, these lines will have already been formed into a single line.

## Story Sections

#### Naming

Internally, page and label names are converted to lowercase, apostrophes are replaced with underscores, and quotes are stripped. So `useless "Hope's Peak" pamphlet` becomes `useless hope_s peak pamplet`. In fact, `useless "Hope's Peak" pamphlet`, `useless hope's peak pamphlet`, and `useless hope_s peak pamplet` are treated as synonyms. 

You'll see how this works below, but what this means is that you can do this:

```
## Page1
    // notice the two different cases to the links
    [:Keys:] are sitting on the table. They're the [:keys:] to your car.
    
## keys
    // both links direct here
    They're your car keys!
```
    
Without the case insensitivity in place, you would have had to type `[:keys @: Keys:] are sitting on the table.`, which is a bit awkward.


### Pages

`##`

**Sadako**'s story script is divided by pages. The name for each page is defined like so.

```
## Page1
    This is the first page.

## Page2
    This is the second page.
```

When you redirect to a page, **Sadako** will proceed line by line through the script within that page. When it reaches the end, it will stop. A page can be written simply and only display a full screen of text, or it can be complex and full of links, choices, and jumps. The only way out of a page is through a jump of some sort, which will be explained shortly.

Every time you're redirected to a page, the *seen* counter increases by 1. This is stored in `sadako.page_seen["Page1"]` (using "Page1" as an example). This value can be used to check whether a page has been visited and how many times.

#### Tags

Pages may also have tags using the `~:` tag token after the page name.

```
## Page1 ~:test
```

In this example, the page is assigned a tag called `test`. Unless a value is assigned, a tag is always assigned the value of `true`. If you wish to assign a value, place a `:` between the tag name and its value.

```
## Page1 ~:blah:some text ~:test:20
```

In the example above, `Page1` is given a `blah` tag with the value of `some text` and a `test` tag with the value of `20`. Spaces are allowed in a tag value, as you can see.

On their own, tags don't do anything. However, you can check for them and their value in `sadako.tags[<page_name>]`. For example:

```
// sadako script
## Page1 ~:blah:some text

// javascript
if ("blah" in sadako.tags.Page1) console.log(sadako.tags.Page1.blah);

// outputs to javascript console
some text
```


### Inline Labels

`{` `}`

A label marks a line of the script so that you can redirect the script to it whenever you wish. If you are familiar with programming `gosub` and `return` concepts, this is the label for use with that.

The actual use of the `{ }` label will be described in the `>>` jump token and `<<` return token sections.

Whenever the script processes a line with the `{ }` label tokens, the *seen* counter for that label is increased by 1. This is stored in `sadako.label_seen["foo"]` (using "foo" as an example), which is abbreviated to `%.foo` in sadako script. This value can be used to check whether a label has been seen and how many times.

An important thing to note is that the label seen count is increased *after* the script line is processed. Also, a choice with a label only increases the seen count if it is selected or jumped to, not when it is displayed.

Inline labels are not allowed on condition blocks and will be stripped during compiling.

Because of the way that labels are handled by **Sadako**, it is recommended that you only include alphanumeric characters and underscores in their naming.


### Jumps

`>>`

The jump token is used to redirect the story script to a defined label or page. Jumping to a page or label increases its *seen* count stored in `sadako.page_seen["page_name"]` and `sadako.label_seen["label_name"]` respectively.

**Sadako** assumes that a label that does not include the page is local. In order to jump outside that page, include the page in the jump command. The following is an example of label jumping.

```
## Page1
    This is page 1.

    // jumps to local "foo" label
    >> foo

    This line won't print because the script jumps over it.

    {foo}
    This is still page 1.

    // jumps to "bleh" in "Page3"
    >> Page3.bleh

## Page2
    {asdf}
    This is page 2.

## Page3
    {bleh}
    This is page 3.

    // jumps to "Page2"
    >> Page2.asdf


// outputs
This is page 1.
This is still page 1.
This is page 3.
This is page 2.
```

Page jumps must include the `#` page token before its name.

```
## Page1
    Some display text.
    >> #Page2
## Page2
    Hello!

// outputs
Some display text.
Hello!
```

#### Arguments

Arguments can be passed to a jump call via a `>>` jump token following the page or label.

The arguments must be JavaScript and the value will be assigned to `sadako.args`, which can be easily accessed with `&.args` and `&:args`.

```
## page1
    >> #greet >> "Bob"

## greet
    Hello, &:args!
    
// outputs
Hello, Bob!
```

Any javascript is valid as an argument and arguments are unique to each jump.

```
## page1
    >> #greet >> ["Bob", "Sam"]

## greet
    "Hello!" &:args[0] shouted.
	>> reply >> "&:args[1]"
	"Hi, &:args[1]. My name is &:args[0]."
	<< END

	= reply
	"Hey there. I'm &:args"
	<<
    
// outputs
"Hello!" Bob shouted.
"Hey there. I'm Sam"
"Hi, Sam. My name is Bob."
```

Notice on the reply line that we put `&:args[1]` in quotes. `&:` prints out the value but it's not wrapped in quotes, and so we need to do this. 

The important takeaway from this is that the arguments in the jump to "reply" holds a different value than when we jumped to the "greet" page. The values in the "greet" arguments are returned after jumping back.

### Returns

`<<`

The return token is designed to leave the current story block. On its own, the `<<` return token returns the script back to the last activated `>>` jump token. This has the effect of creating functions in the story script. The caveat to this is that if the jump were to a page instead of a label, the `<<` token (excluding `<< RETURN`) will end the script processing instead of returning.

```
Print it once:
>> multiuse_text
Print it again:
>> multiuse_text
<< END

// the script does not fall through to this line because of << END.
{multiuse_text}
This is text that you can print in many places if you like.
<<


// outputs
Print it once:
This is text that you can print in many places if you like.
Print it again:
This is text that you can print in many places if you like.
```

Jumps are pushed onto a stack, so you can do multiple levels of jumps.

```
Line 1.
>> jump1
The End.
<< END

{jump1}
Line 2.
>> jump2
<<

{jump2}
Line 3.
<<


// outputs
Line 1.
Line 2.
Line 3.
The End.
```

It has a few different functions when followed by keywords. They are case sensitive.

* `<< RETURN`

    Returns the script to the top line of this page.

* `<< END`

    Stops the current block of story script from proceeding past this line. Useful for including labels below main script and using them like functions as in the example above.

* `<< ABORT`

    Same as `<< END` but more aggressive. It quits the current script and does not display any text. All script blocks and jumps before this command will still be executed but no output will be displayed. The `ABORT` call is useful helping avoid some pitfalls that arise when calling `sadako.doLink()` and `sadako.closeDialog()` from within a `[: :]` script block.


#### Includes

`>>=`

If you include the `=` value token before the page or label to jump to, **Sadako** will jump to that page or label, but instead of ending output when it reaches the end of the script, it will jump back to where it was.

An example without the `>>=` include token:

```
This ends early.
>> test
You won't see this.
<< END

= test
Something to print.
<< END


// outputs
This ends early.
Something to print.
```

An example using the `>>=` include token:

```
This won't exit early.
>>= test
You'll be able to see this now.
<< END

= test
Something to print.
<< END


// outputs
This ends early.
Something to print.
You'll be able to see this now.
```

By using the `>>=` include token, it won't stop processing the script when it sees `<< END`. Similarly, using it in conjunction with page jumps, it will include that page's contents in with the current page. This is similar to using the `<<` return token with label jumps.

An example without the `>>=` include token:

```
## Page1
    Some example text.
    >> #Page2
    This won't be displayed.

## Page2
    Hello!

// outputs
Some example text.
Hello!
```

An example using the `>>=` include token:

```
## Page1
    Some example text.
    >>= #Page2
    This text can be seen now.

## Page2
    Hello!

// outputs
Some example text.
Hello!
This text can be seen now.
```

Includes do not process `+` static choices or `*` limited choices Once the include script sees a choice, it will return to the the script that included without adding the choice. To include choices in your `>>=` include, you must precede it with the `+` static choice token (adjusting for the correct depth level), like so:

```
+ >>= some_page.choice_list 
```

Further information can be found in the [choice includes](#choice-includes) section.

## Text Formatting

### Line Ending

`;;`

Separates lines of the script. **Sadako** uses carriage returns to separate lines, so this token is only necessary if you would like to include multiple statements on the same line for convenience.

```
Hello world!;; This is the second line
```

This is the same as

```
Hello world!
This is the second line
```


### Text Attachment

`<>`

Attaches two lines of text together. `<>` can begin or end a line. If it begins the line, it'll be attached to the previous line. If it ends the line, the next one will be attached to this one.

```
This line <>
will become whole.

So will
<> this one.

You can
<> do both <>
at once.


// outputs:
This line will become whole.
So will this one.
You can do both at once.
```


### Span Markup

`<:` `:>`

Span token. This is used to easily attach a CSS class to a block of text. You separate the CSS class from the text using `::`. It doesn't save a ton of typing, but it makes the story script a bit more readable.

    <:test::This will use the "test" class.:>

    // outputs
    <span class="test">This will use the "test" class.</span>


### Tags

`~:`

Tags are used to alter the output or display of a line. Any number of tags can be added to a line.

There are also three hardcoded tags in **Sadako** in addition to any user defined tags: `class`, `choice`, and `delay`.

#### Class

`class:<classname>` (alias `c:<classname>`): Adds a CSS class to the line.

```
This will be displayed using the "test" class. ~:class:test

// outputs
<div class="test">This will be displayed using the "test" class.</div>
```

#### Choice

`choice` (no value): Displays the current line as though it were a choice. Useful for links that run javascript.

```
[:& alert("Boo!") @: Fake Choice.:] ~:choice

// outputs (output is simplified for example purposes)
<ul><li class="choice"><a onclick='alert("Boo!")'>Fake Choice</a></li></ul>
```

#### Delay

`delay:<XXXX.X>`: Amount of time in milliseconds (1000.0 = 1 second) to delay the display of this line and all lines following it.

The `delay` tag can be tricky. Basically, as each line is printed, it's set to delay for the amount of this delay plus `sadako.text_delay`.

```
Normal text.
This will take 5 seconds to display. ~:delay:5000
This will take 3 seconds to display. ~:delay:3000
This will also take 3 seconds.

// the choice will take 6 seconds to display
- ~:delay:6000
+ [Some Choice]
```

In the above example, the second line of text will actually take longer to display than the third line of text.

Also, notice how it uses an empty `-` depth token to set the delay for the choice. Unlike `class` tags, `delay` will not work on choices because of the way they are displayed. Therefore, you should set it before displaying the choice. This trick also works with doing things like jumps which also don't allow tags. To remove the additional delay, just use the `delay` tag with a value of `0`.

#### User Defined

**Sadako** provides two functions intended to be overwritten by the user. These are `sadako.doLineTag()` and `sadako.doChoiceTag()`. The return value is an array containing the text to display as the first element and classes to be added to the line as the remaining elements. Classes do not have to be provided, and if nothing is returned from the function, no text will be printed.

By default, each function looks like this:

```
sadako.doLineTag = function(text, tag) { return [text]; }
sadako.doChoiceTag = function(text, tag) { return [text]; }
```

Obviously this does nothing as it is. However, here's an example of how you can make use of the functions.

```
sadako.doLineTag = function(text, tag) {
    if (tag === "erin") return ['Erin says, "' + text + '"', "test1", "test2"];
    return [text];
}

// in story script
Hi! ~:erin


// outputs
<div class="test1 test2">Erin says, "Hi!"</div>
```

This function is called once per tag with the current text and tag (converted to lowercase) as the arguments. Text you return from one function call will be sent as the argument for the function call of the next tag for this line. This is so you can keep modifying the text with each new tag if desired.

Tags must come before a `::` conditional token since it's considered part of the line. Conditionals will be explained in a little bit.

```
Write it just like this. ~:test1 ~:test2 :: $.blah == 1
```


## Variables and Conditionals


### Variable Embedding

For convenience sake, there are tokens that allow easy embedding of **Sadako** variables. They are as follows. (*foo* will be used as an example variable/text and does not actually exist.)

#### For use in Story Script

* `&:foo` becomes the value of `sadako.foo`
* `$:foo` becomes the value of `sadako.var.foo`
* `_:foo` becomes the value of `sadako.tmp.foo`
* `*:foo` becomes the value of `sadako.scenes.foo`
* `#:foo` becomes the value of `sadako.page_seen["foo"]`
* `%:foo` becomes the value of `sadako.label_seen["foo"]`
* `^:foo` becomes the value of `sadako.scripts.foo` or (`sadako.scripts.foo()` if a function)

```
The color of the gem was a bright $:color.

// outputs (assuming sadako.var.color is "green")
The color of the gem was a bright green.
```

```
// javascript
sadako.scripts.foo = function() {
    if (sadako.var.test) return "Success";
    return "Fail";
}

// sadako script
Test result: ^:foo

// outputs (assuming sadako.var.test is true)
Test result: Success
```

Script blocks will be described soon, but just know that the script inside the `[: :]` script block in this example is being executed, not displayed.

#### For use in Script Blocks
* `&.foo` becomes `sadako.foo`
* `$.foo` becomes `sadako.var.foo`
* `_.foo` becomes `sadako.tmp.foo`
* `*.foo` becomes `sadako.scenes.foo`
* `#.foo` becomes `sadako.page_seen["foo"]`
* `%.foo` becomes `sadako.label_seen["foo"]`
* `^.foo` becomes `sadako.scripts.foo` (or `sadako.scripts.foo()` if a function)
* `~~=foo` becomes `sadako.text = foo`
* `~~+'foo'` becomes `sadako.text += 'foo'`
* `{{foo}}` becomes `sadako.processScript(foo)`

To make sense of this, a few things should be explained briefly.

#### var, tmp

`sadako.var` is an object variable that contains user defined variables. These variables are automatically saved to disk when you save the game.

`sadako.tmp` is also an object variable that contains user defined variables. However, these variables are cleared every time `sadako.doLink()` and `sadako.doChoice()` are called. That is to say, any time you click a link or call a function that progresses the story script.

It's very important to know that includes maintain their own set of temporary variables. These rules apply to anything that does includes, which are primarily the `>>=` token, the `[:+# :]` and `[:+% :]` reveal tokens, and the `sadako.doInclude()` function.

```
## page1
    [:& _.test = "first":]
    This is page 1.
    Value of test: _:test
    >>= #page2
    Page 1 again.
    Value of test: _:test

## page2
    = test
    This is page 2.
    Value of test: _:test

    [:& _.test = "second":]
    Value to set to: _:test
    <<

// outputs
This is page 1.
Value of test: first
This is page 2.
Value of test: undefined
Value to set to: second
Page 1 again.
Value of test: first
```

Notice how the temporary variables were cleared upon entering `page2`, but then restored to `page1`'s values after leaving.

Look at the result if we changed the `>>=` include to a normal `>>` jump to the `page2.test` label. (Jumping to a page does not allow a return jump like a label does.)

```
This is page 1.
Value of test: first
This is page 2.
Value of test: first
Value to set to: second
Page 1 again.
Value of test: second
```

The temporary variables aren't cleared with jumps.

It's also important to note that unlike all other embedded variables, the `$:` and `_:` tokens use a much more complex method of text replacement. These will actually allow javascript right in your story script, but only for this one variable.

```
[:&
    $.bleh = {blargh: "meh", test: "See?"};
    _.foo = "ABCDEF";
:]

The value of blargh in bleh is $:bleh.blargh.
The first letter of foo is _:foo.charAt(0)!
Values inside of quotes are safe. "$:bleh["test"]"


// outputs
The value of blargh in bleh is meh.
The first letter of foo is A!
Values inside of quotes are safe. "See?"
```

#### page_seen, label_seen

The `sadako_page_seen` and `sadako.label_seen` arrays track how many times a page or label has been seen. Every time you  transition to a new page, progress past a label in the script, or select a choice that is preceded by a label, the counter for that page or label is increased by 1. This is convenient for checking whether you've seen a part of the script and how many times.

If you select on a choice with a label, the count is also increased by one. The label count is not increased for a choice just by displaying it; only if it's chosen.

#### text

`sadako.text` is the variable that holds the text being processed for the current line. Just returning text from a function will not work unless you use the `=` value token inside the `[: :]` script block (which hopefully explains how the story script text replacements work). If you are inside a function and want to replace or add to the text output for the current line, `sadako.text` is the variable to use.

```
You found a bright [:& ~~=sadako.var.color:] gem.
You found a bright [:& ~~+.sadako.var.color:] gem.


// outputs (assuming sadako.var.color is "green")
green gem.
You found a bright green gem.
```

Notice how the first section of text is missing in the first line of the example output. This is because `~~=` replaces the text up to that point. `~~+` appends onto the text.

In most situations you can stack replacement tokens, so the above can be written like so and will have the same result.

```
You found a bright [:& ~~+$.color:] gem.
```

#### scripts

`sadako.scripts` is an object variable that is a list of sadako script strings or functions that return text. The functions never accept arguments. `sadako.scripts` entries should be defined in your javascript initialization, not in sadako script itself, because they will not be saved to along with your game data.

```
// javascript
sadako.var.x = 0;
sadako.scripts.nth = function() {
    sadako.var.x += 1;
    if (sadako.var.x == 1) return "first";
    if (sadako.var.x == 2) return "second";
}
sadako.scripts.count = "$:x";

// sadako script
This is the ^:nth time you've called this.
This is the ^:nth time you've called this.
The total times called was: ^:count


// outputs
This is the first time you've called this.
This is the second time you've called this.
The total times called was: 2

```

#### scenes

`sadako.scenes` will be described later on in [this section](#scenes-1). It's too in depth to describe here.

#### processScript()

The `{{ }}` process token is an abbreviation for `sadako.processScripts()`. This is a really useful function. It basically processes the script passed to it as if it were a `[:= :]` code eval script block. All the same rules that apply to a script block apply to this as well.

Since the functionality of this token hinges entirely on the understanding of script blocks, it will be described a bit below in [this section](#javascript).


### Conditional Display

`::`

The statement preceding the `::` conditional token will only be displayed and scripts executed if the statement following it equates to `true`.

In the following example, the line will only be displayed if *money* is less than 100.

```
You don't have enough money. :: $.money < 100
```

Conditional display checks come before rendering anything in a line. If the condition check is false, everything on that line is ignored. Therefore, any code inside a script block will not be executed unless the condition returns true.


### Inline Text Options

`{:` `:}`

The inline conditional block is for easy selecting between between two different text options.

The sections of the statement are separated by `::` a conditional token. The first section is the condition check, the second section displays if the condition is true, and the third section (if provided) displays if the condition is false.

```
You check your wallet{:$.money < 50::, but it seems that you don't:: and it appears that you:} have enough money to buy it.


// outputs
// if less than 50:
You check you wallet, but it seems that don't have enough money to buy it.

// otherwise:
You check your wallet and it appears that you have enough money to buy it.
```

You can also exclude the second option and it'll only print the first one if it's true and nothing if it's false.

```
You carefully pick up the {:$.vase_damaged::cracked :}vase and put it back on the shelf.


// outputs
// if vase is damaged:
You carefully pick up the cracked vase and put it back on the shelf.

// if not:
You carefully pick up the vase and put it back on the shelf.
```


## Script Blocks

#### Redirects

`[:` `:]`

A standard script block inserts a link to a page.

```
[:blargh:]

// outputs
<a onclick='sadako.doLink("#blargh")'>blargh</a>
```

If you follow the page name with the `@:` rename token, you can rename the link.

```
[:some_annoying_title @: the next room:]

// outputs
<a onclick='sadako.doLink("#some_annoying_title")'>the next room</a>
```

##### Naming

Internally, page and label names are converted to lowercase, apostrophes are replaced with underscores, and quotes are stripped. So `useless "Hope's Peak" pamphlet` becomes `useless hope_s peak pamplet`. In fact, `useless "Hope's Peak" pamphlet`, `useless hope's peak pamphlet`, and `useless hope_s peak pamplet` are treated as synonyms. 

```
## Page1
    // notice the two different cases to the links
    [:Keys:] are sitting on the table. They're the [:keys:] to your car.
    
## keys
    // both links direct here
    They're your car keys!
```
    
Without the case insensitivity in place, you would have had to type `[:keys @: Keys:] are sitting on the table.`, which is a bit awkward.

##### Leading Tokens

You can lead the script block with a token and it will do things besides linking to a page.

* `#` Links to a page. Same result as no token.
* `%` Links to a label.
* `&` Executes javascript. Does not print result.
* `=` Evaluates a variable or javascript and prints the text.
* `>` Creates a single line input box for storing text into a variable.
* `>>` Creates a multiline input box for storing text into variables.
* `+` Creates a reveal link which will change the text once clicked.
* `*` Creates a dialog link that displays the dialog window once clicked.

**Sadako** assumes that a label is local unless otherwise stated. If you want to access a label that is not local, you must include the page with the label, like `some_page.some_label`.

```
## Page1
    // local label
    [:% bleh:]

    // nonlocal label
    [:% Page2.foo:]


// outputs
<a onclick='sadako.doLink("Page1.bleh")'>bleh</a>
<a onclick='sadako.doLink("Page2.foo")'>bleh</a>
```

#### Arguments

`[: :]` redirects, `[:*# :]` and `[:* % :] `dialog links for pages and labels, and `[:+> :]` reveal include links all accept arguments. They follow the same logic as those in `>>` jumps and more info can be found in the [arguments](#arguments) section.

You'd call them like this:

```
[:page_name >> ["item1", "item2"] @: link name:]

[:* #dialog_page >> {name: "Bob", age: 30} @: link name:]

[:+> #reveal_page >> "some text" @: link name:]
```

The link name isn't required and only provided for clarity. The page/label name will be used if not provided.

#### JavaScript

As an example of executable javascript, the following opens the javascript alert box with the "Hello world!" message.

```
[:& alert("Hello world!"):]
```

For `#`, `%`, and even the `@:` token used for renaming, you can follow it with a `=` value token and it will evaluate the value and use that.

```
[:#= "Page " + (2 - 1) @:= (1==1) ? "bleh" : "meh":]

// outputs
<a onclick='sadako.doLink("#Page1")'>bleh</a>
```

It's also important to note that the `[: :]` script block is the only block to ignore line breaks. This is so that you can include properly formatted javascript. The space between `[:` and the leading tokens are also ignored. Because of that, script like this won't break, even though it's an exercise in poor formatting.

```
[:
    #
=
    (function() {
        if (1 == 1) {
            return "Page ";
        }
    }())

    + (2 - 1)

 @:
    = (1==0) ?
    "bleh" : "meh"
:]


// outputs
<a onclick"sadako.doLink("Page1")>meh</a>
```

Another important note is that while the contents of a script block have its variable names replaced, any tokens blocks inside this block will not be rendered. This applies not only to `[: :]` script blocks, but also `<: :>` spans, `{: :}` inline text options, and `(: :)` macros.

For example:

```
[:&
    $.foo = 1;
    $.add = "[:= 'math: ' + (1 + 1):]";
    console.log("foo:", "$.foo)
    console.log("add:", $.add)
:]

$:foo
$:add


// outputs:
1
math: 2

// console output:
foo: 1
add: [:= 'math: ' + (1 + 1):]
```

As you can see, `$.add` is set to `[:= 'math: ' + (1 + 1):]` not `math: 2`. However, when you print its value on a normal line, it'll be rendered correctly. This is helpful if you want the value to keep changing due to updated variables. For example:

```
[:&
    $.foo = 0;
    $.add = "[:= 'math: ' + ($.foo += 1):]";    
:]
$:add, $:add, $:add

// outputs
math: 1, math: 2, math: 3
```

Finally, be aware that embedded values of variables using the `$:`, `_:`, and other such tokens is using the value it held when this line was reached. That's fine is most instances, but it's you're updating a value inside a script, it's not going to render correctly.

Here's an example of it failing to do what you may want.

```
[:& $.foo = 1:]
[:& $.foo += 1; ~~="Foo: actual: " + $.foo + ", embedded: $:foo":]
[:= "Bleh: actual: " + (_.bleh = 1) + ", embedded: _:bleh":]

// outputs:
Foo: actual: 2, embedded: 1
Bleh: actual: 1, embedded: undefined
```

As you can see, you can still use the embedded version of the variable to access its data using `$.` and `_.` and the like.


##### Internal Script Blocks

As described earlier, the `{{ }}` process token functions like a `[:= :]` eval code token. The reason for using a process token instead of the script token is becomes of the rules described just above this.

To reiterate, `[:& foo = "[:= 'bleh':]":]` does not set `foo` to `"bleh"` like you may think. A script block prevents script blocks from rendering inside them, therefore you can never set a variable in this way. The `{{ }}` process token is the workaround for this. Additionally, it's allowed to be multi-lined just like a script block.

This is an unnecessarily complex example, but it should help show why this is feature is useful.

```
before|[:& 
    _.a = "middle [:& _.c = '[:& _.d = 1 :]':]";
    console.log("a:", _.a);
    
    _.b = {{_.a}};
    console.log("b:", _.b);
    console.log("c:", _.c);
    
    {{_.c}};
    console.log("d:", _.d);
    
    ~~+{{
        (function() {
            return "<:test::" + _.b + _.d + ":>";
        }())
    }};
:]|after

// outputs:
before|middle 1|after

// console output:
a: middle [:& sadako.tmp.c = '[:& sadako.tmp.d = 1 :]':]
b: middle 
c: [:& sadako.tmp.d = 1 :]
d: 1
```

This is a bit confusing so I placed console output into the example. Let's go over it step by step.

1. If you look at each line spit out by the console, you'll see that `_.a` was set to `"middle [:& sadako.tmp.c = '[:& sadako.tmp.d = 1 :]':]"`. 
2. When `_.b` is set to `{{_.a}}`, it renders the script and gives the output to `_.b`. Because the `[:& :]` token does not produce any text, `_.b` is only set to `"middle "`. The markdown doesn't show the trailing space, but it's there.
3. Even though the script block inside `_.a` wasn't displayed, it *was* rendered. Because of that, `_.c` was created.
4. Processing `_.c` with `{{_.c}}` created `_.d`. Its output is not assign to anything, but it would be `1` if it were.
5. And finally, we use the `{{ }}` token to send its content directly to the output using the `~~+` text token.

Step 5 could also be effectively accomplished using a line like so:

```
~~+'[:= function() { return "<:test::" + _.b + _.d + ":>"; }():]'
```

However, the difference is that in this version, it's writing the script block to the output of current line, and then the engine is rendering the script block once it's part of the line. To the end user it would look identical, but internally it's very different. The `{{ }}` process token is rendering the content down to its value *before* it gets assigned.


#### Input Boxes

The input boxes can be a bit tricky. They go like this.

```
What is your name? [:> $.player_name:]

// outputs (brackets represent the input box)
What is your name? [                       ]
```

The variable defined in script block (`$.player_name` in the example) will be set to whatever the input text is. **Sadako** sets the variable whenever the input box loses focus. If the variable is `undefined`, the input box will be displayed with an empty box like the above example. If the variable already has a value assigned, that value will be displayed in the input box when it is displayed.

```
[:& $.foo = "test":]
[:> $.foo:]

// outputs
[test                   ]
```

Instead of displaying the input description using standard text, you can use the HTML `label` tag by using the `@:` rename label and following it with the text to display.

```
[:> $.player_name @: What is your name?:]

// outputs
What is your name? [                       ]
```

Visually this looks the same, but under the hood it works differently, especially for those with screen readers. Feel free to check out [this information](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label) to get an idea on why labels are helpful.

Finally, if you begin the script block with two `>` input tokens instead of one, it becomes a multiline input box. A single input box will allow a single line of text. A multiline text box will allow many lines and will scroll as needed. Also, the CSS class `multiline` will automatically be assigned to a multiline box so that you may resize it in CSS without having to affect single line input boxes.

Here's an example.

```
// CSS
textarea.multiline { height: 5em; width: 20em; }

// in story script=
[:>> $.test_val @: Please type something.^^:]


// outputs
Please type something.
[                                   ]
[                                   ]
[                                   ]
[                                   ]
[                                   ]
[                                   ]
```


#### Reveal Links

The `+` token inside a script block creates a reveal link, with the `@:` name token separating the name of the link as per usual. Once a reveal link is clicked, it will replace the link with the new text.

There are six ways to use the `+` reveal token:

1. Alone. It will replace the link with solid text and that'll be it. It's a time time deal.<br>
`[:+ Replacment text @: Link name:]`

2. With an `=` eval token. This will replace the text once with the evaluated script.<br>
`[:+= "The sum of 1 + 1 = " + (1 + 1) @: Let's do some math:]`

3. With a `&` code token. Instead of a one-time replacement, this will repeatedly call the script every click and replace the link name with the output.
The following example replaces the link name with a random item every click.<br>
`[:+& sadako.randomItem(["apple", "orange", "banana"]) @: Link name:]`

4. With an `>` input token you can create a cycling text link that will cycle through a list and store the current item into a variable.<br>
To the left of the `@:` name token is the variable to store the value and to the right is a list separated by `::` tokens.<br>
`[:+> $.color @: blue::red::purple::green:]`<br>
You can also use an `=` eval token to get the list from an evaluated script. The script must evaluate to an array. Either of the following examples work.
    * `[:& _.colors = ["blue", "red", "purple", "green"] :]`<br>
    ` [:+> $.colors @: _.colors:]`
    * `[:+> $.color @:= ["blue", "red", "purple", "green"] :]`

5. With a `#` page token. It will replace the link with the output of an included page. This acts exactly like including with the `>>=` include token, except it doesn't display until you click the link.<br>
`[:+# some_page @: link name:]`

6. With a `%` label token. It will replace the link with the output of an included label. This acts exactly like including with the `>>=` include token, except it doesn't display until you click the link.<br>
`[:+% some_label @: link name:]`

With both included pages and included labels, the inclusion will stop once it sees a choice and will not include any choices.

Page and label names can also be derived from script evaulation using an `=` eval token. For example, the following will include the page named `page3`:<br>
 `[:+#= "page" + (1 + 2) @: Link name:]`


#### Dialog Links

The `*` dialog token is used to display a popup when the link is clicked. Like usual, the link name is taken from the text following the `@:` name token.

By default, the dialog title is blank. However, if you follow the link name with a second `@:` name token, that will be used as the title of the dialog window. **Sadako** will continue to use that text for the title until it is defined again or until the dialog is closed. To force the title to be cleared, using the `@:` token without a value.

You can use the `*` dialog token in six ways:

1. With an `!` action token. This closes the dialog window. If a name is given, it will close after clicking the link. If none is given, it will close immediately. Any text following the `!` action token will be discarded.<br>
Close immediately: `[:*!:]`<br>
Close with link: `[:*! @: Link name:]`

2. Just output straight text to a dialog window.<br>
`[:* Some text @: Link name @: Dialog Title:]`

3. With an `=` eval token. The script is evaluated before being displayed in the dialog window.<br>
`[:*= "Here's some math: " + (1 + 2) @: Link name:]`

4. With a `&` code token. Instead of displaying the text directly in a dialog window, the dialog will be displayed empty and the script will be evaluated. However, The output target of functions like `sadako.doLink()`, `sadako.overwrite()`, `sadako.writeOutput()`, and such will be redirected to the dialog window.
The following will write `Bleh` to the dialog window after it displays.<br>
`[:*& sadako.overwrite("Bleh") @: Link name:]`

5. With a `#` page token. The dialog will be shown with the included page.<br>
`[:*# some_page @: link name:]`

6. With a `%` label token. The dialog will be shown with the included label.<br>
`[:*% some_label @ label_name:]`

As with the `+` reveal token, you can add an `=` eval token to the page and label tokens to evaluate the name of the page or label to display in the dialog. For example, the following will display the page named `page3` in a dialog window:<br>
 `[:*#= "page" + (1 + 2) @: Link name:]`

There isn't a standard dialog window defined in **Sadako**. The user must define one themselves in HTML. The "[getting started](getting-started.md)" guide has an example on how to get this up and running.


## Macros

`(:` `:)`

Macros are simply shortcuts for javascript functions. Their only real benefit is clarity of code and slightly less typing for constantly used functions.

To create a macro, create a new function member of `sadako.macros`, like this:

```
sadako.macros.say = function(who, what) {
    sadako.text += who + ' says, "' + what + '"';
}

sadako.macros.blargh = function() { sadako.text += "bleh"; }

sadako.macros.doMath = function(x, y) { return x + y; }
```

Then to use them, you do this:

```
(:say "Ayren", "Hi!":)
(:blargh:)
(:= doMath 1, 2:)

// outputs
Ayren says, "Hi!"
bleh
3
```

If you look at the `doMath` macro, you'll see that it begins with the `=` value token as in a `[: :]` script block. This is treated in the same manner and adds the result to the output. Without the `=` value token, the macro would execute and display nothing. Like always, the other option is to use the `sadako.text` variable for output. The choice is yours. If you don't always require output, I'd suggest the `=` value method.

Basically a macro is just a text replacement for a `[: :]` script block call to a `sadako.macros` function.

```
// this
(:say "Ayren", "Hi!":)

// is the same as
[:& sadako.macros.say("Ayren", "Hi!"):]
```

Please be aware that `sadako.macros` is not saved when you save your game. Therefore, always define your macros in your javascript before you call `sadako.startGame()`.


## Choices

### Choice Formatting

`[` `]`

This set of tokens is reserved for choices and formats it in a specific way. These tokens are not taken into account for any non-choice script.

When displaying the choice, the text before and inside the tokens will be displayed. When the choice is selected, the text before and after the tokens will be added to the new display.

```
+ You search the office[.], but you find nothing of use.

(choice text): You search the office.
(new text): You search the office, but you find nothing of use.
```

A handy trick is to put `[ ]` around all of the choice text. Doing so will prevent the choice text from displaying at all on the newly rendered page. This trick is used for most examples on this guide to make the example output easier to read.

### Choice Links

`<<` `>>`

Normally the link of a choice spans the entirety of the choice text. However, that isn't always ideal. For example, it's nice to have only the page number in a choice like `Turn to page 26.` be the link instead of the text surrounding it. That can be accomplished with the `<< >>` choice link tokens.

```
+ Turn to page <<26>>.

// outputs (the <> brackets represent the link):
Turn to page <26>.
```

In the above example, only the number `26` is a clickable link. The rest of the choice is just normal text.

The way that it works is that anything before `<<` and after `>>` is normal text. Everything else is a link.

```
+ Example 1. Everything is a link.
+ Example 2. Only <<this part>> is a link.
+ Example 2. <<This is a link.
+ Example 3.>> This is normal text.

// outputs:
<Example 1. Everything is a link.>
Example 2. Only <this part> is a link.
Example 3. <This is a link.>
<Example 4.> This is normal text.
```

The `<<` and `>>` choice link tokens are also removed when displaying the formatted choice text on the next page. You can use them in combination with the `[]` choice formatting tokens.

```
+ You open the <<door[>>.], but there was no one there.

(choice text): You open the <door>.
(new text): You open the door, but there was no one there.
```

### Static Choice

`+`

A static choice differs from a `*` limited choice in the fact that it is reusable. Limited choices will be explained in a little bit.

To understand how choices are implemented, you must understand how depth levels work. All example code before this has been with a depth level of 1. That is to say it's at the shallowest level.

When the script is processed, it goes line by line through a depth level until it reaches the end.

```
Hello world!
+ [Finish]
    You have selected "finish".
    The End.

// outputs (choice is shown in <> brackets)
Hello world!
<Finish>


// when "Finish" is selected
You have selected "finish".
The End.
```

When you select a choice, the script increases its depth by 1. Since "Finish" is level 1, it becomes level 2. The depth level for the choice is not chosen based on indentation, but is instead determined by the amount of tokens preceding the text. "Finish" is level 1 because there is only one `+` at the start of the line.

```
Hello world!
++ [Finish]
    The End.


// outputs
Hello world!
```

In the above example, "Hello world" is level 1 but "Finish" is level 2. Because of this, the choice doesn't display. The script processes the first line, doesn't see any other level 1 lines, and completes. In fact, the script will output an error to the javascript console that looks like this.

```
Line depth difference is greater than 1:
++ [Finish]
```

Regardless of indentation, script between a choice and the next depth transition will remain with that depth. For example, the following code may not work the way you may expect.

```
Hello world!
+ [Finish]
    You have selected "finish".
The End.


// outputs (choice is shown in <> brackets)
Hello world!
<Finish>

// when "Finish" is selected
You have selected "finish".
The End.
```

"The End" is still level 2, so it falls under "Finish" still, even though it's indented to a level 1 depth.

The script will display all choices within that depth level until it reaches a line within that depth that is not a choice (usually a `-` depth token that will be explained a bit later).

```
+ [Choice One]
    This was the first choice.
+ [Choice Two]
    This was the second choice.
-
+ [Choice Three]
    This choice is not shown in the example.


// outputs
<Choice One>
<Choice Two>

// when "Choice One" is selected
This was choice one.
<Choice Three>

// when "Choice Two" is selected
This was choice two.
<Choice Three>
```

You can place any number of choices inside each other as long you use the correct depth levels.

```
+ [Choice 1]
    Next choice.
    ++ [Choice 1.1]
        Another choice.
    ++ [Choice 1.2]
        One more.
+ [Choice 2]
    Foo


// outputs
<Choice 1>
<Choice 2>

// when "Choice 1" is selected
Next choice.
<Choice 1.1>
<Choice 1.2>

// when "Choice 1.2" is selected
One more.
```

### Labels

Unlike a script line with a label, simply displaying the choice does not increase its *seen* count. Instead, the label seen count is increased if you jump to the label or select the choice.

Jumping to a choice that has been assigned a label is the equivalent of selecting that choice. In other words, jumping to the label actually jumps *inside* the choice block, not to the line with the label.

```
## Page1
    Begin test.
    >> test

    This text will not be seen.

    + {test} Choice name will not display
        Hello!
        Times choice 1 has been seen: %:Page1.test
    + {test2} Second choice
        Bleh

    - Times choice 2 has been seen: %Page1.test2


// outputs
Begin test.
Hello!
Times choice 1 has been seen: 1
Times choice 2 has been seen: 0
```

Normally the game does not save progress in a choice tree. It only saves progress when you click a link that leads to a label or page (using `sadako.doLink()`). However, if you assign a label to a choice, the game will allow you to save progress after that choice has been selected.


### Limited Choice

`*`

Choices using a `*` limited choice token (as opposed to a `+` static choice token) that have an associated label will disappear after being chosen once. Jumping to a label associated with a `*` limited choice will also make the choice disappear.

```
{loop}
* {c1} [Choice 1]
* {c2} [Choice 2]
* {c3} [Choice 3]
    The End
    << END
- >> loop


// outputs
<Choice 1>
<Choice 2>
<Choice 3>

// if "Choice 1" is selected
<Choice 2>
<Choice 3>

// if "Choice 2" is selected
<Choice 3>

// if "Choice 3" is selected
The End
```

If you have a `*` limited choice and do not assign it a label, it will throw an error during compile. The error will look something like this:

```
Choice found without associated label.
[init] [0] [1]: "Sure!"
```

Fallback choices do not throw this error even if they do not have a label.

### Fallback Choice

Choices also come with a method for a default fallback when all other options have been chosen. All you need to do is have a choice without a text description. Once all visible choices have been exhausted, Sadako will then select the first unnamed choice that it sees. You can use this to safely exit a loop.

Regardless of whether this is a `*` choice, `+` static, or has an `{ }`inline label, this choice will never disappear.

```
{loop}
* {c1} [Choice 1]
* {c2} [Choice 2]
* {c3} [Choice 3]
+ [Choice 4] :: 1 == 0
*
    Exiting loop.
    >> finish
- >> loop

{finish} All done.


// outputs
<Choice 1>
<Choice 2>
<Choice 3>

// if "Choice 1" is selected
<Choice 2>
<Choice 3>

// if "Choice 2" is selected
<Choice 3>

// if "Choice 3" is selected
Exiting loop.
All done.
```

Notice that `Choice 4` is never displayed because of its inline condition. Because it's not available, the loop will safely enter the fallback.

Another thing to note is that the fallback is triggered when choices above it not available. That is to say, if you were to move the fallback choice to between `Choice 2` and `Choice 3`, the fallback will trigger once `Choice 1` and `Choice 2` are removed, even if `Choice 3` is still available.

### Choice Includes

As mentioned before, once a choice is seen by the script, the script will stop processing after seeing the next non-choice depth token or a choice that is a lower depth level than current. The drawback to this logic is that it's not possible to include a list of choices once a choice is seen. 

For example, this works just fine because it jumps before seeing any choices:

```
Example text.
>> choices
- << END

= choices
+ Choice 1
+ Choice 2

// outputs:
Example text.
<Choice 1>
<Choice 2>
```

However, this does not work to include a list of choices because the script stops once it sees the `-` depth token:

```
Example text.
+ Choice 1
- >> choices
<< END

= choices
+ Choice 2
+ Choice 3

// outputs:
Example text.
<Choice 1>
```

The fix for this is the `>>=` include token in conjunction with the `+` static choice token (this does not work with a `*` limited choice token). The `+ >>=` choice include token will include a page or label just like normal include (see the [includes](#includes) section for more informtion). Unlike a normal include that stops at choices, a choice include does not have that limitation. Therefore this example works as you would expect.

```
Example text.
+ Choice 1
+ >>= choices
+ Choice 4
- << END

= choices
+ Choice 2
+ Choice 3

// outputs:
Example text.
<Choice 1>
<Choice 2>
<Choice 3>
<Choice 4>
```

Be aware that a `+ >>=` choice include still includes a block of script, not only choices. Notice how the following adds the script in the included section to text ouput that is displayed before the choices.

```
Example text.
+ Choice 1
+ >>= choices
- << END

= choices
Second choice.
+ Choice 2

// outputs:
Example text.
Second choice.
<Choice 1>
<Choice 2>
```

Also note that `{ }` inline labels are not allowed to be used with `+ >>=` choice includes and they will be stripped during compile time.

You can also pass arguments to choice includes.

```
## page1
    + Test
    + >>= #test >> "Bob"
    + Test 2

## test
	+ Just choose the choice, &:args.
		You did it!
    
// outputs
<Test>
<Just choose the choice, Bob.>
<Test 2>
```

See [arguments](#arguments) for more info.

## Depths

### Depth Token

`-`

The depth token realigns the depth. Say that you are three levels deep in choices and you want to get back to a depth of 1. The `-` depth token is the most convenient way to do it.

The depth can also changed using `+` static choice tokens, `*` limited choice tokens, `=` label tokens, and `~` conditional tokens. The difference is that the `-` depth token only sets the depth and does not perform any extra functions.

The flow of story script goes like this:

1. All non-choice story script lines are processed.
2. If the script sees `<< END` or `<< ABORT` or the end of the page, it stops processing any further lines of script.
3. If the script runs out of content in that depth, it looks for a depth changing token (listed above) in the next line and sets the depth to that, as long as the depth is not greater than the current depth.
4. If the script sees any choices, it will process all choices until it sees a non-choice depth token.
5. After a choice is selected, the script will jump to the story block within that choice and start again at step 1.

```
This is level 1.
+ [Choice 1]
    Choice 1, level 2.
    ++ [Choice 1.1]
        Choice 1.1, level 3.
    ++ [Choice 1.2]
        Choice 1.1, level 3.
    -- Level 2 again.
    Still level 2.
+ [Choice 2]
    Choice 2, level 2.
- Level 1 again.


// outputs
This is level 1.
<Choice 1>
<Choice 2>

// if "Choice 1" is selected
Choice 1, level 2.
<Choice 1.1>
<Choice 1.2>

// if "Choice 1.1" is selected
Choice 1.1, level 3.
Level 2 again.
Still level 2.
Level 1 again.
```

You may be thinking that it should have jumped to `Choice 2` instead of the `-` depth token, however `Choice 1` and `Choice 2` are two parts of a group of choices. When you exit a choice, it jumps past the rest of the options in that choice group, which is why `Choice 2` is ignored even though it's the next depth token in the script.

Notice that if you comment out or remove the `-- Level 2 again.` line, it will not set the depth to level 2. `Still level 2.` will be set as level 3 and the next depth level token will be `- Level 1 again.`, so the script will jump to that. The level of depth is indicated by the number of `-` tokens, just like it is with choices.


```
// if "Choice 1.1" is selected
Choice 1.1, level 3.
Level 1 again.
```
One convenient use of the `-` depth token is forcing a separation between multiple sets of choices, even if the line is blank.

```
+ [Choice 1]
+ [Choice 2]
-
+ [Choice 3]


// outputs
<Choice 1>
<Choice 2>

// if "Choice 1" is selected
<Choice 3>
```


### Depth Labels

`=`

A depth label is basically a combination of a `-` depth token and a `{ }` label. It both sets the depth level and also sets a label you can jump to for that line.

```
// this
=== test

// is the equivalent of this
--- {test}
```

The benefit of a `{ }` label block is that it can be followed by text or be set on a choice. This is not possible with a `=` depth label. The benefit of a depth label is clarity of code.

```
-- {test} This is kind of messy.
Some other stuff to write.
<<

== test
This is easier to read.
Some stuff to write
<<
```

Because of the way that labels are handled by **Sadako**, it is recommended that you only include alphanumeric characters and underscores in their naming.


## Condition Block

`~`

The condition block allows you to display or not display blocks of story script based on conditions. It's basically `if`/`else if`/`else`/`for`/`while` from javascript, except it runs story script.

It's important to note that the `~` condition token acts the same as a `+` choice token in that the levels of depth are based on the number of leading tokens, and the script inside the block increases by one depth.

Be aware `{ }` inline labels are not allowed with condition blocks and will be stripped during compiling.

### Branches

Like in every programming language, a condition branch determines whether to run or not run a block of script depending on a condition check.

`if` is the initial condition check. `else if` will be checked only if the preceding condition checks fail. You can have as many `else if` statements in a row that you want. And finally, the script in the `else` block will be executed if all of previous condition checks fail.

```
~ if ($.money > 100)
    You can buy the following items.
    ++ [A pack of gum.]
        You bought some gum.
    ++ [Some milk.]
        You bought some milk.
~ else if ($.money > 50)
    You almost have enough to buy something. Why is everything so expensive?
~ else
    You don't have enough money to buy anything.
- You should probably leave the store now.


// outputs
// if money less than 100
You don't have enough money to buy anything.
You should probably leave the store now.

// if money is less than 100 but greater than 50
You almost have enough to buy something. Why is everything so expensive?
You should probably leave the store now.

// if money is greater than 100
You can buy the following items.
<A pack of gum.>
<Some milk.>

// if "A pack of gum." is selected
You bought some gum.
You should probably leave the store now.
```

Notice that the depth level increased inside the conditional block, so the choices begin with two `+` choice tokens instead of one. If you only had one, the choice would be outside of the conditional block even though it was indented correctly.

The following is an example of erroneous code.

```
Beginning test.
~ if (1 == 0)
    This text will not be seen.
    + [This choice is not inside the block]
        Test

// outputs
Beginning text.
<This choice is not inside the block>
```

Also be sure not to interrupt the flow of the conditional blocks. There should not be any `*` or `+` choices, `=` labels, or `-` depth tokens of the same depth between `if`, `else if`, and `else` blocks or else the script will fail. Errors will be printed to the javascript console.

The following is an example of erroneous code.

```
## Page1
    ~ if (1 == 1)
        Write something.
        -- This is within the condition block and is okay.
    - This line makes it fail.
    ~ else if (1 == 1)
        Bleh.
```

This gives the following error.

```
'else if' found without 'if' statement.
story: [Page1] [0] [2]
eval: (1 == 1)
```

### Loops

Condition loops let you execute the same script over and over until a specific condition is met. When done correctly, this can save a lot of typing. One important use of loops is to iterate over an array of items.

`for` loop blocks work exactly like they do in javascript. For those unaccustomed to them, it goes like this:

```
~ for (_.a = 0; _.a < 5; _.a++)
    value: _:a
    
// outputs
value: 0
value: 1
value: 2
value: 3
value: 4
```

The breakdown of this is that values passed to `for` are divided into subsections by the `;` operator. Here is how they work:

1. The first value is an expression or variable declartion to be executed before the loop begins. This is only run once and is typically used to set an iterative variable to its initial value, as is done in the example.
2. The second value is the condition in which to break the loop (stop looping and continue with the rest of the script). In the example, it breaks once `_.a` is equal to `5`.
3. The third and final value is the code to run at the end of every loop. Usually this code is used to increase an iterator value as is done in the example. This is run at the very end of the loop before the condition in the second value is checked. Therefore in the example, `_.a` will never equal `5` inside the loop. This is because after the value is increased, the condition check sees that it's `5`, and so it immediately exits the loop.

It's recommended to use temporary variables for loops because you won't want throwaway variables like `a` being saved to your save files with `$.a` or having having it clogging up the browser window object (`a = 1` is actually `window.a = 1` for those unaware. This is a quirk of javascript).

Since this is normal sadako story script, most of the usual things work, like jumps and conditions. You can also do loops inside of loops as long as you increase the depth, just like placing an `if` statement inside of an `if` statement.

```
~ for (_.a = 0; _.a < 3; ++_.a)
    A loop: _:a, B loop:
    ~~ for (_.b = 0; _.b < 3; ++_.b)
        <> _:b
        
// outputs
A loop: 0, B loop: 0 1 2
A loop: 1, B loop: 0 1 2
A loop: 2, B loop: 0 1 2
```

There is another use of the `for` loop that's used for looping over a list of object members. For example:

```
[:& $.foo = {bleh: "asdf", blargh: 2, meh: true}:]
~ for (_.k in $.foo)
    The value of _:k is $:foo[_.k].
    
// outputs
The value of bleh is asdf.
The value of blargh is 2.
The value of meh is true.
```

`while` loops are also just like their javascript counterparts. Unlike a `for` loop, `while` loops will loop forever as long as the condition check continues to return true.

```    
[:& _.list = ["blargh", "foo", "bleh"]:]
~ while (_.list.length)
    [:= _.list.pop():]
    
// outputs
blargh
foor
bleh
```
This will loop until `_.list` is empty. We remove an item each loop, so it'll eventually be empty and the loop will end.

But what if we want to leave the loop early? This is where `<< BREAK` comes in. The `<< BREAK` command forces the loop to end immediately without processing the remainder of the lines in the loop. Unlike `<< END` or `<< ABORT` which stops the script entirely, `<< BREAK` allows the script to resume running after exiting the loop.

```
[:& _.list = ["blargh", "foo", "bleh"]:]
~ while (_.list.length)
    [:& _.value = _.list.pop():]
    _:value
    ~~ if (_.value == "foo")
        << BREAK
-
All done.


// outputs:
blargh
foo
All done.
```

`<< BREAK` is reserved for use in loops and will not work correctly elsewhere.

One last command that is reserved for loop use is `<< CONTINUE`. This is similar to `<< BREAK` except that instead of leaving the loop, it starts the next iteration.

```
~ for (_.a = 1; _.a <= 3; ++_.a)
    ~~ if (_.a == 2)
        Let's skip this one.
        << CONTINUE
    --
    Loop: _:a
    
// outputs:
Loop: 1
Let's skip this one.
Loop: 3
```

Calling `<< BREAK` or `<< CONTINUE` outside of a loop is the equivelent of calling `<< END`.

Loops do have a couple restrictions to the script being run:

1. Jumping to a label inside a loop from outside of the loop will not loop when it hits the end, but will instead continue on with the rest of the script.

2. Choices will not work inside of a loop and the script will begin its next loop as soon as it sees a choice. If you need to use a loop in combination with choices, you can accomplish this by creating a loop via jumps and labels.

The following is an example of creating a loop with jumps and labels:

```
[:& $.x = 0:]
= loop
Please select a choice.
+ Choice One
    There you go.
    >> loop_end
+ Choice Two
    Not that one.
+ Choice Three
    Not that one.
- [:& $.x += 1:]
~ if ($.x == 3)
    Sorry. Too many tries.
    >> loop_end
- >> loop

= loop_end
The end.
[:& delete $.x:]
```

This will loop forever until you select `Choice One` or `$.x` equals `3`, which will then jump outside of the loop. Simple but effective. 

Temporary variables are cleared once you select a choice, so we use a saved variable instead since it will carry from choice to choice. Of course, we don't actually want this variable saved when saving your game, so we delete it in the last line. `delete` is a javascript command that deletes a variable, including a member of an object.


## Scenes

Scenes are a way of expressing an event that is taking place or has taken place. Scenes can happen one after another, or many scenes at once. Whether they are running or not is based on conditions that are checked as every story script line is processed.

### Examples

To make it clear what role a scene performs, first we should look at some script without scenes.

```
## example
    Your friend turns to you and asks "Would you like to go to the movies?"
    + "Sure!"
        "Sweet!" They pause. "You can buy your own ticket, right?"
        ++ "Yeah, no problem."
            "Great! Let's go!"
            You and your friend go to the movies and have a great time.
        ++ {no_money} "Sorry, no."
            "Ugh. I can't believe you. I'll have to go alone then." They wander away.
    + {no} "Nah."
        "Seriously? Well, whatever. I'm going without you."

    ~ if (%.example.no || %.example.no_money)
        You spend the day by yourself.

    + [Go Home]
        >> #home

## home
    You're at your home. {:(!%.example.no && !%.example.no_money) || %.home.called::Your friend is here with you.:}

    ~ if (%.home.called)
        Your friend looks happy but reserved. "That movie was pretty good. I wish you could have seen it."

    ~ else if (!%.example.no && !%.example.no_money)
        Your friend is happy. "That movie was great!"

    ~ else
        ++ [Call Friend]
            You decide to call your friend.
            "The movie is over now. I'll be right over."
            +++ {called} [Back]
                << RETURN
```


Pretty messy. There are a lot of conditionals based on whether you've seen labels or not and it's somewhat confusing looking even though the labels are still within sight. It'd only get worse as the conditions are moved further from their origin and replicated in other locations of the script. Scenes can alleviate this issue.

First we add the scene in javascript. This should be always be defined in your initialization script so that it's run whether you start a fresh game or load a save.

```
sadako.addScene("alone", "%.example.no || %.example.no_money", "%.home.called");
```

And now we rewrite it using scenes for the condition checks.

```
## example
    Your friend turns to you and asks "Would you like to go to the movies?"
    + "Sure!"
        "Sweet!" They pause. "You can buy your own ticket, right?"
        ++ "Yeah, no problem."
            "Great! Let's go!"
            You and your friend go to the movies and have a great time.
        ++ {no_money} "Sorry, no."
            "Ugh. I can't believe you. I'll have to go alone then." They wander away.
    + {no} "Nah."
        "Seriously? Well, whatever. I'm going without you."

    ~ if (*.alone.isActive)
        You spend the day by yourself.

    + [Go Home]
        >> #home

## home
    You're at your home. {:!*.alone.isActive::Your friend is here with you.:}

    ~ if (*.alone.hasEnded)
        Your friend looks happy but reserved. "That movie was pretty good. I wish you could have seen it."

    ~ else if (!*.alone.hasStarted)
        Your friend is happy. "That movie was great!"

    ~ else
        ++ [Call Friend]
            You decide to call your friend.
            "The movie is over now. I'll be right over."
            +++ {called} [Back]
                << RETURN
```

That's much easier to read. Also as mentioned in the variable embedding section, the `*.` token is the shortcut for the `sadako.scenes` variable, and `*:` is the shortcut to its value.

Other than just clarity of code, scenes are useful for when you have conditions that are difficult to check, or that you want checked constantly. For example, imagine that you had an inventory array and wanted to check if it ever held an item. Once you removed that item from the array, how would you know that it was ever there? Scenes are perfect for this.

Scene conditions are checked every line and the `isActive` state is set to `true` once the  `checkStart` condition is met. After `isActive` is set, it will only be set to `false` if the `checkEnd` condition (if provided) is met.

```
// javascript
sadako.var.inventory = {};
sadako.addScene("held_gun", "'gun' in $.inventory");

// sadako script
Held gun: *:held_gun.isActive
[:& $.inventory.gun = true :]
Gun: $:inventory.gun
[:& delete $.inventory.gun :]
Gun: $:inventory.gun
Held gun: *:held_gun.isActive


// outputs
Held gun: false
Gun: true
Gun: undefined
Held gun: true
```

Even more appropriate may be using `*.held_gun.hasStarted`, which is a count of how many times the scene has started. This will never return to 0 even when a scene ends, so you can always use it to check if the scene has started at least once.

### Defining

A scene comes with four members you can access for its state. These are set automatically based on the condition checks.

* `isActive`: Whether we are currently in the scene. This is initially set to `false`. It is set to `true` when the `startCheck` conditions have passed, and then set to `false` again once `endCheck` has passed.
* `hasStarted`: A count of how many times scene has started. Incremented every time `checkStart` passes.
* `hasEnded`: A count of how many times scene has ended. Incremented every time `checkEnd` passes.
* `ending`: Any value returned from `doEnd()` is stored in `ending`. This can be useful to determine which way a scene has ended if it has multiple ways of ending the scene.
* `isRecurring` is `false` by default. If set to `true`, a scene can be started again after it has ended.

That's not all scenes can do though. To understand its use, the arguments of the `sadako.addScene` function must first be explained.

`sadako.addScene(id, checkStart, checkEnd, doStart, doEnd, doBefore, doAfter, isRecurring)`

* `id`: The name of the scene to be defined.
* `checkStart`: The condition to check for the start of the scene. String or function.
* `checkEnd`: The condition to check for the end of the scene. String or function.
* `doStart`: The script to be run when `checkStart` evaluates to `true`. String or function.
* `doEnd`: The script to be run when `checkEnd` evaluates to `true`. String or function.
* `doBefore`: The script to run before every page renders while the scene is active. String or function.
* `doAfter`: The script to run after every page renders while the scene is active. String or function.
* `isRecurring`: Whether the scene should be run again if the start conditions are met after the scene has ended. Boolean.

`id` and `checkStart` are the only required arguments. The others can be skipped over with a value of `undefined` or `null`.

`checkStart` and `checkEnd` can be either a string or a function. If the argument is a string, it will be evaluated to determine if the conditions are true. The string may contain sadako script like in the example. Strings are good for simple comparisons or when you want to take advantage of sadako script.

If the argument is a function, you must place your condition checks inside the function and return `true` if the conditions are met. This is useful for more complex condition checks. The following is an example.

`sadako.addScene("test", function(){ if (sadako.page_seen["page2"]) return true; })`

Be aware that the `sadako.scenes` object is not saved along with game data, so all entries in the object should be defined in your javascript initialization and not in sadako script.


## Saving Checkpoints

The way that **Sadako** manages saves is that whenever you reach a "checkpoint", it stores the current state (all of **Sadako**'s necessary variables along with whatever you store inside `sadako.var`) into a data object variable. When you decide to save your game, it writes the contents of that data to the disk. It only saves whatever the values of the data was at the time of last checkpoint, so it's entirely possible to progress through multiple choices without it saving your progress.

To manage this correctly, you must pay attention to what triggers a checkpoint. There are three things that do this.

* Clicking a link that navigates to a new label using `sadako.doLink()`. (Example:
`[:% some_label:]`)
* Clicking a link that navigates to a new page using `sadako.doLink()`. (Example: `[: some_page:]`)
* Clicking a choice that has an associated `{ }` inline label. (Example: `* {cp} Some Choice`)

`>>` jumps in the story script will not trigger a checkpoint. You can however trigger this manually with `sadako.doLink()` which will act exactly like clicking a link. That is to say, no text leading up to this call will be displayed and it will not process any lines following this story block since it is an immediate redirect to that label or page.

The `sadako.doLink()` function accepts an argument in the same format as a `>>` jump token.

```
// jumps to a label
[:& sadako.doLink("some_label"):]

// jumps to a page
[:& sadako.doLink("#some_page"):]
```
