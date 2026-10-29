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
