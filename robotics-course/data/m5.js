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
// @@END
