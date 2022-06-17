install:
	sudo apt-get install ros-${ROS_DISTRO}-turtlebot3 \
	  ros-${ROS_DISTRO}-turtlebot3 \
      ros-${ROS_DISTRO}-turtlebot3-gazebo \
      ros-${ROS_DISTRO}-turtlebot3-msgs \
      ros-${ROS_DISTRO}-turtlebot3-navigation \
      ros-${ROS_DISTRO}-turtlebot3-slam \
      ros-${ROS_DISTRO}-turtlebot3-teleop \
      ros-${ROS_DISTRO}-rosbridge-server \
      ros-${ROS_DISTRO}-rviz -y \
	  python3-catkin-tools -y
	sudo apt install nodejs -y
	sudo apt install npm -y
build:
	cd bridge/ && catkin build
	cd robot-ram/ && sudo npm install react_scripts --save
