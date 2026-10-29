/* Module 1 · Electronics, the bench & tools (days 1–28). Source: Notion "Robotics in 6 Months" Daily Plan. */

// ───────────── Section 1 · Electronics fundamentals in the simulator ─────────────
D({
  n: 1, icon: '🔌', topic: 'Electronics', hours: 2.5, notion: '3f6cdfea8ce281929b40d8e09e3f2c73', svg: 'ohm',
  title: "Ohm's law + set up simulators + place your order",
  goal: 'Understand voltage, current and resistance, and be able to use Ohm\'s law (V = I × R) without thinking. Set up your two free simulators. Order your kit so it arrives by Day 8.',
  order: 'Order Tier 1 today: the starter kit and a multimeter (see the Gear tab). Plan the Tier 2 soldering order and place it by Day 8.',
  tasks: [
    'Read the article text in the reading lesson (Month 1 intro + Electronics fundamentals)',
    'Read SparkFun: Voltage, Current, Resistance, and Ohm\'s Law (link in the reading)',
    'Open Falstad. Load **Circuits → Basics → Ohm\'s Law** (or build: battery + resistor). Change R and watch the current change',
    'Create a free Tinkercad account. Open **Circuits**. Place a 9V battery, a resistor and a multimeter. Measure the current',
    'Solve these by hand, then check each in Falstad: (1) 9 V across 1 kΩ → I? (2) 5 V, want 10 mA → R? (3) 12 V, 0.5 A → R? (4) 3.3 V across 330 Ω → I? (5) 20 mA through 470 Ω → V?',
    '**Order Tier 1 now:** starter kit + multimeter (see Gear & Software). Shipping takes days',
    'Plan the Tier 2 order (iron, solder, flux, cutters, strippers, perfboard). Order by Day 8',
    'Fill in the log at the bottom, set Status = Done, add Hours spent and Confidence'
  ],
  read: [
    ['Month 1 goal', 'Your goal this month: be able to read a schematic, build a circuit that works, and find the fault when it does not.\n\nAlmost every roadmap skips this and starts at Arduino, which is why so many people can copy a wiring diagram but cannot fix anything when it breaks.\n\nRobotics is the one software field where the bug is sometimes a loose wire, a sagging battery or a motor drawing more current than your regulator can supply, and you will never diagnose those if you do not understand the electrical layer underneath.'],
    ['Electronics fundamentals', 'You need Ohm\'s law, voltage dividers, what a capacitor does, how a transistor switches, and how to read a schematic.\n\nYou do not need to design an op-amp from first principles.\n\nHow to learn it: start in a simulator before you spend a single dollar, because you can wire things wrong at zero cost and actually see why they failed.\n\nThe most common beginner mistake is watching hours of video without ever building the circuit, so build every example as you go, even in the simulator.'],
    ['Tier 0 budget', 'Tier 0, $0. Falstad, Tinkercad and All About Circuits, so that you learn Ohm\'s law and dividers before spending anything. Genuinely do this first.']
  ],
  links: [
    ['Falstad Circuit Simulator', 'https://www.falstad.com/circuit/', 'animated current flow, use it every day this week'],
    ['Tinkercad Circuits', 'https://www.tinkercad.com/circuits', 'virtual breadboard, Arduino and multimeter'],
    ['All About Circuits — Lessons in Electric Circuits', 'https://www.allaboutcircuits.com/textbook/', 'your reference textbook'],
    ['Afrotechmods tutorials', 'https://afrotechmods.com/tutorials/', 'short videos if you prefer video'],
    ['Make: Electronics, 3rd ed.', 'https://www.makershed.com/products/make-electronics-3rd-edition-print', 'optional paper book']
  ],
  extra: [
    ['SparkFun: Voltage, Current, Resistance, and Ohm\'s Law', 'https://learn.sparkfun.com/tutorials/voltage-current-resistance-and-ohms-law'],
    ['SparkFun: What is a Circuit?', 'https://learn.sparkfun.com/tutorials/what-is-a-circuit'],
    ['All About Circuits Vol. I — DC (Ohm\'s law chapter)', 'https://www.allaboutcircuits.com/textbook/direct-current/']
  ],
  video: `
## Why robotics starts with electricity
@svg sensethinkact | every robot runs the same loop
Every robot you will ever build runs the same loop. It senses the world, it thinks about what it sensed, and it acts by moving something.
All three steps run on electricity. A sensor turns light or distance into a voltage. A microcontroller reads that voltage and decides. A motor turns current into motion.
That is why this course starts with the electrical layer, not with code. When your robot misbehaves in month four, the cause will often be a loose wire or a sagging battery, and you will only see it if you understand what is underneath.

## Three quantities you will use every day
| Quantity | Symbol | Unit | Water picture |
|---|---|---|---|
| Voltage | V | volt (V) | pressure pushing the water |
| Current | I | ampere (A) | how much water flows per second |
| Resistance | R | ohm (Ω) | how narrow the pipe is |
Picture water in a pipe. Voltage is the pressure that pushes. Current is the amount of water flowing past a point each second. Resistance is how narrow the pipe is.
More pressure pushes more water through the same pipe. A narrower pipe lets less water through at the same pressure. Hold on to that picture, because it is exactly what Ohm's law says.
One more idea: current only flows in a closed loop. If the loop is broken anywhere, nothing flows. A surprising number of robot bugs are simply a loop that is not closed.

## Ohm's law
@eq V = I × R | volts = amps × ohms
Here is the one equation you will use more than any other this year. Voltage equals current times resistance.
It says that the voltage across a resistor is proportional to the current through it. Double the current, and the voltage across the resistor doubles. Double the resistance at the same current, and the voltage doubles too.

## Rearranging it
@eq I = V ÷ R    ·    R = V ÷ I | cover the quantity you want
You will usually know two of the three values and want the third.
To find current, divide voltage by resistance. To find resistance, divide voltage by current.
A trick many people use is the triangle: write V on top, I and R underneath. Cover the one you want with your finger, and what is left tells you whether to multiply or divide.

## A worked example
- Problem: 9 V across a 1 kΩ resistor. What current flows?
- I = V ÷ R = 9 ÷ 1000
- I = 0.009 A
- I = 9 mA
Let's do the first problem from today's activity. Nine volts across a one kilo-ohm resistor. What current flows?
Current equals voltage divided by resistance, so nine divided by one thousand. That is zero point zero zero nine amps, which we write as nine milliamps.
Notice the units. One kilo-ohm is one thousand ohms. One milliamp is one thousandth of an amp. Most beginner mistakes this week will be unit mistakes, not physics mistakes, so always convert to plain volts, amps and ohms before you calculate.

## Simulators before hardware
@svg ohm | Falstad animates current as moving dots
Your first tool is the Falstad circuit simulator. It runs in the browser, it is free, and it animates current as moving dots, so you can see what the equation means.
Load the Ohm's law example, then drag the resistor value up and down. Watch the dots slow down as resistance rises.
Your second tool is Tinkercad Circuits, a virtual breadboard with a virtual multimeter and Arduino. It looks like real parts, which makes the jump to your real bench much smaller.
In both tools you can wire things wrong at zero cost and actually see why they failed. That is exactly why the article tells you to start here.

## Order your kit today
- Tier 1: starter kit + multimeter, roughly $45 to $60
- Order today so it arrives by Day 8
- Plan Tier 2 (soldering tools) and order it by Day 8
The last job today is practical. Shipping takes days, so order the starter kit and the multimeter now. Check the Gear tab for the exact items and prices.
Plan the second order as well: a soldering iron, solder, flux, side cutters, wire strippers and perfboard. You will start soldering in section three.
`,
  key: [
    'Voltage pushes, current flows, resistance limits the flow.',
    'Ohm\'s law: V = I × R. Rearranged: I = V ÷ R and R = V ÷ I.',
    'Convert kilo-ohms and milliamps to plain units before you calculate.',
    'Build every example in a simulator; order the Tier 1 kit today.'
  ],
  quiz: [
    ['9 V is applied across a 1 kΩ resistor. What current flows?', ['9 A', '0.9 A', '9 mA', '0.9 mA'], 2, 'I = V ÷ R = 9 ÷ 1000 = 0.009 A = 9 mA.'],
    ['You want 10 mA to flow from a 5 V supply. Which resistor do you need?', ['50 Ω', '500 Ω', '5 kΩ', '2 Ω'], 1, 'R = V ÷ I = 5 ÷ 0.01 = 500 Ω.']
  ]
});

D({
  n: 2, icon: '➗', topic: 'Electronics', hours: 2.5, notion: '3f6cdfea8ce28100b04dc3cf0d77c8d7', svg: 'divider',
  title: 'Series, parallel and voltage dividers',
  goal: 'Calculate any voltage divider by hand, and know why a divider cannot power a load.',
  tasks: [
    'Read SparkFun: Series and Parallel Circuits',
    'Read SparkFun: Voltage Dividers',
    '**Article practice task (part 1):** build a voltage divider in Falstad (e.g. 9 V, R1 = 10 kΩ, R2 = 4.7 kΩ). Calculate Vout = Vin × R2 / (R1 + R2) by hand. Confirm it in the simulator',
    'Do 3 more dividers: 5 V → 3.3 V, 12 V → 5 V, 5 V → 2.5 V. Pick resistor values yourself',
    'Add a **load** resistor (1 kΩ) across R2. Watch Vout drop. Write one sentence on why',
    'Calculate total resistance of 3 resistors in series and in parallel. Check in Falstad',
    'Fill in the log, Status, Hours, Confidence'
  ],
  read: [
    ['What to focus on', 'Ohm\'s law and voltage dividers until they are automatic.'],
    ['Practice task (Electronics fundamentals)', 'Practice task: build a voltage divider in Falstad, calculate the output voltage by hand, then confirm it in the simulator. Then build a transistor switch that turns an LED on from a logic-level input, since that is the exact circuit that will later let a 3.3V microcontroller pin control something that needs more current than the pin can supply.\n\n(The transistor half of this task is on Day 5.)']
  ],
  links: [
    ['Falstad Circuit Simulator', 'https://www.falstad.com/circuit/'],
    ['All About Circuits textbook', 'https://www.allaboutcircuits.com/textbook/']
  ],
  extra: [
    ['SparkFun: Series and Parallel Circuits', 'https://learn.sparkfun.com/tutorials/series-and-parallel-circuits'],
    ['SparkFun: Voltage Dividers', 'https://learn.sparkfun.com/tutorials/voltage-dividers'],
    ['All About Circuits Vol. I — DC (divider circuits chapter)', 'https://www.allaboutcircuits.com/textbook/direct-current/']
  ],
  video: `
## Series: one path
@eq R_total = R1 + R2 + R3 | resistors in series simply add
When resistors are in series, there is only one path for current. The same current flows through every resistor, one after the other.
Their resistances simply add. Ten kilo-ohms in series with four point seven kilo-ohms behaves like fourteen point seven kilo-ohms.
The supply voltage is shared between them, and the biggest resistor takes the biggest share. That sharing is the whole idea behind a voltage divider.

## Parallel: many paths
@eq 1 / R_total = 1/R1 + 1/R2 + … | two equal resistors in parallel = half of one
When resistors are in parallel, current has several paths. Every resistor sees the same voltage, and the currents add up.
The total resistance is always smaller than the smallest resistor, because you have opened up extra lanes for current.
A quick check you can do in your head: two equal resistors in parallel give exactly half of one. Two one kilo-ohm resistors in parallel make five hundred ohms.

## The voltage divider
@svg divider | Vout = Vin × R2 ÷ (R1 + R2)
Put two resistors in series across a supply, and take a wire out from the point between them. That middle point is a voltage divider.
The output voltage is the input voltage times R2, divided by R1 plus R2. R2 is the resistor between the output and ground.
Let's do today's example. Nine volts in, R1 is ten kilo-ohms, R2 is four point seven kilo-ohms. Four point seven divided by fourteen point seven is about zero point three two. Nine times zero point three two is about two point eight eight volts.
Build it in Falstad and check that the simulator agrees with your pencil.

## Designing your own divider
- 5 V → 3.3 V: R1 = 1 kΩ, R2 = 2 kΩ gives 3.33 V
- 12 V → 5 V: R1 = 7 kΩ, R2 = 5 kΩ
- 5 V → 2.5 V: any two equal resistors
To design one, choose the ratio first, then pick real values. For five volts down to three point three, R2 needs to be about two thirds of the total. One kilo-ohm over two kilo-ohms gives three point three three volts, close enough.
For half the voltage, use any two equal resistors.
In the real world you are limited to standard values like one, two point two, four point seven and ten kilo-ohms, so you will combine them or accept a small error.

## Why a divider cannot power anything
- Add a 1 kΩ load across R2
- The load is in parallel with R2
- Parallel → lower resistance → Vout drops
Now the important lesson. Add a one kilo-ohm load across R2 and watch Vout collapse.
The load sits in parallel with R2, and parallel resistance is smaller than either resistor. So the bottom half of the divider shrinks, and so does its share of the voltage.
That is why a divider is great for measuring, for example scaling a battery voltage down so a microcontroller pin can read it, and terrible for supplying power. To power something, you use a regulator. Write that sentence in your log, in your own words.
`,
  key: [
    'Series resistances add; parallel resistance is smaller than the smallest resistor.',
    'Divider: Vout = Vin × R2 ÷ (R1 + R2), with R2 between the output and ground.',
    'A load across R2 drags Vout down, so dividers are for sensing, not for powering.',
    'Two equal resistors in parallel give half of one.'
  ],
  quiz: [
    ['Vin = 9 V, R1 = 10 kΩ, R2 = 4.7 kΩ. What is Vout (R2 to ground)?', ['About 6.1 V', 'About 2.9 V', 'About 4.5 V', 'About 0.9 V'], 1, '9 × 4.7 ÷ 14.7 ≈ 2.88 V.'],
    ['Why does Vout drop when you connect a 1 kΩ load across R2?', ['The supply voltage drops', 'The load in parallel lowers the bottom resistance', 'R1 heats up and changes value', 'Current stops flowing through R1'], 1, 'The load is in parallel with R2, so the bottom half of the divider gets smaller.']
  ]
});

D({
  n: 3, icon: '🗺️', topic: 'Electronics', hours: 2.5, notion: '3f6cdfea8ce281808123cb51047e7b5a', svg: 'pullup',
  title: 'Reading schematics + pull-up / pull-down resistors',
  goal: 'Read a schematic and know every common symbol. Understand why a digital input needs a pull-up or pull-down resistor.',
  tasks: [
    'Read SparkFun: How to Read a Schematic',
    'Make a symbol cheat sheet (draw by hand or in notes): resistor, capacitor (polarised + non-polarised), diode, LED, NPN transistor, ground, Vcc, battery, switch',
    'Read SparkFun: Pull-up Resistors',
    'In Tinkercad: Arduino Uno + push button + 10 kΩ **pull-down** to a digital pin. Run the simulation and watch the pin read HIGH/LOW (use the built-in Button example code)',
    'Remove the resistor and see the input "float". Write one sentence on what floating means',
    'Change it to a pull-up. Note how the logic inverts',
    'Fill in the log, Status, Hours, Confidence'
  ],
  read: [
    ['What to focus on', 'Reading a schematic, including the symbols you will meet constantly: resistor, capacitor, diode, transistor, ground, Vcc.\n\nPull-up and pull-down resistors, because you will use them every week.']
  ],
  links: [
    ['Tinkercad Circuits', 'https://www.tinkercad.com/circuits'],
    ['All About Circuits textbook', 'https://www.allaboutcircuits.com/textbook/'],
    ['Afrotechmods tutorials', 'https://afrotechmods.com/tutorials/']
  ],
  extra: [
    ['SparkFun: How to Read a Schematic', 'https://learn.sparkfun.com/tutorials/how-to-read-a-schematic'],
    ['SparkFun: Pull-up Resistors', 'https://learn.sparkfun.com/tutorials/pull-up-resistors'],
    ['Arduino built-in examples (Button, DigitalInputPullup)', 'https://docs.arduino.cc/built-in-examples/']
  ],
  video: `
## A schematic is a map, not a picture
@big Connections, not positions | a schematic shows what is wired to what
A schematic is a map of connections. It does not show where parts sit on the board or how big they are. It only shows what is wired to what.
That is why the same schematic can be built on a breadboard, on perfboard, or on a printed circuit board, and all three look completely different.
Lines are wires. Where lines meet with a dot, they are connected. Where they cross without a dot, they are not.

## The symbols you will meet every week
| Symbol | Part | What to remember |
|---|---|---|
| zig-zag or box | resistor | limits current |
| two plates | capacitor | curved or plus plate = polarised |
| triangle + bar | diode | current flows toward the bar |
| diode + arrows | LED | needs a resistor in series |
| circle, three legs | NPN transistor | base, collector, emitter |
| stacked lines | ground | 0 V reference |
| arrow or bar up | Vcc | the positive supply |
Here are the symbols you will meet constantly. The resistor is a zig-zag in American drawings or a small box in European ones.
A capacitor is two plates. If one plate is curved or marked plus, it is polarised, and it must go in the right way round.
A diode is a triangle pointing at a bar. Current flows in the direction the triangle points. An LED is a diode with little arrows for light coming out.
An NPN transistor has three legs: base, collector and emitter. The arrow on the emitter points out.
Ground is the zero volt reference, drawn as stacked lines. Vcc is the positive supply. Draw all of these on today's cheat sheet.

## The floating input problem
@big A disconnected input reads random noise | it is "floating"
Now the idea you will use every week. A microcontroller input pin has a very high resistance. It barely draws any current at all.
That is great for measuring, but it means that a pin connected to nothing has no defined voltage. It picks up noise from your hand, from nearby wires, even from mains wiring in the wall. It reads high, then low, then high, at random.
We call that a floating input. Today, in Tinkercad, you will remove the resistor and watch it happen.

## Pull-up and pull-down resistors
@svg pullup | released → HIGH · pressed → LOW
The fix is a resistor that gently pulls the pin to a known level when nothing else is driving it.
A pull-down resistor connects the pin to ground, so the pin reads low until the button connects it to the supply. Pressing the button then reads high.
A pull-up resistor connects the pin to the supply instead. Now the pin reads high when the button is released, and pressing the button connects it straight to ground, so it reads low.
Ten kilo-ohms is the classic value. It is strong enough to beat the noise, and weak enough that when the button shorts the pin, only a tiny current flows.

## Inverted logic and the built-in pull-up
\`\`\`cpp
pinMode(2, INPUT_PULLUP);   // internal pull-up
if (digitalRead(2) == LOW) {
  // button is PRESSED
}
\`\`\`
- Pull-up: pressed = LOW
- Pull-down: pressed = HIGH
With a pull-up, the logic is inverted. Pressed means low. That trips up everyone at least once, so write it on your cheat sheet.
Most microcontrollers have a pull-up resistor built into every pin. In Arduino code you switch it on with pinMode input pull-up, and then you need no external resistor at all.
That is the most common button wiring you will see from now on: one leg to the pin, one leg to ground, internal pull-up on.
`,
  key: [
    'A schematic shows connections only; dots mean joined, plain crossings do not.',
    'An unconnected input floats and reads random noise.',
    'Pull-down: pressed = HIGH. Pull-up: pressed = LOW (inverted logic).',
    'INPUT_PULLUP turns on the chip\'s internal pull-up, so a button needs no resistor.'
  ],
  quiz: [
    ['A button is wired with a pull-up resistor. What does the pin read while the button is pressed?', ['HIGH', 'LOW', 'Random values', 'Half the supply voltage'], 1, 'Pressing connects the pin straight to ground, so it reads LOW.'],
    ['What does "floating input" mean?', ['The pin is shorted to ground', 'The pin has no defined voltage and picks up noise', 'The pin is set as an output', 'The pin draws too much current'], 1, 'With nothing driving it, the high-impedance pin reads random noise.']
  ]
});

D({
  n: 4, icon: '🔋', topic: 'Electronics', hours: 2.5, notion: '3f6cdfea8ce2811db4faf4fe325b343b', svg: 'cap',
  title: 'Capacitors and decoupling',
  goal: 'Know what a capacitor does, see RC charging, and explain why every IC needs a decoupling capacitor.',
  tasks: [
    'Read SparkFun: Capacitors',
    'In Falstad: battery + switch + 10 kΩ + 100 µF. Watch the capacitor charge. Calculate τ = R × C (here 1 s). Check: after 1 τ the voltage is about 63%',
    'Change R and C. Predict the new τ before you run it',
    'Read about decoupling (link below). Write in your own words: why a 100 nF capacitor sits next to every IC\'s power pin',
    'Find the decoupling capacitors on a photo of an Arduino Uno board (search an image of the board and look near the chips)',
    'Fill in the log, Status, Hours, Confidence'
  ],
  read: [
    ['What to focus on', 'What a decoupling capacitor is and why every IC needs one.'],
    ['From Electronics fundamentals', 'You need Ohm\'s law, voltage dividers, what a capacitor does, how a transistor switches, and how to read a schematic.']
  ],
  links: [
    ['Falstad Circuit Simulator', 'https://www.falstad.com/circuit/'],
    ['All About Circuits textbook', 'https://www.allaboutcircuits.com/textbook/']
  ],
  extra: [
    ['SparkFun: Capacitors', 'https://learn.sparkfun.com/tutorials/capacitors'],
    ['All About Circuits Vol. I — DC (capacitors and RC time constants)', 'https://www.allaboutcircuits.com/textbook/direct-current/']
  ],
  video: `
## A capacitor is a tiny, fast battery
@big Stores charge · resists sudden voltage change | measured in farads (F)
A capacitor is two conducting plates separated by a thin insulator. Push current in, and charge builds up on the plates. The voltage across it rises as it fills.
The key behaviour to remember is this: a capacitor resists sudden changes in voltage. It can soak up a spike, or hand out charge quickly when the supply dips.
Capacitance is measured in farads. One farad is huge, so you will mostly see microfarads, written micro F, and nanofarads.

## Charging through a resistor
@svg cap | τ = R × C · 63% after one τ
Connect a battery, a resistor and a capacitor in a loop and close the switch. The capacitor does not jump to the battery voltage. It charges along a curve.
At first current rushes in. As the capacitor fills, the voltage difference across the resistor shrinks, so the current slows down, and the curve flattens out.

## The time constant
@eq τ = R × C | ten kilo-ohm × one hundred micro F = 1 second
How fast does it charge? That is set by the time constant, tau, which is simply R times C.
Ten kilo-ohms times one hundred microfarads is ten thousand times zero point zero zero zero one, which is one second.
After one time constant the capacitor reaches about sixty-three percent of the supply. After five time constants it is effectively full, about ninety-nine percent.
Today, change R and C in Falstad, but predict tau before you press run. Predicting first is what turns watching into learning.

## Why every chip needs a decoupling capacitor
- Chips switch millions of times a second
- Each switch gulps current in nanoseconds
- Long supply wires cannot respond that fast → the voltage dips
- A 100 nF capacitor right at the power pin supplies the gulp
Now the practical part. A digital chip switches its transistors millions of times a second. Every switch gulps a small burst of current, for a few nanoseconds.
The wires back to your power supply have a little resistance and inductance, so they cannot deliver that burst instantly. The voltage at the chip's power pin dips for a moment.
A small dip can corrupt a calculation or reset the chip. So we put a one hundred nanofarad capacitor right next to every chip's power pin. It acts as a local reservoir and supplies those bursts, while the main supply refills it slowly.
That is decoupling. It is so standard that if you look at a photo of an Arduino board, you will find small capacitors parked beside every chip.

## Where you will see capacitors in robots
| Where | Typical value | Job |
|---|---|---|
| beside every IC | 100 nF ceramic | decoupling |
| on motor supply | 100 to 1000 µF electrolytic | bulk reservoir |
| across motor terminals | 100 nF | kill electrical noise |
| button debounce | 100 nF with a resistor | smooth contact bounce |
You will meet capacitors all through this course. Small ceramics beside every chip for decoupling. Big electrolytics on motor power rails, to stop the voltage sagging when a motor starts.
Remember that electrolytic capacitors are polarised. Put one in backwards and it can fail, sometimes with a pop. The stripe on the can marks the negative leg.
`,
  key: [
    'A capacitor stores charge and resists sudden voltage changes.',
    'τ = R × C; about 63% charged after one τ, essentially full after five.',
    'A 100 nF capacitor beside each chip\'s power pin supplies fast current bursts (decoupling).',
    'Electrolytic capacitors are polarised; the stripe marks negative.'
  ],
  quiz: [
    ['R = 10 kΩ and C = 100 µF. What is the time constant τ?', ['0.1 s', '1 s', '10 s', '100 s'], 1, '10 000 × 0.0001 = 1 s.'],
    ['Why is a 100 nF capacitor placed right next to a chip\'s power pin?', ['To limit current into the chip', 'To supply fast current bursts so the supply does not dip', 'To raise the supply voltage', 'To act as a pull-up'], 1, 'It is a local reservoir for the chip\'s switching current: decoupling.']
  ]
});

D({
  n: 5, icon: '💡', topic: 'Electronics', hours: 3, notion: '3f6cdfea8ce2818bb56bfa6f3591b304', svg: 'transistor',
  title: 'Diodes and the transistor switch',
  goal: 'Build the transistor switch from the article, and size every resistor in it yourself.',
  tasks: [
    'Read SparkFun: Diodes (LED forward voltage, current-limiting resistor, flyback diode)',
    'Read SparkFun: Transistors (focus on the NPN switch section)',
    'Calculate the LED resistor: 5 V supply, red LED (~2 V), 15 mA → R = ?',
    '**Article practice task (part 2):** in Falstad or Tinkercad, build an NPN transistor switch (e.g. 2N2222 / BC547) that turns an LED on from a 3.3 V logic input. Calculate the base resistor so the pin supplies only 1–2 mA',
    'Swap the LED for a small DC motor in Tinkercad and add a flyback diode across it. Write why it is needed',
    'Save a screenshot of the working circuit to your notes',
    'Fill in the log, Status, Hours, Confidence'
  ],
  read: [
    ['Practice task (Electronics fundamentals)', 'Then build a transistor switch that turns an LED on from a logic-level input, since that is the exact circuit that will later let a 3.3V microcontroller pin control something that needs more current than the pin can supply.'],
    ['What to focus on', 'Reading a schematic, including the symbols you will meet constantly: resistor, capacitor, diode, transistor, ground, Vcc.']
  ],
  links: [
    ['Falstad Circuit Simulator', 'https://www.falstad.com/circuit/'],
    ['Tinkercad Circuits', 'https://www.tinkercad.com/circuits'],
    ['Afrotechmods tutorials', 'https://afrotechmods.com/tutorials/', 'transistor and diode videos']
  ],
  extra: [
    ['SparkFun: Diodes', 'https://learn.sparkfun.com/tutorials/diodes'],
    ['SparkFun: Transistors', 'https://learn.sparkfun.com/tutorials/transistors'],
    ['All About Circuits Vol. III — Semiconductors', 'https://www.allaboutcircuits.com/textbook/semiconductors/']
  ],
  video: `
## Diodes: a one-way valve
@big Current flows one way only | triangle points the way · bar marks the cathode
A diode is a one-way valve for current. It conducts when the anode is more positive than the cathode, and blocks current the other way.
A silicon diode drops about zero point seven volts when it conducts. An LED is a diode that glows, and its drop is bigger: around two volts for red, around three for blue and white.
The stripe on a diode body marks the cathode, the bar in the symbol.

## Every LED needs a resistor
@eq R = (Vsupply − V_LED) ÷ I | (5 − 2) ÷ 0.015 = 200 Ω
An LED has almost no resistance once it turns on, so connected straight to five volts it would draw far too much current and burn out. You always add a resistor in series.
The resistor takes whatever voltage the LED does not. With a five volt supply and a red LED dropping two volts, the resistor sees three volts.
For fifteen milliamps, R equals three divided by zero point zero one five, which is two hundred ohms. The nearest standard value is two hundred and twenty ohms, which gives slightly less current. That is the safe direction to round.

## Why we need a transistor at all
- A microcontroller pin: 3.3 V, safe up to about 10 to 20 mA
- A small motor: 100 mA running, 1 A or more when stalled
- The pin can only signal; something else must carry the current
A microcontroller pin is a signal, not a power source. A typical pin is three point three volts and is happy supplying maybe ten to twenty milliamps.
A small motor wants a hundred milliamps running and much more when it stalls. A relay coil, a solenoid or an LED strip are the same story. Connect them to the pin directly and you damage the chip.
So we use a transistor as a switch. The pin supplies a tiny current into the transistor's base, and the transistor lets a much larger current flow from its collector to its emitter.

## The NPN low-side switch
@svg transistor | GPIO → base resistor → NPN → load to +V
Here is the circuit from the article. The load, an LED or a motor, connects from the positive supply down to the transistor's collector. The emitter goes to ground. The microcontroller pin drives the base through a resistor.
When the pin goes high, a small base current flows, the transistor turns fully on, and the load runs. When the pin goes low, the transistor turns off and the load stops.
Because the transistor sits between the load and ground, this is called a low-side switch.

## Sizing the base resistor
@eq R_base = (3.3 − 0.7) ÷ 0.002 ≈ 1.3 kΩ | aim for 1 to 2 mA from the pin
The base behaves like a diode, so it drops about zero point seven volts. From a three point three volt pin that leaves two point six volts across the base resistor.
For a two milliamp base current, two point six divided by zero point zero zero two is one thousand three hundred ohms. A one kilo-ohm resistor is the classic choice, giving about two point six milliamps.
That small current can switch a hundred milliamps or more, because a small signal transistor amplifies base current by a factor of a hundred or so.

## The flyback diode
- A motor coil stores energy in a magnetic field
- Switch off suddenly → the coil kicks back a voltage spike
- Diode across the motor, stripe toward +V, gives the spike a safe loop
Last, the flyback diode. A motor is a coil of wire. When current flows, the coil stores energy in its magnetic field.
Switch the transistor off, and that energy has to go somewhere. The coil generates a sharp voltage spike, easily tens of volts, which can destroy the transistor.
A diode placed across the motor, pointing back toward the positive supply, gives that spike a harmless loop to circulate in until it dies away. Any time you switch a coil, add a flyback diode.
`,
  key: [
    'Diodes conduct one way; LEDs drop about 2–3 V and always need a series resistor.',
    'LED resistor: R = (Vsupply − V_LED) ÷ I. Round up to the next standard value.',
    'An NPN low-side switch lets a 1–2 mA pin current control a much larger load current.',
    'Every switched coil (motor, relay) needs a flyback diode.'
  ],
  quiz: [
    ['5 V supply, red LED (2 V), target 15 mA. Which resistor?', ['about 130 Ω', 'about 200 Ω', 'about 330 Ω', 'about 2 kΩ'], 1, '(5 − 2) ÷ 0.015 = 200 Ω; 220 Ω is the safe standard value.'],
    ['What is the flyback diode across a motor for?', ['To make the motor spin faster', 'To give the coil\'s turn-off voltage spike a safe path', 'To limit the motor\'s running current', 'To reverse the motor'], 1, 'The coil\'s stored energy would otherwise spike and damage the transistor.']
  ]
});

D({
  n: 6, icon: '🔥', topic: 'Electronics', hours: 2.5, notion: '3f6cdfea8ce281bb85c9f07de8c7375c', svg: 'battery',
  title: 'Current draw, motor stall and batteries (LiPo)',
  goal: 'Understand power, current draw, why a stalled motor can reset a microcontroller, and how to handle LiPo batteries safely.',
  tasks: [
    'Read SparkFun: Electric Power (P = V × I)',
    'Read Adafruit: Li-Ion & LiPoly Batteries. Learn: cell count (1S, 2S, 3S), nominal 3.7 V per cell, C rating, mAh',
    'Calculate: a 2S 1000 mAh 20C pack → voltage? max current? A motor draws 0.3 A running, 2 A stalled — how long does the pack last running?',
    'In Falstad: a battery with a small internal resistance (e.g. 0.5 Ω) powering a load. Increase the load current (like a stall). Watch the terminal voltage sag',
    'Write a first draft (5 lines): **why a motor stalling can reset your microcontroller.** Use the words: stall current, voltage sag, regulator, brown-out',
    'Fill in the log, Status, Hours, Confidence'
  ],
  read: [
    ['What to focus on', 'Current draw, and why a motor stalling browns out your microcontroller.\n\nBattery chemistry basics: LiPo cell counts, C ratings, and why you never leave a LiPo charging unattended.'],
    ['Month 1 Milestone (this one)', 'Explain out loud why a motor stalling can reset your microcontroller.']
  ],
  links: [
    ['Falstad Circuit Simulator', 'https://www.falstad.com/circuit/'],
    ['All About Circuits textbook', 'https://www.allaboutcircuits.com/textbook/']
  ],
  extra: [
    ['SparkFun: Electric Power', 'https://learn.sparkfun.com/tutorials/electric-power'],
    ['Adafruit: Li-Ion & LiPoly Batteries', 'https://learn.adafruit.com/li-ion-and-lipoly-batteries']
  ],
  video: `
## Power
@eq P = V × I | watts = volts × amps
Power is how fast energy is used, and it is voltage times current. A motor running at six volts and half an amp uses three watts.
Power matters for two reasons. It tells you how hot a part will get, and it tells you how long a battery will last.
You can combine it with Ohm's law too. Power in a resistor is I squared times R, which is why a resistor carrying too much current gets hot and smells.

## Running current versus stall current
@svg motor | stall = maximum current
A DC motor draws only a modest current when it spins freely. As you load it, the current rises. When it is completely stopped but still powered, it draws its maximum, the stall current.
Stall current is often five to ten times the running current. A small gear motor might run at zero point three amps and stall at two amps.
And motors stall all the time in robotics. Every time a wheel hits a wall, every time a robot starts from rest, every time an arm lifts something too heavy.

## Batteries have internal resistance
- A real battery = an ideal voltage + a small internal resistance
- More current → more voltage lost inside the battery
- Terminal voltage sags under heavy load
A real battery is not a perfect voltage source. It behaves like an ideal voltage with a small resistance inside it.
When you draw a big current, Ohm's law says that internal resistance drops some voltage, so less reaches your circuit. With half an ohm inside and two amps of stall current, you lose a whole volt.
Today you will model exactly that in Falstad and watch the terminal voltage sag as the load current climbs.

## Brown-out: why a stall resets your microcontroller
1. The motor stalls and pulls a large stall current
2. The battery voltage sags under that load
3. The regulator feeding the microcontroller drops out
4. Supply falls below the chip's minimum → brown-out reset
Now you can explain the article's milestone question. Why can a motor stalling reset your microcontroller?
The motor stalls and pulls its stall current. That current sags the battery voltage, through its internal resistance and the resistance of your wires.
The voltage regulator feeding your microcontroller needs some headroom above its output. When the input sags too far, the regulator drops out, and the microcontroller's supply falls below its minimum.
The chip detects that and resets itself. That is a brown-out. The fixes are a separate supply for the motors, big capacitors on the motor rail, a battery that can deliver the current, and thick, short wires.

## LiPo batteries
@svg battery | 3.7 V nominal per cell · 4.2 V full · never below 3.0 V
Most robots run on lithium polymer batteries, LiPos. Each cell is three point seven volts nominal, four point two volts when full, and must never go below about three volts.
Cells are stacked in series and labelled with S. A 2S pack is two cells, seven point four volts. A 3S pack is eleven point one volts.
Capacity is in milliamp hours. A one thousand milliamp hour pack can supply one amp for about an hour.
The C rating tells you the maximum safe discharge current. A one thousand milliamp hour pack rated twenty C can deliver twenty times one amp, which is twenty amps.

## LiPo safety
- Charge only on a balance charger
- Never leave a LiPo charging unattended
- Never puncture, crush or short a pack
- A swollen ("puffy") pack is finished: retire it safely
LiPos store a lot of energy in a small package, and when they fail they burn intensely. The article is blunt about this, and so am I.
Charge only on a proper balance charger. Never leave one charging unattended. Do not puncture, crush or short-circuit a pack. If a pack swells up, stop using it.
A LiPo-safe bag is cheap insurance. Treat these batteries with respect and they are perfectly safe.
`,
  key: [
    'Power: P = V × I. Motors stall often, and stall current can be 5–10× running current.',
    'Battery internal resistance makes the voltage sag under heavy current.',
    'Stall → sag → regulator drops out → brown-out reset of the microcontroller.',
    'LiPo: 3.7 V nominal per cell; S = cells in series; C rating × capacity = max current; never charge unattended.'
  ],
  quiz: [
    ['A 2S 1000 mAh 20C LiPo: what are its nominal voltage and maximum continuous current?', ['3.7 V and 1 A', '7.4 V and 20 A', '7.4 V and 2 A', '11.1 V and 20 A'], 1, '2 cells × 3.7 V = 7.4 V; 20 × 1 A = 20 A.'],
    ['Why can a stalled motor reset the microcontroller on the same battery?', ['The motor sends data on the power line', 'Stall current sags the supply below what the regulator needs (brown-out)', 'The flyback diode shorts the chip', 'The battery charges in reverse'], 1, 'The voltage sag makes the regulator drop out and the chip brown-out resets.']
  ]
});

D({
  n: 7, icon: '🔁', topic: 'Review', hours: 2, notion: '3f6cdfea8ce28197a6e4cfe732be3df4', svg: 'sensethinkact',
  title: 'Week 1 review + catch-up',
  goal: 'Close any gaps from Days 1–6 before hardware arrives. No new topics.',
  tasks: [
    'Finish any unfinished task from Days 1–6 (check the Section 1 list)',
    'Without notes, solve: one Ohm\'s law problem, one divider, one LED resistor, one transistor base resistor',
    'Without notes, draw from memory: a divider, a pull-up button, a transistor LED switch with all values',
    'Watch 1–2 Afrotechmods videos on your weakest topic (lowest Confidence this week)',
    'Explain the motor-stall reset out loud in under 1 minute. Improve your Day 6 draft',
    'Check orders: has the kit and multimeter shipped? Is the Tier 2 order placed?',
    'Update Confidence on Days 1–6 if it changed'
  ],
  read: [
    ['Reminder', 'The most common beginner mistake is watching hours of video without ever building the circuit, so build every example as you go, even in the simulator.']
  ],
  links: [
    ['Afrotechmods tutorials', 'https://afrotechmods.com/tutorials/'],
    ['All About Circuits textbook', 'https://www.allaboutcircuits.com/textbook/'],
    ['Falstad Circuit Simulator', 'https://www.falstad.com/circuit/']
  ],
  video: `
## Review day: how to use it
- No new topics today
- Recall first, then check your notes
- Fix your weakest topic, then rest
Review days are not rest days and they are not new-topic days. They are where the learning actually sticks.
The rule for today is recall first. Try to solve or draw each thing from memory before you look at your notes. Struggling to remember is exactly what makes the memory stronger.
Then look up what you got wrong, fix it, and move on. If you are behind, use today to catch up on unfinished tasks from this section instead.

## The four calculations, without notes
| Problem | Formula | Answer |
|---|---|---|
| 12 V, 0.5 A → R? | R = V ÷ I | 24 Ω |
| 5 V divider, R1 = R2 | Vin × R2 ÷ (R1 + R2) | 2.5 V |
| 3.3 V supply, LED 2 V, 10 mA | (Vs − Vled) ÷ I | 130 Ω |
| 3.3 V pin, 2 mA base | (3.3 − 0.7) ÷ I | 1.3 kΩ |
Here are four practice problems, one of each type. Pause the video, solve them on paper, then come back.
Twelve volts and half an amp gives twenty-four ohms. An equal-resistor divider from five volts gives two point five volts. A red LED on three point three volts at ten milliamps needs about one hundred and thirty ohms. And a base resistor for two milliamps from a three point three volt pin is about one point three kilo-ohms.
If you got all four, you have this week's maths. If not, redo that day's activity.

## Three circuits to draw from memory
1. A voltage divider with values and Vout
2. A push button with a pull-up resistor to a GPIO pin
3. An NPN switch driving an LED, with both resistors sized
Now draw three circuits from memory, with real values on every part. A voltage divider. A button with a pull-up. And an NPN transistor driving an LED from a three point three volt pin.
Drawing a circuit from memory is the best test of whether you understand it. If you get stuck on where a wire goes, that is the exact gap to close today.

## The one-minute explanation
@big Stall current → voltage sag → regulator drops out → brown-out
Finally, practise the milestone explanation out loud, in under a minute. Why can a motor stalling reset your microcontroller?
Use the four key words: stall current, voltage sag, regulator, and brown-out. If you can explain it to someone who has never studied electronics, you really understand it.
And check your orders. Hardware arrives next section, and the bench work starts on Day 8.
`,
  key: [
    'Recall before you re-read: it is what makes knowledge stick.',
    'You should be able to size a divider, an LED resistor and a base resistor without notes.',
    'Explain the brown-out chain in under a minute.'
  ],
  quiz: [
    ['On a review day, what should you do first?', ['Re-watch all the videos', 'Try to recall and solve problems from memory', 'Start the next topic early', 'Skip it if you feel confident'], 1, 'Retrieval practice first, then check and fix gaps.'],
    ['A 3.3 V pin drives an NPN base and you want about 2 mA. Roughly what base resistor?', ['130 Ω', '1.3 kΩ', '13 kΩ', '330 kΩ'], 1, '(3.3 − 0.7) ÷ 0.002 ≈ 1.3 kΩ.']
  ]
});

// ───────────── Section 2 · Bench work and measuring ─────────────
D({
  n: 8, icon: '📦', topic: 'Bench & measuring', hours: 2.5, notion: '3f6cdfea8ce2810cbda2ce4e47df29f3', svg: 'meter',
  title: 'Unbox, set up the bench, first power-on',
  goal: 'A clean, safe bench; every part in the kit identified; the Uno and the multimeter confirmed working.',
  article: 'Kit not here yet? Do Day 13\'s fault-finding in Tinkercad instead, and swap days back when it arrives.',
  tasks: [
    'Read the article sections in the reading lesson (budget tiers + where to order)',
    'Clear a bench: good light, non-metal surface, power strip, a small box for loose parts',
    'Unbox the kit. Sort parts into bags or a tray. Identify each part against the kit\'s PDF list',
    'Read SparkFun: How to Use a Breadboard. Note which rows/rails are connected',
    'Install Arduino IDE 2. Plug in the Uno. Upload **File → Examples → Basics → Blink**. Confirm the onboard LED blinks',
    'Read SparkFun: How to Use a Multimeter (all of it). Note which socket the red lead uses for volts vs amps',
    'Multimeter check: measure the Uno\'s 5V and 3.3V pins vs GND',
    'Mark kit and multimeter as "Got it / installed" on the Gear tab',
    'Fill in the log, Status, Hours, Confidence'
  ],
  read: [
    ['2. The bench, the tools, and what everything costs', 'This is the section that decides whether you actually start, so here is the honest budget.\n\nTier 0, $0. Falstad, Tinkercad and All About Circuits, so that you learn Ohm\'s law and dividers before spending anything. Genuinely do this first.\n\nTier 1, roughly $45 to $60. A starter kit and a multimeter. Every kit below is solderless, so you need no iron yet.\n\nTier 2, roughly $110 to $160. Add a soldering iron, solder, side cutters, wire strippers, helping hands, perfboard and extra passives.\n\nTier 3, roughly $200 to $300. Add a bench power supply, better meter, desoldering pump, storage drawers and a robot chassis kit.'],
    ['Where to order', 'AliExpress is cheapest by a wide margin, often 3 to 10 times less, but shipping runs 2 to 6 weeks and there is no support when a board arrives dead.\nAmazon is mid-priced and fast, and the right place for your first kit.\nElegoo direct ships from regional warehouses in about a week.\nAdafruit and SparkFun cost more and are worth it early, because every product page links a full tutorial and their support is real.\nSeeed Studio and DFRobot ship worldwide from China at low-to-mid prices.\nDigiKey and Mouser are for exact parts by specification with genuine datasheets, not for kits.\nPololu ships internationally and is the best source for motors and drivers.\nFor your first order, pay the premium and buy from Amazon or Elegoo direct so you are building within days instead of sulking for a month. Once you know what a 10k resistor is for, order everything from AliExpress.']
  ],
  links: [
    ['Elegoo UNO R3 Super Starter Kit (product page + PDF lessons)', 'https://www.elegoo.com/products/elegoo-uno-r3-super-starter-kit'],
    ['SparkFun: How to Use a Multimeter', 'https://learn.sparkfun.com/tutorials/how-to-use-a-multimeter'],
    ['Adafruit multimeter 9205B+', 'https://www.adafruit.com/product/2034']
  ],
  extra: [
    ['SparkFun: How to Use a Breadboard', 'https://learn.sparkfun.com/tutorials/how-to-use-a-breadboard'],
    ['Arduino IDE 2 download', 'https://www.arduino.cc/en/software'],
    ['Adafruit: Multimeters guide', 'https://learn.adafruit.com/multimeters']
  ],
  video: `
## From simulator to real parts
@big Week 2: everything you simulated, built for real | the same circuits, real components
Last section lived entirely in simulators. This section, the same circuits come off the screen and onto your bench.
Real parts behave almost exactly like the simulated ones, with three differences you will learn to respect: wires come loose, values have tolerances, and you can break things. Today is about setting up so those three differences cost you as little as possible.

## A bench that helps you
- Good light, ideally a desk lamp you can aim
- A non-metal surface (metal shorts exposed leads)
- A power strip with a switch you can reach
- A tray or small boxes for loose parts
A good bench is not about money. It is about light, space and order.
Light first. Most beginner mistakes are reading the wrong breadboard row, and good light prevents them.
Use a non-metal surface, because a metal desk will short any exposed lead you put down. Keep a power strip within reach, so you can cut power instantly when something smells hot.
And sort your parts. A tray or a few small boxes saves you a surprising amount of time hunting for that one ten kilo-ohm resistor.

## The breadboard, decoded
| Area | How it is connected |
|---|---|
| Each short row of 5 holes | connected to each other |
| Across the centre channel | NOT connected |
| Long side rails | connected along their length |
| Left half vs right half of a rail | sometimes split: check! |
A breadboard is a grid of spring clips hidden under the holes. Each short row of five holes is one connection. Anything plugged into the same row is wired together.
The centre channel separates the two sides, so a chip can straddle it with each leg on its own row.
The long rails down each side are for power and ground. On some boards the rail is split in the middle, so check with your multimeter before trusting it. That one detail has wasted many evenings.

## First power-on: Blink
\`\`\`cpp
void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}
void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
}
\`\`\`
Install Arduino IDE 2, plug in the Uno with a USB cable, and pick the board and port from the menu.
Open the Blink example and upload it. The little LED on the board should blink once per second.
This proves four things at once: the board works, the cable carries data, the drivers are installed, and the upload chain works. Every future project starts from this known good state.

## Your multimeter
@svg meter | volts across · amps in series · ohms unpowered
Your multimeter is the most important tool you will own. It has three sockets. Common, the black lead, always stays in COM.
For volts and ohms, the red lead goes in the V-ohm socket. For current, the red lead moves to the milliamp or amp socket.
Today, measure the Uno's five volt and three point three volt pins against ground. You should see about five and about three point three. If you do, both the board and the meter are working, and you have just made your first real measurement.

## The order matters
- Arrange → identify → power on → measure
- Mark gear as received on the Gear tab
- Kit late? Do Day 13 in Tinkercad and swap back
Finally, mark the kit and meter as received on the Gear tab, so your shopping list stays honest.
If the kit has not arrived yet, do not wait. Do day thirteen's fault-finding in Tinkercad today, and swap the days back when the box shows up.
`,
  key: [
    'Good light, a non-metal surface and sorted parts prevent most bench mistakes.',
    'Breadboard: 5-hole rows are joined; the centre channel is not; check for split rails.',
    'Blink proves the board, cable, drivers and upload chain all work.',
    'Meter: black in COM; red in V/Ω for volts and ohms, in mA/A only for current.'
  ],
  quiz: [
    ['On a breadboard, which holes are connected to each other?', ['Every hole in a column across the centre channel', 'The 5 holes of each short row on one side of the channel', 'All holes on the board', 'Only the corner holes'], 1, 'Each short row of five is one node; the channel separates the two sides.'],
    ['Why upload the Blink example first?', ['It calibrates the multimeter', 'It confirms the board, cable, drivers and upload all work', 'It is required before any other sketch', 'It tests the breadboard rails'], 1, 'It gives you a known-good starting point.']
  ]
});

D({
  n: 9, icon: '📏', topic: 'Bench & measuring', hours: 2.5, notion: '3f6cdfea8ce281299b2ecf9ebad83813', svg: 'meter',
  title: 'Measure everything: voltage and resistance',
  goal: 'Measure voltage and resistance confidently, and read resistor colour bands.',
  tasks: [
    '**Article practice task (part 1):** measure the voltage of a battery (9 V from the kit, and an AA if you have one)',
    'Learn the resistor colour code (link in the reading). Pick 5 random resistors. For each: read the bands → write the value → measure → compare (within tolerance?)',
    'Record results in a small table in the log',
    'Measure a resistor while holding both leads with your fingers. Note how your body changes the reading. Lesson: never hold both ends',
    'Measure a 10 kΩ potentiometer: outer pins, then wiper to each end while turning',
    'Fill in the log, Status, Hours, Confidence'
  ],
  read: [
    ['Practice task (The bench)', 'Practice task: buy a kit and a multimeter, then measure things. Measure the voltage of a battery, the resistance of five random resistors and check them against the colour bands, then use continuity mode to find a deliberately broken wire you make yourself. This sounds trivial and it is the single skill that will save you the most hours over the next six months.\n\n(The continuity part is on Day 10.)']
  ],
  links: [['SparkFun: How to Use a Multimeter', 'https://learn.sparkfun.com/tutorials/how-to-use-a-multimeter']],
  extra: [
    ['SparkFun: Resistors (colour code section)', 'https://learn.sparkfun.com/tutorials/resistors'],
    ['DigiKey resistor colour code calculator', 'https://www.digikey.com/en/resources/conversion-calculators/conversion-calculator-resistor-color-code'],
    ['Adafruit: Multimeters guide', 'https://learn.adafruit.com/multimeters']
  ],
  video: `
## Measuring voltage
@big Voltage is measured ACROSS a part | red on the higher side, black on the lower
Voltage is always a difference between two points, so you measure it across something. Put the black probe on the lower point, usually ground, and the red probe on the point you care about.
Set the dial to DC volts. If your meter is not auto-ranging, pick a range just above what you expect, so twenty volts for a nine volt battery.
A fresh nine volt battery reads a little above nine, often nine point five. A tired one reads lower. An AA cell reads about one point five when fresh. Write both numbers in your log.

## The resistor colour code
| Colour | Digit | Multiplier |
|---|---|---|
| black | 0 | ×1 |
| brown | 1 | ×10 |
| red | 2 | ×100 |
| orange | 3 | ×1 k |
| yellow | 4 | ×10 k |
| green | 5 | ×100 k |
| blue · violet · grey · white | 6 · 7 · 8 · 9 | — |
| gold · silver (last band) | ±5% · ±10% | tolerance |
Resistors are too small to print numbers on, so their value is painted as colour bands. On a four-band resistor, the first two bands are digits, the third is the multiplier, and the fourth, usually gold, is the tolerance.
Brown, black, orange means one, zero, times one thousand: ten kilo-ohms. Yellow, violet, red means four, seven, times one hundred: four point seven kilo-ohms.
Many people remember the order with a mnemonic. Pick any you like, or just keep the chart in your notes. Most of the time you will also check with the meter.

## Tolerance: why the number never matches exactly
@eq 10 kΩ ± 5% → 9.5 kΩ to 10.5 kΩ | any reading inside this range is a good resistor
A gold band means plus or minus five percent. A ten kilo-ohm resistor is fine anywhere from nine point five to ten point five kilo-ohms.
So when your meter says nine point eight six kilo-ohms, that resistor is perfectly healthy. This is one of the differences between simulation and reality: real parts have tolerances, and circuits must be designed to work across them.

## Measuring resistance: rules
1. Power OFF — never measure ohms on a live circuit
2. Ideally take the part out of the circuit
3. Do not hold both leads with your fingers
Resistance mode works by pushing a tiny current from the meter through the part. So the circuit must be unpowered, or the reading is meaningless and you may damage the meter.
Ideally, take the resistor out, because other parts in parallel will change the reading.
And do not hold both ends with your fingers. Your body is a resistor too, in parallel with the part. You will try this on purpose today, and watch a high-value resistor read wrong.

## The potentiometer: an adjustable divider
- Outer pins: the full resistance, always
- Wiper (middle) to either end: varies as you turn
- The two wiper readings always add up to the total
A potentiometer is a resistor with a third contact, the wiper, that slides along it. Between the two outer pins you always measure the full value, ten kilo-ohms.
From the wiper to either end, the reading changes as you turn the knob, and the two readings always add up to the total. That is a voltage divider with an adjustable ratio. You will use pots as knobs and position sensors many times this year.
`,
  key: [
    'Measure volts across a part; measure ohms only with power off.',
    'Colour code: band 1 and 2 are digits, band 3 is the multiplier, band 4 is tolerance.',
    'A ±5% 10 kΩ resistor can read anywhere from 9.5 to 10.5 kΩ and still be fine.',
    'A potentiometer is an adjustable voltage divider; wiper readings sum to the total.'
  ],
  quiz: [
    ['A resistor has bands brown, black, orange, gold. What is it?', ['1 kΩ ±5%', '10 kΩ ±5%', '100 kΩ ±5%', '103 Ω ±5%'], 1, '1, 0, ×1000 = 10 000 Ω; gold = ±5%.'],
    ['Why must the circuit be unpowered when measuring resistance?', ['The meter injects its own small current to measure', 'Resistors change value when warm', 'It saves the battery', 'Live circuits have no resistance'], 0, 'Ohms mode sends its own test current; outside voltage ruins the reading.']
  ]
});

D({
  n: 10, icon: '🔍', topic: 'Bench & measuring', hours: 2.5, notion: '3f6cdfea8ce28143a41df1c02fccc3d6', svg: 'divider',
  title: 'Continuity, current, and a real voltage divider',
  goal: 'Find a broken wire with continuity mode, measure current safely, and match a real divider to your Day 2 maths.',
  tasks: [
    '**Article practice task (part 2):** take a jumper wire, break it inside (bend it hard many times, or cut the core and tape it). Mix it with 4 good wires. Find the broken one with continuity mode only',
    'Build your Day 2 divider on the breadboard (use the Uno\'s 5 V or the kit\'s power module). Measure Vout. Compare with your calculation',
    'Add the 1 kΩ load. Measure again. Compare with Falstad',
    'Measure current: put the meter **in series** with a resistor + LED. Move the red lead to the mA socket first. Compare with Ohm\'s law',
    'Move the red lead back to the V socket when done (a meter left on amps shorts the next thing you measure)',
    'Fill in the log, Status, Hours, Confidence'
  ],
  read: [
    ['Practice task (The bench)', '…then use continuity mode to find a deliberately broken wire you make yourself. This sounds trivial and it is the single skill that will save you the most hours over the next six months.'],
    ['Month 1 Milestone (these ones)', 'Calculate whether a resistor value is right before you plug it in.\n\nFind a short, a break or a dead component with a multimeter.']
  ],
  links: [['SparkFun: How to Use a Multimeter (continuity + current sections)', 'https://learn.sparkfun.com/tutorials/how-to-use-a-multimeter']],
  extra: [
    ['SparkFun: Voltage Dividers', 'https://learn.sparkfun.com/tutorials/voltage-dividers'],
    ['SparkFun: How to Use a Breadboard', 'https://learn.sparkfun.com/tutorials/how-to-use-a-breadboard']
  ],
  video: `
## Continuity mode: the beep that saves hours
@big Beep = connected · silence = broken | power OFF, always
Continuity mode is resistance mode with a buzzer. If the resistance between the probes is very low, the meter beeps. That means the two points are connected.
It answers the most common question in robotics debugging: is this wire actually connected to that pin? Jumper wires break inside their insulation, where you cannot see it. Breadboard clips wear out. Solder joints crack.
The article calls this the single skill that will save you the most hours over the next six months. Today you will break a wire on purpose and find it by sound alone.

## Finding the broken wire
1. Touch the probes together: confirm the beep
2. Probe each wire end to end
3. Wiggle the wire while probing: intermittent faults crackle
4. The silent one is broken
First, touch the probes together and confirm the meter beeps. Always test your test.
Then probe each jumper wire from one end to the other. Good wires beep instantly. The broken one stays silent.
A useful trick: wiggle the wire while you probe. An intermittent break, the worst kind, will beep on and off as you move it. Those are the faults that make a robot work on the bench and fail on the floor.

## Your real voltage divider
| | Calculated | Simulated | Measured |
|---|---|---|---|
| Vout, no load | your Day 2 value | Falstad | meter |
| Vout, 1 kΩ load | your Day 2 value | Falstad | meter |
Now rebuild your day two divider on the breadboard, powered from the Uno's five volt pin.
Measure Vout and compare it to your pencil calculation and to Falstad. They should agree within a few percent. The small difference comes from resistor tolerance and from the supply not being exactly five volts. Measure the supply too, and use the real value in your calculation. The match gets much closer.
Then add the one kilo-ohm load and watch Vout fall, exactly as it did in the simulator. Seeing the same effect in three places is how the theory becomes yours.

## Measuring current: the meter goes IN the circuit
@svg ohm | break the loop and let the current flow through the meter
Current is different from voltage. You cannot measure it across a part. You have to measure how much flows through a point, so the meter must become part of the loop.
Break the circuit, for example between the resistor and the LED, and connect the meter across the gap, so all the current flows through it.
Before you do that, move the red lead to the milliamp socket and set the dial to current. Then compare the reading with Ohm's law. For five volts, a two volt LED and a three hundred and thirty ohm resistor, you expect about nine milliamps.

## The most common way to blow a meter
- In current mode, the meter is nearly a short circuit
- Measure a voltage with it → you short the supply
- Always move the red lead back to V when done
In current mode, the meter has almost zero resistance, because it must not disturb the current it measures.
That means if you forget and then touch the probes across a battery to measure voltage, you have just short-circuited the battery through your meter. Best case, you blow the meter's internal fuse. Worst case, you damage it.
So build the habit today: the moment you finish a current measurement, move the red lead back to the volts socket.
`,
  key: [
    'Continuity mode beeps for a connection; test the beep by touching the probes first.',
    'Wiggle wires while probing to catch intermittent breaks.',
    'Measure current in series: break the loop and route it through the meter.',
    'In amps mode the meter is a near-short; always move the red lead back to V.'
  ],
  quiz: [
    ['How is a multimeter connected to measure the current through an LED?', ['Across the LED', 'In series, so the current flows through the meter', 'Across the battery', 'Between the LED and ground with the meter in ohms mode'], 1, 'Current is measured through a point, so the meter goes in series.'],
    ['You finish measuring current. Why move the red lead back to the V socket?', ['To save the battery', 'In current mode the meter is nearly a short and would short the next voltage you probe', 'To reset the display', 'Because current mode is less accurate'], 1, 'A meter left on amps shorts whatever voltage you measure next.']
  ]
});

D({
  n: 11, icon: '🔀', topic: 'Bench & measuring', hours: 3, notion: '3f6cdfea8ce28155bbf4cfb85b59840b', svg: 'transistor',
  title: 'Transistor switch on a real breadboard',
  goal: 'Build your Day 5 transistor switch for real, drive it from an Uno pin, and measure that the pin current stays small.',
  tasks: [
    'Find the transistor in your kit (often PN2222 or S8050). Look up its datasheet pinout (E-B-C order differs between parts!)',
    'Build the circuit from your Day 5 schematic: Uno pin → base resistor → base; LED + resistor from 5 V to collector; emitter to GND',
    'Upload the Blink example, but change the pin to the one you used. The LED should blink through the transistor',
    'Measure the base current (meter in series with the base resistor) and the collector current. Compute the ratio',
    'Swap in the kit\'s small DC motor (with a flyback diode) and drive it. Note any Uno resets (keep this for Day 20)',
    'Take a photo of the build for your README',
    'Fill in the log, Status, Hours, Confidence'
  ],
  read: [
    ['Practice task (Electronics fundamentals)', 'Then build a transistor switch that turns an LED on from a logic-level input, since that is the exact circuit that will later let a 3.3V microcontroller pin control something that needs more current than the pin can supply.'],
    ['Month 1 Milestone (this one)', 'Read a schematic and build the circuit it describes on a breadboard.']
  ],
  links: [
    ['Arduino built-in examples (Blink)', 'https://docs.arduino.cc/built-in-examples/'],
    ['Afrotechmods tutorials', 'https://afrotechmods.com/tutorials/']
  ],
  extra: [
    ['SparkFun: Transistors (applications: switch)', 'https://learn.sparkfun.com/tutorials/transistors'],
    ['SparkFun: Diodes (flyback)', 'https://learn.sparkfun.com/tutorials/diodes']
  ],
  video: `
## From schematic to breadboard
@svg transistor | the Day 5 circuit, now with real parts
Today you take the transistor switch you designed on day five and build it for real. This is one of the Module 1 milestones: read a schematic and build the circuit it describes.
The circuit is the same: a pin drives the base through a resistor, the load hangs from the supply to the collector, and the emitter goes to ground.

## Pinouts lie: read the datasheet
| Part | Pin order (flat face toward you) |
|---|---|
| PN2222A | E · B · C |
| 2N2222 (TO-92) | E · B · C |
| S8050 | E · B · C (check yours!) |
| BC547 | C · B · E |
Here is the trap. Small transistors all look identical, a little black half-cylinder with three legs, but the order of those legs is not standard.
A PN2222 is emitter, base, collector, looking at the flat face. A BC547 is the reverse: collector, base, emitter. Get it backwards and the circuit simply does not work, or works badly.
So before you place it, find the exact part number printed on the body, and look up its datasheet pinout. This habit, datasheet first, will save you again and again.

## Build it, then make it blink
\`\`\`cpp
const int PIN = 8;          // the pin you wired to the base resistor
void setup() { pinMode(PIN, OUTPUT); }
void loop() {
  digitalWrite(PIN, HIGH);  delay(500);
  digitalWrite(PIN, LOW);   delay(500);
}
\`\`\`
Build the circuit with the base resistor you calculated, then take the Blink sketch and change the pin number to the one you wired.
The external LED should now blink through the transistor. If it does not, measure. Is the pin toggling? Measure its voltage with the meter. Is the base voltage about zero point seven when on? Is the emitter really at ground?
Measuring each node in order is exactly the fault-finding method you will practise on day thirteen.

## Measure the gain
@eq gain ≈ I_collector ÷ I_base | e.g. 15 mA ÷ 2.6 mA ≈ 6 in a saturated switch
Now prove the point of the circuit. Put the meter in series with the base resistor and measure the base current. Then measure the collector current through the LED.
The base current is a couple of milliamps. The collector current is the LED current, maybe fifteen milliamps. You will notice the ratio is much smaller than the transistor's rated gain of a hundred or more.
That is deliberate. In a switch we push extra base current so the transistor is fully on, saturated, with almost no voltage across it. That keeps it cool and gives the load the full supply.

## Now a motor, with the flyback diode
- Motor from +5 V to collector, diode across the motor, stripe to +5 V
- Watch for the Uno resetting when the motor starts
- Note it down: it is the brown-out from Day 6, live
Swap the LED for the kit's little DC motor. Add the flyback diode across it, with the stripe toward the positive supply.
The motor should pulse on and off with the code. Watch the Uno closely as the motor starts. If the board resets or the serial connection drops, you are seeing the brown-out from day six, in real life.
Write down exactly what happened. On day twenty you will measure it properly.
`,
  key: [
    'Transistor pinouts differ between parts: check the datasheet before you place it.',
    'Debug by measuring each node in order: pin, base, collector, emitter.',
    'A switch is driven into saturation, so the measured current ratio is lower than the rated gain.',
    'A motor on the Uno\'s supply may brown it out: note it for Day 20.'
  ],
  quiz: [
    ['Why look up the transistor\'s datasheet before placing it?', ['To find its colour code', 'Because the order of E, B and C legs differs between parts', 'To find its resistance', 'Transistors are polarity-free'], 1, 'PN2222 and BC547 have opposite pin orders, for example.'],
    ['In a transistor switch, why is the base driven harder than the gain strictly requires?', ['To make the LED dimmer', 'To saturate it so it is fully on with little voltage drop', 'To protect the microcontroller', 'To slow down switching'], 1, 'A saturated switch has minimal voltage across it and stays cool.']
  ]
});

D({
  n: 12, icon: '🔘', topic: 'Bench & measuring', hours: 2.5, notion: '3f6cdfea8ce28181aaefd703d2e446bf', svg: 'pullup',
  title: 'Pull-up button + decoupling on hardware',
  goal: 'Read a button reliably with a pull-up, see what floating looks like on real hardware, and place decoupling capacitors correctly.',
  tasks: [
    'Wire a button with an external 10 kΩ pull-up to an Uno pin. Upload the built-in **DigitalReadSerial** example. Watch the Serial Monitor',
    'Remove the resistor. Touch the floating wire. Watch random readings. Write what you saw',
    'Switch to the internal pull-up with the **InputPullupSerial** example. Note the inverted logic',
    'Press the button fast many times. Do you see extra presses (bounce)? Note it — you fix this properly in Month 2',
    'Add a 100 nF capacitor across the power rails right next to any chip on your breadboard (e.g. near the kit\'s shift register or sensor). Write why it goes as close as possible to the pins',
    'Fill in the log, Status, Hours, Confidence'
  ],
  read: [
    ['What to focus on', 'Pull-up and pull-down resistors, because you will use them every week.\n\nWhat a decoupling capacitor is and why every IC needs one.']
  ],
  links: [
    ['Arduino built-in examples (DigitalReadSerial, InputPullupSerial)', 'https://docs.arduino.cc/built-in-examples/'],
    ['Arduino docs — Learn section', 'https://docs.arduino.cc/learn/']
  ],
  extra: [
    ['SparkFun: Pull-up Resistors', 'https://learn.sparkfun.com/tutorials/pull-up-resistors'],
    ['SparkFun: Capacitors (decoupling)', 'https://learn.sparkfun.com/tutorials/capacitors']
  ],
  video: `
## The Serial Monitor: your first debugger
\`\`\`cpp
void setup() {
  Serial.begin(9600);
  pinMode(2, INPUT);
}
void loop() {
  Serial.println(digitalRead(2));
  delay(10);
}
\`\`\`
Today you meet the most important debugging tool in embedded work: printing values over the USB cable to the Serial Monitor.
The DigitalReadSerial example reads a pin and prints a one or a zero many times a second. Open the Serial Monitor, set it to the same speed as the code, nine thousand six hundred baud, and watch the numbers stream in as you press the button.

## Floating, for real
@big 1 0 1 1 0 1 0 0 1 … | an input with nothing attached reads noise
With the external ten kilo-ohm pull-up in place, the readings are rock solid: one when released, zero when pressed.
Now pull the resistor out and leave the pin wire dangling. The numbers go wild. Bring your finger near the wire and they change even more. Your body is acting as an antenna, picking up mains hum from the wiring in your walls.
This is the floating input from day three, and now you have seen it with your own eyes. Write down exactly what you saw, because one day a robot will behave randomly and this memory will tell you why.

## The internal pull-up
\`\`\`cpp
pinMode(2, INPUT_PULLUP);
// released → 1, pressed → 0
\`\`\`
Now try the InputPullupSerial example. It switches on the pull-up resistor that is built into the chip, so you can remove your external resistor completely. Wire the button from the pin straight to ground.
Notice the inverted logic again: released reads one, pressed reads zero. In your code you will often write if digital read equals low, then the button is pressed.

## Contact bounce
@eq 1 1 1 0 1 0 0 1 0 0 0 0 | one press, several transitions in a few milliseconds
Press the button quickly and watch closely. Sometimes a single press produces several changes. That is contact bounce.
Inside the button, two metal contacts slam together and literally bounce apart a few times in the first few milliseconds before settling. A microcontroller is fast enough to see every bounce.
For now, just note whether you see it. In Module 2 you will fix it properly, in software with timing, or in hardware with a small capacitor.

## Decoupling capacitors: placement matters
- 100 nF ceramic from the chip's VCC pin to its GND pin
- As close to the pins as physically possible
- Long leads add inductance and defeat the purpose
Finally, add a one hundred nanofarad ceramic capacitor across the power and ground right next to a chip on your breadboard.
Why as close as possible? Remember, the capacitor's job is to supply very fast bursts of current. Every centimetre of wire between the capacitor and the chip adds a little inductance, which resists fast changes in current. Put the capacitor at the far end of the board and it cannot respond in time.
So the rule on every board you ever build: one small ceramic capacitor per chip, hugging its power pins.
`,
  key: [
    'Serial.println over USB is your first and most-used debugger.',
    'A floating input reads noise; your hand near the wire makes it worse.',
    'INPUT_PULLUP removes the external resistor; pressed reads LOW.',
    'Decoupling caps go as close to the chip\'s power pins as possible.'
  ],
  quiz: [
    ['You see several 0/1 changes from one quick button press. What is it?', ['A floating input', 'Contact bounce', 'A brown-out', 'A wrong baud rate'], 1, 'The contacts physically bounce for a few milliseconds.'],
    ['Why must a decoupling capacitor sit right next to the chip\'s power pins?', ['Long wires add inductance that slows the current bursts it must supply', 'To keep the breadboard tidy', 'Capacitors only work when warm', 'To make the chip run faster'], 0, 'Wire inductance defeats a far-away capacitor.']
  ]
});

D({
  n: 13, icon: '🕵️', topic: 'Bench & measuring', hours: 3, notion: '3f6cdfea8ce2814b923bea8a18bfbaa3', svg: 'meter',
  title: 'Fault-finding day',
  goal: 'Find a short, a break and a dead or wrong component using only the multimeter and logic. This is the core skill of Month 1.',
  tasks: [
    'Ask someone to add one fault at a time to your Day 10–12 circuits while you look away. If you are alone, write 5 faults on paper, shuffle, and add them without looking at which',
    'Faults to use: (1) broken jumper, (2) wrong resistor value, (3) LED reversed, (4) short across a resistor, (5) transistor pins swapped',
    'For each fault: write the symptom → your hypothesis → the measurement → the cause. Time yourself',
    '**Safety:** check for shorts with continuity mode **with power off** first',
    'Fill in the fault table in your log (fault, symptom, measurement, cause found, time)',
    'Fill in the log, Status, Hours, Confidence'
  ],
  read: [
    ['Month 1 goal', 'Your goal this month: be able to read a schematic, build a circuit that works, and find the fault when it does not.'],
    ['Month 1 Milestone (this one)', 'Find a short, a break or a dead component with a multimeter.']
  ],
  links: [
    ['SparkFun: How to Use a Multimeter', 'https://learn.sparkfun.com/tutorials/how-to-use-a-multimeter'],
    ['All About Circuits textbook', 'https://www.allaboutcircuits.com/textbook/', 'Vol. I has a chapter on troubleshooting']
  ],
  extra: [['Adafruit: Multimeters guide', 'https://learn.adafruit.com/multimeters']],
  video: `
## Debugging is a method, not luck
@big Symptom → hypothesis → measurement → cause | write each step down
Today is the core skill of the whole module: finding the fault when a circuit does not work. The difference between beginners and engineers here is not talent. It is method.
Beginners stare at the circuit and change random things. Engineers follow a loop. Observe the symptom. Form a hypothesis about the cause. Make one measurement that tests it. Then either confirm it or rule it out, and repeat.
Writing each step down feels slow, but it stops you going in circles, and it builds a record you can learn from.

## Safety first: shorts with power off
1. Power OFF
2. Continuity between supply and ground: must NOT beep
3. If it beeps, find the short before powering up
Before you apply power to a circuit you suspect, check for a short circuit between the supply rail and ground, using continuity mode with the power off.
If it beeps, there is a short, and powering up could damage your board or your USB port. Find and remove it first.
Make this your standard first step on any new or modified circuit.

## Split the circuit in half
@svg divider | measure at the midpoint: is the fault before or after?
The fastest technique is divide and conquer. Measure the voltage at a point roughly halfway along the circuit.
If the voltage there is correct, the fault is downstream. If it is wrong, the fault is upstream. Then halve the remaining section and measure again.
Even in a circuit with fifty connections, about six measurements will corner the fault.

## The five faults, and their fingerprints
| Fault | Typical symptom | Measurement that finds it |
|---|---|---|
| broken jumper | dead circuit | continuity end to end: silent |
| wrong resistor | too dim or too bright | measure ohms out of circuit |
| LED reversed | LED never lights | full supply across the LED |
| short across a resistor | too bright, resistor cold | 0 V across the resistor |
| transistor pins swapped | load stays off or stays on | base and collector voltages wrong |
Each fault leaves a fingerprint. A broken jumper gives a dead circuit and a silent continuity test.
A wrong resistor makes the LED too bright or too dim; measure it out of circuit. A reversed LED never lights, and you measure nearly the full supply across it, because it is blocking.
A short across a resistor shows zero volts across that resistor. And swapped transistor pins give base and collector voltages that make no sense.
Learn these fingerprints, and fault-finding becomes pattern recognition.

## Practise like a game
- Someone adds one fault while you look away
- Alone? Write faults on cards, shuffle, apply blind
- Time yourself and fill in the fault table
Make it a game. Ask someone to add one fault at a time while you look away. If you are alone, write the five faults on cards, shuffle them, and apply one without looking.
For each fault, fill in the table: symptom, measurement, cause, and time taken. By the fifth fault you will notice you are much faster. That speed is what will save you hours in the months to come.
`,
  key: [
    'Debug with a loop: symptom → hypothesis → one measurement → confirm or rule out.',
    'Before powering a suspect circuit, check supply-to-ground continuity with power off.',
    'Divide and conquer: measure at the midpoint to halve the search each time.',
    'Each fault has a fingerprint, e.g. a reversed LED shows the full supply across it.'
  ],
  quiz: [
    ['An LED never lights and you measure nearly the full supply voltage across it. Most likely cause?', ['The resistor is shorted', 'The LED is reversed (blocking)', 'The supply is dead', 'The jumper is broken'], 1, 'A blocking diode has the whole voltage across it and no current flows.'],
    ['What should you check before powering a suspect circuit?', ['The colour code of every resistor', 'Continuity between supply and ground with power off (no short)', 'The serial baud rate', 'The LED brightness'], 1, 'A short across the supply can damage your board or USB port.']
  ]
});

D({
  n: 14, icon: '🔁', topic: 'Review', hours: 2, notion: '3f6cdfea8ce281c9a6b5da90a12a2925', svg: 'git',
  title: 'Week 2 review + first README draft',
  goal: 'Catch up, and write down Weeks 1–2 while you still remember what broke.',
  tasks: [
    'Finish any unfinished task from Days 8–13',
    'Rebuild the transistor switch from memory in under 15 minutes, from a schematic you draw yourself',
    'Draft a short write-up (in your notes for now, GitHub on Day 25) for: voltage divider, transistor switch, fault-finding. For each: photo, wiring description, one paragraph on **what broke and how you fixed it**',
    'Check Tier 2 tools have arrived for Section 3. If not, swap Section 3 and Section 4',
    'Update Confidence on Days 8–13'
  ],
  read: [
    ['Practice task (Python, terminal and Git)', 'Practice task: from today, every project you build lives in a GitHub repo with a README that has a photo, a wiring description and a one-paragraph explanation of what broke and how you fixed it. That last part is what makes a repo look like engineering instead of a tutorial.']
  ],
  links: [
    ['GitHub Docs: About READMEs', 'https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes'],
    ['Afrotechmods tutorials', 'https://afrotechmods.com/tutorials/', 'for any weak topic']
  ],
  video: `
## Write it down while you still remember
@big What broke and how you fixed it | the paragraph that makes a repo look like engineering
Review day again, with one new habit: documentation. The article is very specific. Every project gets a write-up with a photo, a wiring description, and one paragraph on what broke and how you fixed it.
That last paragraph is the important one. Anyone can follow a tutorial. A record of what went wrong, and how you found it, shows how you think. That is exactly what employers and collaborators look for.
Write it today, because in two weeks you will have forgotten the details.

## The rebuild challenge
- Draw the transistor switch schematic from memory
- Rebuild it on the breadboard in under 15 minutes
- It works first time? You own this circuit
First, the rebuild challenge. Draw the transistor switch schematic from memory, with values. Then build it on the breadboard, with a fifteen minute timer.
If it works first time, you truly understand it. If not, use your fault-finding method from yesterday, and note what you got wrong. Either outcome is useful.

## A README template
\`\`\`markdown
# Transistor switch (Module 1, Day 11)
![photo](photo.jpg)
## Wiring
Pin 8 → 1 kΩ → base of PN2222. LED + 220 Ω from 5 V
to collector. Emitter to GND. Flyback diode on the motor.
## What broke and how I fixed it
LED stayed off. Base read 0.7 V but collector read 5 V,
so the transistor was off... pins were E-B-C reversed.
Checked the datasheet, flipped it, works.
\`\`\`
Here is a simple template. A title. A photo. A short wiring description, written so someone could rebuild it. And the what broke section, told as a small story: the symptom, what you measured, and the fix.
Do three of these today: the voltage divider, the transistor switch and your fault-finding session. Keep them in your notes. On day twenty-five they move to GitHub.

## Check your tools
- Next section is soldering: iron, solder, flux, cutters, strippers, perfboard
- Not arrived? Swap Section 3 and Section 4
Finally, check that your soldering tools have arrived, because the next section is all soldering.
If they have not, swap the order: do section four, the Python and Git week, first, and come back to soldering when the box arrives. The plan is flexible. Progress is what matters.
`,
  key: [
    'Every project gets a README: photo, wiring, and what broke and how you fixed it.',
    'Rebuilding a circuit from your own schematic is the best test of understanding.',
    'If tools are late, swap sections rather than stalling.'
  ],
  quiz: [
    ['According to the article, what makes a project repo look like engineering instead of a tutorial?', ['A long list of features', 'A paragraph explaining what broke and how you fixed it', 'Using many libraries', 'A professional logo'], 1, 'The debugging story shows how you think.'],
    ['Your soldering tools have not arrived before Section 3. What does the plan suggest?', ['Skip soldering entirely', 'Swap Section 3 and Section 4', 'Stop until they arrive', 'Borrow tools and rush'], 1, 'Do the Python & Git section first and swap back later.']
  ]
});
// ───────────── Section 3 · Soldering and power ─────────────
D({
  n: 15, icon: '🔥', topic: 'Soldering', hours: 2.5, notion: '3f6cdfea8ce281fc8868ec988cf5b6fa', svg: 'solder',
  title: 'Soldering: read, set up safely, tin the tip',
  goal: 'Understand good soldering before touching the iron, set up a safe station, and tin the tip properly.',
  article: '⚠️ Safety: ventilate (open a window or use a small fan pulling fumes away), wear safety glasses, keep the iron in its stand, never touch the tip, wash hands after handling solder.',
  tasks: [
    'Read the full Adafruit Guide to Excellent Soldering, including the photos of common failures',
    'Set up: iron + stand, damp sponge or brass wool, solder, flux, helping hands, cutters, safety glasses',
    'Power the Pinecil. Set roughly 320–350 °C (check your solder\'s spec)',
    'Tin the tip: melt a little solder on it, wipe, repeat until shiny',
    'Make 5 practice joints on scrap wire twists. Look at each under good light',
    'Mark Tier 2 tools as "Got it" on the Gear tab',
    'Fill in the log, Status, Hours, Confidence'
  ],
  read: [
    ['3. Soldering', 'At some point a jumper wire will not be good enough, and a robot that shakes itself apart mid-demo is not a portfolio piece.'],
    ['What to focus on', 'Tinning the tip and keeping it clean.\nHeating the joint, not the solder.\nRecognising a cold joint by sight.\nThrough-hole first, surface-mount much later.\nUsing flux, which fixes most problems beginners blame on the iron.'],
    ['The iron', 'Pinecil V2 soldering iron ($25.99 community, $35.99 retail).\nA real temperature-controlled iron for the price of a toy one, USB-C powered, takes standard TS100 and Hakko T12 tips.']
  ],
  links: [
    ['Adafruit Guide to Excellent Soldering', 'https://learn.adafruit.com/adafruit-guide-excellent-soldering'],
    ['SparkFun: How to Use a Multimeter', 'https://learn.sparkfun.com/tutorials/how-to-use-a-multimeter'],
    ['Pinecil V2 product page', 'https://pine64.com/product/pinecil-smart-mini-portable-soldering-iron/']
  ],
  extra: [
    ['SparkFun: How to Solder — Through-Hole Soldering', 'https://learn.sparkfun.com/tutorials/how-to-solder-through-hole-soldering'],
    ['SparkFun: Working with Wire', 'https://learn.sparkfun.com/tutorials/working-with-wire']
  ],
  video: `
## Why solder at all?
@big A robot that shakes itself apart mid-demo is not a portfolio piece
Breadboards are perfect for experiments, but their spring clips loosen with vibration, and robots vibrate. Motors shake, wheels bounce, arms swing.
Soldering makes a connection that is both electrical and mechanical. Molten metal flows around the lead and the copper pad and freezes into one solid joint. Done well, it outlasts the robot.

## Safety, before anything else
- Ventilate: open a window or use a fan pulling fumes away
- Safety glasses: solder and flux can spit
- The iron lives in its stand; never touch the tip (~350 °C)
- Wash your hands after handling solder
The iron tip sits at around three hundred and fifty degrees Celsius. It will burn skin instantly and melt anything plastic.
The smoke you see is mostly flux, not metal, but it irritates your lungs, so ventilate. A small fan pulling the fumes away from your face is enough.
Wear safety glasses, because flux can spit. Always return the iron to its stand, never set it down on the bench. And wash your hands afterwards, especially if your solder contains lead.

## How solder actually works
@svg solder | heat the pad and the lead, then feed solder into the joint
The most important sentence in soldering is this: heat the joint, not the solder.
Touch the iron tip so it heats both the copper pad and the component lead at the same time. After a second or two, feed the solder wire into the joint, on the opposite side from the iron. The hot metal melts the solder, and it flows around the joint.
Remove the solder, then the iron, and do not move anything for a few seconds while it freezes.
If you melt solder on the iron and carry it to the joint, it lands on cold metal and never bonds. That is a cold joint, and it is the number one beginner fault.

## Flux: the secret ingredient
@big Flux cleans the metal so solder can flow | most "bad iron" problems are really missing flux
Metal surfaces are covered in a thin layer of oxide, and molten solder will not stick to oxide. Flux is a chemical that dissolves that layer as it heats, so the solder can wet the metal and flow.
Your solder wire has flux in its core, but it burns off quickly. A flux pen adds more exactly where you need it.
The article says it plainly: flux fixes most problems beginners blame on the iron. When a joint will not flow, add flux before you add heat.

## Tin the tip and keep it shiny
1. Heat the iron to 320–350 °C
2. Melt a little solder onto the tip
3. Wipe on brass wool or a damp sponge
4. Repeat until the tip is silver and shiny
A shiny tip transfers heat well. An oxidised, black tip barely transfers heat at all, and joints take forever.
Tinning means coating the tip with a thin layer of fresh solder. Melt some on, wipe it, and repeat until the tip is silver. Do this when you start, every few joints, and before you put the iron away. A tinned tip lasts years; a neglected one dies in weeks.
Today, after setting up, make five practice joints on twisted scrap wire, and inspect each one under good light.
`,
  key: [
    'Heat the joint (pad and lead), then feed solder into it, never onto the iron.',
    'Flux removes oxide so solder can flow; add it when a joint won\'t wet.',
    'Keep the tip tinned and shiny for good heat transfer.',
    'Ventilate, wear glasses, keep the iron in its stand, wash your hands.'
  ],
  quiz: [
    ['What is the correct way to make a joint?', ['Melt solder on the iron, then carry it to the joint', 'Heat the pad and lead together, then feed solder into the joint', 'Heat only the solder wire', 'Apply solder first, then heat it'], 1, 'Heat the joint, not the solder.'],
    ['A joint refuses to flow and looks dull and lumpy. What usually fixes it?', ['A hotter iron at 450 °C', 'More flux', 'Blowing on it', 'Thicker solder'], 1, 'Flux removes the oxide that stops solder wetting the metal.']
  ]
});

D({
  n: 16, icon: '🧩', topic: 'Soldering', hours: 2.5, notion: '3f6cdfea8ce2818eb7e6c6dc51d87b9b', svg: 'solder',
  title: '30 joints on perfboard + spot the cold joint',
  goal: 'Make clean, shiny, volcano-shaped through-hole joints consistently, and recognise a bad one by sight.',
  tasks: [
    'Put 10 resistors through a perfboard. Solder all 20 legs. Trim with side cutters',
    'Make 10 more joints **without flux** and 10 **with flux**. Compare the difference',
    'Deliberately make 2 bad joints: (1) melt solder on the iron and drip it on (cold joint), (2) too much solder (blob). Compare with the Adafruit failure photos',
    'Check every joint with continuity mode: pad to leg',
    'Take one close-up photo of good vs bad joints for your README',
    'Fill in the log, Status, Hours, Confidence'
  ],
  read: [
    ['What to focus on', 'Heating the joint, not the solder.\nRecognising a cold joint by sight.\nUsing flux, which fixes most problems beginners blame on the iron.']
  ],
  links: [['Adafruit Guide to Excellent Soldering (common problems section)', 'https://learn.adafruit.com/adafruit-guide-excellent-soldering']],
  extra: [['SparkFun: How to Solder — Through-Hole Soldering', 'https://learn.sparkfun.com/tutorials/how-to-solder-through-hole-soldering']],
  video: `
## Thirty joints: repetition builds the skill
@big Your hands learn what your eyes read yesterday | 10 resistors · 20 legs · then 20 more
Soldering is a motor skill, like handwriting. You cannot learn it from a video, only from repetition. Today you make about thirty joints, and the last ten will look noticeably better than the first ten.
Push ten resistors through a perfboard, bend the legs slightly outward so they stay put, flip the board, and solder every leg.

## The anatomy of a good joint
| Good joint | Bad joint |
|---|---|
| shiny and smooth | dull, grainy or cracked |
| concave sides: a small volcano | a ball sitting on top |
| solder wets pad AND lead | pad bare, or lead bare |
| lead visible in the centre | lead buried in a blob |
A good through-hole joint looks like a small, shiny volcano. The sides are concave, curving inward from the pad up the lead. You can still see the shape of the lead in the middle.
That shape tells you the solder wetted both surfaces: it flowed out across the pad and up the lead.
A bad joint looks like a ball sitting on top, or it is dull and grainy, or the pad is bare on one side. Each of those means the solder did not bond to something.

## The cold joint
@big Dull · grainy · balled up | it may conduct today and fail next week
Today you will make a cold joint on purpose, so you recognise it forever. Melt solder on the iron and drip it onto the joint.
It forms a dull, lumpy ball. It might even pass a continuity test today, because it is touching. But it has not bonded, and with vibration and temperature changes it will crack, giving you an intermittent fault in a month.
The fix is simple: add flux, reheat the joint properly, and let the solder flow.

## Too much solder, and bridges
- A blob hides whether the joint is wetted
- Excess solder can bridge to the next pad → a short
- Remove extra with desoldering wick
The second deliberate mistake is too much solder. A big blob hides what is underneath, so you cannot tell whether the joint is good.
Worse, on closely spaced pins excess solder can bridge across to the neighbouring pad, making a short circuit. That is why you check neighbouring pins for shorts with continuity mode.
Desoldering wick, a braid of copper, soaks up excess solder when you heat it against the joint.

## Flux versus no flux
1. 10 joints with only the flux in the solder core
2. 10 joints adding flux from a pen first
3. Compare shine, shape and time per joint
Do ten joints using only the flux inside the solder wire, then ten more adding extra flux from a pen first.
Most people find the fluxed joints flow faster, look shinier, and form a better volcano. Write down what you notice.
Finally, test every joint with continuity mode, from the pad to the component lead, and photograph a good joint next to a bad one for your README.
`,
  key: [
    'A good joint is a shiny, concave volcano with solder wetting both pad and lead.',
    'A cold joint is dull and balled; it may pass today and fail with vibration.',
    'Too much solder hides problems and can bridge to the next pad.',
    'Extra flux makes joints flow faster and look better.'
  ],
  quiz: [
    ['Which describes a good through-hole joint?', ['A dull ball on top of the pad', 'A shiny, concave volcano with the lead visible', 'Solder only on the lead, pad bare', 'A large blob covering neighbouring pads'], 1, 'Concave sides show the solder wetted both surfaces.'],
    ['Why is a cold joint dangerous even if it passes continuity today?', ['It glows when hot', 'It has not bonded and can crack with vibration, causing intermittent faults', 'It increases resistance to zero', 'It shorts to ground immediately'], 1, 'Intermittent faults are the hardest to find later.']
  ]
});

D({
  n: 17, icon: '📌', topic: 'Soldering', hours: 2.5, notion: '3f6cdfea8ce281a7ab7edd367ff798f2', svg: 'solder',
  title: 'Header pins on a breakout (rounds 1 and 2)',
  goal: 'The article\'s soldering practice task, twice.',
  tasks: [
    '**Article practice task, round 1:** solder header pins onto a cheap breakout board. Tip: push the headers into a breadboard first so they stay straight',
    'Test **every** pin with continuity mode (pin to its pad, and check no two neighbour pins are shorted)',
    'Round 2 on a second board. Try to be faster and cleaner',
    'Write the time taken and the number of bad joints for each round',
    'Fill in the log, Status, Hours, Confidence'
  ],
  read: [
    ['Practice task (Soldering)', 'Practice task: solder header pins onto a cheap breakout board, then test every pin with continuity mode, and do the whole thing three times. Then desolder one and resolder it, because removing components badly is how most beginners destroy boards.\n\n(Round 3 and the desolder step are on Day 18.)'],
    ['Month 1 Milestone (this one)', 'Solder a clean through-hole joint and check it electrically.']
  ],
  links: [
    ['Adafruit Guide to Excellent Soldering', 'https://learn.adafruit.com/adafruit-guide-excellent-soldering'],
    ['SparkFun: How to Use a Multimeter (continuity)', 'https://learn.sparkfun.com/tutorials/how-to-use-a-multimeter']
  ],
  extra: [['SparkFun: How to Solder — Through-Hole Soldering', 'https://learn.sparkfun.com/tutorials/how-to-solder-through-hole-soldering']],
  video: `
## The most common soldering job in robotics
@big Sensors arrive without pins | soldering headers is how you plug them in
Almost every sensor breakout you buy, an IMU, a distance sensor, a display, arrives as a small board with a strip of loose header pins in the bag. Before you can plug it into a breadboard, you have to solder the pins on.
That makes it the single most common soldering job you will do. The article's practice task is exactly this, three times over, because doing it three times is what makes it routine.

## The breadboard jig trick
1. Push the long side of the header into a breadboard
2. Drop the breakout board onto the short pins
3. The breadboard holds everything straight while you solder
The classic beginner problem is crooked pins. You solder one pin, the strip tilts, and now it will not fit a breadboard.
Here is the trick. Push the header strip, long pins down, into a breadboard. Drop the breakout board over the short ends. The breadboard holds everything perfectly square while you solder.
Solder one pin at each end first, check that the board sits flat, and only then do the rest.

## Small pads need a quick touch
- Pads are tiny: about 1 to 2 seconds of heat each
- Touch iron to pad and pin together, feed a little solder
- Too long → you can lift the pad or cook the board
Header pads are small, so they heat quickly. One to two seconds of iron contact, a small amount of solder, and move on.
Holding the iron on too long can overheat the board, and in the worst case the copper pad lifts off. A lifted pad is very hard to repair.
If a joint is not flowing, do not hold the iron longer. Pull away, add flux, and try again.

## Test every pin
| Test | Probe from | Probe to | Expect |
|---|---|---|---|
| connection | pin | its pad or trace | beep |
| no short | pin | each neighbour | silence |
After each board, test every single pin with continuity mode. First, from each pin to its pad or the trace it connects to: that should beep.
Then between each pair of neighbouring pins: that should stay silent. If two neighbours beep, you have a solder bridge. Use wick to remove it.
This check is the second half of the module milestone: solder a clean joint and check it electrically.

## Round 2: faster and cleaner
- Time both rounds
- Count bad joints and shorts
- Round 2 should beat round 1 on both
Do the whole thing again on a second board, and time yourself on both. Record the time, the number of joints you had to redo, and any shorts.
Round two should be faster and cleaner. Seeing that improvement in numbers is satisfying, and it is real evidence of a skill you can put in your portfolio.
`,
  key: [
    'Use a breadboard as a jig so header pins stay straight.',
    'Small pads need only 1–2 s of heat; too long can lift a pad.',
    'Test each pin to its pad (beep) and each pair of neighbours (silence).',
    'Time each round to measure your improvement.'
  ],
  quiz: [
    ['What is the easiest way to keep header pins straight while soldering?', ['Hold them with your fingers', 'Plug the header into a breadboard and place the board on top', 'Use extra solder', 'Bend them after soldering'], 1, 'The breadboard acts as a jig.'],
    ['Two neighbouring header pins beep in continuity mode. What does that mean?', ['Both joints are perfect', 'There is a solder bridge (short) between them', 'The meter is in the wrong mode', 'The pins are not soldered'], 1, 'Neighbours should be isolated; a beep means a bridge.']
  ]
});

D({
  n: 18, icon: '🧹', topic: 'Soldering', hours: 2.5, notion: '3f6cdfea8ce281c8991dc3a651e37efa', svg: 'solder',
  title: 'Round 3 + desolder and resolder',
  goal: 'Finish the practice task and learn to remove a part without lifting pads.',
  tasks: [
    'Round 3 of header pins. Test every pin',
    'Desolder one header pin using wick and/or a desoldering pump. Add fresh solder or flux first — it helps old solder flow',
    'Inspect the pad. Is it intact or lifted?',
    'Resolder the pin. Test continuity again',
    'Desolder a resistor from your Day 16 perfboard without damaging the board',
    'Tick **Practice task done** in the log when all three rounds and the resolder pass',
    'Fill in the log, Status, Hours, Confidence'
  ],
  read: [
    ['Practice task (Soldering)', 'Then desolder one and resolder it, because removing components badly is how most beginners destroy boards.']
  ],
  links: [['Adafruit Guide to Excellent Soldering (desoldering section)', 'https://learn.adafruit.com/adafruit-guide-excellent-soldering']],
  extra: [['SparkFun: How to Solder — Through-Hole Soldering (rework and desoldering)', 'https://learn.sparkfun.com/tutorials/how-to-solder-through-hole-soldering']],
  video: `
## Removing parts is harder than adding them
@big Removing components badly is how most beginners destroy boards
Soldering a part on is the easy direction. Taking one off without damage is the real skill, and the article is clear about why it matters: removing components badly is how most beginners destroy boards.
You will need it constantly: a resistor in the wrong place, a header on the wrong side, a dead sensor to replace. Today you learn to do it cleanly.

## Two tools
| Tool | How it works | Best for |
|---|---|---|
| desoldering wick | copper braid soaks up molten solder | clearing pads, removing bridges |
| desoldering pump | spring plunger sucks molten solder away | clearing through-holes quickly |
Desoldering wick is a flat braid of fine copper wire, soaked in flux. Lay it on the joint, press the hot iron on top, and capillary action pulls the molten solder up into the braid.
A desoldering pump is a spring-loaded plunger. Cock it, melt the joint, put the nozzle right against it and press the button. It sucks the molten solder away in one go.
Many people use both: the pump for the bulk, the wick to clean up what is left.

## The counter-intuitive trick: add solder first
1. Add a little fresh solder or flux to the old joint
2. Then apply wick or pump
3. Old solder flows much more easily
Here is the trick that surprises everyone. To remove solder, first add a little more.
Old joints often contain solder whose flux has long since burned away, and it melts sluggishly. Adding fresh solder, or a dab of flux, brings back the flow, so the whole joint melts quickly and comes away cleanly.

## Do not force it
- Never pull a lead while the joint is still solid
- Heat, remove solder, then wiggle gently
- A lifted pad is very hard to repair
The cardinal rule is never to force a part out. If you pull on a lead while there is still solder holding it, the copper pad tears off the board with it.
Remove the solder first, then gently wiggle the lead. For a two-legged part like a resistor, you can alternate the iron between both joints while pulling very gently, but only once most of the solder is gone.
After removal, inspect the pad. If it is intact and shiny, resolder a part there and test continuity again.

## Practice task complete
- Round 3: every pin tested
- One pin desoldered and resoldered
- A resistor removed from the perfboard, pads intact
- Tick "Practice task done"
When round three passes, one pin has been desoldered and resoldered successfully, and you have removed a resistor from your perfboard without lifting a pad, the article's soldering practice task is complete.
Tick practice task done in the log. That is a real milestone: you can now build things that survive vibration.
`,
  key: [
    'Desoldering wick soaks up solder; a pump sucks it away.',
    'Add fresh solder or flux first; it makes old joints flow.',
    'Never pull a lead while solder still holds it: pads tear off.',
    'Inspect the pad after removal, then resolder and test again.'
  ],
  quiz: [
    ['An old joint will not melt properly for desoldering. What helps most?', ['Pull the lead harder', 'Add a little fresh solder or flux first', 'Turn the iron to maximum', 'Cool it with water'], 1, 'Fresh flux restores flow so the joint melts fully.'],
    ['What usually causes a lifted pad when removing a part?', ['Using wick', 'Pulling the lead while solder is still holding it', 'Adding flux', 'Using a pump'], 1, 'Remove the solder first, then wiggle gently.']
  ]
});

D({
  n: 19, icon: '🧱', topic: 'Soldering', hours: 3, notion: '3f6cdfea8ce28171bf94c76ddd53d735', svg: 'transistor',
  title: 'Make the transistor switch permanent on perfboard',
  goal: 'Go from a schematic to a working soldered board, and test it electrically before powering it.',
  tasks: [
    'Plan the layout on paper first: where each part sits on the perfboard, where wires run. Keep it small',
    'Solder the transistor LED switch (base resistor, transistor, LED + resistor, header pins for 5 V / GND / signal)',
    '**Before power:** continuity check every connection against the schematic, and check 5 V and GND are NOT shorted',
    'Power it and drive it from an Uno pin with Blink',
    'Compare with the breadboard version: does it behave the same?',
    'Photo for README',
    'Fill in the log, Status, Hours, Confidence'
  ],
  read: [
    ['3. Soldering', 'At some point a jumper wire will not be good enough, and a robot that shakes itself apart mid-demo is not a portfolio piece.'],
    ['Month 1 Milestone (these ones)', 'Read a schematic and build the circuit it describes on a breadboard.\n\nSolder a clean through-hole joint and check it electrically.']
  ],
  links: [['Adafruit Guide to Excellent Soldering', 'https://learn.adafruit.com/adafruit-guide-excellent-soldering']],
  extra: [
    ['SparkFun: Working with Wire', 'https://learn.sparkfun.com/tutorials/working-with-wire'],
    ['SparkFun: Transistors', 'https://learn.sparkfun.com/tutorials/transistors']
  ],
  video: `
## Your first permanent circuit
@svg transistor | same schematic, now soldered to last
Today the transistor switch graduates from the breadboard to a permanent soldered board. This is your first real piece of hardware: something you could mount inside a robot and forget about.
The circuit is the one you know well. What is new is the process: planning a layout, soldering it, and verifying it before it ever sees power.

## Plan on paper first
- Draw the perfboard grid at full size
- Place parts so connected leads are neighbours
- Put headers on one edge: 5 V · GND · signal
- Keep it small, but leave room for your iron
Perfboard is a grid of holes with a copper pad around each, but unlike a breadboard, nothing is connected. You make every connection yourself, with component legs bent along the back or short wires.
So plan first. Draw the grid on paper and place the parts so that pins which connect sit next to each other. That keeps wiring short and simple.
Put a three-pin header along one edge for five volts, ground and the signal, so the board plugs neatly into the rest of your system.

## Solder from low to tall
1. Resistors and diodes (lowest)
2. Transistor and LED
3. Header pins (tallest)
4. Make connections on the back
Solder the lowest parts first: resistors and diodes. Then the transistor and LED, then the header. That way, when you flip the board, the part you are soldering rests against the bench and stays in place.
Make connections on the back by bending a leg over to the next pad, or by running a short piece of tinned wire. Trim excess legs with side cutters, pointing the cut ends away from your eyes.

## Test before power: the golden rule
| Check | Mode | Expect |
|---|---|---|
| 5 V to GND | continuity | silence (no short!) |
| each schematic connection | continuity | beep |
| neighbouring pads | continuity | silence |
| transistor pins | datasheet | E, B, C in the right holes |
Before you apply power, verify the board against the schematic with continuity mode.
First and most important: five volts to ground must be silent. A short there will drag down your Uno's supply.
Then check every connection on the schematic beeps, and that neighbouring pads that should not connect stay silent. Finally, confirm the transistor's pins went in the right holes.
Testing before power turns potential smoke into a quiet fix.

## Power up and compare
- Drive the signal pin from the Uno with Blink
- Compare behaviour with the breadboard version
- Photograph it for the README
Now power it and drive the signal pin from the Uno with the Blink sketch. The LED should blink exactly as it did on the breadboard.
If it does not, you already know the method: measure each node in order. Then photograph your board, front and back, for the write-up. This little board is the first entry in your hardware portfolio.
`,
  key: [
    'Plan the perfboard layout on paper before soldering.',
    'Solder from the lowest parts to the tallest.',
    'Before power: 5 V to GND must not beep, every schematic connection must.',
    'A soldered circuit should behave exactly like its breadboard version.'
  ],
  quiz: [
    ['Before powering a newly soldered board, what is the single most important check?', ['The LED colour', 'That 5 V and GND are not shorted', 'The board\'s weight', 'The solder brand'], 1, 'A supply short can damage your power source or Uno.'],
    ['Why solder the lowest-profile parts first?', ['They need less heat', 'The board rests flat on them when flipped, holding parts in place', 'Tall parts melt', 'It uses less solder'], 1, 'Low parts first keeps each part pressed in while you solder.']
  ]
});

D({
  n: 20, icon: '⚙️', topic: 'Bench & measuring', hours: 3, notion: '3f6cdfea8ce2811bb711f8f274cb3d56', svg: 'motor',
  title: 'Motor current, stall and the brown-out experiment',
  goal: 'Measure motor current for real, see a stall, and prove the Month 1 milestone "why a motor stall resets the microcontroller".',
  article: '⚠️ Use the kit\'s small motor and the kit\'s power module or a battery pack. Hold a stall for only 1–2 seconds. Do NOT power a motor straight from an Uno pin — always go through your transistor switch or a driver, with a flyback diode.',
  tasks: [
    'Put the multimeter in series with the motor (mA or 10 A socket as needed). Measure the running current',
    'Pinch the shaft briefly to stall it. Read the peak current. Compare with running current',
    'Now power the Uno and the motor from the **same** weak source (e.g. a 9 V battery through the power module). Add a sketch that prints a counter to Serial every 100 ms. Stall the motor. Does the counter restart (reset)?',
    'Measure the supply voltage while stalling. Watch it sag',
    'Fix it: give the motor its own supply (shared GND) or add a big capacitor (e.g. 470 µF) near the motor supply. Test again',
    'Rewrite your Day 6 explanation using your own measurements',
    'Read the LiPo safety section in the Adafruit battery guide again. Write 3 rules you will follow in Month 2',
    'Fill in the log, Status, Hours, Confidence'
  ],
  read: [
    ['Why this matters', 'Robotics is the one software field where the bug is sometimes a loose wire, a sagging battery or a motor drawing more current than your regulator can supply, and you will never diagnose those if you do not understand the electrical layer underneath.'],
    ['What to focus on', 'Current draw, and why a motor stalling browns out your microcontroller.\nBattery chemistry basics: LiPo cell counts, C ratings, and why you never leave a LiPo charging unattended.'],
    ['Month 1 Milestone (this one)', 'Explain out loud why a motor stalling can reset your microcontroller.']
  ],
  links: [['SparkFun: How to Use a Multimeter (measuring current)', 'https://learn.sparkfun.com/tutorials/how-to-use-a-multimeter']],
  extra: [
    ['Adafruit: Li-Ion & LiPoly Batteries', 'https://learn.adafruit.com/li-ion-and-lipoly-batteries'],
    ['SparkFun: Electric Power', 'https://learn.sparkfun.com/tutorials/electric-power']
  ],
  video: `
## From theory to proof
@big Day 6: you explained it · Day 20: you measure it
On day six you wrote an explanation of why a stalling motor can reset a microcontroller. Today you prove it with your own measurements. This is one of the most valuable experiments in the whole module, because you will meet this exact failure again and again.
A safety note first: use the kit's small motor and a battery pack or the kit's power module. Hold a stall for one or two seconds only, and always drive the motor through your transistor switch with its flyback diode, never straight from an Uno pin.

## Measure running and stall current
@svg motor | stall = maximum current
Put the multimeter in series with the motor. Start on the ten amp socket if you are unsure, then move to milliamps if the reading is small.
Let the motor spin freely and note the running current. Then pinch the shaft briefly to stop it, and read the peak. You will typically see the stall current several times higher than the running current.
That ratio is the number to remember when you choose a battery, a regulator or a motor driver. You design for the stall, not for the average.

## Provoke the brown-out
\`\`\`cpp
unsigned long n = 0;
void setup() { Serial.begin(9600); Serial.println("BOOT"); }
void loop()  { Serial.println(n++); delay(100); }
\`\`\`
Now power the Uno and the motor from the same weak source, for example a nine volt battery through the power module. Upload this sketch. It prints BOOT once, then counts up every tenth of a second.
Stall the motor. If the counter jumps back to zero and BOOT appears again, the microcontroller has reset. You have just watched a brown-out.
Measure the supply voltage across the battery while stalling, and you will see why: it sags, because a nine volt battery has a high internal resistance.

## Fix it, then prove the fix
| Fix | Why it works |
|---|---|
| separate motor supply, shared GND | motor sag no longer reaches the logic supply |
| big capacitor (e.g. 470 µF) at the motor | supplies the surge so the rail sags less |
| stronger battery, thicker wires | lower internal and wire resistance |
Now fix it, and prove that the fix works. The best fix is a separate supply for the motor, with the grounds connected, so motor current never flows through the logic supply.
A big electrolytic capacitor near the motor helps too, by supplying the starting surge. A battery with lower internal resistance and shorter, thicker wires help as well.
Run the stall test again. The counter should keep counting.

## Your final explanation
@big Stall current → voltage sag → regulator dropout → brown-out reset
Now rewrite your day six explanation with your own numbers in it. For example: the motor runs at one hundred and fifty milliamps and stalls at one amp. The battery sagged from nine volts to six. The regulator dropped out, and the Uno reset.
That paragraph, with real data, is exactly the kind of write-up that shows you understand the electrical layer. And reread the LiPo safety rules: next module, you will be using one.
`,
  key: [
    'Stall current is several times running current; design for the stall.',
    'Shared weak supply + stall → sag → regulator dropout → reset.',
    'Fix with a separate motor supply (shared GND), bulk capacitance, and a stronger battery.',
    'Prove every fix by repeating the test.'
  ],
  quiz: [
    ['Which is the most effective fix for a motor browning out the microcontroller?', ['A smaller resistor on the LED', 'A separate supply for the motor with a shared ground', 'Removing the flyback diode', 'Slowing the serial baud rate'], 1, 'Motor current no longer flows through the logic supply.'],
    ['Your sketch prints BOOT again after a stall. What happened?', ['The code crashed due to a bug', 'The microcontroller reset because its supply browned out', 'The serial monitor reconnected randomly', 'The motor reversed'], 1, 'BOOT only prints in setup(), which runs after a reset.']
  ]
});

D({
  n: 21, icon: '🔁', topic: 'Review', hours: 2, notion: '3f6cdfea8ce28179ad4de594ad6ce9a6', svg: 'solder',
  title: 'Week 3 review + catch-up',
  goal: 'Close gaps from Week 3 and get your write-ups up to date.',
  tasks: [
    'Finish any unfinished task from Days 15–20',
    'Solder one more header strip with no bad joints, as a final check',
    'Add soldering, perfboard switch and motor-stall experiment to your write-up drafts (photo, wiring, what broke)',
    'Record a 1-minute phone video explaining the motor-stall reset with your measured numbers',
    'Update Confidence on Days 15–20'
  ],
  read: [['Reminder', 'That last part is what makes a repo look like engineering instead of a tutorial.']],
  links: [['Adafruit Guide to Excellent Soldering', 'https://learn.adafruit.com/adafruit-guide-excellent-soldering']],
  video: `
## Section 3 in one sentence
@big You can now build hardware that survives | and explain why robots reset
This section took you from never having held an iron to soldering clean joints, removing parts without damage, building a permanent board, and measuring the brown-out that plagues so many robots.
Today is for closing gaps and capturing all of that in your write-ups before the details fade.

## The final soldering check
- One more header strip
- Zero bad joints, zero bridges
- Every pin tested with continuity
Solder one more header strip as a final check. The goal this time is perfection: zero redone joints and zero bridges, every pin tested.
If you manage that, you have met the module milestone: solder a clean through-hole joint and check it electrically.

## Three write-ups to add
| Project | Photo | What broke? |
|---|---|---|
| soldering practice | good vs bad joints | your first cold joint |
| perfboard switch | front and back | anything found before power-on |
| motor-stall experiment | your setup | the reset, with your numbers |
Add three entries to your write-up drafts: the soldering practice, the perfboard switch, and the motor-stall experiment. Each gets a photo, a short wiring description and the what broke paragraph.
For the stall experiment, include your actual measurements: running current, stall current, the voltage sag, and which fix worked.

## The one-minute video
@big Explain it with your numbers, on camera, in under a minute
Finally, record a one-minute phone video explaining the motor-stall reset, using your measured numbers. Show the setup, stall the motor, and explain the chain.
It feels awkward the first time, but a short video of you explaining real hardware is one of the strongest things you can put in a portfolio. And next section, you will set up the GitHub repo where all of this will live.
`,
  key: [
    'A flawless header strip is the soldering milestone.',
    'Every project write-up needs a photo, wiring, and what broke.',
    'A short video explaining real measurements is strong portfolio evidence.'
  ],
  quiz: [
    ['Which numbers should your motor-stall write-up include?', ['Only the motor\'s colour', 'Running current, stall current, voltage sag and the fix that worked', 'Just the battery brand', 'The baud rate'], 1, 'Real measurements turn a story into engineering evidence.'],
    ['What is the soldering milestone for Module 1?', ['Solder a surface-mount chip', 'Solder a clean through-hole joint and check it electrically', 'Build a PCB', 'Solder 1000 joints'], 1, 'Straight from the article\'s milestone list.']
  ]
});
// ───────────── Section 4 · Python, Git and the Module 1 milestone ─────────────
D({
  n: 22, icon: '💻', topic: 'Python & Git', hours: 2.5, notion: '3f6cdfea8ce281c591dcdf163a477ab6', svg: 'git',
  title: 'Terminal + toolchain + course repo · ORDER Month 2 gear',
  goal: 'A working Linux terminal, Python, Git and VS Code, and one GitHub repo for the whole course.',
  order: 'Order Module 2 gear today. On the Gear tab, Module 2: ESP32-S3, TB6612FNG drivers, Pololu encoder gearmotors, MPU-6050, distance sensors, line-follower chassis + sensors, LiPo + charger. Shipping takes days to weeks. Set each item to "Ordered".',
  article: '⏩ You already code daily. Skim CS50P / Python for Everybody only for gaps. Spend the saved time on Ubuntu setup — Module 4 (ROS 2 Jazzy) needs Ubuntu 24.04.',
  tasks: [
    '**Order Month 2 gear** (see the ordering box above)',
    'Read the article section in the reading lesson',
    'Set up a Linux terminal: Ubuntu 24.04 (dual-boot, preferred for ROS 2 later) or WSL2',
    'Skim Missing Semester lecture 1 (The Shell). Do its exercises if any command is new to you: cd, ls, grep, env vars, ssh',
    'Install / verify: python3, python3-venv, git, VS Code. Run `python3 --version` and `git --version`',
    'Create a GitHub repo `robotics-6mo` with folders: `month-1/`, `notes/`, `media/`, and a top-level README',
    'Push the first commit from the terminal',
    'Mark the software rows as "Got it / installed" on the Gear tab',
    'Fill in the log, Status, Hours, Confidence'
  ],
  read: [
    ['4. Python, the terminal and Git', 'You will use all three every single week from here to month six, so get them out of the way now.'],
    ['What to focus on', 'Python: functions, classes, file I/O, JSON, virtual environments, pip.\nTerminal: cd, ls, grep, running scripts, environment variables, ssh.\nGit: init, add, commit, push, branches, and writing a README someone can follow.']
  ],
  links: [
    ['CS50P: Introduction to Programming with Python', 'https://cs50.harvard.edu/python/'],
    ['Python for Everybody (Coursera)', 'https://www.coursera.org/specializations/python'],
    ['The Missing Semester of Your CS Education (MIT)', 'https://missing.csail.mit.edu/'],
    ['Learn Git Branching', 'https://learngitbranching.js.org/']
  ],
  extra: [
    ['Missing Semester — Lecture 1: The Shell', 'https://missing.csail.mit.edu/2020/course-shell/'],
    ['Ubuntu Desktop download', 'https://ubuntu.com/download/desktop'],
    ['Pro Git book (free)', 'https://git-scm.com/book/en/v2']
  ],
  video: `
## Two jobs today
- Order Module 2 gear (it takes days to weeks)
- Set up the software toolchain you will use until Module 6
Today has two jobs. First, the ordering rule: day twenty-two of every module is when you order the next module's gear. Module 2 is where robots start moving, so the list is longer: an ESP32 board, motor drivers, gearmotors with encoders, an IMU, distance sensors, a line-follower chassis and a LiPo with a charger. Order it now, then mark each item as ordered on the Gear tab.
Second, the toolchain. You already code, so this is mostly setup, but it is setup you will rely on every week from here to the end.

## Why Ubuntu, and why now
@big Module 4 runs ROS 2 Jazzy on Ubuntu 24.04 | set it up now, not the night before
In Module 4 you will use ROS 2 Jazzy, the robot software framework, and it targets Ubuntu 24.04. You can get by with WSL2 on Windows, but simulation with a graphical interface is slower there.
The plan suggests dual-booting Ubuntu if you can, with at least fifty gigabytes free. Doing it now, calmly, beats discovering driver problems the day you need ROS.

## The terminal commands that matter
| Command | What it does |
|---|---|
| cd, ls, pwd | move around and look |
| grep pattern file | search inside files |
| python3 script.py | run a script |
| export NAME=value | set an environment variable |
| ssh user@host | log into another machine (like a robot) |
The article lists the terminal skills you need: moving around with cd and ls, searching with grep, running scripts, environment variables and ssh.
Environment variables matter because ROS uses them heavily. Ssh matters because many robots have no screen, so you log into them over the network.
If any of these are new, do the exercises from the first Missing Semester lecture. If they are familiar, skip ahead.

## One repo for the whole course
\`\`\`bash
mkdir robotics-6mo && cd robotics-6mo
mkdir month-1 notes media
echo "# Robotics in 6 Months" > README.md
git init && git add . && git commit -m "Start the course repo"
git remote add origin git@github.com:<you>/robotics-6mo.git
git push -u origin main
\`\`\`
Create one GitHub repository for the whole course, called something like robotics dash six m o, with folders for each module, notes and media.
One repo makes your progress visible in one place. Six months from now, its commit history alone tells the story of what you learned.
Make the first commit and push it from the terminal, not the website. You will be doing that hundreds of times.

## Virtual environments
@eq python3 -m venv .venv && source .venv/bin/activate | one venv per project
Install python3 dash venv too. A virtual environment gives each project its own private set of Python packages, so a library you install for one project cannot break another.
You will create one tomorrow for your electronics calculator. The habit matters even more later, when ROS, machine learning libraries and simulation tools all want different versions of the same packages.
`,
  key: [
    'Day 22 of each module: order the next module\'s gear.',
    'Ubuntu 24.04 now saves pain in Module 4 (ROS 2 Jazzy).',
    'Know cd, ls, grep, running scripts, env vars and ssh.',
    'One GitHub repo for the whole course; push from the terminal; one venv per project.'
  ],
  quiz: [
    ['Why set up Ubuntu 24.04 during Module 1?', ['It is required for Arduino', 'Module 4 uses ROS 2 Jazzy, which targets Ubuntu 24.04', 'Python only runs on Ubuntu', 'GitHub requires it'], 1, 'Do the OS setup calmly now, not the day ROS is needed.'],
    ['What does a Python virtual environment give you?', ['Faster Python', 'A private set of packages per project', 'Free cloud hosting', 'Automatic Git commits'], 1, 'Projects cannot break each other\'s dependencies.']
  ]
});

D({
  n: 23, icon: '🐍', topic: 'Python & Git', hours: 2.5, notion: '3f6cdfea8ce281e9a9dbce7e508599e5', svg: 'git',
  title: 'Python tool: your electronics calculator',
  goal: 'A small Python CLI that does the calculations you did by hand this month, run from the terminal inside a venv.',
  tasks: [
    'Create a venv in `month-1/ecalc/` and activate it',
    'Write `ecalc.py` with subcommands: `ohms` (any two of V, I, R → the third), `divider` (Vin, R1, R2 → Vout), `led` (Vsupply, Vf, I → R and power), `colour` (bands → value)',
    'Use `argparse`, functions, and save a history of results to a JSON file',
    'Check it against your Day 1–5 hand results',
    'Write a short README for it (usage examples)',
    'Commit and push',
    'Fill in the log, Status, Hours, Confidence'
  ],
  read: [
    ['What to focus on', 'Python: functions, classes, file I/O, JSON, virtual environments, pip.'],
    ['Month 1 Milestone (this one)', 'Write a Python script, run it from the terminal, and push it to GitHub.']
  ],
  links: [['CS50P: Introduction to Programming with Python', 'https://cs50.harvard.edu/python/']],
  extra: [
    ['Python docs: argparse tutorial', 'https://docs.python.org/3/howto/argparse.html'],
    ['Python docs: venv', 'https://docs.python.org/3/library/venv.html'],
    ['Python docs: json', 'https://docs.python.org/3/library/json.html']
  ],
  video: `
## Automate what you did by hand
@big Every calculation from Days 1–5, in one command-line tool
All month you have calculated Ohm's law, dividers, LED resistors and colour codes by hand. Today you turn those into a small Python command-line tool.
It is a perfect first project: you already know the correct answers, so testing it is easy, and it exercises every Python skill on the article's list: functions, file input and output, JSON and virtual environments.

## The design
| Subcommand | Inputs | Output |
|---|---|---|
| ohms | any two of V, I, R | the third |
| divider | Vin, R1, R2 | Vout |
| led | Vsupply, Vf, I | R and its power |
| colour | band colours | resistance value |
Plan the interface before writing code. Four subcommands: ohms, divider, led and colour.
Ohms takes any two of voltage, current and resistance and returns the third. Divider takes the input voltage and two resistors. Led takes the supply, the LED's forward voltage and the target current, and returns the resistor and the power it dissipates. Colour takes band names and returns the value.

## argparse subcommands
\`\`\`python
import argparse
def ohms(v=None, i=None, r=None):
    if v is None: return i * r
    if i is None: return v / r
    return v / i
p = argparse.ArgumentParser(prog="ecalc")
sub = p.add_subparsers(dest="cmd", required=True)
o = sub.add_parser("ohms")
o.add_argument("-v", type=float); o.add_argument("-i", type=float); o.add_argument("-r", type=float)
args = p.parse_args()
\`\`\`
The argparse module from the standard library handles subcommands, flags and help text for you.
Keep the maths in plain functions, separate from argument parsing. That way you can test the functions directly, and later reuse them in other scripts.

## Save a history as JSON
\`\`\`python
import json, pathlib, datetime
HIST = pathlib.Path("history.json")
def log(entry):
    data = json.loads(HIST.read_text()) if HIST.exists() else []
    entry["at"] = datetime.datetime.now().isoformat(timespec="seconds")
    data.append(entry)
    HIST.write_text(json.dumps(data, indent=2))
\`\`\`
Add a simple history: every result gets appended to a JSON file with a timestamp. That covers file input and output and JSON in a few lines.
JSON is worth getting comfortable with now. Robot configurations, sensor logs, and dataset metadata later in the course are often JSON.

## Test against your own hand results
- 9 V across 1 kΩ → 9 mA
- 9 V, 10 kΩ / 4.7 kΩ → about 2.88 V
- 5 V, red LED, 15 mA → 200 Ω
Finally, check the tool against your own answers from days one to five. Nine volts across one kilo-ohm should give nine milliamps. Your divider should give about two point eight eight volts.
If they match, write a short README with usage examples, then commit and push. That completes another milestone item: write a Python script, run it from the terminal, and push it to GitHub.
`,
  key: [
    'Plan the CLI interface first: subcommands, inputs, outputs.',
    'Keep maths in plain functions, separate from argparse, so it is testable.',
    'Append results with timestamps to a JSON history file.',
    'Verify against known hand-calculated answers, then commit and push.'
  ],
  quiz: [
    ['Why keep the calculation functions separate from the argparse code?', ['argparse is slow', 'So the maths can be tested and reused independently', 'Python requires it', 'To reduce file size'], 1, 'Separation makes functions testable and reusable.'],
    ['Which Module 1 milestone does this day complete?', ['Solder a clean joint', 'Write a Python script, run it from the terminal, and push it to GitHub', 'Find a short with a meter', 'Explain a brown-out'], 1, 'Straight from the milestone list.']
  ]
});

D({
  n: 24, icon: '🌿', topic: 'Python & Git', hours: 2, notion: '3f6cdfea8ce28163b72ecae40647ab92', svg: 'git',
  title: 'Git branches and merges',
  goal: 'Be comfortable with branches, merges and conflicts, because every robot project from Month 2 will use them.',
  tasks: [
    'Do the Learn Git Branching "Main" levels 1–4 (skip the ones you already know)',
    'In your repo: create branch `feature/capacitor-calc`, add an `rc` subcommand (τ = R × C) to `ecalc.py`, commit, merge to main',
    'Create a deliberate merge conflict (edit the same README line on two branches). Resolve it',
    'Add a `.gitignore` (venv, `__pycache__`, large media)',
    'Push',
    'Fill in the log, Status, Hours, Confidence'
  ],
  read: [
    ['Resource note', 'Learn Git Branching (free, interactive).\nThe best visual tool for understanding branches and merges, which is the part of Git that confuses everyone.']
  ],
  links: [['Learn Git Branching', 'https://learngitbranching.js.org/']],
  extra: [
    ['Pro Git — Git Branching chapter', 'https://git-scm.com/book/en/v2'],
    ['GitHub Docs: Ignoring files', 'https://docs.github.com/en/get-started/getting-started-with-git/ignoring-files']
  ],
  video: `
## Why branches matter for robots
@svg git | main always works; experiments live on branches
Robot code has a special property: when it is broken, hardware moves in unexpected ways. So you want a version that always works, and a safe place to experiment.
That is exactly what branches give you. Main stays working. Every new feature, a new controller, a new sensor driver, gets its own branch. If the experiment fails, you throw the branch away. If it works, you merge it.

## The mental model
- A commit is a snapshot of the whole project
- A branch is just a movable label pointing at a commit
- Merging joins two lines of history
The confusing part of Git becomes simple once you see it right. A commit is a snapshot of your whole project at a moment. Each commit points to its parent, so history is a chain.
A branch is nothing more than a movable label that points at one commit. When you commit on a branch, the label moves forward.
Learn Git Branching shows exactly this as an animated graph, which is why the article recommends it. Do the first four main levels today.

## Feature branch workflow
\`\`\`bash
git switch -c feature/capacitor-calc
# add the rc subcommand to ecalc.py
git add ecalc.py && git commit -m "Add RC time-constant subcommand"
git switch main
git merge feature/capacitor-calc
git push
\`\`\`
Here is the workflow you will use from now on. Create a branch named after the feature, for example feature slash capacitor calc. Add the R C time constant subcommand to your calculator and commit.
Switch back to main and merge the branch in. Because main has not changed meanwhile, Git simply moves the main label forward. That is called a fast-forward merge.

## Merge conflicts are normal
\`\`\`text
<<<<<<< HEAD
Usage: ecalc ohms -v 9 -r 1000
=======
Usage: python ecalc.py ohms -v 9 -r 1000
>>>>>>> feature/readme
\`\`\`
A conflict happens when two branches change the same line in different ways. Git cannot guess which you want, so it marks both versions in the file and asks you.
Today you will cause one on purpose by editing the same README line on two branches. Open the file, keep the version you want, delete the markers, then add and commit.
Doing it deliberately, in a calm moment, takes all the fear out of it for the day it happens for real.

## .gitignore: keep junk out
| Ignore | Why |
|---|---|
| .venv/ | huge, and rebuilt from requirements |
| __pycache__/ | generated by Python |
| large videos | keep the repo fast; link or compress instead |
Finally, add a dot gitignore file. List your virtual environment folder, Python's generated cache folders, and large media.
A repo full of generated files is slow to clone and hard to read. Keep it to source code, documentation and small photos.
`,
  key: [
    'A branch is a movable label on a commit; main should always work.',
    'Use feature branches, then merge into main.',
    'A conflict means two branches changed the same line: pick, remove markers, commit.',
    'Ignore venvs, caches and big media with .gitignore.'
  ],
  quiz: [
    ['What is a Git branch, technically?', ['A full copy of the repository', 'A movable label pointing at a commit', 'A backup on GitHub', 'A folder in the project'], 1, 'Branches are lightweight pointers to commits.'],
    ['When does a merge conflict happen?', ['Every time you merge', 'When two branches change the same lines differently', 'When you forget to push', 'When .gitignore is missing'], 1, 'Git cannot choose between two edits to the same line.']
  ]
});

D({
  n: 25, icon: '📸', topic: 'Python & Git', hours: 3, notion: '3f6cdfea8ce281e5b28cf11a564eff2d', svg: 'git',
  title: 'Portfolio READMEs: what broke and how I fixed it',
  goal: 'Turn Month 1 into a GitHub folder that looks like engineering, not a tutorial.',
  tasks: [
    'Create one folder per project under `month-1/`: `voltage-divider/`, `transistor-switch/` (breadboard + perfboard), `fault-finding/`, `soldering/`, `motor-stall/`, `ecalc/`',
    'For each README: a photo at the top, a wiring description (or schematic image from Falstad/Tinkercad), the numbers you measured, and a section titled **"What broke and how I fixed it"**',
    'Upload photos to `media/` (keep files small)',
    'Link all project READMEs from `month-1/README.md`',
    'Commit and push',
    'Fill in the log, Status, Hours, Confidence'
  ],
  read: [
    ['Practice task (Python, terminal and Git)', 'Practice task: from today, every project you build lives in a GitHub repo with a README that has a photo, a wiring description and a one-paragraph explanation of what broke and how you fixed it. That last part is what makes a repo look like engineering instead of a tutorial.']
  ],
  links: [['Learn Git Branching', 'https://learngitbranching.js.org/']],
  extra: [
    ['GitHub Docs: About READMEs', 'https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes'],
    ['GitHub Docs: Basic writing and formatting syntax', 'https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax']
  ],
  video: `
## Your portfolio starts today
@big Engineering, not a tutorial | photo · wiring · numbers · what broke
Today your Module 1 work becomes a public portfolio. When someone, a recruiter, a collaborator or a future you, opens your GitHub, they should see evidence that you build things, measure them, and fix them when they fail.
The difference between a tutorial and engineering is that last part. Tutorials only show the happy path. Engineering shows what went wrong and how you found it.

## One folder per project
| Folder | Contents |
|---|---|
| voltage-divider/ | calculated vs simulated vs measured |
| transistor-switch/ | breadboard and perfboard versions |
| fault-finding/ | your fault table and timings |
| soldering/ | good vs bad joint photos |
| motor-stall/ | currents, voltage sag, the fix, video |
| ecalc/ | the Python tool and usage |
Create one folder per project under month one, each with its own README. Then a month-one README at the top that links to all of them, so a visitor can navigate.
Six small, complete project pages are much stronger than one giant page.

## The anatomy of a strong README
1. A photo at the very top
2. What it is, in one sentence
3. Wiring: description or schematic image
4. Numbers you measured
5. What broke and how I fixed it
Start with a photo, because people decide in seconds whether to keep reading. Then one sentence on what the project is.
Next the wiring: a short description or a schematic screenshot from Falstad or Tinkercad, enough that someone could rebuild it.
Then the numbers you measured. Real data, like nine point oh two volts measured against nine volts calculated, shows you actually built it.
And finally the section titled what broke and how I fixed it.

## Writing the what-broke paragraph
@big Symptom → what I measured → cause → fix → what I learned
Write the what-broke paragraph as a tiny story. The symptom: the LED stayed off. What you measured: the base was at zero point seven volts but the collector stayed at five. The cause: the transistor pins were reversed. The fix: checked the datasheet and flipped it. What you learned: always check pinouts.
Five sentences like that tell a reader more about your ability than any list of skills ever could.

## Keep it tidy
- Compress photos: a few hundred kilobytes each
- Store them in media/ and link with relative paths
- Commit, push, and open it on GitHub to check
Keep photos small, a few hundred kilobytes, so the repo stays fast. Store them in the media folder and link them with relative paths.
Then commit, push, and open the repo in a browser to check how it actually looks. Fix anything broken. From now on, every project in this course ends with a README like this.
`,
  key: [
    'One folder and README per project, linked from a module README.',
    'README order: photo, one-line summary, wiring, measured numbers, what broke.',
    'Tell the what-broke story: symptom, measurement, cause, fix, lesson.',
    'Keep photos small and check the rendered page on GitHub.'
  ],
  quiz: [
    ['What should come first in a project README?', ['A long installation guide', 'A photo of the project', 'The licence', 'A list of every tool used'], 1, 'Readers decide in seconds; lead with the photo.'],
    ['Which is the best "what broke" paragraph structure?', ['A list of parts', 'Symptom → measurement → cause → fix → lesson', 'Only the final working code', 'A link to a tutorial'], 1, 'It shows how you think when things fail.']
  ]
});

D({
  n: 26, icon: '🧪', topic: 'Milestone', hours: 2.5, notion: '3f6cdfea8ce2814dbe3ee48b10222698', svg: 'robot',
  title: 'Milestone test, part 1 (no notes)',
  goal: 'Prove the first three milestone items without looking anything up.',
  tasks: [
    '**Schematic → breadboard:** pick a circuit from the kit PDF you have not built yet. Build it from the schematic only. It must work first time or you must find the fault yourself',
    '**Resistor check:** for 5 made-up cases (LED on 3.3 V, LED on 12 V, divider to 3.3 V, base resistor, pull-up), calculate the value and the power, and pick a real resistor value',
    '**Fault finding:** have someone hide 2 faults in that circuit, or use your shuffled-paper method. Find both with the meter',
    'Write which items passed and which need more work',
    'Fill in the log, Status, Hours, Confidence'
  ],
  read: [
    ['Month 1 Milestone', 'By the end of this month you should be able to:\n\nRead a schematic and build the circuit it describes on a breadboard.\nCalculate whether a resistor value is right before you plug it in.\nFind a short, a break or a dead component with a multimeter.\nSolder a clean through-hole joint and check it electrically.\nWrite a Python script, run it from the terminal, and push it to GitHub.\nExplain out loud why a motor stalling can reset your microcontroller.']
  ],
  links: [
    ['Elegoo kit page (lesson PDF)', 'https://www.elegoo.com/products/elegoo-uno-r3-super-starter-kit'],
    ['All About Circuits textbook', 'https://www.allaboutcircuits.com/textbook/']
  ],
  video: `
## Milestone days: the honest test
@big No notes · no videos · no searching | just you, the bench and the meter
The last days of each module are milestone tests. The article lists six things you should be able to do by the end of Module 1. Today you test the first three, with no notes, no videos and no searching.
This is not an exam you can fail. It is a measurement. Whatever you cannot do yet, you now know exactly what to practise tomorrow.

## Test 1: schematic to working circuit
- Pick a kit circuit you have never built
- Use only its schematic, not the wiring picture
- It works first time, or you find the fault yourself
Pick a circuit from the kit's lesson PDF that you have not built yet. Cover the breadboard wiring picture and use only the schematic.
Build it. If it works first time, excellent. If it does not, that is fine too, as long as you find the fault yourself with the meter. Both outcomes pass the milestone, because the skill is reading the schematic and making the circuit work.

## Test 2: five resistor calculations
| Case | What to find |
|---|---|
| LED on 3.3 V | R and its power |
| LED on 12 V | R and its power (it gets warm!) |
| divider: 5 V → 3.3 V | R1 and R2 |
| base resistor from 3.3 V | R for 1–2 mA |
| pull-up | a sensible value and why |
Next, five made-up resistor problems. For each, calculate the value, the power it dissipates, and then pick a real standard value.
Pay attention to power on the twelve volt LED. Ten volts across the resistor at fifteen milliamps is zero point one five watts, which is more than half the rating of a common quarter-watt resistor. That kind of check, before you plug something in, is the milestone skill.

## Test 3: find two hidden faults
@svg meter | symptom → hypothesis → measurement → cause
Finally, have someone hide two faults in your new circuit, or use the shuffled-cards method from day thirteen.
Find both with the meter, using the loop: symptom, hypothesis, one measurement, conclusion. Time yourself and compare with day thirteen.

## Write down the result honestly
- Passed: …
- Needs work: …
- Tomorrow: redo whatever failed
End by writing two lists: what passed, and what needs work. Be honest. A skipped weakness now becomes a mystery bug in Module 2.
Tomorrow you test the other three milestone items, and redo anything that failed today.
`,
  key: [
    'Milestone tests are measurements, not exams: they show what to practise.',
    'Build from the schematic only; finding your own fault still passes.',
    'Always check resistor power, not just the value.',
    'Record passed vs needs-work honestly.'
  ],
  quiz: [
    ['An LED on 12 V with 15 mA: the resistor drops about 10 V. Roughly what power does it dissipate?', ['0.015 W', '0.15 W', '1.5 W', '15 W'], 1, 'P = V × I = 10 × 0.015 = 0.15 W, more than half a ¼ W rating.'],
    ['Your schematic-only build does not work first time, but you find and fix the fault with the meter. Did you pass?', ['No, it had to work first time', 'Yes: reading the schematic and making it work is the skill', 'Only if it took under 5 minutes', 'Only with notes'], 1, 'Finding your own fault is part of the milestone.']
  ]
});

D({
  n: 27, icon: '🎙️', topic: 'Milestone', hours: 2.5, notion: '3f6cdfea8ce28110bad0d82e3aaba595', svg: 'robot',
  title: 'Milestone test, part 2 + fix gaps',
  goal: 'Prove the last three milestone items and fix whatever failed yesterday.',
  tasks: [
    '**Solder:** one clean joint set (a header strip), checked with continuity',
    '**Python → GitHub:** add one new feature to `ecalc.py` from the terminal, commit and push it in under 20 minutes',
    '**Explain out loud:** record a 2-minute video explaining why a motor stall resets the microcontroller, using your Day 20 numbers. Add it to the motor-stall README',
    'Redo any item that failed on Day 26',
    'Fill in the log, Status, Hours, Confidence'
  ],
  read: [
    ['Month 1 Milestone (these ones)', 'Solder a clean through-hole joint and check it electrically.\nWrite a Python script, run it from the terminal, and push it to GitHub.\nExplain out loud why a motor stalling can reset your microcontroller.']
  ],
  links: [['Adafruit Guide to Excellent Soldering', 'https://learn.adafruit.com/adafruit-guide-excellent-soldering']],
  video: `
## The second half of the milestone
| Item | Test today |
|---|---|
| Solder a clean joint, check it | one header strip, every pin tested |
| Python script → terminal → GitHub | one new ecalc feature in 20 minutes |
| Explain the motor-stall reset | a 2-minute video with your numbers |
Yesterday covered building, calculating and fault-finding. Today covers the other three milestone items: soldering, the Python-to-GitHub loop, and explaining the brown-out out loud.
Then you use the rest of the session to redo anything that failed yesterday.

## Solder: one clean header strip
- Breadboard jig, one end pin each side first
- Every joint a shiny volcano
- Every pin beeps to its pad; no neighbours beep
Solder one header strip using everything you learned: the breadboard jig, end pins first, one or two seconds per joint, flux when needed.
Then test every pin to its pad, and every pair of neighbours for bridges. Zero faults is a pass.

## Python to GitHub in 20 minutes
\`\`\`bash
git switch -c feature/power
# add: ecalc power -v 5 -i 0.02  →  0.1 W
python3 ecalc.py power -v 5 -i 0.02
git commit -am "Add power subcommand" && git switch main
git merge feature/power && git push
\`\`\`
Next, start a twenty minute timer. Add one new feature to your calculator, for example a power subcommand that multiplies voltage and current. Do it on a branch, test it from the terminal, merge it and push.
The point is fluency. The whole loop of edit, run, commit, merge and push should feel routine now, because you will do it every day from here on.

## Explain it on camera
@big Stall current → voltage sag → regulator dropout → brown-out reset | with YOUR numbers
Finally, record a two-minute video explaining why a motor stall resets the microcontroller, using your measurements from day twenty.
Show the setup. Say the running current and the stall current. Show or state the voltage sag. Explain the regulator dropping out and the brown-out reset. Then show your fix working.
Add the video, or a link to it, to the motor-stall README. If you can explain it clearly in two minutes, you understand it deeply.

## Redo what failed
- Anything from yesterday's needs-work list
- Repeat until it passes
- Then tick the milestone in your log
Spend the remaining time on yesterday's needs-work list. Repeat each item until it passes.
When all six milestone items pass, you have genuinely completed Module 1. Tomorrow is the retro, and then the robots start moving.
`,
  key: [
    'A clean header strip, fully tested, is the soldering milestone.',
    'The edit → run → branch → merge → push loop should feel routine.',
    'Explaining the brown-out with your own numbers proves understanding.',
    'Redo failed items until all six milestone items pass.'
  ],
  quiz: [
    ['What makes your brown-out explanation convincing?', ['Reading it from a textbook', 'Using your own measured currents and voltage sag', 'Making the video longer', 'Avoiding numbers'], 1, 'Real measurements show you did and understood the experiment.'],
    ['How many Module 1 milestone items are there in the article?', ['Three', 'Four', 'Six', 'Ten'], 2, 'Build, calculate, find faults, solder, Python→GitHub, explain the stall.']
  ]
});

D({
  n: 28, icon: '🏁', topic: 'Review', hours: 1.5, notion: '3f6cdfea8ce2818baf0bccd306df1868', svg: 'sensethinkact',
  title: 'Month 1 retro + get ready for Month 2',
  goal: 'Close Month 1 properly and make sure Month 2 does not start with a shipping delay.',
  tasks: [
    'Tick the Module 1 milestone checklist in your notes. Mark Milestone met if all six passed',
    'Write the Module 1 retro (what went well, what was hard, what to change)',
    'Review all 28 days on the Schedule tab: anything still "Not started" or "Stuck"? Decide: redo or skip on purpose (set "Skipped")',
    'Read the Module 2 preview in the reading lesson',
    'Check every Module 2 item ordered on Day 22 has shipped. Chase anything missing',
    'Fill in the log, Status, Hours, Confidence'
  ],
  read: [
    ['Month 2 preview', 'Your goal this month: build a robot that moves, senses its environment, and corrects itself.\n\nThis is the month robotics stops being theory, and it is also the month where most of the fundamental skills of the whole field first appear in miniature.']
  ],
  links: [['Notion: Months database', 'https://www.notion.so/8c015c05f2fe44519255127f7e066226']],
  video: `
## Module 1 is done
@big From Ohm's law to a soldered board and a working toolchain
Four weeks ago you started with Ohm's law in a simulator. Since then you have read schematics, built circuits on a breadboard, found faults with a meter, soldered permanent boards, measured a brown-out, written a Python tool and started a public portfolio.
Today you close the module properly, with a retro, and make sure Module 2 can start on time.

## The retro: three questions
1. What went well?
2. What was hard?
3. What will I change next module?
A retro is three short questions. What went well? What was hard? What will you change?
Be specific. Not "soldering was hard", but "my first joints were cold because I melted solder on the iron; flux fixed it". Not "I fell behind", but "review days saved me; I will protect them".
Your answers to the third question are the most valuable part. They are your personal improvements for the next five modules.

## Keep progress honest
| Status | What to do |
|---|---|
| Not started | do it now, or skip on purpose |
| Stuck | write what blocks you; ask for help |
| Skipped | fine, if it was a deliberate choice |
Open the Schedule tab and look at all twenty-eight days. Anything still not started or stuck needs a decision: redo it, or mark it skipped on purpose.
Skipping is allowed. Pretending is not. An honest progress bar is worth far more than a full one.

## Get ready for Module 2
@svg sensethinkact | Module 2: a robot that moves, senses and corrects itself
Module 2's goal is to build a robot that moves, senses its environment and corrects itself. The article calls it the month robotics stops being theory.
You will program microcontrollers, drive motors with real drivers, read encoders and IMUs, filter noisy sensors, and close your first control loops on a line follower and a self-balancing robot.
Before that can happen, the parts must arrive. Check every Module 2 order from day twenty-two. Chase anything that has not shipped.

## One sentence
@big What can I do now that I could not do four weeks ago?
Finish with one sentence in your log: what can you do now that you could not do four weeks ago?
Keep that sentence. On hard days in later modules, read it again. Then, when you are ready, start Module 2.
`,
  key: [
    'A retro answers: what went well, what was hard, what will I change.',
    'Mark unfinished days as redo or deliberately Skipped: keep progress honest.',
    'Module 2 goal: a robot that moves, senses and corrects itself.',
    'Check that Module 2 gear has shipped before you start.'
  ],
  quiz: [
    ['What should you do with a day that is still "Not started" at the end of the module?', ['Mark it Done anyway', 'Redo it, or mark it Skipped on purpose', 'Delete it', 'Ignore it'], 1, 'Honest progress beats a full progress bar.'],
    ['What is the goal of Module 2?', ['Design parts in CAD', 'Build a robot that moves, senses its environment, and corrects itself', 'Install ROS 2', 'Train a neural network'], 1, 'From the Month 2 preview in the article.']
  ]
});
// @@END
