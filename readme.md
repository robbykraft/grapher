# Blender-style graph maker

## 2023-07-01: new features

continue to refer to 2023-06-22 list which is not done.

copy and paste:

- copy graph. depending on what is selected, we need to copy a different set of components, for example, if an edge is selected it copies its adjacent vertices, but if vertices are selected, it only copies those edges which are fully selected (between two selected vertices) not leaf-adjacent edges.

- pazte: multiple layers would be nice, someday, until then, we can paste the components as new components creating a disjoint section of the one graph, which is fully selected, allowing the user to switch tools to an affine transform and put the selected area into a new place.

axioms:

- performing an axiom will create one (or many) ruler line(s). this ruler line can disappear after the operation is fully completed. the ruler line should be colored differently than everything else, and should be stored as an infinite line and should render as a `<line>` segment that is always clipped to the viewBox. for example axiom 5 the sequence should go like this:

1. click on a point, drag and release on a line
2. click on a second point (which the line is to pass through)
3. two ruler lines are now generated much like the walking-ant line selection line. all of their intersections with the graph are now snappable vertices, and the lines themselves are snappable (away from a vertex but still along the line at an arbitrary location). the user can now click and draw a segment using the rule line and once the user releases, the rulers disappear.

22.5 degree lock:

- no longer selecting between segment, ray, or line. by default "ray" is the only option. you can click on a vertex and if you are holding shift, it will draw the rule line thing from before (axioms section), and you draw along the line until one of the stopping points.

## 2023-06-22: new feature list

menu:

[ ] menu -> window: flip y axis
[ ] menu -> select: "select all connected"
[ ] menu -> graph: resize canvas
[ ] menu -> graph: resize contents

toolbar:

[ ] somehow we need the ability to make a face
[ ] new tool: ruler tool ("select tool" but for ruler lines)
[ ] new tool: rabbit-ear a face
[ ] new tool: universal-molecule a face

UI events

[ ] ctrl-z undo (redo). build an entire undo history thingy
[ ] translate with number typing (like blender. check axis first.)
[ ] select: need to be able to shift-deselect (remove from selection)
[x] scroll to zoom in and out (half done)
[ ] scroll to zoom in and out at the location of the cursor

general

[x] bring back the right panel which can fine tune the arguments for each tool/operation.
[ ] show edge colors (edges_assignment, edges_foldAngle).
[ ] introduce layers. first layer is the ruler layer.
[x] re-think snapping pt 1. dataset should be separate from the vertices of the graph, and include ruler intersections with the graph.
[ ] re-think snapping pt 2. snap points should be inside an easily searchable binary tree data structure.
[x] bring back origami simulator.

## 2023-06-08: idea for new separate UI visualization layer

Everything is going well, I couldn't anticipate the entire pipeline but it's being uncovered easily enough. I've decided to name the "kernel" as the layer that sits between the UI and the application. it processes inputs into functions and sends them to the application to execute. these functions either manipulate the graph, or manipulate the screen to visualize an in-progress operation.

One issue that has arisen is the need for a pipeline for visualization that includes a copy of the data model, able to be modified, but does not affect the actual data model. For example, during a UI drag event where a vertex is being moved across the screen, previously the graph was updated at every step. Which is possible for something as simple as moving a vertex. But for example simply implementing the ability to hold SHIFT to add a new selection box to the previous selection revealed the need for a cached state of not the graph itself, but the data storing the currently selected components. Because for example, if the user has some components selected, then SHIFT draws a new rectangle but changes their mind, we have to be able to highlight the in-progress selections, and then when they change their mind, return the selected set to the set from before this current SHIFT+select operation.

Additionally, it reminded me that I had already run into this issue building a folding visualizer. When folding a paper using the press and drag operation, the new crease line has to be made from the cached state from before the press occurred.

## 2023-05-21: project outline and plan

This will be 2D (for now), rendering in SVG, with a toolbar GUI interface, with keyboard and mouse/touchpad input. The application core can be accessed via terminal, most application and graph-modifying operations can be typed in and manually run. The graph data model is based on FOLD, with vertices, edges, and faces, where edges can contain attributes. SVG file import will be supported. Rabbit Ear will be used for graph operations such as planarizing, vertex merging, face finding. The backend will be built in a manner such that the front end could one day be swapped out for a 3D interface, handle 3D FOLD graph data, with as few changes as possible needed to make this change.

## features: graph operations

### create vertices or edges or faces

- vertex: click to create new vertex. isolated vertex added to graph.
- edge-1: draw a line segment, which creates an edge and 2 vertices, or uses existing vertices.
- edge-2: be selecting two non-adjacent vertices, create an edge between them.
- face-1: be selecting three or more vertices, create a face.
- face-2: be selecting three or more edges, create a face.

faces_vertices and faces_edges will always be in sync. for a face to exist, all edges between adjacent vertices must exist.

### turn on/off vertex snapping to grid

- new vertices will be snapped to the grid (old will be untouched)
- snap all, all vertices are shifted to their nearest grid coordinate.

UI: toggle-new vertex snapping, button-snap all

### delete V/E/F

- deleting a vertex: will delete any adjacent edges, faces.
- deleting an edge: will delete any adjacent faces, and any isolated vertices. (this is a problem, someone might want to keep the isolated vertex.)
- deleting a face: will not delete any edges or vertices.

UI: no new ui. use select tool and keyboard "delete"

### edge attributes

- change assignment
- change fold angle

UI: see solutions in cp.rabbitear.org/beta/

### graph indices stuff

- change face winding
- change index of V/E/F in its array
   - swap one index with another
   - set an index (auto swap)

UI: not sure, some ideas: swap: click one then the other, swap happens. click one, type a number press enter, swap happens. enter into series beginning with 0, click one after another, auto increments.

### planarize the graph

simple. maybe we have options for epsilon or something but probably not needed.

UI: button

## features: application operations

### set canvas size

canvas size is like the photoshop/illustrator canvas. you can still draw outside of the canvas. canvas is more of a designer tool stating "this is the area i would like to create inside."

show grid lines for the canvas

### zoom and move view around

- also reset view

UI: button to reset view. tool item for panning and zooming view but the functionality is duplicated on the trackpad.

### select vertices or edges or faces

- ability to select multiple (of the same) at once.
- rectangular selection

UI: tool button for select.

### export file as

- fully-saturated FOLD
- minimal FOLD

UI: menubar buttons

### import

- load FOLD (warn if 3D)
- import SVG, planarize, etc.

UI: menubar buttons, popup for SVG import. see: foldfile.com

## terminal

all operations described on here can be expressed as a text-based command. as you perform an operation with the UI, the command text is filled into the terminal. the terminal interface is also accessible to the user to be able to write these commands manually. For example this is a feature in Rhino3D, recreate this same functionality.

## outline: code

### signals/stores

- app: the current UI tool.
- app: can select which: V, E, F.
- currently selected graph component indices.
- currently hovered-over graph component indices.
- device input:
   - keyboard, dictionary of currently pressed keys (for shift-clicking).
   - mouse/touch events on SVG canvas. onpress, onrelease, onmove. one array for each.
- preferences:
   - vertex snapping
- app: current view zoom

- the FOLD graph (a single FOLD frame).
- possibly: the FOLD metadata (all "file_" keys).

### InputManager

the manager knows about the currently selected UI tool, and all input is passed through here and converted into commands to be sent to the engine.

input (mouse, keyboard) events are stored into a collection as they arrive, until the proper conditions have been met (based on the current tool), then the command is executed and the event storage is modified, for example, emptied in preparation for the next command.

unsorted notes:

for example the "delete currently selected" should perform the delete call, which, hopefully is a single function call to the Rabbit Ear library which makes a change to the data model, but then contains additional methods for the UI, such as to clear the currently selected set of components. so, an operation on the graph is in most cases actually an encapsulated function that contains the graph modify call, along with other application-specific and UI related calls. as far as what appears inside the "terminal", it should appear as one function call. "delete edge 4"
