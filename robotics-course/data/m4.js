/* Module 4 · ROS 2, simulation, SLAM & navigation (days 85–112). Source: Notion Daily Plan. */

// ───────────── Section 1 · ROS 2 fundamentals ─────────────
D({
  n: 85, icon: '🐢', topic: 'ROS 2', hours: 3, notion: '3f6cdfea8ce281958347c77ad0f18259', svg: 'rosgraph',
  title: 'Install ROS 2 Jazzy + avoid the ROS 1 trap',
  goal: 'A working ROS 2 Jazzy install on Ubuntu 24.04, and the ability to spot ROS 1 tutorials instantly.',
  tasks: [
    'Read the Month 4 intro and the version section in the reading lesson',
    'Install ROS 2 Jazzy (deb packages, desktop) following the official install page',
    'Add `source /opt/ros/jazzy/setup.bash` to ~/.bashrc',
    'Test: run the talker and listener demo nodes in two terminals',
    'Run turtlesim and drive it with teleop',
    'Write your "ROS 1 red flags" list (catkin_make, roscore, rosrun, rospy, XML-only launch)',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['Month 4 goal', 'Your goal this month: build a robot in ROS 2, simulate it, and make it map a room and navigate autonomously.\n\nEverything up to now was you building robots your way.\n\nROS 2 is how the industry builds them, and it is the single most requested skill in robotics job listings.\n\nThe best part of this month is that you can do all of it with no hardware at all, on a normal laptop, with no NVIDIA GPU. Say that to yourself twice, because the belief that robotics requires expensive equipment is the main reason people never start.'],
    ['1. Which ROS 2 to install, and the ROS 1 trap', 'ROS 2 releases every May. Even years are LTS with five years of support, odd years get about eighteen months.\n\nAs of September 2026 the picture is:\n\nLyrical Luth, released May 2026, EOL May 2031, targets Ubuntu 26.04. The current LTS.\nJazzy Jalisco, released May 2024, EOL May 2029, targets Ubuntu 24.04.\nKilted Kaiju, EOL 31 December 2026. Do not start here.\nHumble Hawksbill, EOL May 2027. Legacy.\nStart on Jazzy. Lyrical is newer and is what you would pick for a new production project, but as of now almost every course, book and YouTube series still targets Jazzy, and it has more than two and a half years of support left. Move to Lyrical once your tutorial stack catches up.\n\nROS 1 is dead. Noetic reached end of life on 31 May 2025 and there is no successor. Enormous amounts of highly-ranked tutorial content is ROS 1, so learn to recognise it instantly: if you see catkin_make, roscore, rosrun, rospy or XML-only launch files, close the tab. ROS 2 uses colcon build, has no master, and uses ros2 run and Python launch files.']
  ],
  links: [
    ['Official ROS 2 Tutorials (Jazzy)', 'https://docs.ros.org/en/jazzy/Tutorials.html'],
    ['The Construct (no-install fallback)', 'https://www.theconstruct.ai/']
  ],
  extra: [['ROS 2 Jazzy install on Ubuntu (deb packages)', 'https://docs.ros.org/en/jazzy/Installation/Ubuntu-Install-Debs.html']],
  video: `
## How the industry builds robots
@svg rosgraph | ROS 2: many small programs talking over named channels
Welcome to Module 4. Its goal is to build a robot in ROS 2, simulate it, and make it map a room and navigate on its own.
Until now you have written all of a robot's software yourself, in one program on one microcontroller. Real robots are far bigger: dozens of sensors, planners and controllers, written by different people. ROS 2, the Robot Operating System, is the framework the industry uses to build them, and the article calls it the single most requested skill in robotics job listings.
And the article stresses one more thing: you can do this whole module on a normal laptop, with no robot and no special GPU.

## Which version
| Distro | Released | End of life | Ubuntu | Advice |
|---|---|---|---|---|
| Lyrical Luth | May 2026 | May 2031 | 26.04 | newest LTS; move here later |
| Jazzy Jalisco | May 2024 | May 2029 | 24.04 | start here |
| Kilted Kaiju | May 2025 | Dec 2026 | 24.04 | do not start here |
| Humble Hawksbill | May 2022 | May 2027 | 22.04 | legacy |
ROS 2 releases a new distribution every May, with alphabetical turtle-themed names. Even years are long-term support releases with five years of updates.
The article's advice is to start on Jazzy. Lyrical is newer, but almost every course, book and video series still targets Jazzy, and it is supported until 2029. Move to Lyrical once the tutorials catch up.

## The ROS 1 trap
@big catkin_make · roscore · rosrun · rospy · XML-only launch → close the tab
ROS 1 is dead: its last version reached end of life in May 2025. But a huge amount of old, highly ranked tutorial content is ROS 1, and it will not work with ROS 2.
Learn to spot it instantly. If you see catkin make, roscore, rosrun, rospy, or launch files written only in XML, close the tab. ROS 2 uses colcon build, has no central master process, uses ros2 run, and writes launch files in Python. Make that red-flag list today.

## Install and test
\`\`\`bash
# follow docs.ros.org Jazzy "Ubuntu (deb packages)" exactly, then:
sudo apt install ros-jazzy-desktop
echo "source /opt/ros/jazzy/setup.bash" >> ~/.bashrc
# terminal 1                         # terminal 2
ros2 run demo_nodes_cpp talker       ros2 run demo_nodes_py listener
\`\`\`
Install Jazzy from the official deb packages, following the documentation exactly. Then add the setup script to your bash configuration so every new terminal knows where ROS is.
Test it with the classic demo: a talker node in one terminal and a listener in another. The listener prints every message the talker sends. Note that one is written in C++ and the other in Python, and they talk anyway. That language independence is one of ROS's great strengths.

## Turtlesim: your first robot
\`\`\`bash
ros2 run turtlesim turtlesim_node
ros2 run turtlesim turtle_teleop_key   # arrow keys drive the turtle
\`\`\`
Finally, run turtlesim, a tiny two-dimensional robot simulator, and drive the turtle with the arrow keys from a second terminal. It looks like a toy, but it uses exactly the same communication as a real robot: one node publishes velocity commands, another listens and moves.
Over the next days you will use turtlesim to learn every core ROS 2 concept before moving to real robot models.
`,
  key: [
    'ROS 2 is how the industry builds robots: many nodes communicating; no hardware needed this module.',
    'Start on Jazzy (Ubuntu 24.04, supported to 2029); move to Lyrical later.',
    'ROS 1 red flags: catkin_make, roscore, rosrun, rospy, XML-only launch.',
    'Source /opt/ros/jazzy/setup.bash; test with talker/listener and turtlesim.'
  ],
  quiz: [
    ['Which of these is a sign that a tutorial is ROS 1, not ROS 2?', ['colcon build', 'ros2 run', 'roscore', 'Python launch files'], 2, 'ROS 2 has no master; roscore is ROS 1.'],
    ['Which ROS 2 distribution does the plan say to start on?', ['Humble', 'Kilted', 'Jazzy', 'Noetic'], 2, 'Most tutorials target Jazzy; supported to 2029.']
  ]
});

D({
  n: 86, icon: '📡', topic: 'ROS 2', hours: 2.5, notion: '3f6cdfea8ce28141b8c0c7b785d4c14a', svg: 'rosgraph',
  title: 'Nodes and topics',
  goal: 'Understand the ROS 2 graph: nodes publish and subscribe to topics.',
  tasks: [
    'Official tutorials → Beginner: CLI tools → Understanding nodes, Understanding topics',
    'Use `ros2 node list`, `ros2 topic list/echo/info/hz`, `rqt_graph` on turtlesim',
    'Start Renard Level 1 (Udemy): sections on nodes and topics',
    'Publish a Twist from the CLI to move the turtle',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['What to focus on', 'Nodes, topics, services and actions, and knowing which of the three a given problem needs.'],
    ['Official ROS 2 Tutorials', 'The canonical reference, structured exactly around nodes, topics, services, actions, parameters, launch files, tf2 and URDF. It is reference-grade rather than pedagogy, so pair it with video.']
  ],
  links: [
    ['Official ROS 2 Tutorials', 'https://docs.ros.org/en/jazzy/Tutorials.html'],
    ['Edouard Renard, ROS 2 for Beginners, Level 1', 'https://www.udemy.com/course/ros2-for-beginners/'],
    ['Articulated Robotics', 'https://articulatedrobotics.xyz/tutorials/']
  ],
  video: `
## The ROS graph
@svg rosgraph | nodes = programs · topics = named streams of messages
A ROS 2 system is a graph. The boxes are nodes: small, single-purpose programs, like a camera driver, an object detector, or a motor driver. The connections are topics: named channels that carry a stream of messages.
A node can publish messages on a topic, subscribe to a topic to receive them, or both. Publishers and subscribers do not know about each other. The camera node simply publishes images on slash image; any node that cares subscribes to slash image.

## Why this design is powerful
- Replace one node without touching the others
- Add a logger or visualiser by just subscribing
- Run nodes on different computers, transparently
- Mix Python and C++ freely
This loose coupling is what makes ROS scale. You can swap the real camera driver for a simulated one, and nothing downstream notices. You can add a logging node just by subscribing. Nodes can even run on different computers on the same network, and the communication just works.
That is how a team of fifty engineers can work on one robot without constantly breaking each other's code.

## Messages have types
\`\`\`text
geometry_msgs/msg/Twist          # a velocity command
  Vector3 linear    (x, y, z)    # forward speed is linear.x
  Vector3 angular   (x, y, z)    # turn rate is angular.z
\`\`\`
Every topic carries one message type. Velocity commands, for example, use the Twist type from geometry messages, which holds a linear velocity and an angular velocity. For a ground robot, linear x is forward speed and angular z is turn rate.
Using shared, standard message types is why tools and nodes from different authors fit together.

## Command-line tools you will use daily
| Command | Shows |
|---|---|
| ros2 node list | running nodes |
| ros2 topic list | active topics |
| ros2 topic echo /topic | live messages |
| ros2 topic info /topic | type, publishers, subscribers |
| ros2 topic hz /topic | publishing rate |
| rqt_graph | the whole graph, drawn |
With turtlesim running, explore it with the command line. List the nodes and topics. Echo the turtle's pose topic and watch it update as you drive. Check the rate with topic hz. And open rqt graph to see the nodes and topics drawn as a diagram.
These tools are your multimeter for ROS: the first thing you reach for when something does not work.

## Drive the turtle from the command line
\`\`\`bash
ros2 topic pub --rate 1 /turtle1/cmd_vel geometry_msgs/msg/Twist \\
  "{linear: {x: 2.0}, angular: {z: 1.8}}"
\`\`\`
Finally, publish a Twist directly from the terminal, once per second, and watch the turtle drive in a circle. You have just become a node yourself.
Pair the official tutorials, which are reference material, with the first sections of Edouard Renard's video course, as the article recommends.
`,
  key: [
    'A ROS 2 system is a graph of nodes connected by topics.',
    'Publishers and subscribers are decoupled, so nodes can be swapped or added freely.',
    'Each topic has one message type, e.g. geometry_msgs/Twist for velocity.',
    'Daily tools: ros2 node/topic list, echo, info, hz, and rqt_graph.'
  ],
  quiz: [
    ['In ROS 2, what is a topic?', ['A program', 'A named channel carrying a stream of typed messages', 'A configuration file', 'A launch argument'], 1, 'Nodes publish and subscribe to topics.'],
    ['For a ground robot\'s Twist command, which field is forward speed?', ['angular.z', 'linear.x', 'linear.z', 'angular.x'], 1, 'linear.x is forward; angular.z is turning.']
  ]
});

D({
  n: 87, icon: '🔄', topic: 'ROS 2', hours: 2.5, notion: '3f6cdfea8ce2818da6ebc0466c18ffea', svg: 'rosgraph',
  title: 'Services, actions, parameters',
  goal: 'Know when to use a topic, a service or an action.',
  tasks: [
    'Official tutorials: Understanding services, parameters, actions',
    'Call a turtlesim service from the CLI (spawn, clear). Send a rotate action goal and cancel it',
    'Change a parameter at runtime and dump params to YAML',
    'Make a table: topic vs service vs action → when to use each, with one robot example each',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [['What to focus on', 'Nodes, topics, services and actions, and knowing which of the three a given problem needs.\nParameters and YAML config files.']],
  links: [
    ['Official ROS 2 Tutorials', 'https://docs.ros.org/en/jazzy/Tutorials.html'],
    ['Automatic Addison (recipe guides by distro)', 'https://automaticaddison.com/tutorials/']
  ],
  video: `
## Three ways nodes talk
| | Topic | Service | Action |
|---|---|---|---|
| Pattern | stream, one-way | request → response | goal → feedback… → result |
| Duration | continuous | quick | long-running |
| Cancel? | no | no | yes |
| Robot example | camera images, odometry | "reset the map", "get battery level" | "drive to the kitchen", "pick the cup" |
The article says the key skill is knowing which of the three a problem needs. Topics are continuous one-way streams: sensor data, velocity commands. Nobody waits for a reply.
Services are request and response, like a function call across the network. You ask, you wait briefly, you get an answer. Use them for quick operations: reset something, query a value, change a mode.
Actions are for long-running goals. You send a goal, receive regular feedback while it runs, and finally a result. Crucially, you can cancel an action partway. Navigation and arm motions are actions.

## Choosing correctly
@big Continuous data → topic · quick question → service · long task you might cancel → action
A simple rule. Is it a continuous stream of data? Topic. Is it a quick question or command with an immediate answer? Service. Is it a task that takes time, where you want progress updates and the ability to cancel? Action.
A common mistake is using a service for something slow, like moving an arm. The caller blocks, waiting, with no progress and no way to stop the arm. That is exactly what actions exist to solve.

## Try them on turtlesim
\`\`\`bash
ros2 service call /spawn turtlesim/srv/Spawn "{x: 2, y: 2, name: 'leo'}"
ros2 service call /clear std_srvs/srv/Empty
ros2 action send_goal --feedback /turtle1/rotate_absolute \\
  turtlesim/action/RotateAbsolute "{theta: 3.14}"
\`\`\`
Turtlesim has all three. Call the spawn service to create a second turtle, and the clear service to wipe the drawing. Then send a rotate absolute action goal with feedback, and watch the remaining angle count down. Try cancelling it partway, from the teleop window, and see the action report it was cancelled.

## Parameters and YAML
\`\`\`yaml
turtlesim:
  ros__parameters:
    background_r: 30
    background_g: 30
    background_b: 60
\`\`\`
Parameters are a node's settings: a controller's gains, a sensor's update rate, a robot's wheel diameter. You can read and change them at runtime with ros2 param, and save or load them as YAML files.
Today, change turtlesim's background colour parameters live, then dump all its parameters to a YAML file. In real robots, every tunable number lives in a YAML file like this, not hard-coded in the source, so you can tune without recompiling.

## The parameter commands
\`\`\`bash
ros2 param list /turtlesim
ros2 param get  /turtlesim background_r
ros2 param set  /turtlesim background_r 200
ros2 param dump /turtlesim > turtlesim.yaml
ros2 run turtlesim turtlesim_node --ros-args --params-file turtlesim.yaml
\`\`\`
Five commands cover almost everything. List shows every parameter a node has. Get reads one value, and set changes it while the node keeps running. Dump writes all of them to a YAML file.
The last line closes the loop: start the node again, passing that YAML file, and it comes up with your saved settings. This is exactly how you will load controller gains and robot dimensions in the coming weeks.

## Design your own interface
- Battery monitor → publishes a topic, ten times a second
- "What is the firmware version?" → a service
- "Dock at the charger" → an action, with distance-remaining feedback
- Wheel diameter, max speed → parameters
Here is one robot, designed with all four tools. The battery reading is a stream, so a topic. The firmware version is a quick question, so a service. Docking takes time and you might abort it, so an action. Physical constants and limits are parameters.
When you make today's comparison table, try to design a similar set for your own robot. Getting this choice right early saves rewriting nodes later.
`,
  key: [
    'Topic = continuous stream; service = quick request/response; action = long goal with feedback and cancel.',
    'Never use a service for slow motions: use an action so it can report progress and be cancelled.',
    'Parameters are node settings, changeable at runtime and stored in YAML.',
    'Keep tunable values in YAML, not hard-coded.'
  ],
  quiz: [
    ['Which communication type suits "drive to the kitchen"?', ['Topic', 'Service', 'Action', 'Parameter'], 2, 'Long-running, with feedback and the ability to cancel.'],
    ['Which suits a camera publishing 30 images per second?', ['Topic', 'Service', 'Action', 'Parameter'], 0, 'A continuous one-way stream.']
  ]
});

D({
  n: 88, icon: '🐍', topic: 'ROS 2', hours: 3, notion: '3f6cdfea8ce28122a5bcd534c975c145', svg: 'rosgraph',
  title: 'Write nodes in Python and C++ + colcon',
  goal: 'Write, build and run your own publisher/subscriber in both Python and C++.',
  tasks: [
    'Official tutorials → Beginner: Client libraries → create a workspace, create a package, simple pub/sub (Python), simple pub/sub (C++)',
    'Build with `colcon build`, source `install/setup.bash`, run with `ros2 run`',
    'Write a service server + client in Python',
    'Note the package layout (package.xml, setup.py / CMakeLists.txt)',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['What to focus on', 'colcon workspaces and package layout.'],
    ['Month 4 Milestone (this one)', 'Write ROS 2 nodes in both Python and C++ that use topics, services and actions.']
  ],
  links: [
    ['Official ROS 2 Tutorials', 'https://docs.ros.org/en/jazzy/Tutorials.html'],
    ['Edouard Renard Level 1 (Python + C++)', 'https://www.udemy.com/course/ros2-for-beginners/'],
    ['MOGI-ROS university course', 'https://github.com/orgs/MOGI-ROS/repositories']
  ],
  video: `
## Workspaces and packages
\`\`\`text
ros2_ws/
  src/
    my_pkg_py/      package.xml, setup.py, my_pkg_py/talker.py
    my_pkg_cpp/     package.xml, CMakeLists.txt, src/talker.cpp
  build/  install/  log/      ← created by colcon
\`\`\`
ROS 2 code lives in packages, and packages live in a workspace. A workspace is just a folder with a source directory inside. Each package has a package dot xml describing its name and dependencies, plus either a setup dot py for Python or a CMakeLists for C++.
You build everything with colcon, which creates build, install and log folders next to the source.

## The build-source-run cycle
@eq colcon build → source install/setup.bash → ros2 run pkg node | do this every time you change code
The cycle is always the same. Run colcon build from the workspace root. Then source the install folder's setup script, so this terminal knows about your new packages. Then run your node with ros2 run.
The single most common beginner mistake is forgetting to source after building, then wondering why ros2 cannot find the package. If ROS says your package does not exist, source first.

## A Python publisher
\`\`\`python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class Talker(Node):
    def __init__(self):
        super().__init__('talker')
        self.pub = self.create_publisher(String, 'chatter', 10)
        self.create_timer(0.5, self.tick)          # 2 Hz, no sleep()
    def tick(self):
        self.pub.publish(String(data='hello'))

rclpy.init(); rclpy.spin(Talker())
\`\`\`
Here is a Python publisher. A node is a class. In the constructor, create a publisher with a message type, a topic name and a queue depth, and a timer that calls a function twice a second.
Notice there is no sleep loop. The timer is exactly the non-blocking pattern you learned with millis in Module 2. Spin hands control to ROS, which calls your callbacks when timers fire or messages arrive.

## The same in C++
\`\`\`cpp
class Talker : public rclcpp::Node {
public:
  Talker() : Node("talker") {
    pub_ = create_publisher<std_msgs::msg::String>("chatter", 10);
    timer_ = create_wall_timer(500ms, [this]{ pub_->publish(std_msgs::msg::String().set__data("hello")); });
  }
private:
  rclcpp::Publisher<std_msgs::msg::String>::SharedPtr pub_;
  rclcpp::TimerBase::SharedPtr timer_;
};
\`\`\`
The C++ version has the same shape: a node class, a publisher, a timer and a callback. It is more verbose, but faster, and most performance-critical robot code is C++.
A Module 4 milestone is writing nodes in both languages, using topics, services and actions. Do the official pub-sub tutorials in both today, plus a Python service server and client.

## Python or C++?
| Use Python for | Use C++ for |
|---|---|
| quick tools, prototypes, scripts | drivers, controllers, perception |
| glue between components | anything high-rate or real-time |
| ML integration | ros2_control hardware interfaces |
A rough rule: Python for prototypes, tools and glue code; C++ for drivers, controllers and anything that must be fast or run at a high rate. Because ROS lets them talk freely, real systems mix both.
`,
  key: [
    'Code lives in packages inside a workspace; colcon builds them.',
    'Cycle: colcon build → source install/setup.bash → ros2 run.',
    'Nodes are classes with publishers, subscribers and timers; spin runs the callbacks.',
    'Python for prototypes and glue; C++ for drivers, control and high rates.'
  ],
  quiz: [
    ['ros2 run says your freshly built package does not exist. Most likely fix?', ['Reinstall ROS', 'Source install/setup.bash in that terminal', 'Rename the package', 'Use roscore'], 1, 'The terminal must be told about the new install.'],
    ['Why use a timer instead of a sleep loop in a ROS 2 node?', ['Timers are required for Python only', 'It keeps the node non-blocking so callbacks keep running', 'Sleep is illegal in C++', 'Timers use less memory'], 1, 'Same idea as millis() instead of delay().']
  ]
});

D({
  n: 89, icon: '🚀', topic: 'ROS 2', hours: 2.5, notion: '3f6cdfea8ce281839bccd4afbdc79c47', svg: 'rosgraph',
  title: 'Custom msg/srv + Python launch files',
  goal: 'Define your own message and service types, and launch many nodes with arguments and remapping.',
  tasks: [
    'Official tutorials: custom .msg and .srv files (separate interfaces package)',
    'Launch tutorials: write a Python launch file with a launch argument and a topic remap',
    'Launch 2 turtlesim instances with one launch file, remapped so one mimics the other',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [['What to focus on', 'Custom message and service definitions.\nLaunch files in Python, and passing arguments and remapping topics.']],
  links: [
    ['Official ROS 2 Tutorials', 'https://docs.ros.org/en/jazzy/Tutorials.html'],
    ['Automatic Addison', 'https://automaticaddison.com/tutorials/']
  ],
  video: `
## Your own message types
\`\`\`text
# my_interfaces/msg/BatteryStatus.msg
float32 voltage
float32 current
uint8   percent
bool    charging

# my_interfaces/srv/SetMode.srv
string mode
---
bool   ok
string message
\`\`\`
Standard message types cover a lot, but real robots need their own. A message file is just a list of typed fields. A service file has the request fields, three dashes, then the response fields.
The convention is to put them in a separate interfaces package, which other packages depend on. That keeps your message definitions independent of any one node, so many packages can share them.

## Building interfaces
- Interfaces packages are built with CMake (rosidl), even for Python users
- List each .msg / .srv in CMakeLists.txt
- After colcon build + source: ros2 interface show my_interfaces/msg/BatteryStatus
Interface packages are always built with CMake, using the ROS interface generator, even if all your nodes are Python. List each file in CMakeLists, build, and source.
Then check with ros2 interface show. ROS has generated Python and C++ code for your types automatically, so both languages can use them immediately.

## Launch files: start a whole system at once
\`\`\`python
from launch import LaunchDescription
from launch.actions import DeclareLaunchArgument
from launch.substitutions import LaunchConfiguration
from launch_ros.actions import Node

def generate_launch_description():
    return LaunchDescription([
        DeclareLaunchArgument('rate', default_value='2.0'),
        Node(package='my_pkg_py', executable='talker',
             parameters=[{'rate': LaunchConfiguration('rate')}],
             remappings=[('chatter', 'news')]),
    ])
\`\`\`
A real robot runs dozens of nodes. Starting each one in its own terminal does not scale, so ROS 2 uses launch files, written in Python, to start a whole system with one command.
A launch file declares arguments, like a rate, starts nodes with parameters, and can remap topics. Remapping renames a topic for one node without changing its code, so the talker here publishes on news instead of chatter.

## Remapping: the mimic exercise
\`\`\`bash
ros2 launch my_pkg two_turtles.launch.py
# turtlesim1 + turtlesim2 + mimic node:
#   mimic subscribes to /turtlesim1/turtle1/pose
#   and publishes   to /turtlesim2/turtle1/cmd_vel
\`\`\`
Today's exercise: one launch file that starts two turtlesim windows in separate namespaces, plus the mimic node, remapped so the second turtle copies the first. Drive the first turtle and the second one follows.
Namespaces and remapping are how ROS runs several copies of the same software, two arms or a fleet of robots, without their topics colliding.

## Launch file debugging
- ros2 launch --show-args my_pkg two_turtles.launch.py → lists the arguments
- ros2 launch my_pkg two_turtles.launch.py rate:=5.0 → overrides one
- ros2 node list and rqt_graph → check the remaps really happened
- A launch file is not found? Install it in setup.py or CMakeLists, rebuild, source
When a launch file misbehaves, start with show args, to see what it accepts, and pass values with the colon equals syntax. Then use node list and rqt graph to confirm the nodes and remapped topics look as you intended.
The classic trap: a new launch file is not found because it was never installed. Python packages must list the launch folder in setup dot py, and C++ packages must install it in CMakeLists. Rebuild and source again after adding it.
`,
  key: [
    'Custom .msg/.srv files live in a separate interfaces package, built with CMake.',
    'ros2 interface show confirms generated types; Python and C++ both get them.',
    'Python launch files start many nodes with arguments, parameters and remaps.',
    'Namespaces and remapping let multiple copies run without topic collisions.'
  ],
  quiz: [
    ['What does topic remapping do?', ['Changes a message type', 'Renames a topic for a node without changing its code', 'Deletes a topic', 'Speeds up publishing'], 1, 'Wire nodes together flexibly from launch files.'],
    ['In a .srv file, what separates the request from the response?', ['A blank line', 'Three dashes ---', 'A comma', 'The word RESPONSE'], 1, 'Request fields, ---, then response fields.']
  ]
});

D({
  n: 90, icon: '🕸️', topic: 'ROS 2', hours: 3, notion: '3f6cdfea8ce281d9b959f0d571d2d568', svg: 'rosgraph',
  title: 'Practice task: multi-node system + ros2 bag',
  goal: 'Prove you understand the graph — 4 nodes, your own interfaces, one launch file, recorded and replayed.',
  tasks: [
    'Build: sensor publisher (fake data with your custom .msg) → processing node → aggregator with parameters; plus a config node exposing your custom .srv',
    'One Python launch file with arguments',
    'Record with `ros2 bag record`, replay with `ros2 bag play`, and confirm downstream nodes behave the same',
    'Read the QoS concepts page. Try a QoS mismatch (best-effort pub vs reliable sub) and see nothing arrive',
    'Push to `month-4/ros2-graph/` with an rqt_graph screenshot',
    'Tick **Practice task done**. Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['Practice task (ROS 2 core)', 'Practice task: build a multi-node system with no robot and no simulator at all. A sensor publisher, a processing node, a service-based configuration node and a parameterised aggregator, with your own custom .msg and .srv, wired together in a Python launch file that takes arguments. Record it with ros2 bag and replay it. This costs nothing and it proves you understand the graph rather than that you can run turtlesim.'],
    ['Honest gap: QoS', 'Honest gap worth naming: DDS and QoS settings are covered badly by every resource I could find. No course does it well. When you hit mysterious "my topic publishes but nothing receives" problems, the answer is almost always a QoS mismatch, and you will be reading the official Concepts pages rather than a tutorial.']
  ],
  links: [['Official ROS 2 Tutorials', 'https://docs.ros.org/en/jazzy/Tutorials.html']],
  extra: [['ROS 2 Concepts: Quality of Service settings', 'https://docs.ros.org/en/jazzy/Concepts/Intermediate/About-Quality-of-Service-Settings.html']],
  video: `
## Understanding the graph, not running turtlesim
@svg rosgraph | sensor → processing → aggregator, plus a config service
The ROS 2 practice task builds a complete multi-node system with no robot and no simulator at all. The article's point: it costs nothing, and it proves you understand the graph rather than that you can run turtlesim.

## The system to build
| Node | Does | Uses |
|---|---|---|
| sensor | publishes fake readings at a rate | your custom .msg |
| processing | filters or converts each reading | subscribe + publish |
| aggregator | computes running stats; parameters set the window | parameters |
| config | changes the mode on request | your custom .srv |
Four nodes. A sensor node publishes fake data using your own message type, say a noisy temperature or a battery status. A processing node subscribes, filters it, perhaps with the complementary or moving-average filter from Module 2, and republishes.
An aggregator computes running statistics, with its window size as a parameter. And a config node offers your custom service, for example to switch the sensor between modes. One Python launch file with arguments starts all of them.

## ros2 bag: record and replay
\`\`\`bash
ros2 bag record -o run1 /sensor/raw /sensor/filtered
# later, with the sensor node stopped:
ros2 bag play run1
\`\`\`
ROS bags record messages from chosen topics to a file, with timestamps, and replay them later exactly as they happened.
This is enormously useful. Record a robot's sensor data once in the field, then replay it at your desk as many times as you like while you debug a processing node. Today, record your sensor topic, stop the sensor node, replay the bag, and confirm the downstream nodes behave exactly the same.

## The QoS trap
@big "My topic publishes but nothing receives" → almost always a QoS mismatch
The article names an honest gap: quality of service settings are covered badly everywhere. Every publisher and subscriber has QoS settings, such as reliability, best effort or reliable, and history depth.
If they are incompatible, for example a best-effort publisher and a reliable subscriber, they silently never connect. Nothing arrives, and no error is printed. Today you will cause this on purpose, so you recognise it instantly later. Sensor drivers often publish best effort, so it is a real and common trap.

## Diagnose QoS problems
\`\`\`bash
ros2 topic info /sensor/raw --verbose   # shows each endpoint's QoS
\`\`\`
- Reliability: RELIABLE vs BEST_EFFORT
- Durability: VOLATILE vs TRANSIENT_LOCAL (e.g. maps, robot_description)
The tool for diagnosing it is ros2 topic info with the verbose flag, which lists the QoS profile of every publisher and subscriber on the topic. Compare them.
Durability is the other common one: some topics, like a map or the robot description, are published once with transient local durability, so late subscribers still receive the last message. Mismatch that and late nodes get nothing.
Push the project with an rqt graph screenshot and tick the practice task as done.
`,
  key: [
    'Build a 4-node system with custom interfaces, parameters and one launch file.',
    'ros2 bag records topics and replays them identically for offline debugging.',
    'Incompatible QoS (e.g. best-effort pub, reliable sub) silently never connects.',
    'Use ros2 topic info --verbose to compare QoS; watch durability for latched topics.'
  ],
  quiz: [
    ['A node publishes but the subscriber receives nothing and there is no error. Likely cause?', ['Wrong colour scheme', 'A QoS mismatch between publisher and subscriber', 'colcon not installed', 'The topic is too fast'], 1, 'The article\'s "honest gap".'],
    ['What is ros2 bag used for?', ['Packaging code', 'Recording topic messages and replaying them later', 'Installing dependencies', 'Visualising URDF'], 1, 'Record once, debug many times.']
  ]
});

D({
  n: 91, icon: '🔁', topic: 'Review', hours: 2, notion: '3f6cdfea8ce2812889f6ccd3b73c8457', svg: 'rosgraph',
  title: 'Week 1 review + catch-up',
  goal: 'Solid ROS 2 basics before robots enter the picture.',
  tasks: [
    'Finish unfinished tasks from M4 Days 1–6',
    'Without notes: create a package with a pub/sub pair in C++, build, run',
    'Write an action server + client (Python) if you have not yet',
    'Update Confidence on Days 1–6'
  ],
  links: [['Official ROS 2 Tutorials', 'https://docs.ros.org/en/jazzy/Tutorials.html']],
  video: `
## The no-notes C++ test
@big New package · C++ publisher + subscriber · build · run — from memory
Review day. The test of ROS 2 fluency: create a new C++ package with a publisher and subscriber from memory, build it with colcon, source, and run it. If you can do that without opening the tutorials, the core workflow is yours.
If you get stuck, note exactly where: the package creation command, the CMakeLists entries, or the source step. Practise that step.

## The action server
\`\`\`python
from rclpy.action import ActionServer
# goal → execute_callback publishes feedback → returns result
# client: send_goal_async(..., feedback_callback=...) and cancel_goal_async()
\`\`\`
If you have not written an action server and client yet, do it today, because the milestone covers topics, services and actions, and section three uses an action to drive a robot a set distance.
Make the server count down or simulate a slow task, publish feedback each step, and support cancellation. Make the client print the feedback and cancel halfway once.

## The week in one table
| Concept | One-line test |
|---|---|
| node / topic | explain rqt_graph of turtlesim |
| service vs action | pick the right one for five robot tasks |
| colcon cycle | build, source, run without thinking |
| launch + remap | start two copies without collisions |
| bag | record, replay, debug offline |
| QoS | diagnose a silent topic |
Run through this table and test yourself on each line. Next section, ROS meets robot models: coordinate frames, URDF, and your first simulation.
`,
  key: [
    'Fluency test: a C++ pub/sub package from memory.',
    'Write an action server and client with feedback and cancellation.',
    'Self-test: graph, service vs action, colcon cycle, launch/remap, bag, QoS.'
  ],
  quiz: [
    ['Which three communication types does the Module 4 milestone require your nodes to use?', ['Topics, services and actions', 'Topics, bags and launch files', 'Services, URDF and TF', 'Parameters, YAML and QoS'], 0, 'Straight from the milestone.'],
    ['What must an action client be able to do that a service client cannot?', ['Send a request', 'Receive feedback and cancel the goal', 'Use Python', 'Use a message type'], 1, 'Feedback and cancellation define actions.']
  ]
});
// ───────────── Section 2 · URDF, TF and Gazebo ─────────────
D({
  n: 92, icon: '🧭', topic: 'URDF & TF', hours: 2.5, notion: '3f6cdfea8ce281ec8a52c4d230ce49e1', svg: 'tf',
  title: 'Coordinate frames and tf2',
  goal: 'Understand frames and transforms — the concept that blocks most people\'s understanding of URDF.',
  tasks: [
    'Articulated Robotics: Coordinate Transforms for Robotics series',
    'Official tf2 tutorials: static broadcaster, broadcaster, listener (Python)',
    'Use `ros2 run tf2_tools view_frames` and `ros2 run tf2_ros tf2_echo`',
    'Start Renard Level 2 (TF section)',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [['Coordinate Transforms for Robotics', 'A dedicated series on frames and transforms, which is the concept that blocks most people\'s understanding of URDF.']],
  links: [
    ['Articulated Robotics, Coordinate Transforms for Robotics', 'https://articulatedrobotics.xyz/category/coordinate-transforms-for-robotics'],
    ['Edouard Renard, Level 2: TF, URDF, RViz, Gazebo', 'https://www.udemy.com/course/ros2-tf-urdf-rviz-gazebo/'],
    ['Official ROS 2 Tutorials (tf2)', 'https://docs.ros.org/en/jazzy/Tutorials.html']
  ],
  video: `
## Everything is relative
@svg tf | every frame is defined relative to its parent
A robot is full of things that each have their own sense of where things are. The lidar measures distances from its own centre. The camera sees pixels relative to its lens. The wheels move relative to the robot's base. The robot moves relative to the map.
To combine all of that, you need to convert positions from one point of view to another. Each point of view is a coordinate frame, and the conversion between two frames is a transform. The article calls this the concept that blocks most people's understanding of URDF, so it gets a full day.

## A frame is an origin plus axes
| Axis | Colour in RViz | Direction (ROS convention) |
|---|---|---|
| x | red | forward |
| y | green | left |
| z | blue | up |
A coordinate frame is just an origin point and three perpendicular axes. In ROS, x points forward, y points left, and z points up, and RViz draws them as red, green and blue, in that order. A handy memory aid: R G B maps to X Y Z.
A transform between two frames is a translation, how far the origin moved, plus a rotation, how the axes turned.

## The TF tree
\`\`\`text
map
 └── odom
      └── base_link
           ├── laser
           ├── camera_link
           └── left_wheel, right_wheel
\`\`\`
ROS organises all the frames into a tree. Each frame has exactly one parent, and its transform is defined relative to that parent. The standard mobile-robot tree goes map, then odom, then base link, then the sensors and wheels on the robot.
To find where the laser is in the map, tf2 simply chains the transforms up and down the tree. You never compute that chain by hand.

## tf2: broadcasting and listening
- Static transforms: never change (laser bolted to the base)
- Dynamic transforms: change over time (odom → base_link as the robot drives)
- Listeners ask: "where is frame A in frame B, at time t?"
Nodes broadcast transforms, and other nodes listen and look them up. Static transforms never change, like a sensor bolted to the chassis. Dynamic transforms change over time, like the robot's position as it drives, and are broadcast continuously.
A listener asks tf2 a simple question: where is frame A relative to frame B, at this time? Time matters, because a laser scan taken a moment ago must be transformed using where the robot was then, not now.

## Tools you will use constantly
\`\`\`bash
ros2 run tf2_tools view_frames            # PDF of the whole tree
ros2 run tf2_ros tf2_echo map base_link   # live transform between two frames
\`\`\`
Two tools make TF visible. View frames listens for a few seconds and writes a PDF of the whole tree, including who broadcasts each transform and how often. Tf2 echo prints the live transform between any two frames.
Work through the Articulated Robotics transforms series and the official tf2 tutorials today, writing a static broadcaster, a dynamic broadcaster and a listener in Python. This idea underpins URDF tomorrow, and SLAM and navigation later.
`,
  key: [
    'A frame = origin + axes; a transform = translation + rotation between frames.',
    'ROS convention: x forward (red), y left (green), z up (blue).',
    'Frames form a tree (map → odom → base_link → sensors); tf2 chains transforms for you.',
    'Static vs dynamic transforms; use view_frames and tf2_echo to inspect.'
  ],
  quiz: [
    ['In ROS, which axis points forward on a robot?', ['x', 'y', 'z', 'It varies'], 0, 'x forward, y left, z up.'],
    ['Why does tf2 need timestamps on transforms?', ['For logging only', 'Sensor data must be transformed using where frames were when it was captured', 'To sort the tree', 'Timestamps are optional'], 1, 'The robot moves between capture and use.']
  ]
});

D({
  n: 93, icon: '🤖', topic: 'URDF & TF', hours: 2.5, notion: '3f6cdfea8ce28129b8eff752ab7297a6', svg: 'tf',
  title: 'URDF + robot_state_publisher',
  goal: 'Describe a simple robot in URDF and see its TF tree in RViz.',
  tasks: [
    'Official tutorial: Using URDF with robot_state_publisher (Python variant)',
    'Write a 3-link URDF by hand (links + joints). View in RViz with joint_state_publisher_gui',
    'Write in your own words: joint_state_publisher vs robot_state_publisher',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [['Common issues to learn', 'Confusing joint_state_publisher with robot_state_publisher. Fix: the first invents joint positions, the second computes transforms from them.']],
  links: [
    ['Official URDF tutorial with robot_state_publisher', 'https://docs.ros.org/en/jazzy/Tutorials/Intermediate/URDF/Using-URDF-with-Robot-State-Publisher-cpp.html'],
    ['Edouard Renard Level 2', 'https://www.udemy.com/course/ros2-tf-urdf-rviz-gazebo/']
  ],
  video: `
## URDF: describing a robot
@big Links (rigid bodies) connected by joints (how they move)
The Unified Robot Description Format, URDF, is an XML file that describes a robot's physical structure. It has two building blocks: links, which are the rigid parts, and joints, which connect two links and say how one moves relative to the other.
Sound familiar? It is exactly the assembly with mates you built in CAD in Module 3: parts and the joints between them.

## Links and joints
\`\`\`xml
<robot name="arm3">
  <link name="base_link"/>
  <link name="link1"/>
  <joint name="shoulder" type="revolute">
    <parent link="base_link"/>  <child link="link1"/>
    <origin xyz="0 0 0.1" rpy="0 0 0"/>
    <axis xyz="0 0 1"/>
    <limit lower="-1.57" upper="1.57" effort="5" velocity="2"/>
  </joint>
</robot>
\`\`\`
Each joint names a parent link and a child link, an origin saying where the child frame sits relative to the parent, an axis to rotate or slide along, and limits.
Joint types match what you used in CAD: fixed, revolute for rotation with limits, continuous for unlimited rotation like a wheel, and prismatic for sliding.

## Every link is a frame
- Each link in the URDF becomes a frame in the TF tree
- Joints define the transforms between them
- Fixed joints → static transforms; moving joints → change with joint angle
Here is where yesterday connects. Every link in the URDF becomes a frame in the TF tree, and every joint defines the transform between its parent and child.
A fixed joint gives a static transform. A revolute joint gives a transform that changes as the joint angle changes. So a URDF is really a recipe for the robot's TF tree.

## The two publishers everyone confuses
| Node | Input | Output |
|---|---|---|
| joint_state_publisher (or _gui) | nothing, or GUI sliders | /joint_states: the angle of each joint |
| robot_state_publisher | URDF + /joint_states | TF: a transform for every link |
| real robot / ros2_control | encoders | /joint_states |
The article names a classic confusion: joint state publisher versus robot state publisher. The fix is simple once stated.
Joint state publisher invents joint positions. With the GUI version, you drag sliders, and it publishes those angles on the joint states topic. On a real robot, the encoders provide those angles instead.
Robot state publisher takes the URDF and the joint angles, and computes the transform for every link, publishing them to TF. One invents angles; the other turns angles into frames.

## Today's exercise
\`\`\`bash
ros2 run robot_state_publisher robot_state_publisher --ros-args \\
  -p robot_description:="$(xacro arm3.urdf)"
ros2 run joint_state_publisher_gui joint_state_publisher_gui
rviz2   # add RobotModel + TF displays
\`\`\`
Write a three-link URDF by hand, start robot state publisher with it, start the joint state publisher GUI, and open RViz with the robot model and TF displays.
Drag the sliders and watch the arm move, with its frames moving along. Then write, in your own words, what each of the two publishers does. Tomorrow you replace hand-written XML with xacro.
`,
  key: [
    'URDF describes a robot as links (rigid bodies) connected by joints.',
    'Joints: fixed, revolute, continuous, prismatic — with parent, child, origin, axis, limits.',
    'Every link is a TF frame; joints define the transforms between them.',
    'joint_state_publisher invents joint angles; robot_state_publisher turns angles + URDF into TF.'
  ],
  quiz: [
    ['What does robot_state_publisher do?', ['Invents joint positions from sliders', 'Computes link transforms (TF) from the URDF and joint states', 'Drives the motors', 'Records bags'], 1, 'Angles + URDF → frames.'],
    ['Which URDF joint type suits a wheel that spins forever?', ['fixed', 'revolute', 'continuous', 'prismatic'], 2, 'Revolute has limits; continuous does not.']
  ]
});

D({
  n: 94, icon: '🧩', topic: 'URDF & TF', hours: 2.5, notion: '3f6cdfea8ce281509157e3f0fd9b7433', svg: 'tf',
  title: 'xacro, inertials, collision vs visual',
  goal: 'Write robot descriptions with xacro macros and correct physics tags.',
  tasks: [
    'Convert yesterday\'s URDF to xacro: properties, math, a `wheel` macro used twice',
    'Add `<inertial>` (mass + inertia from box/cylinder formulas) to every link. Write a small inertia macro',
    'Separate `<visual>` and `<collision>` geometry (simple shapes for collision)',
    'Read the common-issues list in the reading and tick off each one you now avoid',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['Common issues to learn', 'Missing inertial tags. Fix: your robot explodes or sinks through the Gazebo floor without them, so always include mass and inertia.\nA missing static transform to the lidar frame. Fix: this causes more beginner SLAM failures than any algorithm problem.\nWriting 400 lines of XML by hand. Fix: use xacro macros from day one.']
  ],
  links: [
    ['Edouard Renard Level 2 (xacro, Gazebo plugins)', 'https://www.udemy.com/course/ros2-tf-urdf-rviz-gazebo/'],
    ['Articulated Robotics tutorials', 'https://articulatedrobotics.xyz/tutorials/']
  ],
  video: `
## xacro: URDF with variables and macros
\`\`\`xml
<xacro:property name="wheel_r" value="0.035"/>
<xacro:property name="wheel_w" value="0.02"/>
<xacro:macro name="wheel" params="side y">
  <link name="\${side}_wheel"> ... </link>
  <joint name="\${side}_wheel_joint" type="continuous">
    <origin xyz="0 \${y} 0" rpy="\${-pi/2} 0 0"/> ...
  </joint>
</xacro:macro>
<xacro:wheel side="left"  y="0.1"/>
<xacro:wheel side="right" y="-0.1"/>
\`\`\`
Hand-written URDF gets long and repetitive fast: two wheels mean writing almost the same block twice. The article's fix: use xacro from day one.
Xacro adds properties, which are variables, maths expressions, and macros, which are reusable templates with parameters. Define a wheel macro once and use it twice. Change the wheel radius property, and every place that uses it updates. It is parametric design for robot descriptions, just like your CAD variables in Module 3.

## Three descriptions of every link
| Tag | Used by | Should be |
|---|---|---|
| visual | RViz, Gazebo rendering | as detailed as you like (meshes) |
| collision | physics, collision checking | simple shapes: boxes, cylinders |
| inertial | physics simulation | correct mass and inertia |
Each link can carry three separate descriptions. Visual geometry is what you see, and can be a detailed mesh exported from CAD. Collision geometry is what the physics engine uses for contact, and should be simple shapes, because collision checking on detailed meshes is slow and unstable.
And inertial describes the mass and how it is distributed. That one is easy to forget and causes real trouble.

## Inertials: why robots explode
@big No inertial tags → your robot explodes or sinks through the floor
The article is blunt: without inertial tags, your robot explodes or sinks through the Gazebo floor. A physics engine needs every moving link to have a mass and an inertia, or the maths breaks down.
The inertia tensor describes how hard it is to spin the link about each axis. For simple shapes there are standard formulas. For a solid box of mass m with sides x, y and z, the inertia about the x axis is m over twelve times y squared plus z squared, and similarly for the others.

## An inertia macro
\`\`\`xml
<xacro:macro name="box_inertia" params="m x y z">
  <inertial>
    <mass value="\${m}"/>
    <inertia ixx="\${m*(y*y+z*z)/12}" iyy="\${m*(x*x+z*z)/12}" izz="\${m*(x*x+y*y)/12}"
             ixy="0" ixz="0" iyz="0"/>
  </inertial>
</xacro:macro>
\`\`\`
Write small macros for box and cylinder inertias, so every link gets correct values in one line. Approximate masses are fine; plausible numbers matter far more than precise ones.

## The common-issues checklist
- Inertials on every moving link
- Static transform to the lidar frame present
- xacro macros, not 400 lines of XML
- Simple collision shapes
Finally, tick off the article's common issues. Inertials on every link. A transform to the lidar frame, which the article says causes more beginner SLAM failures than any algorithm problem. Xacro instead of hundreds of lines of XML. And simple collision shapes.
Tomorrow you use all of this to design your own robot.
`,
  key: [
    'xacro adds properties, maths and macros to URDF — use it from day one.',
    'Each link has visual (looks), collision (simple shapes) and inertial (mass/inertia) parts.',
    'Missing inertials make robots explode or sink in Gazebo.',
    'Box inertia: Ixx = m(y² + z²)/12, etc.; wrap formulas in macros.'
  ],
  quiz: [
    ['What happens in Gazebo if links have no inertial tags?', ['They render in grey', 'The robot can explode or sink through the floor', 'Nothing', 'Collisions are faster'], 1, 'Physics needs mass and inertia.'],
    ['Why use simple shapes for collision geometry?', ['They look nicer', 'Collision checking on detailed meshes is slow and unstable', 'URDF forbids meshes', 'They weigh less'], 1, 'Keep detail for visuals only.']
  ]
});

D({
  n: 95, icon: '🛠️', topic: 'URDF & TF', hours: 3, notion: '3f6cdfea8ce2810a9ca4d9efdd05ca4d', svg: 'tf',
  title: 'Practice task: your own robot in xacro',
  goal: 'Design your own robot (not TurtleBot) in xacro.',
  tasks: [
    'Differential-drive base (2 wheels + caster), a sensor mast, and a two-DOF pan-tilt head',
    'Correct inertias, separate collision and visual geometry',
    'Add a `lidar_link` and a `camera_link` with fixed joints (you need them later)',
    'Package it as `my_robot_description` with a display launch file',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['Practice task (URDF)', 'Practice task: design your own robot in xacro, not TurtleBot. A differential-drive base, a sensor mast and a two-DOF pan-tilt head, with correct inertias and separate collision and visual geometry. Drive the joints with joint_state_publisher_gui and view the full TF tree in RViz. A screenshot of your own robot in RViz is the most legible signal in a beginner portfolio.'],
    ['Month 4 Milestone (this one)', 'Describe your own robot in xacro with correct frames, inertias and collision geometry.']
  ],
  links: [
    ['Articulated Robotics tutorials', 'https://articulatedrobotics.xyz/tutorials/'],
    ['MOGI-ROS course (URDF weeks)', 'https://github.com/orgs/MOGI-ROS/repositories']
  ],
  video: `
## Your own robot, not TurtleBot
@big A screenshot of your own robot in RViz is the most legible signal in a beginner portfolio
The URDF practice task: design your own robot in xacro. Not TurtleBot, not a tutorial robot, your own. The article says a screenshot of your own robot in RViz is the most legible signal in a beginner portfolio, because anyone can see at a glance that you built something original.

## The design brief
| Part | Joints | Notes |
|---|---|---|
| base_link (chassis box) | — | root of the robot |
| left and right wheels | continuous | use your wheel macro |
| caster | fixed (or a sphere) | low friction support |
| sensor mast | fixed | holds the head up |
| pan link | revolute (z axis) | turns left and right |
| tilt link | revolute (y axis) | nods up and down |
| lidar_link, camera_link | fixed | needed for simulation and SLAM |
The brief: a differential drive base with two wheels and a caster, a sensor mast, and a two-degree-of-freedom pan-tilt head on top.
Add a lidar link and a camera link with fixed joints now. You will attach simulated sensors to them in section three, and SLAM in section four depends on the lidar frame being correct.

## Design it like an engineer
1. Sketch the robot with dimensions on paper
2. Put every dimension in a xacro property
3. Build base → wheels → mast → pan → tilt → sensors
4. Check each step in RViz before adding the next
Start on paper: a sketch with real dimensions, like a chassis thirty by twenty centimetres, wheels seven centimetres across, a mast forty centimetres tall.
Put every dimension in a xacro property. Then build up the robot one part at a time, viewing it in RViz after each addition. Adding everything at once and then debugging is much slower than catching each mistake as it happens.

## Where frames go
- base_link: centre of the chassis, on the axle line
- wheel joint origins: at each wheel's centre
- lidar_link: at the scanner's measuring centre
- Joint axes: wheels spin about y; pan about z; tilt about y
Placement of frames matters. Put base link at the centre of the chassis on the line between the wheels, which makes driving maths simple. Put each wheel joint at the wheel's centre. Put the lidar frame exactly where a real scanner would measure from.
And set joint axes carefully: wheels spin about the y axis, the pan joint turns about z, and the tilt joint nods about y. A wrong axis makes a wheel spin sideways in simulation, a classic and very funny bug.

## Package it properly
\`\`\`text
my_robot_description/
  urdf/my_robot.urdf.xacro   urdf/inertials.xacro
  launch/display.launch.py   rviz/display.rviz
  package.xml   CMakeLists.txt
\`\`\`
Package it as my robot description, with the xacro files, a display launch file that starts robot state publisher, the joint state publisher GUI and RViz with a saved configuration.
That package is the foundation for the rest of the module: simulation, control, SLAM and navigation will all build on it. Tomorrow you finish it with a full TF check.
`,
  key: [
    'Design an original robot: diff-drive base, caster, mast, pan-tilt head, lidar and camera frames.',
    'Sketch with dimensions; every dimension a xacro property; build and check incrementally.',
    'Place frames deliberately (base_link on the axle line) and set joint axes correctly.',
    'Package as my_robot_description with a display launch file.'
  ],
  quiz: [
    ['Why add lidar_link and camera_link frames now?', ['They look nice', 'Simulated sensors and SLAM later depend on these frames', 'URDF requires them', 'To increase mass'], 1, 'A missing lidar frame breaks SLAM.'],
    ['About which axis should a diff-drive wheel joint usually rotate (with base_link x forward)?', ['x', 'y', 'z', 'none'], 1, 'Wheels spin about the lateral (y) axis.']
  ]
});

D({
  n: 96, icon: '📸', topic: 'URDF & TF', hours: 2.5, notion: '3f6cdfea8ce2817683f0fb0cb0da751e', svg: 'tf',
  title: 'Drive the joints + full TF tree in RViz',
  goal: 'Finish the URDF practice task with a clean RViz screenshot and a TF tree PDF.',
  tasks: [
    'Launch with joint_state_publisher_gui. Move the pan-tilt and wheels',
    'Show TF in RViz. Generate the TF tree with `view_frames`',
    'Break it on purpose: remove a joint, see the TF error, fix it (this is the milestone skill)',
    'Push to `month-4/my_robot_description/` with the screenshot',
    'Tick **Practice task done**. Fill the log, Status, Hours, Confidence'
  ],
  read: [['Month 4 Milestone (this one)', 'Diagnose a broken TF tree, which is the most common failure in the entire stack.']],
  links: [['Articulated Robotics, Coordinate Transforms', 'https://articulatedrobotics.xyz/category/coordinate-transforms-for-robotics'] ],
  video: `
## Bring it to life in RViz
@svg tf | drag the sliders, watch every frame follow
Launch your robot's display file. With the joint state publisher GUI, drag the pan and tilt sliders and watch the head move. Drag the wheel sliders and watch them spin. Turn on the TF display in RViz and every frame appears as a small set of red, green and blue axes, moving with its link.
Take a clean screenshot of your robot in RViz with the TF frames visible. That is the portfolio image the article talks about.

## Generate the TF tree
\`\`\`bash
ros2 run tf2_tools view_frames   # writes frames_<date>.pdf
\`\`\`
Then generate the tree with view frames and open the PDF. You should see one connected tree: base link at the top, branching to the wheels, the caster, the mast, the pan and tilt links, and the sensor frames.
Check that every frame you defined is there, connected to the right parent.

## The most common failure in the stack
@big A broken TF tree is the most common failure in the entire stack
The article says diagnosing a broken TF tree is a milestone, because it is the most common failure in the entire ROS stack. SLAM that produces nonsense, navigation that refuses to plan, sensor data that appears in the wrong place: very often, the root cause is TF.

## Break it on purpose
| Break | Symptom | How to see it |
|---|---|---|
| delete a joint | tree splits into two | view_frames shows a disconnected frame |
| stop joint_state_publisher | moving links vanish or freeze | RViz: "No transform from…" |
| typo in a parent name | link floats at origin | RViz RobotModel errors |
| wrong frame name in a sensor | data never appears | tf2_echo fails |
Today you break the tree on purpose and learn the symptoms. Delete a joint and regenerate the PDF: the tree splits, and one frame is orphaned. Stop the joint state publisher: RViz complains that there is no transform for the moving links.
Misspell a parent link name, and the child floats at the origin. Each failure has a recognisable fingerprint, just like the circuit faults you found in Module 1.

## The TF debugging routine
1. view_frames: is the tree connected?
2. tf2_echo A B: does this transform exist, and is it sensible?
3. Check who publishes each transform and how often
4. Check frame names match exactly (case matters)
Learn a routine for TF problems. First, view frames: is the tree one connected piece? Second, tf2 echo between the two frames you care about: does the transform exist, and are the numbers sensible? Third, check who broadcasts each transform and at what rate. Fourth, check names match exactly, including case.
Fix your deliberately broken tree, push the package with the screenshot and TF PDF, and tick the practice task as done.
`,
  key: [
    'Screenshot your robot with TF frames in RViz: a strong portfolio image.',
    'view_frames should show one connected tree.',
    'Broken TF is the most common ROS failure; learn its fingerprints by breaking it.',
    'Routine: view_frames → tf2_echo → check publishers/rates → check exact names.'
  ],
  quiz: [
    ['You delete a joint from the URDF. What does view_frames show?', ['Nothing changes', 'The tree splits and a frame is disconnected', 'All frames vanish', 'A faster tree'], 1, 'Every frame needs a path to the root.'],
    ['RViz says "No transform from wheel_link to base_link" when joint_state_publisher is stopped. Why?', ['The URDF is invalid', 'robot_state_publisher has no joint angles for moving joints', 'RViz is outdated', 'The wheel is too small'], 1, 'Moving joints need /joint_states.']
  ]
});

D({
  n: 97, icon: '🌍', topic: 'Simulation', hours: 2.5, notion: '3f6cdfea8ce281c886ebfa58516eb1a1', svg: 'slam',
  title: 'Gazebo: the naming mess + first simulation',
  goal: 'Gazebo Harmonic running with ROS 2 Jazzy, and your robot spawned in an empty world.',
  tasks: [
    'Read the Gazebo naming history in the reading lesson. Learn to spot outdated tutorials (gazebo_ros, ign gazebo)',
    'Install Gazebo Harmonic + ros_gz (the Jazzy pairing). Run the Gazebo getting-started tutorial',
    'Spawn your xacro robot into an empty world via ros_gz_sim. If it explodes or sinks, check inertials',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['4. Simulation', 'The Gazebo naming history confuses everyone, so here it is cleanly.\n\nGazebo Classic, versions 1 to 11, reached end of life in January 2025. It was rewritten and briefly called Ignition Gazebo, then renamed back to plain Gazebo in an announcement in April 2022, with every ign command becoming gz. If a tutorial types roslaunch gazebo_ros or ign gazebo, it is out of date.\n\nCurrent releases are named alphabetically: Fortress, Garden, Harmonic, Ionic, Jetty.\n\nInstall the version paired with your ROS 2 distro or you will fight build errors: Humble pairs with Fortress, Jazzy pairs with Harmonic, Kilted with Ionic, Lyrical with Jetty.']
  ],
  links: [
    ['Gazebo documentation and tutorials', 'https://gazebosim.org/docs/latest/getstarted/'],
    ['MOGI-ROS (Jazzy + Gazebo Harmonic)', 'https://github.com/orgs/MOGI-ROS/repositories']
  ],
  video: `
## Why simulate
@big Break robots for free · test at 3 a.m. · no hardware needed
A simulator gives you a virtual world with physics: gravity, friction, collisions and sensors. You can drive your robot into walls, test navigation in a building you do not have, and break things without breaking anything.
The article stresses that this whole module needs no hardware at all. Gazebo is the standard simulator in the ROS world, and today you get your own robot into it.

## The naming mess, cleanly
| Name | Status | How to spot old tutorials |
|---|---|---|
| Gazebo Classic (1–11) | end of life Jan 2025 | roslaunch gazebo_ros, gazebo_ros packages |
| Ignition Gazebo | renamed in 2022 | "ign gazebo" commands |
| Gazebo (Fortress, Garden, Harmonic, Ionic, Jetty) | current | "gz sim" commands |
Gazebo's naming history confuses everyone, so the article lays it out. Gazebo Classic, versions one to eleven, is dead. It was rewritten and briefly called Ignition Gazebo, then renamed back to plain Gazebo in 2022, with every ign command becoming gz.
So if a tutorial types roslaunch gazebo ros, or ign gazebo, it is out of date. Current Gazebo releases have alphabetical names: Fortress, Garden, Harmonic, Ionic and Jetty.

## Match Gazebo to your ROS distro
@eq Humble ↔ Fortress · Jazzy ↔ Harmonic · Kilted ↔ Ionic · Lyrical ↔ Jetty | wrong pairing = build errors
Each ROS 2 distribution pairs with one Gazebo release, and mixing them leads to painful build errors. You are on Jazzy, so you use Gazebo Harmonic, connected to ROS through the ros gz packages.
Write this pairing in your notes; it saves hours.

## Spawn your robot
\`\`\`bash
sudo apt install ros-jazzy-ros-gz
ros2 launch ros_gz_sim gz_sim.launch.py gz_args:="empty.sdf -r"
ros2 run ros_gz_sim create -topic robot_description -name my_robot
\`\`\`
Install the ros gz packages, start Gazebo with an empty world, publish your robot description with robot state publisher, and spawn it with the create tool, which reads the description from the topic.
Your robot should appear standing on the ground plane. Put the whole sequence in a launch file once it works.

## If it explodes or sinks
| Symptom | Likely cause |
|---|---|
| robot flies apart or jitters wildly | missing or tiny inertials |
| sinks through the floor | missing collision geometry or inertials |
| tips over immediately | caster missing, or centre of mass wrong |
| nothing appears | spawn failed: check the description topic |
If your robot explodes, jitters or sinks through the floor, check the inertials and collision geometry first, exactly as the article warned. Very small masses or inertias make the physics unstable, so use realistic values.
If it tips over, check the caster. If nothing appears, check that robot description is actually being published. Tomorrow is review, and then sensors and control.
`,
  key: [
    'Simulation lets you test and break robots for free; no hardware needed this module.',
    'Gazebo Classic and "ign" are outdated; current Gazebo uses gz commands.',
    'Pair distros: Jazzy ↔ Harmonic (Humble ↔ Fortress, Kilted ↔ Ionic, Lyrical ↔ Jetty).',
    'Exploding or sinking robots usually mean missing inertials or collision geometry.'
  ],
  quiz: [
    ['Which Gazebo release pairs with ROS 2 Jazzy?', ['Fortress', 'Harmonic', 'Ionic', 'Classic 11'], 1, 'Jazzy ↔ Harmonic.'],
    ['A tutorial uses "ign gazebo". What does that tell you?', ['It is the newest version', 'It is out of date (Ignition naming)', 'It is for ROS 2 Lyrical', 'It is for MuJoCo'], 1, 'ign commands became gz in 2022.']
  ]
});

D({
  n: 98, icon: '🔁', topic: 'Review', hours: 2, notion: '3f6cdfea8ce2815299e8dd648d5c5b8b', svg: 'tf',
  title: 'Week 2 review + catch-up',
  goal: 'Your robot loads cleanly in RViz and Gazebo before adding sensors.',
  tasks: [
    'Finish unfinished tasks from M4 Days 8–13',
    'Explain out loud: what TF is, why inertials matter, why xacro',
    'Update Confidence on Days 8–13'
  ],
  links: [['Articulated Robotics tutorials', 'https://articulatedrobotics.xyz/tutorials/']],
  video: `
## Three explanations
| Question | Your answer should include |
|---|---|
| What is TF? | frames, transforms, a tree, tf2 chains them over time |
| Why do inertials matter? | physics needs mass and inertia; missing → explode or sink |
| Why xacro? | properties, maths and macros; no 400-line XML |
Review day. Explain three things out loud without notes: what TF is, why inertials matter, and why you use xacro.
If any answer is fuzzy, rewatch that day's video at speed. These three ideas underpin everything in the rest of the module.

## The clean-load check
- RViz: robot appears, every TF frame present, sliders move joints
- view_frames: one connected tree
- Gazebo: robot spawns, stands still, does not explode
Before adding sensors and control next section, make sure your robot loads cleanly in both places. In RViz: the model appears, all frames are present, the sliders move the joints. In view frames: one connected tree. In Gazebo: it spawns, sits still on the ground, and does not jitter.
Problems are far easier to fix now, with a simple robot, than later, when sensors, controllers and SLAM are layered on top.

## Next section
@svg slam | simulated lidar and camera, then real motor control
Next section you give your robot simulated senses, a lidar and a camera, build a custom world for it, take a first look at MuJoCo, and add ros2 control so it can actually drive. By the end, you will command it to drive an exact distance with an action.
`,
  key: [
    'Explain TF, inertials and xacro without notes.',
    'Clean load: RViz frames, a connected tree, a stable Gazebo spawn.',
    'Fix description problems now, before sensors and control are added.'
  ],
  quiz: [
    ['Why fix URDF problems before adding sensors and controllers?', ['Sensors need no URDF', 'Problems are much easier to isolate in a simple robot', 'Gazebo requires it', 'It saves disk space'], 1, 'Debug one layer at a time.'],
    ['Which tool confirms the TF tree is a single connected piece?', ['rqt_graph', 'view_frames', 'ros2 bag', 'colcon'], 1, 'view_frames draws the whole tree.']
  ]
});

/* ───────────── Section 3 · Simulation and ros2_control ───────────── */

D({
  n: 99, icon: '📡', topic: 'Simulation', hours: 3, notion: '3f6cdfea8ce2810ea050caf18bc90954', svg: 'pointcloud',
  title: 'Lidar + camera plugins and a custom world',
  goal: 'Your robot in Gazebo with a working lidar and camera inside a world you built.',
  tasks: [
    'Add Gazebo lidar (gpu_lidar) and camera sensors to `lidar_link` and `camera_link` in your xacro',
    'Bridge the topics to ROS 2 with ros_gz_bridge (/scan, /camera/image)',
    'Build an SDF world: walls, boxes, a corridor. Save it in your package',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['Practice task (Simulation)', 'Practice task: put your xacro robot from the last section into Gazebo, add a lidar plugin and a camera plugin, and build a custom SDF world with obstacles for it to sit in. Confirm the sensor data appears on ROS 2 topics and renders in RViz'],
    ['Decision framework', 'Learn Gazebo first, because it is the only simulator natively wired into ROS 2 and it runs on the laptop you already own']
  ],
  links: [
    ['Gazebo documentation and tutorials (sensors, SDF worlds)', 'https://gazebosim.org/docs/latest/getstarted/'],
    ['Edouard Renard Level 2 (Gazebo plugins)', 'https://www.udemy.com/course/ros2-tf-urdf-rviz-gazebo/'],
    ['Articulated Robotics tutorials', 'https://articulatedrobotics.xyz/tutorials/']
  ],
  video: `
## Giving the robot senses
@svg pointcloud | simulated sensors publish the same messages as real ones
Today's practice task gives your simulated robot two senses: a lidar and a camera. Gazebo simulates them by ray casting and rendering the world from the sensor's point of view, and publishes the results as messages.
The big idea is that simulated sensors publish exactly the same ROS message types as real ones: a LaserScan and an Image. So every node you write against the simulator will later run, unchanged, against real hardware.

## A lidar in your xacro
\`\`\`xml
<gazebo reference="lidar_link">
  <sensor name="lidar" type="gpu_lidar">
    <topic>scan</topic>
    <gz_frame_id>lidar_link</gz_frame_id>
    <update_rate>10</update_rate>
    <lidar>
      <scan><horizontal>
        <samples>360</samples>
        <min_angle>-3.14</min_angle><max_angle>3.14</max_angle>
      </horizontal></scan>
      <range><min>0.12</min><max>12.0</max></range>
    </lidar>
    <visualize>true</visualize>
  </sensor>
</gazebo>
\`\`\`
A sensor goes inside a gazebo tag that references a link, here the lidar link you already defined. This one is a GPU lidar: 360 samples around a full circle, ten times a second, seeing from 12 centimetres to 12 metres. Those numbers roughly match a cheap real lidar.
The frame ID matters: it tells ROS which TF frame the scan is measured in. Get it wrong, and the scan will appear in the wrong place in RViz.

## A camera, the same way
\`\`\`xml
<gazebo reference="camera_link">
  <sensor name="camera" type="camera">
    <topic>camera/image</topic>
    <gz_frame_id>camera_optical_link</gz_frame_id>
    <update_rate>15</update_rate>
    <camera>
      <horizontal_fov>1.2</horizontal_fov>
      <image><width>640</width><height>480</height></image>
    </camera>
  </sensor>
</gazebo>
\`\`\`
The camera is almost identical: a field of view, an image size and a rate. One subtlety: ROS cameras use an optical frame, with z pointing forward out of the lens and x to the right, which is rotated from the usual robot convention of x forward.
Most people add a small extra link, the camera optical link, with that rotation. You will need it in Module 5 for vision.

## Bridging Gazebo to ROS 2
\`\`\`bash
ros2 run ros_gz_bridge parameter_bridge \\
  /scan@sensor_msgs/msg/LaserScan[gz.msgs.LaserScan \\
  /camera/image@sensor_msgs/msg/Image[gz.msgs.Image \\
  /clock@rosgraph_msgs/msg/Clock[gz.msgs.Clock
\`\`\`
Gazebo has its own transport, separate from ROS. The ros gz bridge translates between them. Each argument names a topic, the ROS type, a bracket for direction, and the Gazebo type. The opening square bracket means Gazebo to ROS only.
Bridge the clock too, and set use sim time to true on your nodes, so everything agrees on simulated time. Once it works, move these into a YAML bridge config started from your launch file.

## Build your own world
\`\`\`xml
<model name="wall_north">
  <static>true</static>
  <pose>0 3 0.5 0 0 0</pose>
  <link name="link">
    <collision name="c"><geometry><box><size>6 0.1 1</size></box></geometry></collision>
    <visual name="v"><geometry><box><size>6 0.1 1</size></box></geometry></visual>
  </link>
</model>
\`\`\`
A world is an SDF file listing models: a ground plane, a light, and anything else. Walls and boxes are just static models with a box for collision and visual, placed with a pose.
Build a small room with a corridor and a couple of boxes. It does not need to be pretty: it needs walls for the lidar to see, and later for SLAM to map. Save it in a worlds folder in your package and load it from your launch file.

## The sensors system plugin
- Sensors need the gz-sim-sensors-system plugin in the world (render_engine ogre2)
- Gazebo shows no scan? Check the plugin first
- ros2 topic hz /scan → about 10 Hz
- ros2 topic echo /scan --once → ranges, not all inf
One gotcha: Gazebo only runs sensors if the world loads the sensors system plugin. If your lidar produces nothing, check that first.
Then confirm from ROS: topic hz on the scan should show about ten hertz, and echoing one message should show real distances to your walls, not a list of infinities. Tomorrow you look at this data in RViz.
`,
  key: [
    'Simulated sensors publish the same message types as real ones, so code transfers.',
    'Sensors attach to links via gazebo tags; the frame ID must match a TF frame.',
    'ros_gz_bridge translates Gazebo topics to ROS 2; bridge /clock and use sim time.',
    'Worlds are SDF files of static models; sensors need the sensors system plugin.'
  ],
  quiz: [
    ['Why is it useful that the simulated lidar publishes sensor_msgs/LaserScan?', ['It is smaller', 'Code written against the simulator runs unchanged on real hardware', 'Gazebo requires it', 'RViz cannot show anything else'], 1, 'Same interface, sim or real.'],
    ['Your /scan topic exists in Gazebo but not in ROS 2. What is missing?', ['A URDF joint', 'The ros_gz_bridge for that topic', 'A colcon build of Gazebo', 'A camera'], 1, 'Gazebo transport and ROS 2 are separate until bridged.']
  ]
});

D({
  n: 100, icon: '👀', topic: 'Simulation', hours: 2.5, notion: '3f6cdfea8ce28180a43fc302d23a290a', svg: 'pointcloud',
  title: 'Sensors in RViz + a first look at MuJoCo',
  goal: 'Finish the simulation practice task, and know when to reach for MuJoCo or Isaac instead.',
  tasks: [
    'Show LaserScan and Image in RViz. Check the scan lines up with the walls (if not: TF to lidar frame!)',
    'Screenshot Gazebo + RViz side by side',
    '`pip install mujoco`. Load one example model and run the viewer. Note how fast it is on CPU',
    'Read the simulator decision framework. Write which simulator you will use for what',
    'Tick Practice task done. Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['Decision framework', 'Learn Gazebo first, because it is the only simulator natively wired into ROS 2 and it runs on the laptop you already own\nGo to MuJoCo when you want reinforcement learning or locomotion, and it still needs no GPU\nGo to Isaac Sim or Isaac Lab only when you have the RTX hardware and a specific reason\nSkip PyBullet, which has had no release since 2022 and whose maintainers closed the issue tracker\nWatch Genesis but do not build a portfolio on it yet, since v1.0 is fresh and it has no ROS 2 integration'],
    ['Month 4 Milestone (this one)', 'Simulate that robot in Gazebo with working lidar and camera sensors']
  ],
  links: [
    ['MuJoCo', 'https://mujoco.readthedocs.io/en/stable/overview.html'],
    ['NVIDIA Isaac Sim requirements (RTX 4080+)', 'https://docs.isaacsim.omniverse.nvidia.com/6.0.0/installation/requirements.html']
  ],
  video: `
## Seeing the sensors in RViz
- Fixed frame: odom (or base_link for now)
- Add → LaserScan → topic /scan → size 0.03
- Add → Image → topic /camera/image
- Add → RobotModel and TF, as before
Open RViz next to Gazebo. Set the fixed frame, then add a LaserScan display on the scan topic and an Image display on the camera topic, alongside the robot model.
You should see red dots tracing the walls of your world around the robot, and a small window showing what the camera sees. This is the Module 4 milestone: a simulated robot with working lidar and camera.

## When the scan does not line up
| Symptom | Cause |
|---|---|
| no dots, "no transform" warning | frame ID in the sensor does not match a TF frame |
| dots rotated or offset from walls | lidar joint origin wrong in xacro |
| dots appear, then vanish | timestamps: use_sim_time missing on some nodes |
| image is black | sensors plugin or render engine missing |
If the dots do not sit on the walls, it is almost always TF, exactly as the task says. No dots at all, with a transform warning, means the scan's frame ID does not exist in the tree. Dots rotated or shifted mean the lidar joint's origin is wrong.
Dots that flicker and vanish usually mean some nodes use wall time and others simulated time. Set use sim time everywhere.

## The simulator landscape
| Simulator | Use it for | Needs |
|---|---|---|
| Gazebo | ROS 2 robots, sensors, Nav2 | your laptop |
| MuJoCo | RL, locomotion, fast contact physics | CPU only |
| Isaac Sim / Lab | photoreal, massive parallel RL | RTX 4080 class GPU |
| PyBullet | skip: no release since 2022 | — |
| Genesis | watch, not yet for a portfolio | — |
The article's decision framework is clear. Learn Gazebo first, because it is the only simulator natively wired into ROS 2 and runs on your laptop. Go to MuJoCo when you want reinforcement learning or locomotion; it still needs no GPU.
Isaac Sim and Isaac Lab only when you have the RTX hardware and a specific reason. Skip PyBullet, which is unmaintained. Watch Genesis, but do not build a portfolio on it yet.

## A first taste of MuJoCo
\`\`\`python
# pip install mujoco
import mujoco, mujoco.viewer

model = mujoco.MjModel.from_xml_path("humanoid.xml")   # from the MuJoCo repo's model folder
data  = mujoco.MjData(model)
mujoco.viewer.launch(model, data)
\`\`\`
MuJoCo installs with one pip command. Load an example model, such as the humanoid, and launch the viewer. Watch how fast it simulates on just your CPU: thousands of physics steps a second.
That speed is why reinforcement learning uses it. Training a policy needs millions of simulated steps, and MuJoCo makes that practical on a laptop. You return to it in Module 6.

## Gazebo or MuJoCo for this task?
- Gazebo: full robot stack, sensors, ROS 2 topics, Nav2 — today's robot
- MuJoCo: physics only, no ROS, perfect for learning a policy — Module 6
- Write down: which simulator for which job, in your own words
They are not competitors so much as different tools. Gazebo simulates a whole robot system, sensors and all, talking ROS 2, which is what you need for SLAM and navigation next section. MuJoCo is a superb physics engine with no ROS in the loop, ideal for learning.
Finish today by writing, in your own words, which simulator you will use for which job. Then take your side-by-side screenshot and tick the practice task.
`,
  key: [
    'RViz LaserScan dots should trace the walls; if not, check TF and frame IDs.',
    'Use sim time everywhere when running against Gazebo.',
    'Gazebo first (ROS 2 native); MuJoCo for RL and locomotion on CPU; Isaac only with RTX and a reason.',
    'Skip PyBullet; watch Genesis but do not build a portfolio on it yet.'
  ],
  quiz: [
    ['The lidar dots in RViz are rotated 90° from the walls. Most likely cause?', ['Wrong message type', 'The lidar joint origin in the xacro is wrong', 'MuJoCo is running', 'The world is too small'], 1, 'Placement problems are TF problems.'],
    ['You want to train a locomotion policy with RL on a laptop without a GPU. Which simulator?', ['Isaac Lab', 'MuJoCo', 'PyBullet', 'Genesis'], 1, 'Fast contact physics on CPU.']
  ]
});

D({
  n: 101, icon: '🎛️', topic: 'ros2_control', hours: 2.5, notion: '3f6cdfea8ce281e2a160cfd9e1d04d94', svg: 'motor',
  title: 'ros2_control concepts + tags in your xacro',
  goal: 'Understand hardware interfaces and the controller manager, and add <ros2_control> to your robot.',
  tasks: [
    'Read the ros2_control docs: architecture, hardware interfaces, controller manager',
    'Read Articulated Robotics on ros2_control',
    'Add `<ros2_control>` tags with the gz_ros2_control system plugin and velocity command interfaces for the wheels',
    'Draw the data flow: teleop → controller → hardware interface → Gazebo joint',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['5. ros2_control', 'This is the topic most self-taught candidates have never touched, which makes it the fastest way to differentiate yourself'],
    ['ros2_control documentation', 'Where URDF meets actuation: hardware interfaces, controller manager, and the <ros2_control> tags that go in your xacro']
  ],
  links: [
    ['ros2_control documentation', 'https://control.ros.org/rolling/index.html'],
    ['Articulated Robotics, ros2_control on real hardware', 'https://articulatedrobotics.xyz/tutorials/mobile-robot/applications/ros2_control-real/']
  ],
  video: `
## Why ros2_control matters
@big Most self-taught candidates have never touched it | the fastest way to stand out
The article is direct: ros2 control is the topic most self-taught candidates have never touched, which makes it the fastest way to differentiate yourself. Professional robots almost all use it.
Until now you would drive a robot by publishing velocity and having some node turn that into motor commands. ros2 control replaces that ad hoc glue with a standard framework, the same for a toy rover and an industrial arm.

## The architecture
@eq controller (diff_drive) → controller manager → hardware interface → joints | same controllers, any hardware
There are three layers. Controllers are algorithms: a differential drive controller, a joint trajectory controller for an arm. The controller manager loads them and runs them in a real-time loop. Hardware interfaces talk to the actual motors.
The key separation: controllers never know what hardware they drive. Swap the Gazebo hardware interface for your real motor driver, and the very same controller and YAML keep working. That is how sim-to-real stays sane.

## Command and state interfaces
| Interface | Direction | Examples |
|---|---|---|
| command | controller → hardware | velocity, position, effort |
| state | hardware → controller | position, velocity, effort |
Every joint exposes interfaces. Command interfaces are what a controller can write: a velocity, a position or an effort, which means torque. State interfaces are what it can read back: usually position and velocity from the encoders.
For your wheels, the command is velocity, and the state is position and velocity. It is exactly the encoder and motor loop you built by hand in Module 2, now standardised.

## The tags in your xacro
\`\`\`xml
<ros2_control name="GazeboSystem" type="system">
  <hardware>
    <plugin>gz_ros2_control/GazeboSimSystem</plugin>
  </hardware>
  <joint name="left_wheel_joint">
    <command_interface name="velocity">
      <param name="min">-10</param><param name="max">10</param>
    </command_interface>
    <state_interface name="position"/>
    <state_interface name="velocity"/>
  </joint>
  <!-- same for right_wheel_joint -->
</ros2_control>
\`\`\`
This is where URDF meets actuation. The ros2 control tag names a hardware plugin, here the Gazebo system from gz ros2 control, and lists each joint with its command and state interfaces.
Later, for the real robot, you change only the plugin line to your own hardware interface. Everything below it stays the same.

## Loading it in Gazebo
\`\`\`xml
<gazebo>
  <plugin filename="gz_ros2_control-system" name="gz_ros2_control::GazeboSimROS2ControlPlugin">
    <parameters>$(find my_robot)/config/controllers.yaml</parameters>
  </plugin>
</gazebo>
\`\`\`
One more gazebo tag loads the gz ros2 control plugin, which starts a controller manager inside the simulator and points it at your controllers YAML. You write that YAML tomorrow.
Install the package with apt: ros jazzy gz ros2 control. Then rebuild, relaunch, and check ros2 control list hardware interfaces: your wheel interfaces should be listed.

## Draw the data flow
- teleop_twist_keyboard → /cmd_vel (Twist)
- diff_drive_controller → wheel velocity commands
- gz_ros2_control hardware → Gazebo wheel joints
- joint states back up → joint_state_broadcaster → /joint_states → TF
Finish by drawing the data flow on paper. Teleop publishes a velocity. The diff drive controller converts it into a velocity for each wheel. The hardware interface applies those to the Gazebo joints. Joint states come back up and are broadcast for TF.
If you can draw this from memory, you understand ros2 control better than most applicants.
`,
  key: [
    'ros2_control is a standard framework for actuation and a big differentiator.',
    'Controllers → controller manager → hardware interface; controllers never know the hardware.',
    'Joints expose command (velocity/position/effort) and state interfaces.',
    'Swap only the hardware plugin to move from Gazebo to a real robot.'
  ],
  quiz: [
    ['What changes when you move from Gazebo to real hardware with ros2_control?', ['The controllers', 'The hardware interface plugin', 'The YAML gains', 'The topic names'], 1, 'Controllers stay; only the hardware layer changes.'],
    ['For a velocity-driven wheel, which is a command interface?', ['position', 'velocity', 'temperature', 'joint_states'], 1, 'The controller writes velocity; it reads position and velocity.']
  ]
});

D({
  n: 102, icon: '🕹️', topic: 'ros2_control', hours: 3, notion: '3f6cdfea8ce281eaafe7c98aac558f06', svg: 'motor',
  title: 'diff_drive_controller + keyboard teleop',
  goal: 'Drive your simulated robot through a controller, not raw commands.',
  tasks: [
    'Write the controllers YAML: diff_drive_controller (wheel separation, radius) + joint_state_broadcaster',
    'Spawn both controllers from your launch file. Check with `ros2 control list_controllers`',
    "Drive with teleop_twist_keyboard (remap to the controller's cmd_vel; Jazzy expects stamped twist by default — check the controller params)",
    'Check /odom looks sane when you drive 1 m forward',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [
    ['Practice task (ros2_control)', 'Practice task: add <ros2_control> tags to your robot, configure diff_drive_controller and joint_state_broadcaster through YAML, and drive it in Gazebo with keyboard teleop'],
    ['Month 4 Milestone (this one)', 'Configure ros2_control and drive the robot through a controller rather than raw commands']
  ],
  links: [
    ['ros2_control documentation', 'https://control.ros.org/rolling/index.html'],
    ['Articulated Robotics tutorials', 'https://articulatedrobotics.xyz/tutorials/'],
    ['teleop_twist_keyboard', 'https://github.com/ros2/teleop_twist_keyboard', 'extra']
  ],
  video: `
## The controllers YAML
\`\`\`yaml
controller_manager:
  ros__parameters:
    update_rate: 50
    joint_state_broadcaster:
      type: joint_state_broadcaster/JointStateBroadcaster
    diff_drive_controller:
      type: diff_drive_controller/DiffDriveController

diff_drive_controller:
  ros__parameters:
    left_wheel_names:  ["left_wheel_joint"]
    right_wheel_names: ["right_wheel_joint"]
    wheel_separation: 0.17
    wheel_radius: 0.033
    base_frame_id: base_link
    odom_frame_id: odom
    publish_rate: 50.0
\`\`\`
Today's practice task is driving through a controller. The YAML has two parts. First, the controller manager's update rate and the list of controllers it can load, with their types. Second, each controller's own parameters.
For the diff drive controller, the critical numbers are wheel separation and wheel radius. They must match your xacro exactly, because the controller uses them to turn velocity into wheel speeds and wheel rotation back into odometry.

## The kinematics inside
@eq v_left = (v − ω·L/2) / r ·  v_right = (v + ω·L/2) / r | L = wheel separation, r = wheel radius
Here is what the diff drive controller actually computes. Given a forward speed v and a turn rate omega, each wheel's angular speed is that speed, minus or plus omega times half the separation, divided by the wheel radius.
It also runs this backwards, integrating wheel rotations into the odom transform. That is why a wrong radius makes the robot think it travelled further or shorter than it did. You derived the same equation in Module 3.

## Spawning the controllers
\`\`\`python
Node(package='controller_manager', executable='spawner',
     arguments=['joint_state_broadcaster']),
Node(package='controller_manager', executable='spawner',
     arguments=['diff_drive_controller']),
\`\`\`
In your launch file, add one spawner node per controller. The spawner asks the controller manager to load, configure and activate the controller.
Then check with ros2 control list controllers. Both should say active. If one is inactive or missing, the error is usually in the YAML: a wrong joint name or a typo in the type.

## Driving with teleop
\`\`\`bash
ros2 run teleop_twist_keyboard teleop_twist_keyboard --ros-args \\
  -p stamped:=true \\
  -r cmd_vel:=/diff_drive_controller/cmd_vel
\`\`\`
The controller listens on its own topic, diff drive controller slash cmd vel, so remap teleop onto it. In Jazzy, the controller expects a stamped twist, a velocity with a timestamp and frame, so tell teleop to publish stamped messages.
If you press keys and nothing moves, run topic info on that topic and compare the message types. A type mismatch is the most common problem today.

## Is the odometry sane?
| Check | Expected |
|---|---|
| drive ~1 m forward | /odom x ≈ 1.0, y ≈ 0 |
| spin on the spot | x, y stay near 0; yaw changes |
| RViz, fixed frame odom | robot moves on screen as in Gazebo |
| ros2 run tf2_tools view_frames | odom → base_link now present |
Drive about one metre forward and echo the odometry. The x position should read close to one, and y close to zero. Spin on the spot, and the position should barely change while the yaw does.
Then set RViz's fixed frame to odom: the robot should move on screen exactly as it moves in Gazebo. If the odometry says 1.5 metres when you moved one, check the wheel radius. Record the numbers in your log.
`,
  key: [
    'diff_drive_controller and joint_state_broadcaster are configured in YAML.',
    'Wheel separation and radius must match the xacro, or odometry will be wrong.',
    'Spawner nodes activate controllers; check with ros2 control list_controllers.',
    'Jazzy diff_drive expects stamped twists on /diff_drive_controller/cmd_vel.'
  ],
  quiz: [
    ['You drive 1 m but /odom reports 1.5 m. Most likely cause?', ['Wrong wheel radius in the YAML', 'The lidar frame', 'The world file', 'Missing camera'], 0, 'Odometry integrates wheel rotation × radius.'],
    ['Teleop runs but the robot does not move. First thing to check?', ['The camera image', 'The topic name and message type the controller expects', 'MuJoCo version', 'Git status'], 1, 'Remap and stamped vs unstamped twist.']
  ]
});

D({
  n: 103, icon: '🎯', topic: 'ros2_control', hours: 3, notion: '3f6cdfea8ce281949bbfc6857050376d', svg: 'robot',
  title: 'Action server: drive a commanded distance',
  goal: 'An action server that drives X metres, reports progress, and can be cancelled.',
  tasks: [
    'Define `DriveDistance.action` (goal: distance, feedback: remaining, result: travelled)',
    'Server: subscribe to /odom, publish to cmd_vel, send feedback at 10 Hz, stop at target, handle cancel',
    'Client: send 2 m, print feedback, cancel halfway in a second test',
    'Fill the log, Status, Hours, Confidence'
  ],
  read: [['Practice task (ros2_control)', 'Then write an action server that drives a commanded distance and reports progress, with feedback and cancellation. Actions plus ros2_control in one project is a genuinely strong portfolio piece']],
  links: [
    ['Official ROS 2 Tutorials (actions)', 'https://docs.ros.org/en/jazzy/Tutorials.html'],
    ['Automatic Addison ("how do I write an action in Jazzy")', 'https://automaticaddison.com/tutorials/']
  ],
  video: `
## Why this is a portfolio piece
@big Actions + ros2_control in one project | a genuinely strong portfolio piece
The article calls this combination a genuinely strong portfolio piece. Today you write an action server that drives the robot a commanded distance, reports progress, and can be cancelled, all on top of the ros2 control setup from yesterday.
It shows an interviewer you understand all three communication types, odometry, controllers and clean shutdown, in one small, demonstrable project.

## Define the action
\`\`\`text
# my_interfaces/action/DriveDistance.action
float32 distance        # goal: metres to drive
---
float32 travelled       # result
bool    success
---
float32 remaining       # feedback
\`\`\`
An action file has three parts separated by dashes: the goal, the result, and the feedback. The goal is a distance. The result is how far you actually travelled. Feedback, sent while running, is the distance remaining.
Add it to your interfaces package, list it in CMakeLists, rebuild and source, then check with ros2 interface show.

## The server loop
\`\`\`python
def execute(self, goal_handle):
    start = self.pose_xy()
    target = goal_handle.request.distance
    fb = DriveDistance.Feedback()
    rate = self.create_rate(10)
    while rclpy.ok():
        if goal_handle.is_cancel_requested:
            self.stop(); goal_handle.canceled()
            return DriveDistance.Result(travelled=self.dist(start), success=False)
        done = self.dist(start)
        if done >= target:
            break
        self.drive(0.15)                       # m/s, via the controller's cmd_vel
        fb.remaining = target - done
        goal_handle.publish_feedback(fb)
        rate.sleep()
    self.stop(); goal_handle.succeed()
    return DriveDistance.Result(travelled=self.dist(start), success=True)
\`\`\`
The execute callback records the starting position from odometry, then loops ten times a second. Each pass it checks for cancellation, measures distance travelled, drives forward if it is not there yet, and publishes the remaining distance as feedback.
When it arrives or is cancelled, it always stops the robot first, then reports the result. Stopping first is the rule: never leave a robot driving because your code returned early.

## The executor trap
- The odom callback must keep running while execute loops
- Use a MultiThreadedExecutor + a ReentrantCallbackGroup
- Symptom if you forget: distance never changes, the loop runs forever
Here is the trap that catches almost everyone. Your execute loop runs inside a callback. With the default single-threaded executor, the odometry subscription cannot run while it loops, so the distance never updates and the robot drives forever.
The fix is a multi-threaded executor with a reentrant callback group, so odometry keeps arriving while the action runs. If your robot never stops, this is why.

## The client and the cancel test
\`\`\`bash
ros2 action send_goal --feedback /drive_distance \\
  my_interfaces/action/DriveDistance "{distance: 2.0}"
# second test: Ctrl-C partway → the goal is cancelled, robot stops
\`\`\`
Test from the command line first: send a two metre goal with feedback, and watch remaining count down to zero. Then press control C partway through; the CLI cancels the goal, and your server should stop the robot and report the distance actually travelled.
Then write a small Python client that does the same and cancels automatically after one metre. Both tests belong in tomorrow's demo video.
`,
  key: [
    'An .action file has goal, result and feedback sections separated by ---.',
    'The server loops: check cancel → measure → drive → publish feedback.',
    'Always stop the robot before returning, on success or cancel.',
    'Use a MultiThreadedExecutor with a reentrant group so odom keeps updating.'
  ],
  quiz: [
    ['Your action server drives forever and the distance never updates. Most likely cause?', ['Wrong action file', 'A single-threaded executor blocks the odom callback during execute', 'The lidar', 'Teleop is running'], 1, 'Use a MultiThreadedExecutor and a reentrant callback group.'],
    ['What should the server do first when a cancel is requested?', ['Publish feedback', 'Stop the robot', 'Restart the goal', 'Ignore it'], 1, 'Safety first, then report the result.']
  ]
});

D({
  n: 104, icon: '🎬', topic: 'ros2_control', hours: 2.5, notion: '3f6cdfea8ce281f1bfe6d3ba777553fb', svg: 'robot',
  title: 'Polish the action demo + README',
  goal: 'A portfolio-ready ros2_control + action project.',
  tasks: [
    'Measure accuracy: command 1 m, 2 m, 3 m. Record actual distance from Gazebo ground truth',
    'Record a screen video (Gazebo + terminal feedback + a cancel)',
    'README for `month-4/my_robot/`: architecture diagram (nodes, topics, controllers), numbers, video, what broke',
    'Tick Practice task done. Fill the log, Status, Hours, Confidence'
  ],
  read: [['Reminder', 'Actions plus ros2_control in one project is a genuinely strong portfolio piece']],
  links: [['ros2_control documentation', 'https://control.ros.org/rolling/index.html']],
  video: `
## Measure, do not guess
| Commanded | Odom says | Gazebo truth | Error |
|---|---|---|---|
| 1.0 m | | | |
| 2.0 m | | | |
| 3.0 m | | | |
A portfolio project needs numbers. Command one, two and three metres, and for each record what odometry says and what actually happened, from Gazebo's ground truth pose of the model.
The difference between odometry and truth is your odometry error. In simulation it is small, but not zero, and it grows with distance. Note the trend: that drift is exactly why SLAM exists, as you will see next section.

## Getting ground truth
- Gazebo GUI: select the model → Component inspector → Pose
- Or bridge the model pose topic to ROS 2
- Reset between runs so every test starts at the origin
The simplest ground truth is in the Gazebo GUI: select your robot and read its pose in the component inspector. For something repeatable, bridge Gazebo's pose topic to ROS and log it.
Reset the simulation between runs, so every test starts from the same place. Three clean runs beat ten messy ones.

## Why it overshoots
@eq stop distance ≈ v² / (2·a) | at 0.15 m/s with soft braking, a few centimetres
If your robot always overshoots slightly, that is physics, not a bug. The loop decides to stop only after it has passed the target, and the robot then takes time to decelerate.
A neat improvement is to slow down as the remaining distance shrinks: make speed proportional to remaining distance, with a minimum. That is a proportional controller, a preview of Module 5. Try it, and compare the error table before and after.

## Record the demo
- Gazebo and a terminal with feedback, side by side
- One full 2 m goal, then one cancelled partway
- Under one minute; no narration needed, add captions
Record your screen with Gazebo and the feedback terminal side by side. Show one complete two metre goal with remaining counting down, then one goal cancelled halfway, with the robot stopping cleanly.
Keep it under a minute. Recruiters and interviewers do watch short videos; they rarely read long code.

## The README
\`\`\`text
month-4/my_robot/README.md
  1. What it is (one paragraph + GIF)
  2. Architecture: nodes · topics · controllers (diagram)
  3. How to run: three commands
  4. Results: the accuracy table
  5. What broke and how I fixed it
\`\`\`
The README is the front door of the project. One paragraph and a GIF saying what it is. An architecture diagram of nodes, topics and controllers. Three commands to run it. The accuracy table. And an honest what-broke section.
That last part is what makes it credible. Every real robotics engineer knows things break; showing how you debugged them is the evidence of skill. Tick the practice task when it is pushed.

## Talking about it in an interview
- "I configured ros2_control with a diff drive controller in Gazebo"
- "I wrote an action server with feedback and cancellation"
- "Odometry error was about X percent at 3 m; here is why"
Practise describing the project in three sentences. What you configured, what you wrote, and one measured result with an explanation. Numbers and reasons are what separate a tutorial follower from an engineer.
If an interviewer asks what you would do next, you already have an answer: proportional slow-down, then running the same controller on real hardware, which is exactly where this course goes.
`,
  key: [
    'Measure commanded vs odometry vs ground truth; record the error table.',
    'Odometry drift grows with distance — the reason SLAM exists.',
    'Overshoot comes from stopping late; a proportional slow-down reduces it.',
    'A short demo video plus a README with architecture, numbers and failures.'
  ],
  quiz: [
    ['What does the difference between /odom and Gazebo ground truth measure?', ['Lidar noise', 'Odometry error (drift)', 'Network delay', 'Controller rate'], 1, 'And it grows with distance.'],
    ['How can you reduce overshoot at the target?', ['Drive faster', 'Slow down in proportion to the remaining distance', 'Publish feedback more often', 'Remove the cancel check'], 1, 'A simple proportional controller.']
  ]
});

D({
  n: 105, icon: '🔁', topic: 'Review', hours: 2, notion: '3f6cdfea8ce2811ab42dead38d9fc26c', svg: 'costmap',
  title: 'Week 3 review + catch-up',
  goal: 'A reliable simulated robot (sensors + controller + odom) before SLAM.',
  tasks: [
    'Finish unfinished tasks from M4 Days 15–20',
    'Drive around the world for 2 minutes. Does /odom drift a lot? Note it (SLAM depends on it)',
    'Look at the Month 5 gear list — you order on Day 22',
    'Update Confidence on Days 15–20'
  ],
  links: [['Nav2 Getting Started', 'https://docs.nav2.org/rolling/getting_started/index.html']],
  video: `
## The stack so far
| Layer | You built |
|---|---|
| description | xacro robot, TF tree, inertials |
| simulation | Gazebo world, lidar, camera, bridge |
| control | ros2_control, diff_drive, odometry |
| behaviour | DriveDistance action with feedback and cancel |
Review day. Look at what you have built in three weeks: a described robot with a clean TF tree, simulated in a world of your own with a lidar and a camera, driven through ros2 control, with an action server on top.
That is a real robot software stack. Next section adds the two things everyone associates with mobile robots: mapping and autonomous navigation.

## The two-minute drift test
- Teleop around the world for two minutes, then return to the start
- Compare /odom with where the robot really is
- Note it in your log: SLAM depends on it
Today's key test: drive around your world for two minutes, with turns, then return to where you started. Compare what odometry says with where the robot actually is.
The error will be noticeable, especially after turns. Note it. SLAM uses the lidar to correct this drift, but it starts from odometry, so the better your odometry, the better your maps.

## Readiness checklist
- /scan at ~10 Hz, dots on the walls in RViz
- controllers active; teleop drives smoothly
- odom → base_link in TF; use_sim_time everywhere
- one launch file brings it all up
Before SLAM, check this list. The scan is steady and lines up with the walls. Both controllers are active and teleop drives smoothly. The TF tree has odom to base link, and every node uses sim time. And one launch file brings everything up.
If any item fails, fix it today. SLAM will magnify every one of these problems.

## Order Module 5 gear
@big You order on Day 22 | look at the gear list today
Also today: open the Gear tab and look at the Module 5 list. You order on day 22, so decide now what you need, and check delivery times.
Next section is SLAM and Nav2: building a map of your world with the lidar, then sending the robot to goals autonomously while it avoids obstacles. Everything you built this month comes together.
`,
  key: [
    'Description + simulation + control + an action: a full robot software stack.',
    'Odometry drifts, especially with turns; SLAM corrects it using the lidar.',
    'Check scan, controllers, TF and sim time before starting SLAM.',
    'Choose Module 5 gear today; order on Day 22.'
  ],
  quiz: [
    ['Why does good odometry matter for SLAM?', ['SLAM ignores odometry', 'SLAM starts from odometry and corrects it with the lidar', 'Odometry replaces the lidar', 'It only matters for cameras'], 1, 'Better odometry → better maps.'],
    ['Which is NOT on the pre-SLAM readiness list?', ['/scan at about 10 Hz', 'Controllers active', 'A trained RL policy', 'use_sim_time everywhere'], 2, 'RL is Module 6.']
  ]
});
// @@END
