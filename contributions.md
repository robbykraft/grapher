# Contribution Tips

### modularity

Keep your code modular. No other parts of the app should depend on your contribution (removing your contribution will not break the app). Notice how each tool is encapsulated in its own folder, tools can be easily included or removed by changing one line of code.

### communicate your idea

Open an issue or a discussion in this repository before you spend any time coding a new thing. It's possible that a contribution will be rejected due to no fault of the code, something which better communication could have prevented any wasted time.

# Coding Style Guide

Contributions which violate the style guide will still be accepted, just modified before. Nothing too special, please just basic eslint style guides (AirBnb), use tabs not spaces, use semicolons, file extensions on `import` statements, keep line length shorter than 80 if possible, absolutely shorter than 100.

When linking to the Rabbit Ear library, please link directly to the method in question, like this:

```js
import { subgraph } from "rabbit-ear/graph/subgraph.js";
subgraph();
```

As opposed to doing this,

```js
// do not do this:
import ear from "rabbit-ear";
ear.graph.subgraph();
```

# How to Contribute X

## tool

UI Tools live on the left side bar and are meant for user-interface to modify the model. Tools inhabit their own directory and contain an index.js with required metadata including an icon. Cleanup all memory in an optional "unsubscribe" method. an optional "reset" method will be called when the UI needs to be visually cleared. If there is a "panel" svelte component (also optional), it will be added to the right panel when your tool is active. "pointerEvent" will be fired during. An optional "SVGCanvas" will be added to the crease pattern SVG view.

See the examples in the `src/tools` folder. 

## modifier

Modifiers sit inside the command system, between the call and the execute, and have the power to modify the commands before they get executed. You can use the parser to check for the presence of certain method calls, and build your logic based on the presence of these methods.

See the examples in the `src/modifiers` folder. 