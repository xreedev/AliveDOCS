/* Module 2 · Microcontrollers, motors, sensors & first robots (days 29–56). Source: Notion Daily Plan. */

// ───────────── Section 1 · Arduino and microcontroller basics ─────────────
D({
  n: 29, icon: '〰️', topic: 'Microcontrollers', hours: 2.5, notion: '3f6cdfea8ce281b4ae71cfdd7087e8ff', svg: 'pwm',
  title: 'Arduino IO and what PWM really is',
  goal: 'Use digitalWrite, digitalRead, analogRead and analogWrite, and explain PWM as duty cycle, not "analog voltage".',
  tasks: [
    'Read the Month 2 intro and the Arduino section in the reading lesson',
    'Pick a pace: Paul McWhorter lessons (slow, homework) or the built-in examples (fast). You already code, so the examples are usually enough',
    'Run built-in examples **AnalogReadSerial** and **Fade**',
    'Build: potentiometer → analogRead → map → analogWrite LED brightness',
    'Measure the PWM pin with the multimeter at 25%, 50%, 75% duty. Explain why the meter shows an average',
    'Read SparkFun: Pulse Width Modulation',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['Month 2 goal', 'Your goal this month: build a robot that moves, senses its environment, and corrects itself.\n\nThis is the month robotics stops being theory, and it is also the month where most of the fundamental skills of the whole field first appear in miniature.\n\nA line-following robot is a closed control loop with sensor input, actuator output and a tuning problem, which is exactly what a humanoid is, only smaller and cheaper to break.'],
    ['1. Arduino', 'Start on Arduino rather than ESP32, because the ecosystem is enormous and every tutorial in existence targets it.\n\nYou will move to ESP32 within weeks, and nothing you learn here is wasted.'],
    ['What to focus on', 'digitalWrite, digitalRead, analogRead and analogWrite, and what PWM actually is.']
  ],
  links: [
    ['Paul McWhorter, Arduino Lessons', 'https://toptechboy.com/arduino-lessons/'],
    ['Arduino Built-in Examples', 'https://docs.arduino.cc/built-in-examples/'],
    ['Arduino Official Docs, Learn section', 'https://docs.arduino.cc/learn/']
  ],
  extra: [
    ['SparkFun: Pulse Width Modulation', 'https://learn.sparkfun.com/tutorials/pulse-width-modulation'],
    ['SparkFun: Analog to Digital Conversion', 'https://learn.sparkfun.com/tutorials/analog-to-digital-conversion']
  ],
  video: `
## Module 2: robots that move
@svg sensethinkact | a line follower is the same loop as a humanoid
Welcome to the module where robotics stops being theory. By the end of it you will have a robot that moves, senses its environment and corrects itself.
The article makes a lovely point: a line-following robot is a closed control loop with sensor input, actuator output and a tuning problem, which is exactly what a humanoid is, only smaller and cheaper to break.
Everything starts with the microcontroller's four basic input and output functions.

## The four functions
| Function | Direction | Values |
|---|---|---|
| digitalWrite(pin, v) | output | HIGH or LOW |
| digitalRead(pin) | input | HIGH or LOW |
| analogRead(pin) | input | 0 to 1023 on an Uno |
| analogWrite(pin, v) | output (PWM) | 0 to 255 duty |
Digital write sets a pin high or low. Digital read tells you whether a pin is high or low, like the button from Module 1.
Analog read measures a voltage between zero and the supply. On an Uno it returns a number from zero to one thousand and twenty-three, because the converter has ten bits.
Analog write is the one with the misleading name. It does not output an analog voltage at all.

## analogRead: from voltage to number
@eq value = V_in ÷ 5 V × 1023 | 2.5 V → about 512
Analog read uses an analog to digital converter. With a five volt reference, zero volts reads zero, five volts reads one thousand and twenty-three, and two and a half volts reads about five hundred and twelve.
Connect a potentiometer as a voltage divider, with its wiper to an analog pin, and turning the knob sweeps smoothly through that range. That is your first real sensor reading this module.

## PWM: what analogWrite really does
@svg pwm | same voltage, different ON-time → average power
Here is the key idea. Analog write switches the pin fully on and fully off, very fast, about five hundred times a second on most Uno pins. What changes is the fraction of each cycle that the pin is on. That fraction is the duty cycle.
At twenty-five percent duty, the pin is on a quarter of the time. At seventy-five percent, three quarters. An LED or a motor cannot follow such fast switching, so it responds to the average: the LED looks dimmer, the motor runs slower.
This is called pulse width modulation, and it is how every robot controls motor speed.

## Why the meter shows an average
- The meter samples slowly, so it averages the pulses
- 5 V × 25% ≈ 1.25 V on the display
- An oscilloscope would show the real square wave
Today you will measure the PWM pin with your multimeter at twenty-five, fifty and seventy-five percent. You will read roughly one point two five, two point five and three point seven five volts.
The pin never actually sits at those voltages. The meter is simply too slow to see the pulses, so it shows their average. That is a great example of a measurement that is technically right but easy to misinterpret.

## Pot to LED brightness
\`\`\`cpp
void loop() {
  int raw = analogRead(A0);              // 0..1023
  int duty = map(raw, 0, 1023, 0, 255);  // 0..255
  analogWrite(9, duty);                  // PWM pin
}
\`\`\`
Put it together: read the potentiometer, use map to scale zero to one thousand and twenty-three into zero to two hundred and fifty-five, and write that duty cycle to a PWM pin with an LED.
Turning the knob now fades the LED smoothly. Sensor in, decision, actuator out. It is the smallest possible version of the robot loop, and you just built it.
`,
  key: [
    'analogRead returns 0–1023 on an Uno (10-bit ADC).',
    'analogWrite is PWM: fast on/off switching with a variable duty cycle, not a true analog voltage.',
    'Motors and LEDs respond to the average of the PWM signal.',
    'A slow multimeter shows the average voltage of a PWM pin.'
  ],
  quiz: [
    ['What does analogWrite(9, 128) actually do on an Uno?', ['Outputs a steady 2.5 V', 'Switches pin 9 on and off with about 50% duty cycle', 'Reads a voltage on pin 9', 'Sets pin 9 to 128 mA'], 1, 'It is PWM, not a real analog voltage.'],
    ['With a 5 V reference, roughly what does analogRead return for 2.5 V?', ['128', '255', 'About 512', '1023'], 2, '2.5 ÷ 5 × 1023 ≈ 512.']
  ]
});

D({
  n: 30, icon: '⏱️', topic: 'Microcontrollers', hours: 2.5, notion: '3f6cdfea8ce2813c807be7a3d158f1f3', svg: 'pwm',
  title: 'Serial debugging + millis() instead of delay()',
  goal: 'Never use delay() in a robot again. Run several tasks at different rates with millis(), and debug with Serial and the Serial Plotter.',
  tasks: [
    'Run **BlinkWithoutDelay**. Read every line of it',
    'Build: 3 LEDs blinking at 200 ms, 450 ms and 1 s at the same time, plus a button that is always responsive',
    'Rewrite the same with delay() and see the button become unresponsive. Note it',
    'Print a potentiometer value to the **Serial Plotter**. Add a second value (a moving average) on the same plot',
    'Write a tiny reusable `every(interval)` helper or struct you will reuse on the robots',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['What to focus on', 'Serial debugging, which will be your primary tool for months.\n\nNon-blocking timing with millis() instead of delay(), because delay() will ruin every robot you build.']
  ],
  links: [
    ['Arduino Built-in Examples (BlinkWithoutDelay)', 'https://docs.arduino.cc/built-in-examples/'],
    ['Arduino Official Docs, Learn section', 'https://docs.arduino.cc/learn/']
  ],
  extra: [
    ['SparkFun: Serial Communication', 'https://learn.sparkfun.com/tutorials/serial-communication'],
    ['Arduino language reference (millis)', 'https://docs.arduino.cc/language-reference/']
  ],
  video: `
## Why delay() ruins robots
@big delay(1000) = one second of total blindness
The article does not mince words: delay will ruin every robot you build. Here is why.
Delay stops the processor. For the whole delay, it reads no sensors, answers no buttons and makes no corrections. A robot balancing on two wheels that goes blind for even a tenth of a second falls over. A line follower that goes blind for half a second drives off the track.
A robot has to do many things at once, at different rates: read sensors fast, update motors fast, blink a status LED slowly, print debug output occasionally. Delay cannot do any of that.

## millis(): the clock that never stops
@eq if (now − last ≥ interval) { last = now; doTask(); } | check the clock, never wait for it
Millis returns the number of milliseconds since the board started. Instead of waiting, you check the clock.
Each task remembers when it last ran. Every time round the loop, you ask: has enough time passed? If yes, run the task and record the time. If no, move on immediately.
The loop now spins thousands of times a second, and every task runs on its own schedule. That is non-blocking timing.

## Three LEDs at three rates
\`\`\`cpp
unsigned long tA = 0, tB = 0, tC = 0;
void loop() {
  unsigned long now = millis();
  if (now - tA >= 200)  { tA = now; toggle(LED_A); }
  if (now - tB >= 450)  { tB = now; toggle(LED_B); }
  if (now - tC >= 1000) { tC = now; toggle(LED_C); }
  if (digitalRead(BTN) == LOW) handleButton();  // always responsive
}
\`\`\`
Here is today's exercise. Three LEDs at two hundred, four hundred and fifty, and one thousand milliseconds, plus a button that responds instantly.
Then rewrite it with delays, and feel the difference: the button only works occasionally, because most of the time the processor is asleep inside a delay. Write that observation in your log.
One detail: always subtract, now minus last, rather than comparing against a future time. Subtraction keeps working correctly when millis rolls over after about fifty days.

## A reusable timer helper
\`\`\`cpp
struct Every {
  unsigned long period, last = 0;
  Every(unsigned long p) : period(p) {}
  bool operator()() {
    unsigned long now = millis();
    if (now - last < period) return false;
    last = now; return true;
  }
};
Every sensors(10), status(500);
void loop() { if (sensors()) readSensors(); if (status()) blink(); }
\`\`\`
Wrap the pattern in a tiny helper so you never write it out by hand again. You will reuse this on both robots this module: a fast tick for sensors and control, a slow tick for status and printing.

## The Serial Plotter
- Print numbers separated by spaces or commas, one line per sample
- Tools → Serial Plotter draws them live
- Plot raw and filtered values together to compare
Serial printing is your main debugging tool for months. The Serial Plotter turns it into a live graph.
Print one line per sample with values separated by spaces, and each value becomes a coloured trace. Today, plot the raw potentiometer value and a moving average on the same chart. Seeing a noisy signal next to a smoothed one is your first taste of filtering, which gets a whole section later this module.
`,
  key: [
    'delay() blocks everything: no sensing, no buttons, no corrections.',
    'Non-blocking pattern: if (now − last ≥ interval) { last = now; task(); }.',
    'Subtract times so millis() rollover is harmless.',
    'Print space-separated numbers and use the Serial Plotter to see signals live.'
  ],
  quiz: [
    ['Why is delay() harmful in a robot\'s main loop?', ['It uses too much memory', 'It blocks the processor, so nothing else runs during the wait', 'It makes PWM stop', 'It resets the board'], 1, 'A blind robot cannot sense or correct.'],
    ['Which comparison survives millis() rollover?', ['if (millis() > nextTime)', 'if (millis() - last >= interval)', 'if (millis() == target)', 'if (last + interval < millis())'], 1, 'Unsigned subtraction wraps correctly.']
  ]
});

D({
  n: 31, icon: '⚡', topic: 'Microcontrollers', hours: 2.5, notion: '3f6cdfea8ce28163a4d7f60cb1fb22a8', svg: 'encoder',
  title: 'Interrupts and debouncing',
  goal: 'React to events with interrupts, and remove button bounce in software.',
  tasks: [
    'Read the attachInterrupt reference. Note which Uno pins support interrupts (2 and 3)',
    'Build a press counter using an interrupt. Print the count. Notice bounce makes it jump by 2–5',
    'Add a software debounce (ignore edges within ~20 ms using millis inside the ISR or in loop)',
    'Rules for ISRs: keep them short, use `volatile`, no Serial.print inside. Write these in your notes',
    'Run the built-in **Debounce** example and compare with your version',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [['What to focus on', 'Interrupts, and why polling a button in a loop eventually fails you.']],
  links: [
    ['Arduino Built-in Examples (Debounce)', 'https://docs.arduino.cc/built-in-examples/'],
    ['Paul McWhorter, Arduino Lessons', 'https://toptechboy.com/arduino-lessons/']
  ],
  extra: [
    ['Arduino language reference (attachInterrupt)', 'https://docs.arduino.cc/language-reference/'],
    ['SparkFun: Processor Interrupts with Arduino', 'https://learn.sparkfun.com/tutorials/processor-interrupts-with-arduino']
  ],
  video: `
## Polling versus interrupts
@big Polling asks "did it happen yet?" · An interrupt says "it just happened"
So far you have read the button by polling: checking it every time round the loop. That works while the loop is fast. But as your robot grows, the loop gets slower, and a short event can happen and finish between two checks. You miss it.
An interrupt flips this around. The hardware watches the pin for you, and the instant it changes, the processor pauses whatever it was doing, runs a small function, and then carries on.
This matters most for fast signals. Next section, a wheel encoder will produce thousands of pulses per second, and polling simply cannot keep up.

## attachInterrupt
\`\`\`cpp
volatile unsigned long presses = 0;
void onPress() { presses++; }          // the ISR
void setup() {
  pinMode(2, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(2), onPress, FALLING);
  Serial.begin(115200);
}
void loop() { Serial.println(presses); delay(200); }
\`\`\`
On an Uno, only pins two and three can trigger external interrupts. You attach a function, called an interrupt service routine or ISR, and choose which edge triggers it: rising, falling or any change.
With a pull-up button, pressing pulls the pin low, so we trigger on the falling edge.

## The three rules of ISRs
1. Keep it short: set a flag or bump a counter, nothing more
2. Mark shared variables volatile
3. No Serial.print, no delay inside an ISR
Interrupt routines interrupt everything else, so they must be tiny. Set a flag or increment a counter, then return. Do the real work in the main loop.
Any variable shared between the ISR and the loop must be marked volatile, so the compiler always reads its latest value from memory instead of a stale copy.
And never print or delay inside an ISR. Serial printing itself relies on interrupts, and can hang if called from inside one.

## Bounce, counted
@eq one press → 2 to 5 counts | the contacts bounce for a few milliseconds
Run the counter and press the button once. The count jumps by two, three, sometimes five. That is the contact bounce you noticed in Module 1, now counted precisely, because an interrupt catches every single edge.

## Software debounce
\`\`\`cpp
volatile unsigned long presses = 0, lastEdge = 0;
void onPress() {
  unsigned long now = millis();
  if (now - lastEdge > 20) presses++;   // ignore edges within 20 ms
  lastEdge = now;
}
\`\`\`
The fix is to ignore edges that come too soon after the previous one. Bounces settle within a few milliseconds, while a human cannot press a button twice in under twenty milliseconds. So any edge within twenty milliseconds of the last one is bounce, and we ignore it.
Millis is safe to read inside an ISR on the Uno, though it does not advance while you are inside one, which is another reason to keep ISRs short.
Compare your version with the built-in Debounce example, which does it in the loop instead. Both are valid; knowing both is the goal.
`,
  key: [
    'Interrupts react to an edge immediately; polling can miss short events.',
    'Uno external interrupts: pins 2 and 3.',
    'ISR rules: short, volatile shared variables, no Serial or delay.',
    'Debounce by ignoring edges within ~20 ms of the previous one.'
  ],
  quiz: [
    ['Why must a variable shared between an ISR and loop() be declared volatile?', ['To make it faster', 'So the compiler always reads its current value from memory', 'To store it in EEPROM', 'To allow negative numbers'], 1, 'Without volatile, the loop may use a stale cached copy.'],
    ['Which of these should NOT go inside an ISR?', ['counter++', 'Setting a flag', 'Serial.println()', 'Reading millis()'], 2, 'Serial relies on interrupts and can hang inside an ISR.']
  ]
});

D({
  n: 32, icon: '🔗', topic: 'Microcontrollers', hours: 3, notion: '3f6cdfea8ce281ff8b67cfb515c485e4', svg: 'bus',
  title: 'I2C and SPI from the datasheet',
  goal: 'Wire an I2C sensor, find its address, and read a register using only the datasheet.',
  tasks: [
    'Read SparkFun: I2C and SparkFun: SPI',
    'Wire an I2C module (MPU-6050 if it has arrived, or any I2C module in your kit). Note SDA/SCL pins and pull-ups',
    'Run an I2C scanner sketch. Write down the address',
    'Open the sensor\'s datasheet / register map. Find the WHO_AM_I register. Read it with Wire.h only, no library. Check the value matches the datasheet',
    'Read one more register (e.g. raw accelerometer X high/low bytes) and combine them into a signed 16-bit value',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['What to focus on', 'I2C and SPI: how to wire them and how to read a sensor datasheet to find the address.'],
    ['Month 2 Milestone (this one)', 'Wire and read an I2C sensor from its datasheet without a tutorial.']
  ],
  links: [['Arduino Official Docs, Learn section (I2C, SPI, UART)', 'https://docs.arduino.cc/learn/']],
  extra: [
    ['SparkFun: I2C', 'https://learn.sparkfun.com/tutorials/i2c'],
    ['SparkFun: Serial Peripheral Interface (SPI)', 'https://learn.sparkfun.com/tutorials/serial-peripheral-interface-spi'],
    ['SparkFun: How to Read a Datasheet', 'https://learn.sparkfun.com/tutorials/how-to-read-a-datasheet']
  ],
  video: `
## How sensors talk
@svg bus | two wires, many devices, each with an address
Simple sensors give you a voltage. Smart sensors, like an IMU, a time-of-flight distance sensor or a display, talk to the microcontroller digitally over a bus. The two you will use constantly are I squared C and SPI.
Today's milestone is a big one: wire and read an I2C sensor from its datasheet, without a tutorial or a library.

## I2C in one minute
| Wire | Name | Job |
|---|---|---|
| SDA | data | bits travel here, both ways |
| SCL | clock | the controller sets the pace |
| VCC, GND | power | usually 3.3 V or 5 V |
I2C uses just two signal wires, data and clock, shared by every device on the bus. Each device has a seven-bit address, like a house number. The controller starts every conversation by calling out an address, and only that device answers.
Both lines need pull-up resistors, because devices only ever pull the lines low. Most breakout boards already include them. On an Uno, SDA is A4 and SCL is A5.

## SPI in one minute
- Four wires: SCK clock, MOSI out, MISO in, CS select
- One chip-select line per device instead of addresses
- Much faster than I2C; more wires
SPI is the faster cousin. It uses separate wires for data in and data out, a clock, and a chip-select line for each device. Instead of addresses, you pull one device's chip select low to talk to it.
It is common for displays, SD cards and high-rate sensors. Same idea, more wires, more speed.

## Step 1: find the address
@big I2C scanner → "Found device at 0x68"
First, run an I2C scanner sketch. It simply tries every possible address and reports which ones answer.
For an MPU-6050 you should see zero x six eight, or six nine if its address pin is pulled high. If nothing answers, check the four wires, and check whether the board needs three point three or five volts.

## Step 2: read the datasheet's register map
| Register | Address | Contents |
|---|---|---|
| WHO_AM_I | 0x75 | fixed ID, 0x68 |
| PWR_MGMT_1 | 0x6B | write 0 to wake it up |
| ACCEL_XOUT_H / _L | 0x3B / 0x3C | X acceleration, high and low bytes |
Inside, a smart sensor is a set of numbered registers, small memory slots, and the datasheet's register map lists them all.
WHO AM I is a register that always returns a fixed identity value. Reading it is the classic first test: if you get the documented value, your wiring and your code both work.
Note that the MPU-6050 starts asleep. You must write zero to its power management register before the measurement registers update.

## Step 3: read registers with Wire alone
\`\`\`cpp
#include <Wire.h>
uint8_t readReg(uint8_t reg) {
  Wire.beginTransmission(0x68);
  Wire.write(reg);                 // which register
  Wire.endTransmission(false);     // repeated start
  Wire.requestFrom(0x68, 1);
  return Wire.read();
}
// ax = (int16_t)(readReg(0x3B) << 8 | readReg(0x3C));
\`\`\`
Reading a register is a two-step conversation: tell the device which register you want, then request a byte back.
Sixteen-bit measurements come as two bytes, high and low. Shift the high byte left by eight, combine it with the low byte, and cast to a signed sixteen-bit integer so negative accelerations come out negative.
When this works, you have done what most beginners never do: talked to a sensor straight from its datasheet. From now on, a library is a convenience, not a mystery.
`,
  key: [
    'I2C: SDA + SCL shared by all devices, each with a 7-bit address; lines need pull-ups.',
    'SPI: clock, MOSI, MISO and one chip-select per device; faster, more wires.',
    'Run an I2C scanner first, then read WHO_AM_I from the register map to prove the link.',
    'Combine high and low bytes into a signed 16-bit value.'
  ],
  quiz: [
    ['How does an I2C controller select which device to talk to?', ['A separate chip-select wire', 'By sending the device\'s address on the bus', 'By changing the clock speed', 'By powering only one device'], 1, 'Every I2C transaction starts with the target address.'],
    ['Why read the WHO_AM_I register first?', ['It wakes the sensor', 'It returns a fixed known value, proving wiring and code work', 'It calibrates the sensor', 'It sets the address'], 1, 'A known answer is the perfect first test.']
  ]
});

D({
  n: 33, icon: '🎮', topic: 'Microcontrollers', hours: 3, notion: '3f6cdfea8ce281f89509e11aed95787a', svg: 'sensethinkact',
  title: 'Practice task: reaction-timer game',
  goal: 'Combine interrupts, debouncing and non-blocking timing into one small game you can demo in 15 seconds.',
  tasks: [
    'Design the state machine on paper: WAIT → RANDOM_DELAY → LED_ON → RESULT (and a FALSE_START state)',
    'Implement with millis(), an interrupt for the button, and debounce',
    'Print the reaction time in ms to Serial. Keep a best score',
    'Film a 15-second video',
    'Push to your repo under `month-2/reaction-timer/` with a README (photo, wiring, what broke)',
    'Tick **Practice task done**. Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['Practice task (Arduino)', 'Practice task: build a reaction-timer game. An LED fires after a random delay, a button stops the clock, and the time in milliseconds prints to serial. It uses interrupts, debouncing and non-blocking timing, and it has a score, which makes it demonstrable in fifteen seconds of video.']
  ],
  links: [
    ['Arduino Built-in Examples', 'https://docs.arduino.cc/built-in-examples/'],
    ['Arduino Project Hub', 'https://projecthub.arduino.cc/']
  ],
  video: `
## A game that tests everything this week
@big LED fires after a random delay · press · your time in milliseconds
Today's practice task pulls the whole week together into a small game. An LED lights after a random delay. You hit the button as fast as you can. The time in milliseconds prints to serial, along with your best score.
It sounds simple, but it uses interrupts, debouncing and non-blocking timing all at once. And as the article points out, it has a score, which makes it demonstrable in fifteen seconds of video.

## Think in states
| State | What happens | Leaves when |
|---|---|---|
| WAIT | prompt the player | button pressed → start round |
| RANDOM_DELAY | LED off, waiting 1–4 s | time up → LED_ON; press → FALSE_START |
| LED_ON | LED lit, clock running | press → RESULT |
| RESULT | print time and best | after 2 s → WAIT |
| FALSE_START | scold the cheater | after 2 s → WAIT |
The clean way to build this is a state machine. Draw it on paper before writing code.
The game is always in exactly one state. Each state has one job, and specific events move it to the next state. Waiting. A random delay. LED on. Result. And a false start state for anyone who presses too early.
State machines are everywhere in robotics: a robot arm's pick sequence, a navigation behaviour, a gripper's open-close logic. This is your first one.

## The code shape
\`\`\`cpp
enum State { WAIT, RANDOM_DELAY, LED_ON, RESULT, FALSE_START };
State st = WAIT; unsigned long t0, waitMs, best = 99999;
volatile bool pressed = false;   // set by the debounced ISR
void loop() {
  unsigned long now = millis();
  bool p = pressed; pressed = false;
  switch (st) {
    case RANDOM_DELAY:
      if (p) { st = FALSE_START; t0 = now; }
      else if (now - t0 >= waitMs) { digitalWrite(LED, HIGH); t0 = now; st = LED_ON; }
      break;
    case LED_ON:
      if (p) { unsigned long rt = now - t0; best = min(best, rt); report(rt); st = RESULT; t0 = now; }
      break;
    // ...WAIT, RESULT, FALSE_START
  }
}
\`\`\`
In code, the state is an enum and the loop is a switch statement. The ISR only sets a pressed flag. The loop reads and clears that flag, checks the clock with millis, and decides what to do in the current state.
Notice there is not a single delay anywhere. The loop spins freely, so the button press is timed to the millisecond.

## Details that make it fair
- random(1000, 4000) for the delay, seeded with randomSeed(analogRead(A1))
- Debounce, or one press counts twice
- Capture the time in the ISR for the most precise result
Seed the random generator from a floating analog pin, so the delay is different every time you power up.
Keep your debounce, or a single press might end one round and start the next.
For the most precise timing, you can even record the millis value inside the ISR itself, at the exact moment of the press.

## Ship it
- 15-second video: wait, flash, press, score
- README: photo, wiring, state diagram, what broke
- Push to month-2/reaction-timer/
Film a fifteen second video showing a round and a score. Write the README with a photo, the wiring, your state diagram and, of course, what broke.
Push it to your repo. That is your first Module 2 portfolio piece, and the practice task is done.
`,
  key: [
    'Design behaviour as a state machine before coding.',
    'Use an enum + switch; the ISR only sets a flag, the loop does the work.',
    'No delay(): millis() timing keeps the press measurement precise.',
    'Seed random() from a floating analog pin.'
  ],
  quiz: [
    ['In the reaction timer, what should happen if the button is pressed during RANDOM_DELAY?', ['Ignore it', 'Go to FALSE_START', 'Print the time', 'Reset the board'], 1, 'Pressing before the LED lights is a false start.'],
    ['Why seed random() with analogRead() of an unconnected pin?', ['It speeds up the game', 'Floating noise gives a different seed each power-up', 'It calibrates the LED', 'It debounces the button'], 1, 'Otherwise the "random" sequence repeats every boot.']
  ]
});

D({
  n: 34, icon: '📶', topic: 'Microcontrollers', hours: 2.5, notion: '3f6cdfea8ce2819eb3dae0e62378cd04', svg: 'bus',
  title: 'ESP32: setup and the decision framework',
  goal: 'Get the ESP32-S3 running in the Arduino IDE, and know when to use Arduino vs ESP-IDF vs MicroPython.',
  tasks: [
    'Read the ESP32 section in the reading lesson',
    'Install the ESP32 board package (Boards Manager). Select ESP32-S3 Dev Module',
    'Follow Random Nerd "Getting Started with ESP32". Upload Blink. If upload fails, learn the BOOT-button trick',
    'Run the WiFiScan example. Then connect to your WiFi and print the IP',
    'Note the ESP32 is 3.3 V logic: re-check any 5 V sensor before wiring (use your Month 1 divider knowledge)',
    'Write one paragraph: which framework you will use for the robots and why',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['2. ESP32', 'The ESP32 is where you go the moment you want WiFi, Bluetooth, more processing power or two cores, and it is cheaper than an Arduino Uno.\n\nBuy an ESP32-S3 as your main board, which is the most capable current variant, and one classic ESP32 so that older tutorial code runs unmodified.'],
    ['Decision framework', 'Arduino framework for speed to a working robot, with the largest library ecosystem.\nESP-IDF when you need real control over tasks, cores, power and timing.\nMicroPython for fast sensor experimentation, but not for a balancing loop, since garbage collection pauses will wreck your timing.']
  ],
  links: [
    ['Random Nerd Tutorials, Getting Started with ESP32', 'https://randomnerdtutorials.com/getting-started-with-esp32/'],
    ['Arduino ESP32 Core documentation', 'https://docs.espressif.com/projects/arduino-esp32/en/latest/'],
    ['ESP-IDF Programming Guide', 'https://docs.espressif.com/projects/esp-idf/en/stable/esp32/get-started/index.html'],
    ['DroneBot Workshop ESP32 hub', 'https://dronebotworkshop.com/esp32-2/']
  ],
  video: `
## Why move to the ESP32
| | Arduino Uno | ESP32-S3 |
|---|---|---|
| CPU | 16 MHz, 8-bit, 1 core | 240 MHz, 32-bit, 2 cores |
| RAM | 2 KB | 512 KB (+ PSRAM) |
| WiFi / Bluetooth | no | yes |
| Logic level | 5 V | 3.3 V |
| Price | higher | lower |
The Uno was the right place to start, because every tutorial targets it. But robots soon want more: wireless control, more memory, more processing for filters and controllers.
The ESP32-S3 runs about fifteen times faster, has two cores, hundreds of times more memory, and built-in WiFi and Bluetooth. And it costs less than an Uno. The article recommends the S3 as your main board, plus one classic ESP32 so older tutorial code runs unmodified.

## Setting it up
1. Arduino IDE → Boards Manager → install "esp32" by Espressif
2. Select "ESP32S3 Dev Module" and the right port
3. Upload Blink
4. Upload fails? Hold BOOT, tap RESET, release BOOT, upload again
Install the ESP32 board package in the Arduino IDE's Boards Manager, choose the ESP32-S3 Dev Module, and upload Blink.
If the upload fails to connect, learn the boot button trick: hold BOOT, tap RESET, release BOOT, and upload again. That forces the chip into its bootloader. Almost everyone needs it at least once.

## WiFi in a few lines
\`\`\`cpp
#include <WiFi.h>
void setup() {
  Serial.begin(115200);
  WiFi.begin("your-ssid", "your-password");
  while (WiFi.status() != WL_CONNECTED) { delay(300); Serial.print("."); }
  Serial.println(WiFi.localIP());
}
void loop() {}
\`\`\`
Run the WiFi scan example to list nearby networks, then connect to yours and print the IP address.
That IP address is about to become important: next section, the ESP32 serves a web page, and you will control a servo from your phone.

## The 3.3 volt trap
@big ESP32 pins are 3.3 V — 5 V on an input can damage them
The ESP32 runs at three point three volts, and its pins are not five volt tolerant. A five volt signal from an old sensor can damage the input.
Before wiring any five volt part, check its output level. If it is five volts, use a level shifter or the voltage divider you mastered in Module 1. This is exactly the kind of mistake that the electrical foundations were meant to prevent.

## The decision framework
| Framework | Use it when |
|---|---|
| Arduino core | fastest path to a working robot; huge library ecosystem |
| ESP-IDF | you need real control over tasks, cores, power and timing |
| MicroPython | quick sensor experiments — not balancing loops (GC pauses) |
The article gives a clear decision framework. Use the Arduino framework for speed to a working robot, with the biggest library ecosystem. That is what we use this module.
Use ESP-IDF, Espressif's own framework, when you need precise control over tasks, cores, power and timing.
And MicroPython is great for quick sensor experiments, but not for a balancing loop, because its garbage collector can pause your program at random moments and wreck the timing.
Write one paragraph in your log: which framework you will use for the robots, and why.
`,
  key: [
    'ESP32-S3: much faster, dual-core, more RAM, WiFi/BT, cheaper than an Uno.',
    'If upload fails: hold BOOT, tap RESET, release BOOT.',
    'ESP32 is 3.3 V logic; shift or divide 5 V signals.',
    'Arduino core for speed; ESP-IDF for control; MicroPython not for tight loops.'
  ],
  quiz: [
    ['Why is MicroPython a poor choice for a balancing robot\'s control loop?', ['It cannot use WiFi', 'Garbage-collection pauses disrupt timing', 'It only runs on Uno', 'It has no I2C support'], 1, 'From the article\'s decision framework.'],
    ['A sensor outputs 5 V logic. What must you do before connecting it to an ESP32 input?', ['Nothing, ESP32 is 5 V tolerant', 'Use a level shifter or voltage divider to 3.3 V', 'Add a flyback diode', 'Use a pull-down resistor only'], 1, 'ESP32 pins are 3.3 V and not 5 V tolerant.']
  ]
});

D({
  n: 35, icon: '🔁', topic: 'Review', hours: 2, notion: '3f6cdfea8ce28171b65bcf300d3c89f3', svg: 'sensethinkact',
  title: 'Week 1 review + catch-up',
  goal: 'Finish anything left from Week 1. No new topics.',
  tasks: [
    'Finish unfinished tasks from M2 Days 1–6',
    'Without notes: explain PWM, interrupts, I2C addressing, and why delay() ruins robots',
    'Browse Arduino Project Hub for 15 minutes. Save 2 ideas you might build later',
    'Check Month 2 gear arrivals (motors, drivers, IMU, chassis)',
    'Update Confidence on Days 1–6'
  ],
  read: [['Arduino Project Hub', 'Over 6,000 projects with wiring and code, and this is where you go when tutorials end and you need something to build.']],
  links: [
    ['Arduino Project Hub', 'https://projecthub.arduino.cc/'],
    ['Paul McWhorter, Arduino Lessons', 'https://toptechboy.com/arduino-lessons/']
  ],
  video: `
## Four explanations, no notes
| Topic | Your one-sentence explanation should mention |
|---|---|
| PWM | duty cycle, average, not a real analog voltage |
| Interrupts | hardware edge, ISR, short and volatile |
| I2C | two shared wires, addresses, pull-ups |
| delay() | blocking: no sensing or correcting while waiting |
Review day. Start by explaining four ideas out loud, without notes: what PWM really is, how interrupts work, how I2C addressing works, and why delay ruins robots.
If any explanation feels shaky, rewatch that day's video at one and a half times speed, then try again.

## Look for ideas
@big Arduino Project Hub: 6,000+ projects with wiring and code
Spend fifteen minutes browsing the Arduino Project Hub. The article describes it as where you go when tutorials end and you need something to build.
Save two ideas you might build later. Having your own project ideas waiting makes the second half of the course much more motivating.

## Check your gear
- Motors and encoders, motor drivers
- MPU-6050 IMU, distance sensors
- Line-follower chassis, line sensors, LiPo and charger
Next section you start driving motors, and the section after that, sensors. Check that everything you ordered on day twenty-two of Module 1 has arrived. If something is late, plan around it now, for example by swapping the order of days.
`,
  key: [
    'Explain PWM, interrupts, I2C and the delay() problem without notes.',
    'Collect project ideas from Arduino Project Hub.',
    'Check motors, drivers, IMU and chassis have arrived before Section 2.'
  ],
  quiz: [
    ['Which statement about PWM is correct?', ['It outputs a smooth analog voltage', 'It varies the fraction of time a pin is fully on', 'It only works on analog pins', 'It needs an I2C bus'], 1, 'Duty cycle is the whole idea.'],
    ['What happens to sensing while a robot sits inside delay(500)?', ['Sensors are read twice as fast', 'Nothing is read or corrected for half a second', 'Interrupts are disabled forever', 'PWM stops'], 1, 'The main loop is blocked.']
  ]
});
// ───────────── Section 2 · ESP32 and motors ─────────────
D({
  n: 36, icon: '🌐', topic: 'Microcontrollers', hours: 3, notion: '3f6cdfea8ce2816789efeb4d229264c7', svg: 'bus',
  title: 'ESP32 web page with live sensor readings',
  goal: 'First half of the ESP32 practice task — serve a web page that shows live sensor values.',
  tasks: [
    'Follow a Random Nerd ESP32 web server tutorial (async web server is best)',
    'Serve a page that shows a sensor reading (potentiometer, or the IMU/ultrasonic if you have it)',
    'Make it update live without reloading (fetch/JSON every 500 ms, or WebSocket / Server-Sent Events)',
    'Open it from your phone on the same WiFi',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['Practice task (ESP32)', 'Practice task: build something that could not exist on an Arduino Uno. Serve a web page from the ESP32 that shows live sensor readings and has buttons that drive a servo, then access it from your phone on the same network. This teaches WiFi, HTTP handling and asynchronous work at the same time.']
  ],
  links: [
    ['Random Nerd Tutorials, Getting Started with ESP32 (and the 250+ project index)', 'https://randomnerdtutorials.com/getting-started-with-esp32/'],
    ['DroneBot Workshop ESP32 hub', 'https://dronebotworkshop.com/esp32-2/']
  ],
  extra: [['Random Nerd Tutorials: ESP32 projects index', 'https://randomnerdtutorials.com/projects-esp32/']],
  video: `
## Something an Uno cannot do
@big A robot you can watch and steer from your phone
The ESP32 practice task asks you to build something that could not exist on an Arduino Uno: a web page, served by the microcontroller itself, that shows live sensor readings and has buttons that drive a servo.
Today is the first half: the page and the live readings. Tomorrow you add the servo.
Along the way you learn three things at once, as the article says: WiFi, HTTP handling, and asynchronous work.

## How a web server on a chip works
| Step | Who | What |
|---|---|---|
| 1 | phone browser | requests http://192.168.1.42/ |
| 2 | ESP32 | replies with an HTML page |
| 3 | page JavaScript | asks /data every 500 ms |
| 4 | ESP32 | replies with JSON: {"pot": 2731} |
| 5 | page | updates the number, no reload |
When your phone opens the ESP32's IP address, the ESP32 replies with an HTML page stored in its flash memory. That page contains a little JavaScript.
The JavaScript then asks the ESP32 for fresh data twice a second, at a separate address like slash data. The ESP32 replies with a tiny piece of JSON containing the sensor value, and the page updates the number without reloading.

## Why asynchronous matters
@big The server must never stop the robot | requests are handled in the background
A simple web server handles requests inside your loop, one at a time. While it is busy sending a page, nothing else runs. For a robot, that is the delay problem all over again.
The ESPAsyncWebServer library handles requests in the background, on events. Your loop keeps reading sensors and driving motors, and web requests get answered in between. That is why the plan recommends the async server.

## The data endpoint
\`\`\`cpp
#include <WiFi.h>
#include <ESPAsyncWebServer.h>
AsyncWebServer server(80);
void setup() {
  // ...connect to WiFi...
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *r){ r->send(200, "text/html", PAGE); });
  server.on("/data", HTTP_GET, [](AsyncWebServerRequest *r){
    r->send(200, "application/json", "{\\"pot\\":" + String(analogRead(4)) + "}");
  });
  server.begin();
}
void loop() { /* robot work continues here */ }
\`\`\`
Here is the shape of the code. One handler serves the page. Another handler serves the JSON data. Both run asynchronously, so the loop stays free.
On the page side, a few lines of JavaScript call fetch on slash data every five hundred milliseconds and write the value into the page.

## Faster options
- Polling with fetch: simplest, fine at 2 updates a second
- Server-Sent Events: the ESP32 pushes updates
- WebSockets: two-way, lowest latency
Polling is the simplest and perfectly fine for today. If you want smoother updates, look at Server-Sent Events, where the ESP32 pushes new values as they happen, or WebSockets, which keep a two-way connection open with very low latency.
Finally, open the page on your phone, on the same WiFi network. Seeing a live sensor reading in your hand, served by a chip that costs a few dollars, is a great moment.
`,
  key: [
    'The ESP32 serves an HTML page plus a JSON data endpoint.',
    'Page JavaScript fetches fresh data periodically and updates without reloading.',
    'An async web server keeps the robot loop free.',
    'SSE or WebSockets give smoother, pushed updates.'
  ],
  quiz: [
    ['Why use an asynchronous web server on a robot?', ['It uses less flash', 'Requests are handled in the background, so the control loop is never blocked', 'It is required for WiFi', 'It makes pages prettier'], 1, 'A blocking server reintroduces the delay() problem.'],
    ['What does the /data endpoint typically return?', ['A full HTML page', 'A small JSON object with sensor values', 'An image', 'Nothing'], 1, 'The page JavaScript reads the JSON and updates the display.']
  ]
});

D({
  n: 37, icon: '📱', topic: 'Microcontrollers', hours: 3, notion: '3f6cdfea8ce28104aaebd0d97ec0e92e', svg: 'pwm',
  title: 'ESP32 web buttons drive a servo',
  goal: 'Finish the ESP32 practice task — phone buttons move a servo while sensor values keep updating.',
  tasks: [
    'Read SparkFun: Hobby Servo Tutorial. Power the servo from 5 V (not the 3.3 V pin), share ground',
    'Use the ESP32Servo library (or LEDC PWM directly) to move the kit servo',
    'Add buttons (0° / 90° / 180° and a slider) to your page',
    'Check the live readings never freeze while the servo moves (async!)',
    'Film it from your phone. Push code + README to `month-2/esp32-web-servo/`',
    'Tick **Practice task done**. Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['Practice task (ESP32)', 'Serve a web page from the ESP32 that shows live sensor readings and has buttons that drive a servo, then access it from your phone on the same network. This teaches WiFi, HTTP handling and asynchronous work at the same time.'],
    ['Hobby servo', 'Hobby servo: an internal closed loop with roughly 180 degrees of travel and no feedback out.']
  ],
  links: [
    ['Random Nerd Tutorials ESP32', 'https://randomnerdtutorials.com/getting-started-with-esp32/'],
    ['Arduino ESP32 Core documentation', 'https://docs.espressif.com/projects/arduino-esp32/en/latest/']
  ],
  extra: [['SparkFun: Hobby Servo Tutorial', 'https://learn.sparkfun.com/tutorials/hobby-servo-tutorial']],
  video: `
## The hobby servo
@big A motor + gearbox + potentiometer + controller in one box | you send an angle, it holds it
A hobby servo is a small box containing a DC motor, a gearbox, a potentiometer on the output shaft, and a tiny control circuit. You send it a target angle, and its internal closed loop drives the motor until the potentiometer says it has arrived.
The article sums it up: an internal closed loop, roughly a hundred and eighty degrees of travel, and no feedback out. You tell it where to go, but it never tells you where it actually is. That limitation matters later, when arms need to know their joint positions.

## The servo signal
@eq 50 Hz pulse: 1.0 ms → 0° · 1.5 ms → 90° · 2.0 ms → 180° | the pulse width is the command
Servos are commanded with a pulse every twenty milliseconds, fifty times a second. The width of the pulse sets the angle: about one millisecond for zero degrees, one and a half for the middle, two for a hundred and eighty. Exact limits vary between servos.
It is PWM again, but here the pulse width is the command itself, not an average power level.

## Power it properly
- Servo power from 5 V, not the ESP32's 3.3 V pin
- Share ground between the servo supply and the ESP32
- The signal wire can come straight from a GPIO
A servo can pull an amp or more when it starts moving or is loaded. Power it from a five volt supply, never from the ESP32's three point three volt pin, and connect the grounds together so the signal has a common reference.
If your ESP32 resets every time the servo moves, you already know why: it is the brown-out from Module 1. Separate supply, shared ground.

## Buttons and a slider
\`\`\`cpp
#include <ESP32Servo.h>
Servo s;   // s.attach(18) in setup()
server.on("/servo", HTTP_GET, [](AsyncWebServerRequest *r){
  if (r->hasParam("deg")) {
    int deg = constrain(r->getParam("deg")->value().toInt(), 0, 180);
    s.write(deg);
  }
  r->send(200, "text/plain", "ok");
});
// page: <button onclick="fetch('/servo?deg=90')">90°</button>
//       <input type="range" min="0" max="180" oninput="fetch('/servo?deg='+this.value)">
\`\`\`
Add an endpoint that takes an angle as a query parameter and writes it to the servo. Always constrain the value, because anything can arrive over a network.
On the page, buttons for zero, ninety and a hundred and eighty degrees, plus a slider, simply call that endpoint.

## The real test: nothing freezes
- Move the slider continuously
- The sensor reading must keep updating
- If it freezes, something is blocking
The proof that you built it correctly is simple. Drag the slider back and forth while watching the live sensor value. It should keep updating smoothly. If it freezes, something in your code is blocking.
Film a short video from your phone, push the code and README, and tick practice task done. You have built a networked robot interface.
`,
  key: [
    'A hobby servo has an internal closed loop but gives no position feedback out.',
    'Servo command: ~1–2 ms pulse every 20 ms sets the angle.',
    'Power servos from 5 V with a shared ground; constrain network inputs.',
    'Live readings must keep updating while the servo moves (async works).'
  ],
  quiz: [
    ['What is the main limitation of a hobby servo for robot arms?', ['It cannot rotate', 'It gives no position feedback out', 'It needs 24 V', 'It only works with I2C'], 1, 'It holds an angle internally but never reports it.'],
    ['Your ESP32 resets whenever the servo moves. Most likely cause?', ['The web page is too large', 'The servo draws current from the same weak supply (brown-out)', 'Wrong baud rate', 'Missing pull-up'], 1, 'Give the servo its own 5 V supply with shared ground.']
  ]
});

D({
  n: 38, icon: '⚙️', topic: 'Motors & drivers', hours: 2.5, notion: '3f6cdfea8ce281d7bb5cca36e4fd2767', svg: 'hbridge',
  title: 'Four motor types + the H-bridge',
  goal: 'Understand the four motor types and how an H-bridge reverses a DC motor. Know why the L298N is a trap.',
  tasks: [
    'Read the motor section in the reading lesson (all four types)',
    'Read DroneBot: Controlling DC Motors with the L298N (theory + H-bridge internals). Do not buy an L298N',
    'Read SparkFun: TB6612FNG Hookup Guide fully. Draw its wiring to your ESP32 (PWMA, AIN1, AIN2, STBY, VM, VCC)',
    'Make a table: motor type → feedback? → driver needed → typical use',
    'Read the SimpleFOC intro page only (you will come back to brushless later)',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['3. Motors, drivers and actuation', 'This is where electronics stops being abstract, because motors draw real current and behave badly.\n\nFour types matter, and you should understand all four by the end of the month.\n\nBrushed DC gearmotor: cheap, needs an H-bridge, and has no position feedback unless you add an encoder. The default for a first rover.\n\nHobby servo: an internal closed loop with roughly 180 degrees of travel and no feedback out.\n\nSmart serial bus servo: daisy-chained, with position, velocity and current feedback and a 12-bit magnetic encoder. This is what modern low-cost arms use.\n\nStepper: open-loop absolute positioning with high holding torque.'],
    ['What to memorize', 'What to memorize: the L298N is in every tutorial and you should not use it. It is an obsolete bipolar-transistor H-bridge that drops about 2V across its output stage, gets hot and wastes your battery. Learn it because the tutorials use it, then switch to the TB6612FNG or DRV8833.']
  ],
  links: [
    ['DroneBot Workshop, Controlling DC Motors with the L298N', 'https://dronebotworkshop.com/dc-motors-l298n-h-bridge/'],
    ['SparkFun TB6612FNG Hookup Guide', 'https://learn.sparkfun.com/tutorials/tb6612fng-hookup-guide/all'],
    ['SimpleFOC documentation', 'https://docs.simplefoc.com/']
  ],
  extra: [['SparkFun: Motors and Selecting the Right One', 'https://learn.sparkfun.com/tutorials/motors-and-selecting-the-right-one']],
  video: `
## Four motor types
| Type | Feedback | Driver | Typical use |
|---|---|---|---|
| brushed DC gearmotor | none (add an encoder) | H-bridge | wheels of a first rover |
| hobby servo | internal only | none, just a PWM signal | small flaps, grippers |
| smart serial bus servo | position, velocity, current | serial bus | low-cost robot arms (SO-101) |
| stepper | none (open loop) | stepper driver | printers, precise positioning |
The article says four motor types matter, and you should understand all four by the end of this module.
The brushed DC gearmotor is cheap and simple, needs an H-bridge driver, and knows nothing about its position unless you add an encoder. It is the default for a first rover.
The hobby servo you met yesterday. The smart serial bus servo is the grown-up version: many can share one data cable, and each reports its position, velocity and current from a twelve-bit magnetic encoder. That is what the SO-101 arm in Module 3 uses.
And the stepper moves in precise fixed steps with strong holding torque, but open loop: it assumes it moved, it never checks.

## Reversing a DC motor
@svg hbridge | S1+S4 → forward · S2+S3 → reverse
A DC motor spins one way when current flows through it in one direction, and the other way when you reverse the current. To reverse it electronically, we need to swap which motor terminal connects to the supply and which to ground.
The circuit that does this is the H-bridge, named after its shape: four switches arranged like the letter H, with the motor as the crossbar.

## How the H-bridge works
1. Close S1 and S4: current flows left to right → forward
2. Close S2 and S3: current flows right to left → reverse
3. PWM one side → speed control
4. Never close S1 and S3 together: shoot-through short!
Close the top-left and bottom-right switches, and current flows through the motor one way. Close the other diagonal, and it flows the other way.
Switch one of those diagonals with PWM, and you control speed as well as direction.
There is one deadly combination: closing both switches on the same side. That connects the supply straight to ground, called shoot-through, and it can destroy the driver. Good driver chips make this impossible.

## Why the L298N is a trap
@big The L298N drops about 2 V and turns it into heat
The L298N appears in nearly every Arduino tutorial, and the article tells you plainly not to use it. It is an old design built from bipolar transistors that drops about two volts across its output stage.
From a seven point four volt battery, your motor may only see about five volts, and the missing power becomes heat in the driver. It runs hot and wastes your battery.
Learn it because the tutorials use it, then use a modern MOSFET driver like the TB6612FNG or the DRV8833, which drop only a fraction of a volt.

## Wiring the TB6612FNG
| Pin | Connect to | Meaning |
|---|---|---|
| VM | motor battery | motor power |
| VCC | 3.3 V | logic power |
| GND | common ground | shared reference |
| PWMA | PWM pin | speed |
| AIN1, AIN2 | two GPIOs | direction |
| STBY | high | enable the chip |
| AO1, AO2 | motor | outputs |
The TB6612FNG drives two motors. Each channel has a PWM pin for speed and two direction pins. Motor power goes to VM, logic power to VCC, and all grounds connect together. Standby must be pulled high or nothing happens, which catches out almost everyone once.
Draw this wiring to your ESP32 today. Tomorrow you build it.
`,
  key: [
    'Four types: DC gearmotor, hobby servo, smart bus servo, stepper — know their feedback and drivers.',
    'An H-bridge reverses a DC motor by switching diagonal pairs; PWM sets speed.',
    'Never turn on both switches on one side (shoot-through).',
    'Avoid the L298N (≈2 V drop, hot); use TB6612FNG or DRV8833. Pull STBY high.'
  ],
  quiz: [
    ['Why does the article say not to use the L298N?', ['It cannot reverse motors', 'It drops about 2 V, gets hot and wastes battery', 'It only drives steppers', 'It needs I2C'], 1, 'Modern MOSFET drivers are far more efficient.'],
    ['Which motor type reports position, velocity and current over a shared serial bus?', ['Brushed DC gearmotor', 'Hobby servo', 'Smart serial bus servo', 'Stepper'], 2, 'That is what low-cost arms like the SO-101 use.']
  ]
});

D({
  n: 39, icon: '🎚️', topic: 'Motors & drivers', hours: 2.5, notion: '3f6cdfea8ce281d8a6b1d27d792ff994', svg: 'motor',
  title: 'Drive a DC motor at 5 speeds, both directions',
  goal: 'First half of the motor practice task, and see that PWM duty is not the same as RPM.',
  tasks: [
    'Wire ESP32 + TB6612FNG + one Pololu gearmotor. Motor supply on VM, logic on VCC, common ground, STBY high',
    'Drive forward and backward at 5 duty levels (e.g. 20/40/60/80/100%)',
    'Find the dead-band: the lowest duty at which the motor starts turning',
    'Measure motor current at each speed with the meter in series. Hold the wheel briefly to see stall current',
    'Note how speed changes when battery voltage drops (try a weaker supply)',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['Practice task (Motors)', 'Practice task: drive one DC motor forward and backward at five different speeds using PWM, then add an encoder and write a function that turns the wheel exactly one full revolution regardless of battery voltage. The second half is your first real closed loop, and it is much harder than it sounds.'],
    ['Month 2 Milestone (this one)', 'Drive a motor at a controlled speed and know the difference between PWM duty and actual RPM.']
  ],
  links: [
    ['SparkFun TB6612FNG Hookup Guide', 'https://learn.sparkfun.com/tutorials/tb6612fng-hookup-guide/all'],
    ['Pololu gearmotor with encoder', 'https://www.pololu.com/product/3675']
  ],
  video: `
## Today's experiment
@svg motor | duty cycle in, rotation out — but not proportionally
Today you wire a real motor driver and drive a gearmotor at five speeds in both directions. It is the first half of the motor practice task.
But the real lesson is a milestone item: knowing the difference between PWM duty and actual RPM. They are related, but they are not the same thing, and every robot you build will depend on understanding why.

## A motor driver function
\`\`\`cpp
const int PWMA = 5, AIN1 = 6, AIN2 = 7;
void motor(int speed) {             // -255 .. 255
  digitalWrite(AIN1, speed > 0);
  digitalWrite(AIN2, speed < 0);
  analogWrite(PWMA, abs(speed));    // ESP32 core 3.x supports analogWrite
}
\`\`\`
Wrap the driver in one function that takes a signed speed. Positive spins forward, negative spins backward, zero stops. The sign sets the two direction pins, and the magnitude sets the PWM duty.
Every motor in this course, from the line follower to the balancer, will be driven through a function like this.

## The dead-band
@big Below some duty cycle, nothing moves
Step the duty up slowly from zero and watch. For the first part of the range, nothing happens: the motor hums but does not turn.
That is the dead-band. Friction in the gearbox and the motor's static friction must be overcome before anything moves. Find the lowest duty at which your motor reliably starts. You will use that number later, because a controller that asks for a tiny correction inside the dead-band gets no response at all.

## Duty is not RPM
| Thing that changes | Same duty, what happens to speed? |
|---|---|
| battery voltage drops | slower |
| load increases (a hill, a heavier robot) | slower |
| motor warms up | slightly different |
| two "identical" motors | different speeds |
Now the core idea. Duty cycle sets the average voltage, not the speed. The speed you actually get depends on the battery voltage, the load on the wheel, temperature, and the individual motor.
Try it: run at the same duty with a fresh battery and with a weaker supply. The speed changes. Two motors from the same batch at the same duty will spin at slightly different speeds, which is exactly why a robot with two motors drifts sideways when you send them the same command.
Open loop, you command duty and hope. Tomorrow you will measure the actual rotation with an encoder and correct for all of this.

## Measure the current
- Meter in series with the motor supply
- Record current at each duty level
- Briefly hold the wheel: stall current
Put your meter in series and record the current at each speed, then hold the wheel briefly to see the stall current. Compare it with the TB6612FNG's rating of about one amp continuous per channel. If your motor's stall current is close to that, you now know to avoid stalling it for long.
Write all of this in your log: the dead-band duty, the current at each speed, and how much the speed dropped on the weaker supply.
`,
  key: [
    'Drive motors through one signed-speed function: sign → direction pins, magnitude → PWM.',
    'The dead-band is the duty below which the motor will not start.',
    'Duty sets average voltage, not speed; speed varies with battery, load and motor.',
    'Check stall current against the driver\'s rating.'
  ],
  quiz: [
    ['Two identical motors get the same PWM duty but the robot drifts. Why?', ['PWM is broken', 'Duty is not RPM: motors and loads differ slightly', 'The H-bridge is reversed', 'The ESP32 is too slow'], 1, 'Only a closed loop on measured speed fixes it.'],
    ['What is the motor dead-band?', ['The maximum speed', 'The range of low duty where the motor does not turn', 'The time it takes to stop', 'Electrical noise'], 1, 'Friction must be overcome before motion starts.']
  ]
});

D({
  n: 40, icon: '🎯', topic: 'Motors & drivers', hours: 3, notion: '3f6cdfea8ce28168a85fd005034b5cc3', svg: 'encoder',
  title: 'Encoder: exactly one revolution (first closed loop)',
  goal: 'Read a quadrature encoder and close a position loop so the wheel turns exactly one revolution at any battery voltage.',
  tasks: [
    'Find counts per revolution of the output shaft: encoder CPR × gear ratio (from the Pololu product page)',
    'Read encoder A/B channels with interrupts. Print the count while turning by hand. Check the direction sign',
    'Write `moveRevolutions(1.0)`: start fast, slow near the target, stop. Then try a simple P controller on position error',
    'Test at two battery voltages. Measure the final error in counts',
    'Push to `month-2/encoder-position/` with numbers in the README',
    'Tick **Practice task done**. Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['Practice task (Motors)', '…then add an encoder and write a function that turns the wheel exactly one full revolution regardless of battery voltage. The second half is your first real closed loop, and it is much harder than it sounds.'],
    ['Month 2 Milestone (this one)', 'Read an encoder and close a position loop around it.']
  ],
  links: [
    ['Pololu gearmotor with encoder (specs: CPR, gear ratio)', 'https://www.pololu.com/product/3675'],
    ['SparkFun TB6612FNG Hookup Guide', 'https://learn.sparkfun.com/tutorials/tb6612fng-hookup-guide/all']
  ],
  extra: [['SparkFun: Processor Interrupts with Arduino', 'https://learn.sparkfun.com/tutorials/processor-interrupts-with-arduino']],
  video: `
## Your first real closed loop
@svg pid | measure → compare → correct
Yesterday you saw that duty cycle does not control speed or position reliably. Today you fix that the way every robot does: by measuring what actually happened and correcting.
The task is to turn the wheel exactly one revolution, regardless of battery voltage. The article warns it is much harder than it sounds. It is also one of the most important things you will build all year, because it is the same loop as a robot arm joint or a walking robot's knee.

## The quadrature encoder
@svg encoder | A leads B → clockwise · count edges → position
A quadrature encoder produces two square waves, A and B, a quarter of a cycle apart. Counting the edges tells you how far the shaft has turned. Which channel leads tells you the direction.
When A rises while B is low, the shaft is turning one way. When A rises while B is high, it is turning the other way. Reading both channels on every edge, and counting up or down, gives you a signed position.

## Counts per revolution
@eq output counts/rev = encoder CPR × gear ratio | e.g. 12 × 50 ≈ 600 counts per wheel turn
The encoder sits on the motor shaft, before the gearbox. So one turn of the output wheel is many turns of the motor.
Multiply the encoder's counts per motor revolution by the gear ratio to get counts per output revolution. Look up both numbers on the Pololu product page. Also check whether the CPR figure counts both edges of both channels, because that changes the number by a factor of four.
Verify by marking the wheel and turning it once by hand while printing the count.

## Counting with interrupts
\`\`\`cpp
volatile long ticks = 0;
void IRAM_ATTR onA() { ticks += (digitalRead(PIN_B) == digitalRead(PIN_A)) ? -1 : 1; }
void setup() {
  pinMode(PIN_A, INPUT_PULLUP); pinMode(PIN_B, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(PIN_A), onA, CHANGE);
}
\`\`\`
The edges come fast, thousands per second at full speed, so this is exactly what interrupts are for. On every change of channel A, compare it with channel B and add or subtract one.
On the ESP32, mark the ISR with IRAM attribute so it runs from fast internal memory. If the count goes the wrong way, swap the sign or the A and B wires.

## Closing the loop
\`\`\`cpp
void moveRevolutions(float revs) {
  long target = ticks + lround(revs * COUNTS_PER_REV);
  while (true) {
    long err = target - ticks;
    if (abs(err) <= 2) break;
    int u = constrain(KP * err, -255, 255);
    if (u != 0 && abs(u) < DEADBAND) u = (u > 0) ? DEADBAND : -DEADBAND;
    motor(u);
  }
  motor(0);
}
\`\`\`
Now the loop. Compute the target count. Repeatedly measure the error, the target minus the current count, and drive the motor with a command proportional to that error. Far away, the error is large and the motor runs fast. Close to the target, it slows down.
That is a proportional controller, the P in PID. Note the dead-band trick: tiny commands are bumped up to the minimum that actually moves the motor. And because the loop measures real position, a weaker battery simply means it takes a little longer to arrive. It still arrives.
Test at two battery voltages, record the final error in counts, and put the numbers in your README. You have just closed your first loop.
`,
  key: [
    'Quadrature: two channels 90° apart give distance (edges) and direction (which leads).',
    'Output counts/rev = encoder CPR × gear ratio (check the edge-counting convention).',
    'Count encoder edges in an ISR; on ESP32 use IRAM_ATTR.',
    'A P controller drives the motor ∝ position error, so it reaches the target at any battery voltage.'
  ],
  quiz: [
    ['How does a quadrature encoder indicate direction?', ['By pulse amplitude', 'By which channel (A or B) leads the other', 'By pulse colour', 'It cannot'], 1, 'The phase relationship of A and B gives the direction.'],
    ['Why does the closed-loop version reach one revolution even on a weaker battery?', ['It boosts the voltage', 'It keeps correcting based on measured position until the error is small', 'It uses a timer', 'It ignores the encoder'], 1, 'Feedback compensates for the slower motor.']
  ]
});

D({
  n: 41, icon: '🔩', topic: 'Motors & drivers', hours: 2.5, notion: '3f6cdfea8ce28110983df65e474031c5', svg: 'gears',
  title: 'Steppers (and a look at brushless)',
  goal: 'Understand steppers, microstepping and driver current limit. Skip the hardware part if you did not buy a stepper.',
  tasks: [
    'Read DroneBot: Stepper Motors with Arduino (unipolar vs bipolar, microstepping, NEMA sizes)',
    'If you have an A4988 + NEMA17: set the current limit with the trim pot (follow the Pololu page), then move exactly 200 full steps and 3200 microsteps',
    'Try to stall it by holding the shaft: note the stepper loses steps silently (open loop!)',
    'Read SimpleFOC\'s "what is FOC" page. Write 3 lines on why brushless needs FOC',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['Stepper', 'Stepper: open-loop absolute positioning with high holding torque.'],
    ['SimpleFOC', 'The clearest free explanation of field-oriented control anywhere, and the affordable on-ramp to brushless motors when you get there.']
  ],
  links: [
    ['DroneBot Workshop, Stepper Motors with Arduino', 'https://dronebotworkshop.com/stepper-motors-with-arduino/'],
    ['Pololu A4988 stepper driver carrier', 'https://www.pololu.com/product/1182'],
    ['SimpleFOC documentation', 'https://docs.simplefoc.com/']
  ],
  video: `
## How a stepper moves
@big Energise the coils in sequence → the rotor clicks one step at a time
A stepper motor has several coils around a toothed rotor. Energise the coils in a fixed sequence and the rotor snaps from one position to the next, one step at a time. A typical NEMA 17 stepper has two hundred steps per revolution, one point eight degrees each.
Count the steps you send and you know the position, with no encoder at all. That, plus very strong holding torque when stationary, is why 3D printers and CNC machines use steppers.

## Microstepping
| Mode | Steps per revolution | Smoothness |
|---|---|---|
| full step | 200 | jerky, loud |
| 1/2 step | 400 | better |
| 1/16 step | 3200 | smooth, quiet |
Microstepping drives the coils with intermediate current levels, so the rotor settles between full steps. At sixteenth stepping, one revolution takes three thousand two hundred step pulses.
It makes the motion smoother and quieter. It does not add much real precision under load, but it hugely reduces vibration.

## The driver and its current limit
- A4988 or similar: STEP pin (one pulse = one step), DIR pin
- Set the current limit with the trim pot before running
- Too high → hot motor and driver; too low → missed steps
Stepper drivers like the A4988 are simple to command: one pulse on the step pin moves one step, and the direction pin sets the direction.
But you must set the current limit first, using the little trim potentiometer and the formula on the Pololu page. Too much current overheats the motor and driver. Too little and the motor skips steps. Follow the Pololu guide carefully if you have the hardware.

## The open-loop catch
@big A stalled stepper loses steps silently | it never knows it is wrong
Here is the catch, and you will see it today if you try to stall the motor with your hand. When a stepper is overloaded, it skips steps. And because it is open loop, nothing notices. The controller keeps counting as if every step happened.
That is why a 3D printer that hits an obstacle produces a shifted layer instead of stopping. Steppers are brilliant for predictable loads, and dangerous when the load is unknown.

## A first look at brushless and FOC
- Brushless motors: efficient, powerful, quiet — drones, quadrupeds, high-end arms
- They need commutation: switching three phases in sync with the rotor
- Field-oriented control (FOC) does this smoothly and gives precise torque
Finally, a glimpse of the future. Brushless motors are efficient, powerful and quiet, which is why drones, quadruped robots and high-end arms use them.
They have no brushes, so the electronics must switch their three phases in exact sync with the rotor angle. Field-oriented control is the technique that does this smoothly and gives direct control over torque. The article calls the SimpleFOC documentation the clearest free explanation anywhere. Read its intro today, and write three lines on why brushless motors need FOC.
`,
  key: [
    'A stepper moves in fixed steps (e.g. 200/rev); counting steps gives position without an encoder.',
    'Microstepping (e.g. 1/16 → 3200/rev) smooths motion.',
    'Always set the driver current limit; overload makes steppers lose steps silently.',
    'Brushless motors need commutation; FOC gives smooth, precise torque control.'
  ],
  quiz: [
    ['Why can a stepper end up in the wrong position without anyone noticing?', ['It has no coils', 'It is open loop and silently skips steps when overloaded', 'Microstepping is inaccurate', 'The DIR pin flips'], 1, 'Nothing measures the actual position.'],
    ['With 1/16 microstepping on a 200-step motor, how many pulses make one revolution?', ['200', '1600', '3200', '6400'], 2, '200 × 16 = 3200.']
  ]
});

D({
  n: 42, icon: '🔁', topic: 'Review', hours: 2, notion: '3f6cdfea8ce281f8a6e7ea9a2858d25f', svg: 'encoder',
  title: 'Week 2 review + catch-up',
  goal: 'Finish Week 2 and make sure the encoder loop really works — the robots depend on it.',
  tasks: [
    'Finish any unfinished task from M2 Days 8–13',
    'Re-run the one-revolution test 10 times. Record the error spread',
    'Explain out loud: PWM duty vs RPM, and why the encoder loop fixes the difference',
    'Make sure READMEs for reaction timer, web servo and encoder are pushed',
    'Update Confidence on Days 8–13'
  ],
  read: [['Reminder', 'The second half is your first real closed loop, and it is much harder than it sounds.']],
  links: [['SparkFun TB6612FNG Hookup Guide', 'https://learn.sparkfun.com/tutorials/tb6612fng-hookup-guide/all']],
  video: `
## The encoder loop is the foundation
@big Both robots this module depend on it
Review day. The single most important thing to check today is that your encoder position loop really works, because the line follower and the balancer both build on it.
Run the one-revolution test ten times and record the final error each time. Look at the spread, not just the average. A loop that is sometimes off by two counts and sometimes by forty has a problem worth fixing now.

## If the spread is large
| Symptom | Likely cause | Fix |
|---|---|---|
| always overshoots | gain too high, motor coasts | lower KP, brake at the end |
| stops short | dead-band | minimum command near the target |
| random big errors | missed encoder counts | IRAM ISR, pull-ups, shorter wires |
| direction wrong | A/B swapped | swap the sign or the wires |
If the results are inconsistent, use this table. Overshoot usually means the gain is too high or the motor coasts after you cut power. Stopping short is usually the dead-band. Random large errors often mean the ISR is missing counts.

## Explain it out loud
@big Duty sets voltage · the encoder measures what really happened · the loop corrects
Finally, explain out loud why PWM duty is not RPM, and how the encoder loop fixes it. Duty sets an average voltage. The real speed depends on battery, load and the motor. The encoder measures what actually happened, and the loop corrects the command until the measurement matches the goal.
If you can say that clearly, you understand closed-loop control, which is the heart of robotics. Make sure your three READMEs are pushed, and get ready for sensors next section.
`,
  key: [
    'Judge a loop by the spread of its errors, not just the average.',
    'Overshoot → lower gain; stopping short → dead-band; random errors → missed counts.',
    'Feedback corrects for everything open-loop duty cannot know.'
  ],
  quiz: [
    ['Your one-revolution loop occasionally ends 40 counts off for no clear reason. A likely cause?', ['The gear ratio changed', 'The ISR is missing encoder counts', 'The battery is full', 'PWM frequency is too low'], 1, 'Check IRAM_ATTR, pull-ups and wiring.'],
    ['Which best explains why an encoder loop beats open-loop duty?', ['It uses less power', 'It measures actual motion and corrects the command', 'It removes the gearbox', 'It runs faster'], 1, 'That is closed-loop control.']
  ]
});
// ───────────── Section 3 · Sensors and filtering ─────────────
D({
  n: 43, icon: '📏', topic: 'Sensors & filtering', hours: 2.5, notion: '3f6cdfea8ce281ce97abc8353fd6b97b', svg: 'filter',
  title: 'Distance sensors: ultrasonic vs time-of-flight',
  goal: 'Read both distance sensors and measure where each one fails.',
  tasks: [
    'Wire the HC-SR04 (it needs 5 V; divide its Echo pin down to 3.3 V for the ESP32 — your Month 1 divider)',
    'Wire the VL53L0X over I2C',
    'Plot both on the Serial Plotter while you move a book towards them',
    'Test 3 surfaces: hard wall, cushion/cloth, angled surface. Record which sensor fails where',
    'Test cone width: move an object sideways at 50 cm. Note when each sensor stops seeing it',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['Sensor notes', 'HC-SR04 ultrasonic, $3.95, cheap obstacle detection with a wide cone and poor performance on soft surfaces.\nVL53L0X time-of-flight laser, $14.95, a much narrower 35-degree cone and no double-imaging problems.']
  ],
  links: [
    ['Random Nerd Tutorials ESP32 projects (sensor guides)', 'https://randomnerdtutorials.com/getting-started-with-esp32/'],
    ['Arduino Official Docs, Learn section', 'https://docs.arduino.cc/learn/']
  ],
  extra: [['Random Nerd Tutorials: ESP32 projects index', 'https://randomnerdtutorials.com/projects-esp32/']],
  video: `
## Two ways to measure distance
| | HC-SR04 ultrasonic | VL53L0X time-of-flight |
|---|---|---|
| Signal | 40 kHz sound pulse | infrared laser pulse |
| Measures | echo time (sound ≈ 343 m/s) | photon round-trip time |
| Cone | wide | narrow (~35°) |
| Weak on | soft, angled surfaces | very dark or shiny surfaces, sunlight |
| Interface | trigger + echo pins, 5 V | I2C, 3.3 V |
| Price | ~$4 | ~$15 |
Robots need to know how far away things are. The two sensors in your kit do it in completely different ways.
The HC-SR04 sends a burst of ultrasound and times the echo. The VL53L0X fires an infrared laser pulse and times how long the light takes to bounce back, which needs picosecond-level timing on a chip. Both are time-of-flight sensors really: one uses sound, the other light.

## Ultrasonic: echo time to distance
@eq distance = echo time × 343 m/s ÷ 2 | divide by two: the sound goes there and back
For the ultrasonic sensor, you pulse the trigger pin, then measure how long the echo pin stays high. Multiply that time by the speed of sound and divide by two, because the sound travels to the object and back.
One catch for the ESP32: the HC-SR04 runs on five volts and its echo pin outputs five volts. Use a voltage divider to bring it down to three point three volts. Your Module 1 skills, used for real.

## Where each sensor fails
@svg filter | real sensors are noisy and have blind spots
Every sensor has failure modes, and knowing them matters more than knowing the datasheet's best case.
Sound reflects well off hard walls but gets absorbed by soft cushions and curtains, so the ultrasonic sensor can miss them completely. Hit a surface at a steep angle, and the echo bounces away, never returning.
Its wide cone also means it can see a table leg off to the side and report that instead of what is straight ahead.
The laser sensor has a narrower cone and handles soft surfaces better, but struggles with very dark, very shiny or sunlit targets.

## Today's experiment
1. Move a book towards both sensors: plot both live
2. Try a hard wall, a cushion, an angled surface
3. At 50 cm, slide an object sideways: when does each lose it?
Wire both sensors and plot them together on the Serial Plotter while you move a book towards them. They should roughly agree.
Then test three surfaces, a hard wall, a cushion and an angled board, and note which sensor fails where. Finally, measure each sensor's cone by sliding an object sideways at fifty centimetres.
Write the results as a small table in your log. That table is the kind of practical knowledge that saves you when your robot inexplicably crashes into a sofa.
`,
  key: [
    'Ultrasonic: distance = echo time × 343 m/s ÷ 2; wide cone; weak on soft or angled surfaces.',
    'VL53L0X laser ToF: narrow cone, I2C, weaker on dark/shiny/sunlit targets.',
    'Divide the HC-SR04 5 V echo down to 3.3 V for the ESP32.',
    'Characterise every sensor\'s failure modes, not just its best case.'
  ],
  quiz: [
    ['Why divide the ultrasonic echo time by two?', ['To convert to centimetres', 'The sound travels to the object and back', 'The sensor double-counts', 'To average the noise'], 1, 'The echo time covers the round trip.'],
    ['A robot\'s ultrasonic sensor never detects a sofa cushion. Why?', ['Cushions are too far', 'Soft surfaces absorb the sound so little echo returns', 'The sensor needs I2C', 'Cushions reflect light'], 1, 'Soft materials are a known weakness of ultrasonic sensing.']
  ]
});

D({
  n: 44, icon: '🌀', topic: 'Sensors & filtering', hours: 3, notion: '3f6cdfea8ce2811bb101c4ad5eb878d1', svg: 'filter',
  title: 'IMU: pitch from accel, drift from gyro',
  goal: 'First half of the IMU practice task — see that the accelerometer is noisy and the gyro drifts.',
  tasks: [
    'Read SparkFun: Accelerometer Basics and SparkFun: Gyroscope',
    'Mount the MPU-6050 firmly on a board. Read raw accel and gyro over I2C',
    'Compute pitch from the accelerometer: atan2(ax, az). Plot it. Tap the board: see the noise spikes',
    'Integrate the gyro: angle += gyroRate × dt. Hold the board perfectly still for 2 minutes. Watch it drift',
    'Measure the gyro bias at rest (average of 500 samples) and subtract it. Note how much drift is left',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['Practice task (Sensors)', 'Practice task: mount an IMU on a board, print the pitch angle to serial, hold the board perfectly still and watch the number drift anyway. Now add a complementary filter and watch that drift disappear, which is the single most important lesson in state estimation and it took you twenty minutes.']
  ],
  links: [
    ['MathWorks, Understanding Sensor Fusion and Tracking', 'https://www.mathworks.com/videos/series/understanding-sensor-fusion-and-tracking.html'],
    ['Adafruit BNO085 IMU guide', 'https://learn.adafruit.com/adafruit-9-dof-orientation-imu-fusion-breakout-bno085/overview']
  ],
  extra: [
    ['SparkFun: Accelerometer Basics', 'https://learn.sparkfun.com/tutorials/accelerometer-basics'],
    ['SparkFun: Gyroscope', 'https://learn.sparkfun.com/tutorials/gyroscope']
  ],
  video: `
## What an IMU measures
| Sensor | Measures | Units | Good at | Bad at |
|---|---|---|---|---|
| accelerometer | acceleration, including gravity | g or m/s² | long-term tilt (gravity points down) | noisy; any motion corrupts it |
| gyroscope | rotation rate | degrees per second | smooth, fast changes | drifts when integrated |
An IMU, an inertial measurement unit, combines an accelerometer and a gyroscope on one chip. The MPU-6050 has three axes of each.
The accelerometer measures acceleration, and at rest the only acceleration is gravity, pointing down. So the direction of that gravity vector tells you how the board is tilted.
The gyroscope measures how fast the board is rotating, in degrees per second. It knows nothing about absolute angle, only the rate of change.

## Tilt from the accelerometer
@eq pitch = atan2(ax, az) | gravity's direction gives the angle
If the board tilts forward, some of gravity shows up on the X axis and less on the Z axis. The arctangent of those two components gives the pitch angle. Use atan2, which handles all four quadrants correctly.
Plot it and it looks right, until you tap the board. Every tap, every vibration, every bit of motion is also acceleration, and it adds spikes to the angle. A robot's motors vibrate constantly, so accelerometer-only angles are far too noisy for balancing.

## Angle from the gyroscope
@eq angle = angle + rate × dt | integrate the rotation rate over time
The gyro gives rate, so to get an angle you integrate: every loop, add the rate times the time step to the running angle.
This is wonderfully smooth, with no tap spikes at all. But hold the board perfectly still for two minutes and watch the angle slowly creep away. That is drift.
Every gyro has a small bias, a non-zero reading at rest. Integrated over time, even a tiny bias grows into a large error.

## Removing the bias, and what remains
\`\`\`cpp
float bias = 0;
for (int i = 0; i < 500; i++) { bias += readGyroY(); delay(2); }
bias /= 500;                   // average at rest
// later: rate = readGyroY() - bias;
\`\`\`
You can reduce drift by measuring the bias at startup: average five hundred readings while the board is still, then subtract that from every reading.
Try it and the drift slows a lot. But it never disappears completely, because the bias itself changes with temperature and time.
So now you have the central dilemma of state estimation: one sensor is noisy but correct on average, the other is smooth but drifts. Tomorrow you combine them, and the drift disappears.
`,
  key: [
    'Accelerometer: tilt from gravity via atan2 — correct long-term, but noisy.',
    'Gyroscope: rotation rate; integrating it gives a smooth angle that drifts.',
    'Measure and subtract gyro bias at rest; residual drift remains.',
    'Noisy-but-unbiased vs smooth-but-drifting is the core fusion problem.'
  ],
  quiz: [
    ['Why does an integrated gyro angle drift even when the board is still?', ['Gravity pulls on it', 'A small bias in the rate reading accumulates over time', 'The I2C bus is slow', 'atan2 is inaccurate'], 1, 'Integration turns a tiny constant error into a growing one.'],
    ['Why is accelerometer-only pitch unsuitable for a balancing robot?', ['It drifts', 'Motion and vibration add large noise to it', 'It cannot measure tilt', 'It needs a magnetometer'], 1, 'Any acceleration besides gravity corrupts the angle.']
  ]
});

D({
  n: 45, icon: '🧮', topic: 'Sensors & filtering', hours: 2.5, notion: '3f6cdfea8ce28171ae53d29b0086fac0', svg: 'filter',
  title: 'Complementary filter: drift disappears',
  goal: 'Finish the IMU practice task with the 4-line complementary filter, and understand why it works.',
  tasks: [
    'Implement `angle = a * (angle + gyro * dt) + (1 - a) * accelAngle` with a = 0.98 and a fixed loop rate (e.g. 200 Hz using micros())',
    'Plot 3 lines: accel-only pitch, gyro-only pitch, filtered pitch. Screenshot it',
    'Try a = 0.90, 0.98, 0.995. Describe what changes (noise vs lag)',
    'Write in your own words: the gyro is trusted short-term, the accelerometer long-term',
    'Push to `month-2/imu-complementary/` with the plot',
    'Tick **Practice task done**. Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['Beginner tip', 'Beginner tip: for a balancing robot, write a complementary filter before you write a Kalman filter. It is four lines, angle = a * (angle + gyro * dt) + (1 - a) * accelAngle with a around 0.98, and it works. Graduate to Kalman when you understand why the complementary filter fails.'],
    ['Month 2 Milestone (this one)', 'Fuse accelerometer and gyroscope data into a stable angle estimate.']
  ],
  links: [['MathWorks, Understanding Sensor Fusion and Tracking', 'https://www.mathworks.com/videos/series/understanding-sensor-fusion-and-tracking.html']],
  video: `
## The most important lesson in state estimation
@big Trust the gyro short-term · trust the accelerometer long-term
The article calls today the single most important lesson in state estimation, and says it takes about twenty minutes.
Yesterday you found two flawed sensors. The gyro is smooth but drifts slowly. The accelerometer is noisy but, on average, correct. Their flaws are opposite, which means they can cover for each other.

## The complementary filter
@eq angle = a·(angle + gyro·dt) + (1 − a)·accelAngle | a ≈ 0.98
Here is the whole filter, in one line. Each loop, predict the new angle by integrating the gyro, exactly as yesterday. Then nudge that prediction slightly toward the accelerometer's angle.
With a at zero point nine eight, ninety-eight percent of the new estimate comes from the gyro prediction, and two percent from the accelerometer.
Short term, the gyro dominates, so taps and vibration barely register. Long term, that steady two percent pull toward the accelerometer cancels the drift, because the accelerometer is right on average.

## Why it is called complementary
- The gyro path acts like a high-pass filter: it keeps fast changes
- The accelerometer path acts like a low-pass filter: it keeps the slow truth
- Together they cover the whole frequency range
The name comes from signal processing. The gyro path keeps fast changes and forgets slow ones: a high-pass filter. The accelerometer path keeps slow trends and rejects fast noise: a low-pass filter.
The two filters complement each other exactly, so together they pass the true angle at all speeds.

## Code it with a fixed loop rate
\`\`\`cpp
const float A = 0.98;  float angle = 0;  unsigned long last = micros();
void loop() {
  unsigned long now = micros();
  if (now - last < 5000) return;              // 200 Hz
  float dt = (now - last) * 1e-6;  last = now;
  float acc  = atan2(ax(), az()) * 57.2958;   // degrees
  float rate = gyroY() - bias;                // deg/s
  angle = A * (angle + rate * dt) + (1 - A) * acc;
  Serial.printf("%.2f %.2f %.2f\\n", acc, gyroAngle += rate*dt, angle);
}
\`\`\`
Run the filter at a fixed rate, two hundred times a second, timed with micros, and use the real measured time step. Inconsistent timing is a common reason filters misbehave.
Plot three lines together: accelerometer only, gyro only, and filtered. The accelerometer line is jagged, the gyro line wanders away, and the filtered line is smooth and stays put. Screenshot that plot for your README. It is a beautiful picture of sensor fusion working.

## Tuning a: noise versus lag
| a | Behaviour |
|---|---|
| 0.90 | follows the accelerometer more: noisier, drift-free |
| 0.98 | the usual sweet spot |
| 0.995 | very smooth, but slow to correct drift |
Try three values. At zero point nine, the output gets noisier, because you trust the accelerometer more. At zero point nine nine five, it is silky smooth but takes longer to correct drift.
There is always a trade-off between noise and lag, and you will meet it again in every filter and controller you build. Write down which value you would choose for a balancing robot, and why. You have just met a Module 2 milestone: fusing accelerometer and gyro data into a stable angle.
`,
  key: [
    'angle = a·(angle + gyro·dt) + (1 − a)·accelAngle, with a ≈ 0.98.',
    'Gyro path = high-pass (fast changes); accel path = low-pass (slow truth).',
    'Run at a fixed rate and use the measured dt.',
    'Higher a = smoother but slower drift correction; lower a = noisier.'
  ],
  quiz: [
    ['In the complementary filter with a = 0.98, what cancels the gyro drift?', ['The 98% gyro term', 'The small steady pull toward the accelerometer angle', 'The bias calibration alone', 'The loop rate'], 1, 'The accelerometer is right on average, so the 2% term removes drift.'],
    ['What happens if you raise a from 0.98 to 0.995?', ['More noise, faster correction', 'Smoother output but slower drift correction', 'The filter stops working', 'Nothing changes'], 1, 'Classic noise-versus-lag trade-off.']
  ]
});

D({
  n: 46, icon: '📒', topic: 'Sensors & filtering', hours: 2.5, notion: '3f6cdfea8ce28122b4e1c9dfe25e0055', svg: 'kalman',
  title: 'Filtering theory: g-h and discrete Bayes',
  goal: 'Start the best free filtering course, so that Kalman filters later feel natural.',
  tasks: [
    'Watch MathWorks Sensor Fusion parts 1–2',
    'Open Roger Labbe\'s notebooks (Binder or local Jupyter). Do chapter 1 (g-h filter) and run every cell',
    'Do chapter 2 (discrete Bayes). Do at least 2 exercises',
    'Write 3 lines: what is the prediction step, what is the update step',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['Kalman and Bayesian Filters in Python', 'Jupyter notebooks with runnable code and solved exercises covering g-h, discrete Bayes, KF, EKF, UKF and particle filters, and it is the best free filtering education that exists.'],
    ['MathWorks sensor fusion', 'Six short parts from "what is sensor fusion" to fusing IMU and GPS for pose, and the right conceptual overview before you touch code.']
  ],
  links: [
    ['Kalman and Bayesian Filters in Python, Roger Labbe', 'https://rlabbe.github.io/Kalman-and-Bayesian-Filters-in-Python/'],
    ['MathWorks, Understanding Sensor Fusion and Tracking', 'https://www.mathworks.com/videos/series/understanding-sensor-fusion-and-tracking.html']
  ],
  video: `
## Why theory now
@big Every filter is: predict, then update
Yesterday's complementary filter works, but it is a hand-tuned trick. To go further, to Kalman filters, robot localisation and SLAM in Module 4, you need the underlying idea. The good news: it is surprisingly simple, and there is a superb free course for it.
Every filter in robotics follows the same two-step rhythm: predict, then update.

## Predict and update
1. Predict: use what you know about motion to guess the new state
2. Update: compare with a measurement and blend the two
3. Repeat every time step
Predict means: given where I think I was, and how I am moving, where should I be now? For the IMU, that was integrating the gyro.
Update means: a measurement has arrived; blend it with my prediction. For the IMU, that was the small pull toward the accelerometer.
How much to trust each one is the whole art. The complementary filter used a fixed fraction. Smarter filters work it out from how uncertain each source is.

## The g-h filter
@eq x = prediction + g·(measurement − prediction) | g sets how much to trust the measurement
Roger Labbe's first chapter introduces the g-h filter, the simplest member of the family. You predict the next value, look at the residual, the difference between measurement and prediction, and correct the prediction by a fraction g of it. A second gain, h, corrects the estimated rate of change.
Notice that this is the same shape as the complementary filter. It is the seed from which the Kalman filter grows.

## Discrete Bayes: belief as a histogram
@svg kalman | uncertain prediction + uncertain measurement → sharper belief
Chapter two represents belief as probabilities over positions, like a histogram. Imagine a robot in a corridor with doors. It does not know exactly where it is, so it holds a probability for each position.
Predict: when it moves, the belief shifts and spreads out, because motion is uncertain. Update: when it sees a door, multiply the belief by how likely a door is at each position. The probability piles up where the evidence agrees.
That predict-blur, measure-sharpen cycle is exactly how a robot localises itself on a map in Module 4.

## Today's plan
- MathWorks Sensor Fusion parts 1–2: the concepts
- Labbe chapter 1 (g-h) and chapter 2 (discrete Bayes): run every cell
- Do at least two exercises; write predict vs update in your own words
Watch the first two MathWorks videos for the big picture. Then open Labbe's notebooks, either in the browser through Binder or locally in Jupyter, and run every cell of chapters one and two.
Do at least two exercises, and finish by writing three lines in your own words: what the prediction step is, and what the update step is.
`,
  key: [
    'Every filter alternates predict (motion model) and update (measurement).',
    'g-h filter: correct the prediction by a fraction g of the residual.',
    'Discrete Bayes: prediction spreads belief; measurement multiplies and sharpens it.',
    'This is the foundation of Kalman filters and robot localisation.'
  ],
  quiz: [
    ['In a filter, what does the update step do?', ['Moves the robot', 'Blends the prediction with a new measurement', 'Resets the state', 'Increases uncertainty'], 1, 'Prediction uses motion; update uses measurement.'],
    ['In discrete Bayes, what happens to the belief during the prediction (motion) step?', ['It becomes sharper', 'It shifts and spreads out', 'It is reset to uniform', 'Nothing'], 1, 'Motion is uncertain, so belief blurs.']
  ]
});

D({
  n: 47, icon: '📈', topic: 'Sensors & filtering', hours: 2.5, notion: '3f6cdfea8ce281889f75da8f8c1baff6', svg: 'kalman',
  title: '1-D Kalman filter + (optional) BNO085',
  goal: 'Run a 1-D Kalman filter and see when it beats the complementary filter.',
  tasks: [
    'Labbe chapters 3–4 (Gaussians, one-dimensional Kalman filter). Run every cell',
    'Log 60 s of your IMU data to CSV (Serial → file). Run a 1-D Kalman filter on it in Python and compare with your complementary filter',
    'Optional: wire the BNO085 and read its on-chip quaternion. Compare its pitch with yours',
    'Write one paragraph: when the complementary filter fails',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [['BNO085', 'Covers an IMU that does sensor fusion on-chip and hands you a quaternion, which is the "buy your way out of the maths" option.']],
  links: [
    ['Kalman and Bayesian Filters in Python', 'https://rlabbe.github.io/Kalman-and-Bayesian-Filters-in-Python/'],
    ['Adafruit BNO085 9-DoF IMU guide', 'https://learn.adafruit.com/adafruit-9-dof-orientation-imu-fusion-breakout-bno085/overview']
  ],
  video: `
## Gaussians: a value plus its uncertainty
@svg kalman | prediction (wide) · measurement · fused (narrower)
The Kalman filter describes every estimate as a Gaussian, a bell curve with a mean and a variance. The mean is your best guess. The variance says how unsure you are.
That one change, carrying uncertainty along with every number, is what makes the Kalman filter smarter than yesterday's fixed-gain filters.

## The 1-D Kalman filter
| Step | Mean | Variance |
|---|---|---|
| predict | x = x + motion | P = P + Q (uncertainty grows) |
| gain | K = P ÷ (P + R) | — |
| update | x = x + K·(z − x) | P = (1 − K)·P (uncertainty shrinks) |
In one dimension the whole filter fits in a few lines. Predict: move the estimate by the expected motion, and add the process noise Q, because motion makes you less certain.
Then compute the Kalman gain: your uncertainty divided by your uncertainty plus the measurement noise R.
Update: move toward the measurement by that gain, and shrink your uncertainty.

## The Kalman gain is the clever part
@eq K = P ÷ (P + R) | unsure of yourself → trust the sensor · noisy sensor → trust yourself
The gain balances the two sources automatically. If your prediction is very uncertain and the sensor is precise, K approaches one: trust the measurement. If the sensor is noisy and you are confident, K approaches zero: mostly ignore it.
And because P changes over time, the gain adapts. The complementary filter's fixed zero point nine eight is replaced by a gain computed from how reliable each source actually is right now.

## When the complementary filter fails
- During sustained acceleration (a robot speeding up), the accelerometer angle is wrong for a long time
- A fixed blend cannot know the accelerometer is temporarily untrustworthy
- A Kalman filter can model that uncertainty; on-chip fusion (BNO085) handles it for you
The article says to graduate to Kalman when you understand why the complementary filter fails. Here is the main case: sustained acceleration. When a robot accelerates for a second or two, the accelerometer's tilt reading is wrong the whole time, and the fixed two percent pull drags the estimate the wrong way.
A Kalman filter can model that the accelerometer is less trustworthy during motion. Or you can buy your way out: the BNO085 does the fusion on-chip and hands you a quaternion directly.

## Today's experiment
\`\`\`python
import numpy as np
z = np.loadtxt("imu.csv", delimiter=",")[:, 0]   # accel angle column
x, P, Q, R = z[0], 1.0, 0.01, 4.0
est = []
for zi in z:
    P += Q                     # predict
    K = P / (P + R)            # gain
    x += K * (zi - x); P *= 1 - K   # update
    est.append(x)
\`\`\`
Log a minute of IMU data to a CSV file, then run a one-dimensional Kalman filter on it in Python and plot it against your complementary filter.
Experiment with Q and R. Raise R, and the filter trusts the measurements less and gets smoother. Raise Q, and it reacts faster. You will see the same noise-versus-lag trade-off, but now with a principled knob for each source of uncertainty.
`,
  key: [
    'Kalman represents estimates as Gaussians: mean + variance.',
    'Predict adds process noise Q; update shrinks variance using gain K = P ÷ (P + R).',
    'The gain adapts: trust whichever source is less uncertain right now.',
    'Complementary filters fail under sustained acceleration; Kalman or on-chip fusion helps.'
  ],
  quiz: [
    ['If the measurement noise R is much larger than the estimate uncertainty P, the Kalman gain K is…', ['Close to 1: trust the measurement', 'Close to 0: mostly ignore the measurement', 'Exactly 0.5', 'Negative'], 1, 'K = P ÷ (P + R) → small when R dominates.'],
    ['In which situation does a fixed complementary filter struggle most?', ['When the robot is perfectly still', 'During sustained acceleration', 'At low temperature only', 'When using I2C'], 1, 'The accelerometer angle is wrong for the whole acceleration.']
  ]
});

D({
  n: 48, icon: '🚗', topic: 'Robot build', hours: 3, notion: '3f6cdfea8ce28154a432cdfd34dbb44d', svg: 'sensethinkact',
  title: 'Line follower build, part 1: chassis and wiring',
  goal: 'A rolling chassis with both motors driven from the ESP32, powered from its own battery.',
  tasks: [
    'Assemble the chassis (Romi or 2WD acrylic). Mount motors, wheels, battery holder',
    'Draw the wiring diagram first: battery → driver VM, regulator → ESP32, common ground',
    'Wire ESP32 + TB6612FNG (or DRV8833) to both motors. Use your Month 1 soldering for solid connections',
    'Test: forward, backward, spin left, spin right, using non-blocking code',
    'Check the ESP32 does not reset when motors start (your Month 1 brown-out lesson). Add a capacitor or separate supply if it does',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['Line-following robot BOM', 'Line-following robot. Quality build roughly $105, budget build roughly $38.\n\nBill of materials, quality: ESP32-S3 $15.95, Pololu Romi chassis kit $39.95, TB6612FNG driver $14.77, QTR-8RC reflectance array $12.95, batteries and holder about $12, wiring and headers about $10.\n\nBudget version: generic ESP32 about $6, 2WD acrylic chassis about $12, DRV8833 $5.95, five TCRT5000 sensors about $3, batteries about $6, wiring about $5.']
  ],
  links: [
    ['SparkFun TB6612FNG Hookup Guide', 'https://learn.sparkfun.com/tutorials/tb6612fng-hookup-guide/all'],
    ['Arduino Project Hub (line follower builds)', 'https://projecthub.arduino.cc/']
  ],
  video: `
## Your first robot
@svg sensethinkact | sense the line · decide · steer the wheels
Today everything from the last three weeks comes together into your first real robot: a line follower. By the end of next section it will follow a black line on its own, with a controller you tuned yourself.
Today is part one: the chassis, the wiring and the motor tests. No sensors yet. A robot that cannot drive reliably will never follow a line reliably, so this foundation matters.

## Two ways to build it
| | Quality build (~$105) | Budget build (~$38) |
|---|---|---|
| Brain | ESP32-S3 | generic ESP32 |
| Chassis | Pololu Romi | 2WD acrylic |
| Driver | TB6612FNG | DRV8833 |
| Line sensor | QTR-8RC array | 5 × TCRT5000 |
The article gives two bills of materials. The quality build uses a Pololu Romi chassis, a TB6612FNG driver and an eight-sensor reflectance array, for about a hundred and five dollars. The budget build uses an acrylic chassis, a DRV8833 driver and five cheap infrared sensors, for under forty.
Both teach exactly the same lessons. The quality build is simply more forgiving.

## Draw the power plan first
1. Battery → motor driver VM (motor power)
2. Battery → regulator → ESP32 (logic power)
3. All grounds connected together
4. A big capacitor across the motor supply
Before you connect a single wire, draw the power plan. The battery feeds the motor driver directly. The ESP32 gets clean power through a regulator or its onboard regulator. And every ground connects together, so signals share a reference.
Add a large electrolytic capacitor, a few hundred microfarads, across the motor supply near the driver. You learned why on day twenty of Module 1: motor surges sag the supply, and brown-outs reset the brain.

## Wire it to last
- Solder where vibration could loosen things
- Keep motor wires away from signal wires
- Label everything; cable-tie neatly
Use your soldering skills for anything that could vibrate loose: the battery leads and motor connections especially. A robot that randomly loses a motor wire mid-run is a debugging nightmare.
Keep the noisy motor wires away from the sensor and logic wires where you can, and label things. Tidy wiring is not vanity. It makes fault-finding fast.

## The motion tests
\`\`\`cpp
void drive(int left, int right) { motorL(left); motorR(right); }
// forward: drive(180, 180)   back: drive(-180, -180)
// spin left: drive(-150, 150)   spin right: drive(150, -150)
\`\`\`
Write a drive function that takes a speed for each wheel, built on your signed motor function from day eleven. Then test forward, backward, spin left and spin right, using non-blocking timing to sequence them.
If a wheel spins the wrong way, swap that motor's two wires or flip its sign in code. If the robot curves when driving straight, that is the duty-versus-RPM lesson again, and the line sensors will correct it later.
Most important: watch for resets when the motors start. If the ESP32 reboots, fix the power before going any further.
`,
  key: [
    'Build and test driving before adding sensors.',
    'Power plan: battery → driver VM; regulated logic supply; common ground; bulk capacitor.',
    'Solder vibration-prone joints; separate motor and signal wiring.',
    'A drive(left, right) function underlies every later behaviour.'
  ],
  quiz: [
    ['Why add a large capacitor across the motor supply on the robot?', ['To make the motors faster', 'To absorb motor current surges so the logic supply does not brown out', 'To filter the line sensors', 'To charge the battery'], 1, 'The Module 1 brown-out lesson applied.'],
    ['How do you make a two-wheeled robot spin in place to the left?', ['Both wheels forward', 'Left wheel backward, right wheel forward', 'Only the left wheel forward', 'Both wheels backward'], 1, 'Opposite wheel directions spin it on the spot.']
  ]
});

D({
  n: 49, icon: '🔁', topic: 'Review', hours: 2, notion: '3f6cdfea8ce2813e92b4c80ffe96a9b1', svg: 'filter',
  title: 'Week 3 review + catch-up',
  goal: 'Finish Week 3. The line follower chassis must drive reliably before Week 4.',
  tasks: [
    'Finish unfinished tasks from M2 Days 15–20',
    'Explain the complementary filter and its weakness without notes',
    'Tidy the line follower wiring (cable ties, labels)',
    'Check the Module 3 gear list now — you will order it on Day 22',
    'Update Confidence on Days 15–20'
  ],
  read: [['Reminder', 'These two projects together teach more than any course will.']],
  links: [['Kalman and Bayesian Filters in Python', 'https://rlabbe.github.io/Kalman-and-Bayesian-Filters-in-Python/']],
  video: `
## The week in one idea
@big Sensors lie a little · filters combine them into something you can trust
This section was about turning imperfect measurements into reliable knowledge. Distance sensors with blind spots. An accelerometer that is noisy. A gyro that drifts. And filters, complementary and Kalman, that combine them into a stable estimate.
Today, close the gaps and get the robot chassis ready for the controller work in the final section.

## Explain it without notes
- Why the gyro drifts and the accelerometer is noisy
- How the complementary filter combines them
- When it fails (sustained acceleration) and what to do
Explain the complementary filter out loud: what each sensor is good and bad at, how the one-line filter blends them, and when it fails. If you get stuck, rewatch day forty-five at speed.

## Get the chassis race-ready
- Drives straight-ish, spins both ways, no resets
- Wiring tidied, cable-tied and labelled
- Battery charged, spare batteries ready
The line follower chassis must drive reliably before next section. Check it drives, spins both ways, and never resets. Tidy the wiring with cable ties and labels.

## Look ahead
- Day 22 of this module: order Module 3 gear (CAD, 3D printing, the SO-101 arm)
- The SO-101 arm kit is the big item — check prices and stock now
Next section, on day twenty-two, you order Module 3's gear. It includes the biggest purchase of the course, the SO-101 robot arm kit, plus 3D printing supplies. Look at the Gear tab today, check prices and stock, and decide between printing yourself or using a print service.
As the article says about the line follower and the balancer: these two projects together teach more than any course will. They start next section.
`,
  key: [
    'Filters turn imperfect sensors into trustworthy estimates.',
    'The chassis must drive reliably with no resets before adding control.',
    'Preview the Module 3 gear list (SO-101 arm, printing) before Day 22.'
  ],
  quiz: [
    ['Which pair of weaknesses does the complementary filter combine?', ['Slow I2C and fast SPI', 'Accelerometer noise and gyro drift', 'Motor dead-band and stall current', 'Encoder bounce and PWM'], 1, 'Opposite flaws cover for each other.'],
    ['What is the biggest item on the Module 3 gear list?', ['A multimeter', 'The SO-101 robot arm kit', 'A Raspberry Pi', 'A LiPo battery'], 1, 'Modules 5 and 6 depend on it.']
  ]
});
// ───────────── Section 4 · First robots: line follower and balancer ─────────────
D({
  n: 50, icon: '〰️', topic: 'Robot build', hours: 3, notion: '3f6cdfea8ce281fea5cff59591b1b374', svg: 'pid',
  title: 'Line sensors + P controller · ORDER Month 3 gear',
  goal: 'The robot follows a line with a P controller. And order everything Month 3 needs.',
  order: 'Order Module 3 gear today. On the Gear tab, Module 3: decide whether to buy a 3D printer, use a Fab Lab, or order prints (Craftcloud / JLC3DP). Order the SO-101 kit now — it is the most shipping-sensitive item in the course. Set each item to "Ordered".',
  tasks: [
    '**Order Month 3 gear** (see the ordering box above)',
    'Mount the QTR-8RC (or TCRT5000s) a few mm above the floor. Make a test track with black electrical tape on a light floor',
    'Calibrate: read min/max for each sensor over the line and the floor',
    'Compute a line position (weighted average, e.g. -1000 … +1000)',
    'P controller: correction = Kp × error; left = base + correction, right = base − correction',
    'Tune Kp until it follows (it will oscillate — that is tomorrow\'s job). Film it',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['Practice task for the month', 'Practice task for the month: build the line follower first, tune it with a P controller, then add the D term and watch the oscillation disappear, filming both versions.']
  ],
  links: [['Arduino Project Hub', 'https://projecthub.arduino.cc/']],
  extra: [['Improving the Beginner\'s PID (Brett Beauregard)', 'http://brettbeauregard.com/blog/2011/04/improving-the-beginners-pid-introduction/']],
  video: `
## Order day, then control day
- Module 3 gear: CAD tool, calipers, printing route, filament
- The SO-101 arm kit: order it now — it ships slowest
Day twenty-two, so first the ordering rule. Module 3 is mechanical design and manufacturing, so the list covers a CAD account, digital calipers, a 3D printing route, filament, and the SO-101 robot arm kit.
Decide today whether you will buy a printer, use a Fab Lab, or order printed parts from a service. And order the SO-101 kit now: it is the most shipping-sensitive item in the whole course, and Modules 5 and 6 depend on it.

## How a reflectance sensor sees the line
@big Black tape absorbs infrared · light floor reflects it
Each line sensor is an infrared LED next to a light detector, pointing at the floor. A light floor reflects lots of infrared back. Black tape absorbs it. So each sensor's reading tells you whether it is over the line or not.
Mount the array a few millimetres above the floor. Too high and the readings get weak and blurry; too low and it scrapes.
Then calibrate: sweep the robot across the line by hand, recording each sensor's minimum and maximum. Every sensor is slightly different, and calibration scales them all to the same range.

## From eight sensors to one number
@eq position = Σ(value_i × weight_i) ÷ Σ value_i | weights −3500 … +3500 → centre at 0
With calibrated readings, compute a single line position as a weighted average. Give each sensor a weight by its location, negative on the left, positive on the right. Sensors that see more black contribute more.
The result is a number that is zero when the line is centred, negative when it is to the left, positive to the right. That number is the error your controller will try to drive to zero.

## The P controller
\`\`\`cpp
const int BASE = 140;  float KP = 0.05;
void loop() {
  if (!tick()) return;                 // fixed rate, e.g. 200 Hz
  int error = readLinePosition();      // -3500 .. +3500
  int corr  = KP * error;
  drive(BASE + corr, BASE - corr);
}
\`\`\`
Now the controller, in three lines. The correction is proportional to the error. Add it to one wheel and subtract it from the other. If the line drifts right, the right wheel slows and the left speeds up, steering back toward the line.
Run it at a fixed rate, using your timer helper from day thirty. Consistent timing will matter even more tomorrow.

## Tuning Kp
| Kp | What the robot does |
|---|---|
| too low | sluggish; drifts off on curves |
| about right | follows, but wiggles |
| too high | violent zig-zag; loses the line |
Start with a small Kp and increase it. Too low, and the robot reacts lazily and runs off the track on curves. Too high, and it overcorrects, swinging wildly from side to side.
Somewhere in between, it follows the line, but it wiggles. That oscillation is expected: a P controller only looks at where the error is now, not where it is heading. Film this version, because tomorrow you add the D term and make the wiggle disappear.
`,
  key: [
    'Day 22: order Module 3 gear; the SO-101 kit ships slowest.',
    'Calibrate each reflectance sensor; compute a weighted-average line position (0 = centred).',
    'P control: correction = Kp × error; left = base + corr, right = base − corr.',
    'P-only followers oscillate because they ignore where the error is heading.'
  ],
  quiz: [
    ['The line drifts to the robot\'s right (positive error). What should the P controller do?', ['Slow both wheels equally', 'Speed up the left wheel and slow the right wheel', 'Speed up the right wheel only', 'Stop'], 1, 'left = base + corr, right = base − corr steers back to the line.'],
    ['Why does a P-only line follower usually wiggle?', ['The sensors are uncalibrated', 'It only reacts to the current error, not its rate of change', 'The battery is low', 'PWM is too slow'], 1, 'The D term adds that anticipation.']
  ]
});

D({
  n: 51, icon: '🎬', topic: 'Control', hours: 3, notion: '3f6cdfea8ce2816e9cb0fa7c767766e3', svg: 'pid',
  title: 'Add the D term + film both versions',
  goal: 'Prove you understand the loop — P-only vs PD, side by side on video.',
  tasks: [
    'Add D: correction = Kp × error + Kd × (error − lastError) / dt. Use a fixed loop time',
    'Tune Kd until the oscillation goes away. Then raise base speed and retune',
    'Log error over time to Serial for P-only and PD. Save both plots',
    'Film the P-only robot and the PD robot on the same track. Put the videos side by side',
    'README for `month-2/line-follower/`: video, wiring, gains, plots, what broke',
    'Tick **Practice task done**. Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['Why this video matters', 'The video of a badly tuned robot next to the same robot tuned properly is one of the most persuasive things a beginner can put in a portfolio, because it proves you understand the loop rather than having copied a gain.'],
    ['Month 2 Milestone (this one)', 'Explain what P, I and D each do by describing what your robot did when you changed them.']
  ],
  extra: [
    ['Improving the Beginner\'s PID (Brett Beauregard)', 'http://brettbeauregard.com/blog/2011/04/improving-the-beginners-pid-introduction/'],
    ['MATLAB Tech Talks: Understanding PID Control', 'https://www.mathworks.com/videos/series/understanding-pid-control.html']
  ],
  video: `
## What D adds
@eq u = Kp·e + Kd·de/dt | P reacts to where the error is · D reacts to where it is heading
Yesterday's P controller reacts to where the error is. If the robot is left of the line, it steers right, hard, and keeps steering right until it crosses the line, then overshoots the other way.
The derivative term looks at how fast the error is changing. As the robot swings back toward the line, the error is shrinking quickly, so the D term pushes back against the turn, easing off before the line is reached. It is anticipation, a brake on overshoot.

## Code it
\`\`\`cpp
float KP = 0.05, KD = 0.4;  int lastErr = 0;
void loop() {
  if (!tick()) return;                       // fixed dt
  int err  = readLinePosition();
  float d  = (err - lastErr) / DT;           // rate of change
  lastErr  = err;
  int corr = KP * err + KD * d * DT;          // or fold DT into KD
  drive(BASE + corr, BASE - corr);
}
\`\`\`
The code adds two lines: remember the last error, and compute the difference. With a fixed loop time, the difference divided by the time step is the rate of change.
This is why the plan insists on a fixed loop rate. If the time step jitters, the derivative jitters too, and the robot twitches.

## Tuning Kd
1. Keep yesterday's Kp
2. Increase Kd until the wiggle damps out
3. Too much Kd → jittery, nervous steering (noise is amplified)
4. Raise base speed, then retune both
Keep yesterday's Kp and start increasing Kd. The wiggle shrinks, then disappears, and the robot tracks the line smoothly.
Push Kd too far and the steering becomes nervous and jittery, because the derivative amplifies sensor noise. Back off a little.
Then raise the base speed. Faster robots need retuning, usually more Kd. Keep going until you find the fastest speed that still follows cleanly.

## Plot the proof
@svg filter | P-only error oscillates · PD error settles
Log the error over time for both versions and plot them. The P-only plot is a wave, swinging back and forth across zero. The PD plot settles quickly and stays near zero.
These plots, next to the videos, are evidence that you understand what each term does, which is exactly the milestone: explain P, I and D by describing what your robot did when you changed them.

## The side-by-side video
@big Badly tuned · well tuned · same robot, same track
The article says that a video of a badly tuned robot next to the same robot tuned properly is one of the most persuasive things a beginner can put in a portfolio, because it proves you understand the loop rather than having copied a gain.
Film both on the same track, put them side by side, and add them to the README with your gains, plots and what broke. That is your line follower finished, and the month's practice task done.
`,
  key: [
    'D reacts to the rate of change of error, damping overshoot.',
    'Use a fixed loop time so the derivative is clean.',
    'Too much Kd amplifies noise → jittery steering.',
    'A P-only vs PD side-by-side video proves you understand the loop.'
  ],
  quiz: [
    ['What does the D term respond to?', ['The total accumulated error', 'The rate of change of the error', 'The battery voltage', 'The base speed'], 1, 'Derivative = how fast the error is changing.'],
    ['After adding a large Kd, the robot steers nervously and twitches. Why?', ['Kd is too small', 'The derivative amplifies sensor noise', 'The line is too wide', 'The motors are too slow'], 1, 'Reduce Kd or filter the error.']
  ]
});

D({
  n: 52, icon: '🤸', topic: 'Robot build', hours: 3, notion: '3f6cdfea8ce2815e92d9ec9add6fd4d0', svg: 'cartpole',
  title: 'Balancer build: frame, motors, IMU, LiPo safety',
  goal: 'A solid self-balancing robot frame with encoder motors, a firmly mounted IMU, and safe LiPo power.',
  article: '⚠️ LiPo: balance charger only, never unattended, never puncture, store at storage voltage, add a low-voltage cutoff or monitor.',
  tasks: [
    'Build the frame (printed / laser-cut / plates + standoffs). Put the battery high — a higher centre of mass is easier to balance',
    'Mount the two encoder gearmotors and wheels',
    'Mount the MPU-6050 rigidly near the axle line. Vibration ruins the angle estimate',
    'Wire ESP32 + TB6612FNG + IMU + LiPo (via a regulator for the ESP32)',
    'Run your complementary filter on the robot. Check the angle reads 0 when it stands upright by hand',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['Self-balancing robot BOM', 'Self-balancing robot. Quality build roughly $134, budget build roughly $62.\n\nBill of materials, quality: ESP32 $15.95, two gearmotor-with-encoder assemblies $39.90, TB6612FNG $14.77, MPU-6050 $12.95, printed or laser-cut chassis about $10, LiPo and charger and wheels about $30, misc about $10.'],
    ['Battery basics (from Month 1)', 'Battery chemistry basics: LiPo cell counts, C ratings, and why you never leave a LiPo charging unattended.']
  ],
  extra: [['Adafruit: Li-Ion & LiPoly Batteries', 'https://learn.adafruit.com/li-ion-and-lipoly-batteries']],
  video: `
## The inverted pendulum
@svg cartpole | wheels move under the body to keep it upright
A self-balancing robot is an inverted pendulum: a body balanced on top of two wheels. Left alone, it falls. The only way to stay up is to drive the wheels under the body, in the direction it is falling, fast enough to catch it.
It is the same problem as balancing a broom on your hand, and it is a classic of control engineering. The article warns that it will not work at all until your filter and your loop timing are both correct, and that the frustration is the point.

## Design choices that make it easier
| Choice | Why |
|---|---|
| battery mounted high | higher centre of mass → falls more slowly → easier to catch |
| IMU rigid, near the axle | less vibration and less false acceleration |
| encoder gearmotors | lets you add a speed loop to stop drifting |
| low-backlash gearbox | slop in the gears delays the correction |
It feels backwards, but a taller robot with the battery mounted high is easier to balance. A higher centre of mass falls more slowly, the way a long broom is easier to balance than a pencil, giving the controller more time to react.
Mount the IMU rigidly, close to the axle line. Any wobble or vibration in its mount becomes noise in the angle. And mounting it near the axle reduces the false acceleration it feels when the wheels accelerate.

## LiPo power, safely
- Balance charger only; never charge unattended
- Never puncture or crush; retire swollen packs
- Don't run cells below about 3.0–3.3 V: use a cutoff or a voltage monitor
- Store at storage voltage (~3.8 V per cell)
This robot runs on a LiPo, so revisit the safety rules from Module 1. Balance charger only, never charge unattended, never puncture a pack, and retire any pack that swells.
Over-discharging also damages LiPos, so add a low-voltage cutoff or monitor the battery voltage with a divider into an analog pin. Your Module 1 divider skills, once again.

## Wiring
@svg battery | LiPo → driver VM · LiPo → regulator → ESP32 · common ground
The wiring follows the same plan as the line follower. The LiPo feeds the motor driver directly and the ESP32 through a regulator, all grounds are connected, and a bulk capacitor sits across the motor supply.
The IMU connects over I2C, exactly as on day thirty-two.

## First check: is upright zero?
- Run your complementary filter on the robot
- Hold it perfectly upright by hand: the angle should read about 0
- Note the offset; you will subtract it in the controller
Run your complementary filter on the assembled robot and hold it upright by hand. The angle should read close to zero. It rarely reads exactly zero, because the IMU is never mounted perfectly straight.
Find the balance point by feel and record the offset. That offset becomes the target angle for tomorrow's controller. Get this wrong by even two degrees, and the robot will constantly drive in one direction trying to stay up.
`,
  key: [
    'A balancer is an inverted pendulum: wheels must drive under the falling body.',
    'Battery high (slower fall) and a rigid IMU near the axle make it easier.',
    'Respect LiPo safety, including a low-voltage cutoff or monitor.',
    'Measure the real upright angle offset before tuning.'
  ],
  quiz: [
    ['Why is a balancer with its battery mounted high easier to control?', ['It is lighter', 'A higher centre of mass falls more slowly, giving the controller more time', 'The IMU reads better', 'The wheels grip more'], 1, 'Like a long broom versus a pencil.'],
    ['The angle reads 2° when the robot is truly balanced. What should you do?', ['Ignore it', 'Use that offset as the controller\'s target angle', 'Replace the IMU', 'Increase Kp'], 1, 'Otherwise the robot constantly drives one way.']
  ]
});

D({
  n: 53, icon: '⚖️', topic: 'Control', hours: 3, notion: '3f6cdfea8ce281199280c6e96df62ddd', svg: 'pid',
  title: 'Balancer: loop timing + first PID',
  goal: 'A fixed-rate control loop (filter + PID + motors) and the first seconds of balance.',
  tasks: [
    'Make the loop run at a fixed rate (e.g. 200 Hz) using micros(). Print the actual loop time to prove it is stable',
    'PID on angle: output = Kp·e + Ki·∫e + Kd·de/dt (use the gyro rate directly as the derivative)',
    'Tuning order: Kp until it oscillates around upright → add Kd to damp → small Ki for drift',
    'Add a safety cutoff: motors off if |angle| > 35°',
    'Log angle and output to CSV for later (Month 5 reuses this robot)',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['The balancer', 'Then build the balancer, which will not work at all until your filter and your loop timing are both correct, and that frustration is the point.']
  ],
  extra: [
    ['MATLAB Tech Talks: Understanding PID Control', 'https://www.mathworks.com/videos/series/understanding-pid-control.html'],
    ['Improving the Beginner\'s PID (Brett Beauregard)', 'http://brettbeauregard.com/blog/2011/04/improving-the-beginners-pid-introduction/']
  ],
  video: `
## The control loop, every 5 milliseconds
1. Read the IMU
2. Update the complementary filter → angle
3. PID on (target angle − angle) → motor command
4. Drive both motors
5. Wait for the next tick (no delay!)
The balancer's whole brain is one loop that runs two hundred times a second: read the IMU, update the filter, compute the PID output, drive the motors.
The rate must be fixed and reliable. Both the filter and the controller assume a known time step. If the loop sometimes takes five milliseconds and sometimes twelve, the angle estimate and the derivative are both wrong, and the robot will not balance no matter how you tune it.
So first, prove the timing. Print the measured loop time and confirm it is steady.

## Now all three terms
@eq u = Kp·e + Ki·∫e dt + Kd·de/dt | P: push back · I: remove steady lean · D: damp the swing
Today you use all three terms of PID. P pushes back in proportion to the tilt. D damps the swinging, exactly as on the line follower. And I, the integral, adds up the error over time, so if the robot keeps leaning slightly one way, the integral grows until it corrects that steady lean.
A neat trick: for the D term, use the gyro rate directly instead of differentiating the angle. The gyro measures the rate of change of the angle cleanly, without the noise of a numerical derivative.

## PID code
\`\`\`cpp
float target = OFFSET, integ = 0;
void control(float angle, float rate, float dt) {
  float e = target - angle;
  integ = constrain(integ + e * dt, -20, 20);       // limit windup
  float u = KP * e + KI * integ - KD * rate;        // gyro as derivative
  if (fabs(angle - target) > 35) { u = 0; integ = 0; }  // fallen: stop
  drive(u, u);
}
\`\`\`
Here is the controller. Notice two safety details. The integral is clamped, so it cannot grow huge while the robot lies on the floor; that problem is called windup and gets a full lesson in Module 5. And if the tilt exceeds thirty-five degrees, the robot has fallen, so the motors stop. Without that, a fallen balancer spins its wheels at full speed across the floor.

## The tuning order
| Step | Do | Look for |
|---|---|---|
| 1 | Ki = Kd = 0, raise Kp | it fights to stay up, oscillating around upright |
| 2 | raise Kd | oscillation damps out |
| 3 | small Ki | steady lean or slow drift corrected |
| 4 | repeat in small steps | one gain at a time |
Tune in this order. Start with only Kp, and raise it until the robot actively fights to stay up, oscillating back and forth around upright. Then add Kd until those oscillations damp out. Finally, add a small Ki to correct any steady lean.
Change one gain at a time, and write down what the robot did after every change. That log becomes tomorrow's README table, and it is how you meet the milestone of explaining P, I and D from your own robot's behaviour.
Log the angle and output to a CSV as well. In Module 5 you come back to this exact robot with more advanced control.
`,
  key: [
    'Run filter + PID + motors in one fixed-rate loop; verify the loop time is steady.',
    'Use the gyro rate as the derivative term (cleaner than differentiating the angle).',
    'Clamp the integral (windup) and cut motors beyond ~35° tilt.',
    'Tune Kp → Kd → Ki, one gain at a time, logging behaviour.'
  ],
  quiz: [
    ['Why use the gyro rate directly as the D term on a balancer?', ['It is required by the IMU', 'It measures the angle\'s rate of change cleanly, without numerical-derivative noise', 'It removes the need for P', 'It is faster to compute only'], 1, 'The gyro already gives d(angle)/dt.'],
    ['Why stop the motors when the tilt exceeds about 35°?', ['To save battery only', 'The robot has fallen; otherwise it races across the floor', 'The IMU stops working', 'PID becomes negative'], 1, 'A safety cutoff for a fallen robot.']
  ]
});

D({
  n: 54, icon: '🏆', topic: 'Control', hours: 3, notion: '3f6cdfea8ce281a6be67dd701fe82078', svg: 'cartpole',
  title: 'Balancer: tune until it stands + video',
  goal: 'The robot balances for 30 seconds and survives a gentle push.',
  tasks: [
    'Continue tuning. Change one gain at a time and write what the robot did',
    'If it drifts away: add an outer loop on wheel speed (encoder) that nudges the target angle',
    'Push test: tap it gently. Film it',
    'README for `month-2/balancer/`: video, wiring, loop rate, gains, a table "gain change → behaviour", what broke',
    'Tick **Practice task done**. Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['Month 2 Milestone (these ones)', 'Explain what P, I and D each do by describing what your robot did when you changed them.\nShow two working robots on GitHub with wiring, code and a written account of what broke.']
  ],
  links: [['Kalman and Bayesian Filters in Python', 'https://rlabbe.github.io/Kalman-and-Bayesian-Filters-in-Python/']],
  video: `
## The goal: thirty seconds and a push
@big Balance for 30 seconds · survive a gentle tap
Today you keep tuning until the robot balances on its own for thirty seconds and recovers from a gentle push. It may take the whole session, and that is normal. Persistence is the main skill being trained here.

## Diagnosing by behaviour
| What you see | Likely cause | Try |
|---|---|---|
| falls slowly in one direction | wrong target angle | adjust the offset |
| fast buzzing / jitter | Kd too high or noisy | lower Kd |
| big slow oscillations | Kp too high, Kd too low | lower Kp or raise Kd |
| reacts too late, falls | loop too slow, or backlash | check loop time, gearbox |
| stands but rolls away | no speed control | add the outer speed loop |
Learn to read the robot. If it always falls the same way, the target angle is off. If it buzzes, Kd is too high or the signal is noisy. Big slow swings mean Kp is too high or Kd too low.
If it reacts too late and falls no matter what, check the loop timing, and check for slack in the gearbox. Backlash means the wheels do not respond until the gears take up the slop, and that delay can make balancing impossible.

## The drift problem and the outer loop
@svg pid | outer loop on wheel speed nudges the inner loop's target angle
A common situation: the robot stays upright but slowly rolls away across the room. The angle loop is doing its job, keeping it balanced, but nothing is controlling where it goes.
The fix is a second, slower loop around the first. Measure wheel speed with the encoders. If the robot is rolling forward, tilt the target angle very slightly backward, so it has to drive backward to stay upright, which slows it down.
This is called cascaded control: an outer loop setting the target for an inner loop. You will see it everywhere, from drones to robot arms.

## Document it properly
| Gain change | What the robot did |
|---|---|
| Kp 15 → 30 | stopped falling; oscillated at about 2 Hz |
| Kd 0 → 0.8 | oscillation damped; held for 10 s |
| Kd 0.8 → 2.0 | buzzing; motors hot |
| Ki 0 → 0.5 | stopped leaning forward |
Your README for the balancer should include a table like this: each gain change and what the robot did. That table is the milestone in written form.
Add the video, including the push test, the wiring, the loop rate, the final gains, and the what broke story. With the line follower and the balancer both on GitHub, you meet the last milestone item: two working robots with wiring, code and an honest account of what went wrong.
`,
  key: [
    'Read the robot\'s behaviour to choose which gain to change.',
    'Backlash and slow loops make balancing impossible regardless of gains.',
    'Cascaded control: a slow outer speed loop sets the inner angle loop\'s target.',
    'Document a "gain change → behaviour" table in the README.'
  ],
  quiz: [
    ['The balancer stays upright but slowly rolls across the room. What fixes it?', ['Increase Kd', 'An outer wheel-speed loop that nudges the target angle', 'Remove the integral term', 'Lower the battery'], 1, 'Cascaded control handles position/speed drift.'],
    ['The robot always falls slowly in the same direction. Most likely?', ['Kd too high', 'The target (upright) angle offset is wrong', 'The battery is full', 'Encoders reversed'], 1, 'Adjust the balance-point offset.']
  ]
});

D({
  n: 55, icon: '🧪', topic: 'Milestone', hours: 2.5, notion: '3f6cdfea8ce2815793ebdac209ff000c', svg: 'robot',
  title: 'Month 2 milestone test',
  goal: 'Prove every Month 2 milestone item.',
  tasks: [
    'Go through each milestone item in the reading. For each, show it working or explain it out loud (record if alone)',
    'Wire a sensor you have not used yet from its datasheet only (no tutorial)',
    'Fix any failing item',
    'Check Month 3 gear: has the SO-101 kit shipped? Does Month 3 Week 1 need anything (CAD account, calipers)?',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['Month 2 Milestone', 'By the end of this month you should be able to:\n\nDrive a motor at a controlled speed and know the difference between PWM duty and actual RPM.\nRead an encoder and close a position loop around it.\nWire and read an I2C sensor from its datasheet without a tutorial.\nFuse accelerometer and gyroscope data into a stable angle estimate.\nExplain what P, I and D each do by describing what your robot did when you changed them.\nShow two working robots on GitHub with wiring, code and a written account of what broke.']
  ],
  links: [['SparkFun: How to Read a Datasheet', 'https://learn.sparkfun.com/tutorials/how-to-read-a-datasheet']],
  video: `
## Six milestone items
| Milestone item | How to prove it |
|---|---|
| PWM duty vs actual RPM | show the speed change at the same duty on two supplies |
| encoder position loop | one revolution, ten times, small error |
| I2C sensor from the datasheet | a new sensor, no tutorial |
| fused angle estimate | the three-line plot |
| P, I and D explained | your gain-change table, out loud |
| two robots on GitHub | line follower + balancer READMEs |
Milestone day. The article lists six things you should be able to do by the end of Module 2. Go through them one by one, and for each, either show it working or explain it out loud. If you are alone, record yourself.

## The datasheet challenge
@big A sensor you have never used · its datasheet · nothing else
The hardest item is wiring and reading a sensor from its datasheet alone. To make it a real test, pick a sensor you have not used yet, maybe the time-of-flight sensor's register map, the BNO085, or anything in your kit.
Find its address, find an identity or status register, read it, and then read one real measurement. No tutorials, no libraries. If you manage it, you can work with almost any sensor you will ever meet.

## Explain P, I and D from experience
- P: "When I raised Kp, the robot fought harder but started to oscillate."
- D: "Adding Kd damped the swinging; too much made it buzz."
- I: "A little Ki stopped the slow forward lean."
The milestone is not to recite definitions. It is to explain each term by describing what your robot did when you changed it. Use your own logs and tables.
If you can say, for example, that raising Kp made the balancer fight harder but oscillate, that Kd damped the swinging until too much made it buzz, and that a little Ki stopped a slow lean, you have it.

## Fix, then look ahead
- Redo any item that fails
- Check: SO-101 kit shipped? CAD account created? Calipers ordered?
Fix whatever fails. Then check Module 3's readiness: has the SO-101 kit shipped, do you have a CAD account, and are calipers on the way? Tomorrow is the retro, and then you start designing your own parts.
`,
  key: [
    'Prove each of the six milestone items by demonstration or explanation.',
    'The datasheet-only sensor test proves you can work with any new part.',
    'Explain P, I and D using your own robot\'s recorded behaviour.',
    'Check Module 3 readiness: SO-101 shipping, CAD account, calipers.'
  ],
  quiz: [
    ['How should you prove the "P, I and D" milestone item?', ['Recite textbook definitions', 'Describe what your robot did when you changed each gain', 'Copy gains from a tutorial', 'Show the code only'], 1, 'Understanding comes from observed behaviour.'],
    ['Which two robots should be on GitHub by the end of Module 2?', ['A drone and a rover', 'The line follower and the self-balancing robot', 'A robot arm and a printer', 'A web server and a game'], 1, 'With wiring, code and what broke.']
  ]
});

D({
  n: 56, icon: '🏁', topic: 'Review', hours: 1.5, notion: '3f6cdfea8ce28132816bc057239975f7', svg: 'sketch',
  title: 'Month 2 retro + Month 3 prep',
  goal: 'Close Month 2 and be ready to start CAD tomorrow.',
  tasks: [
    'Tick the Module 2 milestone list in your notes, mark Milestone met, write the retro',
    'Review all Module 2 days on the Schedule tab: anything Stuck or Not started? Redo or set Skipped',
    'Create a free Onshape or Fusion Personal account (Module 3 Day 1)',
    'Read the Module 3 preview in the reading lesson',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['Month 3 preview', 'Your goal this month: design a part in CAD, manufacture it, and have it fit.\n\nThis is the month that separates people who assemble kits from people who build robots.']
  ],
  video: `
## Two robots in four weeks
@big From blinking an LED to a robot that balances itself
Four weeks ago you blinked an LED with an Arduino. Since then you have used PWM, interrupts and I2C, served a web page from a microcontroller, driven motors through a proper driver, closed a position loop with an encoder, fused an IMU into a stable angle, and tuned two robots with PID.
That is a huge amount. Today you close the module with a retro and get ready for something completely different.

## The retro
1. What went well?
2. What was hard?
3. What will I change next module?
Answer the three retro questions, specifically. What went well? Maybe the encoder loop clicked. What was hard? Maybe the balancer took days. What will you change? Maybe log gain changes from the very first attempt.
Then check the Schedule tab for any Module 2 days still stuck or not started, and decide: redo, or skip on purpose.

## Module 3: from kits to your own parts
@svg sketch | design it · make it · make it fit
Module 3's goal: design a part in CAD, manufacture it, and have it fit. The article says this is the month that separates people who assemble kits from people who build robots.
You will learn parametric CAD, 3D printing with real tolerances, gears and backlash, and you will assemble the SO-101 robot arm that carries you through Modules 5 and 6.

## Prepare tonight
- Create a free Onshape or Fusion Personal account
- Check the SO-101 kit's shipping status
- Find your calipers
To start smoothly tomorrow, create a free CAD account now, either Onshape or Fusion Personal. Tomorrow's lesson helps you pick one for good. Check the SO-101 shipping status, and find your calipers.
Write one sentence in your log: what can you do now that you could not do four weeks ago? Then, when you are ready, start Module 3.
`,
  key: [
    'Module 2 delivered two closed-loop robots and the skills underneath them.',
    'Retro: what went well, what was hard, what will change.',
    'Module 3 goal: design a part in CAD, manufacture it, and have it fit.',
    'Create a CAD account and check SO-101 shipping before Day 1.'
  ],
  quiz: [
    ['What is the goal of Module 3?', ['Install ROS 2', 'Design a part in CAD, manufacture it, and have it fit', 'Train a robot policy', 'Build a line follower'], 1, 'From the Month 3 preview.'],
    ['What should you set up before Module 3 Day 1?', ['A Hugging Face account', 'A free Onshape or Fusion Personal account', 'ROS 2 Jazzy', 'A LiPo charger'], 1, 'Day 1 starts the CAD course.']
  ]
});
// @@END
