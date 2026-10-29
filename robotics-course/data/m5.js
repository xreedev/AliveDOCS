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
// @@END
