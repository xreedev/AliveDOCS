/* Module 5 · Control, kinematics, vision & manipulation (days 113–140). Source: Notion Daily Plan. */

// ───────────── Section 1 · PID and state space ─────────────
D({
  n: 113, icon: '🎛️', topic: 'Control', hours: 2.5, notion: '3f6cdfea8ce281ba8ac3ed513f8bfdc7', svg: 'pid',
  title: 'PID: what P, I and D physically do',
  goal: 'Connect the gains you tuned by feel in Month 2 to what each term actually does.',
  tasks: [
    'Read the Month 5 intro below',
    'Watch MATLAB Tech Talks: Understanding PID Control, parts 1–3',
    'For each of P, I, D write: what it reacts to, what it fixes, how it fails',
    'Re-read your Month 2 line follower and balancer logs. Match each behaviour you saw to a term',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['Month 5 goal', 'Your goal this month: understand and implement the control and perception underneath everything you have built\nUp to now you have used libraries that did the hard parts for you\nThis month is where you learn what they were doing, because the difference between someone who can configure Nav2 and someone who can fix Nav2 when it misbehaves is exactly this material\nYou do not need all of it at research depth. You need working fluency in control, enough kinematics to reason about an arm, and enough vision to get 3D information out of a camera'],
    ['1. Control theory, starting with PID', 'You already tuned a PID controller by feel in month two. Now learn why it worked'],
    ['What to focus on', 'What each of P, I and D physically does, and the failure mode of each']
  ],
  links: [
    ['Understanding PID Control, MATLAB Tech Talks (Brian Douglas)', 'https://www.mathworks.com/videos/series/understanding-pid-control.html'],
    ['Brian Douglas, Control System Lectures', 'https://www.youtube.com/@BrianBDouglas/playlists']
  ],
  video: `
## Welcome to the maths month
@big Configure Nav2 vs fix Nav2 | the difference is this module
Welcome to Module 5. Up to now, libraries did the hard parts for you. This month you learn what they were doing: control, kinematics, vision and manipulation.
The article is reassuring about depth. You do not need research-level theory. You need working fluency in control, enough kinematics to reason about an arm, and enough vision to get 3D information out of a camera.

## The feedback loop
@eq u(t) = Kp·e(t) + Ki·∫e dt + Kd·de/dt | e = target − measured
You already tuned a PID controller by feel in Module 2. Now learn why it worked. The controller measures the error, the difference between where you want to be and where you are, and computes an output from three terms.
The proportional term looks at the error now. The integral term looks at the error accumulated in the past. The derivative term looks at how fast the error is changing, a guess about the future.

## P: a spring
- Reacts to: the error right now
- Fixes: pulls the system toward the target, harder the further away
- Fails: too low → sluggish and droops · too high → overshoot and oscillation
Think of P as a spring pulling toward the target. Large error, large push. It does most of the work in almost every controller.
Its failure modes are the ones you saw on the line follower. Too little gain, and the robot is lazy and never quite reaches the line. Too much, and it overshoots, swings back, and oscillates.

## I: a memory
- Reacts to: error accumulated over time
- Fixes: steady-state error that P alone leaves behind
- Fails: windup → big overshoot, slow oscillation, a "slam" after a limit
The integral term is a memory. If a small error persists, the integral keeps growing until the output is large enough to remove it. That is how a controller overcomes friction or a constant load.
Its failure is windup. If the error stays large for a while, say the motor is saturated, the integral grows huge, and when the system finally moves, it overshoots badly. You fix that tomorrow.

## D: a damper
- Reacts to: how fast the error is changing
- Fixes: overshoot and oscillation, by braking as you approach
- Fails: amplifies sensor noise → jittery, buzzing motors
The derivative term is a damper, like a shock absorber. If you are approaching the target quickly, D pushes back, braking before you overshoot. It is why your balancer stopped wobbling when you added it.
Its failure is noise. Differentiating a noisy signal produces large, random spikes, so a high D gain makes motors buzz and jitter. Filtering is the cure.

## Match it to your Month 2 logs
| What you saw in Month 2 | The term responsible |
|---|---|
| line follower lazily drifts off the line | P too low |
| balancer oscillates faster and faster | P too high, D too low |
| balancer slowly leans and creeps | missing I (or offset) |
| motors buzz when D is turned up | D amplifying IMU noise |
Today's exercise is to reopen your Module 2 logs and match each behaviour to a term. A lazy line follower was too little P. A balancer that oscillated was too much P and not enough D. A slow creep is a job for I, and buzzing motors were D amplifying noise.
Write your own table: for each term, what it reacts to, what it fixes, and how it fails. That table is the start of the milestone: explaining every term from measured data.
`,
  key: [
    'Module 5: the control, kinematics and vision underneath the libraries.',
    'P reacts to error now (a spring); too high oscillates, too low droops.',
    'I reacts to accumulated error (a memory); removes steady-state error but winds up.',
    'D reacts to the rate of change (a damper); reduces overshoot but amplifies noise.'
  ],
  quiz: [
    ['Which PID term removes a small persistent error caused by friction?', ['P', 'I', 'D', 'None'], 1, 'The integral grows until the error is gone.'],
    ['Motors buzz and jitter when you raise one gain. Which one?', ['Kp', 'Ki', 'Kd', 'Feedforward'], 2, 'Differentiating noise amplifies it.']
  ]
});

D({
  n: 114, icon: '🌪️', topic: 'Control', hours: 2.5, notion: '3f6cdfea8ce28112bcf4f3737f2230a8', svg: 'pid',
  title: 'Windup, derivative noise, feedforward',
  goal: 'Fix the three classic PID problems in code.',
  tasks: [
    'Watch PID Tech Talks parts 4–7 (windup, derivative filtering, tuning, manual vs automatic)',
    'Read Brett Beauregard\'s "Improving the Beginner\'s PID" series',
    'Write a PID class (Python or C++) with: anti-windup clamp, derivative-on-measurement, low-pass filter on D, feedforward input, output limits',
    'Test it on a simple simulated plant (e.g. first-order motor model in Python)',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [['What to focus on', 'Integrator windup, and why your arm slams when it comes off a limit\nWhy the derivative term amplifies sensor noise and needs filtering\nFeedforward, which is the cheapest performance improvement most people never add']],
  links: [
    ['Understanding PID Control (parts 4–7)', 'https://www.mathworks.com/videos/series/understanding-pid-control.html'],
    ["Improving the Beginner's PID (Brett Beauregard)", 'http://brettbeauregard.com/blog/2011/04/improving-the-beginners-pid-introduction/', 'extra']
  ],
  video: `
## Three classic problems
1. Integrator windup: the arm slams when it comes off a limit
2. Derivative noise: D amplifies sensor noise
3. No feedforward: the cheapest improvement most people never add
The textbook PID equation works on paper and misbehaves on real hardware. The article names three classic problems: integrator windup, derivative noise, and missing feedforward.
Today you write a PID class that fixes all three, plus output limits, and test it on a simulated motor. You will reuse this class for the rest of the course.

## Windup and the slam
@eq if output saturated: stop integrating (or clamp the integral) | anti-windup
Imagine an arm pushed against a hard limit. The error stays large, so the integral grows and grows. When the obstacle is removed, that huge stored integral drives the arm at full power past the target: the slam the article describes.
The fix is anti-windup. The simplest version: clamp the integral to a sensible range, and stop integrating whenever the output is already saturated. One extra if statement prevents a lot of broken hardware.

## Derivative on measurement, and a filter
@eq D = −Kd · d(measured)/dt, low-pass filtered | not d(error)/dt
Two fixes for D. First, take the derivative of the measurement, not of the error. When you change the target suddenly, the error jumps, and its derivative spikes: the derivative kick. The measurement does not jump, so no kick.
Second, low-pass filter the derivative. A simple exponential filter, blending the new value with the old, removes most of the noise while keeping the damping. You built exactly this filter in Module 2.

## Feedforward: the cheap win
@eq u = feedforward(target) + PID(error) | feedback only fixes what feedforward missed
Feedback waits for an error to appear, then reacts. Feedforward uses what you already know about the system to act before any error appears. If you know holding an arm level needs a certain torque, just add it.
The article calls feedforward the cheapest performance improvement most people never add. With good feedforward, the PID only corrects small leftovers, so you can use gentler gains and get a faster, calmer response.

## The PID class
\`\`\`python
class PID:
    def __init__(s, kp, ki, kd, umin, umax, alpha=0.2):
        s.kp, s.ki, s.kd, s.umin, s.umax, s.a = kp, ki, kd, umin, umax, alpha
        s.i = 0.0; s.prev = None; s.d = 0.0
    def step(s, target, meas, dt, ff=0.0):
        e = target - meas
        if s.prev is not None:                       # derivative on measurement
            raw = -(meas - s.prev) / dt
            s.d = s.a * raw + (1 - s.a) * s.d        # low-pass filter
        s.prev = meas
        u = ff + s.kp * e + s.i + s.kd * s.d
        if s.umin < u < s.umax:                      # anti-windup: integrate only if not saturated
            s.i += s.ki * e * dt
        return min(max(u, s.umin), s.umax)           # output limits
\`\`\`
Here is a compact version with every fix. Derivative on measurement, filtered. A feedforward input added straight to the output. The integral only grows when the output is not saturated. And the output is clamped to the actuator's limits.
Write your own, in Python or C++, and do not just copy this one. Understanding each line is the point.

## Test on a simulated motor
\`\`\`python
# first-order motor: speed responds to voltage with time constant tau
tau, K, dt = 0.3, 2.0, 0.01
w = 0.0
for k in range(500):
    u = pid.step(target=1.0, meas=w, dt=dt)
    w += dt * (K * u - w) / tau
\`\`\`
A first-order motor model is enough: the speed moves toward gain times voltage, with a time constant. Run your controller against it and plot the response.
Then break it on purpose. Add noise to the measurement and compare filtered and unfiltered D. Saturate the output and compare with and without anti-windup. Seeing each fix work is what makes it stick.
`,
  key: [
    'Anti-windup: clamp the integral and stop integrating when saturated.',
    'Take D on the measurement (no derivative kick) and low-pass filter it.',
    'Feedforward acts before an error appears; the cheapest improvement most people skip.',
    'A reusable PID class: limits, anti-windup, filtered D, feedforward.'
  ],
  quiz: [
    ['Why compute the derivative on the measurement instead of the error?', ['It is faster', 'A sudden target change causes no derivative kick', 'It removes the need for P', 'It prevents windup'], 1, 'The measurement does not jump when the setpoint does.'],
    ['What is integrator windup?', ['D amplifying noise', 'The integral growing huge while the output is saturated, causing overshoot', 'Too little P', 'A broken encoder'], 1, 'Fix: clamp or stop integrating when saturated.']
  ]
});

D({
  n: 115, icon: '📘', topic: 'Control', hours: 2.5, notion: '3f6cdfea8ce281d3b18bcbe4dc8342db', svg: 'arm',
  title: 'Steady-state error + gravity compensation',
  goal: 'Know when the integrator is the right fix and when gravity compensation is.',
  tasks: [
    'Read the relevant chapters of The Fundamentals of Control Theory (feedback, steady-state error)',
    'Simulate a 1-link arm holding a position against gravity with P only → note the droop. Add I → note the overshoot. Instead add gravity feedforward (m·g·l·cosθ) → compare',
    'Write one paragraph: integrator vs gravity compensation',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['What to focus on', 'Steady-state error, and when an integrator is the fix versus when gravity compensation is the fix'],
    ['The Fundamentals of Control Theory', 'The written companion to the videos, and a coherent narrative rather than scattered lessons']
  ],
  links: [
    ['The Fundamentals of Control Theory, Brian Douglas', 'https://engineeringmedia.com/books'],
    ['Feedback Systems, Åström and Murray (free PDF)', 'https://fbswiki.org/wiki/index.php/Feedback_Systems:_An_Introduction_for_Scientists_and_Engineers']
  ],
  video: `
## Why P alone droops
@eq Kp · e = load  →  e = load / Kp | a steady error is needed to produce any output
Steady-state error is the error left over once everything has settled. With P only, the controller can only push when there is an error. If the system needs a constant push to hold position, like an arm against gravity, some error must remain to produce it.
The droop equals the load divided by Kp. Raising Kp shrinks it, but never to zero, and too much Kp brings oscillation. So you need another tool.

## The one-link arm
@eq τ_gravity = m · g · l · cos θ | largest when horizontal, zero when vertical
Today's simulation is a single link, a pendulum driven by a motor. Gravity creates a torque of mass times g times the distance to the centre of mass times cos theta. It is largest when the arm is horizontal, and zero when it points straight up or down.
That is a known, predictable load. Keep that word in mind: predictable.

## Option 1: the integrator
- Accumulates the droop until the output cancels gravity
- Works for any constant, unknown load
- But: slow to build up, overshoots, and gravity changes with angle
The first fix is the integrator. It accumulates the droop until its output cancels gravity, and the error goes to zero. It works for any constant load, even one you know nothing about.
But it is slow to build up, it causes overshoot, and here the load is not constant: as the arm moves, cos theta changes, so the integrator is always chasing a moving target.

## Option 2: gravity compensation
\`\`\`python
def control(theta_target, theta, omega, dt):
    ff = m * g * l * np.cos(theta)            # gravity compensation (feedforward)
    return ff + pid.step(theta_target, theta, dt)
\`\`\`
The second fix is gravity compensation: compute the gravity torque from the model and add it as feedforward. It cancels gravity instantly, at every angle, before any error appears.
The PID then only has to deal with small model errors and disturbances, so a small integral, or none, is enough. This is how every serious arm controller works, including the one in your SO-101's future.

## Run the comparison
| Controller | Droop | Overshoot | Settling |
|---|---|---|---|
| P only | yes | small | fast |
| P + I | no | larger | slow |
| P + gravity FF | ~none | small | fast |
Simulate all three and fill in a table like this. P only droops. Adding I removes the droop but overshoots and settles slowly. P plus gravity compensation holds position with almost no droop, and stays fast.
Try it at several target angles, not just one. The integrator's weakness shows most when the arm moves between angles.

## The rule of thumb
@big Known load → model it (feedforward) · unknown leftover → integrate it
Your paragraph today should land on this rule. If you know the load, like gravity, model it and feed it forward. Use the integrator only for the small, unknown leftover: friction, model error, a payload you did not plan for.
That is the answer to the article's question: when an integrator is the fix, and when gravity compensation is the fix.
`,
  key: [
    'P alone leaves a steady-state error of load / Kp.',
    'Gravity torque on a link is m·g·l·cosθ: predictable, so model it.',
    'The integrator removes unknown constant loads but is slow and overshoots.',
    'Rule: feed forward known loads, integrate only the unknown leftover.'
  ],
  quiz: [
    ['An arm holding position with P-only control sags. Best fix for a known gravity load?', ['Increase Kd', 'Add gravity compensation feedforward', 'Remove P', 'Lower the sample rate'], 1, 'Model the known load and cancel it.'],
    ['When is an integrator the right fix?', ['For a known, angle-dependent load', 'For a small unknown constant leftover like friction', 'For noise', 'Never'], 1, 'Integrate what you cannot model.']
  ]
});

D({
  n: 116, icon: '📉', topic: 'Control', hours: 3, notion: '3f6cdfea8ce281c9ae52e3bf7413a0a7', svg: 'pid',
  title: 'Balancer: P-only step response to CSV',
  goal: 'Start the controller comparison on real hardware with measured data.',
  tasks: [
    'Use your Month 2 balancer. Add CSV logging over Serial: time, angle, target, output',
    'Define a repeatable "step": change the target angle by +3° for 2 s (or a consistent push)',
    'Run the P-only controller. Log 5 trials',
    'Plot in Python (matplotlib). Measure overshoot, settling time, steady-state error',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [['Practice task (Control)', 'Practice task: take the balancing robot from month two and implement three controllers on the same hardware: P only, PD, then PID with feedforward. Log the step response of each to a CSV, plot all three, and write up which one you would ship and why. That plot is worth more in an interview than any certificate']],
  links: [['Understanding PID Control', 'https://www.mathworks.com/videos/series/understanding-pid-control.html']],
  video: `
## The practice task
@big That plot is worth more in an interview than any certificate
This week's practice task: on your Module 2 balancer, implement three controllers on the same hardware, P only, PD, then PID with feedforward. Log each step response to a CSV, plot all three, and write up which you would ship and why.
The article says that plot is worth more in an interview than any certificate. Today you set up the logging and run P only.

## Log over Serial as CSV
\`\`\`cpp
// in the control loop, every 10 ms
Serial.printf("%lu,%.2f,%.2f,%.1f\\n", millis(), angle, target, output);
\`\`\`
\`\`\`bash
python -m serial.tools.miniterm /dev/ttyUSB0 115200 > p_only_trial1.csv
\`\`\`
Add one line to the control loop: time, angle, target and output, separated by commas. Print at a fixed rate, every control cycle or every other, and set the baud rate high, 115200 or more, so logging does not slow the loop.
On the laptop, capture the serial stream to a file. Each trial gets its own file, named by controller and trial number.

## A repeatable step
- Change the target angle by +3° for 2 seconds, then back
- Triggered in code, at the same moment each trial
- (Or a consistent push, but code is more repeatable)
To compare controllers fairly, every trial must face the same disturbance. The best is a step in the target, triggered in code: hold zero, jump to plus three degrees for two seconds, then return.
A push with your finger is not repeatable. A code step is identical every time, so differences in the plot are differences in the controller.

## The three numbers
| Metric | Meaning |
|---|---|
| overshoot | how far past the new target it goes, % of the step |
| settling time | time until it stays within ±5% (or ±0.5°) |
| steady-state error | the error left once settled |
Measure three numbers from each response. Overshoot: how far past the target it swings, as a percentage of the step. Settling time: how long until it stays within a small band around the target. Steady-state error: what is left once it settles.
These are the standard language of control engineers. Use them in your write-up and in interviews.

## Plot it
\`\`\`python
import pandas as pd, matplotlib.pyplot as plt
for i in range(1, 6):
    d = pd.read_csv(f"p_only_trial{i}.csv", names=["t", "angle", "target", "u"])
    t = (d.t - d.t[0]) / 1000
    plt.plot(t, d.angle, alpha=0.5, label=f"trial {i}")
plt.plot(t, d.target, "k--", label="target")
plt.xlabel("time [s]"); plt.ylabel("angle [deg]"); plt.legend(); plt.show()
\`\`\`
Load each CSV with pandas and plot all five trials on one figure, with the target as a dashed line. Five overlaid trials show how repeatable the behaviour is, which is honest data rather than one lucky run.
Compute the three metrics in code, not by eye, and average them across trials. Tomorrow you do the same for PD and PID with feedforward.
`,
  key: [
    'Practice task: P, PD and PID+FF on the same balancer, logged and plotted.',
    'Log time, angle, target, output as CSV over Serial at a fixed rate.',
    'Use a repeatable, code-triggered step so trials are comparable.',
    'Measure overshoot, settling time and steady-state error over 5 trials.'
  ],
  quiz: [
    ['Why trigger the step in code instead of pushing the robot by hand?', ['It is faster', 'It is identical every trial, so comparisons are fair', 'Hand pushes break sensors', 'CSV requires it'], 1, 'Repeatable input → differences come from the controller.'],
    ['What is settling time?', ['Time to first reach the target', 'Time until the response stays within a small band around the target', 'Time the robot stays upright', 'Loop period'], 1, 'Commonly ±5% or a fixed band.']
  ]
});

D({
  n: 117, icon: '📊', topic: 'Control', hours: 3, notion: '3f6cdfea8ce2816d9598e62ec5c19600', svg: 'pid',
  title: 'PD, then PID + feedforward: plot all three',
  goal: 'The plot worth more than a certificate.',
  tasks: [
    'Run PD with the same step. Log 5 trials',
    'Run PID + feedforward (use your Day 2 PID class). Log 5 trials',
    'One plot with all three responses. A table with overshoot / settling / steady-state error',
    'Write "which one I would ship and why" (half a page)',
    'Push to `month-5/controller-comparison/`',
    'Tick Practice task done. Fill the log, Status, Hours, Confidence'
  ],
  read: [['Month 5 Milestone (this one)', 'Implement and tune a PID controller and explain every term from measured data']],
  links: [['Feedback Systems (Åström and Murray)', 'https://fbswiki.org/wiki/index.php/Feedback_Systems:_An_Introduction_for_Scientists_and_Engineers']],
  video: `
## Today's plan
1. PD with the same step, 5 trials
2. PID + feedforward with your Day 2 class, 5 trials
3. One plot, one table, half a page: which one would you ship?
Today you finish the practice task and the first Module 5 milestone: implement and tune a PID controller and explain every term from measured data.
Run PD and PID with feedforward, five trials each, with exactly the same step. Then make one plot, one table, and a short write-up.

## What D should change
@eq PD: u = Kp·e − Kd·dθ/dt | more damping → less overshoot, faster settling
Compared with P only, PD should overshoot less and settle faster, because the derivative brakes as the angle approaches the target. You may even be able to raise Kp now, since D tames the oscillation.
Watch for the noise penalty: if the output trace gets jagged, your D is amplifying IMU noise. Use the filtered derivative from your PID class, or the gyro rate directly, which is a cleaner derivative of angle.

## What I and feedforward should change
- I: removes the small steady lean left by P and PD (offset, uneven weight)
- Feedforward: for a balancer, e.g. a term from the target or a known motor deadband
- Anti-windup on, output limits on
Adding I should remove any steady lean: an offset in the IMU, or uneven weight, that P and PD leave behind. Keep anti-windup on, because a balancer saturates its motors easily.
For feedforward on a balancer, a simple choice is compensating the motor deadband, the minimum duty cycle before wheels move. Even that small term often makes the response noticeably crisper.

## One plot, three controllers
\`\`\`python
for name, color in [("p_only", "C0"), ("pd", "C1"), ("pid_ff", "C2")]:
    runs = [load(f"{name}_trial{i}.csv") for i in range(1, 6)]
    mean = average_aligned(runs)
    plt.plot(mean.t, mean.angle, color, label=name)
plt.plot(mean.t, mean.target, "k--", label="target")
\`\`\`
Average the five trials of each controller, aligned at the step, and plot the three averages together with the target. Use one colour per controller and label the axes with units.
Below it, a table: overshoot, settling time and steady-state error for each, averaged over trials. The plot shows the story at a glance; the table backs it with numbers.

## Which one would you ship?
- Not automatically the most complex
- Weigh performance, robustness to noise, and ease of tuning
- Explain each term's effect using your own plot
The write-up question is deliberate: which one would you ship, and why? The answer is not automatically PID with feedforward. If PD is nearly as good and much less sensitive to tuning, that is a valid choice.
Use your own plot to explain each term: P did this, D reduced that overshoot by this much, I removed this lean. That is exactly what the milestone asks for, and exactly what an interviewer wants to hear.

## Push it
\`\`\`text
month-5/controller-comparison/
  README.md        plot at top, table, "which I would ship"
  data/*.csv       all 15 trials
  plot.py          regenerates the figure
  firmware/        the three controllers
\`\`\`
Push everything to the controller comparison folder: README with the plot at the top, the raw CSVs, the plotting script, and the firmware. Anyone should be able to regenerate your figure from your data.
Tick the practice task. Tomorrow you step beyond PID into state space.
`,
  key: [
    'Same step, 5 trials each: P, PD, PID + feedforward.',
    'D reduces overshoot (watch noise); I removes steady lean; FF crisps the response.',
    'One averaged plot + a metrics table + a reasoned "which I would ship".',
    'Explain every term from your own measured data — the milestone.'
  ],
  quiz: [
    ['Compared with P only, what should PD mainly improve?', ['Steady-state error', 'Overshoot and settling time', 'Sensor noise', 'Battery life'], 1, 'D adds damping.'],
    ['Is the most complex controller always the one to ship?', ['Yes, always', 'No: weigh performance, robustness and ease of tuning', 'Only PID is allowed', 'Only P is safe'], 1, 'Justify the choice from data.']
  ]
});

D({
  n: 118, icon: '🧮', topic: 'Control', hours: 2.5, notion: '3f6cdfea8ce28104b45fd92920b3757f', svg: 'cartpole',
  title: 'State space, controllability, observability',
  goal: 'Describe a system as ẋ = Ax + Bu, y = Cx and check if it is controllable.',
  tasks: [
    'Watch Steve Brunton Control Bootcamp: the first videos on state space, eigenvalues and stability, controllability',
    'Write the state-space model of a mass-spring-damper and of a cart-pole (linearised) in numpy',
    'Compute eigenvalues (stable?) and the controllability matrix rank with python-control',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['Control Bootcamp', 'Thirty-nine videos and the right entry point to state space, controllability, observability, LQR and the Kalman filter'],
    ['What to focus on', 'Representing a system as state, input and output rather than a transfer function']
  ],
  links: [
    ['Control Bootcamp, Steve Brunton', 'https://www.youtube.com/playlist?list=PLMrJAkhIeNNR20Mz-VpzgfQs5zrYi085m'],
    ['python-control docs', 'https://python-control.readthedocs.io/', 'extra']
  ],
  video: `
## Beyond one error signal
@eq ẋ = A·x + B·u ·  y = C·x | state · input · output
PID looks at one error. Real robots have many coupled quantities: a cart-pole has a cart position, a pole angle, and both their velocities. State space describes all of them together.
The state x is a vector of everything you need to predict the future. The input u is what you control. A says how the state evolves on its own, B how the input affects it, and C what you can measure. The article's focus: think in state, input and output.

## Example: mass-spring-damper
@eq x = [position, velocity] ·  A = [[0, 1], [−k/m, −c/m]] ·  B = [[0], [1/m]]
Start simple: a mass on a spring with a damper. The state is position and velocity. The first row of A says position changes at the rate of velocity. The second row says acceleration comes from the spring, minus k over m times position, and the damper, minus c over m times velocity.
B says the force input accelerates the mass by one over m. Write this in numpy today. Every linear system follows this same pattern.

## Eigenvalues tell you stability
\`\`\`python
import numpy as np, control as ct
m, k, c = 1.0, 4.0, 0.5
A = np.array([[0, 1], [-k/m, -c/m]]); B = np.array([[0], [1/m]])
print(np.linalg.eigvals(A))      # real parts < 0 → stable
\`\`\`
The eigenvalues of A describe how the system behaves on its own. If every eigenvalue has a negative real part, disturbances die away: stable. Any positive real part means something grows: unstable. Imaginary parts mean oscillation.
The mass-spring-damper is stable. The upright cart-pole is not: one eigenvalue is positive, which is why the pole falls without control.

## The cart-pole, linearised
@svg cartpole | state: cart x, ẋ, pole θ, θ̇ · input: force on the cart
The cart-pole is the classic underactuated system: one input, the force on the cart, and four states. Its true equations are nonlinear, but near upright you can linearise them, treating sine theta as theta and cos theta as one.
That gives a four by four A matrix and a four by one B. Copy the standard linearised model from the Control Bootcamp or python control examples, and check its eigenvalues: one should be positive.

## Controllability
\`\`\`python
Ctrb = ct.ctrb(A, B)
print(np.linalg.matrix_rank(Ctrb), "of", A.shape[0])   # full rank → controllable
\`\`\`
Controllability asks: can the input steer the state anywhere? Build the controllability matrix, B, AB, A squared B and so on, and check its rank. Full rank, equal to the number of states, means yes.
The surprise of the cart-pole: with one force on the cart, you can control all four states, including the pole angle. That is why balancing is possible at all. Tomorrow's LQR depends on this.

## Observability
- Dual question: can you work out the full state from the outputs y?
- Observability matrix: C, CA, CA², … → full rank?
- If observable, an estimator (Kalman filter) can recover hidden states
Observability is the mirror question: from what you measure, can you work out the full state? If you measure only cart position, can you infer pole angle? Build the observability matrix from C and A, and check its rank.
If a system is observable, an estimator such as the Kalman filter you met in Module 2 can recover the states you do not measure directly. Controllability and observability together are the foundation of modern control.
`,
  key: [
    'State space: ẋ = Ax + Bu, y = Cx — think in state, input, output.',
    'Eigenvalues of A: negative real parts → stable; positive → unstable.',
    'Controllable if [B, AB, A²B…] has full rank; the cart-pole is.',
    'Observable if [C; CA; CA²…] has full rank; then an estimator can recover the state.'
  ],
  quiz: [
    ['An eigenvalue of A has a positive real part. What does that mean?', ['The system is stable', 'The system is unstable', 'It is uncontrollable', 'It is unobservable'], 1, 'Something grows without control.'],
    ['What does controllability tell you?', ['Whether sensors are noisy', 'Whether the input can steer the state anywhere', 'Whether the system is stable', 'Whether PID will work'], 1, 'Full-rank controllability matrix.']
  ]
});

D({
  n: 119, icon: '🔁', topic: 'Review', hours: 2, notion: '3f6cdfea8ce28153b6b4f5faa7b34aff', svg: 'pid',
  title: 'Week 1 review + catch-up',
  goal: 'Finish the controller comparison properly.',
  tasks: [
    'Finish unfinished tasks from M5 Days 1–6',
    'Explain out loud, using your own plot: what each PID term did',
    'Update Confidence on Days 1–6'
  ],
  links: [['Brian Douglas, Control System Lectures', 'https://www.youtube.com/@BrianBDouglas/playlists']],
  video: `
## Your plot, explained out loud
- P: what changed when it was the only term?
- D: how much did overshoot drop, and at what noise cost?
- I + feedforward: what lean disappeared, and how fast?
Review day. Open your controller comparison plot and explain it out loud, as if to an interviewer: what P did alone, how much D reduced overshoot and at what noise cost, and what I and feedforward fixed.
If you stumble on any part, that is the part to revisit. The goal is fluent, specific explanations, with numbers from your own data.

## The week in one table
| Idea | One-line summary |
|---|---|
| P / I / D | spring · memory · damper |
| anti-windup | stop integrating when saturated |
| filtered D on measurement | no kick, less noise |
| feedforward | act on what you know before error appears |
| gravity compensation | model the known load; integrate the rest |
| state space | ẋ = Ax + Bu; eigenvalues, controllability |
Here is the week compressed. P, I and D as spring, memory and damper. Anti-windup, filtered derivative on measurement, and feedforward as the practical fixes. Gravity compensation as the rule for known loads. And state space as the bridge to what comes next.
If you can explain every row in one sentence, you are ready for next section.

## Common gaps to check
- Is your CSV data actually repeatable across trials?
- Did you average aligned trials, not just plot one?
- Is your "which one I would ship" justified with numbers?
Check three common gaps in the practice task. Are your trials repeatable, or does one controller have a lucky run? Did you align and average, rather than cherry-picking? Is your shipping decision justified with numbers from the table?
Fix those before moving on; this README is a portfolio piece.

## Next section
@svg cartpole | LQR, then rigid-body kinematics
Next section you use state space to design LQR, an optimal controller, and balance a simulated cart-pole with it. Then you switch to kinematics: transforms and forward kinematics for your SO-101 arm.
Update your Confidence ratings for days one to six, and finish anything outstanding.
`,
  key: [
    'Explain each PID term from your own plot, with numbers.',
    'Practical fixes: anti-windup, filtered D on measurement, feedforward.',
    'Model known loads; integrate the unknown remainder.',
    'State space sets up LQR next section.'
  ],
  quiz: [
    ['Which phrase best describes the I term?', ['A spring', 'A memory of past error', 'A damper', 'A filter'], 1, 'It accumulates error over time.'],
    ['What makes the controller comparison credible?', ['A single best run', 'Repeatable, averaged trials with metrics', 'A long video', 'High gains'], 1, 'Honest data across trials.']
  ]
});

// ───────────── Section 2 · LQR and rigid-body kinematics ─────────────
D({
  n: 120, icon: '🎯', topic: 'Control', hours: 2.5, notion: '3f6cdfea8ce281ad84c8f7865c7fa76d', svg: 'cartpole',
  title: 'LQR + underactuated systems',
  goal: 'Understand LQR as a principled way to choose gains, and why underactuated robots are different.',
  tasks: [
    'Control Bootcamp: the LQR videos',
    'Read Underactuated Robotics: the cart-pole / acrobot chapter and the LQR section',
    'Write in your own words: what Q and R mean, and what "underactuated" means',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['Underactuated Robotics', 'This is where control theory becomes robotics: pendulums, cart-poles, walking, running and humanoids, with dynamic programming, LQR, Lyapunov analysis and trajectory optimisation. Free notes, free PDF and lecture videos'],
    ['What to focus on', 'Why LQR is just a principled way of choosing gains\nUnderactuation, and why a robot with fewer actuators than degrees of freedom needs completely different thinking']
  ],
  links: [
    ['Underactuated Robotics, Russ Tedrake, MIT', 'https://underactuated.csail.mit.edu/index.html'],
    ['Control Bootcamp, Steve Brunton', 'https://www.youtube.com/playlist?list=PLMrJAkhIeNNR20Mz-VpzgfQs5zrYi085m']
  ],
  video: `
## Full-state feedback
@eq u = −K · x | one gain per state, all states at once
Last section you wrote systems in state space. The natural controller is full-state feedback: the input is minus a gain matrix K times the whole state. For the cart-pole, four gains: on cart position, cart velocity, pole angle and pole angular velocity.
PID is a special case that looks at one error. Full-state feedback looks at everything together. The question is how to choose K, and that is what LQR answers.

## LQR: choosing gains by cost
@eq J = ∫ (xᵀ·Q·x + uᵀ·R·u) dt | minimise state error and effort together
The article puts it plainly: LQR is just a principled way of choosing gains. You write down a cost: how much you dislike state error, weighted by Q, plus how much you dislike using effort, weighted by R. LQR finds the K that minimises that cost over all time.
You never tune four gains by hand. You say what you care about, and the maths gives you the gains.

## What Q and R mean
| Change | Effect |
|---|---|
| bigger Q on angle | holds the pole more tightly upright |
| bigger Q on cart position | keeps the cart nearer the centre |
| bigger R | gentler, slower, uses less force |
| smaller R | aggressive, fast, may saturate the motor |
Q is a diagonal matrix of how much each state error matters. Make the angle entry large, and the controller fights hard to keep the pole upright. Make the cart position entry large, and it keeps the cart near the centre.
R is the price of effort. Large R gives gentle, slow control; small R gives aggressive, fast control that might exceed what your motor can do. The trade-off between Q and R is the whole design.

## Computing K
\`\`\`python
import control as ct, numpy as np
Q = np.diag([1, 1, 10, 1])      # x, xdot, theta, thetadot
R = np.array([[0.1]])
K, S, E = ct.lqr(A, B, Q, R)
print(K)                        # 1x4 gain matrix
print(E)                        # closed-loop eigenvalues: all negative real parts
\`\`\`
In practice, one function call. Give python control A, B, Q and R, and it returns K, plus the closed-loop eigenvalues. Check that all of them have negative real parts: the controlled system is stable.
Behind the scenes it solves the Riccati equation. You do not need to solve it by hand; you need to understand what Q and R do.

## Underactuation
@big Fewer actuators than degrees of freedom | you cannot command every joint directly
The second focus: underactuation. A robot is underactuated when it has fewer actuators than degrees of freedom. The cart-pole has two degrees of freedom, cart and pole, but only one motor, on the cart. You cannot push the pole directly.
The article says this needs completely different thinking. You cannot just command each joint; you must exploit the dynamics, moving the cart so that physics moves the pole where you want.

## Underactuated robots are everywhere
- Cart-pole and the acrobot (a two-link arm with only the elbow motor)
- Your Module 2 balancer: wheels drive, the body angle follows
- Walking robots, drones, and humanoids in flight phase
Underactuated systems are not academic toys. Your Module 2 balancer was one: the wheels are driven, and the body angle follows. Walking robots are underactuated whenever a foot leaves the ground. Quadrotors have four motors but six degrees of freedom.
Tedrake's Underactuated Robotics, free online, is where control theory becomes robotics. Read the cart-pole chapter today; tomorrow you implement LQR on its model.
`,
  key: [
    'Full-state feedback u = −Kx; LQR chooses K by minimising a cost.',
    'Q weights state errors; R weights effort; their balance is the design.',
    'ct.lqr(A, B, Q, R) returns K; check closed-loop eigenvalues are stable.',
    'Underactuated: fewer actuators than DOF; you must exploit the dynamics.'
  ],
  quiz: [
    ['In LQR, what happens if you increase R?', ['More aggressive control', 'Gentler control using less effort', 'The pole angle matters more', 'Nothing'], 1, 'R is the price of effort.'],
    ['Why is the cart-pole underactuated?', ['It has no sensors', 'It has one actuator but two degrees of freedom', 'It is unstable', 'It uses PID'], 1, 'The pole cannot be pushed directly.']
  ]
});

D({
  n: 121, icon: '🛒', topic: 'Control', hours: 3, notion: '3f6cdfea8ce2817caae7d21361a60bc6', svg: 'cartpole',
  title: 'Practice task: LQR cart-pole in Python',
  goal: "Implement LQR on a simulated cart-pole from Tedrake's model.",
  tasks: [
    "Take the cart-pole equations from Tedrake's notes. Simulate the nonlinear model with scipy (solve_ivp)",
    'Linearise around upright. Compute K with python-control `lqr(A, B, Q, R)`',
    'Close the loop on the nonlinear sim. Start 10° off upright. Plot angle and cart position',
    'Try 3 Q/R choices. Note the trade-off',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [['Practice task (LQR)', "Practice task: implement LQR for a simulated cart-pole in Python, then implement the same thing with a hand-tuned PID and compare how each handles a disturbance. Tedrake's notes give you the model, so you are implementing rather than deriving"]],
  links: [
    ['Underactuated Robotics (cart-pole model)', 'https://underactuated.csail.mit.edu/index.html'],
    ['python-control docs (lqr)', 'https://python-control.readthedocs.io/', 'extra']
  ],
  video: `
## The practice task
@svg cartpole | implement, do not derive
This practice task: LQR for a simulated cart-pole in Python, then a hand-tuned PID for comparison tomorrow. The article points out that Tedrake's notes give you the model, so you are implementing rather than deriving.
The plan for today: simulate the nonlinear model, linearise it, compute K, and close the loop.

## Simulate the nonlinear model
\`\`\`python
from scipy.integrate import solve_ivp
mc, mp, l, g = 1.0, 0.2, 0.5, 9.81

def f(t, s, u_fn):
    x, xd, th, thd = s
    u = u_fn(s)
    sin, cos = np.sin(th), np.cos(th)
    den = mc + mp * sin**2
    xdd  = (u + mp * sin * (l * thd**2 + g * cos)) / den
    thdd = (-u * cos - mp * l * thd**2 * cos * sin - (mc + mp) * g * sin) / (l * den)
    return [xd, xdd, thd, thdd]
\`\`\`
Copy the cart-pole equations from Tedrake's notes into a function that returns the state derivative. Here theta is measured from hanging straight down, Tedrake's convention, so upright is theta equals pi.
Integrate it with scipy's solve ivp. Test with zero force first: started near upright, the pole should fall over. If it does not, there is a sign error.

## Linearise around upright
- Upright: θ = π. Use the error θ̃ = θ − π
- Small angles: sin θ̃ ≈ θ̃, cos θ̃ ≈ 1, drop θ̇² terms
- Result: a 4×4 A and a 4×1 B — Tedrake gives them directly
Near upright, the nonlinear equations are almost linear. Define the angle error from upright, use the small-angle approximations, and drop products of small terms. The result is the A and B matrices.
Tedrake's notes give them, and you can check your own by numerical differentiation: nudge each state and the input slightly, and see how the derivative changes.

## Close the loop
\`\`\`python
K, _, _ = ct.lqr(A, B, Q, R)
def u_lqr(s):
    err = np.array([s[0], s[1], s[2] - np.pi, s[3]])
    return float(-K @ err)

s0 = [0, 0, np.pi + np.radians(10), 0]          # 10 degrees off upright
sol = solve_ivp(f, [0, 8], s0, args=(u_lqr,), max_step=0.01)
\`\`\`
Compute K from the linear model, but apply it to the nonlinear simulation, which is what reality would do. The controller takes the error from upright and returns minus K times it.
Start ten degrees off upright and simulate eight seconds. Plot the angle and the cart position. The pole should swing back upright, and the cart should return to the centre.

## Three Q and R choices
| Q (angle, position) | R | Expect |
|---|---|---|
| balanced: diag(1,1,10,1) | 0.1 | quick recovery, moderate force |
| angle-heavy: diag(1,1,100,1) | 0.1 | tighter angle, bigger force peaks |
| lazy: diag(1,1,10,1) | 10 | slow, gentle, larger excursions |
Now explore the trade-off. Try a balanced choice, an angle-heavy one, and a lazy one with large R. For each, record peak force, how far the cart travels, and how quickly the angle recovers.
Also try increasing the starting angle until LQR fails. It is designed for small angles; at some point the linear model is too wrong, and the pole falls. Record that limit.

## What to log
- Plots: angle and cart position for each Q/R
- Peak force, max cart travel, recovery time
- The largest starting angle that still recovers
Put the plots and numbers in your log. Tomorrow you hand-tune a PID on the same simulation, apply the same disturbance to both, and see what LQR's full-state view buys you.
`,
  key: [
    "Simulate the nonlinear cart-pole from Tedrake's equations with solve_ivp.",
    'Linearise around upright to get A and B; compute K with ct.lqr.',
    'Apply K to the nonlinear sim; it recovers from small angles.',
    'Q/R trade-off: tighter angle vs force vs cart travel; find the failure angle.'
  ],
  quiz: [
    ['Why test the LQR gain on the nonlinear simulation?', ['It is faster', 'Reality is nonlinear; the linear model is only an approximation', 'LQR needs it', 'To avoid plotting'], 1, 'That is how it would behave on hardware.'],
    ['What happens if you start the pole far from upright?', ['LQR always recovers', 'LQR may fail because the linearisation is no longer accurate', 'The cart stops', 'R becomes zero'], 1, 'LQR is local to the linearisation point.']
  ]
});

D({
  n: 122, icon: '⚖️', topic: 'Control', hours: 2.5, notion: '3f6cdfea8ce281cfb95fe76921c6167a', svg: 'cartpole',
  title: 'LQR vs PID under disturbance + MPC overview',
  goal: 'Finish the LQR task with a fair comparison, and know what MPC buys you.',
  tasks: [
    'Hand-tune a PID on the pole angle only. Apply the same disturbance (a push) to both controllers. Plot both',
    'Note what PID cannot see (the cart drifts away)',
    'Watch Understanding MPC, parts 1–3',
    'Push to `month-5/cartpole-lqr/` with plots',
    'Tick Practice task done. Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['What to focus on', 'What MPC buys you, which is constraints, and what it costs, which is compute'],
    ['Month 5 Milestone (this one)', 'Describe a system in state space and implement LQR on a simulated plant']
  ],
  links: [['Understanding Model Predictive Control, MATLAB Tech Talks', 'https://www.mathworks.com/videos/series/understanding-model-predictive-control.html']],
  video: `
## A fair comparison
- Same simulation, same start, same disturbance
- Disturbance: a push — a short force pulse on the cart at t = 2 s
- PID: hand-tuned, on the pole angle only
To compare fairly, both controllers face exactly the same situation: same model, same starting state, and the same disturbance, a short force pulse on the cart two seconds in, like a push.
For PID, use your class from Day 2, on the pole angle only, and tune it by hand until it balances. That is what most people would do without state space.

## What PID cannot see
@big PID balances the pole, but the cart drifts away
Run both and plot. You will likely find PID can keep the pole upright, but the cart drifts steadily off to one side, and would run off the end of any real track.
That is the point of the exercise. PID only looks at the angle; it has no idea where the cart is. LQR sees all four states, so it balances the pole and brings the cart home. Write this observation in your log in your own words.

## Reading the plots
| | LQR | PID (angle only) |
|---|---|---|
| pole after push | recovers | recovers |
| cart position | returns to 0 | drifts |
| tuning effort | choose Q, R | trial and error |
| needs | full state + model | one measurement |
Summarise the comparison in a table. Both recover the pole. Only LQR returns the cart. LQR was designed from weights, PID by trial and error. But LQR needs a model and measurements of all states, while PID needs just one.
That last row is honest: LQR's power comes from knowing more. On a real robot, missing states come from an estimator.

## MPC: what it buys
@eq at each step: optimise u over the next N steps, subject to constraints → apply the first u | repeat
Model predictive control goes a step further. At every time step it uses the model to predict the next stretch of the future, finds the best sequence of inputs, applies only the first, and repeats.
The article names what it buys: constraints. MPC can respect limits directly: maximum motor force, track length, joint limits. LQR cannot; it just hopes the gains stay within bounds.

## MPC: what it costs
- Solves an optimisation problem every control cycle
- Needs a decent model and a fast solver
- Used in: legged locomotion, autonomous driving, drones
And what it costs: compute. MPC solves an optimisation problem every control cycle, which needs a fast computer and a good solver. LQR is just a matrix multiply.
That is why MPC appears where constraints really matter and compute is available: legged robots, autonomous cars, drones. Watch the first three Understanding MPC videos for the intuition; you do not need to implement it.

## Push the project
\`\`\`text
month-5/cartpole-lqr/
  README.md      plots at top: LQR vs PID after a push; Q/R trade-off table
  cartpole.py    model + simulation
  lqr.py, pid.py controllers
\`\`\`
Push the project with the comparison plot at the top of the README, the Q and R trade-off table, and the observation about the drifting cart. That covers the milestone: describe a system in state space and implement LQR on a simulated plant.
Tick the practice task. Next: rigid-body motion, the language of arms.
`,
  key: [
    'Compare with the same model, start and disturbance.',
    'Angle-only PID keeps the pole up but the cart drifts; LQR returns it.',
    'LQR needs a model and full state; PID needs one measurement.',
    'MPC buys constraints at the cost of compute.'
  ],
  quiz: [
    ['Why does the angle-only PID let the cart drift away?', ['Its gains are too high', 'It cannot see the cart position', 'The model is wrong', 'MPC is missing'], 1, 'It only measures the pole angle.'],
    ['What does MPC buy you, according to the article?', ['Lower compute', 'Constraints', 'No model needed', 'Faster sensors'], 1, 'At the cost of compute.']
  ]
});

D({
  n: 123, icon: '🧲', topic: 'Kinematics', hours: 2.5, notion: '3f6cdfea8ce28113a7a3cf3920e4fabb', svg: 'tf',
  title: 'Rigid-body motion: homogeneous transforms',
  goal: 'Fluency in rotation matrices and 4×4 homogeneous transforms — the language of everything.',
  tasks: [
    'Modern Robotics chapter 3 (rigid-body motions) — read + watch the matching videos',
    'Watch 3–4 QUT Robot Academy short lessons on pose representation',
    'In numpy: build transforms for "rotate 30° about z, then translate 0.2 m in x". Compose two. Invert one. Check T · T⁻¹ = I',
    'Connect it: this is exactly what tf2 did in Month 4',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['Modern Robotics', 'The free preprint of the standard textbook, plus companion libraries in Python, MATLAB and Mathematica and full video lectures. It uses screw theory and product-of-exponentials rather than DH parameters, which is cleaner and now the industry norm'],
    ['What to focus on', 'Homogeneous transforms and composing them, which is the language of everything']
  ],
  links: [
    ['Modern Robotics, Kevin Lynch (book, code, videos)', 'http://hades.mech.northwestern.edu/index.php/Modern_Robotics'],
    ['Modern Robotics Specialization (Coursera)', 'https://www.coursera.org/specializations/modernrobotics'],
    ['QUT Robot Academy, Peter Corke', 'https://robotacademy.net.au']
  ],
  video: `
## The language of everything
@big Homogeneous transforms | position + orientation in one matrix
The article calls homogeneous transforms the language of everything in robotics. Every camera pose, every link of an arm, every frame in your Module 4 TF tree is one of these.
Today's textbook is Modern Robotics, free online, with videos and code. It uses screw theory and product of exponentials rather than the older DH parameters, which the article notes is cleaner and now the industry norm.

## Rotation matrices
@eq Rz(θ) = [[cos θ, −sin θ, 0], [sin θ, cos θ, 0], [0, 0, 1]] | columns = the rotated frame's axes
A rotation is a three by three matrix. Its columns are the new frame's x, y and z axes, written in the old frame. Rotating about z by theta mixes x and y with cosines and sines, and leaves z alone.
Rotation matrices are orthonormal: their inverse is simply their transpose, and their determinant is one. Those two facts are a quick sanity check whenever you build one.

## The 4×4 homogeneous transform
@eq T = [[R, p], [0 0 0, 1]] ·  p_A = T_AB · p_B | rotate, then translate, in one multiply
A homogeneous transform packs a rotation R and a translation p into one four by four matrix, with a bottom row of zeros and a one. To transform a point, append a one to make it four long, and multiply.
T A B takes a point expressed in frame B and gives it in frame A. Read the subscripts as "A from B". That naming habit prevents most mistakes.

## Compose and invert
@eq T_AC = T_AB · T_BC ·  T⁻¹ = [[Rᵀ, −Rᵀp], [0, 1]]
Composing is multiplying. If you know A from B and B from C, then A from C is their product; the inner subscripts cancel. Order matters: matrix multiplication is not commutative, so rotate-then-translate differs from translate-then-rotate.
The inverse has a neat closed form: transpose the rotation, and the translation becomes minus R transpose p. No general matrix inversion needed.

## Try it in numpy
\`\`\`python
import numpy as np
def T(theta_deg, px, py, pz=0.0):
    c, s = np.cos(np.radians(theta_deg)), np.sin(np.radians(theta_deg))
    return np.array([[c, -s, 0, px], [s, c, 0, py], [0, 0, 1, pz], [0, 0, 0, 1]])

T1 = T(30, 0.2, 0)
T2 = T(45, 0.1, 0.05)
print(T1 @ T2)                            # compose
print(np.round(T1 @ np.linalg.inv(T1), 6))  # identity
\`\`\`
Today's exercise: build a transform for rotate 30 degrees about z with 0.2 metres along x. Compose two. Invert one, both with numpy and with the closed form, and check that T times its inverse gives the identity.
Then transform a point by hand on paper and compare with numpy. Doing one by hand is what builds intuition.

## This is what tf2 did
- Every TF frame in Module 4 was a homogeneous transform
- tf2_echo printed exactly these: a translation + a rotation (as a quaternion)
- Looking up map → lidar_link = multiplying the chain
Connect it to Module 4. Every frame in your TF tree was a homogeneous transform. tf2 echo printed exactly this: a translation plus a rotation, shown as a quaternion. Looking up map to lidar link was multiplying the chain of transforms.
Now you know what tf2 does inside. Next: chaining joint transforms gives forward kinematics.
`,
  key: [
    'Homogeneous transforms combine rotation and translation in a 4×4 matrix.',
    'Rotation matrices are orthonormal: inverse = transpose, det = 1.',
    'Compose by multiplying (T_AC = T_AB·T_BC); order matters.',
    'tf2 is homogeneous transforms chained over a tree.'
  ],
  quiz: [
    ['How do you get T_AC from T_AB and T_BC?', ['T_BC · T_AB', 'T_AB · T_BC', 'T_AB + T_BC', 'inv(T_AB) · T_BC'], 1, 'Inner subscripts cancel.'],
    ['What is the inverse of a rotation matrix?', ['Its negative', 'Its transpose', 'Its determinant', 'The identity'], 1, 'Rotation matrices are orthonormal.']
  ]
});

D({
  n: 124, icon: '🦾', topic: 'Kinematics', hours: 2.5, notion: '3f6cdfea8ce28194b9d3db5543a44f43', svg: 'arm',
  title: 'Forward kinematics (product of exponentials)',
  goal: 'Compute where the end effector is from the joint angles.',
  tasks: [
    'Modern Robotics chapter 4 (forward kinematics, PoE) — read + videos',
    'Install Robotics Toolbox for Python. Load a built-in robot (e.g. Panda). Run `fkine` for a few configurations. Plot with `.plot()`',
    'Do FK of a 2-link planar arm by hand; check with code',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['What to focus on', 'Forward kinematics, which is easy, and inverse kinematics, which is not'],
    ['Robotics Toolbox for Python', 'Forward kinematics, Jacobians, numerical IK, trajectory generation and fifty-plus real robot models including Franka and UR, so you learn by running code against real arms']
  ],
  links: [
    ['Modern Robotics', 'http://hades.mech.northwestern.edu/index.php/Modern_Robotics'],
    ['Robotics Toolbox for Python', 'https://github.com/petercorke/robotics-toolbox-python']
  ],
  video: `
## Forward versus inverse
@eq FK: joint angles → end-effector pose (easy) ·  IK: pose → joint angles (hard)
The article's focus: forward kinematics, which is easy, and inverse kinematics, which is not. Forward kinematics answers: given the joint angles, where is the gripper? There is always exactly one answer, and it is just multiplication.
Inverse kinematics asks the reverse: to put the gripper here, what angles do I need? There may be several answers, or none. That is next section. Today, the easy direction.

## A 2-link planar arm by hand
@eq x = L1·cos θ1 + L2·cos(θ1 + θ2) ·  y = L1·sin θ1 + L2·sin(θ1 + θ2)
Start with two links in a plane. The first link, length L1, points at angle theta one. The second, length L2, points at theta one plus theta two, because its angle is relative to the first link.
Add the two link vectors and you get the gripper position. Compute it by hand for theta one equals 30 degrees, theta two equals 45, with links of 0.1 metres each, then check with code.

## The same thing with transforms
@eq T_0E = T_01(θ1) · T_12(θ2) · T_2E | one transform per joint, chained
The general method is yesterday's: one transform per joint, depending on its angle, multiplied along the chain from base to end effector. For the planar arm, each is a rotation about z by the joint angle, followed by a translation along the link.
This scales to any number of joints, in 3D. It is exactly how robot state publisher computed your Module 4 TF tree from the joint states.

## Product of exponentials
@eq T(θ) = e^([S1]θ1) · e^([S2]θ2) ⋯ e^([Sn]θn) · M
Modern Robotics uses a cleaner formulation: the product of exponentials. M is the end-effector pose when all joints are at zero. Each joint has a screw axis S, describing the line it rotates about, in the base frame.
The pose for any angles is the product of matrix exponentials, one per joint, times M. You only need M and the screw axes, read off the robot at its zero pose. No DH table, no frame-placement rules.

## Robotics Toolbox
\`\`\`python
# pip install roboticstoolbox-python
import roboticstoolbox as rtb
robot = rtb.models.Panda()
print(robot)                       # links, joint limits
T = robot.fkine(robot.qr)          # FK at the "ready" pose
print(T)                           # 4x4 pose (SE3)
robot.plot(robot.qr)
\`\`\`
Peter Corke's Robotics Toolbox for Python has fifty plus real robot models, including the Franka Panda and UR arms. Load the Panda, compute FK with fkine at a few configurations, and plot it.
Change one joint angle at a time and watch the end-effector pose change. Learning by running code against real arms is exactly why the article recommends it.

## Check yourself
- 2-link FK by hand = code, to a millimetre
- Panda fkine at qz (all zero) matches M
- Changing θ1 rotates the whole arm about the base z axis
Three checks before you finish. Your hand calculation for the two-link arm matches your code. The Panda's pose at all-zero joints is its M matrix. And changing the first joint swings the entire arm around the base.
Tomorrow you do this for your own SO-101, by hand, and check it against the real arm with a ruler.
`,
  key: [
    'FK: angles → pose (one answer, easy); IK: pose → angles (hard).',
    'FK = chain of per-joint transforms from base to end effector.',
    'PoE: T(θ) = Π e^([Si]θi) · M — only M and screw axes needed.',
    'Robotics Toolbox: real robot models, fkine, plot.'
  ],
  quiz: [
    ['For a 2-link planar arm, what angle does the second link point at?', ['θ2', 'θ1 + θ2', 'θ1 − θ2', 'θ1 · θ2'], 1, 'Joint angles are relative to the previous link.'],
    ['In the product-of-exponentials formula, what is M?', ['The mass matrix', 'The end-effector pose with all joints at zero', 'The Jacobian', 'A rotation about z'], 1, 'The home configuration.']
  ]
});

D({
  n: 125, icon: '✍️', topic: 'Kinematics', hours: 3, notion: '3f6cdfea8ce281149304fd3f097ef305', svg: 'arm',
  title: 'Practice task: SO-101 FK by hand',
  goal: 'Forward kinematics of your own arm, by hand, verified in code and on the real arm.',
  tasks: [
    'Measure the SO-101 link lengths (calipers, or the URDF/CAD from the repo)',
    'Write the FK by hand (PoE or DH). Compute the gripper position for 3 joint configurations',
    'Build the same arm in Robotics Toolbox (ERobot/DHRobot). Compare results',
    'Put the real arm in one of those configurations and measure the gripper position with a ruler. Compare',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [['Practice task (Kinematics)', 'Practice task: compute the forward kinematics of your SO-101 arm by hand from its link lengths, then verify against the Robotics Toolbox. Then write a numerical IK solver that moves the end effector to a commanded XYZ, and watch what it does near a singularity. Feeling the arm lose a degree of freedom is what makes the concept stick']],
  links: [
    ['Robotics Toolbox for Python', 'https://github.com/petercorke/robotics-toolbox-python'],
    ['SO-ARM100 repo (dimensions / URDF)', 'https://github.com/TheRobotStudio/SO-ARM100']
  ],
  video: `
## The practice task
@big FK by hand → toolbox → real arm with a ruler
The kinematics practice task has two halves. Today: forward kinematics of your SO-101, by hand from its link lengths, verified against the Robotics Toolbox. Next section: a numerical IK solver.
You will check three ways: your hand calculation, the toolbox, and the real arm with a ruler. When all three agree, you truly understand your robot.

## Measure the arm
| Joint | Axis | Link to next joint |
|---|---|---|
| 1 shoulder pan | vertical z | base height |
| 2 shoulder lift | horizontal | upper arm |
| 3 elbow | horizontal | forearm |
| 4 wrist flex | horizontal | wrist to gripper |
| 5 wrist roll | along the forearm | — |
Get the link lengths with calipers, or read them from the URDF in the SO-ARM100 repository, which is more accurate. Note each joint's axis: the base pans about vertical; the shoulder, elbow and wrist flex about horizontal axes; the wrist rolls about its own axis.
Make this table in your log. Getting the geometry right is most of the work.

## A useful simplification
- With joint 1 at zero, joints 2–4 move in one vertical plane
- That plane is a 3-link planar arm: use the 2-link formula, extended
- Then rotate the result about z by joint 1
Here is a trick that makes the hand calculation manageable. Joints two, three and four all rotate about parallel horizontal axes, so they move the gripper within one vertical plane. That is a three-link planar arm, like yesterday's two-link one, with one more term.
Compute the reach and height in that plane, then rotate the whole thing about the vertical axis by the base angle. Wrist roll does not move the gripper's position, only its orientation.

## Three configurations
\`\`\`python
configs_deg = [
    [0,   0,   0,  0, 0],      # home
    [30, 20, -40, 10, 0],
    [-45, 45, -30, -15, 0],
]
for q in configs_deg:
    print(q, fk_by_hand(np.radians(q))[:3, 3])
\`\`\`
Choose three configurations: home, and two others that move every joint. Compute the gripper position for each by hand, on paper, then in a function.
Keep angles within the real joint limits, because you will pose the real arm in at least one of them.

## Verify with the toolbox
\`\`\`python
import roboticstoolbox as rtb
so101 = rtb.ERobot.URDF("so101.urdf")    # or build with DHRobot / ETS
for q in configs_deg:
    print(so101.fkine(np.radians(q)).t)
\`\`\`
Build the same arm in the Robotics Toolbox, either by loading the URDF or by defining it yourself with elementary transforms. Compute fkine for the same three configurations and compare.
They should agree to well under a millimetre. If not, check the zero position: a joint whose zero is defined differently in the URDF is the most common cause.

## Then the real arm
- Pose the real arm in one configuration (LeRobot or your Module 3 tools)
- Measure the gripper tip from the base with a ruler
- Expect a few millimetres of error: why?
Finally, the real arm. Command it into one of your configurations and measure the gripper tip position from the base with a ruler. Record hand, toolbox and real side by side.
Expect a few millimetres of error. Ask why: servo backlash, calibration offsets, flexible plastic links, and measurement error. Real robots never match the model exactly; knowing by how much is the engineering.
`,
  key: [
    'Measure link lengths and joint axes; geometry is most of the work.',
    'Joints 2–4 form a planar arm; rotate the result by joint 1.',
    'Verify against Robotics Toolbox; mismatches usually mean zero offsets.',
    'The real arm differs by millimetres: backlash, calibration, flex.'
  ],
  quiz: [
    ['Hand FK and the toolbox disagree by a large amount. Most likely cause?', ['Numerical precision', 'A joint zero position defined differently', 'The gripper colour', 'Too many configurations'], 1, 'Check zero offsets first.'],
    ['Why might the real arm differ from FK by a few millimetres?', ['FK is wrong', 'Backlash, calibration offsets and link flex', 'The ruler is magnetic', 'Python rounding'], 1, 'Models are never perfect.']
  ]
});

D({
  n: 126, icon: '🔁', topic: 'Review', hours: 2, notion: '3f6cdfea8ce28147b959e93d3fdd64b7', svg: 'tf',
  title: 'Week 2 review + catch-up',
  goal: 'LQR and FK solid before IK and vision.',
  tasks: [
    'Finish unfinished tasks from M5 Days 8–13',
    "Without notes: compose and invert a transform; explain LQR's Q and R",
    'Update Confidence on Days 8–13'
  ],
  links: [['QUT Robot Academy', 'https://robotacademy.net.au']],
  video: `
## Two things without notes
1. Compose and invert a homogeneous transform on paper
2. Explain LQR's Q and R, with an example of changing each
Review day. Two exercises without notes. First, on paper: compose two transforms and invert one, using the closed-form inverse. Second, explain LQR's Q and R out loud, with an example of what happens when you increase each.
If either is shaky, rewatch that day's video at speed, then try again.

## The week in one table
| Idea | One line |
|---|---|
| LQR | choose gains by weighting state error (Q) and effort (R) |
| underactuated | fewer actuators than DOF: exploit dynamics |
| LQR vs PID | full state sees the cart; angle-only PID lets it drift |
| MPC | constraints, at the cost of compute |
| transforms | 4×4, compose by multiplying, inverse in closed form |
| FK | chain joint transforms; PoE needs M and screw axes |
Here is the week compressed. LQR, underactuation, the comparison with PID, and MPC's trade-off. Then transforms and forward kinematics.
The bridge between the halves is the same idea: describe the system mathematically, and the right behaviour follows. That is what separates fixing Nav2 from configuring it.

## Check the two projects
- cartpole-lqr: comparison plot at the top, Q/R table, the drifting cart explained
- SO-101 FK: hand vs toolbox vs real table, with an explanation of the error
Check both portfolio pieces. The cart-pole README should have the comparison plot first, the Q and R table, and your explanation of why PID let the cart drift. The FK notes should have the three-way comparison table and your explanation of the real-arm error.
These are exactly the kind of evidence interviewers like.

## Next section
@svg arm | Jacobians, inverse kinematics, then vision
Next section: the Jacobian and singularities, then your own numerical IK solver, where you will feel the arm lose a degree of freedom. Then vision: the OpenCV bootcamp, calibrating your webcam, and turning pixels into 3D positions.
Check that your webcam and chessboard have arrived. Update your Confidence ratings.
`,
  key: [
    'Compose and invert transforms on paper; explain Q and R aloud.',
    'LQR sees the full state; MPC adds constraints at compute cost.',
    'FK chains joint transforms; verify by hand, toolbox and real arm.',
    'Next: Jacobians, IK and vision — check the webcam has arrived.'
  ],
  quiz: [
    ['What is the closed-form inverse of T = [[R, p], [0, 1]]?', ['[[R, −p], [0, 1]]', '[[Rᵀ, −Rᵀp], [0, 1]]', '[[−R, p], [0, 1]]', '[[Rᵀ, p], [0, 1]]'], 1, 'Transpose the rotation; rotate and negate p.'],
    ['Increasing the Q weight on the pole angle in LQR makes the controller…', ['Hold the angle more tightly', 'Use less force', 'Ignore the cart', 'Unstable'], 0, 'Q weights how much each state error matters.']
  ]
});

// ───────────── Section 3 · Jacobians, IK and vision ─────────────
D({
  n: 127, icon: '📐', topic: 'Kinematics', hours: 2.5, notion: '3f6cdfea8ce28150b1b4f22c7b6ba3c5', svg: 'arm',
  title: 'The Jacobian and singularities',
  goal: 'Understand the Jacobian and what a singularity physically means.',
  tasks: [
    'Modern Robotics chapter 5 (velocity kinematics, Jacobian, singularities) — read + videos',
    'QUT Robot Academy lessons on the Jacobian',
    'For the 2-link planar arm: derive J by hand, find where det(J) = 0, and describe what the arm cannot do there',
    'Check in Robotics Toolbox: `jacob0` and its rank at a singular pose',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [['What to focus on', 'The Jacobian, and what a singularity physically means when your arm suddenly cannot move sideways\nWorkspace limits, and joint limits versus reachability']],
  links: [
    ['Modern Robotics', 'http://hades.mech.northwestern.edu/index.php/Modern_Robotics'],
    ['QUT Robot Academy', 'https://robotacademy.net.au'],
    ['Robotics Toolbox for Python', 'https://github.com/petercorke/robotics-toolbox-python']
  ],
  video: `
## From positions to velocities
@eq ẋ = J(θ) · θ̇ | joint speeds → end-effector velocity
Forward kinematics maps joint angles to a pose. The Jacobian does the same for velocities: multiply it by the joint speeds, and you get the end-effector's velocity.
It is a matrix, and it changes with the configuration. Each column says how the end effector moves if you turn just that one joint at unit speed. It is the most useful single object in arm kinematics.

## The 2-link Jacobian by hand
@eq J = [[−L1·s1 − L2·s12, −L2·s12], [L1·c1 + L2·c12, L2·c12]] | s12 = sin(θ1+θ2)
Differentiate last week's two-link FK. The x position is L1 cos theta one plus L2 cos of theta one plus theta two; take its partial derivative with respect to each angle, and the same for y. That gives a two by two matrix.
Derive it yourself on paper today. Then check it numerically: nudge each joint by a tiny angle, see how the position changes, and compare with the columns.

## Singularities
@eq det(J) = L1·L2·sin θ2 = 0  →  θ2 = 0 or π | arm fully stretched or folded
A singularity is where the Jacobian loses rank: its determinant goes to zero. For the two-link arm, the determinant is L1 times L2 times sine theta two, which is zero when the elbow is perfectly straight or fully folded.
At those poses, the two columns of J point the same way. Both joints can only move the gripper along one line. A direction of motion has been lost.

## What it physically means
- Arm fully stretched: it cannot move further outward, in any way
- Near the singularity: small sideways motion needs huge joint speeds
- Inverting J near det = 0 → enormous, dangerous joint commands
The article's phrase: your arm suddenly cannot move sideways. Stretched straight out, the arm cannot move further outward at all, whatever the joints do. Near that pose, moving the gripper a little in the lost direction demands huge joint speeds.
That is why singularities matter. Any controller that inverts the Jacobian will command enormous joint speeds near one. Tomorrow you will see exactly that in your IK solver.

## Workspace and joint limits
| Concept | Meaning |
|---|---|
| reachable workspace | every point the gripper can reach |
| dexterous workspace | points reachable in any orientation |
| joint limits | can shrink the workspace below the geometry |
| boundary | the workspace edge is a singular surface |
The second focus: workspace limits, and joint limits versus reachability. The reachable workspace is every point the gripper can get to; for two links, a ring between the difference and the sum of the link lengths.
Joint limits can shrink that further: a point may be geometrically reachable, but only with an angle the servo cannot reach. And the outer edge of the workspace is always singular, because the arm is fully stretched there.

## Check it in the toolbox
\`\`\`python
import roboticstoolbox as rtb, numpy as np
robot = rtb.models.Panda()
J = robot.jacob0(robot.qr)                  # 6 x 7
print(np.linalg.matrix_rank(J))             # 6 normally
q = robot.qz.copy()                         # all zeros: arm straight up
print(np.linalg.matrix_rank(robot.jacob0(q)))  # less than 6 → singular
\`\`\`
In Robotics Toolbox, jacob0 gives the Jacobian in the base frame: six rows, for linear and angular velocity, and one column per joint. At a normal pose its rank is six.
Try the Panda's all-zero pose, pointing straight up, and check the rank: it drops, because some joint axes line up. Log the singular pose you found and describe in words what the arm cannot do there.
`,
  key: [
    'The Jacobian maps joint velocities to end-effector velocity; it depends on θ.',
    'Singularity: J loses rank (det = 0); a direction of motion is lost.',
    'Near a singularity, small Cartesian motions need huge joint speeds.',
    'Workspace edges are singular; joint limits can shrink reachability.'
  ],
  quiz: [
    ['For a 2-link planar arm, where are the singularities?', ['θ1 = 0', 'θ2 = 0 or π (elbow straight or folded)', 'θ1 = θ2', 'Nowhere'], 1, 'det(J) = L1·L2·sin θ2.'],
    ['What happens if you invert J near a singularity?', ['Nothing special', 'Joint speed commands become enormous', 'The arm locks safely', 'FK fails'], 1, 'That is why IK needs damping.']
  ]
});

D({
  n: 128, icon: '🎯', topic: 'Kinematics', hours: 3, notion: '3f6cdfea8ce281b595c3c6f8f21a7cc2', svg: 'arm',
  title: 'Numerical IK solver + feel the singularity',
  goal: 'Your own IK solver that moves the SO-101 gripper to a commanded XYZ.',
  tasks: [
    'Modern Robotics chapter 6 (numerical IK, Newton-Raphson). Skim chapter 9 (trajectories)',
    'Write an IK solver (damped least squares / Jacobian pseudo-inverse) for your SO-101 model',
    'Command 5 XYZ targets in simulation. Then send the joint angles to the real arm (slowly!)',
    'Command a target near a singularity / workspace edge. Watch the joints spike. Add damping and compare',
    'Interpolate a straight line in Cartesian space vs in joint space. Note the difference',
    'Push to `month-5/so101-kinematics/`. Tick Practice task done. Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['Practice task (Kinematics)', 'Then write a numerical IK solver that moves the end effector to a commanded XYZ, and watch what it does near a singularity. Feeling the arm lose a degree of freedom is what makes the concept stick'],
    ['What to focus on', 'Trajectory generation, and why you interpolate in joint space sometimes and Cartesian space other times'],
    ['Month 5 Milestone (these ones)', 'Compute forward kinematics by hand and solve IK numerically\nExplain what a singularity is by pointing at a robot doing it']
  ],
  links: [
    ['Modern Robotics', 'http://hades.mech.northwestern.edu/index.php/Modern_Robotics'],
    ['Robotics Toolbox for Python (ikine examples)', 'https://github.com/petercorke/robotics-toolbox-python']
  ],
  video: `
## Why IK is iterative
@big FK is a formula · IK is a search
Inverse kinematics asks which joint angles put the gripper at a target. For most arms there is no neat formula, there may be several solutions, or none. So we search numerically.
The idea is Newton's method. Start from the current angles. Compute where the gripper is with FK, measure the error to the target, and use the Jacobian to work out which small joint change would reduce it. Repeat until the error is tiny.

## The update step
@eq Δθ = J⁺ · e ·  J⁺ = Jᵀ(J·Jᵀ)⁻¹ | pseudo-inverse, then θ ← θ + Δθ
Each iteration: the error e is target minus current position. Multiply by the pseudo-inverse of the Jacobian to get a joint step, and add it. The pseudo-inverse works even when J is not square, as with a five-joint arm and a three-number position target.
Repeat until the error is below a millimetre or so, or give up after a hundred iterations: the target may be unreachable.

## Damped least squares
@eq Δθ = Jᵀ(J·Jᵀ + λ²·I)⁻¹ · e | λ keeps steps finite near singularities
Near a singularity, J J transpose is nearly singular, so its inverse explodes and the joint steps become enormous. Damped least squares adds a small lambda squared to the diagonal before inverting.
Far from singularities it barely changes anything. Near them, it trades a little accuracy for sane, bounded joint motion. Every practical IK solver uses something like this.

## The solver
\`\`\`python
def ik(target_xyz, q, lam=0.05, tol=1e-3, iters=100):
    for _ in range(iters):
        e = target_xyz - fk(q)[:3, 3]
        if np.linalg.norm(e) < tol:
            return q, True
        J = jacobian_pos(q)                       # 3 x n
        dq = J.T @ np.linalg.solve(J @ J.T + lam**2 * np.eye(3), e)
        q = np.clip(q + dq, q_min, q_max)          # respect joint limits
    return q, False
\`\`\`
Here is the whole solver: compute the error, stop if it is small, otherwise take a damped least-squares step and clip to joint limits. Use your FK from Day 13, and a Jacobian either derived or computed numerically by nudging each joint.
Test it on five targets in simulation, checking the final error for each. Only then send the angles to the real arm, slowly, with a hand near the power switch.

## Feel the singularity
- Command a target at the edge of the workspace, arm nearly straight
- Without damping (λ = 0): joints spike, flip, or diverge
- With damping: the arm stops short, smoothly
This is the part the article says makes it stick. Command a target near the edge of the workspace, so the arm is almost fully stretched. With lambda set to zero, watch the joint steps spike and the solution jump around.
Turn the damping back on: the arm reaches as far as it can and stops smoothly. Point at the real arm in that pose and explain what it cannot do: that is a milestone item.

## Joint space versus Cartesian space
| Interpolate in | Path of the gripper | Use when |
|---|---|---|
| joint space | curved, but always feasible | moving between poses in free space |
| Cartesian space | straight line | the path itself matters: insertion, drawing, approach |
The last focus: trajectory generation. Interpolate in joint space, blending angles from start to end, and the gripper follows a curve, but every point is feasible and fast to compute. Interpolate in Cartesian space, solving IK along a straight line, and the gripper moves in a straight line, but you may pass near a singularity.
Try both between two targets and plot the gripper paths. Use joint space for free motion, Cartesian when the path matters, like approaching an object straight down. Push it all and tick the practice task.
`,
  key: [
    'Numerical IK: iterate Δθ = J⁺·e until the error is small.',
    'Damped least squares adds λ²I to stay sane near singularities.',
    'Clip to joint limits; test in sim before the real arm.',
    'Joint-space paths curve but are safe; Cartesian paths are straight but can hit singularities.'
  ],
  quiz: [
    ['What does the damping term λ in damped least-squares IK do?', ['Speeds up convergence', 'Keeps joint steps bounded near singularities', 'Removes joint limits', 'Computes FK'], 1, 'Trades a little accuracy for stability.'],
    ['When should you interpolate in Cartesian space?', ['Always', 'When the gripper path itself matters, e.g. a straight approach', 'Never', 'Only for mobile robots'], 1, 'Joint space for free motion.']
  ]
});

D({
  n: 129, icon: '👁️', topic: 'Vision', hours: 3, notion: '3f6cdfea8ce2812fa02df3da94733885', svg: 'pinhole',
  title: 'OpenCV Bootcamp',
  goal: 'Finish the official free OpenCV course in one sitting.',
  tasks: [
    'Complete the FREE OpenCV Bootcamp (2–3 hours)',
    'With your webcam: live feed → HSV threshold → find the largest coloured blob → draw its centre',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [['FREE OpenCV Bootcamp', 'The official two-to-three hour course from OpenCV themselves, covering image manipulation, filtering, edge detection, tracking and the DNN module. Start here rather than a paid course']],
  links: [['FREE OpenCV Bootcamp', 'https://courses.opencv.org/courses/course-v1:OpenCV+Bootcamp+CV0/about']],
  video: `
## Vision week
@svg pinhole | getting 3D information out of a camera
Vision week starts today. The article's target is modest and practical: enough vision to get 3D information out of a camera. By the end of the week you will estimate where an object is in 3D from your webcam.
Start with the official free OpenCV Bootcamp, two to three hours from OpenCV themselves. The article says start here rather than a paid course.

## What the bootcamp covers
- Reading, displaying and writing images and video
- Image manipulation: crop, resize, flip, colour spaces
- Filtering and edge detection (blur, Canny)
- Tracking, and the DNN module for pretrained networks
The bootcamp covers images as arrays, basic manipulation, filtering and edge detection, object tracking, and the DNN module that runs pretrained neural networks.
Do it in one sitting if you can, with the notebooks open. Type the code rather than just watching.

## Images are arrays
\`\`\`python
import cv2
img = cv2.imread("cube.jpg")      # numpy array, shape (H, W, 3), BGR order!
print(img.shape, img.dtype)        # e.g. (480, 640, 3) uint8
b, g, r = img[240, 320]            # pixel at row 240, column 320
\`\`\`
The single most important fact: an image is a numpy array, height by width by three channels, eight-bit values from zero to 255. Everything you know about numpy applies.
Two traps. OpenCV stores colour as blue, green, red, not RGB. And indexing is row then column, which is y then x. Both cause endless confusion; write them down.

## Why HSV for colour
@eq H = which colour · S = how vivid · V = how bright
To find a coloured object, convert to HSV: hue, saturation and value. Hue is the colour itself, separated from brightness. In BGR, a red cube in shadow and in sunlight have very different numbers; in HSV, the hue stays roughly the same.
That separation is why HSV thresholding is the classic first approach to colour detection. It is not perfect, as you will discover on Day 19, but it is a great start.

## Today's exercise
\`\`\`python
cap = cv2.VideoCapture(0)
while True:
    ok, frame = cap.read()
    hsv  = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    mask = cv2.inRange(hsv, (100, 120, 70), (130, 255, 255))   # blue-ish
    cnts, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if cnts:
        c = max(cnts, key=cv2.contourArea)
        M = cv2.moments(c)
        if M["m00"] > 0:
            cx, cy = int(M["m10"] / M["m00"]), int(M["m01"] / M["m00"])
            cv2.circle(frame, (cx, cy), 6, (0, 0, 255), -1)
    cv2.imshow("track", frame)
    if cv2.waitKey(1) == 27: break
\`\`\`
After the bootcamp, build a live tracker with your webcam. Convert each frame to HSV, threshold to the colour of one of your test cubes, find contours, take the largest, and draw its centre using image moments.
Tune the HSV range for your cube under your lighting. Write down the range; you reuse it on Day 19.

## Useful cleanups
- Blur before thresholding to reduce speckle
- Morphological open/close on the mask to remove holes and noise
- Ignore contours below a minimum area
Real masks are noisy. Blur the frame slightly first, then clean the mask with morphological opening and closing, which remove small specks and fill small holes. Ignore contours smaller than a minimum area.
These three steps make the tracker far steadier. Log the before and after.
`,
  key: [
    'The free OpenCV Bootcamp is the recommended starting point.',
    'Images are numpy arrays (H, W, 3), in BGR order, indexed row then column.',
    'HSV separates colour (hue) from brightness, so thresholding is more robust.',
    'Tracker: HSV → inRange → contours → largest → moments → centre.'
  ],
  quiz: [
    ['In what channel order does OpenCV store colour images by default?', ['RGB', 'BGR', 'HSV', 'CMYK'], 1, 'A classic source of colour bugs.'],
    ['Why convert to HSV for colour detection?', ['It is smaller', 'Hue separates colour from brightness', 'OpenCV requires it', 'It removes noise'], 1, 'Brightness changes affect H less than BGR.']
  ]
});

D({
  n: 130, icon: '♟️', topic: 'Vision', hours: 2.5, notion: '3f6cdfea8ce2819b9897c84f8155a6e1', svg: 'pinhole',
  title: 'Calibrate a real camera with a chessboard',
  goal: "Your webcam's intrinsics and distortion, with a low re-projection error.",
  tasks: [
    'Follow the OpenCV camera calibration tutorial. Capture 15–20 chessboard images at varied angles and distances',
    'Compute camera matrix + distortion. Report the re-projection error',
    'Undistort a live frame. Compare with the raw frame',
    'Save intrinsics to YAML/JSON',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['OpenCV Camera Calibration tutorial', 'The canonical walkthrough with full Python code, from chessboard corners to undistortion to re-projection error. Every robotics engineer must be able to do this from memory'],
    ['What to focus on', 'Camera intrinsics and distortion, and doing a real calibration with a printed chessboard']
  ],
  links: [['OpenCV Camera Calibration tutorial', 'https://docs.opencv.org/4.x/dc/dbb/tutorial_py_calibration.html']],
  video: `
## Why calibrate
@big Every robotics engineer must be able to do this from memory
To measure anything in 3D with a camera, you need to know exactly how it maps the world onto pixels. Calibration finds that mapping. The article says every robotics engineer must be able to do it from memory.
Today you calibrate your own webcam with the printed chessboard, and save the result for the rest of the course.

## The pinhole model
@eq u = fx · X/Z + cx ·  v = fy · Y/Z + cy | K = [[fx, 0, cx], [0, fy, cy], [0, 0, 1]]
The pinhole model: a 3D point at X, Y, Z in the camera frame lands on the image at u, v. Divide by depth Z, scale by the focal lengths fx and fy in pixels, and shift by the principal point cx, cy, roughly the image centre.
Those four numbers form the camera matrix K, the intrinsics. They belong to the camera and lens, and do not change when the camera moves.

## Lens distortion
- Radial: straight lines bow outward (barrel) or inward (pincushion)
- Tangential: lens slightly tilted relative to the sensor
- Five coefficients: k1, k2, p1, p2, k3
Real lenses are not perfect pinholes. Radial distortion bends straight lines, especially near the edges: cheap webcams often show barrel distortion. Tangential distortion comes from a slightly tilted lens.
OpenCV models these with five coefficients. Calibration estimates them alongside K, so you can undo the distortion.

## Capturing good images
- 15–20 images, chessboard fully visible and flat
- Vary angle, distance and position: corners and edges of the frame too
- Sharp, well lit, no motion blur
Calibration quality depends on the images. Take fifteen to twenty, with the board fully visible and perfectly flat, tilted at different angles, near and far, and placed in every part of the frame, including the corners where distortion is strongest.
Avoid blur. Mounting the board on stiff card or a clipboard keeps it flat, which matters more than people expect.

## Calibrate
\`\`\`python
pattern = (9, 6)                       # inner corners
objp = np.zeros((9 * 6, 3), np.float32)
objp[:, :2] = np.mgrid[0:9, 0:6].T.reshape(-1, 2) * 0.025   # 25 mm squares
objpts, imgpts = [], []
for f in glob.glob("calib/*.jpg"):
    gray = cv2.cvtColor(cv2.imread(f), cv2.COLOR_BGR2GRAY)
    ok, corners = cv2.findChessboardCorners(gray, pattern)
    if ok:
        corners = cv2.cornerSubPix(gray, corners, (11, 11), (-1, -1),
                                   (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 30, 1e-3))
        objpts.append(objp); imgpts.append(corners)
rms, K, dist, rvecs, tvecs = cv2.calibrateCamera(objpts, imgpts, gray.shape[::-1], None, None)
print("re-projection error:", rms)
\`\`\`
Following the tutorial: describe the board's corners in 3D using the real square size, find the corners in each image with sub-pixel refinement, then call calibrate camera. It returns K, the distortion coefficients, and the re-projection error.
Measure your printed squares with a ruler; printers scale. A wrong square size gives wrong distances later.

## Check and save
| Re-projection error | Verdict |
|---|---|
| below 0.5 px | excellent |
| 0.5 – 1 px | fine for this course |
| above 1 px | retake images: blur, bent board, poor coverage |
The re-projection error is the average distance, in pixels, between where the corners were detected and where the model predicts them. Under half a pixel is excellent; under one is fine; above that, retake your images.
Then undistort a live frame and compare it with the raw one: lines near the edges should straighten. Save K and the distortion to a YAML or JSON file, and log fx, fy, cx and cy.
`,
  key: [
    'Pinhole model: u = fx·X/Z + cx, v = fy·Y/Z + cy; K holds the intrinsics.',
    'Distortion: radial and tangential, five coefficients.',
    '15–20 sharp images of a flat board, covering the whole frame.',
    'Re-projection error < 1 px is fine; save K and distortion to a file.'
  ],
  quiz: [
    ['What does the re-projection error measure?', ['Image brightness', 'Average pixel distance between detected and predicted corners', 'Focal length', 'Number of images'], 1, 'Lower is better; under 1 px is fine.'],
    ['Why measure your printed chessboard squares?', ['For decoration', 'Printers scale; a wrong size gives wrong 3D distances', 'OpenCV needs inches', 'To check colour'], 1, 'The square size sets the metric scale.']
  ]
});

D({
  n: 131, icon: '📍', topic: 'Vision', hours: 3, notion: '3f6cdfea8ce28117ac44cdeb4e3c09cb', svg: 'pinhole',
  title: 'Pixel → 3D position (and break it with lighting)',
  goal: "Estimate a coloured object's 3D position from one calibrated camera, then make it fail and fix it.",
  tasks: [
    'Detect your coloured cube. Use its known size + intrinsics (pinhole model) to estimate distance and X/Y relative to the camera',
    'Check against a tape measure at 3 distances',
    'Change the lighting (lamp on/off, daylight). Watch detection fail',
    'Fix it (better HSV range, normalise brightness, adaptive threshold, or detect shape instead)',
    'Write the failure-and-fix story. Push to `month-5/vision-3d/`',
    'Tick Practice task done. Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['Practice task (Vision)', 'Practice task: calibrate an actual camera with a printed chessboard, save the intrinsics, then write a script that detects a coloured object and estimates its position in 3D relative to the camera. Then move the lighting and watch it fail, and fix it. That failure-and-fix write-up is portfolio material'],
    ['What to focus on', 'Pinhole projection, and the difference between image coordinates and world coordinates\nWhy lighting changes break vision pipelines that worked yesterday']
  ],
  links: [['OpenCV Camera Calibration tutorial', 'https://docs.opencv.org/4.x/dc/dbb/tutorial_py_calibration.html']],
  video: `
## Image versus world coordinates
@eq pixel (u, v) → ray from the camera · need depth Z to get a 3D point
The article's first focus: the difference between image coordinates and world coordinates. A pixel is not a position; it is a direction, a ray out of the camera. Every point along that ray lands on the same pixel.
To get a 3D point, you need one more number: the depth, Z. Today you get it from something you know: the cube's real size.

## Depth from known size
@eq Z = fx · W_real / w_pixels | a 4 cm cube that looks 80 px wide, fx = 800 → Z = 0.40 m
Run the pinhole model backwards. An object of real width W appears w pixels wide at depth Z, where w equals fx times W over Z. Rearranged, the depth is fx times the real width divided by the width in pixels.
Your cube is a known size, so measure its width in pixels, from the contour's bounding box, and you have its distance. Closer means bigger, exactly as you would expect.

## Then X and Y
\`\`\`python
x, y, w, h = cv2.boundingRect(c)
u, v = x + w / 2, y + h / 2                 # centre pixel
Z = fx * CUBE_W / w
X = (u - cx) * Z / fx
Y = (v - cy) * Z / fy
print(f"cube at X={X:.3f} Y={Y:.3f} Z={Z:.3f} m (camera frame)")
\`\`\`
With Z known, the pinhole equations give X and Y: take the pixel offset from the principal point, multiply by depth, divide by the focal length. Use the undistorted image, or undistort the centre point, so the intrinsics apply.
The result is the cube's position in the camera frame: x right, y down, z forward, the optical frame from Module 4.

## Check with a tape measure
| True distance | Estimated Z | Error |
|---|---|---|
| 0.30 m | | |
| 0.50 m | | |
| 0.80 m | | |
Place the cube at three measured distances and compare. Expect errors of a few percent, growing with distance, because a one-pixel width error matters more when the cube is small in the image.
If the error is large and consistent, check the square size used in calibration and the cube's real width. If it is noisy, smooth the mask more.

## Now break it
@big It worked yesterday — then the lighting changed
The second focus: why lighting changes break vision pipelines that worked yesterday. Switch a lamp on and off, or move to daylight by a window. Watch the detection flicker, shrink, or vanish.
The HSV range you tuned is narrower than reality. Shadows lower value and saturation; warm bulbs shift hue; highlights wash colour out to white. The mask breaks, the width is wrong, and so is the depth.

## Fix it, and write it up
- Widen and re-tune the HSV range across all lighting conditions
- Normalise brightness (e.g. equalise the V channel, CLAHE)
- Lock the webcam's auto-exposure and white balance if possible
- Or detect by shape, not just colour
Try fixes one at a time: tune the HSV range using frames from every lighting condition; equalise the brightness channel; lock the webcam's auto exposure and white balance; or detect the cube by its square shape rather than colour alone.
The article says the failure-and-fix write-up is portfolio material. Show the failure, the cause, the fix, and the numbers before and after. Push it and tick the practice task.
`,
  key: [
    'A pixel is a ray; you need depth Z to get a 3D point.',
    'Depth from known size: Z = fx·W_real / w_pixels; then X, Y from the pinhole model.',
    'Check against a tape measure; errors grow with distance.',
    'Lighting breaks colour thresholds; fix, measure, and write up the story.'
  ],
  quiz: [
    ['A 4 cm cube appears 40 px wide and fx = 800. What is its distance?', ['0.4 m', '0.8 m', '1.6 m', '0.2 m'], 1, 'Z = 800 × 0.04 / 40 = 0.8 m.'],
    ['Why does a pixel alone not give a 3D position?', ['Pixels are too small', 'Every point along the same ray hits the same pixel', 'OpenCV forbids it', 'The image is BGR'], 1, 'You need depth.']
  ]
});

D({
  n: 132, icon: '☁️', topic: 'Vision', hours: 2.5, notion: '3f6cdfea8ce28111afe1e205eedf6f06', svg: 'pointcloud',
  title: 'Depth sensing + point clouds with Open3D',
  goal: 'Find a table and the objects on it in a point cloud.',
  tasks: [
    'Read: stereo vs structured light vs time-of-flight (one paragraph each in your notes)',
    'Open3D tutorials: voxel downsample, normals, RANSAC plane segmentation, DBSCAN clustering on a sample cloud',
    'Pipeline: remove the table plane → cluster → bounding box per object',
    "Watch one Cyrill Stachniss lecture (EKF or graph SLAM) to connect this to Month 4's SLAM",
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['What to focus on', 'Depth from stereo versus structured light versus time-of-flight\nPoint cloud basics: downsampling, plane fitting to find a table, clustering to find objects on it'],
    ['Cyrill Stachniss lectures', 'Full university lecture recordings on mobile sensing, photogrammetry and SLAM, and the best free source on the geometric side: projective geometry, bundle adjustment, EKF and graph SLAM']
  ],
  links: [
    ['Open3D point cloud tutorials', 'https://www.open3d.org/docs/release/tutorial/geometry/pointcloud.html'],
    ['Cyrill Stachniss lectures, University of Bonn', 'https://www.ipb.uni-bonn.de/online-training-robotics/']
  ],
  video: `
## Three ways to sense depth
| Method | How | Strengths / weaknesses |
|---|---|---|
| stereo | two cameras, triangulate matching pixels | works outdoors; fails on blank surfaces |
| structured light | project a pattern, see how it bends | accurate up close; sunlight washes it out |
| time-of-flight | time a light pulse's round trip | fast, dense; struggles with shiny or dark surfaces |
Yesterday you got depth from a known size. Depth cameras measure it per pixel. Stereo uses two cameras and triangulates matching points, like your eyes; it struggles on blank walls with nothing to match.
Structured light projects a known pattern and measures how it deforms; accurate indoors, blinded by sunlight. Time of flight times a light pulse's round trip. Write one paragraph on each in your notes.

## From depth image to point cloud
@eq X = (u − cx)·Z/fx ·  Y = (v − cy)·Z/fy | for every pixel with a depth
A depth image gives Z for every pixel. Apply yesterday's equations to every pixel, and you get a point cloud: hundreds of thousands of 3D points. Add colour from the RGB image, and you have a coloured 3D snapshot of the scene.
No depth camera? Open3D's sample clouds are enough, as the gear list says. The processing is identical.

## Downsample and normals
\`\`\`python
import open3d as o3d
pcd = o3d.io.read_point_cloud("tabletop.ply")
down = pcd.voxel_down_sample(voxel_size=0.01)          # one point per 1 cm cube
down.estimate_normals(o3d.geometry.KDTreeSearchParamHybrid(radius=0.03, max_nn=30))
o3d.visualization.draw_geometries([down])
\`\`\`
Raw clouds are huge, so first downsample with a voxel grid: divide space into small cubes and keep one averaged point per cube. A one-centimetre voxel typically cuts the cloud by ten times or more with little loss.
Then estimate normals, the surface direction at each point, which many later steps use. Always visualise after each step.

## Find the table with RANSAC
\`\`\`python
plane, inliers = down.segment_plane(distance_threshold=0.01, ransac_n=3, num_iterations=1000)
table   = down.select_by_index(inliers)
objects = down.select_by_index(inliers, invert=True)
\`\`\`
The article's pipeline: plane fitting to find the table. RANSAC picks three random points, fits a plane, counts how many points lie within a centimetre of it, and repeats a thousand times, keeping the best. The biggest plane in a tabletop scene is the table.
Split the cloud into table inliers and everything else. What is left is the objects, plus some clutter.

## Cluster the objects
\`\`\`python
labels = np.array(objects.cluster_dbscan(eps=0.02, min_points=20))
for k in range(labels.max() + 1):
    obj = objects.select_by_index(np.where(labels == k)[0])
    box = obj.get_axis_aligned_bounding_box()
    print(k, box.get_center(), box.get_extent())
\`\`\`
Then cluster: DBSCAN groups points that are within a small distance of each other, so each separate object becomes its own cluster. Tune eps, the neighbour distance, and the minimum cluster size.
Put a bounding box around each cluster and print its centre and size. That is the input a grasp planner needs: where each object is and how big. Log how many objects you found.

## Connect it to SLAM
- Point clouds + transforms = 3D maps
- Stachniss lectures: EKF SLAM and graph SLAM, the theory behind SLAM Toolbox
- Watch one lecture today
Point clouds plus the transforms from last week are exactly how 3D maps are built. To close the loop with Module 4, watch one Cyrill Stachniss lecture on EKF SLAM or graph SLAM; the article calls his lectures the best free source on the geometric side.
SLAM Toolbox is a graph SLAM system. Now you will know what that means.
`,
  key: [
    'Depth: stereo (triangulation), structured light (pattern), time-of-flight (timing).',
    'Depth image + intrinsics → point cloud, one point per pixel.',
    'Pipeline: voxel downsample → RANSAC table plane → DBSCAN clusters → boxes.',
    'Point clouds + transforms = 3D maps; Stachniss explains the SLAM theory.'
  ],
  quiz: [
    ['Which depth method fails on a blank white wall?', ['Time-of-flight', 'Stereo', 'Structured light', 'All equally'], 1, 'Stereo needs texture to match pixels.'],
    ['What is RANSAC used for in the tabletop pipeline?', ['Downsampling', 'Finding the table plane', 'Clustering objects', 'Colouring points'], 1, 'Fit the dominant plane robustly.']
  ]
});

D({
  n: 133, icon: '🔁', topic: 'Review', hours: 2, notion: '3f6cdfea8ce281ecab33fc7390328291', svg: 'pinhole',
  title: 'Week 3 review + catch-up',
  goal: 'IK and vision solid before MoveIt.',
  tasks: [
    'Finish unfinished tasks from M5 Days 15–20',
    'Without notes: turn a pixel + depth into a 3D point using fx, fy, cx, cy',
    'Look at the Month 6 gear list — you order on Day 22',
    'Update Confidence on Days 15–20'
  ],
  links: [['OpenCV Camera Calibration tutorial', 'https://docs.opencv.org/4.x/dc/dbb/tutorial_py_calibration.html']],
  video: `
## One calculation without notes
@eq pixel (420, 300), Z = 0.5 m, fx = fy = 800, cx = 320, cy = 240 → X = ?, Y = ?
Review day, starting with one calculation without notes: a pixel at 420, 300, depth half a metre, focal lengths 800, principal point 320, 240. What are X and Y?
X is 420 minus 320, times 0.5, over 800: 6.25 centimetres. Y is 300 minus 240, times 0.5, over 800: 3.75 centimetres. If that felt easy, the pinhole model is yours.

## The week in one table
| Idea | One line |
|---|---|
| Jacobian | joint speeds → end-effector velocity |
| singularity | J loses rank; a direction is lost |
| numerical IK | iterate damped least squares until close |
| calibration | K + distortion from a chessboard, error < 1 px |
| pixel → 3D | need depth; Z from known size or a depth camera |
| point clouds | downsample, RANSAC plane, DBSCAN clusters |
Here is the week compressed: Jacobians and singularities, numerical IK, calibration, pixel to 3D, and point clouds. These are the pieces underneath MoveIt and every pick-and-place system.
Next section puts them together: MoveIt uses IK and collision checking, and perception tells it where objects are.

## Check your three projects
- so101-kinematics: FK table, IK errors, the singularity demo, joint vs Cartesian paths
- vision-3d: calibration error, distance table, the lighting failure-and-fix story
- Notes: depth sensing paragraphs, point cloud pipeline output
Check the portfolio pieces. The kinematics repo should show the FK comparison, IK errors for the five targets, the singularity demonstration and the path comparison. The vision repo should have the calibration error, the distance table, and the failure-and-fix story.
Fill any gaps today.

## Look at Month 6 gear
- Hugging Face account and LeRobot with policy extras
- Desk lamp for consistent lighting; a second USB camera with a mount
- A training GPU: Colab or a cloud GPU
Also today: look at the Module 6 gear list; you order on day 22. It is mostly accounts and software: a Hugging Face account, LeRobot, and access to a GPU for training, Colab or cloud.
The hardware is a desk lamp for consistent lighting, which, after Day 19, you know why, and a second camera with a mount for better recordings. Next section: MoveIt 2 and manipulation.
`,
  key: [
    'Pixel + depth → 3D with X = (u−cx)Z/fx, Y = (v−cy)Z/fy.',
    'Jacobian, singularities and damped IK underpin MoveIt.',
    'Calibration, pixel-to-3D and point clouds give MoveIt object positions.',
    'Plan Month 6 gear: HF account, GPU access, lamp, second camera.'
  ],
  quiz: [
    ['u = 420, cx = 320, Z = 0.5 m, fx = 800. What is X?', ['0.0625 m', '0.25 m', '0.5 m', '0.125 m'], 0, '(420−320)·0.5/800.'],
    ['Why is a desk lamp on the Month 6 gear list?', ['To read at night', 'Consistent lighting, because vision and policies break when lighting changes', 'To heat servos', 'Calibration requires it'], 1, 'You saw this on Day 19.']
  ]
});

// ───────────── Section 4 · MoveIt 2 and manipulation ─────────────
D({
  n: 134, icon: '🦿', topic: 'Manipulation', hours: 3, notion: '3f6cdfea8ce281b8a908c36382d89e0d', svg: 'arm',
  title: 'MoveIt 2 getting started · ORDER Month 6 gear',
  goal: 'MoveIt 2 planning motions for a simulated arm, and Month 6 resources ready.',
  order: 'Order / set up Module 6 today. On the Gear tab, Module 6: GPU access for training (Google Colab or a cloud GPU), a Hugging Face account, a second USB camera for LeRobot recording, and good desk lighting. Set each item\'s Status.',
  tasks: [
    'Order / set up Month 6 (see the order note)',
    'Install MoveIt 2 for Jazzy. Run the Getting Started tutorial and the RViz MotionPlanning plugin demo',
    'Plan and execute a few goal poses by dragging the interactive marker',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [['MoveIt 2 Getting Started', 'The official entry point, and the docs recommend Jazzy on Ubuntu 24.04 for the smoothest experience']],
  links: [['MoveIt 2 Getting Started', 'https://moveit.picknik.ai/main/doc/tutorials/getting_started/getting_started.html']],
  video: `
## The last section of Module 5
@svg arm | IK + collision checking + planning = MoveIt
Final section of Module 5: manipulation with MoveIt 2. Everything from the last three weeks lives inside it: forward and inverse kinematics, Jacobians, transforms, and a model of the world to avoid.
MoveIt is the standard motion-planning framework for ROS arms. Today you install it and plan motions by dragging a target around in RViz.

## Set up Module 6 first
- GPU access for training: Google Colab or a cloud GPU
- A Hugging Face account: datasets and models live on the Hub
- A second USB camera and mount; good, consistent desk lighting
First, the Module 6 setup. Module 6 is robot learning, so you need GPU access for training: Colab works, or a rented cloud GPU. Create a Hugging Face account, where LeRobot stores datasets and trained policies.
Hardware is light: a second camera for a wrist or side view, which makes recorded demonstrations much better, and a lamp for consistent lighting. Set each item's status on the Gear tab.

## Install and run the demo
\`\`\`bash
sudo apt install ros-jazzy-moveit
# follow Getting Started: build the tutorials workspace, then
ros2 launch moveit2_tutorials demo.launch.py
\`\`\`
Install MoveIt for Jazzy; the docs recommend Jazzy on Ubuntu 24.04 for the smoothest experience, which is exactly your setup. The Getting Started tutorial builds a tutorials workspace and launches a demo with a Panda arm in RViz.
The first build takes a while. Start it, then read on while it compiles.

## The MotionPlanning plugin
- Drag the interactive marker: a goal pose for the gripper
- Orange ghost = goal state, solved by IK
- Plan → a trajectory preview · Execute → the arm moves
In RViz, the MotionPlanning panel shows the arm with an interactive marker at the gripper. Drag and rotate it: MoveIt solves IK continuously and shows the goal configuration as an orange ghost arm.
Click Plan, and MoveIt searches for a collision-free path and animates it. Click Execute, and the simulated arm follows. Try several goals, including awkward ones near the arm's limits.

## What MoveIt is made of
| Piece | Job |
|---|---|
| move_group | the central node: coordinates everything |
| kinematics plugin | IK, like your solver, but faster and robust |
| planning scene | the robot plus every obstacle |
| planners (OMPL, Pilz, STOMP) | search for collision-free paths |
| trajectory execution | sends the path to ros2_control controllers |
Like Nav2, MoveIt is a set of components. Move group is the central node. A kinematics plugin solves IK. The planning scene holds the robot and everything around it. Planners, OMPL by default, search for collision-free paths.
Trajectory execution sends the result to ros2 control: a joint trajectory controller, the arm version of the diff drive controller you configured in Module 4.

## Sampling-based planning
@eq sample random configurations → keep collision-free ones → connect them → path | OMPL's RRTConnect
OMPL planners like RRT Connect are sampling-based. They try random arm configurations, keep the ones that do not collide, and connect them into a tree until start and goal are linked. Then they smooth the path.
Because it is random, the same goal can give different paths each time, and a plan can occasionally fail where a retry succeeds. Plan the same goal several times today and watch the paths differ.
`,
  key: [
    'MoveIt combines IK, collision checking and planning for arms.',
    'Set up Module 6: GPU access, Hugging Face, second camera, lighting.',
    'RViz MotionPlanning: drag the marker, Plan, Execute.',
    'OMPL planners sample random configurations; paths vary between runs.'
  ],
  quiz: [
    ['Which MoveIt component holds the robot and all obstacles?', ['move_group', 'The planning scene', 'OMPL', 'The kinematics plugin'], 1, 'Planners check collisions against it.'],
    ['Why can the same MoveIt goal produce different paths?', ['A bug', 'OMPL planners are sampling-based (random)', 'The robot moves', 'IK is disabled'], 1, 'Random sampling finds different solutions.']
  ]
});

D({
  n: 135, icon: '🧱', topic: 'Manipulation', hours: 2.5, notion: '3f6cdfea8ce2818a88dcf179303df29b', svg: 'arm',
  title: 'Planning scene + collision objects',
  goal: 'Plan around obstacles from your own code.',
  tasks: [
    'MoveIt tutorials: MoveGroup / MoveItPy (or C++ API) — plan to a pose from code',
    'Add a table and a box as collision objects to the planning scene. Plan around them',
    "Read Tedrake's Robotic Manipulation intro chapter",
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [['Robotic Manipulation, Russ Tedrake', 'Twelve chapters connecting hardware, kinematics, perception, grasping, planning and control into one coherent stack, and it now teaches model-based and learned approaches together, which is exactly how the industry now works']],
  links: [
    ['MoveIt 2 Getting Started', 'https://moveit.picknik.ai/main/doc/tutorials/getting_started/getting_started.html'],
    ['Robotic Manipulation, Russ Tedrake, MIT', 'https://manipulation.csail.mit.edu/']
  ],
  video: `
## From clicking to code
@big Real systems plan from code, not from RViz
Yesterday you planned by dragging a marker. Real systems plan from code: perception finds an object, code computes a goal pose, and MoveIt plans to it. Today you do that, and teach MoveIt about obstacles.
Use the MoveGroup interface in C++, or MoveItPy in Python. The tutorials cover both; pick the language you are faster in.

## Plan to a pose from code
\`\`\`python
from moveit.planning import MoveItPy
from geometry_msgs.msg import PoseStamped

moveit = MoveItPy(node_name="planner")
arm = moveit.get_planning_component("panda_arm")
goal = PoseStamped(); goal.header.frame_id = "panda_link0"
goal.pose.position.x, goal.pose.position.y, goal.pose.position.z = 0.4, 0.1, 0.4
goal.pose.orientation.w = 1.0
arm.set_start_state_to_current_state()
arm.set_goal_state(pose_stamped_msg=goal, pose_link="panda_link8")
plan = arm.plan()
if plan:
    moveit.execute(plan.trajectory, controllers=[])
\`\`\`
The pattern is always the same. Get a planning component for the arm group. Set the start state to the current state. Set a goal, here a pose for the gripper link in the base frame. Plan, and if it succeeds, execute.
Notice the frame ID on the goal: the pose is expressed in the base frame, a homogeneous transform exactly like last week's.

## Collision objects
\`\`\`python
from moveit_msgs.msg import CollisionObject
from shape_msgs.msg import SolidPrimitive

table = CollisionObject(); table.id = "table"
table.header.frame_id = "panda_link0"
box = SolidPrimitive(type=SolidPrimitive.BOX, dimensions=[0.8, 1.2, 0.05])
table.primitives.append(box)
table.primitive_poses.append(pose(0.5, 0.0, -0.03))
table.operation = CollisionObject.ADD
with moveit.get_planning_scene_monitor().read_write() as scene:
    scene.apply_collision_object(table)
\`\`\`
MoveIt only avoids what it knows about. Add obstacles to the planning scene as collision objects: a shape, a size, a pose and an ID. Boxes, cylinders and spheres cover most cases; meshes are possible too.
Add a table under the arm and a box in the middle of the workspace. They appear green in RViz.

## Plan around them
- Goal on the far side of the box → the path goes over or around it
- Goal inside the box → planning fails (goal in collision)
- Move the box, re-plan: the path changes
Now plan to a goal on the far side of the box: the arm should lift over or swing around it. Plan to a goal inside the box: planning fails immediately, because the goal itself is in collision.
Move the box and plan again. This is the loop every pick-and-place system runs: perceive, update the scene, plan.

## Where the scene comes from
| Source | Example |
|---|---|
| known geometry | the table, walls, fixtures — added in code |
| perception | your Day 20 point-cloud boxes → collision objects |
| octomap | a depth camera's raw points as voxels |
In a real system, the scene comes from somewhere. Fixed things like tables are added in code. Objects come from perception: the bounding boxes from your Day 20 point-cloud pipeline map directly to collision objects.
MoveIt can also take raw depth data as an octomap, a voxel grid of occupied space. That closes the loop between vision and manipulation.

## Tedrake's Robotic Manipulation
- Twelve chapters: hardware, kinematics, perception, grasping, planning, control
- Model-based and learned approaches, together
- Read the intro chapter today
Read the intro chapter of Russ Tedrake's Robotic Manipulation, free online. The article praises it for connecting hardware, kinematics, perception, grasping, planning and control into one coherent stack.
It teaches model-based and learned approaches together, which the article notes is exactly how the industry now works. It is also the perfect bridge to Module 6.
`,
  key: [
    'Plan from code: start state → goal pose (in a frame) → plan → execute.',
    'MoveIt only avoids what is in the planning scene; add collision objects.',
    'A goal in collision fails immediately; moving obstacles changes the path.',
    'Scene sources: known geometry, perception boxes, octomaps.'
  ],
  quiz: [
    ['MoveIt plans straight through a real box on the table. Why?', ['OMPL is broken', 'The box was never added to the planning scene', 'The arm is too short', 'The goal frame is wrong'], 1, 'MoveIt only avoids what it knows about.'],
    ['What happens if the goal pose is inside a collision object?', ['The arm pushes it away', 'Planning fails because the goal is in collision', 'MoveIt ignores the object', 'It plans more slowly'], 1, 'An invalid goal cannot be reached.']
  ]
});

D({
  n: 136, icon: '🤏', topic: 'Manipulation', hours: 3, notion: '3f6cdfea8ce2810d84d5c839c7b7885f', svg: 'arm',
  title: 'Pick and place with MoveIt Task Constructor',
  goal: 'A collision-free pick and place in simulation, built from stages.',
  tasks: [
    'Follow the MoveIt Task Constructor pick-and-place tutorial end to end',
    'Understand each stage: current state → open hand → move to pick → approach → grasp → lift → move to place → release → retreat',
    'Change the object position and the place position. Re-run',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['Pick and Place with MoveIt Task Constructor', 'The most useful manipulation tutorial in ROS 2, teaching how to decompose a task into stages and implement grasp generation, IK and collision management'],
    ['Month 5 Milestone (this one)', 'Plan and execute a collision-free pick and place in MoveIt 2']
  ],
  links: [['Pick and Place with MoveIt Task Constructor', 'https://moveit.picknik.ai/main/doc/tutorials/pick_and_place_with_moveit_task_constructor/pick_and_place_with_moveit_task_constructor.html']],
  video: `
## Why pick and place is hard
@big One task, many motions, each with its own constraints
Picking something up looks simple, but it is a chain of motions with different rules. Moving freely to the object, approaching it in a straight line, closing the gripper, lifting without dragging, carrying, placing, letting go, and backing away.
Each step must be collision-free, and each must connect to the next. Planning them one at a time often paints you into a corner. MoveIt Task Constructor plans them together.

## The stages
1. Current state → open hand
2. Move to pick (free motion) → approach (straight line)
3. Generate grasp → close hand, attach object → lift (straight up)
4. Move to place (free motion) → lower → open hand, detach → retreat
The tutorial decomposes the task into stages: open the hand, move to the pick area, approach in a straight line, generate a grasp pose, close the hand and attach the object to the gripper, lift, move to the place area, lower, release, and retreat.
The article calls this the most useful manipulation tutorial in ROS 2, because it teaches exactly this skill: decomposing a task into stages.

## Two kinds of motion
| Stage type | Planner | Why |
|---|---|---|
| move to pick / place | sampling (OMPL) | free space, any path is fine |
| approach / lift / retreat | Cartesian straight line | the path itself matters |
Notice the two kinds of motion, which is Day 16's lesson in action. Big moves through free space use a sampling planner: any collision-free path will do. Approach, lift and retreat use straight Cartesian lines, because the path matters: you must come down onto the object, not swipe at it sideways.
Task Constructor lets you choose the planner per stage.

## Attaching the object
- Grasp: allow gripper-object contact, then attach the object to the gripper
- While carried, the object moves with the hand and is collision-checked
- Release: detach it back into the scene
A subtle but crucial step: attaching the object. When the gripper closes, the object stops being an obstacle and becomes part of the robot. MoveIt allows contact between the fingers and the object, and from then on checks the carried object for collisions too.
When you release, the object is detached and becomes part of the scene again, at its new position.

## Why plan all stages together
@eq search over grasp candidates × IK solutions × connecting paths | pick the best complete solution
The power of Task Constructor: it searches over all stages together. There may be many grasp poses and many IK solutions for each. A grasp that looks fine for picking may make placing impossible.
By considering the whole chain, it finds a complete solution that works end to end, and the RViz panel lets you inspect every stage and every candidate, including the failed ones.

## Make it yours
- Move the object; move the place location; re-run
- Use the introspection panel: which stages produced how many solutions?
- Record a video of a full pick and place
Follow the tutorial end to end, then change the object's position and the place position and run it again. Open the Task Constructor panel in RViz and look at how many solutions each stage produced.
Record a short video of a full successful pick and place: that ticks the milestone item, plan and execute a collision-free pick and place in MoveIt 2. Tomorrow you make it fail.
`,
  key: [
    'Pick and place = a chain of stages with different constraints.',
    'Free moves use sampling planners; approach/lift/retreat use straight lines.',
    'Grasping attaches the object to the gripper so it is collision-checked while carried.',
    'Task Constructor plans all stages together and lets you inspect each.'
  ],
  quiz: [
    ['Why use a Cartesian straight line for the approach stage?', ['It is faster to compute', 'The gripper must come straight onto the object, not swipe sideways', 'OMPL cannot plan approaches', 'It avoids IK'], 1, 'The path itself matters.'],
    ['Why attach the object to the gripper after grasping?', ['To make it lighter', 'So it moves with the hand and is collision-checked while carried', 'To delete it', 'To speed up planning'], 1, 'It becomes part of the robot.']
  ]
});

D({
  n: 137, icon: '💥', topic: 'Manipulation', hours: 2.5, notion: '3f6cdfea8ce281a8a3b6dae3deee1f40', svg: 'arm',
  title: 'Make the planner fail on purpose + grasping',
  goal: 'Understand planner failure, and see how learned grasping fits in.',
  tasks: [
    'Block the only viable path with an obstacle. Observe: timeout, which stage fails, what the logs say',
    'Try a different planner or a longer planning time. Note what changes',
    "Read Tedrake's grasping chapter. Skim the Contact-GraspNet README (what input, what output)",
    'Push `month-5/moveit-pick-place/` with a video of success and of failure',
    'Tick Practice task done. Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['Practice task (MoveIt)', 'Practice task: get MoveIt 2 planning motions for a simulated arm, add collision objects to the planning scene, and execute a pick and place. Then make it fail by placing an obstacle in the only viable path and observe how the planner behaves. Understanding planner failure is more valuable than watching it succeed'],
    ['Contact-GraspNet', 'Six-DOF grasp generation in cluttered scenes from a depth map, and the standard baseline for learned grasping']
  ],
  links: [
    ['Robotic Manipulation, Russ Tedrake', 'https://manipulation.csail.mit.edu/'],
    ['Contact-GraspNet, NVIDIA', 'https://github.com/NVlabs/contact_graspnet']
  ],
  video: `
## Failure is the lesson
@big Understanding planner failure is more valuable than watching it succeed
The article is explicit: understanding planner failure is more valuable than watching it succeed. Today you break your pick and place on purpose and study how it fails.
In real deployments, planners fail all the time: a cluttered shelf, an unreachable object, a tight gap. Engineers who can read those failures are the ones who fix robots.

## Block the only path
- Place a tall wall between pick and place, or box the object in
- Run the task again
- Observe: does it time out? which stage fails? what do the logs say?
Place an obstacle that blocks the only viable path: a tall wall between the pick and place areas, or boxes around the object so no approach direction is free. Run the task again.
Watch closely. Does planning time out, or fail instantly? Which stage fails in the Task Constructor panel? What exactly do the terminal logs say? Write it all down.

## Reading the failure
| What you see | What it means |
|---|---|
| fails instantly | goal or start in collision, or IK has no solution |
| times out | the planner searched and found no path in time |
| approach stage: 0 solutions | no straight-line approach is free |
| connect stage fails | pick and place each work, but cannot be joined |
Different failures mean different things. An instant failure usually means the goal or start is in collision, or IK found no solution at all. A timeout means the planner searched and gave up: maybe impossible, maybe just hard.
Task Constructor tells you which stage failed. Zero approach solutions means no straight approach is clear. A failed connect stage means picking and placing each work, but no path joins them.

## Impossible or just hard?
- Longer planning time: does it eventually succeed?
- Different planner (e.g. RRTstar, PRM, or Pilz for straight lines)
- If nothing works: probably truly blocked
Sampling planners cannot prove a path does not exist; they just fail to find one in time. So try a longer planning time, and a different planner. If one succeeds, the problem was hard, not impossible.
If nothing works, the path is probably truly blocked. Note what changed with each attempt. This is the reasoning you will use on every real manipulation bug.

## Where grasps come from
- In the tutorial: grasp poses generated around a known object shape
- Real world: unknown objects, clutter, only a depth image
- Contact-GraspNet: depth map in → many 6-DOF grasp poses + scores out
In the tutorial, grasps are generated around a known simple shape. Real objects are unknown and cluttered, and all you have is a depth image. That is where learned grasping comes in.
Contact-GraspNet, from NVIDIA, takes a depth map and outputs many six-degree-of-freedom grasp poses with confidence scores. The article calls it the standard baseline for learned grasping. Skim its README: note the input and the output.

## Model-based meets learned
@eq learned grasp poses → MoveIt plans + collision checks → execute
Here is how the pieces fit, and the idea Tedrake's book is built on. A learned model proposes grasps. A model-based planner like MoveIt checks reachability and collisions, and plans the motion. Each covers the other's weakness.
Read Tedrake's grasping chapter, then push your pick-and-place repo with two videos: one success, one failure, with your explanation of the failure. Tick the practice task.
`,
  key: [
    'Understanding planner failure is worth more than watching success.',
    'Instant failure: collision or no IK; timeout: no path found in time.',
    'Sampling planners cannot prove impossibility; try more time or another planner.',
    'Learned grasping (Contact-GraspNet) proposes grasps; MoveIt plans and checks them.'
  ],
  quiz: [
    ['Planning fails instantly instead of timing out. Most likely cause?', ['The planner needs more time', 'Goal or start in collision, or no IK solution', 'Too many CPU cores', 'The video recorder'], 1, 'Instant failures are usually invalid states.'],
    ['What does Contact-GraspNet take as input?', ['A URDF', 'A depth map', 'Joint angles', 'A behaviour tree'], 1, 'It outputs scored 6-DOF grasp poses.']
  ]
});

D({
  n: 138, icon: '📝', topic: 'Portfolio & career', hours: 2.5, notion: '3f6cdfea8ce2819f9e86e173510e951a', svg: 'pid',
  title: 'Write-ups: control, kinematics, vision, MoveIt',
  goal: 'Month 5 READMEs that show numbers, plots and failures.',
  tasks: [
    'Polish each Month 5 README: controller comparison plot, LQR vs PID plot, FK/IK table, vision failure-and-fix, MoveIt videos',
    'Each has a "what broke and how I fixed it" section',
    'Link them from `month-5/README.md`',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [['Reminder', 'That plot is worth more in an interview than any certificate']],
  links: [['The Fundamentals of Control Theory, Brian Douglas', 'https://engineeringmedia.com/books']],
  video: `
## Five projects, one month
| Project | The headline artefact |
|---|---|
| controller-comparison | P vs PD vs PID+FF plot + metrics table |
| cartpole-lqr | LQR vs PID after a push |
| so101-kinematics | hand vs toolbox vs real table; the singularity |
| vision-3d | distance table; the lighting failure-and-fix |
| moveit-pick-place | videos of success and of failure |
Today is a write-up day. In one month you produced five projects, each with a headline artefact: a plot, a table, or a video. The article's reminder: that plot is worth more in an interview than any certificate.
Your job today is to make each README show that artefact first, so a reviewer gets the point in ten seconds.

## The README template
1. One sentence: what it is and what it shows
2. The headline plot, table or video
3. How it works: a short diagram or paragraph
4. Results with numbers
5. What broke and how I fixed it
6. How to run it
Use the same structure for all five. One sentence, then the headline artefact, a short explanation, results with numbers, what broke, and how to run it. Consistency across repos makes you look organised, which you are.
Keep each README to one screen if you can. Link to details rather than including everything.

## What broke, every time
- Controller: noise when D was too high? windup at saturation?
- LQR: a sign error in the model? the failure angle?
- Kinematics: zero-offset mismatch? the singularity spike?
- Vision: the lighting failure; MoveIt: the blocked path
Every README needs a what-broke section. You already have the material in your daily logs: the noisy derivative, the sign error, the zero offset, the lighting failure, the blocked planner.
This section is what interviewers ask about. "Tell me about a time something did not work" has five good answers now.

## Numbers beat adjectives
@big "Settling time fell from 1.4 s to 0.6 s" beats "much better"
Go through each README and replace adjectives with numbers. Not "PD was much better", but "overshoot fell from 38 to 12 percent". Not "accurate", but "within 7 millimetres at 50 centimetres".
Numbers show you measured, and measuring is what engineers do.

## The month index
\`\`\`text
month-5/README.md
  Control:      controller-comparison · cartpole-lqr
  Kinematics:   so101-kinematics
  Vision:       vision-3d
  Manipulation: moveit-pick-place
  (one line + one thumbnail each)
\`\`\`
Finally, a month index: one README linking all five projects, grouped by topic, each with one line and a thumbnail. Link it from your top-level repo README.
Tomorrow is the milestone test, where you show each item. These write-ups are your evidence.

## Make the plots readable
- Axis labels with units: "time [s]", "angle [deg]"
- One colour per controller, a legend, a dashed target line
- Export at a readable size (PNG, ~1200 px wide); no screenshots of notebooks
A plot is only worth something if a stranger can read it. Every axis needs a label with units. Every line needs a legend entry. The target goes in as a dashed line. Export a clean PNG at a decent size, rather than a blurry screenshot of a notebook.
Spend ten minutes on each headline plot. It is the first thing anyone sees, so it is the best-spent ten minutes of the day.

## A short video beats a long paragraph
- Under one minute; show the result, then one failure
- Add captions instead of narration
- Put a GIF at the top of the README, link the full video
For the MoveIt and vision projects, a short clip says more than any paragraph. Keep it under a minute: the success first, then one failure, with captions explaining what you see.
Convert the first few seconds to a GIF and put it at the top of the README, linking to the full video. Reviewers scroll fast; a moving image makes them stop.
`,
  key: [
    'Five Module 5 projects, each with a headline plot, table or video.',
    'README: one sentence → artefact → how → numbers → what broke → how to run.',
    'Replace adjectives with measured numbers.',
    'A month index links all projects by topic.'
  ],
  quiz: [
    ['What should a reviewer see first in each README?', ['The licence', 'The headline plot, table or video', 'Installation steps', 'A long introduction'], 1, 'Make the point in ten seconds.'],
    ['Which is the stronger README sentence?', ['"PD was much better"', '"Overshoot fell from 38% to 12% with PD"', '"It worked well"', '"Great results"'], 1, 'Numbers beat adjectives.']
  ]
});

D({
  n: 139, icon: '🧪', topic: 'Milestone', hours: 2.5, notion: '3f6cdfea8ce28100aef6eaf9ab2b752e', svg: 'arm',
  title: 'Month 5 milestone test',
  goal: 'Prove every Month 5 milestone item.',
  tasks: [
    'Go through each milestone item. Show it or explain it out loud (record if alone)',
    'Point at your SO-101 in a singular pose and explain it in one minute',
    'Fix any failing item',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [['Month 5 Milestone', 'By the end of this month you should be able to:\nImplement and tune a PID controller and explain every term from measured data\nDescribe a system in state space and implement LQR on a simulated plant\nCompute forward kinematics by hand and solve IK numerically\nExplain what a singularity is by pointing at a robot doing it\nCalibrate a camera and turn a pixel into a 3D position\nPlan and execute a collision-free pick and place in MoveIt 2']],
  links: [['Modern Robotics', 'http://hades.mech.northwestern.edu/index.php/Modern_Robotics']],
  video: `
## Six items to prove
1. PID: explain every term from your measured data
2. State space + LQR on a simulated plant
3. FK by hand, IK numerically
4. A singularity, pointing at your robot
5. Calibrate a camera; pixel → 3D
6. A collision-free pick and place in MoveIt 2
Milestone day. Six items, each shown or explained out loud. If you are alone, record yourself; explaining to a camera is surprisingly close to explaining to an interviewer.
Go in order, and for each one, open the project and use its plot, table or video as your prop.

## How to explain each one
| Item | Your prop | One key sentence |
|---|---|---|
| PID | comparison plot | "D cut overshoot from X to Y" |
| LQR | push plot | "LQR returned the cart; PID let it drift" |
| FK / IK | error table | "damped least squares stays sane near singularities" |
| calibration | error + distance table | "Z = fx·W / w" |
| MoveIt | two videos | "this stage failed because…" |
For each item, have a prop and one key sentence ready. For PID, the plot and how much D cut overshoot. For LQR, the push plot and the drifting cart. For kinematics, the error table and why damping matters.
For vision, the re-projection error and the depth formula. For MoveIt, both videos and which stage failed. Aim for about two minutes per item.

## The singularity, in one minute
- Pose the SO-101 fully stretched out
- "Here the shoulder, elbow and wrist axes line up in one plane…"
- "…so it cannot move further outward, and nearby, sideways moves need huge joint speeds"
- "My IK solver showed it: joints spiked until I added damping"
The article's most physical milestone: explain a singularity by pointing at a robot doing it. Pose your SO-101 fully stretched. Point at it. Explain that it cannot move further outward, and that near this pose small Cartesian moves demand huge joint speeds.
Finish with your own evidence: your IK solver's joint spikes, and how damping fixed them. One minute, no notes.

## Fix what fails
- Shaky explanation? Rewatch that day at 1.5×, then try again
- Missing evidence? Re-run the experiment and log the numbers
- Tick each item on the Month 5 page as it passes
Anything that does not pass today, fix today. A shaky explanation needs a quick rewatch and another attempt. Missing evidence needs a re-run with numbers.
Tick each item on the Month 5 page as it passes. Tomorrow is the retro and the preview of Module 6: robot learning.
`,
  key: [
    'Show or explain all six milestone items, with a prop for each.',
    'One key sentence per item, backed by your own numbers.',
    'Explain the singularity by pointing at the stretched-out SO-101.',
    'Fix failing items today; tick each on the Month 5 page.'
  ],
  quiz: [
    ['What is the best prop for explaining PID terms?', ['A textbook diagram', 'Your own comparison plot', 'A screenshot of RViz', 'The LeRobot docs'], 1, 'Explain from measured data.'],
    ['Stretched fully out, what can the arm not do?', ['Rotate its base', 'Move further outward', 'Open the gripper', 'Lift its elbow'], 1, 'That is the workspace-edge singularity.']
  ]
});

D({
  n: 140, icon: '🏁', topic: 'Review', hours: 1.5, notion: '3f6cdfea8ce28160a421d4bfb5dfb4a6', svg: 'policy',
  title: 'Month 5 retro + Month 6 prep',
  goal: 'Close Month 5 and be ready to teach the arm by demonstration.',
  tasks: [
    'Open the Month 5 page: tick milestones, tick Milestone met, fill the Retro',
    'Review all Month 5 days: redo or set Skipped',
    'Check the SO-101 still teleoperates; update LeRobot to the latest version',
    'Read the Month 6 intro below',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [['Month 6 preview', 'Your goal this month: pick one direction, build a portfolio piece in it, and start applying\nYou now have the whole stack: electronics, embedded, mechanical, ROS 2, control and perception']],
  links: [['LeRobot', 'https://github.com/huggingface/lerobot']],
  video: `
## Module 5 in one table
| Section | You can now |
|---|---|
| PID and state space | tune and explain PID from data; write ẋ = Ax + Bu |
| LQR and kinematics | design LQR; transforms; FK by hand |
| Jacobians, IK and vision | numerical IK; calibrate; pixel → 3D; point clouds |
| MoveIt 2 | plan, avoid collisions, pick and place, read failures |
Final day of Module 5. You learned what the libraries were doing: control theory from PID to LQR, kinematics from transforms to IK, vision from calibration to point clouds, and manipulation with MoveIt.
Write the retro on the Month 5 page and tick the milestones. Redo or skip any unfinished days.

## The retro questions
- Which topic felt hardest: control, kinematics, vision or MoveIt?
- Which plot or table are you proudest of?
- One thing you can do now that you could not a month ago
- Total hours this month
Answer four questions: the hardest topic, the artefact you are proudest of, one new ability, and your total hours.
The hardest topic is worth a note: it may be exactly the direction to avoid for your capstone, or the one to lean into if it fascinated you.

## Module 6 preview
@svg policy | record demonstrations → train a policy → deploy it
The Month 6 preview: pick one direction, build a portfolio piece in it, and start applying. You now have the whole stack: electronics, embedded, mechanical, ROS 2, control and perception.
Module 6 starts with robot learning: you teleoperate the SO-101 to record demonstrations, train a policy on them, and let the arm do the task itself. Then reinforcement learning, a capstone, and interview preparation.

## Get the arm ready
\`\`\`bash
cd lerobot && git pull
pip install -e ".[feetech]"      # or the extras for your motors
# then: run your teleoperation command from Module 3 and check every joint
\`\`\`
Practical prep: update LeRobot to the latest version, because it moves fast, and check the SO-101 still teleoperates smoothly, every joint, leader and follower.
Check your Hugging Face login, your GPU access and your lighting. Congratulations on finishing Module 5. One module to go.
`,
  key: [
    'Module 5: control, kinematics, vision and MoveIt underneath the libraries.',
    'Retro: hardest topic, proudest artefact, a new skill, hours.',
    'Module 6: robot learning, RL, a capstone and interviews.',
    'Update LeRobot and check SO-101 teleoperation before starting.'
  ],
  quiz: [
    ['What is the goal of Module 6, according to the preview?', ['Learn soldering', 'Pick one direction, build a portfolio piece in it, and start applying', 'Rebuild the balancer', 'Write a SLAM algorithm'], 1, 'You now have the whole stack.'],
    ['Why update LeRobot before Module 6?', ['It is required by MoveIt', 'It changes quickly; the latest version matches current docs', 'To reset the arm', 'To remove calibration'], 1, 'Stay current with a fast-moving library.']
  ]
});
// @@END
