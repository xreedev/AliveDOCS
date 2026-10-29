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

// ───────────── Section 2 · Deploy, iterate and VLAs ─────────────
D({
  n: 148, icon: '🧪', topic: 'Robot learning', hours: 3, notion: '3f6cdfea8ce2817caec2f670017876fc', svg: 'arm',
  title: 'Deploy ACT + measure success rate',
  goal: 'The "before" number.',
  tasks: [
    'Run the policy on the arm (LeRobot eval/record with policy). Stand by to stop it',
    '20 trials with the cube in varied positions. Count successes',
    'Write down each failure type (missed grasp, wrong position, drop, freeze)',
    'Film 3 successes and 3 failures',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [['Practice task (LeRobot)', 'It will work maybe half the time']],
  links: [['LeRobot SO-101 setup guide', 'https://huggingface.co/docs/lerobot/so101']],
  video: `
## The moment of truth
@big It will work maybe half the time
Today your trained policy drives the arm on its own for the first time. The article sets expectations honestly: it will work maybe half the time. That is normal, and it is the point.
Your job is not to be disappointed, but to measure precisely: the before number, and exactly how it fails.

## Run the policy
\`\`\`bash
lerobot-record \\
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=follower \\
  --robot.cameras="{front: {...}, wrist: {...}}" \\
  --policy.path=outputs/train/act_so101_cube/checkpoints/last/pretrained_model \\
  --dataset.repo_id=YOUR_HF_USER/eval_so101_cube_bin \\
  --dataset.single_task="Pick the cube and drop it in the bin" \\
  --dataset.num_episodes=20
\`\`\`
In LeRobot, you run a policy with the record command, pointing at a trained checkpoint instead of a leader arm. It drives the follower and records evaluation episodes, so every trial is saved for later analysis.
Use the same camera settings as during recording. Check the docs for the exact current flags.

## Safety first
- One hand near the power switch or the stop key
- Start with the cube in an easy, central position
- If the arm pushes hard against the table or itself: stop immediately
A learned policy can do unexpected things: drive into the table, squeeze too hard, or move fast toward somewhere it should not. Keep one hand near the power or stop key for every trial.
Start with an easy central cube position to confirm it basically works, then begin the twenty measured trials.

## Twenty trials, one protocol
| Trial | Cube spot (grid) | Success? | Failure type |
|---|---|---|---|
| 1 | 5 | ✔ | — |
| 2 | 1 | ✘ | missed grasp |
| 3 | 9 | ✘ | froze above bin |
| … | | | |
Run twenty trials, taking cube positions from your grid so every area is tested, and fill in the score sheet. Success means the cube ends up in the bin, nothing less.
Use exactly the same protocol you will use after retraining: same positions, same order, same success rule. Only then is the before-and-after comparison fair.

## Classify the failures
- Missed grasp: gripper closes beside the cube
- Wrong position: goes to where the cube usually is, not where it is
- Drop: grasps, then loses the cube while carrying
- Freeze or hesitate: stops, jitters, or loops
For every failure, write down its type. Missed grasps. Wrong position, where the arm goes to where the cube usually was rather than where it is: a sign of poor coverage. Drops during carrying. And freezes or hesitations.
Count each type. Then look at which grid spots failed most. Compare with the awkward positions you noted while recording; they often match.

## Film the evidence
- Three successes and three failures, one of each failure type if possible
- Keep the clips short; you will cut them into the README video
Film three successes and three failures, ideally one of each common failure type. Short clips are fine; you will edit them into the project video later.
Log the success rate out of twenty, and the failure counts. Tomorrow you record data designed to fix exactly these failures.
`,
  key: [
    'Run the policy via LeRobot record with a checkpoint; save eval episodes.',
    'Safety: hand on the stop, start easy, stop on hard contact.',
    '20 trials, fixed protocol and positions; success = cube in bin.',
    'Classify failures (missed grasp, wrong position, drop, freeze) and map them to grid spots.'
  ],
  quiz: [
    ['Why use exactly the same protocol before and after retraining?', ['It is faster', 'So the before/after comparison is fair', 'LeRobot requires it', 'To save disk space'], 1, 'Only the policy should change.'],
    ['The arm goes to where the cube usually is, not where it actually is. What does that suggest?', ['A broken servo', 'Poor coverage of positions in the dataset', 'Too much lighting', 'A wrong USB port'], 1, 'It memorised rather than generalised.']
  ]
});

D({
  n: 149, icon: '➕', topic: 'Robot learning', hours: 3, notion: '3f6cdfea8ce28145a477f503fdf01db0', svg: 'arm',
  title: 'Record 50 more demos covering failures',
  goal: 'Targeted data that fixes the failures you measured.',
  tasks: [
    'For each failure type, plan demos that cover it (e.g. cube near the edge, rotated cube, recovery after a miss)',
    'Record 50 more episodes. Push the merged dataset',
    'Start retraining',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [['Practice task (LeRobot)', 'Then record 50 more demonstrations covering the failure cases and retrain']],
  links: [['LeRobot documentation', 'https://huggingface.co/docs/lerobot/index']],
  video: `
## Data is the fix
@big Don't tune the network — fix the data
When a learned policy fails, the instinct is to tweak the network or training settings. Usually, the fix is data. The policy fails where its demonstrations were thin, inconsistent, or missing.
The article's instruction: record fifty more demonstrations covering the failure cases, then retrain. Today you design those fifty from yesterday's failure log.

## Map failures to demonstrations
| Failure from Day 8 | Targeted demonstrations |
|---|---|
| fails at edge spots (1, 3, 7, 9) | extra demos at the corners and edges |
| missed grasp on rotated cube | demos with the cube rotated 20–45° |
| drop while carrying | slower, firmer grasps; centred grip |
| freeze after a miss | recovery demos: miss, re-approach, grasp |
Turn each failure type into a recording plan. If edge positions failed, record extra demonstrations at the edges. If rotated cubes caused missed grasps, record rotated cubes. If the arm drops the cube, record slower, firmer, more centred grasps.
If it freezes after a miss, record recovery demonstrations: deliberately miss slightly, then re-approach and succeed. The policy has never seen recovery unless you show it.

## Keep everything else the same
- Same cameras, positions, lighting, start pose, bin
- Same overall strategy, so new data agrees with old
- Proportion: roughly match failure counts — more demos where it failed most
New data must agree with old data. Keep the cameras, lighting, start pose and bin exactly the same, and use the same strategy. Otherwise you create the averaging problem from Day 3.
Weight the new demonstrations by the failure counts: if half the failures were edge positions, spend about half the new demos there.

## Record and merge
- Record 50 more episodes into a new dataset, or append to the existing one
- Merge into one 100-episode dataset (LeRobot has dataset tools for this)
- Check the merged dataset in the visualiser and push it
Record the fifty episodes, either appending to your dataset or into a second one that you merge with the first. LeRobot includes tools for merging and editing datasets; check the docs for the current command.
Open the merged dataset in the visualiser: one hundred episodes, both cameras, consistent frame rates. Push it to the Hub.

## Retrain
- Same policy type (ACT), same settings as last time
- Only the data changes — a controlled experiment
- Start it now; it runs overnight or while you work
Start retraining with exactly the same policy type and settings as before. Only the data changes. That makes your before and after a controlled experiment: any improvement is due to the targeted data.
Start it now, so it finishes in time for tomorrow's measurements. Log which failure cases you covered and how many demos each.

## Should you keep the first 50?
- Yes: they are good data for the common case
- Remove only episodes you now know are bad (hesitations you missed)
- Never delete data just because the policy failed there — that is where you need more
A common question: should you throw away the first fifty? No. They are good demonstrations of the common case, and the new fifty build on them. Remove only episodes you now recognise as genuinely bad, like a hesitation you missed earlier.
Never delete data because the policy failed in that area. Failure areas are exactly where you need more data, not less. Write down how many episodes you kept and removed.
`,
  key: [
    'Fix failures with targeted data, not network tweaks.',
    'Map each failure type to specific demos, including recovery demos.',
    'Keep setup and strategy identical; weight new demos by failure counts.',
    'Merge to 100 episodes and retrain with the same settings.'
  ],
  quiz: [
    ['The policy freezes after a missed grasp. Which demos help?', ['More perfect demos', 'Recovery demos: miss slightly, re-approach, succeed', 'Faster demos', 'Demos in new lighting'], 1, 'It has never seen recovery unless shown.'],
    ['Why retrain with exactly the same settings?', ['It is the default', 'So any improvement is due to the new data (a controlled experiment)', 'To use less GPU', 'LeRobot forbids changes'], 1, 'Change one thing at a time.']
  ]
});

D({
  n: 150, icon: '📈', topic: 'Robot learning', hours: 3, notion: '3f6cdfea8ce2817d81ade22f12c7cfed', svg: 'policy',
  title: 'Retrain, re-measure, document before/after',
  goal: 'The portfolio piece — a measured improvement.',
  tasks: [
    'Deploy the retrained policy. 20 trials, same protocol as Day 8',
    'README for `month-6/so101-act/`: task, dataset links, training setup, before/after success rate, failure analysis, videos',
    'Tick Practice task done. Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['Practice task (LeRobot)', 'Document the success rate before and after. That number, and the fact that you measured it, is the portfolio piece'],
    ['Month 6 Milestone (this one)', 'Record a demonstration dataset and train a policy that runs on your own hardware']
  ],
  links: [['LeRobot repository', 'https://github.com/huggingface/lerobot']],
  video: `
## The "after" number
@eq before: x / 20 → after: y / 20 | same protocol, same positions, same success rule
Today you deploy the retrained policy and run the same twenty-trial protocol as Day 8: same grid positions, same order, same success rule. The result is the after number.
This is a Module 6 milestone: record a demonstration dataset and train a policy that runs on your own hardware. And it is the portfolio piece the article describes.

## Compare failure by failure
| Failure type | Before | After |
|---|---|---|
| missed grasp | | |
| wrong position | | |
| drop | | |
| freeze | | |
| **total successes** | **/20** | **/20** |
Do not stop at the total. Compare each failure type before and after. Did the edge positions improve, because you added edge demos? Did recovery demos stop the freezing?
If a failure type did not improve, that is an honest and interesting result: write down your hypothesis why. Maybe the demos were too few, or inconsistent.

## Is the difference real?
- 20 trials is small: 10/20 vs 12/20 could be chance
- 10/20 → 16/20 is a convincing jump
- Report the raw numbers; do not overclaim
With twenty trials, small differences can be luck. Going from ten to twelve successes might not mean much; going from ten to sixteen almost certainly does.
Report raw counts, like 10 out of 20 to 16 out of 20, rather than just percentages, and do not overclaim. Honesty about the uncertainty is itself a signal of engineering maturity.

## The README
\`\`\`text
month-6/so101-act/README.md
  [video: success + failure, 60 s]
  Result: 10/20 → 16/20 after 50 targeted demos
  Task · Hardware · Cameras
  Datasets: links (first 50, merged 100)
  Training: ACT, steps, GPU, time
  Evaluation protocol: 20 trials, 3x3 grid, success = cube in bin
  Failure analysis: table before/after + what the new demos targeted
  What I would do next
\`\`\`
Structure the README around the result. A short video first. Then one line with the headline number. Then the task, hardware, datasets with links, training setup, the evaluation protocol, the failure analysis table, and what you would do next.
The evaluation protocol section is what makes it credible: anyone could repeat your measurement.

## Why this impresses
- Most hobby projects show one lucky success video
- You show a measured baseline, a diagnosis, a targeted fix, and a measured improvement
- That is exactly the robot-learning engineer's daily loop
Most hobby robot-learning projects show a single lucky video. Yours shows a measured baseline, a diagnosis of the failures, a targeted data fix, and a measured improvement.
That is exactly what a robot-learning engineer does every day. Tick the practice task: this is your strongest portfolio piece so far.

## Edit the video
- 60 seconds: before failures → the targeted demos → after successes
- Caption each clip: "before: misses edge cubes", "after: 16/20"
- Upload, embed a GIF at the top of the README, link the full video
Cut a sixty-second video that tells the story in order: failures from the first policy, a few seconds of the targeted recording, then successes from the retrained policy, with the numbers on screen.
Caption every clip so it works with the sound off. Put a short GIF at the top of the README and link the full video. Share it later this module, when you post your work.
`,
  key: [
    'Re-run the identical 20-trial protocol for the "after" number.',
    'Compare failure types, not only totals; explain what did not improve.',
    'Small samples: report raw counts and avoid overclaiming.',
    'README: video, headline number, datasets, protocol, failure analysis.'
  ],
  quiz: [
    ['Success goes from 10/20 to 11/20. What should you conclude?', ['A big improvement', 'The difference may be chance with 20 trials', 'The policy is broken', 'Retraining always helps'], 1, 'Report raw numbers honestly.'],
    ['Which README section makes the result repeatable by others?', ['The video', 'The evaluation protocol', 'The licence', 'The title'], 1, 'Positions, trials and the success rule.']
  ]
});

D({
  n: 151, icon: '🗣️', topic: 'Robot learning', hours: 2.5, notion: '3f6cdfea8ce2812f9ea8fdc0028871cd', svg: 'policy',
  title: 'Vision-language-action models: the landscape',
  goal: 'Know which robot foundation models exist, which you can actually run, and which have open weights.',
  tasks: [
    'Read each VLA entry below and open its repo/page',
    'Make a table: model → size → weights open? → licence → hardware needed → good for SO-101?',
    'Read the RT-2 project page (no public weights, but historically important)',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['2. Vision-language-action models', 'These are the foundation models of robotics, and knowing which ones you can actually run matters\nπ₀, π₀-FAST and π₀.₅ from Physical Intelligence, Apache 2.0, weights open, pretrained on 10,000+ hours of robot data. The repo warns honestly that these were developed for their own robots and transfer is not guaranteed\nOpenVLA, 7B parameters, fully open, trained on 970,000 robot episodes from Open X-Embodiment, and the best-documented open VLA to read the code of\nGR00T N1.7 from NVIDIA, code Apache 2.0 with weights under the NVIDIA Open Model License, which is a distinction often reported wrongly. Needs 16GB+ VRAM for inference\nSmolVLA from Hugging Face, compact and designed for affordable hardware, which is the right one to fine-tune on an SO-101 rather than reaching for a 7B model\nRT-2 from Google DeepMind is historically important and has no public weights, so study the paper and use one of the above for practice'],
    ['Month 6 Milestone (this one)', 'Name which VLA models have open weights and which do not']
  ],
  links: [
    ['openpi (π₀ family)', 'https://github.com/Physical-Intelligence/openpi'],
    ['OpenVLA', 'https://openvla.github.io/'],
    ['Isaac GR00T', 'https://github.com/Nvidia/Isaac-GR00T'],
    ['SmolVLA base', 'https://huggingface.co/lerobot/smolvla_base'],
    ['RT-2 project page', 'https://robotics-transformer2.github.io/', 'extra']
  ],
  video: `
## Foundation models for robots
@eq camera images + a language instruction → robot actions | vision-language-action (VLA)
ACT learns one task from your demonstrations. Vision-language-action models aim for something bigger: one model, pretrained on huge amounts of robot data, that takes camera images and a language instruction, like "put the cube in the bin", and outputs actions.
The article calls them the foundation models of robotics, and stresses that knowing which ones you can actually run matters. Today is a landscape survey.

## The π₀ family
- π₀, π₀-FAST, π₀.₅ from Physical Intelligence
- Apache 2.0, weights open
- Pretrained on 10,000+ hours of robot data
- Honest warning: built for their robots; transfer not guaranteed
First, the π zero family from Physical Intelligence: pi zero, pi zero FAST and pi zero point five. Apache 2.0, with open weights, pretrained on over ten thousand hours of robot data.
The article highlights the repo's honest warning: these were developed for their own robots, and transfer to yours is not guaranteed. Open weights do not mean plug and play.

## OpenVLA and GR00T
| Model | Openness | Notes |
|---|---|---|
| OpenVLA | fully open, 7B params | 970,000 episodes from Open X-Embodiment; best-documented code |
| GR00T N1.7 | code Apache 2.0; weights NVIDIA Open Model License | needs 16 GB+ VRAM for inference |
OpenVLA: seven billion parameters, fully open, trained on 970 thousand robot episodes from the Open X-Embodiment dataset. The article recommends it as the best-documented open VLA to read the code of.
GR00T N1.7 from NVIDIA: the code is Apache 2.0, but the weights are under the NVIDIA Open Model License, a distinction the article says is often reported wrongly. It needs sixteen gigabytes or more of GPU memory just to run.

## SmolVLA and RT-2
- SmolVLA (Hugging Face): compact, built for affordable hardware → the one to fine-tune on an SO-101
- RT-2 (Google DeepMind): historically important, no public weights → read the paper only
SmolVLA from Hugging Face is compact and designed for affordable hardware. The article says it is the right one to fine-tune on an SO-101, rather than reaching for a seven billion parameter model. You do that tomorrow.
RT-2 from Google DeepMind is historically important, showing that web-scale vision-language knowledge transfers to robot control, but it has no public weights. Study the paper; practise with the others.

## Open weights: who has them?
| Model | Weights open? |
|---|---|
| π₀ / π₀-FAST / π₀.₅ | yes (Apache 2.0) |
| OpenVLA | yes |
| GR00T N1.7 | yes, under the NVIDIA Open Model License (not Apache) |
| SmolVLA | yes |
| RT-2 | no |
This table is a Module 6 milestone: name which VLA models have open weights and which do not. Pi zero family, OpenVLA and SmolVLA: yes. GR00T: yes, but under NVIDIA's own licence, not Apache. RT-2: no.
Learn it well enough to say it in an interview without hesitating; licence details are exactly what separates careful engineers from headline readers.

## Build your own table
- Columns: model · size · weights open? · licence · hardware needed · good for SO-101?
- Fill it from each repo or model card, not from memory
- Add a "date checked": this field changes monthly
Make your own table today with six columns: model, size, open weights, licence, hardware needed, and whether it suits your SO-101. Fill it from each repo or model card, not from memory or news articles.
Add the date you checked. This field moves fast: new versions appear monthly, and licences sometimes change.
`,
  key: [
    'VLAs map camera images + a language instruction to actions.',
    'π₀ family: Apache 2.0, open weights, but transfer not guaranteed.',
    'OpenVLA fully open (7B); GR00T code Apache, weights NVIDIA licence, 16 GB+ VRAM.',
    'SmolVLA is the one to fine-tune on an SO-101; RT-2 has no public weights.'
  ],
  quiz: [
    ['Which of these has no public weights?', ['OpenVLA', 'SmolVLA', 'RT-2', 'π₀'], 2, 'Study the RT-2 paper; practise with the others.'],
    ['Under what licence are GR00T N1.7 weights released?', ['Apache 2.0', 'NVIDIA Open Model License', 'MIT', 'GPL'], 1, 'The code is Apache 2.0; the weights are not.']
  ]
});

D({
  n: 152, icon: '🧪', topic: 'Robot learning', hours: 3, notion: '3f6cdfea8ce2812aa9b8e4a60cba08da', svg: 'policy',
  title: 'Fine-tune SmolVLA on your dataset',
  goal: 'Fine-tune a small VLA on your own 100 episodes.',
  tasks: [
    'Follow the LeRobot SmolVLA fine-tuning instructions with your merged dataset and a language instruction ("pick the cube and put it in the bin")',
    'Run training on a GPU (this needs more memory than ACT — use a bigger cloud GPU if needed)',
    'If no GPU budget: skip training, write what you would do, and mark the day Skipped honestly',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [['SmolVLA', 'SmolVLA from Hugging Face, compact and designed for affordable hardware, which is the right one to fine-tune on an SO-101 rather than reaching for a 7B model']],
  links: [
    ['SmolVLA base model', 'https://huggingface.co/lerobot/smolvla_base'],
    ['LeRobot documentation', 'https://huggingface.co/docs/lerobot/index']
  ],
  video: `
## Pretraining, then fine-tuning
@eq pretrained on many robots and tasks → fine-tuned on your 100 episodes → your task
ACT started from scratch on your data. SmolVLA starts from a model already pretrained on many robot datasets, then you fine-tune it on your hundred episodes. That is the same recipe as fine-tuning a language model.
The hope is that general knowledge from pretraining helps it generalise better from your limited data: new positions, maybe new objects.

## Why SmolVLA, not a 7B model
- Compact: fine-tunes on a single rented GPU in hours
- Built with LeRobot, for SO-100/SO-101-class robots
- A 7B model needs far more memory and money for the same task
The article is clear: SmolVLA is the right one to fine-tune on an SO-101, rather than reaching for a seven billion parameter model. It is compact enough to fine-tune on one rented GPU in hours.
It was built by the LeRobot team, and its pretraining data includes community datasets from arms like yours. Bigger is not better when it does not fit your budget.

## The fine-tune command
\`\`\`bash
lerobot-train \\
  --policy.path=lerobot/smolvla_base \\
  --dataset.repo_id=YOUR_HF_USER/so101_cube_bin_merged \\
  --batch_size=64 --steps=20000 \\
  --output_dir=outputs/train/smolvla_so101_cube \\
  --job_name=smolvla_so101_cube \\
  --policy.device=cuda --wandb.enable=true
\`\`\`
The command looks like ACT's, with one difference: instead of a policy type, you give a policy path, the pretrained SmolVLA base model on the Hub. Your dataset's task description becomes the language instruction.
Follow the current LeRobot SmolVLA instructions for the exact flags and recommended steps; they evolve.

## GPU and budget
| Option | Notes |
|---|---|
| Colab free | may be too small or time out |
| Colab Pro / cloud GPU (A100, L4, etc.) | comfortable; a few hours |
| no budget | skip honestly: write the plan, mark Skipped |
SmolVLA needs more GPU memory than ACT. Free Colab may be too small or disconnect. A rented cloud GPU for a few hours is usually enough and costs little.
If you have no GPU budget, the plan says to skip training honestly: write exactly what you would do, mark the day Skipped, and move on. An honest Skipped beats a faked result.

## While it trains
- Watch the loss: it should start lower than ACT's, thanks to pretraining
- Save checkpoints to the Hub
- Prepare tomorrow's comparison: same 20-trial protocol, plus a generalisation test
While it trains, watch the loss. Starting from pretrained weights, it typically begins lower and converges faster than training from scratch. Save checkpoints to the Hub so a disconnect does not lose them.
Prepare tomorrow's comparison: the same twenty-trial protocol you used for ACT, plus one generalisation test, a new object colour or a new position. Log the GPU and training time.
`,
  key: [
    'SmolVLA: pretrained on many robots, fine-tuned on your 100 episodes.',
    'Compact enough for one rented GPU — the right choice for an SO-101.',
    'Fine-tune with --policy.path=lerobot/smolvla_base; the task text is the instruction.',
    'No GPU budget? Skip honestly and write the plan.'
  ],
  quiz: [
    ['How does fine-tuning SmolVLA differ from training ACT here?', ['It uses no data', 'It starts from a pretrained model instead of from scratch', 'It needs no GPU', 'It ignores cameras'], 1, 'Pretraining, then fine-tuning.'],
    ['Why fine-tune SmolVLA rather than a 7B VLA on an SO-101?', ['SmolVLA is newer', 'It is compact and affordable to fine-tune; 7B needs far more resources', '7B models cannot control arms', 'SmolVLA has no licence'], 1, 'Fit the model to your hardware and budget.']
  ]
});

D({
  n: 153, icon: '⚖️', topic: 'Robot learning', hours: 2.5, notion: '3f6cdfea8ce281b5a48dd3ce1699ec02', svg: 'policy',
  title: 'Evaluate SmolVLA vs ACT',
  goal: 'A fair comparison of two policies on the same task.',
  tasks: [
    'Run SmolVLA: 20 trials, same protocol as ACT',
    'Add a column to your README table: ACT before / ACT after / SmolVLA',
    'Try one generalisation test: a new object colour or a new start position. Which policy copes better?',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [['Direction 1', 'This is the highest-paid track and also the most competitive, and it is where a real dataset you collected yourself is worth more than any credential']],
  links: [['LeRobot repository', 'https://github.com/huggingface/lerobot']],
  video: `
## A fair fight
| | ACT before | ACT after | SmolVLA |
|---|---|---|---|
| data | 50 eps | 100 eps | 100 eps (+ pretraining) |
| successes / 20 | | | |
| new-colour test / 5 | | | |
Today you run SmolVLA through exactly the same twenty-trial protocol as ACT, and add it as a third column in your results table: ACT before, ACT after, SmolVLA.
Same positions, same order, same success rule, same cameras and lighting. Only then can you say anything about which policy is better.

## Run the twenty trials
- Same command as ACT, pointing at the SmolVLA checkpoint
- Same safety rules: hand on the stop
- Note the speed: VLA inference is slower; does the arm move differently?
Run SmolVLA with the same record command, pointing at its checkpoint. Keep a hand on the stop, as always.
Note the behaviour, not just success: VLA inference is slower than ACT, so motion may be more halting or less smooth. Classify failures with the same categories as before.

## The generalisation test
- Swap the cube for a different colour, or start it outside the training area
- 5 trials each policy
- Which copes better — and does pretraining seem to help?
Then a generalisation test: something neither policy saw in your data. A different-coloured cube, or a start position just outside the taped area. Five trials for each policy.
This is where pretraining is supposed to help: SmolVLA has seen many objects and scenes. Does it cope better than ACT? Whatever the answer, it is an interesting result.

## Interpreting honestly
- SmolVLA might win, lose or tie — all are fine results
- Small samples: avoid strong claims from 1–2 trial differences
- Explain why, with evidence from failure types and videos
Do not assume the bigger model wins. On a narrow task with good data, ACT is often as good or better, and faster. SmolVLA may shine only on the generalisation test, or not at all.
All outcomes are fine, as long as you report them honestly and explain them with evidence from failure types and videos. Small samples mean modest claims.

## Why this matters for your career
@big A real dataset you collected yourself is worth more than any credential
The article on the robot-learning direction: it is the highest-paid track and the most competitive, and it is where a real dataset you collected yourself is worth more than any credential.
You now have exactly that: your own dataset on the Hub, a measured improvement from targeted data, and a comparison of two policy families. Update the README table and log both results.
`,
  key: [
    'Same 20-trial protocol for SmolVLA; add it as a third results column.',
    'Add a generalisation test: a new colour or position, 5 trials each.',
    'The bigger model does not automatically win; report honestly.',
    'Your own dataset beats any credential on the robot-learning track.'
  ],
  quiz: [
    ['Where is pretraining most likely to help SmolVLA over ACT?', ['On the exact training positions', 'On generalisation tests like a new object colour', 'In inference speed', 'In recording'], 1, 'It has seen many objects and scenes.'],
    ['ACT beats SmolVLA on your task. What do you report?', ['Hide it', 'The numbers honestly, with an explanation', 'Retrain until SmolVLA wins', 'Only the SmolVLA videos'], 1, 'Every honest result is a good result.']
  ]
});

D({
  n: 154, icon: '🔁', topic: 'Review', hours: 2, notion: '3f6cdfea8ce281cba247f0bd6ae89ad2', svg: 'policy',
  title: 'Week 2 review + catch-up',
  goal: 'Finish the robot-learning project write-up.',
  tasks: [
    'Finish unfinished tasks from M6 Days 8–13',
    'Make sure the `month-6/so101-act/` README has video, numbers and a failure analysis',
    'Update Confidence on Days 8–13'
  ],
  links: [['LeRobot documentation', 'https://huggingface.co/docs/lerobot/index']],
  video: `
## The README checklist
- A 60-second video at the top: successes and failures
- Headline: ACT 10/20 → 16/20 after targeted demos; SmolVLA x/20
- Datasets linked; training setup; evaluation protocol
- Failure analysis table; generalisation test; what next
Review day: finish the robot-learning write-up, your strongest portfolio piece. Check the README against this list: a short video at the top, the headline numbers, linked datasets, the training setup, the evaluation protocol, the failure analysis, the generalisation test, and what you would do next.
Anything missing, add today.

## The week in one table
| Idea | One line |
|---|---|
| deploy and measure | 20 trials, fixed protocol, classify failures |
| targeted data | record demos for each failure type, incl. recovery |
| before/after | same settings, only data changes; raw counts |
| VLAs | images + language → actions; know which have open weights |
| SmolVLA | compact VLA to fine-tune on an SO-101 |
| fair comparison | same protocol; honest, modest claims |
Here is the week compressed: deploying and measuring, targeted data, controlled before and after, the VLA landscape, fine-tuning SmolVLA, and fair comparison.
The common thread is measurement. Every claim in your README should trace back to a trial you ran.

## Say it in two minutes
- What the task was and how you collected data
- The before number, the failure analysis, the targeted fix, the after number
- ACT versus SmolVLA, and what you would try next
Practise telling the project story out loud in two minutes: the task and data collection, the before number, what failed and why, the targeted fix, the after number, then the ACT versus SmolVLA comparison and your next step.
That story is your answer to "tell me about a project you are proud of". Record it once and listen back.

## Next section
@svg rl | reinforcement learning, then your capstone plan
Next section switches from imitation to reinforcement learning: the foundations from Berkeley's CS 285, training a quadruped in MuJoCo Playground, changing the reward and watching the gait change, and an overview of Isaac Lab.
Then you pick your direction and plan your capstone. Update your Confidence ratings.
`,
  key: [
    'README: video, numbers, datasets, protocol, failure analysis, next steps.',
    'Every claim traces back to a measured trial.',
    'Practise the two-minute project story.',
    'Next: reinforcement learning and the capstone plan.'
  ],
  quiz: [
    ['What ties this week\'s work together?', ['Bigger models', 'Measurement: every claim traces back to trials', 'More cameras', 'Faster GPUs'], 1, 'Measure, diagnose, fix, re-measure.'],
    ['What is the best answer to "tell me about a project you are proud of"?', ['A list of tools used', 'A short story: task, before number, diagnosis, fix, after number', 'Your course certificate', 'The training loss'], 1, 'Numbers and reasoning.']
  ]
});
// @@END
