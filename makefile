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
	sudo apt-get install python3-catkin-tools -y
build:
	cd bridge/ && catkin build
