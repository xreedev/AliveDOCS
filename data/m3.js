/* Module 3 · Mechanical design, CAD & manufacturing (days 57–84). Source: Notion Daily Plan. */

// ───────────── Section 1 · CAD fundamentals ─────────────
D({
  n: 57, icon: '🧭', topic: 'CAD', hours: 2.5, notion: '3f6cdfea8ce2814aaf18e78b157ceca3', svg: 'sketch',
  title: 'Pick one CAD tool and start the course',
  goal: 'Choose one CAD tool for the whole course and finish its first lessons.',
  tasks: [
    'Read the Month 3 intro and the CAD decision framework in the reading lesson',
    'Choose: Onshape (browser, public docs), Fusion Personal (CAM + print later), or FreeCAD (fully free). Write why',
    'Start Onshape Fundamentals: CAD (or Fusion in 30 Days days 1–2, or MangoJelly FreeCAD basics)',
    'Learn the UI: sketch plane, sketch tools, extrude, view cube, measure',
    'Model a simple 40 × 20 × 5 mm plate with two M3 holes 30 mm apart',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['Month 3 goal', 'Your goal this month: design a part in CAD, manufacture it, and have it fit.\n\nThis is the month that separates people who assemble kits from people who build robots.\n\nEvery robot you build after this will contain parts that exist only because you designed them, and being able to go from an idea to a physical bracket in an afternoon changes what projects are possible for you.'],
    ['1. CAD — decision framework', 'Pick one tool and go deep rather than sampling all of them.\n\nOnshape Free if you are happy designing in public. It runs in a browser, works on any machine including a Chromebook, and its assembly and mate system behaves the way robot joints actually behave. The catch is real: every document is public on the free tier.\nFusion Personal if you want CAM and 3D-print integration later. Free on a renewable 3-year term for non-commercial use under $1,000 a year of revenue, but with limited import and export file types.\nFreeCAD if you are somewhere cloud CAD or card payment is a problem, or you object to a licence that can be revoked. Version 1.1 landed in March 2026 and it is genuinely usable now.\nSOLIDWORKS for Makers at $48/year if you want the industry-standard tool, with the caveat that native files are watermarked and will not open in commercial SOLIDWORKS.']
  ],
  links: [
    ['Onshape Learning Center, Fundamentals: CAD', 'https://learn.onshape.com/learning-paths/onshape-fundamentals-cad'],
    ['Product Design Online, Learn Autodesk Fusion in 30 Days', 'https://productdesignonline.com/learn-autodesk-fusion-360-in-30-days-official-course/'],
    ['MangoJelly Solutions FreeCAD tutorials', 'https://www.youtube.com/@MangoJellySolutions']
  ],
  video: `
## From kit builder to robot builder
@big Every robot after this contains parts that exist only because you designed them
Welcome to Module 3. Its goal is to design a part in CAD, manufacture it, and have it fit. The article calls this the month that separates people who assemble kits from people who build robots.
Until now you have bought every mechanical part. After this month, when you need a bracket, a mount or a gripper finger, you will design it in an afternoon and print it overnight. That changes what projects are possible for you.

## Pick one tool and go deep
| Tool | Choose it if | The catch |
|---|---|---|
| Onshape Free | you want browser CAD on any machine; great assemblies | every free document is public |
| Fusion Personal | you want CAM and printing integration later | non-commercial licence, limited export types |
| FreeCAD 1.1 | you want fully free, offline, no account | steeper learning curve |
| SOLIDWORKS for Makers | you want the industry standard ($48/yr) | watermarked files |
The article's advice is clear: pick one tool and go deep, rather than sampling all of them. Every CAD tool uses the same core ideas, so depth in one transfers to the others later.
Onshape runs in a browser on anything, even a Chromebook, and its assemblies behave like real robot joints, but free documents are public. Fusion Personal adds manufacturing tools and print integration, with a non-commercial licence. FreeCAD is completely free and offline, and since version one point one it is genuinely usable.
Choose one today and write down why. Then commit to it for the whole course.

## How parametric CAD thinks
1. Choose a plane
2. Draw a 2D sketch with dimensions and constraints
3. Turn it into 3D with a feature (extrude, revolve…)
4. Add more sketches and features on top
Nearly all mechanical CAD works the same way. You pick a flat plane, draw a two-dimensional sketch on it with exact dimensions, then turn that sketch into a solid with a feature, most often an extrude, which pushes the shape out to a thickness.
Then you sketch on a face of that solid and add more features: holes, cuts, fillets. The model remembers every step in a feature tree, so you can go back and change any of them later.

## Your first part
@svg sketch | 40 × 20 × 5 mm plate, two M3 holes 30 mm apart
Today's part is a simple plate: forty by twenty millimetres, five millimetres thick, with two M3 screw holes thirty millimetres apart.
M3 screws are about three millimetres in diameter, so the holes should be slightly larger, around three point two to three point four millimetres, so the screws pass through. You will refine that number when you start printing.
Draw the rectangle, dimension it, extrude it five millimetres, sketch two circles on the top face, dimension their position, and cut them through. That is the full workflow, in miniature.

## Learn the interface
- Sketch tools: line, rectangle, circle, dimension
- Features: extrude, cut
- View cube: rotate, top, front, isometric
- Measure tool: check what you made
Spend the rest of the session on the course's first lessons: the sketch tools, extrude and cut, the view cube for rotating your model, and the measure tool.
Use the measure tool on your plate. Is the hole spacing exactly thirty millimetres? Checking your own work in CAD is the same habit as measuring with your multimeter.
`,
  key: [
    'Pick one CAD tool (Onshape, Fusion Personal or FreeCAD) and go deep.',
    'Workflow: plane → dimensioned 2D sketch → feature (extrude) → more features.',
    'The feature tree remembers every step, so any dimension can change later.',
    'M3 clearance holes are about 3.2–3.4 mm.'
  ],
  quiz: [
    ['What is the article\'s advice on choosing CAD software?', ['Try all of them equally', 'Pick one tool and go deep', 'Always use SOLIDWORKS', 'Avoid browser CAD'], 1, 'Depth in one tool transfers to others later.'],
    ['What is the main catch of Onshape\'s free tier?', ['It only runs on Windows', 'Every document is public', 'It cannot make assemblies', 'It has no extrude tool'], 1, 'Straight from the decision framework.']
  ]
});

D({
  n: 58, icon: '📐', topic: 'CAD', hours: 2.5, notion: '3f6cdfea8ce281fbb047fbde0b4a9048', svg: 'sketch',
  title: 'Fully constrained, parametric sketches',
  goal: 'Every sketch fully constrained (black, not blue), and parts driven by variables.',
  tasks: [
    'Continue the course lessons on sketch constraints and dimensions',
    'Redo yesterday\'s plate fully constrained. Check that no line can be dragged',
    'Add variables: plate_length, hole_spacing, thickness. Change one and watch the whole part update',
    'Model an L-bracket with variable wall thickness and two slots',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['What to focus on', 'Fully constrained sketches, because an under-constrained sketch will move when you edit it later and ruin your day.\nParametric design driven by variables, so changing one dimension updates the whole part.']
  ],
  links: [
    ['Onshape Fundamentals: CAD', 'https://learn.onshape.com/learning-paths/onshape-fundamentals-cad'],
    ['Learn Fusion in 30 Days', 'https://productdesignonline.com/learn-autodesk-fusion-360-in-30-days-official-course/'],
    ['MangoJelly FreeCAD', 'https://www.youtube.com/@MangoJellySolutions']
  ],
  video: `
## Why "fully constrained" matters
@big An under-constrained sketch will move when you edit it later — and ruin your day
Today's lesson sounds dry but saves you hours. A sketch is fully constrained when every line and point has its position fully determined by dimensions and constraints. Nothing can be dragged.
Most CAD tools show this with colour. In Onshape and Fusion, unconstrained geometry is blue and fully constrained geometry turns black. The article warns that an under-constrained sketch will move when you edit it later and ruin your day, and it is right: change one dimension, and loose geometry slides somewhere unexpected.

## Constraints and dimensions
| Type | Examples | What it fixes |
|---|---|---|
| geometric constraints | horizontal, vertical, coincident, tangent, equal, concentric | relationships between shapes |
| dimensions | lengths, diameters, angles, distances | sizes and positions |
| reference to origin | anchor a corner or centre to the origin | where the whole sketch sits |
There are two tools for constraining. Geometric constraints describe relationships: this line is horizontal, these two circles are concentric, these points coincide. Dimensions set sizes and distances.
And one thing everyone forgets: anchor the sketch to the origin. If no point is tied to the origin, the whole sketch can float around, even if all its sizes are set.

## The constraining habit
1. Sketch the rough shape
2. Add geometric constraints first (horizontal, coincident, symmetric…)
3. Add dimensions
4. Anchor to the origin
5. Everything black? Done.
A good habit: draw the rough shape quickly, then add geometric constraints, then dimensions, then anchor it to the origin. Check that everything has turned black before you leave the sketch.
Prefer constraints that capture design intent. If two holes should always be symmetric about the centre, use a symmetric constraint, not two separate dimensions. Then when the plate changes size, the holes stay centred automatically.

## Parametric design: variables
\`\`\`text
plate_length = 40 mm
hole_spacing = plate_length - 10 mm
thickness    = 5 mm
wall         = 2.4 mm
\`\`\`
The second idea is parametric design. Instead of typing numbers directly into dimensions, define named variables, like plate length, hole spacing and thickness, and use them in your dimensions. Variables can even be formulas of other variables.
Change one variable and the whole part updates correctly. That is enormously useful in robotics: when you discover that a printed hole is too tight, you change one clearance variable and every hole in the design updates at once.

## Today's practice
- Rebuild yesterday's plate, fully constrained and variable-driven
- Change plate_length: does everything update sensibly?
- Model an L-bracket with variable wall thickness and two slots
Rebuild yesterday's plate fully constrained and driven by variables. Then change the plate length and watch what happens. If the holes stay correctly placed, your design intent is captured. If something breaks, find which constraint was missing.
Finish with an L-shaped bracket, with a variable wall thickness and two slots for screws. Slots let you adjust a part's position slightly after mounting, which is very handy on real robots.
`,
  key: [
    'Fully constrained = every entity determined; usually shown black instead of blue.',
    'Use geometric constraints, dimensions, and anchor the sketch to the origin.',
    'Capture design intent (e.g. symmetry) rather than independent numbers.',
    'Drive dimensions with named variables so one change updates the whole part.'
  ],
  quiz: [
    ['Why should sketches be fully constrained?', ['They render faster', 'Loose geometry moves unexpectedly when you edit dimensions later', 'It is required to export STL', 'It makes the part lighter'], 1, 'From the article: an under-constrained sketch will ruin your day.'],
    ['What is the benefit of driving dimensions with variables?', ['Smaller files', 'Changing one value updates every dependent dimension', 'It removes the need for constraints', 'Faster printing'], 1, 'That is parametric design.']
  ]
});

D({
  n: 59, icon: '🧱', topic: 'CAD', hours: 2.5, notion: '3f6cdfea8ce28133b734c5530b43e621', svg: 'sketch',
  title: 'Features: extrude, cut, fillet, hole, pattern',
  goal: 'Build real-looking parts quickly with the core 3D features.',
  tasks: [
    'Course lessons on extrude / cut, revolve, fillet / chamfer, hole tool, linear and circular pattern, mirror',
    'Model a motor mount for your Month 2 Pololu gearmotor (measure it with calipers or use its drawing)',
    'Model a wheel hub with a D-shaft hole and 6 spokes using a circular pattern',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [['What to focus on', 'Designing around hardware you actually own, starting from the servo\'s datasheet dimensions.']],
  links: [
    ['Learn Fusion in 30 Days (30 modelled objects)', 'https://productdesignonline.com/learn-autodesk-fusion-360-in-30-days-official-course/'],
    ['Onshape Fundamentals: CAD', 'https://learn.onshape.com/learning-paths/onshape-fundamentals-cad']
  ],
  video: `
## The core features
| Feature | What it does | Robot example |
|---|---|---|
| extrude / cut | push a sketch into a solid, or remove material | plates, pockets |
| revolve | spin a profile around an axis | wheels, shafts, spacers |
| fillet / chamfer | round or bevel edges | stronger corners, easier assembly |
| hole | standard screw holes, counterbores | M3 mounting holes |
| linear / circular pattern | repeat a feature | hole grids, wheel spokes |
| mirror | copy across a plane | symmetric brackets |
With half a dozen features you can model almost any robot part. Extrude and cut you know. Revolve spins a profile around an axis, perfect for wheels, spacers and shafts.
Fillets round edges and chamfers bevel them. A fillet on an inside corner is not just cosmetic: it spreads stress and makes the part much stronger.
The hole tool creates standard screw holes, including counterbores so screw heads sit flush. And patterns repeat a feature in a line or around a circle, so six spokes are modelled once and repeated.

## Design around what you own
@big Start from the real part's dimensions — measured or from its drawing
The article's focus for today is designing around hardware you actually own. A beautiful motor mount is useless if the screw holes are two millimetres off.
So start from the real dimensions. Use the manufacturer's drawing where you can, and measure with calipers where you cannot. Today, design a mount for your Module 2 Pololu gearmotor: its body diameter, its mounting screw positions and thread size, and the shaft position.

## Using calipers well
- Zero them before measuring
- Measure three times, use the average
- Outer jaws for outside, inner jaws for holes, depth rod for depth
- Note tolerance: real parts vary by ±0.1 mm or more
Digital calipers are the multimeter of mechanical work. Zero them first, close the jaws gently, and measure each dimension a few times.
Use the outer jaws for outside sizes, the small inner jaws for hole diameters, and the rod at the end for depths. Write every measurement down, and remember that real parts vary, just like resistor tolerance in Module 1.

## The wheel hub
\`\`\`text
1. Sketch a profile; revolve 360° → hub body
2. Sketch a D-shaped hole (circle + flat); cut through
3. Sketch one spoke; extrude
4. Circular pattern the spoke × 6 around the axis
5. Fillet where spokes meet the hub
\`\`\`
Then model a wheel hub. Revolve its body. Cut a D-shaped shaft hole, a circle with one flat side, which stops the hub slipping on a D-shaft motor. Model one spoke, and use a circular pattern to make six. Fillet the joints.
Notice how the pattern stays linked: change the spoke and all six update. That is parametric design paying off again.

## Order your features well
- Big shapes first, details last
- Fillets and chamfers near the end of the feature tree
- Name important features so you can find them later
One last habit for today: feature order. Build the big shapes first and add details like fillets and chamfers near the end of the feature tree. Fillets added early tend to break when you later change the shapes underneath them.
Rename important features too, such as motor holes or shaft bore. In a month, when you reopen the part to change one dimension, you will thank yourself.
`,
  key: [
    'Core features: extrude/cut, revolve, fillet/chamfer, hole, patterns, mirror.',
    'Inside fillets spread stress and strengthen parts.',
    'Design from real dimensions: datasheet drawings and careful caliper measurements.',
    'Patterns stay linked, so editing one instance updates all.'
  ],
  quiz: [
    ['Which feature is best for modelling a wheel or spacer?', ['Extrude', 'Revolve', 'Mirror', 'Chamfer'], 1, 'Revolve spins a profile around an axis.'],
    ['Why give a motor shaft hole a "D" shape?', ['It prints faster', 'The flat stops the hub slipping on a D-shaft', 'It is lighter', 'It removes the need for screws'], 1, 'The flat transmits torque.']
  ]
});

D({
  n: 60, icon: '🔗', topic: 'CAD', hours: 2.5, notion: '3f6cdfea8ce281438e76c6435eb56b2e', svg: 'arm',
  title: 'Assemblies and mates that act like joints',
  goal: 'Assemble parts with mates that move like real robot joints.',
  tasks: [
    'Course lessons on assemblies / mates (Onshape) or joints (Fusion) or Assembly workbench (FreeCAD)',
    'Assemble a 2-link arm: base (fixed), link 1 (revolute), link 2 (revolute). Drag it and watch it move',
    'Add a slider joint on a simple linear stage',
    'Add joint limits (e.g. ±90°)',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [['What to focus on', 'Assemblies and mates that mirror real joints: revolute, slider, fixed.']],
  links: [
    ['Onshape Fundamentals: CAD (assemblies)', 'https://learn.onshape.com/learning-paths/onshape-fundamentals-cad'],
    ['Learn Fusion in 30 Days', 'https://productdesignonline.com/learn-autodesk-fusion-360-in-30-days-official-course/']
  ],
  video: `
## From parts to mechanisms
@svg arm | parts + joints = a mechanism you can drag
So far you have modelled single parts. Real robots are assemblies: many parts connected by joints. In CAD, you bring parts into an assembly and connect them with mates, which Fusion calls joints.
Done well, the CAD assembly moves exactly like the real mechanism. You can drag a link and watch the arm swing, check that nothing collides, and see the full range of motion before you print anything.

## The three joints that matter
| Mate / joint | Degrees of freedom | Robot example |
|---|---|---|
| fixed (fastened) | 0 | base bolted to the table |
| revolute | 1 rotation | every arm joint, a wheel axle |
| slider (prismatic) | 1 translation | linear stage, 3D printer axis |
The article names the three that matter most: fixed, revolute and slider. A fixed mate locks two parts together. A revolute mate allows rotation about one axis, like an elbow or a wheel. A slider allows movement along one line, like a drawer or a printer axis.
These names are not just CAD vocabulary. In Module 4 you will describe robots in URDF files, and they use exactly the same joint types: fixed, revolute, prismatic. Learning them now in CAD makes that step natural.

## Build a two-link arm
1. Insert the base; fix it
2. Insert link 1; revolute mate to the base
3. Insert link 2; revolute mate to link 1
4. Drag the end: it moves like an arm
Assemble a simple two-link arm. Fix the base. Connect link one to the base with a revolute mate at the shoulder, and link two to link one with another revolute at the elbow.
Now grab the end of link two and drag it around. The arm swings exactly as a real two-joint arm would. You are looking at the forward kinematics problem from Module 5, in physical form.

## Joint limits
- Real joints cannot spin forever: cables, hard stops, collisions
- Add limits, e.g. −90° to +90°
- Limits reveal reachable space before you build
Real joints have limits. Cables wind up, parts collide, servos have a maximum travel. Add limits to your revolute mates, for example plus or minus ninety degrees, and the assembly respects them when you drag it.
Limits show you which positions the arm can actually reach. Finding out in CAD that a link hits the base at sixty degrees is far better than finding out after printing.

## A slider for completeness
- Model a simple carriage on a rail
- Slider mate with travel limits
- This is how printer axes and grippers move
Finally, add a slider joint on a simple linear stage: a carriage moving along a rail, with travel limits at each end.
Combining revolute and slider joints describes almost every robot mechanism you will build, from grippers to gantries.
`,
  key: [
    'Assemblies connect parts with mates/joints so they move like the real mechanism.',
    'Fixed (0 DOF), revolute (1 rotation), slider/prismatic (1 translation).',
    'URDF in Module 4 uses the same joint types.',
    'Joint limits reveal reachable space and collisions before printing.'
  ],
  quiz: [
    ['Which mate represents a robot arm\'s elbow?', ['Fixed', 'Revolute', 'Slider', 'Planar'], 1, 'One rotational degree of freedom.'],
    ['Why add joint limits in a CAD assembly?', ['To make the file smaller', 'To respect real stops and reveal reachable positions before building', 'To colour the parts', 'Exporting requires them'], 1, 'Catch collisions in CAD, not after printing.']
  ]
});

D({
  n: 61, icon: '🖨️', topic: 'CAD', hours: 2, notion: '3f6cdfea8ce281cab0d0dcd6936fdc20', svg: 'printer',
  title: 'Design for 3D printing + STEP vs STL vs 3MF',
  goal: 'Design parts that print well, and export the right file for each job.',
  tasks: [
    'Read Protolabs Network: Design for 3D printing (wall thickness, orientation, overhangs, tolerances, snap-fits)',
    'Re-check your motor mount: walls ≥ 1.2 mm, no unsupported overhang > 45°, holes sized for print shrinkage',
    'Export the same part as STEP and STL. Open both and note what STL loses (it is only triangles)',
    'Write 3 rules you will follow for every printed part',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['Design for 3D printing', 'The design-for-manufacture half of CAD: wall thickness, orientation, tolerances, supports, snap-fits, and when to use STL versus 3MF versus STEP.'],
    ['What to focus on', 'Exporting STEP for sharing and STL for printing, and knowing the difference.']
  ],
  links: [['Protolabs Network, Design for 3D printing', 'https://www.hubs.com/knowledge-base/design-for-3d-printing/']],
  video: `
## Design for how it will be made
@svg printer | layer by layer: strong along layers, weak between them
A part that looks perfect in CAD can print badly or not at all. Design for manufacture means designing with the process in mind. For 3D printing, that process is a nozzle laying down plastic one thin layer at a time.
That one fact explains almost every rule today.

## The key printing rules
| Rule | Why |
|---|---|
| walls ≥ 1.2 mm (about 3 lines of a 0.4 mm nozzle) | thinner walls are weak or do not print |
| overhangs ≤ 45° without support | steeper overhangs droop into thin air |
| orient so loads run along layers | layers can split apart under tension |
| holes print undersized | add clearance, or drill out |
| flat face on the bed | a stable first layer |
Walls need to be at least about one point two millimetres, three passes of a standard nozzle. Overhangs steeper than forty-five degrees need support material, because plastic cannot be printed onto thin air.
Orientation matters more than beginners expect. A printed part is strong along its layers and weak between them, like plywood. So orient the part so the main load runs along the layers, never trying to peel them apart.
And holes print slightly undersized, because of how the plastic squishes and shrinks. Design them a little bigger, or plan to drill them out.

## Tolerances and fits
@eq printed hole ≈ designed hole − 0.1 to 0.3 mm | measure your printer; next section you print a tolerance gauge
Two printed parts that must fit together need a gap between them, called clearance. How much depends on your printer, but a typical starting point is around zero point two millimetres per side for a sliding fit.
You will not guess this number. Next section you print a tolerance gauge, measure your printer's real behaviour, and put the right clearance into a variable. Parametric design makes that trivial.

## STEP vs STL vs 3MF
| Format | Contains | Use it for |
|---|---|---|
| STEP | exact geometry: true curves, faces, features | sharing designs, editing in other CAD tools |
| STL | a mesh of triangles only | the classic input to slicers |
| 3MF | mesh plus units, colours, print settings | modern slicer workflows |
Finally, file formats. STEP stores exact geometry, true circles and curved surfaces, so any CAD tool can open and edit it. Use STEP when you share designs.
STL stores only a mesh of triangles approximating the surface. It has no units and no features, and a circle becomes a polygon. It is what slicers have traditionally used. Export both today, open them, and see what the STL loses.
3MF is the modern replacement for STL: still a mesh, but with units, colours and even print settings included. Many slicers prefer it now.

## Your three rules
- Write three rules you will follow for every printed part
- e.g. "Walls ≥ 1.2 mm", "Holes +0.2 mm", "Load along the layers"
Write three rules you will follow for every printed part, and apply them to your motor mount today. Check its walls, overhangs and holes. Next section you start printing, and these rules will save you plenty of failed prints.
`,
  key: [
    'Walls ≥ ~1.2 mm; overhangs ≤ 45° without supports.',
    'Prints are weak between layers: orient so loads run along layers.',
    'Holes print undersized; design in clearance (measure your printer).',
    'STEP = exact geometry for sharing; STL/3MF = meshes for printing.'
  ],
  quiz: [
    ['Which file format keeps exact geometry for editing in another CAD tool?', ['STL', 'STEP', 'G-code', 'PNG'], 1, 'STL is only triangles; STEP keeps true geometry.'],
    ['Why orient a printed bracket so the load runs along the layers?', ['It prints faster', 'Layers are weakest when pulled apart', 'It uses less filament', 'Supports are not allowed'], 1, 'Prints are like plywood: weak between layers.']
  ]
});

D({
  n: 62, icon: '🛠️', topic: 'CAD', hours: 3, notion: '3f6cdfea8ce2811c9085c2f0e4447d60', svg: 'sketch',
  title: 'Practice task: servo bracket from the datasheet',
  goal: 'Model a bracket for your exact servo from the manufacturer\'s drawing, not by eye.',
  tasks: [
    'Find the datasheet drawing of your servo (kit SG90/MG996R, or the STS3215 if it has arrived)',
    'Model the bracket: correct screw-hole positions and diameters, shaft clearance, cable exit',
    'Make it parametric (wall thickness, clearance as variables)',
    'Check with calipers on the real servo where you can',
    'Export STL (you print it on Day 11 of this module)',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['Practice task (CAD)', 'Practice task: model a bracket that holds the exact servo you bought, with correctly sized screw holes and a shaft clearance, from the manufacturer\'s datasheet drawing rather than by eye. Then print it and see if it fits, which it probably will not the first time, and that failure is the lesson.'],
    ['Month 3 Milestone (this one)', 'Model a part from a datasheet in CAD with fully constrained sketches.']
  ],
  links: [
    ['Protolabs: Design for 3D printing', 'https://www.hubs.com/knowledge-base/design-for-3d-printing/'],
    ['FeeTech STS3215 (RobotShop page with specs)', 'https://www.robotshop.com/products/feetech-12v-30kgcm-magnetic-encoding-servo-sts3215']
  ],
  video: `
## The practice task
@big A bracket for YOUR servo, from its datasheet drawing — not by eye
Today's practice task is a classic: model a bracket that holds the exact servo you own, with correctly sized screw holes and shaft clearance, working from the manufacturer's datasheet drawing.
The article adds that when you print it, it probably will not fit the first time, and that failure is the lesson. Today you design it carefully. In two sections you print it and find out.

## Reading a mechanical drawing
| Element | Meaning |
|---|---|
| dimension lines with numbers | sizes in millimetres |
| Ø | diameter |
| tolerances like ±0.1 | allowed variation |
| centre lines | symmetry axes, hole centres |
| multiple views | front, side, top of the same part |
A mechanical drawing shows the part from several views, front, side and top, with dimension lines giving every important size in millimetres. The Ø symbol means diameter. Centre lines mark axes of symmetry and the centres of holes.
Find the numbers you need: the body width and height, the mounting tab hole spacing and diameter, the position of the output shaft, and where the cable comes out.

## Design decisions
- Body pocket = servo size + clearance (variable)
- Mounting holes at the drawing's spacing, sized for your screws
- Shaft clearance hole so the horn turns freely
- Cable exit slot
- Walls ≥ 1.2 mm; orient for strength
Model the bracket to hold the servo body with a little clearance, defined as a variable so you can tune it later. Place the mounting holes exactly at the drawing's spacing. Add a clearance hole for the output shaft, so the servo horn turns freely, and a slot for the cable.
Apply yesterday's printing rules: walls thick enough, overhangs printable, and an orientation where the screw loads run along the layers.

## Constrain it fully, drive it with variables
\`\`\`text
servo_w = 40.0   servo_h = 20.0   (from the drawing)
clear   = 0.3    wall = 2.4
pocket_w = servo_w + 2*clear
tab_hole_spacing = 48.0   tab_hole_d = 3.4
\`\`\`
This day is also a milestone item: model a part from a datasheet with fully constrained sketches. So check that every sketch is black, and that every key dimension comes from a named variable.
Then, when the print does not quite fit, you change one or two variables, not a dozen dimensions scattered across sketches.

## Check against reality
- Measure the real servo with calipers
- Compare with the drawing: any surprises?
- Export STL for printing later
Where you can, measure the real servo with calipers and compare it with the drawing. Drawings occasionally differ from the parts that actually ship, and catching that now saves a print.
Export the STL and save the STEP as well. You will print it in the next section and discover whether your clearances were right.
`,
  key: [
    'Design from the datasheet drawing, not by eye.',
    'Read drawings: views, dimensions, Ø, tolerances, centre lines.',
    'Pocket = part size + clearance variable; holes at drawing spacing; shaft and cable clearance.',
    'Fully constrained, variable-driven sketches make the inevitable fix easy.'
  ],
  quiz: [
    ['What does the symbol Ø mean on a mechanical drawing?', ['Radius', 'Diameter', 'Tolerance', 'Angle'], 1, 'Ø marks a diameter.'],
    ['Why define the servo-pocket clearance as a variable?', ['Variables print faster', 'So you can quickly adjust the fit after the first print', 'STL needs variables', 'It hides the dimension'], 1, 'The first print probably will not fit perfectly.']
  ]
});

D({
  n: 63, icon: '🔁', topic: 'Review', hours: 2, notion: '3f6cdfea8ce2810b9fe0d19a615e5841', svg: 'sketch',
  title: 'Week 1 review + catch-up',
  goal: 'Finish Week 1 CAD work and set up printing for Week 2.',
  tasks: [
    'Finish unfinished tasks from M3 Days 1–6',
    'Speed test: model the M3 plate + L-bracket again from scratch in under 20 minutes',
    'Printing plan for Section 2: printer arrived / Fab Lab booked / print service account ready?',
    'Check the SO-101 kit shipping status',
    'Update Confidence on Days 1–6'
  ],
  video: `
## The CAD speed test
@big Plate + L-bracket, from scratch, under 20 minutes
Review day for CAD. The best test of fluency is speed. Model the plate with two M3 holes and the L-bracket again, from scratch, fully constrained and variable-driven, in under twenty minutes.
If you make it, the core workflow has become automatic. If not, note which step slowed you down, and practise exactly that.

## Plan your printing route
| Route | Check today |
|---|---|
| own printer | has it arrived? unboxed? |
| Fab Lab | booked a slot? know their machines? |
| print service | account made? upload tested? |
Next section is all about printing, so make sure your route is ready. If you bought a printer, has it arrived? If you are using a Fab Lab, is a slot booked? If you are using a print service like Craftcloud or JLC3DP, is your account set up and have you tested an upload?
Print services take days to ship, so if that is your route, consider ordering the tolerance gauge and servo bracket early.

## The arm kit
- SO-101 kit shipping status?
- Section 3 starts the arm build
Finally, check the SO-101 kit's shipping status. The arm build starts in section three. If it is delayed, you can swap the order of some days, but knowing early gives you options.
`,
  key: [
    'A timed rebuild is the best test of CAD fluency.',
    'Have your printing route ready before Section 2.',
    'Track the SO-101 kit: the arm build starts in Section 3.'
  ],
  quiz: [
    ['What is the purpose of today\'s 20-minute CAD rebuild?', ['To make a new part', 'To test whether the core workflow has become fluent', 'To export STL', 'To learn a new tool'], 1, 'Speed reveals fluency.'],
    ['Which printing routes does the plan allow?', ['Only buying a printer', 'Own printer, a Fab Lab, or a print service', 'Only print services', 'No printing at all'], 1, 'Any route works if it is ready in time.']
  ]
});
// ───────────── Section 2 · 3D printing parts that fit ─────────────
D({
  n: 64, icon: '🖨️', topic: '3D printing', hours: 2.5, notion: '3f6cdfea8ce281709cf2decf93016e5e', svg: 'printer',
  title: 'Printer setup and filament choice',
  goal: 'A printer that prints (or a working print route), and a clear rule for which filament to use for which part.',
  article: 'No printer? Do today\'s reading, then use a Fab Lab or Craftcloud / JLC3DP for this section\'s prints. Batch all of Section 2\'s parts into one order.',
  tasks: [
    'Read the 3D printing section in the reading lesson (printers + filaments + if you cannot buy a printer)',
    'Unbox and set up the printer. Install the slicer (OrcaSlicer or the vendor slicer)',
    'Print the vendor test model',
    'Make a table: filament → strengths → weaknesses → which robot parts',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['Filament, and when to use each', 'PLA and PLA+ for prototype brackets, jigs, and the SO-101 arm itself, which specifies PLA+ at 15% infill and 0.2mm layers. Stiffest of the easy materials, and it creeps under sustained load and softens around 55 to 60°C.\nPETG for the default real robot part: chassis plates, gearbox housings, servo mounts, anything that must survive a drop. Tough with far better layer adhesion than PLA, and stringy.\nABS and ASA for parts near hot motors and for outdoor rovers, and they warp badly without an enclosure.\nNylon for gears and cable guides, and it is easier to order than to print.\nCarbon-fibre filled for stiff structural links, and it needs a hardened nozzle because it is abrasive.\nTPU for feet, bumpers and compliant gripper fingers.'],
    ['If you cannot buy a printer', 'The honest economics: an SO-101 arm needs roughly 1kg of PLA+, which is about $20 to $25 of filament on your own machine against $30.99 for a ready-printed set. A printer does not pay for itself on one build. It pays for itself on iteration, because the tenth revision of a gripper finger costs 40 cents and 25 minutes at home, against $8 and a week from a service.']
  ],
  links: [
    ['Fab Labs worldwide', 'https://fablabs.io/labs'],
    ['Craftcloud', 'https://craftcloud3d.com/'],
    ['JLC3DP', 'https://jlc3dp.com/'],
    ['Bambu Lab A1 mini', 'https://www.bestbuy.com/product/bambu-lab-a1-mini-3d-printer-silver/CZTZV9ZGGV'],
    ['Creality Ender-3 V3 SE', 'https://store.creality.com/products/ender-3-v3-se-3d-printer']
  ],
  video: `
## How FDM printing works
@svg printer | heat, extrude, layer by layer
Most hobby printers use fused deposition modelling, FDM. A spool of plastic filament is pushed into a hot nozzle, melted, and laid down in thin lines, one layer at a time, building the part from the bottom up.
Your CAD model goes through a slicer program, which cuts it into layers and generates the tool path, called G-code, that the printer follows. The slicer is where you choose layer height, infill, walls, supports and temperatures.

## Choosing a material
| Filament | Strengths | Weaknesses | Use it for |
|---|---|---|---|
| PLA / PLA+ | stiff, easy, accurate | creeps; softens ~55–60 °C | prototypes, jigs, the SO-101 arm |
| PETG | tough, good layer adhesion | stringy | real robot parts, chassis, mounts |
| ABS / ASA | heat and weather resistant | warps without an enclosure | parts near hot motors, outdoors |
| Nylon | tough, low friction | hard to print | gears, cable guides (order it) |
| CF-filled | very stiff | abrasive: hardened nozzle | stiff structural links |
| TPU | flexible, grippy | slow, tricky | feet, bumpers, gripper fingers |
The article gives a clear rule for each material. PLA is the easy, stiff default for prototypes and jigs, and the SO-101 arm specifies PLA plus. But PLA slowly deforms under constant load and softens at around fifty-five degrees, so keep it away from hot motors.
PETG is the default for real robot parts: tougher, with much better layer adhesion, at the cost of some stringing. ABS and ASA handle heat and sunlight but warp without an enclosure. Nylon is great for gears but easier to order than to print. Carbon-fibre filled filaments are stiff but abrasive. And TPU is the flexible one, perfect for gripper fingers and bumpers.

## Printer or service?
@eq one SO-101 ≈ $20–25 filament vs $30.99 printed set | a printer pays for itself on iteration, not on one build
If you are deciding whether to buy a printer, the article gives the honest economics. Printing an SO-101 arm yourself costs about twenty to twenty-five dollars in filament, against thirty-one dollars for a ready-printed set. A printer does not pay for itself on one build.
It pays for itself on iteration. The tenth version of a gripper finger costs forty cents and twenty-five minutes at home, against eight dollars and a week from a service. Mechanical design is all iteration, as you will see this section.

## First prints
1. Level the bed (or let the printer auto-level)
2. Load filament at the right temperature
3. Install the slicer; pick your printer profile
4. Print the vendor's test model
5. Watch the first layer closely
Set the printer up following its guide, install the slicer, and print the vendor's test model.
Watch the first layer: it should be slightly squished onto the bed, smooth and well stuck. Most print failures start with a bad first layer, so getting it right is worth a few minutes of attention every time.
No printer? Read everything today anyway, then batch all of this section's parts into one Fab Lab session or one service order.
`,
  key: [
    'FDM: filament melted and laid down layer by layer; the slicer turns CAD into G-code.',
    'PLA for prototypes (not heat), PETG for real parts, TPU for flexible parts.',
    'A printer pays for itself through cheap, fast iteration.',
    'A good first layer prevents most print failures.'
  ],
  quiz: [
    ['Which filament is the article\'s default for real robot parts that must survive a drop?', ['PLA', 'PETG', 'TPU', 'Nylon'], 1, 'Tough with better layer adhesion than PLA.'],
    ['Why not use PLA for a bracket next to a hot motor?', ['It is too flexible', 'It softens around 55–60 °C and creeps under load', 'It is conductive', 'It cannot be printed'], 1, 'Use ABS/ASA or PETG near heat.']
  ]
});

D({
  n: 65, icon: '🌡️', topic: '3D printing', hours: 2.5, notion: '3f6cdfea8ce281438cddc9a90b263019', svg: 'printer',
  title: 'Calibrate the printer',
  goal: 'Calibrate temperature, flow and retraction so parts come out the size you designed.',
  tasks: [
    'Follow the OrcaSlicer calibration order: temperature tower → flow rate → pressure advance → retraction',
    '(Or follow Teaching Tech\'s interactive calibration, printer-agnostic)',
    'Print a 20 mm cube. Measure X/Y/Z with calipers. Record the error',
    'Save the tuned profile with a clear name (e.g. PLA+ _ tuned)',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['OrcaSlicer Calibration wiki', 'Temperature, flow, pressure advance, retraction and tolerance calibration in a recommended running order, and it is the most useful slicing document for anyone who wants parts that fit.']
  ],
  links: [
    ['OrcaSlicer Calibration wiki', 'https://github.com/OrcaSlicer/OrcaSlicer/wiki/Calibration'],
    ['Teaching Tech 3D Printer Calibration', 'https://teachingtechyt.github.io/calibration.html']
  ],
  video: `
## Why calibrate
@big Parts that fit come from a calibrated printer
Out of the box, most printers make parts that look fine but come out a little too big, a little too small, stringy, or slightly weak. For robots, where a bearing must press in and a servo must slot in snugly, that is not good enough.
Calibration measures how your particular printer, with your particular filament, actually behaves, and corrects the slicer settings. The article calls the OrcaSlicer calibration wiki the most useful slicing document for anyone who wants parts that fit.

## The calibration order
| Step | Test print | What it fixes |
|---|---|---|
| 1 temperature | temperature tower | layer bonding, stringing, surface |
| 2 flow rate | flow test patches | over- or under-extrusion, dimensions |
| 3 pressure advance | PA pattern | blobby corners, uneven lines |
| 4 retraction | retraction test | strings between features |
Order matters, because each step depends on the ones before. First temperature: print a tower whose sections are printed at different temperatures, and choose the one with the best surface, strongest layers and least stringing.
Then flow rate, which sets how much plastic comes out. Too much and parts are oversized with rough tops; too little and they are weak with gaps.
Then pressure advance, which compensates for the nozzle pressure lagging behind speed changes, giving sharp corners. And finally retraction, which pulls filament back when travelling, to stop strings.

## The 20 mm cube test
@eq error = measured − designed | e.g. 20.12 mm − 20.00 mm = +0.12 mm
After calibrating, print a twenty millimetre cube and measure it with calipers along X, Y and Z, each a few times. Record the error.
A well-calibrated printer usually lands within about a tenth of a millimetre. If X and Y are consistently oversized, revisit flow rate. If Z is off, check the layer height and first layer.
These measurements are the start of your printer's personal data sheet, which you complete tomorrow with the tolerance gauge.

## Save and name your profile
- Save as a named profile, e.g. "PLA+ tuned 0.2"
- One tuned profile per filament type
- Re-check when you change filament brand
Save the tuned settings as a named profile, for example PLA plus tuned. Make one per filament type you use, because PETG and TPU need different settings.
When you switch to a new brand of filament, run at least the temperature and flow tests again. Different brands behave differently even when they are the same material.
`,
  key: [
    'Calibrate in order: temperature → flow → pressure advance → retraction.',
    'Flow rate errors show up as oversized or weak parts.',
    'Measure a 20 mm cube with calipers to check dimensional accuracy.',
    'Save a named profile per filament; recalibrate on brand changes.'
  ],
  quiz: [
    ['Which calibration step mainly fixes oversized parts with rough top surfaces?', ['Retraction', 'Flow rate', 'Bed levelling only', 'Fan speed'], 1, 'Too much flow over-extrudes.'],
    ['Why calibrate temperature first?', ['It is the quickest', 'Later steps depend on the material flowing correctly at the chosen temperature', 'The slicer requires it', 'It fixes the bed level'], 1, 'Each step builds on the previous one.']
  ]
});

D({
  n: 66, icon: '📏', topic: '3D printing', hours: 2.5, notion: '3f6cdfea8ce281e0ba4cd8132a0d9333', svg: 'printer',
  title: 'Tolerance gauge + print strength',
  goal: 'Know your machine\'s real clearance numbers, and why print orientation changes strength.',
  tasks: [
    'Print the Clearance and Tolerance gauge',
    'Record: smallest gap that slides freely, smallest that press-fits. Save these numbers in your CAD variables',
    'Watch 2 CNC Kitchen videos: one on infill/walls, one on print orientation',
    'Write 2 lines: which way should a bracket be printed so layers are not loaded in peel?',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['Practice task (3D printing)', 'Practice task: print the tolerance gauge, write down your machine\'s actual clearance numbers, then design and print a two-part snap-fit enclosure for your ESP32 that closes without glue. Iterate until it clicks properly. This is the loop that all mechanical design is made of.'],
    ['Month 3 Milestone (this one)', 'State your printer\'s real clearance numbers from measurement rather than guesswork.']
  ],
  links: [
    ['Clearance and Tolerance 3D Printer Gauge (STL)', 'https://www.printables.com/model/57067-clearance-and-tolerance-3d-printer-gauge'],
    ['CNC Kitchen', 'https://www.youtube.com/@CNCKitchen']
  ],
  video: `
## Measurement, not guesswork
@big State your printer's real clearance numbers | a Module 3 milestone
A Module 3 milestone is being able to state your printer's real clearance numbers from measurement rather than guesswork. Today you get them.
The tolerance gauge is a small test print with a set of pins or plugs, each with a slightly different gap around it, for example from zero point one to zero point five millimetres. You find which ones move freely and which ones stick.

## Reading the gauge
| Fit | What it means | Typical clearance |
|---|---|---|
| press fit | parts hold by friction, need force to assemble | ~0.0–0.1 mm |
| snug / sliding fit | moves with light force, no wobble | ~0.15–0.25 mm |
| loose fit | moves freely, some play | ~0.3 mm + |
Print the gauge, then try to free each pin. Record the smallest gap that slides freely, your sliding fit, and the largest gap that still holds firmly, your press fit.
Typical values are around a tenth of a millimetre for press fits and two tenths for sliding fits, but yours will differ, which is the whole point.

## Put them in your CAD variables
\`\`\`text
clear_slide = 0.20   (measured)
clear_press = 0.05   (measured)
hole_m3     = 3.0 + clear_slide * 2
\`\`\`
Now open your CAD tool and store these measured numbers as variables. Every future design that needs a fit uses them. When your printer or filament changes, re-run the gauge and update two numbers.
This is parametric design meeting real-world measurement, and it is how parts start fitting first time.

## Strength depends on orientation
@svg printer | strong along the layers · weak between them
The second half of today is strength. Watch two videos from CNC Kitchen, a channel that tests printed parts to destruction with real measurements.
The key lesson: a printed part is strongest along its layer lines and weakest between them. Layer bonds are where parts fail. A bracket printed standing up, with load pulling the layers apart, can snap at a fraction of the force it would survive if printed lying down.

## Walls versus infill
- Extra walls (perimeters) add more strength than extra infill
- 3–4 walls and 15–25% infill suits most robot parts
- Orient first; then add walls; infill last
CNC Kitchen's testing also shows that adding walls, the solid outer perimeters, usually adds much more strength than adding infill. Three or four walls with fifteen to twenty-five percent infill suits most robot parts.
So the priority order is: orient the part so loads run along the layers, then add walls, and only then increase infill. Write two lines in your log about how you would orient an L-shaped bracket so its layers are not loaded in peel.
`,
  key: [
    'Print a tolerance gauge and record your real press-fit and sliding-fit clearances.',
    'Store measured clearances as CAD variables used by every design.',
    'Prints are weakest between layers: orientation is the biggest strength lever.',
    'Walls add more strength than infill; orient → walls → infill.'
  ],
  quiz: [
    ['What is the tolerance gauge used for?', ['Measuring bed temperature', 'Finding your printer\'s real clearances for press and sliding fits', 'Testing filament colour', 'Calibrating the extruder motor'], 1, 'A Module 3 milestone.'],
    ['To make a printed bracket stronger, what should you change first?', ['Raise infill to 100%', 'Orient it so loads run along the layers', 'Print faster', 'Use thinner walls'], 1, 'Orientation, then walls, then infill.']
  ]
});

D({
  n: 67, icon: '✅', topic: '3D printing', hours: 2.5, notion: '3f6cdfea8ce28159a394e9d6b84e35a7', svg: 'sketch',
  title: 'Print the servo bracket: does it fit?',
  goal: 'Close the CAD → print → test loop on the Day 6 bracket.',
  tasks: [
    'Update the bracket with your measured clearances. Print it',
    'Test fit with the real servo. Note every problem (tight hole, wrong spacing, warp)',
    'Fix in CAD (change variables, not geometry by hand). Reprint until it fits',
    'Photos of v1 vs final for the README',
    'Tick **Practice task done** (CAD bracket). Fill the log, Status, Hours, Confidence'
  ],
  read: [['Practice task (CAD)', 'Then print it and see if it fits, which it probably will not the first time, and that failure is the lesson.']],
  links: [['Protolabs: Design for 3D printing', 'https://www.hubs.com/knowledge-base/design-for-3d-printing/']],
  video: `
## The loop all mechanical design is made of
@big Design → print → test → change → repeat
Today you close the loop on the servo bracket you designed on day six. Update it with yesterday's measured clearances, print it, and try the real servo in it.
The article predicts it probably will not fit the first time, and that the failure is the lesson. Mechanical design is not about getting it right first time. It is about running the loop quickly and learning from each pass.

## Test fit like an engineer
| Check | How | Typical problem |
|---|---|---|
| body pocket | slide the servo in | too tight, or rattles |
| screw holes | insert screws | holes too small, spacing off |
| shaft clearance | spin the horn | rubs the bracket |
| cable exit | route the cable | pinched cable |
| flatness | place on a table | warped base |
Test one feature at a time. Does the servo body slide in, snugly but without force? Do the screws pass through the holes, and do the holes line up with the servo's tabs? Does the output shaft spin freely? Is there a clean path for the cable? Does the bracket sit flat?
Write down every problem precisely: not "too tight", but "pocket about zero point two millimetres too narrow on the long side".

## Fix with variables, not by hand
\`\`\`text
v1: clear = 0.20 → servo pocket too tight
v2: clear = 0.30 → fits; holes still tight
v3: hole_d = 3.4 → screws pass freely ✔
\`\`\`
Now make the changes in CAD, and change variables, not geometry by hand. If the pocket is tight, increase the clearance variable. If the holes are tight, increase the hole diameter variable.
Change one or two things per version, so you know what each change did. Keep a version log like this one. It becomes the story in your README.

## Print only what you are testing
- Testing a hole spacing? Print a thin test plate, not the whole bracket
- Saves hours and filament
- Print the full part once the features are proven
A useful habit: print only the feature you are testing. If you only need to check hole spacing, print a two millimetre plate with the holes, not the full bracket. It takes minutes instead of an hour.
Once each feature is proven, print the full part. When it fits, photograph version one next to the final version for your README, and tick the CAD practice task as done.
`,
  key: [
    'Design → print → test → change → repeat is the core loop.',
    'Test each feature separately and record problems precisely.',
    'Fix by changing variables; one or two changes per version, logged.',
    'Print small test pieces to check features quickly.'
  ],
  quiz: [
    ['The printed servo pocket is slightly too tight. What is the best fix?', ['Sand it by hand each time', 'Increase the clearance variable in CAD and reprint', 'Use a bigger servo', 'Print at a higher temperature'], 1, 'Fix the model so every future print is right.'],
    ['Why print a thin test plate instead of the whole bracket?', ['Plates are stronger', 'It tests one feature in minutes, saving time and filament', 'The slicer requires it', 'It avoids supports only'], 1, 'Fast, cheap iteration.']
  ]
});

D({
  n: 68, icon: '📦', topic: 'CAD', hours: 2.5, notion: '3f6cdfea8ce281c3be2ac71ff51d2a69', svg: 'sketch',
  title: 'Design the snap-fit ESP32 enclosure',
  goal: 'A two-part enclosure for your ESP32 that clicks shut with no glue or screws.',
  tasks: [
    'Measure your ESP32 board (board size, USB port, header height, mounting holes)',
    'Read the snap-fit section of the Protolabs guide (cantilever snap, deflection, orientation)',
    'Model base + lid with cantilever snaps, USB cut-out, standoffs. Use your clearance numbers',
    'Print v1 overnight',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [['Practice task (3D printing)', '…then design and print a two-part snap-fit enclosure for your ESP32 that closes without glue. Iterate until it clicks properly. This is the loop that all mechanical design is made of.']],
  links: [['Protolabs Network, Design for 3D printing (snap-fits)', 'https://www.hubs.com/knowledge-base/design-for-3d-printing/']],
  video: `
## A box that clicks shut
@big Two parts · no glue · no screws · it just clicks
The 3D printing practice task is a two-part enclosure for your ESP32 that snaps shut without glue or screws. It sounds simple, but it exercises everything: measuring a real part, designing for clearances, designing a flexible feature, and choosing print orientation.

## Measure the board
| Feature | Why it matters |
|---|---|
| board length and width | the inner cavity |
| tallest component / header height | the lid height |
| USB port position and size | the cut-out |
| mounting holes | standoffs |
| LEDs and buttons | windows or holes |
Start with calipers. Measure the board's length and width, the height of the tallest component, the USB connector's position and size, and the mounting holes.
Add your measured sliding-fit clearance around the board. Remember the USB plug is bigger than the socket, so the cut-out must clear the plug's housing, not just the port.

## How a cantilever snap works
@eq the arm flexes, the hook passes the catch, the arm springs back | strain must stay within what the plastic can survive
A cantilever snap is a thin, flexible arm with a hook on the end. As the lid closes, the hook rides up a sloped face and the arm bends. Once past the catch, the arm springs back and the hook locks behind it.
The arm must bend enough to clear the catch, but not so much that it breaks. A longer, thinner arm bends more easily. A hook with a sloped entry face closes easily; a square back face makes it hard to open, while a slightly angled back lets it open again.

## Orientation decides whether it breaks
- The snap arm must bend along its layers, not across them
- Arms printed vertically snap off at a layer line
- Design the part so the arm lies flat on the bed
Orientation is critical for snaps. The arm bends repeatedly, so it must bend with its layers running along its length. If the arm is printed standing up, every flex tries to split a layer line, and it snaps off on the first or second closing.
Design the enclosure so the snap arms lie flat or run along the printed layers. Yesterday's lesson on strength, applied to a living part.

## Today's plan
1. Measure the board
2. Model the base: cavity, standoffs, USB cut-out
3. Model the lid with cantilever snaps
4. Use your clearance variables throughout
5. Print v1 overnight
Model the base with a cavity, standoffs for the board and the USB cut-out. Model the lid with two or four cantilever snaps that engage catches in the base. Use your measured clearance variables everywhere.
Print version one overnight. Tomorrow you test it, and almost certainly change something.
`,
  key: [
    'Measure the board, tallest part, USB plug housing and mounting holes.',
    'A cantilever snap bends, passes the catch, and springs back to lock.',
    'Longer, thinner arms flex more; entry and back angles set close/open force.',
    'Snap arms must flex along the layers, or they break at a layer line.'
  ],
  quiz: [
    ['Why do snap arms printed standing upright often break?', ['Too much infill', 'Each flex tries to split a layer line', 'They are too long', 'PLA cannot flex'], 1, 'Orient arms so they bend along the layers.'],
    ['The USB cut-out must be sized for what?', ['Only the socket on the board', 'The plug housing of the cable', 'The ESP32 chip', 'The antenna'], 1, 'The plug is bigger than the socket.']
  ]
});

D({
  n: 69, icon: '🔄', topic: '3D printing', hours: 2.5, notion: '3f6cdfea8ce281d3a4c8da27841bee45', svg: 'printer',
  title: 'Iterate the enclosure until it clicks',
  goal: 'An enclosure that clicks properly, documented as a design iteration story.',
  tasks: [
    'Test v1: too tight, too loose, snaps broke? Note why (layer direction? thickness?)',
    'Change one variable at a time and reprint',
    'Stop when it clicks shut and opens again without breaking',
    'README for `month-3/esp32-enclosure/`: photos of every version, what changed, what broke',
    'Tick **Practice task done**. Fill the log, Status, Hours, Confidence'
  ],
  read: [['Month 3 Milestone (this one)', 'Design a part specifically for FDM, accounting for orientation, overhangs and layer adhesion.']],
  links: [['CNC Kitchen', 'https://www.youtube.com/@CNCKitchen']],
  video: `
## Test version one
| Symptom | Likely cause | Change |
|---|---|---|
| will not close | hook too deep, arm too stiff | shallower hook, longer or thinner arm |
| closes but falls open | hook too shallow | deeper hook, steeper back face |
| snap broke | arm too thick, or printed across layers | reorient, thinner arm, fillet the root |
| board rattles | too much clearance | reduce cavity clearance |
| USB plug blocked | cut-out too small | enlarge cut-out |
Test version one carefully and diagnose each problem. If it will not close, the hook is too deep or the arm too stiff. If it closes but pops open, the hook is too shallow. If a snap broke, look at where: if it snapped at a layer line, it was printed in the wrong orientation; if it snapped at the root, add a fillet there to spread the stress.

## One variable at a time
@big Change one thing · reprint · observe | otherwise you never know what fixed it
Now iterate, changing one variable at a time. It is tempting to change three things at once to save a print, but then if it improves, you do not know which change helped, and if it gets worse, you do not know which change hurt.
This is the same discipline as tuning PID gains one at a time in Module 2. Engineering is controlled experiments.

## When to stop
- Clicks shut with a satisfying snap
- Opens again without breaking
- Survives ten open-close cycles
- Board held firmly, USB accessible
Stop when the lid clicks shut, opens again without breaking, and survives about ten open-and-close cycles. The board should be held firmly, with the USB port fully accessible.
Count your versions. Three to five is normal. Professional product designers iterate snap-fits too.

## Tell the iteration story
\`\`\`markdown
| Version | Change | Result |
|---|---|---|
| v1 | first design, arm 1.2 mm | snapped at a layer line |
| v2 | rotated 90°, arms flat on bed | closes, too loose |
| v3 | hook depth 0.6 → 0.9 mm | clicks, holds, opens ✔ |
\`\`\`
Write the README as an iteration story: a photo of every version side by side, a table of what changed in each and what happened, and what broke and how you fixed it.
This README hits a Module 3 milestone directly: designing a part specifically for FDM, accounting for orientation, overhangs and layer adhesion. Tick the practice task as done.

## The loop you will use forever
@big Measure → design → make → test → learn
Step back and notice what you just did. You measured a real object, designed around it with measured clearances, made it, tested it, and learned from each failure until it worked.
That loop is not specific to enclosures. It is how you will design gripper fingers next section, robot parts in Module 4, and almost everything mechanical for the rest of your career. The faster you can run it, the better your designs become.
`,
  key: [
    'Diagnose each failure: too stiff, too shallow, wrong orientation, stress at the root.',
    'Change one variable per version, like tuning one gain at a time.',
    'Done = clicks shut, reopens, survives repeated cycles.',
    'Document every version with what changed and what happened.'
  ],
  quiz: [
    ['A snap arm broke exactly along a layer line. What is the most likely fix?', ['More infill', 'Reorient the part so the arm flexes along its layers', 'A hotter nozzle', 'A deeper hook'], 1, 'Layer lines are the weak direction.'],
    ['Why change only one variable per enclosure version?', ['It saves filament', 'So you know which change caused the result', 'The slicer only allows one', 'It prints faster'], 1, 'Controlled experiments.']
  ]
});

D({
  n: 70, icon: '🔁', topic: 'Review', hours: 2, notion: '3f6cdfea8ce281d19c7cd5b302223539', svg: 'printer',
  title: 'Week 2 review + catch-up',
  goal: 'Finish Week 2 and be able to justify any material choice.',
  tasks: [
    'Finish unfinished tasks from M3 Days 8–13',
    'Quiz yourself: for a chassis plate, a gripper finger, a gear, a part near a hot motor — which filament and why?',
    'If printing SO-101 parts yourself, start the big prints now (they take many hours)',
    'Update Confidence on Days 8–13'
  ],
  read: [['Month 3 Milestone (this one)', 'Choose PLA, PETG, ABS or TPU for a given part and justify it.']],
  links: [['SO-ARM100/101 repo (STLs)', 'https://github.com/TheRobotStudio/SO-ARM100']],
  video: `
## Justify the material
| Part | Material | Why |
|---|---|---|
| chassis plate | PETG | tough, survives drops, good layer adhesion |
| gripper finger | TPU | flexible, conforms to objects, grippy |
| gear | nylon (ordered) or PETG | tough, low friction, wear resistant |
| part near a hot motor | ABS / ASA | does not soften like PLA |
| quick prototype jig | PLA | stiff, fast, accurate, cheap |
A Module 3 milestone is choosing PLA, PETG, ABS or TPU for a given part and justifying it. Pause the video and decide for each part in this table before reading the answers.
A chassis plate wants toughness, so PETG. A gripper finger wants flexibility and grip, so TPU. A gear wants toughness and low friction, so nylon, ideally ordered, or PETG. A part near a hot motor needs heat resistance, so ABS or ASA. And a quick jig is perfect in PLA.

## Start the long prints
@big SO-101 parts ≈ 1 kg of PLA+ · many hours of printing
If you are printing the SO-101 arm's parts yourself, start now. The full set is about a kilogram of PLA plus, at fifteen percent infill and zero point two millimetre layers, and it takes many hours of printing across several days.
Use your tuned PLA plus profile, and check the SO-ARM100 repository for the recommended settings and orientations for each part.

## Section 2 recap
- Calibrated printer, measured clearances in CAD variables
- Orientation and walls matter more than infill
- The design-print-test loop, run on a bracket and a snap-fit
This section turned you into someone who can make parts that fit. Your printer is calibrated, your clearances are measured and stored as variables, you understand orientation and strength, and you have run the design-print-test loop on two real parts.
Next section: why robots are mechanically hard. Gears, torque, backlash, and the start of the SO-101 arm build.
`,
  key: [
    'Match material to job: PETG chassis, TPU fingers, nylon gears, ABS/ASA near heat, PLA prototypes.',
    'Start long SO-101 prints early with your tuned PLA+ profile.',
    'You can now make parts that fit, by measurement and iteration.'
  ],
  quiz: [
    ['Which material suits a compliant gripper finger?', ['PLA', 'TPU', 'ABS', 'Carbon-fibre PLA'], 1, 'Flexible and grippy.'],
    ['Roughly how much filament does an SO-101 arm need?', ['100 g', 'About 1 kg of PLA+', '5 kg', '250 g of TPU'], 1, 'From the article\'s economics section.']
  ]
});
// ───────────── Section 3 · Mechanics and the SO-101 arm ─────────────
D({
  n: 71, icon: '⚙️', topic: 'Mechanics', hours: 2.5, notion: '3f6cdfea8ce2815e9bcffa118897da4e', svg: 'gears',
  title: 'Gears, torque, backlash: why robots are hard',
  goal: 'Reason about gear ratio, torque, backlash and drive types before designing a reducer.',
  tasks: [
    'Read the transmissions section in the reading lesson',
    'Calculate: motor 0.1 N·m at 3000 rpm through 20:1 → output torque and speed (ignore losses, then assume 80% efficiency)',
    'Feel backlash: rock the output of your Month 2 gearmotor and a hobby servo by hand. Compare',
    'Make a table: belt vs gear vs direct drive → backlash, cost, stiffness, noise',
    'Write why a cheap servo\'s plastic gears fail first on an arm',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['3. Actuators, transmissions and why robots are hard', 'Understanding gear reduction, backlash and torque density is what separates a robot that works in a video from a robot that works repeatedly.'],
    ['What to focus on', 'Gear ratios and the trade between speed and torque.\nBacklash, and why it destroys position accuracy in a way software cannot fully fix.\nBearing selection and preload.\nBelt versus gear versus direct drive.\nWhy a cheap servo\'s plastic gearset is the first thing to fail on any arm.']
  ],
  links: [
    ['OpenCycloid: 3D-printed open-source robotic actuator (Instructables)', 'https://www.instructables.com/OpenCycloid-3D-printed-Open-Source-Robotic-Actuato/'],
    ['CNC Kitchen', 'https://www.youtube.com/@CNCKitchen']
  ],
  video: `
## Works in a video, or works repeatedly?
@big Gear reduction, backlash and torque density separate the two
The article puts it sharply: understanding gear reduction, backlash and torque density is what separates a robot that works in a video from a robot that works repeatedly.
Electric motors are good at spinning fast with little torque. Robot joints need the opposite: slow, strong, precise motion. Transmissions bridge that gap, and they bring their own problems.

## Gear ratio: trading speed for torque
@svg gears | 2:1 → twice the torque, half the speed
A gear ratio trades speed for torque. Through a twenty-to-one reduction, the output turns twenty times slower than the motor, and delivers twenty times the torque, minus friction losses.
Today's calculation: a motor giving zero point one newton metres at three thousand rpm, through twenty to one. Ideally, the output gives two newton metres at one hundred and fifty rpm. With eighty percent efficiency, it is one point six newton metres. Losses matter: big multi-stage gearboxes can lose a third of the power.

## Torque at a robot joint
@eq τ = F × r | 1 kg at 30 cm ≈ 9.81 N × 0.3 m ≈ 2.9 N·m
Why do joints need so much torque? Because torque is force times distance. Holding one kilogram thirty centimetres from the shoulder needs about two point nine newton metres, before you even count the weight of the arm itself.
That is why shoulder joints need the strongest motors and the highest reductions, and why lightweight arms matter so much.

## Backlash: the slop software cannot fix
- Gaps between gear teeth let the output move without the input
- On reversal, the motor turns but the joint does not — yet
- Position errors and limit cycles in control loops
Backlash is the small gap between meshing gear teeth. When the motor reverses, it turns a little before the teeth engage on the other side, and during that moment the output does not move. You can feel it: rock the output of a gearmotor by hand and it wiggles freely by a few degrees.
The article stresses that backlash destroys position accuracy in a way software cannot fully fix. The encoder is usually on the motor, before the gears, so it cannot see the slop. And a controller fighting backlash tends to oscillate. Remember the balancer: slop made it harder to catch.

## Drive types
| Drive | Backlash | Stiffness | Cost | Noise |
|---|---|---|---|---|
| spur gears | moderate | high | low | some whine |
| planetary | low–moderate | high, compact | medium | moderate |
| cycloidal | very low | very high | medium | quiet |
| belt | very low, but stretches | lower | low | quiet |
| direct drive | none | depends on motor | high (big motors) | quiet |
There are several ways to transmit power. Simple spur gears are cheap and stiff but have backlash. Planetary gears pack a big ratio into a compact package. Cycloidal drives have very low backlash and handle shock loads well. Belts are quiet with almost no backlash, but they stretch. Direct drive has no backlash at all, but needs large, expensive motors.
Finally, cheap hobby servos: their tiny plastic gears are the first thing to fail on any arm, because the shoulder joint sees large, sustained torque, and plastic teeth strip or wear into slop. That is one reason the SO-101 uses better smart servos.
`,
  key: [
    'A reduction of N:1 multiplies torque by N and divides speed by N (minus losses).',
    'Joint torque τ = F × r grows fast with reach and payload.',
    'Backlash is slop between teeth; encoders before the gears cannot see it.',
    'Spur, planetary, cycloidal, belt and direct drive trade backlash, stiffness and cost.'
  ],
  quiz: [
    ['A motor gives 0.1 N·m at 3000 rpm through an ideal 20:1 reduction. Output?', ['0.005 N·m at 60 000 rpm', '2 N·m at 150 rpm', '20 N·m at 3000 rpm', '0.1 N·m at 150 rpm'], 1, '×20 torque, ÷20 speed.'],
    ['Why can\'t software fully fix backlash?', ['It is too fast', 'The joint moves without the motor, often unseen by a motor-side encoder', 'PID cannot run on arms', 'It only affects belts'], 1, 'The slop sits between the encoder and the joint.']
  ]
});

D({
  n: 72, icon: '🌀', topic: 'Mechanics', hours: 3, notion: '3f6cdfea8ce281b988cfdfaa1d217d19', svg: 'gears',
  title: 'Design a planetary or cycloidal reducer',
  goal: 'Design v1 of a printed reducer for a NEMA17 or hobby motor. It will be bad — that is expected.',
  tasks: [
    'Pick planetary (easier) or cycloidal (lower backlash, harder). Study the OpenCycloid reference build',
    'Planetary rule: ring teeth = sun teeth + 2 × planet teeth; ratio = 1 + ring/sun',
    'Model it parametrically (module, tooth counts, clearance from your gauge numbers). Use your CAD tool\'s gear generator or a plugin',
    'Plan bearings and how the output shaft is supported',
    'Start the print',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['Practice task (Transmissions)', 'Practice task: design and print a simple planetary or cycloidal reducer for a NEMA17 stepper or a hobby motor, and accept that the first one will be bad. Measure the backlash by holding the output and rocking it, then redesign to reduce it. Reference builds are on Instructables and Hackaday if you want a starting geometry.']
  ],
  links: [['OpenCycloid (Instructables)', 'https://www.instructables.com/OpenCycloid-3D-printed-Open-Source-Robotic-Actuato/']],
  video: `
## Build your own gearbox
@big The first one will be bad — and that is the point
The transmission practice task is to design and print your own reducer, a planetary or a cycloidal gearbox, for a NEMA 17 stepper or a hobby motor. The article says to accept that the first one will be bad. You will measure its backlash, then redesign to reduce it.
Designing a gearbox teaches more about real mechanics than any amount of reading.

## Planetary gears
| Part | Role |
|---|---|
| sun | central gear, driven by the motor |
| planets | 3 or more gears orbiting the sun |
| ring | internal-toothed outer gear, held fixed |
| carrier | holds the planets; the output |
A planetary gearbox has a sun gear in the middle, driven by the motor. Three or more planet gears mesh around it, and also mesh with a fixed ring gear that has teeth on the inside. The planets are held by a carrier, and as they orbit, the carrier turns slowly. That carrier is the output.
Sharing the load across several planets makes planetary gearboxes strong and compact, which is why they are everywhere in robotics.

## The planetary rules
@eq ring = sun + 2 × planet    ·    ratio = 1 + ring ÷ sun | e.g. sun 12, planet 18 → ring 48 → ratio 5:1
Two rules govern the design. First, the tooth counts must fit together: the ring's teeth equal the sun's teeth plus twice the planet's teeth. Second, with the ring fixed, the ratio is one plus ring teeth divided by sun teeth.
For example, a twelve-tooth sun with eighteen-tooth planets needs a forty-eight-tooth ring, and gives a five to one reduction. For equally spaced planets, the sun plus ring teeth must also divide evenly by the number of planets.

## Cycloidal, briefly
- An eccentric cam wobbles a lobed disc inside a ring of pins
- One full motor turn moves the disc by one lobe
- Very low backlash, high stiffness, shock tolerant — but harder to design
A cycloidal drive works differently. An eccentric cam on the motor shaft makes a lobed disc wobble inside a ring of pins. Each full turn of the motor advances the disc by just one lobe, giving a high ratio in a single stage.
Cycloidal drives have very low backlash and handle shocks well, which is why serious robot arms use them, but the geometry is harder. The OpenCycloid project is a great reference if you want to try.

## Design it parametrically
\`\`\`text
module      = 1.0 mm      (tooth size)
z_sun = 12   z_planet = 18   z_ring = z_sun + 2*z_planet
backlash_clear = clear_slide   (from your tolerance gauge)
bearing: 608 (8 × 22 × 7 mm) for the output carrier
\`\`\`
Use your CAD tool's gear generator or a plugin, and drive everything with variables: the module, which sets tooth size, the tooth counts, and a clearance taken from your tolerance gauge.
Plan the bearings too. The output carrier must be supported by a proper bearing, like a six-oh-eight skate bearing, or it will wobble, adding play on top of the gear backlash. Then start the print. Tomorrow you assemble it and measure.
`,
  key: [
    'Planetary: sun (input), planets, fixed ring, carrier (output).',
    'Ring teeth = sun + 2 × planet; ratio = 1 + ring ÷ sun (ring fixed).',
    'Cycloidal drives: very low backlash and stiff, but harder to design.',
    'Parametric tooth counts and clearances; support the output with real bearings.'
  ],
  quiz: [
    ['A planetary gearbox has a 12-tooth sun and 18-tooth planets. How many teeth must the ring have?', ['30', '36', '48', '60'], 2, 'ring = 12 + 2 × 18 = 48.'],
    ['With the ring fixed, what is that gearbox\'s ratio?', ['2:1', '4:1', '5:1', '6:1'], 2, '1 + 48 ÷ 12 = 5.']
  ]
});

D({
  n: 73, icon: '📐', topic: 'Mechanics', hours: 2.5, notion: '3f6cdfea8ce281aca300ed42e5cd7b33', svg: 'gears',
  title: 'Reducer v1: assemble and measure backlash',
  goal: 'A number for your backlash, and a list of why it is that big.',
  tasks: [
    'Assemble v1. Drive it with the motor (Month 2 driver)',
    'Measure backlash: lock the input, rock the output, measure the angle (attach a long pointer and measure arc length, or use the encoder)',
    'List causes: tooth clearance, bearing play, flex, layer lines',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [['Month 3 Milestone (this one)', 'Explain what backlash is and demonstrate it on something you built.']],
  links: [['OpenCycloid (Instructables)', 'https://www.instructables.com/OpenCycloid-3D-printed-Open-Source-Robotic-Actuato/']],
  video: `
## Assemble and run it
@svg gears | does it turn smoothly? does it bind?
Assemble version one of your reducer and drive it with your Module 2 motor driver. First, just watch and listen. Does it turn smoothly, or does it bind at certain points? Does it click, grind or whine?
Binding at one spot each revolution usually means a gear is slightly off-centre or a tooth has a printing blob. Grinding often means too little clearance. Note everything.

## Measure the backlash
@eq backlash (degrees) = arc length ÷ (2π × pointer length) × 360 | e.g. 5 mm at 200 mm → 1.4°
Now measure the backlash, which is a Module 3 milestone. Lock the input so the motor cannot turn, for example by holding the motor shaft or powering a stepper so it holds position. Then gently rock the output back and forth.
To turn the wiggle into a number, attach a long pointer, say twenty centimetres, to the output, and measure how far its tip moves. Divide that arc length by the circumference of a circle with that radius, and multiply by three hundred and sixty. Five millimetres at two hundred millimetres is about one point four degrees.
If your motor has an encoder on the output side, you can read the angle directly instead.

## Why is it so big?
| Cause | How to spot it |
|---|---|
| tooth clearance too large | teeth visibly loose in mesh |
| carrier or planet pins loose | planets wobble on their pins |
| bearing play | output shaft tilts or slides |
| structural flex | housing bends when loaded |
| print inaccuracy | blobs, elephant's foot, layer steps on teeth |
Now find out why. Backlash is the sum of every gap and every flex between input and output. Check each candidate.
Are the teeth loose in mesh? Do the planets wobble on their pins? Does the output shaft tilt in its bearing? Does the housing flex when you twist the output hard? And look closely at the printed teeth: blobs, a squished first layer called elephant's foot, or stepped layers all change the effective tooth shape.

## Demonstrate it
- Film yourself rocking the output while the input is locked
- Say the backlash number and the top two causes
- This video is the milestone evidence
Film a short clip of you rocking the locked output, say your measured number, and name the top two causes you found. That clip is the evidence for the milestone: explaining what backlash is and demonstrating it on something you built.
Tomorrow you fix the biggest causes and measure again.
`,
  key: [
    'Run the reducer first: listen and watch for binding or grinding.',
    'Measure backlash by locking the input and rocking the output; convert pointer arc to degrees.',
    'Backlash = sum of tooth clearance, loose pins, bearing play, flex and print errors.',
    'Film the demonstration as milestone evidence.'
  ],
  quiz: [
    ['How do you measure gearbox backlash?', ['Run it at full speed', 'Lock the input and rock the output, measuring the free angle', 'Measure motor current', 'Count the teeth'], 1, 'The free movement with the input locked is the backlash.'],
    ['A 200 mm pointer tip moves 5 mm. Roughly what is the backlash?', ['0.1°', '1.4°', '5°', '14°'], 1, '5 ÷ (2π × 200) × 360 ≈ 1.4°.']
  ]
});

D({
  n: 74, icon: '🔧', topic: 'Mechanics', hours: 3, notion: '3f6cdfea8ce28159bd30c1d45f0d8e4d', svg: 'gears',
  title: 'Reducer v2: redesign to cut backlash',
  goal: 'A measurable improvement from v1 to v2, written up as an engineering story.',
  tasks: [
    'Change one or two causes (tighter clearance, better bearing seat, stiffer carrier). Reprint',
    'Measure backlash again. Compare v1 vs v2',
    'README for `month-3/reducer/`: CAD screenshots, both numbers, video of rocking the output, what broke',
    'Tick **Practice task done**. Fill the log, Status, Hours, Confidence'
  ],
  read: [['Practice task (Transmissions)', 'Measure the backlash by holding the output and rocking it, then redesign to reduce it.']],
  links: [['CNC Kitchen', 'https://www.youtube.com/@CNCKitchen']],
  video: `
## Attack the biggest cause first
@big Measure → fix the biggest contributor → measure again
Yesterday you measured your backlash and listed its causes. Today you redesign to reduce it, and prove the improvement with a second measurement.
Attack the biggest contributor first. If the planets wobbled on their pins, fixing pin fit will help more than fine-tuning tooth clearance. Change one or two causes per version, as you did with the enclosure, so you know what worked.

## Typical fixes
| Cause | Fix |
|---|---|
| tooth clearance | reduce the clearance variable a little; reprint |
| loose planet pins | metal pins (screws or dowels), tighter holes |
| bearing play | proper bearing seats; press fits from your gauge |
| housing flex | thicker walls, ribs, a second bearing |
| tooth quality | slower outer walls, tuned flow, chamfer the first layer |
Here are the usual fixes. Tighten the tooth clearance slightly, but not so much that it binds. Replace printed planet pins with metal screws or dowels in snug holes. Give the output a proper bearing seat with a press fit from your tolerance gauge. Stiffen the housing with thicker walls or ribs.
And improve tooth quality: slow down the outer walls, use your tuned flow rate, and add a small chamfer at the bottom to hide elephant's foot.

## Preload: removing play on purpose
- Bearings and gears can be lightly squeezed to remove play
- Too much preload → friction, heat, wear
- The art is "just enough"
A concept worth knowing: preload. Bearings and even gear meshes can be lightly squeezed together so there is no free play at all. Professional actuators use spring-loaded or split gears to do this.
Too much preload adds friction, heat and wear, so it is a balance. Even trying it on your printed reducer, for example by tightening the bearing stack slightly, teaches you a lot.

## Measure v2 and tell the story
\`\`\`markdown
| Version | Change | Backlash |
|---|---|---|
| v1 | first print, printed pins | 3.2° |
| v2 | M3 screws as planet pins, 608 bearing seat | 1.1° |
\`\`\`
Measure version two exactly as before: same pointer, same method. Compare the numbers.
Then write the README as an engineering story: CAD screenshots, the backlash table across versions, a video of rocking the output, and what broke and how you fixed it.
A measured improvement, with reasons, is one of the most convincing things you can show. It proves you can diagnose a mechanical problem and fix it, not just print parts. Tick the practice task as done.

## Why this matters for the arm
- The SO-101's servos have their own internal gearboxes
- Their backlash limits how precisely the arm can place its gripper
- Now you know what to look for when a joint feels sloppy
This lesson connects directly to what comes next. The SO-101 arm you start building tomorrow uses servos with small internal gearboxes, and their backlash limits how precisely the arm can position its gripper.
When a joint feels sloppy later, you will know exactly what you are feeling, how to measure it, and which causes to check first.
`,
  key: [
    'Fix the largest backlash contributor first, one or two changes per version.',
    'Typical fixes: tighter tooth clearance, metal pins, proper bearing seats, stiffer housing.',
    'Preload removes play but adds friction if overdone.',
    'Prove the improvement with the same measurement method, documented in a table.'
  ],
  quiz: [
    ['Planets wobble on printed pins. Which fix likely reduces backlash most?', ['More infill in the ring', 'Metal pins in snug holes', 'Faster printing', 'A different filament colour'], 1, 'Pin play adds directly to output play.'],
    ['What is preload?', ['Loading the printer', 'Lightly squeezing bearings or gears to remove free play', 'Pre-heating the bed', 'Adding weight to the arm'], 1, 'Too much adds friction and wear.']
  ]
});

D({
  n: 75, icon: '🦾', topic: 'Robot arm', hours: 2.5, notion: '3f6cdfea8ce2812086acdb5a3bb8904e', svg: 'arm',
  title: 'SO-101: read the repo, plan the build',
  goal: 'Understand the SO-101, check every part is here, and plan the assembly.',
  tasks: [
    'Read the SO-101 section in the reading lesson and the SO-ARM100 repo README',
    'Unbox the kit. Check the BOM: 12 servos (6 per arm), 2 control boards, power supplies, cables, screws',
    'Check printed parts (yours or bought). Clean supports. Test-fit one servo in its housing',
    'Note which servos are for the leader arm (different gear ratios in some kits — check the guide)',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['4. Build a real robot arm', 'This is the capstone of the month, and it is the single best hardware purchase in this entire roadmap.\n\nThe SO-101 is an open-source 5-DOF arm plus gripper from TheRobotStudio and Hugging Face, designed to be built as a leader and follower pair so you can hand-guide one and have the other mirror it.\n\nThat teleoperation setup is what lets you record demonstrations, which is what month six is built on.\n\nOfficial bill of materials, verified in the repo: $229.88 US for a leader and follower pair, $121.94 for a single follower arm, excluding 3D printing.']
  ],
  links: [
    ['SO-ARM100 repo', 'https://github.com/TheRobotStudio/SO-ARM100'],
    ['LeRobot SO-101 setup guide', 'https://huggingface.co/docs/lerobot/so101']
  ],
  video: `
## The best hardware purchase in the roadmap
@svg arm | 5 joints + a gripper, built as a leader and follower pair
The article calls the SO-101 the single best hardware purchase in the entire roadmap. It is an open-source arm from TheRobotStudio and Hugging Face, with five joints plus a gripper.
It is designed to be built as a pair: a leader arm that you move by hand, and a follower arm that mirrors it. That teleoperation setup is what lets you record demonstrations, and recording demonstrations is what Module 6, robot learning, is built on. Modules 4 to 6 all use this arm in some way.

## Leader and follower
| Arm | Role | Moved by |
|---|---|---|
| leader | you hand-guide it; it reads joint angles | your hand |
| follower | copies the leader's angles in real time | its servos |
The leader arm is passive. You grab its handle and move it, and its servos act purely as sensors, reporting their angles. The follower arm receives those angles and drives its own servos to match, in real time.
So you can perform a task, like picking up a cube, with your own hand, and the follower repeats your motion. Recording those motions, along with camera images, creates a training dataset for a robot learning policy.

## The servos: smart serial bus servos
@big Daisy-chained · position, velocity and current feedback · 12-bit magnetic encoder
The SO-101 uses FeeTech STS3215 smart serial bus servos, the type you met in Module 2. They are daisy-chained on one data cable, each with its own ID, and each reports its position from a twelve-bit magnetic encoder, as well as velocity and current.
That feedback is a huge step up from hobby servos. The arm always knows exactly where every joint is, which is essential for both teleoperation and learning.

## Inventory day
1. Read the SO-ARM100 README and the LeRobot SO-101 guide
2. Check the bill of materials: 12 servos, 2 controller boards, PSUs, cables, screws
3. Clean supports off the printed parts
4. Test-fit one servo in its housing
5. Identify leader vs follower servos
Today is careful preparation. Read the repository README and the LeRobot setup guide end to end before touching a screwdriver.
Check the bill of materials against what arrived: twelve servos, six per arm, two controller boards, power supplies, cables and screws. Clean any support material from the printed parts, and test-fit one servo in its housing.
And check one detail in the guide: in some kits, the leader arm's servos have different gear ratios from the follower's, so they are easy to move by hand. Mixing them up is a common mistake, so label them now.
`,
  key: [
    'SO-101: open-source 5-DOF arm + gripper, built as a leader/follower pair.',
    'The leader is hand-guided and reads angles; the follower mirrors it — enabling demonstration recording.',
    'STS3215 smart servos: daisy-chained IDs with position, velocity and current feedback.',
    'Read the guide fully, check the BOM, and label leader vs follower servos.'
  ],
  quiz: [
    ['What is the leader arm used for?', ['It lifts heavy objects', 'You move it by hand and the follower mirrors it', 'It holds the camera', 'It is a spare'], 1, 'Teleoperation for recording demonstrations.'],
    ['Why does the SO-101\'s leader/follower design matter for Module 6?', ['It is cheaper', 'It lets you record demonstrations to train robot-learning policies', 'It removes the need for servos', 'It runs ROS 1'], 1, 'Month six is built on recorded demonstrations.']
  ]
});

D({
  n: 76, icon: '🔩', topic: 'Robot arm', hours: 3, notion: '3f6cdfea8ce281379f49dfe659f6adf5', svg: 'arm',
  title: 'SO-101: servo setup (IDs) + start follower assembly',
  goal: 'Every servo has its ID set, and the follower arm assembly has started.',
  tasks: [
    'Install LeRobot in a fresh Python env (follow the docs install page)',
    'Find the USB port of each control board (the guide has a find-port script)',
    'Set up motor IDs and baud rate one servo at a time, exactly as the SO-101 guide says. Label each servo',
    'Assemble the follower base and first 2 joints. Follow the guide\'s joint order',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [['Smart serial bus servo', 'Smart serial bus servo: daisy-chained, with position, velocity and current feedback and a 12-bit magnetic encoder. This is what modern low-cost arms use.']],
  links: [
    ['LeRobot SO-101 setup guide', 'https://huggingface.co/docs/lerobot/so101'],
    ['LeRobot documentation', 'https://huggingface.co/docs/lerobot/index'],
    ['FeeTech STS3215 servo', 'https://www.robotshop.com/products/feetech-12v-30kgcm-magnetic-encoding-servo-sts3215']
  ],
  video: `
## Software first: LeRobot
\`\`\`bash
python3 -m venv ~/lerobot-env && source ~/lerobot-env/bin/activate
git clone https://github.com/huggingface/lerobot.git && cd lerobot
pip install -e ".[feetech]"
\`\`\`
The SO-101 is set up with LeRobot, Hugging Face's Python library for real-world robot learning. You will use it again in Module 6 to record demonstrations and train policies.
Install it in a fresh virtual environment, exactly as the documentation's install page says, including the extra for FeeTech servos. Follow the official docs rather than this summary if they differ, because the library evolves quickly.

## Find the ports
@big One USB port per controller board: leader and follower
Each arm has its own controller board, which connects by USB. The guide includes a small script that finds which port belongs to which board: it asks you to unplug one board and spots which port disappeared.
Write both port names down, and label the cables. You will type them many times.

## Why every servo needs an ID
| Joint | ID |
|---|---|
| shoulder pan | 1 |
| shoulder lift | 2 |
| elbow flex | 3 |
| wrist flex | 4 |
| wrist roll | 5 |
| gripper | 6 |
All six servos on an arm share one data cable. The controller addresses each one by an ID number, just like I2C addresses in Module 2. New servos all ship with the same default ID, so if you plugged them all in at once, they would all answer at once and nothing would work.
So you set the IDs one servo at a time: connect a single servo, run the setup command, give it its ID and baud rate, unplug it, connect the next. The guide walks through it joint by joint.

## Label everything
- Write each servo's ID on it with a marker or tape
- Keep leader and follower servos apart
- A mislabelled servo becomes a mystery bug later
As you set each ID, label the servo immediately with tape or a marker. Keep the leader's servos separate from the follower's. It takes a minute and prevents the classic mistake of installing servo four where servo three belongs, which leads to a very confusing calibration later.

## Start the follower
1. Base and shoulder pan servo
2. Shoulder lift joint
3. Follow the guide's order exactly
4. Do not over-tighten screws into plastic
Then start assembling the follower arm: the base, and the first two joints, following the guide's order precisely. Order matters, because some screws become unreachable once later parts are on.
Do not over-tighten screws into printed plastic: snug is enough, or the threads strip. Tomorrow is a review day, and then you finish the follower and build the leader.
`,
  key: [
    'Install LeRobot (with the FeeTech extra) in a fresh venv, following the current docs.',
    'Find each controller board\'s USB port and label the cables.',
    'Set servo IDs one at a time (all ship with the same default ID).',
    'Label servos immediately; follow the assembly order; do not over-tighten plastic.'
  ],
  quiz: [
    ['Why must SO-101 servo IDs be set one servo at a time?', ['The bus is slow', 'New servos share the same default ID, so several connected at once would conflict', 'It saves power', 'The guide is short'], 1, 'Like duplicate I2C addresses.'],
    ['Which library is used to set up and later teleoperate the SO-101?', ['ROS 1', 'LeRobot', 'OpenCV', 'Arduino Servo'], 1, 'Hugging Face\'s robot-learning library.']
  ]
});

D({
  n: 77, icon: '🔁', topic: 'Review', hours: 2, notion: '3f6cdfea8ce281688f95c2e0c04c4fd6', svg: 'gears',
  title: 'Week 3 review + catch-up',
  goal: 'Catch up on the reducer and arm assembly.',
  tasks: [
    'Finish unfinished tasks from M3 Days 15–20',
    'Explain backlash out loud using your reducer',
    'Look at the Module 4 gear list now — you order on Day 22 (mainly: Ubuntu 24.04 machine ready, optional lidar / Pi)',
    'Update Confidence on Days 15–20'
  ],
  links: [['LeRobot SO-101 setup guide', 'https://huggingface.co/docs/lerobot/so101']],
  video: `
## Explain backlash with your own reducer
@big Pick it up · lock the input · rock the output · explain
Review day. Pick up your reducer and explain backlash out loud: what it is, how you measured it, what caused it, and how version two reduced it. Use your real numbers.
If you can explain why backlash hurts position accuracy and why a motor-side encoder cannot see it, you understand one of the deepest practical problems in robot arms.

## Catch up on the arm
- All 12 servo IDs set and labelled?
- Follower base and first joints assembled?
- Printed parts all ready for the rest?
Use the rest of the time to catch up on the arm. Check all twelve servo IDs are set and labelled, the follower's base and first joints are assembled, and the remaining printed parts are ready. Next section you finish both arms and teleoperate.

## Look ahead to Module 4
| Module 4 needs | Check now |
|---|---|
| Ubuntu 24.04 machine (dual-boot preferred) | installed and updating? |
| 50 GB+ free disk | space available? |
| optional: Raspberry Pi + lidar | only for real-robot SLAM |
| optional: Udemy ROS 2 courses | on sale? |
Day twenty-two is coming, and Module 4's gear is mostly software. The key requirement is a machine running Ubuntu 24.04 for ROS 2 Jazzy, ideally dual-booted, with fifty gigabytes or more free.
Hardware like a Raspberry Pi and a lidar is optional, only for doing SLAM on a real robot; the whole module can be done in simulation. Check the Gear tab today.
`,
  key: [
    'Explain backlash using your own measured reducer.',
    'Have all servo IDs set and the follower started before Section 4.',
    'Module 4 needs Ubuntu 24.04 with 50 GB+ free; lidar/Pi are optional.'
  ],
  quiz: [
    ['What is the main requirement for Module 4?', ['A 3D printer', 'A machine running Ubuntu 24.04 for ROS 2 Jazzy', 'A LiPo battery', 'A second SO-101'], 1, 'Hardware like lidar is optional.'],
    ['Why can\'t a motor-side encoder detect gearbox backlash?', ['It is too slow', 'The slop is between the motor and the joint, after the encoder', 'Encoders only measure speed', 'Backlash is electrical'], 1, 'The encoder sees the motor, not the joint.']
  ]
});
// ───────────── Section 4 · Finish the arm and design grippers ─────────────
D({
  n: 78, icon: '🦾', topic: 'Robot arm', hours: 3, notion: '3f6cdfea8ce2819bbce7e52f3cac789d', svg: 'arm',
  title: 'Finish the follower arm · ORDER/SET UP Month 4',
  goal: 'A complete follower arm, and Month 4 ready to start.',
  order: 'Module 4 prep today. On the Gear tab, Module 4 is mostly software: make sure you have Ubuntu 24.04 (dual-boot preferred) with enough disk space (50 GB+). Optional hardware (RPLIDAR C1, Raspberry Pi, a ROS 2 rover kit) only if you want real SLAM later — order now if so.',
  tasks: [
    '**Month 4 prep** (see the ordering box above)',
    'Finish assembling the follower arm (joints 3–5 + gripper)',
    'Route cables so they do not snag through the full range of motion',
    'Power on. Move each joint gently by sending small commands (or just read positions)',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['Practice task (Robot arm)', 'Practice task: build the SO-101, calibrate every servo, and teleoperate the follower with the leader. Then design and print your own gripper fingers to replace the stock ones, in TPU, and test them on three objects of different shapes. The arm is the platform for months five and six, and the custom fingers are the part that proves you can design as well as assemble.']
  ],
  links: [
    ['LeRobot SO-101 setup guide', 'https://huggingface.co/docs/lerobot/so101'],
    ['SO-ARM100 repo', 'https://github.com/TheRobotStudio/SO-ARM100']
  ],
  video: `
## Module 4 prep: mostly software
| Need | Status to check |
|---|---|
| Ubuntu 24.04 (dual-boot preferred) | installed, updated |
| 50 GB+ free disk | yes |
| optional RPLIDAR C1 + Raspberry Pi | only for real-robot SLAM |
| optional ready ROS 2 rover kit | only if you want hardware |
Day twenty-two again. Module 4 is ROS 2, simulation, SLAM and navigation, and almost all of it runs in software. The essential item is a machine with Ubuntu 24.04 and at least fifty gigabytes free. Dual-booting is preferred, because simulation runs much better natively than inside WSL.
Hardware is optional: a lidar and a Raspberry Pi only if you later want SLAM on a real robot. The whole module works in simulation first. Update the Gear tab accordingly.

## Finish the follower
@svg arm | joints 3–5 and the gripper
Now the main job: finish the follower arm, joints three to five and the gripper, following the guide's order exactly.
Take your time with the wrist and gripper, which are the fiddliest parts. Check each servo's label against the guide before you fit it, because a servo with the wrong ID in the wrong joint leads to a confusing calibration on day twenty-four.

## Cable routing matters
- Move every joint through its full range by hand (power off)
- Cables must not snag, stretch, or get pinched
- Leave service loops at each joint
- Secure loose runs so they cannot catch on the arm
Cable routing is easy to rush and painful to get wrong. With the power off, move every joint through its full range by hand and watch the cables. They must not snag, pull tight or get pinched between parts.
Leave a small loop of slack at each joint, called a service loop, so the cable can follow the motion. A cable that stretches at full extension will eventually break a connector, usually in the middle of a demo.

## First power-on, gently
\`\`\`bash
# read the follower's joint positions (exact command per the LeRobot guide)
python -m lerobot.find_port
# then read positions / send small moves as the guide describes
\`\`\`
Power on the follower and first just read the joint positions, moving each joint by hand and watching the numbers change. That confirms every servo answers on the bus with the right ID.
If you send movement commands, use small moves and keep a hand near the power switch. A wrongly assembled joint can drive into a hard stop. Tomorrow you build the leader.
`,
  key: [
    'Module 4 needs Ubuntu 24.04 + 50 GB; lidar and Pi are optional.',
    'Finish the follower carefully, checking servo labels against the guide.',
    'Route cables with service loops; test the full range with power off.',
    'First power-on: read positions before commanding moves.'
  ],
  quiz: [
    ['What is a service loop?', ['A software retry loop', 'A small slack loop of cable at a joint so it can follow motion', 'A calibration routine', 'A gear stage'], 1, 'Prevents cables stretching at full range.'],
    ['What should you do first when powering the finished follower?', ['Command full-speed moves', 'Read joint positions while moving joints by hand', 'Record a dataset', 'Run SLAM'], 1, 'Confirms every servo responds with the right ID.']
  ]
});

D({
  n: 79, icon: '🤝', topic: 'Robot arm', hours: 3, notion: '3f6cdfea8ce2816fa3f0c66c1e084cbb', svg: 'arm',
  title: 'Build the leader arm',
  goal: 'A complete leader arm with its handle/trigger.',
  tasks: [
    'Set up the leader servo IDs (if not done on Day 20)',
    'Assemble the leader arm per the guide',
    'Check every joint moves freely by hand (the leader is back-driven by you)',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [['Leader and follower', '…designed to be built as a leader and follower pair so you can hand-guide one and have the other mirror it.']],
  links: [['LeRobot SO-101 setup guide', 'https://huggingface.co/docs/lerobot/so101']],
  video: `
## The leader is an input device
@big You move it · it measures · the follower copies
The leader arm is not a robot in the usual sense. It is an input device, like a very precise joystick shaped like the arm. You move it by hand, its servos measure the joint angles, and the follower copies those angles.
That changes what matters in the build. The leader does not need strength. It needs to move smoothly and freely in your hand, and to measure accurately.

## Back-drivability
| | Leader | Follower |
|---|---|---|
| driven by | your hand | its motors |
| must be | easy to back-drive, smooth | strong, precise |
| servos | often lower gear ratio | standard ratio |
| handle | yes, with a trigger for the gripper | gripper |
When you push on a joint and it turns its motor through the gearbox, the joint is being back-driven. High-ratio gearboxes resist this strongly, which is why some kits give the leader servos with lower gear ratios.
Check the guide for your kit. If the leader feels stiff or notchy, it becomes tiring to teleoperate, and your demonstrations in Module 6 will be jerkier and lower quality.

## Build it
1. Set leader servo IDs if not done yet (one at a time)
2. Assemble joint by joint per the guide
3. Fit the handle and trigger (controls the follower's gripper)
4. Check cable routing through full range
Set up the leader's servo IDs if you have not already, one servo at a time. Then assemble it joint by joint following the guide.
The leader has a handle with a trigger instead of a gripper. Squeezing the trigger moves the leader's last servo, and the follower's gripper copies it. Check the cable routing through the full range of motion, as with the follower.

## The smoothness test
- With the leader unpowered, move each joint by hand
- It should feel smooth, without tight spots
- Tight spot? Check for over-tightened screws, rubbing parts, cable drag
With the leader unpowered, move each joint slowly through its range. It should feel smooth and consistent. A tight spot usually means an over-tightened screw, a part rubbing, or a cable dragging.
Fix those now. Tomorrow you calibrate both arms and teleoperate for the first time, and a smooth leader makes that a joy instead of a struggle.

## Keep the two arms apart
- Label the leader's controller board and USB cable
- Store calibration files with clear names
- Never swap a leader servo into the follower
One practical habit before tomorrow: keep the two arms clearly separated. Label the leader's controller board and cable, and the follower's, so you never plug the wrong one into the wrong command.
If you ever replace a servo, check whether it is a leader or follower type before fitting it. Mixing them up produces an arm that feels wrong and calibrates strangely.
`,
  key: [
    'The leader is an input device: you move it, it measures, the follower copies.',
    'The leader must be easy to back-drive and smooth; some kits use lower-ratio servos.',
    'The leader\'s handle trigger controls the follower\'s gripper.',
    'Fix tight spots (screws, rubbing, cables) before calibration.'
  ],
  quiz: [
    ['What does "back-drivable" mean for the leader arm?', ['It drives backwards', 'You can turn the joint by hand, driving the motor through the gearbox', 'It returns to home on its own', 'It has no gears'], 1, 'Low resistance makes teleoperation comfortable.'],
    ['What controls the follower\'s gripper during teleoperation?', ['A keyboard', 'The trigger on the leader\'s handle', 'A camera', 'A foot pedal'], 1, 'The leader\'s last servo reads the trigger.']
  ]
});

D({
  n: 80, icon: '🎮', topic: 'Robot arm', hours: 3, notion: '3f6cdfea8ce281c2bf21ff09aa321b88', svg: 'arm',
  title: 'Calibrate both arms + teleoperate',
  goal: 'The follower mirrors the leader smoothly.',
  tasks: [
    'Run the calibration for the follower, then the leader, exactly as the guide says (move each joint through its range when asked)',
    'Run teleoperation. Move slowly first',
    'Check: does each follower joint go the right direction and reach the full range? Fix calibration if not',
    'Film 30 s of teleoperation',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [['SO-101 setup guide', 'The exact port-finding, motor-setup, calibration and recording commands for the arm you built in month three.']],
  links: [['LeRobot SO-101 setup guide', 'https://huggingface.co/docs/lerobot/so101']],
  video: `
## Why calibration is needed
@big Raw encoder counts → meaningful joint angles, identical on both arms
Each servo's encoder reports a raw number from zero to four thousand and ninety-five, its twelve-bit range. But where zero falls depends on exactly how the servo horn was fitted during assembly. Two identical arms, assembled by the same person, will report different raw numbers in the same pose.
Calibration maps each joint's raw numbers onto a common, meaningful range, so that the same physical pose produces the same values on both arms. Without it, teleoperation would send the follower to the wrong positions.

## The calibration procedure
1. Put the arm in the middle of its range as the guide shows
2. Move each joint slowly through its full range when prompted
3. The software records the minimum, maximum and centre
4. Repeat for the other arm
5. Calibration files are saved and reused
The LeRobot guide walks you through it. Typically you place the arm in a reference pose, then move each joint slowly through its entire range when prompted. The software records each joint's limits and centre and saves a calibration file.
Do the follower first, then the leader, exactly as the guide says. Move slowly and use the full range; a lazy, partial sweep gives a calibration that clips motion later.

## First teleoperation
\`\`\`bash
# exact command and port names from the LeRobot SO-101 guide
python -m lerobot.teleoperate --robot.type=so101_follower --robot.port=<FOLLOWER_PORT> \\
  --teleop.type=so101_leader --teleop.port=<LEADER_PORT>
\`\`\`
Now the moment the whole section has built towards. Start teleoperation and move the leader slowly. The follower should mirror it in real time.
Start with small, slow movements, one joint at a time, with a hand near the power switch. Check that each follower joint moves in the right direction and reaches its full range.

## Fixing problems
| Symptom | Likely cause | Fix |
|---|---|---|
| joint moves the wrong way | wrong calibration or swapped servo | recalibrate; check servo ID/label |
| joint stops short of full range | partial sweep during calibration | recalibrate with full sweeps |
| follower jitters | loose horn, cable drag, low supply | tighten, reroute, check PSU |
| one joint ignores commands | wrong ID or loose cable | read positions to find it |
If a joint moves the wrong way, recalibrate it, and check that the right servo went into that joint. If a joint stops short, the calibration sweep was too small. Jitter usually points to a loose servo horn, cable drag or a weak power supply.
When it works smoothly, film thirty seconds of teleoperation. That clip, you moving one arm and the other copying you, is genuinely impressive, and it is the start of Module 6's robot learning.
`,
  key: [
    'Calibration maps raw 12-bit encoder counts to common joint ranges on both arms.',
    'Sweep each joint through its full range slowly when prompted.',
    'Start teleoperation slowly, one joint at a time, hand near the power switch.',
    'Wrong direction → recalibrate/check servo; short range → redo full sweeps.'
  ],
  quiz: [
    ['Why must both SO-101 arms be calibrated?', ['To set their colours', 'So the same physical pose gives the same joint values on both arms', 'To update firmware', 'To charge the servos'], 1, 'Horn mounting differs, so raw counts differ.'],
    ['A follower joint stops short of its full range. Most likely?', ['Too much power', 'The calibration sweep did not cover the full range', 'The leader is unplugged', 'Backlash'], 1, 'Recalibrate with full sweeps.']
  ]
});

D({
  n: 81, icon: '✋', topic: 'CAD', hours: 2.5, notion: '3f6cdfea8ce281f28048f2ec3f45612d', svg: 'sketch',
  title: 'Design your own TPU gripper fingers',
  goal: 'Your own gripper fingers in CAD, designed to mount where the stock ones go.',
  tasks: [
    'Import or measure the stock finger mounting geometry (STEP from the repo if available)',
    'Design compliant fingers for TPU: thin flexing sections, ridges or a textured contact pad',
    'Choose 3 test objects of different shapes (e.g. cube, cylinder/pen, soft or irregular object)',
    'Print in TPU (slow speed, little retraction) or order prints',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [['Practice task (Robot arm)', 'Then design and print your own gripper fingers to replace the stock ones, in TPU, and test them on three objects of different shapes.']],
  links: [
    ['SO-ARM100 repo (STEP / STL files)', 'https://github.com/TheRobotStudio/SO-ARM100'],
    ['Protolabs: Design for 3D printing', 'https://www.hubs.com/knowledge-base/design-for-3d-printing/']
  ],
  video: `
## Proving you can design, not just assemble
@big Custom fingers prove you can design as well as assemble
The article says the custom fingers are the part that proves you can design as well as assemble. Anyone can follow assembly instructions. Designing a part that bolts onto a real robot and improves its performance, then measuring that improvement, is engineering.
Today you design the fingers. Tomorrow you test them against the stock ones.

## Start from the mounting interface
- Download the STEP of the stock finger or gripper from the repo
- Copy the mounting holes and contact faces exactly
- Everything else is yours to change
Start with the interface: the part of the finger that bolts onto the gripper. Download the stock part's STEP file from the SO-ARM100 repository and import it, or measure it carefully with calipers.
Copy the mounting holes and contact faces exactly, using your measured clearances. Everything beyond the mounting area is yours to redesign.

## How compliant fingers work
| Feature | Effect |
|---|---|
| thin flexing sections | finger wraps around curved objects |
| ribs or ridges on the contact face | grip without crushing |
| wide contact pad | more friction, spreads force |
| fin-ray style triangles | finger bends toward the object when pushed |
TPU is flexible, so the finger itself can bend and conform to an object, which rigid PLA fingers cannot. This is called compliance, and it makes grasping much more forgiving: the finger adapts to the object's shape, instead of touching it at one hard point.
Thin sections act as flexures that let the finger wrap. Ridges or a textured pad add friction. A popular design idea is the fin-ray finger, a triangular lattice that actually curls toward the object when pressed, inspired by fish fins.

## Choose your three test objects
- Something boxy (a cube)
- Something round (a pen or cylinder)
- Something soft or irregular (a sponge, a toy)
Choose three test objects with different shapes now, so you can design for them: something boxy like a cube, something round like a pen, and something soft or irregular like a sponge or a small toy.
Stock rigid fingers are usually fine on the cube and struggle with the pen or the irregular object. That is where compliant fingers should shine.

## Printing TPU
- Slow: around 20–30 mm/s
- Minimal retraction (TPU compresses and jams)
- Direct-drive extruders cope best; or order prints
TPU is tricky to print. Print it slowly, around twenty to thirty millimetres per second, with little or no retraction, because the soft filament compresses and can jam in the extruder. Printers with a direct-drive extruder cope best.
If your printer struggles, order the fingers from a print service. Either way, have them ready for tomorrow's test.
`,
  key: [
    'Copy the stock mounting interface exactly (STEP or careful measurement).',
    'Compliant TPU fingers conform to objects via flexures, ridges and wide pads.',
    'Pick three different test objects: boxy, round, soft/irregular.',
    'Print TPU slowly with minimal retraction, or order prints.'
  ],
  quiz: [
    ['What does "compliance" mean for a gripper finger?', ['It follows regulations', 'It flexes and conforms to the object\'s shape', 'It is rigid', 'It is fully automatic'], 1, 'Conforming makes grasping more forgiving.'],
    ['Why use little or no retraction when printing TPU?', ['It prints faster', 'The soft filament compresses and can jam', 'TPU does not string', 'Retraction melts TPU'], 1, 'Flexible filament is easy to jam.']
  ]
});

D({
  n: 82, icon: '🧪', topic: 'Robot arm', hours: 2.5, notion: '3f6cdfea8ce28108abf5caede7276e4a', svg: 'arm',
  title: 'Test the fingers on 3 objects',
  goal: 'Measured grasp results with stock vs your fingers.',
  tasks: [
    'Fit your fingers. Teleoperate 10 grasps per object with stock fingers, then 10 with yours',
    'Record success counts in a table',
    'Iterate the finger once if one object fails a lot',
    'README for `month-3/so101/`: build photos, teleop video, finger CAD, the grasp table, what broke',
    'Tick **Practice task done**. Fill the log, Status, Hours, Confidence'
  ],
  read: [['Month 3 Milestone (this one)', 'Show a working robot arm you assembled, calibrated and modified with your own parts.']],
  links: [['LeRobot SO-101 setup guide', 'https://huggingface.co/docs/lerobot/so101']],
  video: `
## A fair experiment
@big 10 grasps per object · stock fingers vs yours · same operator, same conditions
Today you find out whether your fingers are better, with data rather than opinion. The method: for each of your three objects, teleoperate ten grasps with the stock fingers, then ten with your fingers.
Keep the comparison fair. Same objects, same starting positions, same lighting, and try to grasp the same way each time. Define success in advance, for example: lift the object ten centimetres and hold it for three seconds without dropping it.

## Record the results
| Object | Stock (/10) | Mine (/10) |
|---|---|---|
| cube | 9 | 10 |
| pen | 4 | 8 |
| sponge | 6 | 9 |
Record each result in a table like this. The numbers here are only an example, but they show a typical pattern: rigid fingers handle the cube, and compliant fingers win on round and soft objects.
Ten trials per condition is not a scientific study, but it is enough to see real differences and far better than "they seem better".

## Iterate once
- One object fails a lot? Look at why: slipping, crushing, not closing?
- Change one thing: pad texture, flex thickness, finger length
- Reprint and retest that object
If one object fails a lot, watch closely why. Does it slip out? Add texture or a wider pad. Does it get crushed or pushed away? Make the flexure thinner. Does the gripper not close far enough? Lengthen the fingers.
Change one thing, reprint, and retest just that object. One iteration, measured, is enough to tell a great story in your README.

## The Module 3 portfolio piece
- Build photos of both arms
- 30-second teleoperation video
- Finger CAD screenshots
- The grasp table, before and after
- What broke and how you fixed it
Now write the README for your SO-101 folder: build photos, the teleoperation video, screenshots of your finger design, the grasp table, and what broke and how you fixed it.
This meets the Module 3 milestone: a working robot arm you assembled, calibrated and modified with your own parts. Tick the practice task as done. It is a portfolio piece that shows the full range of skills from this module.

## Grasping is a research field
@big Grasping looks easy for humans and is still hard for robots
Your small experiment touches on a big research area. Grasping looks effortless for humans and remains one of the hardest problems in robotics: objects vary in shape, weight, friction and softness, and the robot must handle all of them.
Compliant fingers are one answer, chosen by hardware design. In Module 5 you will meet grasp planning in software, and in Module 6, learned policies that grasp from demonstration. Your fingers will be on the arm for all of it.
`,
  key: [
    'Define success in advance and keep conditions identical for a fair comparison.',
    '10 trials per object per finger type reveals real differences.',
    'Diagnose failures (slip, crush, not closing) and change one thing per iteration.',
    'The SO-101 README with a grasp table meets the Module 3 milestone.'
  ],
  quiz: [
    ['Why define "success" before testing the grippers?', ['It makes the test faster', 'So results are judged consistently and fairly', 'The software requires it', 'To impress viewers'], 1, 'Moving goalposts ruin comparisons.'],
    ['An object keeps slipping out of your fingers. What should you try first?', ['Thicker, stiffer fingers', 'More texture or a wider contact pad', 'A faster grasp', 'Removing the TPU'], 1, 'More friction and contact area.']
  ]
});

D({
  n: 83, icon: '🧪', topic: 'Milestone', hours: 2.5, notion: '3f6cdfea8ce28173b27dd28c02857dd2', svg: 'robot',
  title: 'Month 3 milestone test',
  goal: 'Prove every Month 3 milestone item.',
  tasks: [
    'Timed test: from a datasheet drawing of a part you have not modelled (e.g. a micro switch or a sensor board), produce a fully constrained mount in under 45 minutes',
    'Go through each milestone item and show it or explain it out loud',
    'Fix any failing item',
    'Check Ubuntu + disk space for Module 4 Day 1',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['Month 3 Milestone', 'By the end of this month you should be able to:\n\nModel a part from a datasheet in CAD with fully constrained sketches.\nState your printer\'s real clearance numbers from measurement rather than guesswork.\nDesign a part specifically for FDM, accounting for orientation, overhangs and layer adhesion.\nChoose PLA, PETG, ABS or TPU for a given part and justify it.\nExplain what backlash is and demonstrate it on something you built.\nShow a working robot arm you assembled, calibrated and modified with your own parts.']
  ],
  video: `
## Six milestone items
| Item | Evidence |
|---|---|
| model from a datasheet, fully constrained | today's timed test |
| real clearance numbers | your tolerance gauge results |
| designed for FDM | the snap-fit enclosure story |
| material choice justified | the Section 2 review answers |
| backlash explained and shown | your reducer video |
| working arm with your own parts | the SO-101 README and grasp table |
Milestone day. Go through the six Module 3 items, and for each, point to your evidence or explain it out loud. Most of the evidence already exists in your READMEs.

## The timed datasheet test
@big A part you have never modelled · its drawing · 45 minutes · fully constrained
The one new test today: pick a part you have never modelled, like a micro switch or a small sensor board, find its datasheet drawing, and design a fully constrained mount for it in under forty-five minutes.
Use your measured clearances, follow your printing rules, and check every sketch is black. If you finish in time, you have CAD fluency that will serve you for the rest of the course.

## Fix what fails
- Redo anything that does not pass
- Explanations shaky? Teach them to someone, or to the camera
Fix anything that fails. If an explanation feels shaky, explain it out loud again, to a friend or to your phone's camera, until it is clear.

## Ready for ROS 2?
- Ubuntu 24.04 installed and updated
- 50 GB+ free
- Tomorrow: retro; then Module 4 begins
Finally, check your Ubuntu 24.04 installation and free disk space, because Module 4 day one installs ROS 2 Jazzy. Tomorrow is the retro, then you begin building robots the way the industry does.
`,
  key: [
    'Point to evidence for each of the six milestone items.',
    'Timed test: fully constrained mount from an unseen datasheet in 45 minutes.',
    'Fix failures; rehearse shaky explanations.',
    'Have Ubuntu 24.04 with 50 GB+ ready for Module 4.'
  ],
  quiz: [
    ['Which project best evidences "designing a part specifically for FDM"?', ['The calibration cube', 'The snap-fit enclosure iterations', 'The SO-101 BOM', 'The leader arm'], 1, 'Orientation, overhangs and layer adhesion all mattered there.'],
    ['What is today\'s timed test?', ['Print a benchy', 'Design a fully constrained mount from an unseen datasheet in 45 minutes', 'Teleoperate for 45 minutes', 'Calibrate the printer'], 1, 'Proves CAD fluency.']
  ]
});

D({
  n: 84, icon: '🏁', topic: 'Review', hours: 1.5, notion: '3f6cdfea8ce281f18d00f210665f55c1', svg: 'rosgraph',
  title: 'Month 3 retro + Month 4 prep',
  goal: 'Close Month 3 and be ready for ROS 2.',
  tasks: [
    'Tick the Module 3 milestones in your notes, mark Milestone met, write the retro',
    'Review all Module 3 days on the Schedule tab: redo or set Skipped',
    'Read the Module 4 preview in the reading lesson',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['Month 4 preview', 'Your goal this month: build a robot in ROS 2, simulate it, and make it map a room and navigate autonomously.\n\nEverything up to now was you building robots your way.\n\nROS 2 is how the industry builds them, and it is the single most requested skill in robotics job listings.']
  ],
  video: `
## From idea to physical part
@big You can now design a part, make it, and make it fit
Module 3 is done. You chose a CAD tool and learned parametric design, calibrated a printer and measured its real tolerances, designed parts for printing, built and improved a gearbox, assembled and calibrated a leader-follower robot arm, and designed custom gripper fingers that you proved better with data.
As the article said, this is the month that separates people who assemble kits from people who build robots. You are now in the second group.

## The retro
1. What went well?
2. What was hard?
3. What will I change next module?
Answer the three retro questions with specifics. Maybe the tolerance gauge made everything fit. Maybe the reducer's backlash took three versions. Maybe next time you will print small test pieces before full parts.
Then review all twenty-eight days on the Schedule tab, and redo or deliberately skip anything unfinished.

## Module 4: how the industry builds robots
@svg rosgraph | nodes and topics: the language of ROS 2
Module 4's goal is to build a robot in ROS 2, simulate it, and make it map a room and navigate autonomously. The article puts it simply: everything up to now was you building robots your way. ROS 2 is how the industry builds them, and it is the single most requested skill in robotics job listings.
You will learn nodes, topics, services and actions, describe a robot in URDF, simulate it in Gazebo, control it with ros2 control, and finally map a world with SLAM and navigate it with Nav2.

## One sentence
@big What can I do now that I could not do four weeks ago?
Write your one sentence in the log: what can you do now that you could not do four weeks ago? Then rest, and start Module 4 when you are ready.
`,
  key: [
    'Module 3: parametric CAD, calibrated printing, gearboxes, the SO-101 and custom fingers.',
    'Retro: what went well, what was hard, what will change.',
    'Module 4 goal: build a robot in ROS 2, simulate it, map a room and navigate.',
    'ROS 2 is the most requested skill in robotics job listings.'
  ],
  quiz: [
    ['What is the goal of Module 4?', ['Train a VLA model', 'Build a robot in ROS 2, simulate it, and make it map and navigate autonomously', 'Design gears', 'Solder perfboard'], 1, 'From the Month 4 preview.'],
    ['According to the article, why learn ROS 2?', ['It is the only robot software', 'It is how the industry builds robots and the most requested skill in job listings', 'It replaces CAD', 'It is required for 3D printing'], 1, 'Straight from the preview.']
  ]
});
// @@END
