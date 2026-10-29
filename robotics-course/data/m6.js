/* Module 6 · Robot learning, RL, capstone & career (days 141–168). Source: Notion Daily Plan. */

// ───────────── Section 1 · LeRobot, ACT and your first dataset ─────────────
D({
  n: 141, icon: '🧠', topic: 'Robot learning', hours: 2.5, notion: '3f6cdfea8ce28138a4b8e1af95ddc8b9', svg: 'policy',
  title: 'LeRobot: the record-train-deploy loop',
  goal: 'Understand how robots learn from demonstrations, and the LeRobot workflow end to end.',
  tasks: [
    'Read the Month 6 intro and the LeRobot section below',
    'Read the LeRobot docs overview: datasets, policies, robots',
    'Start the Hugging Face Robotics Course: units 0–1 (no hardware needed)',
    'Browse 3 community datasets on the Hub (SO-100/SO-101 tasks). Watch their episode videos',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['Month 6 goal', 'Your goal this month: pick one direction, build a portfolio piece in it, and start applying\nYou now have the whole stack: electronics, embedded, mechanical, ROS 2, control and perception\nThis month has two halves. The first is the frontier, which is teaching robots from demonstrations rather than programming them. The second is turning everything you have built into something that gets you hired'],
    ['1. LeRobot', "LeRobot is Hugging Face's PyTorch library for real-world robotics, and it is the open hub the whole low-cost robot-learning world has converged on\nThe workflow is: teleoperate, record, train, deploy. You drive the robot by hand, demonstrations are saved as synchronised video and action data, a policy learns to imitate them, then it runs on its own"]
  ],
  links: [
    ['LeRobot documentation', 'https://huggingface.co/docs/lerobot/index'],
    ['LeRobot repository', 'https://github.com/huggingface/lerobot'],
    ['Hugging Face Robotics Course', 'https://huggingface.co/learn/robotics-course/unit0/1']
  ],
  video: `
## The final module
@big Teach robots by showing, not by programming
Welcome to Module 6, the last one. The article describes two halves. First, the frontier: teaching robots from demonstrations rather than programming them. Second, turning everything you have built into something that gets you hired.
You now have the whole stack: electronics, embedded, mechanical, ROS 2, control and perception. This month you pick one direction and build a portfolio piece in it.

## Programming versus demonstrating
| Programmed (Modules 1–5) | Learned from demonstrations |
|---|---|
| you write the rules: IK, grasp poses, planners | you show the task; a network imitates it |
| precise, explainable | handles messy, hard-to-model tasks |
| breaks when the world differs from the model | breaks when the world differs from the data |
Until now you programmed every behaviour: IK, planners, controllers. That is precise and explainable, but some tasks, like folding cloth or handling soft objects, are very hard to model.
Learning from demonstration takes the opposite approach: you perform the task a few dozen times, and a neural network learns to imitate you. Both approaches break when the world changes; they just break differently.

## What LeRobot is
- Hugging Face's PyTorch library for real-world robotics
- The open hub the low-cost robot-learning world has converged on
- Datasets, pretrained policies, robot drivers, training scripts
LeRobot is Hugging Face's PyTorch library for real-world robotics. The article calls it the open hub the whole low-cost robot-learning world has converged on, and it supports the SO-101 you built in Module 3.
It gives you three things: a standard dataset format on the Hub, a set of policies such as ACT and Diffusion Policy, and drivers for real robots.

## The loop
@eq teleoperate → record → train → deploy | then look at failures and go round again
The workflow is four steps. Teleoperate: drive the follower arm with the leader arm. Record: each demonstration is saved as synchronised video and joint data. Train: a policy learns to map what it sees to what you did. Deploy: the policy drives the arm on its own.
Then you watch it fail, record more data covering those failures, and go round again. That loop is the whole of this section.

## What a dataset contains
| Per time step | Example |
|---|---|
| observation.images.front | camera frame |
| observation.images.wrist | second camera frame |
| observation.state | the follower's joint angles |
| action | the leader's joint angles = what you commanded |
A LeRobot dataset is a set of episodes, one per demonstration. At each time step it stores the camera images, the robot's current joint angles as state, and the action: the leader arm's joint angles, which is what you commanded.
Training teaches a policy to predict the action from the observations. At deployment, the policy's predicted action replaces your leader arm.

## Today: browse before you record
- HF Robotics Course units 0–1: no hardware needed
- Find three SO-100/SO-101 datasets on the Hub
- Watch their episodes: how varied? how smooth? what would you do differently?
Today needs no hardware. Start the Hugging Face Robotics Course, units zero and one. Then browse the Hub for three community SO-100 or SO-101 datasets and watch their episodes in the visualiser.
Look critically: how much does the object position vary? Are the motions smooth or hesitant? Is the lighting consistent? Note what you would copy and what you would avoid. On Day 4 you record your own.
`,
  key: [
    'Module 6: learn from demonstrations, then get hired.',
    'LeRobot: the open PyTorch hub for low-cost robot learning.',
    'Loop: teleoperate → record → train → deploy → fix with more data.',
    'Datasets store images, state and the leader arm\'s action per time step.'
  ],
  quiz: [
    ['In a LeRobot dataset, what is the "action" when teleoperating?', ['The camera frame', 'The leader arm\'s joint angles (what you commanded)', 'The success label', 'The reward'], 1, 'The policy learns to predict it.'],
    ['What is the correct order of the LeRobot workflow?', ['Train → record → deploy → teleoperate', 'Teleoperate → record → train → deploy', 'Deploy → train → record', 'Record → deploy → train'], 1, 'Then iterate on the failures.']
  ]
});

D({
  n: 142, icon: '🎬', topic: 'Robot learning', hours: 2.5, notion: '3f6cdfea8ce2818b9deae3e710bcd071', svg: 'policy',
  title: 'ACT: why action chunks work',
  goal: 'Understand behaviour cloning and ACT, and train one in simulation.',
  tasks: [
    'HF Robotics Course: the imitation learning units',
    'Read the ACT / ALOHA project page. Write 3 lines: why predicting a chunk of future actions beats one step at a time',
    'Train a small ACT policy on a simulated public dataset (follow the course / LeRobot examples) and evaluate it',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [['What to focus on', 'ACT, which the docs recommend as the starting policy, and why predicting chunks of future actions works better than predicting single steps']],
  links: [
    ['Hugging Face Robotics Course', 'https://huggingface.co/learn/robotics-course/unit0/1'],
    ['LeRobot documentation', 'https://huggingface.co/docs/lerobot/index'],
    ['ACT / ALOHA project page', 'https://tonyzhaozh.github.io/aloha/', 'extra']
  ],
  video: `
## Behaviour cloning
@eq π(observation) → action | supervised learning on (observation, action) pairs
The simplest way to learn from demonstrations is behaviour cloning: treat it as supervised learning. Each time step in your dataset is an example: given this observation, the human did this action. Train a network to predict the action from the observation.
It is the same idea as an image classifier, except the output is joint angles instead of a label. And it works, up to a point.

## Why plain cloning drifts
- The policy makes a small error → the robot ends up somewhere slightly new
- That state was never in the demonstrations → a bigger error
- Errors compound: the classic covariate-shift problem
- Plus: humans pause and hesitate — single-step predictions get confused
Plain behaviour cloning has a well-known weakness. The policy makes a small mistake, so the robot ends up in a state slightly different from any demonstration. There it makes a bigger mistake, and the errors compound until the task fails.
Human demonstrations also contain pauses and hesitations. A policy predicting one step at a time sees the same image followed by different actions, and gets confused, often producing jittery, stalling motion.

## ACT: predict a chunk
@eq π(observation) → [a_t, a_t+1, … , a_t+k] | a whole chunk of future actions at once
ACT, Action Chunking with Transformers, from the ALOHA project, changes one thing: instead of predicting the next action, it predicts a chunk of the next many actions at once, say the next second of motion.
The article notes that the LeRobot docs recommend ACT as the starting policy. Today's focus is why chunks work better than single steps.

## Why chunks work
1. Fewer decisions per task → fewer chances for errors to compound
2. A chunk is a smooth, committed motion → no step-to-step jitter
3. Pauses are absorbed: the chunk captures the whole movement, not one ambiguous step
4. Temporal ensembling: overlapping chunks are averaged for smoothness
Three reasons. First, the policy makes far fewer decisions per task, so errors have fewer chances to compound. Second, a chunk is a coherent, committed motion, so the arm moves smoothly instead of hesitating at every step.
Third, ambiguity from human pauses is absorbed: the chunk describes the whole movement. ACT also predicts overlapping chunks and averages them, called temporal ensembling, for extra smoothness. Write these three lines in your log.

## The architecture, briefly
- Cameras → a CNN backbone (ResNet) → image features
- Features + joint state → a transformer encoder-decoder
- Output: a chunk of k future joint positions
- Trained as a conditional VAE to handle varied demonstrations
Under the hood: camera images go through a convolutional backbone to extract features. Those features, plus the joint state, go into a transformer, which outputs the chunk of future joint positions.
It is trained as a conditional variational autoencoder, which helps it cope with demonstrations that do the same task in slightly different ways. You do not need the details to use it, but know the shape.

## Train one in simulation
\`\`\`bash
lerobot-train \\
  --dataset.repo_id=lerobot/aloha_sim_transfer_cube_human \\
  --policy.type=act \\
  --env.type=aloha --env.task=AlohaTransferCube-v0 \\
  --output_dir=outputs/act_sim --policy.device=cuda
\`\`\`
Today, train a small ACT policy on a public simulated dataset, following the course or LeRobot examples. The exact command changes between versions, so check the docs; the shape is always dataset, policy type, environment and output.
Run it on Colab or your GPU, then evaluate it in simulation and record the success rate in your log. This is a dress rehearsal for training on your own data later this week.
`,
  key: [
    'Behaviour cloning = supervised learning from (observation, action) pairs.',
    'Single-step cloning drifts: errors compound, and pauses cause jitter.',
    'ACT predicts chunks of future actions: fewer decisions, smoother motion.',
    'The LeRobot docs recommend ACT as the starting policy.'
  ],
  quiz: [
    ['What does ACT predict at each decision?', ['One next action', 'A chunk of many future actions', 'A reward', 'A camera image'], 1, 'Action Chunking with Transformers.'],
    ['Why do compounding errors hurt plain behaviour cloning?', ['The network is too small', 'Small mistakes lead to states never seen in the demos, causing bigger mistakes', 'GPUs are slow', 'Datasets are too big'], 1, 'The covariate-shift problem.']
  ]
});

D({
  n: 143, icon: '🌫️', topic: 'Robot learning', hours: 2.5, notion: '3f6cdfea8ce281c39ba8f917102f0542', svg: 'policy',
  title: 'Diffusion Policy + dataset quality',
  goal: 'Know the difference between BC, ACT and Diffusion Policy, and what makes a good demonstration.',
  tasks: [
    'Read the Diffusion Policy project page. Write 3 lines on how it represents the policy',
    'Write a table: behaviour cloning vs ACT vs Diffusion Policy → output, strength, weakness',
    'Write your own demo-quality rules (same start pose, smooth moves, vary object position, consistent lighting, no hesitations)',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['What to focus on', 'Dataset quality, because a policy trained on sloppy demonstrations is a sloppy policy\nDiffusion Policy, which represents the policy as a denoising process and reported a 46.9% average improvement over prior methods across twelve tasks'],
    ['Month 6 Milestone (this one)', 'Explain the difference between behaviour cloning, ACT and diffusion policy']
  ],
  links: [
    ['Diffusion Policy project page', 'https://diffusion-policy.cs.columbia.edu/', 'extra'],
    ['ACT / ALOHA project page', 'https://tonyzhaozh.github.io/aloha/', 'extra']
  ],
  video: `
## The averaging problem
@big Go left or go right around the obstacle — averaging gives "go straight into it"
Before Diffusion Policy, one more weakness. Suppose half your demonstrations go left around an obstacle and half go right. A network trained to predict the single best action learns the average: straight ahead, into the obstacle.
Demonstrations are often multi-modal like this: several valid ways to do the same thing. A policy needs to represent all of them, and pick one.

## Diffusion Policy
@eq start from random noise → denoise step by step, conditioned on the observation → an action sequence
Diffusion Policy borrows the idea behind image generators. Instead of outputting an action directly, it starts from random noise and gradually denoises it into an action sequence, guided by what the cameras see.
Because it learns the whole distribution of demonstrations, different starting noise leads to different valid modes, left or right, but never the average. The article notes it reported a 46.9 percent average improvement over prior methods across twelve tasks.

## The comparison table
| | Behaviour cloning | ACT | Diffusion Policy |
|---|---|---|---|
| output | one action | a chunk of actions | an action sequence, by denoising |
| strength | simple, fast | smooth, data-efficient, LeRobot's default | handles multi-modal demos |
| weakness | drifts, jitters | can average modes | slower inference, more compute |
This table is a Module 6 milestone: explain the difference between behaviour cloning, ACT and diffusion policy. Behaviour cloning predicts one action: simple, but drifts. ACT predicts chunks: smooth and data-efficient, and the recommended starting point.
Diffusion Policy denoises an action sequence: it handles multiple valid strategies, at the cost of slower inference. Write this table in your own words.

## Sloppy demos make a sloppy policy
@big A policy trained on sloppy demonstrations is a sloppy policy
The second focus, and the most practical one: dataset quality. The article is blunt: a policy trained on sloppy demonstrations is a sloppy policy. The network copies everything you do, including hesitations, wobbles and mistakes.
Your choice of algorithm matters less than the quality of your fifty demonstrations. Professionals spend most of their time on data.

## Your demo-quality rules
1. Same start pose every episode
2. Smooth, confident motions; no hesitations or corrections
3. Vary the object position across the whole marked area
4. Consistent lighting and camera placement
5. Same strategy every time (one mode), unless you want variety
6. Discard and re-record any bad episode
Write your own rules before you record. Same start pose every time. Smooth, confident motions, no hesitations. Vary the object position across the whole working area, so the policy learns to generalise.
Keep the lighting and cameras fixed; you know from Module 5 how lighting breaks vision. Use one consistent strategy. And be ruthless: delete and re-record any bad episode.

## Why variety matters
- Cube always in one spot → the policy only works in that spot
- Vary position, and a little orientation, within a defined area
- Coverage beats quantity: 50 varied demos beat 200 identical ones
One subtle point: consistency in how you move, variety in what you face. If the cube is always in exactly the same spot, the policy only works in that spot. Spread the starting positions across the marked area.
Coverage beats quantity. Fifty well-spread demonstrations teach more than two hundred identical ones. Tomorrow you set up recording and capture your first ten.
`,
  key: [
    'Averaging multi-modal demos gives invalid actions.',
    'Diffusion Policy denoises action sequences and handles multiple modes (+46.9% reported).',
    'BC: one action · ACT: chunks · DP: denoised sequences — know their trade-offs.',
    'Sloppy demos → sloppy policy: consistent motion, varied object positions.'
  ],
  quiz: [
    ['Why does Diffusion Policy handle "go left or right" demonstrations well?', ['It ignores one side', 'It models the distribution, so it picks one valid mode instead of averaging', 'It uses LQR', 'It needs fewer cameras'], 1, 'Different noise → different valid modes.'],
    ['Which dataset is likely to train the better policy?', ['200 demos, cube always in one spot', '50 smooth demos with the cube spread across the area', '50 demos with hesitations', '10 demos in varying lighting'], 1, 'Coverage and quality beat quantity.']
  ]
});

D({
  n: 144, icon: '🎥', topic: 'Robot learning', hours: 3, notion: '3f6cdfea8ce2818897fefcc586143d03', svg: 'arm',
  title: 'Set up recording on your SO-101 + first 10 demos',
  goal: 'A working record pipeline (arms + cameras) and 10 clean episodes.',
  tasks: [
    'Re-check ports and calibration (SO-101 guide)',
    'Mount cameras (front + wrist/side). Fix the lighting',
    'Define the task exactly: pick the cube from a marked area, drop it in the bin',
    'Record 10 episodes with the record command. Watch them back in the dataset visualiser',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [['SO-101 setup guide', 'The exact port-finding, motor-setup, calibration and recording commands for the arm you built in month three']],
  links: [['LeRobot SO-101 setup guide', 'https://huggingface.co/docs/lerobot/so101']],
  video: `
## Back to your own arm
@svg arm | the SO-101 you built in Module 3
Today you return to the SO-101 you built in Module 3 and set it up for recording. The LeRobot SO-101 guide has the exact port-finding, motor setup, calibration and recording commands, as the article says.
By the end of today: two arms, two cameras, fixed lighting, a precisely defined task, and ten clean episodes.

## Check ports and calibration
\`\`\`bash
lerobot-find-port                 # unplug/replug to identify each arm
lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=follower
lerobot-calibrate --teleop.type=so101_leader  --teleop.port=/dev/ttyACM1 --teleop.id=leader
lerobot-teleoperate ...           # leader drives follower: check every joint
\`\`\`
Ports change when you replug USB, so find them again. Re-run calibration for both arms if teleoperation feels off; a bad calibration means every demonstration is subtly wrong.
Then teleoperate for a few minutes and check every joint, including the gripper, moves smoothly through its full range. The exact command names change between LeRobot versions; follow the current SO-101 guide.

## Cameras and lighting
- Front camera: sees the whole workspace, fixed rigidly
- Wrist or side camera: close view of the gripper and object
- Lamp on, curtains closed: lighting identical every session
Mount two cameras. A front camera fixed rigidly, seeing the whole workspace. A wrist or side camera giving a close view of the gripper meeting the object; that second view is why it is on the gear list.
Fix the lighting: lamp on, curtains closed, the same every session. If a camera gets bumped between sessions, the policy sees a different world. Tape or clamp everything.

## Define the task exactly
- "Pick the cube from inside the taped square and drop it in the bin"
- Mark the start area and the bin position with tape
- Same start pose for the arm every episode
- An episode ends when the cube lands in the bin
Write the task down precisely, because the policy will learn exactly what you do. Mark the cube's starting area with tape, and fix the bin's position. Decide the arm's start pose and return to it every time.
Decide when an episode ends: when the cube lands in the bin. Precise tasks give clean datasets.

## Record ten episodes
\`\`\`bash
lerobot-record \\
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=follower \\
  --robot.cameras="{front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30}, wrist: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30}}" \\
  --teleop.type=so101_leader --teleop.port=/dev/ttyACM1 --teleop.id=leader \\
  --dataset.repo_id=YOUR_HF_USER/so101_cube_bin \\
  --dataset.single_task="Pick the cube and drop it in the bin" \\
  --dataset.num_episodes=10
\`\`\`
The record command takes the follower, its cameras, the leader, a dataset name on the Hub, a task description and the number of episodes. Between episodes there is a reset period to put the cube back in a new position.
Record ten episodes following yesterday's quality rules. Do not rush; a calm, smooth demonstration is worth three hurried ones.

## Watch them back
- Open the dataset visualiser: every camera, every joint plot
- Are both cameras recording? Are frames in sync with the joint data?
- Any hesitations, drops or bad starts? Note them for re-recording
Watch every episode back in the dataset visualiser. Check both camera streams recorded, that motion is in sync with the joint plots, and that frame rates are steady.
Look for hesitations, drops and bad starts, and note them in your log. Fix any recording problem now, with ten episodes, rather than after fifty.
`,
  key: [
    'Re-find ports and re-check calibration; teleoperate to test every joint.',
    'Two rigidly mounted cameras; lighting identical every session.',
    'Define the task, start area, bin position and start pose precisely.',
    'Record 10 episodes, then watch every one back before scaling up.'
  ],
  quiz: [
    ['Why fix the cameras and lighting rigidly?', ['To save power', 'The policy learns from images; a moved camera or new lighting is a different world', 'LeRobot requires it', 'To speed up training'], 1, 'Consistency between recording and deployment.'],
    ['Why check 10 episodes before recording 50?', ['10 is the minimum', 'Recording problems are cheap to fix early', 'Training needs exactly 10', 'The Hub limits uploads'], 1, 'Catch sync, camera and quality issues early.']
  ]
});

D({
  n: 145, icon: '📦', topic: 'Robot learning', hours: 3, notion: '3f6cdfea8ce281deaf8ce8fa8de43c3b', svg: 'arm',
  title: 'Record 50 demonstrations',
  goal: 'A 50-episode dataset that follows your quality rules.',
  tasks: [
    'Record 50 episodes. Vary the cube position across the marked area',
    'Delete / re-record bad episodes (hesitations, drops)',
    'Push the dataset to the Hugging Face Hub',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [['Practice task (LeRobot)', 'Practice task: record 50 demonstrations of a single simple task on your SO-101, such as picking up a cube and dropping it in a bin, train an ACT policy, and deploy it. It will work maybe half the time. Then record 50 more demonstrations covering the failure cases and retrain. Document the success rate before and after. That number, and the fact that you measured it, is the portfolio piece']],
  links: [['LeRobot SO-101 setup guide', 'https://huggingface.co/docs/lerobot/so101']],
  video: `
## The practice task
@big That number, and the fact that you measured it, is the portfolio piece
This week's practice task: record fifty demonstrations of one simple task, train ACT, deploy it, and measure. The article predicts it will work maybe half the time. Then record fifty more covering the failures, retrain, and document the success rate before and after.
The key line: that number, and the fact that you measured it, is the portfolio piece. Today: the first fifty.

## Plan the cube positions
\`\`\`text
 taped square, 3 x 3 grid of spots
 ┌───┬───┬───┐
 │ 1 │ 2 │ 3 │    ~5-6 demos per spot
 ├───┼───┼───┤    + small random offsets
 │ 4 │ 5 │ 6 │    + a little rotation
 ├───┼───┼───┤
 │ 7 │ 8 │ 9 │
 └───┴───┴───┘
\`\`\`
Don't place the cube randomly by feel; you will unconsciously favour the middle. Draw a three by three grid inside the taped area and cycle through the spots, five or six demonstrations each, with small offsets and a little rotation.
That gives even coverage, which is what lets the policy generalise across the whole area.

## Pace yourself
- 50 episodes ≈ 1.5–2 hours with resets
- Break every 15 episodes: tired demos are sloppy demos
- Keep the same strategy: same approach direction, same grip
Fifty episodes, with resets, take one and a half to two hours. Take a break every fifteen or so; fatigue shows up as hesitation and wobble, and the policy will copy it.
Keep the same strategy throughout: the same approach direction, the same grip, the same drop. Remember the averaging problem: mixing strategies confuses ACT.

## Be ruthless with bad episodes
| Problem | Action |
|---|---|
| hesitation or correction mid-motion | re-record |
| dropped the cube | re-record (unless you want recovery data later) |
| camera blocked by your hand | re-record |
| perfect, smooth, cube in bin | keep |
During recording, LeRobot lets you re-record the current episode if it goes wrong. Use it freely: a hesitation, a correction, a drop, a camera blocked by your arm. Afterwards, review the dataset and remove any bad episodes that slipped through.
Fifty clean episodes beat sixty with ten sloppy ones mixed in.

## Push to the Hub
- Datasets push to the Hub by default (or upload at the end)
- Check the dataset page: episode count, cameras, fps, a preview
- Put the dataset link in your log
Push the dataset to the Hugging Face Hub; by default, recording uploads it at the end. Open the dataset page and check the episode count, the camera streams, the frame rate, and a preview of a few episodes.
Your dataset is now public evidence of your work, and the input to tomorrow's training. Put the link in your log.

## Write down what you notice
- Which spots were awkward to reach?
- Where did you hesitate most?
- These are likely failure points for the policy
As you record, note which cube positions were awkward, and where you hesitated. Those are exactly where the policy is most likely to fail, because the data there is thinnest or messiest.
These notes will help you predict, and then explain, the failures you see on deployment day.
`,
  key: [
    'Practice task: 50 demos → ACT → deploy → measure → 50 more → retrain.',
    'Use a grid of cube positions for even coverage.',
    'Take breaks; keep one strategy; re-record every bad episode.',
    'Push to the Hub; note awkward positions as likely failure points.'
  ],
  quiz: [
    ['According to the article, what is the portfolio piece of the LeRobot task?', ['The trained weights', 'The measured success rate before and after, and the fact you measured it', 'The robot itself', 'The training loss curve'], 1, 'Measured numbers.'],
    ['Why use a grid of cube positions instead of placing it by feel?', ['It is faster', 'Even coverage of the area; by feel you favour the middle', 'LeRobot requires a grid', 'It improves lighting'], 1, 'Coverage drives generalisation.']
  ]
});

D({
  n: 146, icon: '🏋️', topic: 'Robot learning', hours: 2.5, notion: '3f6cdfea8ce281ab8518c9e0c8ad1bc6', svg: 'policy',
  title: 'Train ACT on your dataset',
  goal: 'An ACT policy trained on your own data.',
  tasks: [
    'Start ACT training (Colab or cloud GPU) using the LeRobot train command',
    'Log to Weights & Biases or the console. Watch the loss',
    'While it trains: write the dataset section of your README (task, cameras, 50 episodes, quality rules)',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [['What to focus on', 'The record-train-deploy loop end to end, on your own arm']],
  links: [['LeRobot documentation (training)', 'https://huggingface.co/docs/lerobot/index']],
  video: `
## Training on your own data
@eq your 50 demos → ACT → a policy that drives your arm
Today you train ACT on your own fifty demonstrations. The article's focus for the week is the record-train-deploy loop end to end, on your own arm, and this is the middle step.
Training runs on a GPU: Colab, a cloud GPU, or your own if you have one. It takes a few hours, so start it early and work on the README while it runs.

## The train command
\`\`\`bash
lerobot-train \\
  --dataset.repo_id=YOUR_HF_USER/so101_cube_bin \\
  --policy.type=act \\
  --output_dir=outputs/train/act_so101_cube \\
  --job_name=act_so101_cube \\
  --policy.device=cuda \\
  --wandb.enable=true
\`\`\`
The command names your dataset on the Hub, the policy type, an output folder, the device, and optionally Weights and Biases logging. Check the current LeRobot docs for the exact flags.
On Colab, install LeRobot, log in to Hugging Face, and run the same command. Save checkpoints to Drive or the Hub, because Colab sessions can disconnect.

## Watching the loss
- Loss should fall quickly, then flatten
- Not falling at all → check the dataset loaded, learning rate, device
- Training loss alone does not tell you success rate
Watch the loss in Weights and Biases or the console. It should drop quickly in the first few thousand steps, then flatten out. If it does not fall at all, check the dataset actually loaded, the device is the GPU, and nothing else is misconfigured.
But a low training loss does not mean the policy works. Only deploying it on the real arm, and counting successes, tells you that. That is the next section.

## How long to train
| Signal | Meaning |
|---|---|
| loss still falling steeply | keep training |
| loss flat for a long time | more steps rarely help; more data does |
| checkpoints saved regularly | you can test several later |
How long? Use the default number of steps from the docs as a starting point. Once the loss has been flat for a long time, more steps rarely help; more or better data usually does.
Make sure checkpoints are saved regularly. Later you may find an earlier checkpoint works better on the real robot than the last one.

## Write the dataset section while it trains
\`\`\`text
## Dataset
- Task: pick the cube from a taped 15 x 15 cm square, drop it in the bin
- Robot: SO-101 follower, teleoperated with the leader arm
- Cameras: front (640x480, 30 fps) + wrist (640x480, 30 fps)
- Episodes: 50, cube on a 3x3 grid with small offsets
- Quality rules: same start pose, one strategy, re-recorded hesitations
- Link: huggingface.co/datasets/YOUR_HF_USER/so101_cube_bin
\`\`\`
While it trains, write the dataset section of the project README: the task, the robot, the cameras, the number of episodes and how positions were chosen, your quality rules, and the Hub link.
This is the part most people skip, and it is what makes your results reproducible and credible. Log the training time and GPU you used.
`,
  key: [
    'Train ACT on your dataset with the LeRobot train command on a GPU.',
    'Loss should fall then flatten; a low loss is not a success rate.',
    'Save checkpoints regularly; an earlier one may deploy better.',
    'Write the dataset section of the README while training runs.'
  ],
  quiz: [
    ['The training loss is very low. Does the policy work?', ['Yes, definitely', 'Not necessarily: only deploying and counting successes tells you', 'Only if trained on Colab', 'Yes, if above 50 episodes'], 1, 'Measure on the real robot.'],
    ['The loss has been flat for a long time. What usually helps more than more steps?', ['A bigger monitor', 'More or better data', 'A lower frame rate', 'Turning off the GPU'], 1, 'Data quality and coverage.']
  ]
});

D({
  n: 147, icon: '🔁', topic: 'Review', hours: 2, notion: '3f6cdfea8ce2813c98a0d8545718e73f', svg: 'policy',
  title: 'Week 1 review + catch-up',
  goal: 'Catch up while training finishes.',
  tasks: [
    'Finish unfinished tasks from M6 Days 1–6',
    'Continue the HF Robotics Course units you skipped',
    'Update Confidence on Days 1–6'
  ],
  links: [['Hugging Face Robotics Course', 'https://huggingface.co/learn/robotics-course/unit0/1']],
  video: `
## The week in one table
| Idea | One line |
|---|---|
| learning from demos | show the task; a network imitates it |
| LeRobot loop | teleoperate → record → train → deploy |
| behaviour cloning | one action per step; drifts and jitters |
| ACT | chunks of actions; smooth, the recommended start |
| Diffusion Policy | denoised sequences; handles multiple strategies |
| dataset quality | sloppy demos → sloppy policy; coverage beats quantity |
Review day, while training finishes. Here is the week compressed: the idea of learning from demonstrations, the LeRobot loop, three policy types, and the overriding importance of dataset quality.
Explain the three policy types out loud, without notes. That is a Module 6 milestone item.

## Check your progress
- Dataset: 50 clean episodes on the Hub?
- Training: running or finished, checkpoints saved?
- README: dataset section written?
Check where you are. Fifty clean episodes on the Hub. Training finished or still running, with checkpoints saved somewhere that will survive a disconnected session. And the dataset section of the README written.
If recording took longer than planned, that is normal; finish it today.

## Prepare for deployment
- Same cameras, same positions, same lighting as recording
- A score sheet: 20 trials, cube positions from your grid
- Success = cube in the bin; note how each failure happened
Next section starts with deployment, so prepare now. Leave the cameras, lighting and bin exactly as they were during recording.
Make a score sheet: twenty trials, with cube positions taken from your grid, and columns for success and how each failure happened. Measuring well is the whole point of this practice task.

## Next section
@svg policy | deploy, measure, iterate — then vision-language-action models
Next section: deploy ACT and measure its success rate, record fifty more demonstrations covering the failure cases, retrain and measure again. Then the frontier: vision-language-action models, and fine-tuning SmolVLA on your own data.
Continue any skipped Robotics Course units, and update your Confidence ratings.
`,
  key: [
    'Explain BC vs ACT vs Diffusion Policy without notes.',
    '50 clean episodes on the Hub, training running, README dataset section done.',
    'Keep the recording setup unchanged for deployment.',
    'Prepare a 20-trial score sheet before deploying.'
  ],
  quiz: [
    ['Before deploying, what must stay the same as during recording?', ['Nothing', 'Cameras, lighting and workspace layout', 'Only the bin', 'Only the leader arm'], 1, 'The policy expects the world it was trained in.'],
    ['Which policy type predicts chunks of future actions?', ['Behaviour cloning', 'ACT', 'Diffusion Policy', 'LQR'], 1, 'Action Chunking with Transformers.']
  ]
});
// @@END
