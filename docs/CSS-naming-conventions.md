# Naming conventions

Naming conventions in CSS are hugely useful in making your code more strict, more transparent, and more informative.

A good naming convention will tell you and your team

* what type of thing a class does;
* where a class can be used;
* what (else) a class might be related to.

We rely on structured class names, BEM-like naming, and meaningful hyphens (i.e., not using hyphens merely to separate words). This helps to work around the current limits of applying CSS to the DOM (i.e., the lack of style encapsulation), and to better communicate the relationships between classes.

The primary architectural division is between helpers and components.

**Table of contents**

* helperName
* ComponentName
* ComponentName--modifierName
* ComponentName-descendantName
* ComponentName.is-stateOfComponent
* ComponentName.-chainable-modifierName
* ---
* reserved namespaces (prefixes), suffixes and other keywords

## Helpers

Low-level structural and positional traits. Helpers can be applied directly to any element within a component.

### helperName

Helpers must use a camelCase name. Helpers may also have modifiers and responsive variants like components do. What follows is an example of how various helpers can be used to create a simple structure within or without a component.

```html
<!--
  1. Sets up bigger margin top and cleafixes the component
  2. Aligns components item to left and adds default medium padding
  3. Centers image in large Media Query breakpoint
  4. Sets up large text in medium Media Query breakpoint
--> 
<div class="Component marginTop--m cf"> <!-- [1.] -->
  <div class="Component-item alignLeft padding--m"> <!-- [2.] -->
    <img src="…" alt="…" class="l-center"> <!-- [3.] -->
    <p class="m-text--l"> <!-- [4.] -->
      …
    </p>
  </div>  
</div>
```


### Responsive helpers …

Certain utilities have responsive variants using the patterns: s-<name>, m-<name>, and lg-<name> for small, medium, and large Media Query breakpoints.


## Components

The CSS responsible for component-specific styling.

Syntax: `[<prefix>-]<ComponentName>[--modifierName|-chainable-modifierName|-descendantName]`

This has several benefits when reading and writing HTML and CSS:

* It helps to distinguish between the classes for the root of the component, descendant elements, and modifications.
* It keeps the specificity of selectors low.
* It helps to decouple presentation semantics from document semantics.

### ComponentName

The component's name must be written in [PascalCase](http://c2.com/cgi/wiki?PascalCase). Nothing else in the HTML/CSS uses PascalCase.

```css
.MyPants {}
```

```html
<section class="MyPants">
  …
</section>
```

<a name="ComponentName--modifierName"></a>
### ComponentName--modifierName

A component modifier (or component variation) is a class that modifies the presentation of the base component in some form (e.g., for a certain configuration of the component). Component modifiers also modify their descendants by nesting, however if descendants need altering variations then modify the [descendants](#ComponentName-descendantName) directly. Modifier names must be written in camelCase and be separated from the component name by two hyphens. The class should be included in the HTML in addition to the base component class. 

```css
/* Core button component */
.Button {}

/* Primary button modifier */
.Button--primary {}
```

```html
<button class="Button Button--primary" type="button"
  <span class="Button-item">…</span>
</button>
```

<a name="-chainable-modifierName"></a>
### ComponentName.-chainable-modifierName

> Chainable modifiers are like helpers but component specific. 

Chainable modifiers are denoted by a leading hyphen `-`, a namespace (prefix) and a descriptor for the modification. As the name would indicate, chainable modifiers provide us with the ability to configure a module in the HTML with a short, concise syntax. Chainable component modifiers also modify their descendants by nesting.

The golden rule is that **chainable modifiers should never modify the same CSS property twice and only single namespaced chainable modifier sould be used for a given module**. This is to ensure that styles don’t get clobbered and that the order in which they are applied is irrelevant. 

```css
/* Core button */
.Button {
  …

  &.-size-l {}

  &.-align-center {}
}
```

```html
<button class="Button Button--primary -size-l -align-center" type="button"
  <span class="Button-item">…</span>
</button>
```
 
<a name="ComponentName-descendantName"></a>
### ComponentName-descendantName

A component descendant is a class that is attached to a descendant node of a
component. It's responsible for applying presentation directly to the
descendant on behalf of a particular component. descendant names must be
written in CamelCase. 

Parent [Component modifiers](#ComponentName--modifierName) also modify their descendants by nesting, however in some cases (rarely) descendants may need direct variations (`1.`). Be careful in these situations not to override direct descendant modifiers with the parent modifier (`2.`).

```css
/* Core block */
.Block {
  …

  &-header {}

    &-image {}

  &-content {}

    &-text {
      &--meta {} // [1.] Example of direct descendant modifier
    }

  &-footer {}
}

/* Primary block modifier */
.Block--primary {
  …

  .Block-header {}

    .Block-image {}

  .Block-text {}

    .Block-text {} // [2.] Be careful not to override direct modifiers

  .Block-footer {}
}
```

```html
<article class="Block">
  <header class="Block-header">
    <img class="Block-image" src="" alt="">
  </header>
  <div class="Block-content">
    <div class="Block-text">
      …
    </div>
  </div>
  <div class="Block-footer">
    …
  </div>
</article>
```

<a name="is-stateOfComponent"></a>
## ComponentName.is-stateOfComponent

Use `is-stateName` to reflect changes to a component's state. The state name
must be camel case. **Never style these classes directly; they should always be
used as an adjoining class.**

This means that the same state names can be used in multiple contexts, but
every component must define its own styles for the state (as they are scoped to
the component).

```css
.Block {
  …

  &.is-open {
    @extend %is-open;
  }
}
```

```html
<article class="Block Block-is-open">
  …
</article>
```